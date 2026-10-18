import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { isConfigured, portfolio } from './data'
import styles from './App.module.css'

const sections = ['home', 'about', 'experience', 'projects', 'github', 'contact']
const navLabels = { home: 'Home', about: 'About', experience: 'Experience', projects: 'Work', github: 'GitHub', contact: 'Contact' }
const techIcons = {
  HTML: 'html5/html5-original.svg',
  CSS: 'css3/css3-original.svg',
  'Node.js': 'nodejs/nodejs-original.svg',
  Vite: 'vitejs/vitejs-original.svg',
  JWT: 'https://cdn.simpleicons.org/jsonwebtokens',
  React: 'react/react-original.svg',
  'Tailwind CSS': 'tailwindcss/tailwindcss-original.svg',
  JavaScript: 'javascript/javascript-original.svg',
  TypeScript: 'typescript/typescript-original.svg',
  PHP: 'php/php-original.svg',
  'Express.js': 'express/express-original.svg',
  MySQL: 'mysql/mysql-original.svg',
  MongoDB: 'mongodb/mongodb-original.svg',
  Flutter: 'flutter/flutter-original.svg',
  Dart: 'dart/dart-original.svg',
  Git: 'git/git-original.svg',
  'GitHub Actions': 'githubactions/githubactions-original.svg',
  Docker: 'docker/docker-original.svg',
  Postman: 'postman/postman-original.svg',
  Figma: 'figma/figma-original.svg',
  'VS Code': 'vscode/vscode-original.svg',
  Claude: 'https://cdn.simpleicons.org/claude',
}

function StackChip({ name }) {
  const [iconFailed, setIconFailed] = useState(false)
  const icon = techIcons[name]
  const src = icon && (icon.startsWith('http') ? icon : `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/${icon}`)
  return <span className={styles.chip}>
    {src && !iconFailed && <img className={styles.techIcon} src={src} alt="" loading="lazy" onError={() => setIconFailed(true)} />}
    {name}
  </span>
}

