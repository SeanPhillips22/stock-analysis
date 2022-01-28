<div align="center">
		<a href="https://stockanalysis.com/" target="_blank"><img src="https://stockanalysis.com/logo.png" width="120" height="120" /></a>
		<h1 align="center">Stock Analysis</h1>
</div>

## Introduction

This is the public code repository for [StockAnalysis.com](https://stockanalysis.com/). We want to build the world's best free investing website.

## About the project

The site is running on React/NextJS and is written in Javascript and Typescript. It's styled with Tailwind CSS.

## Key goals

-  Be the fastest finance website on the internet.
-  Have the best user experience of all the investing sites.
-  Be super easy to use and understand. Things should "just work" and feel intuitive to use.
-  The data and info should always be up-to-date and accurate.

## How to contribute

Anyone is welcome to contribute to this project.

If you help drive significant improvements to the site, then you will get a free Stock Analysis Pro account as long as you remain an active contributor. Send an email to kris@stockanalysis.com for more info about that.

### How to start

You can easily download the code and run the site on your own computer by cloning the repository and running "npm install" and "npm run dev".

**Here are the steps to do it:**
1. Install [Node.js](https://nodejs.org/en/) and [Git](https://git-scm.com/)
2. Clone the repository: `git clone https://github.com/stockanalysisdev/stock-analysis.git`
3. `cd stock-analysis`
4. Install dependencies: `npm install`
5. Create a file called `.env` and copy the contents of `example.env` to `.env` file
6. Follow [Supabase Instructions](https://github.com/stockanalysisdev/stock-analysis#supabase-instructions) to to setup your backend and get values needed in `.env` file
7. Start development server: `npm run dev`
8. Open URL in browser: `http://localhost:3001`


### Supabase Instructions

Supabase is a collection of tools that helps developers build projects more quickly by automatically handling a whole lot of the behind-the-scenes work and wiring.

**Here are the steps to set it up:**
- Go to [subpabase website](https://app.supabase.io/)
- Sign in with github
- Click on `Authorize Supabase`
- Click on `New project`
- Give it a name (for example: stock-analysis)
- Enter a Database Password
- For Region, you can leave it as default or select another region that is closest to you
- Select **Free tier** Pricing Plan
- Click on Create new project (will take a few minutes to complete setup)
- Once created, under `Project Configuration`, copy URL and paste in `.env` for `NEXT_PUBLIC_SUPABASE_URL`
- under `Project API keys`, copy `anon` `public` key and paste in `.env` for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- You are done! You have now successfully setup your backend with supabase. Continue last steps in [How to start](https://github.com/stockanalysisdev/stock-analysis#how-to-start) section.

Congrats! 🎉 You now have the site running locally on your own computer, with the site's code ready to edit from Visual Studio Code.

## License

This code is licensed under the MIT license. See the [LICENSE](/LICENSE) file for more info.
