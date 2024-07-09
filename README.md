<style>
  .code-highlight {
    background-color: lightgray; 
    padding: 7px 25px; 
    margin-left: 15px; 
    margin-bottom: 20px;
  }
</style>

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

<br />
<div id="readme-top" align="center">
  <a href="https://eli-sit.myequity.id/elifeproteksi/?plan=sundayProPlan2">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Logo-equity-life.jpg/1200px-Logo-equity-life.jpg" alt="Logo" width="120" height="80">
  </a>

  <h3 align="center">Social Commerce - ELIFE Proteksi</h3>

  <p align="center">
    An awesome project for retail partner!
    <br />
    <a href="https://gitsource.myequity.id/it-delivery/web-ext-sco"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://eli-sit.myequity.id/elifeproteksi/?plan=sundayProPlan2">View Demo</a>
    ·
    <a href="https://gitsource.myequity.id/it-delivery/web-ext-sco/issues">Report Bug</a>
    ·
    <a href="https://gitsource.myequity.id/it-delivery/web-ext-sco/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

1. Type B2B2C
   Produk Package (White Label/Non White Label Product)
   yang telah ditentukan oleh Partner untuk dijual.
   Metode Penjualannya dapat melalui :
   a. F2F Marketing via Sales Partner
   b. Broadcast Link via Company

2. Type B2C
   Produk White Label yang dapat dicustom sesuai dengan
   pilihan masing-masing Nasabah.

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- Typescript
- NextJs
- React-Query
- React-Hook-Form
- Axios
- TailwindCSS
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

**1. First, Clone this repository either using https or ssh:**

```bash
  $ git clone http://gitsource.myequity.id/it-delivery/web-ext-sco.git
```

**2. Install all dependencies**

```bash
  $ yarn install
```

**3. Prepare husky, install husky in global environment.**

```bash
  $ yarn -g install husky
```

**4. Prepare husky, initiate husky**

```bash
  $ yarn run prepare
```

**5. Clone file .env.example as .env and populate with your envar.**

**6. Run code, and enjoy the journey** **(^\_^)**

```bash
  $ npm run dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## How to Build Production

> Cause of complicacy for setup an dynamic envar to be consume by next.config.ts through deployment, so in every deployment is a must to create an image first with env already populate with environment requirement (SIT/UAT/PROD).

**1. First, Copy .env.example >> .env , and change the value accordingly.**

**2. Second, Build docker using dockerfile, (please use a tag):**

```bash
  $ docker build -t endiazequitylife/web-ext-sco:1.0.0 .
```

**3. Third, test run on local using docker compose, file docker.compose.yaml. Change image options to your image created before, then:**

```bash
  $ docker compose up
```

**4. fourth, If all function already as your expected then push image to hub. Default hub we use is 'endiazequitylife/web-ext-sco':**

```bash
  $ docker push endiazequitylife/web-ext-sco:1.0.0
```

**5. Last, ask for deployment.**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Utilities

**1. Format code using prettier.**

```bash
  $ yarn run format
```

**2. Check Linter or CSS Linter.**

```bash
  $ yarn run lint
or
  $ yarn run lint:css
```

**3. Run storybook.**

```bash
  $ yarn run build-storybook<br />
  $ yarn run storybook
```

**4. Add new component.**

```bash
  $ yarn run add-component --type={atoms|elements|layouts} --name={componentName} --variant={componentVariant}
```

**5. Add new page.**

```bash
  $ yarn run add-page --route={routeName}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are what make this project such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please clone the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Clone the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m '{type}({scope}): {details}'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## File Journey

```graphql
├───.husky
│    └───\_
├───.storybook
├───.vscode
├───app
│    ├───layout.tsx
│    └───(partner)
│         ├───page.tsx
│         ├───error
│         │   ├───404
│         │   └───invalid-link
│         ├───_dashboard
│         ├───_data-ahli-waris
│         ├───_data-diri
│         ├───_failed
│         ├───_metode-pembayaran
│         ├───_pembayaran
│         ├───_pernyataan-nasabah
│         ├───_ringkasan
│         ├───_success
│         ├───_swafoto
│         │   ├───ktp
│         │   └───selfie
│         └───_verifikasi
├───public  #Folder used for project assets like images, icons, docs, locales, etc..
│     ├───assets
│     │ ├───icons
│     │ └───images
│     └───locales
├───shell  #Folder used by infra team for place any shell code
├───components  #Folder used for place any components used by page or any frequently used layouts
│     ├───atoms
│     ├───elements
│     └───layouts
├───state  #Folder used for state definition
│     ├───base  #Where new connection axios initialize
│     ├───provider  #Where state provider was placed
│     ├───queries  #Where to create definition for state management
│     └───service  #Where you put connection to backend and consumed by state
├───styles  #Folder used for place any global style/css
├───types  #Folder used for place any types definition
├───utils  #Folder used for place any function utility that frequently used
│     └───generator
├───.editorconfig
├───.env
├───.gitignore
├───.infisical.json
├───.lintstagedrc.js
├───.prettierignore
├───.prettierrc
├───CHANGELOG.md
├───eslintrc.json
├───commitlint.config.js
├───docker-compose.yaml
├───Dockerfile
├───Jenkinsfile
├───next.config.mjs
├───ni18n.config.ts.js
├───package.json
├───package-lock.yaml
├───postcss.config.js
├───README.md
├───sonar-project.properties
├───stylelint.config.js
├───tailwind.config.js
└───tsconfig.js
```
