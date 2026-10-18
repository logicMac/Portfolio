import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const levels = new Set(['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'])

export function readUsername(source) {
  const username = source.match(/githubUsername:\s*'([A-Za-z0-9-]+)'/)?.[1]
  if (!username) throw new Error('Set githubUsername in src/data.js before updating contributions.')
  return username
}

export function buildSnapshot(calendar, username, generatedAt) {
  if (!Number.isInteger(calendar?.totalContributions) || !Array.isArray(calendar?.weeks) || !calendar.weeks.length) {
    throw new Error('GitHub returned an invalid contribution calendar.')
  }
  const weeks = calendar.weeks.map((week) => {
    if (!Array.isArray(week.contributionDays)) throw new Error('GitHub returned an invalid contribution week.')
    return week.contributionDays.map((day) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isInteger(day.contributionCount) || day.contributionCount < 0 || !levels.has(day.contributionLevel)) {
        throw new Error('GitHub returned an invalid contribution day.')
      }
      return { date: day.date, count: day.contributionCount, level: day.contributionLevel }
    })
  })
  return { username, generatedAt, total: calendar.totalContributions, weeks }
}

async function main() {
  const token = process.env.PORTFOLIO_GITHUB_TOKEN
  if (!token) throw new Error('Missing PORTFOLIO_GITHUB_TOKEN. Add it as a GitHub Actions secret.')
  const username = readUsername(await readFile(path.join(root, 'src/data.js'), 'utf8'))
  const to = new Date()
  const from = new Date(to)
  from.setUTCFullYear(from.getUTCFullYear() - 1)
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', Accept: 'application/vnd.github+json' },
    body: JSON.stringify({
      query: `query($from: DateTime!, $to: DateTime!) {
        viewer {
          login
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks { contributionDays { date contributionCount contributionLevel } }
            }
          }
        }
      }`,
      variables: { from: from.toISOString(), to: to.toISOString() },
    }),
  })
  if (!response.ok) throw new Error(`GitHub GraphQL returned HTTP ${response.status}.`)
  const result = await response.json()
  if (result.errors?.length) throw new Error(result.errors.map((error) => error.message).join('; '))
  if (result.data?.viewer?.login?.toLowerCase() !== username.toLowerCase()) {
    throw new Error('The token must belong to the portfolio GitHub account to include private contributions.')
  }
  const snapshot = buildSnapshot(result.data?.viewer?.contributionsCollection?.contributionCalendar, username, to.toISOString())
  const output = path.join(root, 'public/github-contributions.json')
  await mkdir(path.dirname(output), { recursive: true })
  await writeFile(output, `${JSON.stringify(snapshot)}\n`)
  console.log(`Saved ${snapshot.total} contributions for ${username} (${snapshot.weeks.length} weeks).`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1 })
}
