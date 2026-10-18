# Developer portfolio

A single-page React/Vite portfolio with dark and light themes, commissioned and personal work, live GitHub data, and a contact form.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Use `npm run build` to create a production build in `dist/`.

## Make it yours

All editable content lives in `src/data.js`:

- Replace `[MY NAME]` and `[GITHUB_USERNAME]`; update the role, bio, focus, tech stack and social URLs. The hero portrait is imported at the top of `src/data.js`; replace the image or update that import to use another photo.
- Edit `experience` in `src/data.js` to update roles, dates, responsibilities and the commissioned-work summary. The CodeCollective start year is set to 2026 based on the current date; change it if your internship began in another year.
- Add your email address to `email`. The contact form opens a prefilled email draft when no form service is configured. Alternatively, set `formEndpoint` to your Formspree form URL to send messages directly; set an email too so visitors can contact you if the form service fails. An unconfigured form is intentionally disabled rather than pretending to send messages.
- Three personal project draft entries are ready to fill out. Add a description, stack, optional screenshot path (for example `/images/project.png`, with the file in `public/images/`), live URL and GitHub URL, then change `draft` to `false`. Draft entries are not shown on the site.
- Edit the MELS case study and add screenshots or live links only when you have them. Private client work does not require a public repository.

The GitHub section fetches public profile statistics and public events from GitHub's REST API. It displays the contribution calendar from `public/github-contributions.json`, generated using an authenticated GitHub Action. Profile, activity and contribution responses are cached in the visitor's browser for temporary outages. The contribution chart is drawn locally with theme-specific colors rather than using a third-party image.

### Include private GitHub contributions

GitHub's public events API and public graph image cannot show private activity. To show the same aggregate contributions visible on your signed-in GitHub profile:

1. Host this project in a GitHub repository under the account named by `githubUsername` in `src/data.js`. The workflow reads the username from that file.
2. Create a GitHub personal access token **for that same account**, with permission to read its private contributions through GraphQL. Store it under repository **Settings → Secrets and variables → Actions** as `PORTFOLIO_GITHUB_TOKEN`. A classic token with `read:user` and access to the relevant private repositories may be needed, depending on your GitHub permissions. Do not put the token in Vite environment variables, source files or browser code.
3. Under **Actions → Refresh contribution calendar**, choose **Run workflow** once. It will commit `public/github-contributions.json` with daily counts and a total but **no private repository names or token**. The scheduled workflow refreshes daily at 03:17 UTC. Deploy the updated build so visitors see the new snapshot.
4. If the website is deployed from a separate host, ensure its build updates when the snapshot commit lands. Scheduled Actions can be disabled on inactive repositories; use **Run workflow** to restart them.

Until that first workflow run, the portfolio shows a setup message and a link to GitHub, not a misleading public-only graph. The displayed number represents all GitHub contributions (including eligible commits, pull requests and issues), not commits alone. GitHub must count your private activity for the signed-in account; enable private contributions in your GitHub profile settings if necessary. Publishing the JSON makes **daily aggregate counts public**, even though repository names remain hidden. To generate locally with a token supplied only in your shell environment, run `node scripts/update-contributions.mjs`; never commit the token.

Technology logos are loaded from the Devicon CDN, with text labels remaining visible if an icon cannot load. GitHub Actions and Docker are grouped under DevOps, while MongoDB is under Backend and TypeScript under Frontend.

Theme preference is saved in `localStorage`. The layout, animations, keyboard focus states, mobile navigation, and reduced-motion setting are handled in `src/App.module.css` and `src/App.jsx`.
