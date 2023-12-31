# Astro Template

[astro.benwk.app](https://astro.benwk.app)

## 🛖 Build Environment Variables

```shell
# Configs for meta of og and twitter
PROTOCOL=http
HOSTNAME=localhost
PORT=4321
TWITTER=benwkz
GA_MEASUREMENT=G-xxxx
ENVIRONMENT=development
SENTRY_PUBLIC_KEY=xxxxx
SENTRY_PROJECT_ID=00000
SENTRY_ORG_ID=oxxxx
```

## 🚀 Project Structure

Inside of this project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🧪 Testing

Currently, we're using:

- Vitest for unit tests
- Cypress for component tests and e2e tests