function Icon({ name, size = 20 }) {
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    external: <><path d="M7 17 17 7M8 7h9v9" /></>,
    download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 7 9-7" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="M5 5 19 19M19 5 5 19" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
    moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />,
    github: <><path d="M9 19c-4 1.2-4-2-5.5-2.5M15 21v-3.1a2.7 2.7 0 0 0-.7-2.1c2.4-.3 4.9-1.2 4.9-5.3a4.1 4.1 0 0 0-1.1-2.8 3.8 3.8 0 0 0-.1-2.8s-1 0-2.9 1.4a10 10 0 0 0-5.2 0C8 4.9 7 4.9 7 4.9a3.8 3.8 0 0 0-.1 2.8 4.1 4.1 0 0 0-1.1 2.8c0 4.1 2.5 5 4.9 5.3a2.7 2.7 0 0 0-.7 2.1V21" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7.5 10v7m0-10v.1M11 17v-7h3v1a3 3 0 0 1 5 2.5V17" /></>,
    facebook: <><path d="M14 21v-8h3l.5-4H14V7c0-1 .4-1.5 1.5-1.5H18V2.3A18 18 0 0 0 15 2c-3.2 0-5 1.8-5 5v2H7v4h3v8" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function goTo(id, event, closeMenu) {
  if (event && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return
  const target = document.getElementById(id)
  if (!target) return
  event?.preventDefault()
  closeMenu?.()
  window.history.replaceState(null, '', `#${id}`)
  window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 76, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
}

function Navbar({ theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const progressRef = useRef(null)

  useEffect(() => {
    let ticking = false
    const update = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const current = [...sections].reverse().find((id) => document.getElementById(id)?.getBoundingClientRect().top <= 160)
        setActive(current || 'home')
        setScrolled(window.scrollY > 12)
        const total = document.documentElement.scrollHeight - window.innerHeight
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${total > 0 ? Math.min(window.scrollY / total, 1) : 0})`
        ticking = false
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
    <span className={styles.scrollProgress} ref={progressRef} aria-hidden="true" />
    <div className={`${styles.container} ${styles.navInner}`}>
      <a className={styles.wordmark} href="#home" onClick={(event) => goTo('home', event, () => setMenuOpen(false))} aria-label="Back to top"><span className={styles.mark}>/</span> {isConfigured(portfolio.name) ? portfolio.name : 'portfolio'}<span className={styles.mark}>.</span></a>
      <nav className={`${styles.navLinks} ${menuOpen ? styles.navOpen : ''}`} aria-label="Main navigation" id="main-nav">
        {sections.map((id) => <a key={id} href={`#${id}`} onClick={(event) => goTo(id, event, () => setMenuOpen(false))} className={active === id ? styles.navActive : ''} aria-current={active === id ? 'location' : undefined}>{navLabels[id]}</a>)}
      </nav>
      <div className={styles.navActions}>
        <button className={styles.iconButton} type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={19} /></button>
        <button className={`${styles.iconButton} ${styles.menuButton}`} type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="main-nav"><Icon name={menuOpen ? 'close' : 'menu'} size={22} /></button>
      </div>
    </div>
  </header>
}

function Socials({ compact = false }) {
  const links = [
    { name: 'GitHub', icon: 'github', url: isConfigured(portfolio.githubUsername) ? `https://github.com/${portfolio.githubUsername}` : '' },
    { name: 'LinkedIn', icon: 'linkedin', url: portfolio.socials.linkedin },
    { name: 'Facebook', icon: 'facebook', url: portfolio.socials.facebook },
    { name: 'Email', icon: 'mail', url: portfolio.email ? `mailto:${portfolio.email}` : '' },
  ].filter(({ url }) => url)
  if (!links.length) return <span className={styles.socialHint}>Social links can be added in <code>src/data.js</code></span>
  return <div className={`${styles.socialLinks} ${compact ? styles.socialCompact : ''}`}>
    {links.map(({ name, icon, url }) => <a key={name} href={url} aria-label={name} title={name} target={url.startsWith('mailto:') ? undefined : '_blank'} rel={url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}><Icon name={icon} size={19} /></a>)}
  </div>
}

function Hero() {
  return <section id="home" className={styles.hero}>
    <div className={`${styles.container} ${styles.heroGrid}`}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}><span className={styles.tinySquare} /> Hello, I'm</p>
        <h1>{portfolio.name}<span className={styles.accent}>.</span></h1>
        <p className={styles.heroRole}>{portfolio.role}</p>
        <p className={styles.heroTagline}>{portfolio.tagline}</p>
        {portfolio.availability && <p className={styles.avail}><span className={styles.availDot} aria-hidden="true" />{portfolio.availability}</p>}
        <div className={styles.heroActions}>
          <a href="#projects" className={styles.primaryButton} onClick={(event) => goTo('projects', event)}>View my work <Icon name="arrow" size={18} /></a>
          <a href="#contact" className={styles.secondaryButton} onClick={(event) => goTo('contact', event)}>Get in touch <Icon name="external" size={17} /></a>
        </div>
        <div className={styles.heroSocial}><span>FIND ME ON</span><Socials compact /></div>
      </div>
      <div className={styles.heroVisual}>
        <div className={styles.visualTop} aria-hidden="true"><span className={styles.visualDots}><i /><i /><i /></span><span>the person behind the code</span><span>01 — 04</span></div>
        <div className={styles.visualCenter}><span className={styles.portraitRing} aria-hidden="true" /><img className={styles.portrait} src={portfolio.portrait} alt={`Portrait of ${portfolio.name}`} /></div>
        <div className={styles.visualBottom}><div className={styles.visualLines}><span /><span /><span /></div><span>CREATE <b>·</b> BUILD <b>·</b> ITERATE</span></div>
        <span className={styles.visualIndex}>001 / INTRODUCTION</span>
      </div>
    </div>
    <div className={`${styles.container} ${styles.heroFoot}`}><span>SCROLL TO EXPLORE</span><span className={styles.heroFootLine} /><span>{portfolio.location}</span></div>
  </section>
}

function SectionHeading({ number, label, title, aside }) {
  return <div className={`${styles.sectionHeading} ${styles.reveal}`}><div><p className={styles.eyebrow}><span className={styles.sectionNumber}>{number}</span> / {label}</p><h2>{title}</h2></div>{aside && <p className={styles.headingAside}>{aside}</p>}</div>
}

function About() {
  return <section id="about" className={`${styles.section} ${styles.aboutSection}`}><div className={styles.container}>
    <SectionHeading number="01" label="THE PERSON" title={<>A little about <em>me.</em></>} />
    <div className={styles.aboutGrid}>
      <div className={`${styles.aboutCopy} ${styles.reveal}`}><p className={styles.aboutLead}>{portfolio.bio}</p><div className={styles.focusLine}><span className={styles.focusIndicator} /><div><small>CURRENT FOCUS</small><p>{portfolio.focus}</p></div></div></div>
      <div className={`${styles.stackPanel} ${styles.reveal}`}><div className={styles.panelTop}><span>THE TOOLKIT</span><span>↗</span></div>{Object.entries(portfolio.stack).map(([group, items]) => <div className={styles.stackRow} key={group}><h3>{group}</h3><div className={styles.chips}>{items.map((item) => <StackChip key={item} name={item} />)}</div></div>)}</div>
    </div>
  </div></section>
}

function Experience() {
  return <section id="experience" className={`${styles.section} ${styles.experienceSection}`}><div className={styles.container}>
    <SectionHeading number="02" label="EXPERIENCE" title={<>The work behind <em>the work.</em></>} aside="Development, delivery, and the responsibilities in between." />
    {portfolio.experience.length ? <div className={styles.experienceList}>
      {portfolio.experience.map((item) => <article className={`${styles.experienceItem} ${styles.reveal}`} key={item.id}>
        <div className={styles.experienceSide}><span className={styles.experiencePeriod}>{item.period}</span><span className={styles.experienceMarker} aria-hidden="true" /></div>
        <div className={styles.experienceBody}>
          <p className={styles.experienceOrg}>{item.organization}</p>
          <h3>{item.role}</h3>
          <p className={styles.experienceDescription}>{item.description}</p>
          {item.highlights?.length > 0 && <ul className={styles.experienceHighlights}>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}
          {item.projectsLink && <a className={styles.experienceLink} href="#projects" onClick={(event) => goTo('projects', event)}>See commissioned projects <Icon name="arrow" size={17} /></a>}
        </div>
      </article>)}
    </div> : <p className={styles.emptyPanel}>Experience entries can be added in <code>src/data.js</code>.</p>}
  </div></section>
}

function ProjectArt({ project }) {
  const [imageFailed, setImageFailed] = useState(false)
  if (project.image && !imageFailed) return <img className={styles.projectImage} src={project.image} alt={`${project.title} preview`} loading="lazy" onError={() => setImageFailed(true)} />
  return <div className={styles.projectArt} aria-label={`${project.title} project illustration`} role="img">
    <div className={styles.artGrid} />
    <div className={styles.artWindow}><div className={styles.artToolbar}><i /><i /><i /><span>MELS / PLATFORM</span></div><div className={styles.artBody}><div className={styles.artSidebar}><span /><span /><span /><span /></div><div className={styles.artContent}><div className={styles.artTitle} /><div className={styles.artTiles}><span /><span /><span /></div><div className={styles.artRows}><span /><span /><span /></div></div></div></div>
    <div className={styles.artPhone}><div className={styles.phoneSpeaker} /><div className={styles.phoneCircle} /><span /><span /><span /></div>
    <span className={styles.artCaption}>WEB PLATFORM + ANDROID APP</span>
  </div>
}

function ProjectCard({ project, client = false, mobile = false }) {
  const [expanded, setExpanded] = useState(false)
  const badge = project.capstone ? 'CAPSTONE' : client ? 'CLIENT WORK' : null
  const meta = mobile ? `MOBILE APP${project.client ? ` / ${project.client}` : ''}` : project.capstone ? `CAPSTONE${project.client ? ` / ${project.client}` : ''}` : client ? `COMMISSIONED${project.client ? ` / ${project.client}` : ''}` : 'PERSONAL PROJECT'
  const media = mobile
    ? <div className={styles.phoneMedia}>{badge && <span className={styles.cardBadge}>{badge}</span>}<div className={styles.phoneFrame}><span className={styles.phoneNotch} aria-hidden="true" />{project.image ? <img src={project.image} alt={`${project.title} app screen`} loading="lazy" /> : <span className={styles.phoneMono} aria-hidden="true">{project.title.slice(0, 2).toUpperCase()}</span>}</div></div>
    : <div className={styles.projectMedia}>{badge && <span className={styles.cardBadge}>{badge}</span>}{project.image || project.id === 'mels' ? <ProjectArt project={project} /> : <div className={styles.projectFallback}><span>{project.title.slice(0, 2).toUpperCase()}</span><small>PROJECT PREVIEW</small></div>}</div>
  return <article className={`${styles.projectCard} ${project.featured ? styles.cardFeatured : ''} ${styles.reveal}`}>
    {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.mediaLink} aria-label={`Open ${project.title} live site`}>{media}</a> : media}
    <div className={styles.projectDetails}><div className={styles.projectMeta}>{meta}<span>↗</span></div><h3>{project.title}</h3>{project.description && <p>{project.description}</p>}<div className={styles.chips}>{project.stack.map((item) => <StackChip key={item} name={item} />)}</div><div className={styles.projectLinks}>
      {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live site <Icon name="external" size={15} /></a>}
      {project.downloadUrl && <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer">Download APK <Icon name="download" size={15} /></a>}
      {!project.downloadUrl && project.downloadPending && <span className={styles.linkPending} title="Download link coming soon">Download APK <Icon name="download" size={15} /></span>}
      {!client && project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub <Icon name="external" size={15} /></a>}
      {client && project.caseStudy && <button type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}> {expanded ? 'Close case study' : 'Read case study'} <Icon name="arrow" size={16} /></button>}
    </div>{expanded && <div className={styles.caseStudy}><strong>THE PROJECT</strong><p>{project.caseStudy}</p></div>}</div>
  </article>
}

function Projects() {
  const personal = portfolio.personalProjects.filter((project) => !project.draft)
  const client = portfolio.clientProjects.filter((project) => !project.draft)
  const mobile = portfolio.mobileProjects?.filter((project) => !project.draft) || []
  return <section id="projects" className={`${styles.section} ${styles.projectsSection}`}><div className={styles.container}>
    <SectionHeading number="03" label="SELECTED WORK" title={<>Things I've <em>built.</em></>} aside="A mix of independent ideas and work made for real people." />
    <div className={styles.workGroup}><div className={styles.groupHeader}><h3>01 <span>/</span> Commissioned work</h3><span>{String(client.length).padStart(2, '0')} PROJECT{client.length === 1 ? '' : 'S'}</span></div>
      {client.length ? <div className={styles.clientGrid}>{client.map((project) => <ProjectCard key={project.id} project={project} client />)}</div> : <div className={styles.emptyPanel}>Client work will appear here once added to <code>src/data.js</code>.</div>}
    </div>
    <div className={styles.workGroup}><div className={styles.groupHeader}><h3>02 <span>/</span> Mobile apps</h3><span>{String(mobile.length).padStart(2, '0')} APP{mobile.length === 1 ? '' : 'S'}</span></div>
      {mobile.length ? <div className={styles.personalGrid}>{mobile.map((project) => <ProjectCard key={project.id} project={project} client mobile />)}</div> : <div className={styles.emptyPanel}>Mobile apps will appear here once added to <code>src/data.js</code>.</div>}
    </div>
    <div className={styles.workGroup}><div className={styles.groupHeader}><h3>03 <span>/</span> Personal projects</h3><span>{String(personal.length).padStart(2, '0')} PROJECT{personal.length === 1 ? '' : 'S'}</span></div>
      {personal.length ? <div className={styles.personalGrid}>{personal.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : <div className={`${styles.emptyPanel} ${styles.personalEmpty}`}><span className={styles.emptyGlyph}>↗</span><div><h4>More work is on the way.</h4><p>Independent projects are being curated. Add your projects in <code>src/data.js</code> and set <code>draft: false</code> to publish them.</p></div></div>}
    </div>
  </div></section>
}

const cacheKey = (username, type) => `portfolio.github.${username}.${type}`
function readCache(key) {
  try { return JSON.parse(localStorage.getItem(key))?.data ?? null } catch { return null }
}
function writeCache(key, data) {
  try { localStorage.setItem(key, JSON.stringify({ data, savedAt: Date.now() })) } catch { /* Storage can be unavailable. */ }
}

function GitHubProfile({ profile, username }) {
  return <div className={styles.githubProfile}><img src={profile.avatar_url} alt={`${profile.login} avatar`} loading="lazy" /><div className={styles.profileInfo}><span className={styles.miniLabel}>DEVELOPER PROFILE</span><h3>{profile.name || profile.login}</h3><a href={profile.html_url} target="_blank" rel="noopener noreferrer">@{profile.login} <Icon name="external" size={14} /></a><p>{profile.bio || `Explore ${username}'s work on GitHub.`}</p></div><div className={styles.profileStats}><div><strong>{profile.public_repos}</strong><span>PUBLIC REPOS</span></div><div><strong>{profile.followers}</strong><span>FOLLOWERS</span></div><div><strong>{profile.following}</strong><span>FOLLOWING</span></div></div></div>
}

const contributionLevels = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 }

function ContributionGraph({ username }) {
  const [calendar, setCalendar] = useState(() => readCache(cacheKey(username, 'contributions')))
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${import.meta.env.BASE_URL}github-contributions.json`, { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        if (response.status === 404 || !response.headers.get('content-type')?.includes('application/json')) return null
        if (!response.ok) throw new Error('Contribution snapshot could not be loaded.')
        const snapshot = await response.json()
        if (snapshot.username?.toLowerCase() !== username.toLowerCase() || !Number.isInteger(snapshot.total) || !Array.isArray(snapshot.weeks) || !snapshot.weeks.length) return null
        return snapshot
      })
      .then((snapshot) => {
        if (!snapshot) { setStatus('missing'); return }
        setCalendar(snapshot)
        writeCache(cacheKey(username, 'contributions'), snapshot)
        setStatus('ready')
      })
      .catch((error) => { if (error.name !== 'AbortError') setStatus('error') })
    return () => controller.abort()
  }, [username])

  const weeks = calendar?.weeks || []
  let lastMonth = ''
  const monthLabels = weeks.map((week) => {
    const firstNewMonth = week.find((day) => day.date?.slice(0, 7) !== lastMonth)
    if (!firstNewMonth) return ''
    lastMonth = firstNewMonth.date.slice(0, 7)
    return new Date(`${firstNewMonth.date}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })
  })

  return <div className={styles.graphPanel}>
    <div className={styles.panelTop}><span>CONTRIBUTION CALENDAR</span><span>{calendar ? 'PUBLIC + PRIVATE' : 'LAST 12 MONTHS'}</span></div>
    {calendar ? <>
      <div className={styles.graphSummary}><strong>{calendar.total.toLocaleString()}</strong><span>contributions in the last year</span></div>
      <div className={styles.graphBody} role="img" aria-label={`${calendar.total.toLocaleString()} GitHub contributions in the last year, including private contributions`}>
        <div className={styles.graphWeeks} aria-hidden="true">{weeks.map((week, index) => <div className={styles.graphWeek} key={week[0]?.date || index}><span className={styles.graphMonth}>{monthLabels[index]}</span><div className={styles.graphDays}>{week.map((day) => <span key={day.date} className={styles.graphDay} data-level={contributionLevels[day.level] ?? 0} title={`${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`} />)}</div></div>)}</div>
      </div>
      <div className={styles.graphFooter}><span>Updated {new Date(calendar.generatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}{status !== 'ready' ? ' (saved copy)' : ''}</span><span className={styles.graphLegend}>Less {[0, 1, 2, 3, 4].map((level) => <i key={level} data-level={level} />)} More</span></div>
      {(status === 'error' || status === 'missing') && <p className={styles.graphError} role="status">Latest contribution snapshot is unavailable. Showing the last saved copy.</p>}
    </> : status === 'loading' ? <div className={styles.graphSkeleton} aria-label="Loading contribution calendar" /> : <p className={styles.graphError} role="status">{status === 'missing' ? 'Private-inclusive contributions are not configured yet. Add the GitHub Actions secret and run the contribution workflow.' : 'Contribution calendar is unavailable right now.'} <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">View on GitHub ↗</a></p>}
    <p className={styles.graphNote}>When connected, counts include eligible commits and other GitHub contributions. Private repository names are never displayed.</p>
  </div>
}

function activityText(event) {
  if (event.type === 'PushEvent') return `Pushed to ${event.repo.name}`
  if (event.type === 'CreateEvent') return `Created ${event.repo.name}`
  if (event.type === 'PullRequestEvent') return `${event.payload.action === 'opened' ? 'Opened' : 'Updated'} a pull request in ${event.repo.name}`
  if (event.type === 'IssuesEvent') return `${event.payload.action === 'opened' ? 'Opened' : 'Updated'} an issue in ${event.repo.name}`
  if (event.type === 'WatchEvent') return `Starred ${event.repo.name}`
  return `Worked on ${event.repo.name}`
}

function ActivityFeed({ events, loading, error }) {
  const recent = events.filter((event) => event.repo).slice(0, 4)
  return <div className={styles.activityPanel}><div className={styles.panelTop}><span>RECENT ACTIVITY</span><span>PUBLIC EVENTS</span></div>
    {loading && !recent.length ? <div className={styles.activitySkeleton}>{[1, 2, 3].map((n) => <div className={styles.skeletonLine} key={n} />)}</div> : recent.length ? <div className={styles.activityList}>{recent.map((event) => <a key={event.id} href={`https://github.com/${event.repo.name}`} target="_blank" rel="noopener noreferrer" className={styles.activityItem}><span className={styles.activityDot} /><span>{activityText(event)}</span><time dateTime={event.created_at}>{new Date(event.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</time></a>)}</div> : <p className={styles.activityEmpty}>{error ? 'Activity is unavailable right now.' : 'No recent public activity to show.'}</p>}
  </div>
}

function GitHubSection() {
  const username = portfolio.githubUsername.trim()
  const configured = isConfigured(username)
  const [profile, setProfile] = useState(() => configured ? readCache(cacheKey(username, 'profile')) : null)
  const [events, setEvents] = useState(() => configured ? readCache(cacheKey(username, 'events')) || [] : [])
  const [loading, setLoading] = useState(configured)
  const [activityLoading, setActivityLoading] = useState(configured)
  const [error, setError] = useState('')
  const [activityError, setActivityError] = useState(false)

  useEffect(() => {
    if (!configured) return
    const controller = new AbortController()
    const getJson = async (path) => {
      const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}${path}`, { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } })
      if (!response.ok) throw new Error(response.status === 403 || response.status === 429 ? 'GitHub API rate limit reached.' : `GitHub returned ${response.status}.`)
      return response.json()
    }
    getJson('').then((data) => { setProfile(data); writeCache(cacheKey(username, 'profile'), data); setError('') }).catch((err) => { if (err.name !== 'AbortError') setError(err.message) }).finally(() => { if (!controller.signal.aborted) setLoading(false) })
    getJson('/events/public?per_page=10').then((data) => { setEvents(data); writeCache(cacheKey(username, 'events'), data); setActivityError(false) }).catch((err) => { if (err.name !== 'AbortError') setActivityError(true) }).finally(() => { if (!controller.signal.aborted) setActivityLoading(false) })
    return () => controller.abort()
  }, [configured, username])

  return <section id="github" className={`${styles.section} ${styles.githubSection}`}><div className={styles.container}>
    <SectionHeading number="04" label="ON GITHUB" title={<>A little more <em>behind the code.</em></>} aside="A public profile and activity feed, with private-inclusive contribution totals when connected." />
    {!configured ? <div className={styles.githubUnconfigured}><div className={styles.githubSymbol}><Icon name="github" size={32} /></div><div><h3>Connect the dots.</h3><p>Add your GitHub username in <code>src/data.js</code> to see your real profile, contributions and recent activity here.</p></div></div> : <>
      {error && <div className={styles.apiNotice} role="status">{error} {profile ? 'Showing the last saved profile.' : 'Please try again later.'}</div>}
      {loading && !profile ? <div className={styles.profileSkeleton} aria-label="Loading GitHub profile"><span /><div><i /><i /><i /></div></div> : profile ? <GitHubProfile profile={profile} username={username} /> : <div className={styles.emptyPanel}>GitHub profile unavailable. <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">Open GitHub ↗</a></div>}
      <div className={styles.githubLower}><ContributionGraph username={username} /><ActivityFeed events={events} loading={activityLoading} error={activityError} /></div>
      {activityError && events.length > 0 && <p className={styles.cacheNote}>Activity could not refresh; showing your last saved events.</p>}
    </>}
  </div></section>
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState(null)
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 5500)
    return () => clearTimeout(timer)
  }, [toast])
  const canSubmit = Boolean(portfolio.formEndpoint || portfolio.email)

  const submit = async (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = 'Enter a valid email address.'
    if (form.message.trim().length < 10) nextErrors.message = 'Please write at least 10 characters.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    if (portfolio.formEndpoint) {
      setSending(true)
      try {
        const response = await fetch(portfolio.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(form) })
        if (!response.ok) throw new Error(portfolio.email ? 'Could not send your message. Please try the email link instead.' : 'Could not send your message. Please try again later.')
        setForm({ name: '', email: '', message: '' })
        setToast({ type: 'success', message: 'Message sent. Thanks for reaching out!' })
      } catch (err) { setToast({ type: 'error', message: err.message }) } finally { setSending(false) }
    } else {
      const subject = encodeURIComponent(`Portfolio inquiry from ${form.name.trim()}`)
      const body = encodeURIComponent(`From: ${form.name.trim()} (${form.email.trim()})\n\n${form.message.trim()}`)
      window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`
      setToast({ type: 'success', message: 'Your email app should open with a draft. Please send it there to finish.' })
    }
  }

  return <section id="contact" className={`${styles.section} ${styles.contactSection}`}><div className={styles.container}>
    <SectionHeading number="05" label="SAY HELLO" title={<>Let's make something <em>matter.</em></>} />
    <div className={styles.contactGrid}><div className={`${styles.contactIntro} ${styles.reveal}`}><p>Have a project in mind, a question, or just want to talk shop? I'd love to hear from you.</p><div className={styles.contactDirect}><span>EMAIL ME DIRECTLY</span>{portfolio.email ? <a href={`mailto:${portfolio.email}`}>{portfolio.email} <Icon name="external" size={17} /></a> : <span className={styles.missingEmail}>Add your email in src/data.js</span>}</div><div className={styles.contactSocial}><span>ELSEWHERE</span><Socials /></div></div>
      <form className={`${styles.contactForm} ${styles.reveal}`} onSubmit={submit} noValidate><div className={styles.formHeader}><span>NEW MESSAGE</span><span>↗</span></div><div className={styles.formRow}><label>Your name<input type="text" name="name" autoComplete="name" placeholder="How should I call you?" value={form.name} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} onChange={(e) => setForm({ ...form, name: e.target.value })} />{errors.name && <small id="name-error" className={styles.fieldError}>{errors.name}</small>}</label><label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" value={form.email} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} onChange={(e) => setForm({ ...form, email: e.target.value })} />{errors.email && <small id="email-error" className={styles.fieldError}>{errors.email}</small>}</label></div><label>Your message<textarea name="message" rows="5" placeholder="Tell me a little about what you're thinking..." value={form.message} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} onChange={(e) => setForm({ ...form, message: e.target.value })} />{errors.message && <small id="message-error" className={styles.fieldError}>{errors.message}</small>}</label><div className={styles.formBottom}><span>{canSubmit ? (portfolio.formEndpoint ? 'I usually respond as soon as I can.' : 'Opens your email app to send.') : 'Add an email or form endpoint in src/data.js to enable messaging.'}</span><button className={styles.primaryButton} type="submit" disabled={!canSubmit || sending}>{sending ? 'Sending...' : 'Send message'} <Icon name="arrow" size={17} /></button></div></form>
    </div>
    {toast && <div className={`${styles.toast} ${toast.type === 'error' ? styles.toastError : ''}`} role="status">{toast.message}<button type="button" onClick={() => setToast(null)} aria-label="Dismiss notification"><Icon name="close" size={17} /></button></div>}
  </div></section>
}

function Footer() {
  return <footer className={styles.footer}><div className={`${styles.container} ${styles.footerTop}`}><a href="#home" className={styles.footerBrand} onClick={(event) => goTo('home', event)}><span>/</span> {isConfigured(portfolio.name) ? portfolio.name : 'portfolio'}<span>.</span></a><p>Made with intention. Built with React.</p><a href="#home" onClick={(event) => goTo('home', event)}>Back to top ↑</a></div><div className={`${styles.container} ${styles.footerBottom}`}><span>© {new Date().getFullYear()} {portfolio.name}. All rights reserved.</span><nav aria-label="Footer navigation">{sections.slice(1).map((id) => <a href={`#${id}`} key={id} onClick={(event) => goTo(id, event)}>{navLabels[id]}</a>)}</nav></div></footer>
}

function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('portfolio.theme') === 'light' ? 'light' : 'dark' } catch { return 'dark' }
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0e1420' : '#f7f6f3')
    try { localStorage.setItem('portfolio.theme', theme) } catch { /* Storage can be unavailable. */ }
  }, [theme])
  useLayoutEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add(styles.isVisible); observer.unobserve(entry.target) } })
    }, { threshold: 0.08 })
    document.querySelectorAll(`.${styles.reveal}`).forEach((element, index) => {
      element.style.setProperty('--stagger', `${Math.min(index % 3, 2) * 90}ms`)
      observer.observe(element)
    })
    document.documentElement.classList.add('has-motion')
    return () => { observer.disconnect(); document.documentElement.classList.remove('has-motion') }
  }, [])
  return <div className={styles.app}><Navbar theme={theme} setTheme={setTheme} /><main><Hero /><About /><Experience /><Projects /><GitHubSection /><Contact /></main><Footer /></div>
}

export default App
