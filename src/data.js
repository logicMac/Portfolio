// Edit this file to personalize the site. Draft projects remain hidden until published.
import portrait from './738511544_1512788836980141_6954445745123573325_n-removebg-preview.png'
import melsLanding from './mels-landing.jpg'
import projEarthquake from './proj-earthquake.jpg'
import projUndas from './proj-undas.jpg'
import projAgro from './proj-agro.jpg'
import melsAppLogin from './849193688_1663489988562389_4433579383870432495_n.jpg'
import projEvent from './proj-event.png'
import moteApp from './849193688_3218257408360051_7830370643489432698_n.jpg'

export const portfolio = {
  name: 'Mac Lovell Keith D. Ates',
  portrait,
  role: 'Full Stack Developer & DevOps',
  tagline: 'I turn complex ideas into thoughtful, useful software, from interface to deployment.',
  location: 'Building for the web and beyond',
  bio: 'I am a full stack developer who also handles the DevOps side: interfaces, APIs, databases, and the pipelines that ship them. My work spans independent experiments and software made for real teams and communities.',
  focus: 'Full stack development and dependable deployments.',
  availability: 'Open to thoughtful collaborations',
  email: 'dumasmackie@gmail.com', // e.g. hello@example.com
  formEndpoint: '', // Optional: your Formspree or Web3Forms-compatible endpoint
  githubUsername: 'logicMac',
  socials: {
    linkedin: '',
    facebook: '',
  },
  stack: {
    Frontend: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS'],
    Backend: ['PHP', 'Node.js', 'Express.js', 'REST API', 'JWT', 'MySQL', 'MongoDB'],
    Mobile: ['Flutter', 'Dart'],
    DevOps: ['Docker', 'GitHub Actions'],
    Tools: ['Git', 'Postman', 'Claude', 'Vite', 'Figma', 'VS Code'],
  },
  experience: [
    {
      id: 'codecollective',
      period: 'June 2026 - Present',
      organization: 'CodeCollective',
      role: 'Lead Developer & DevOps Intern',
      description: 'I work on a learning management system across development and developer operations. Alongside leading its development work, I built two mobile applications, containerized the application, and automated the workflows used to build and deliver changes.',
      highlights: [
        'Develop features for the learning management system and guide its technical implementation.',
        'Developed two mobile applications during the internship.',
        'Containerize the application for a more consistent development and deployment process.',
        'Automate development workflows to reduce manual steps in delivery.',
      ],
    },
    {
      id: 'commissioned',
      period: 'Project-based',
      organization: 'Independent client work',
      role: 'Full Stack Developer',
      description: 'I build commissioned software for schools and local organizations, taking projects from interface and application logic through to deployment. The work includes a seismic monitoring system, cemetery mapping, an agro nursery platform, and the MOTE attendance and event evaluation system with its mobile scanner app.',
      highlights: [],
      projectsLink: true,
    },
  ],
  personalProjects: [
    {
      id: 'mels',
      title: 'MELS',
      client: 'Matutum View Baptist Academy',
      capstone: true,
      description: 'My capstone project: an enrollment and learning management system for Matutum View Baptist Academy, with a web platform and a companion Android app.',
      stack: ['PHP', 'MySQL', 'Tailwind CSS', 'Flutter', 'Dart'],
      caseStudy: 'MELS brings enrollment and learning management together for Matutum View Baptist Academy. The project includes a PHP and MySQL web application styled with Tailwind CSS, alongside a Flutter and Dart Android companion app.',
      image: melsLanding,
      liveUrl: 'https://matutumlms.com',
      featured: true,
      githubUrl: '',
    },
    { id: 'personal-1', draft: true, title: 'Your first project', description: '', stack: [], liveUrl: '', githubUrl: '', image: '' },
    { id: 'personal-2', draft: true, title: 'Your second project', description: '', stack: [], liveUrl: '', githubUrl: '', image: '' },
    { id: 'personal-3', draft: true, title: 'Your third project', description: '', stack: [], liveUrl: '', githubUrl: '', image: '' },
  ],
  clientProjects: [
    {
      id: 'seismic',
      title: 'Earthquake Detection & Seismic Monitoring',
      client: 'Notre Dame - Siena College of Polomolok',
      description: 'Real-time seismic monitoring dashboard for the ND-SCPM campus, fed by an ESP32 + MPU6050 sensor node with SMS alerting.',
      stack: ['PHP', 'MySQL', 'JavaScript', 'ESP32', 'Arduino'],
      image: projEarthquake,
      liveUrl: 'https://earthquake.matutumlms.com',
    },
    {
      id: 'cemetery',
      title: 'Matinao Memorial Cemetery System',
      client: 'Matinao Memorial Cemetery',
      description: 'GPS-enabled cemetery mapping and records system with a visitor portal, plot reservations, and an admin panel.',
      stack: ['PHP', 'MySQL', 'JavaScript'],
      image: projUndas,
      liveUrl: 'https://undas.matutumlms.com',
    },
    {
      id: 'agro',
      title: 'ANFPSQTS — Agro Nursery Farm System',
      client: 'Municipality of Polomolok',
      description: 'Sales and quality tracking for the municipal agro nursery: inventory, batch grading, traceability, and ready-date forecasts.',
      stack: ['PHP', 'MySQL', 'Tailwind CSS'],
      image: projAgro,
      liveUrl: 'https://agro.matutumlms.com',
    },
    {
      id: 'events',
      title: 'MOTE — Attendance & Event Evaluation',
      client: 'Notre Dame - Siena College of Polomolok',
      description: 'A unified platform for event management, QR-based attendance tracking, and real-time monitoring for ND-SCP events and activities.',
      stack: ['PHP', 'Tailwind CSS'],
      image: projEvent,
      liveUrl: 'https://event.matutumlms.com/web/',
    },
  ],
  mobileProjects: [
    {
      id: 'mels-android',
      title: 'MELS Companion App',
      client: 'Matutum View Baptist Academy',
      capstone: true,
      description: 'The Android companion to MELS, giving students and staff mobile access to the platform.',
      stack: ['Flutter', 'Dart'],
      image: melsAppLogin,
      liveUrl: '',
      downloadUrl: 'https://www.mediafire.com/file/6siskxqn85m68z2/app-release.apk/file',
    },
    {
      id: 'mote',
      title: 'Mote',
      client: 'Notre Dame - Siena College of Polomolok',
      description: 'An event attendance scanner for students and staff. It verifies check-ins with geolocation — detecting whether an attendee is inside the event radius — and generates AI-powered insights, anomaly detection, and reports.',
      stack: ['Flutter', 'Dart'],
      image: moteApp,
      liveUrl: '',
      downloadUrl: '', // Paste the APK link here; downloadPending shows a dimmed button until then
      downloadPending: true,
    },
    { id: 'mobile-2', draft: true, title: 'CodeCollective app two', client: 'CodeCollective', description: '', stack: ['Flutter', 'Dart'], image: '', liveUrl: '' },
  ],
}

export const isConfigured = (value) => Boolean(value && !value.startsWith('['))
