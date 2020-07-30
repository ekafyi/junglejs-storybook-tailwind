# JungleJS + Storybook + TailwindCSS starter site

<p align="center"><img src="https://image.flaticon.com/icons/svg/2950/2950532.svg" width="120" height="120" alt="" /></p>

A starter site for:

- [JungleJS](https://www.junglejs.org) — Svelte and GraphQL-based static site generator
- [Storybook](https://storybook.js.org) — UI development environment
- [TailwindCSS](https://tailwindcss.com) — utility-first CSS framework

Read my introduction posts on DEV:

- [JungleJS + Storybook + TailwindCSS starter](https://dev.to/ekafyi/junglejs-storybook-tailwindcss-starter-site-3dmf)
- [Get asynchronous data in JungleJS, the new Svelte JAMstack library](https://dev.to/ekafyi/get-asynchronous-data-in-junglejs-the-new-svelte-jamstack-library-1dkm)

## Branches

- [master](https://github.com/ekafyi/junglejs-storybook-tailwind/tree/master) — JungleJS + Storybook + Tailwind CSS
- [with-async-data](https://github.com/ekafyi/junglejs-storybook-tailwind/tree/with-async-data) — master + async data fetching example

## Quick start

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https%3A%2F%2Fgithub.com%2Fekafyi%2Fjunglejs-storybook-tailwind%2Ftree%2Fmaster) [![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ekafyi/junglejs-storybook-tailwind)

Or [create a new repo](https://github.com/ekafyi/junglejs-storybook-tailwind/generate) with Github template.

## Install and develop

```bash
# Install the global Netlify CLI package if you haven’t
npm install netlify-cli -g

# Clone and go to project directory
git clone https://github.com/ekafyi/junglejs-storybook-tailwind.git
cd junglejs-storybook-tailwind

# Install dependencies
npm install

# Start Jungle server
npm run start

# Start Storybook server
npm run storybook
```

Jungle runs on `localhost:3000`.

Storybook runs on `localhost:6006`.

## Directory structure

```sh
root
├── .storybook # Storybook config
├── src
│   ├── # ... Jungle components & routes dir
│   ├── stories # Storybook sample stories
│   ├── tailwind.css # Tailwind source file
│   └── template.html # Jungle template (with global.css swapped for tailwind.css)
├── static
│   ├── # ... other Jungle assets
│   ├── global.css # default Jungle CSS (not used)
│   └── tailwind.css # Tailwind output/generated file
├── # ... default jungle & package files
├── postcss.config.js
└── tailwind.config.js
```

This starter uses as much default settings & file structure as possible. Only custom configuration files are shown above.

## Storybook

**.storybook/main.js**

In this starter, your Storybook files should have the extension `.stories.js`. The default sample stories are in `src/stories`, but you can move it anywhere within the `src` directory. You can override this configuration and add further customization in `.storybook/main.js`. More info: https://storybook.js.org/docs/configurations/overview

**.storybook/preview.js**

This file contains decorators for the `@storybook/addon-a11y` addon.

**.storybook/preview-head.html**

This file adds the generated CSS file (`tailwind.css`). Tailwind by default includes normalize and base styles, so [Jungle global CSS](https://github.com/junglejs/junglejs/blob/master/example/static/global.css) is not necessary; I leave it commented out.
More info: https://storybook.js.org/docs/configurations/add-custom-head-tags

## Tailwind

This starter uses Tailwind with PostCSS on its own, NOT integrated to Storybook [custom webpack config](https://storybook.js.org/docs/configurations/custom-webpack-config/) nor to [Jungle config](https://github.com/ekafyi/junglejs-storybook-tailwind/blob/master/jungle.config.js). We simply run and watch for changes during development (`start` and `storybook` commands), and generate an optimized build version in `build` and `build-storybook`.

- To modify the postcss commands (including source and output files), open `package.json`.
- To integrate Tailwind with Storybook, [refer to this discussion](https://github.com/storybookjs/storybook/issues/4038).

**src/tailwind.css**

Source Tailwind file. Add your additional global styles here.

**src/static/tailwind.css**

Output/generated Tailwind file. You should not be modifying this. It is minified during production.

**postcss.config.js**

PostCSS configuration file. [cssnano](https://cssnano.co/) (PostCSS minifier) and [autoprefixer](https://github.com/postcss/autoprefixer) are only run during production (`npm run build:css`). More info: https://tailwindcss.com/docs/using-with-preprocessors/#using-postcss-as-your-preprocessor

**tailwind.config.js**

Tailwind configuration file. The `purge` object defines what files are checked when “purging” (removing unused Tailwind classes in production).

More info:

- https://tailwindcss.com/docs/configuration
- https://tailwindcss.com/docs/controlling-file-size/

## Deploy

Run `npm run build`.

Your site is in the `jungle/build` directory, ready to publish anywhere that hosts static sites (Github Pages, Netlify, Vercel, any cPanel-based hosting).

### Netlify CI/CD

Deploy your project to a Github or GitLab repo.

Run `netlify init` (or `ntl init` for short) to start the continuous deployment wizard. With this setup, Netlify will automatically build every time you push to your chosen branch.

More info: https://docs.netlify.com/configure-builds/get-started

### Vercel CI/CD

(Similar feature is available on Vercel but I haven’t got round to trying it. PR welcome.)

## Credits

Boilerplate code from [Jungle template](https://github.com/junglejs/template). Repo icon/logo by [Freepik](http://www.freepik.com) from [Flaticon](https://www.flaticon.com).

---

(c) 2020 Eka MIT License
