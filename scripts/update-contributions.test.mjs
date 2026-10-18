import test from 'node:test'
import assert from 'node:assert/strict'
import { buildSnapshot, readUsername } from './update-contributions.mjs'

test('reads the configured username without treating placeholder brackets as a username', () => {
  assert.equal(readUsername("githubUsername: 'logicMac',"), 'logicMac')
  assert.throws(() => readUsername("githubUsername: '[GITHUB_USERNAME]',"), /Set githubUsername/)
})

test('preserves GitHub totals and private-inclusive daily counts without repository details', () => {
  const snapshot = buildSnapshot({
    totalContributions: 1455,
    weeks: [{ contributionDays: [{ date: '2026-10-19', contributionCount: 12, contributionLevel: 'FOURTH_QUARTILE' }] }],
  }, 'logicMac', '2026-10-19T00:00:00.000Z')
  assert.equal(snapshot.total, 1455)
  assert.deepEqual(snapshot.weeks[0][0], { date: '2026-10-19', count: 12, level: 'FOURTH_QUARTILE' })
  assert.equal(JSON.stringify(snapshot).includes('repository'), false)
})

test('rejects malformed contribution data rather than publishing a misleading graph', () => {
  assert.throws(() => buildSnapshot({ totalContributions: 10, weeks: [{ contributionDays: [{ date: 'bad', contributionCount: -1, contributionLevel: 'NONE' }] }] }, 'logicMac', ''), /invalid contribution day/)
})
