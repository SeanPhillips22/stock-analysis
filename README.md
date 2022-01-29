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

1. First, make sure you have [Visual Studio Code](https://code.visualstudio.com/), [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/) installed (they're all free)
2. Create a folder on your desktop called "StockAnalysis"
3. Open Visual Studio Code. Click "File" and "Open Folder" -- then find the folder you created and click "Select Folder"
4. Hit CMD+J or CTRL+J to open the terminal in VS Code
5. Write this exact command and hit enter: `git clone https://github.com/stockanalysisdev/stock-analysis.git .` (make sure to include the period at the end)
6. Write this command and hit enter: `npm install` (installs dependencies)
7. Follow [Supabase Instructions](https://github.com/stockanalysisdev/stock-analysis#supabase-instructions) to to setup your backend and get values needed in `.env` file
8. Write this command and hit enter: `npm run dev` (starts development server)
9. You should now be able to open the site in your web browser with this URL: `http://localhost:3001`

### Supabase Instructions

Supabase is a service that we use on the back-end.

**Here are the steps to set it up:**
- Go to the [Subpabase website](https://app.supabase.io/)
- Sign in with GitHub
- Click on `Authorize Supabase`
- Click on `New project`
- Give it a name (for example: stock-analysis)
- Enter a Database Password
- For Region, you can leave it as default or select another region that is closest to you
- Select **Free tier** Pricing Plan
- Click on Create new project (will take a few minutes to complete setup)
- Once created, under `Project Configuration`, copy URL and paste in `.env` for `NEXT_PUBLIC_SUPABASE_URL`
- under `Project API keys`, copy `anon` `public` key and paste in `.env` for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- You are done! Continue last steps in [How to start](https://github.com/stockanalysisdev/stock-analysis#how-to-start) section.

Congrats! 🎉 You now have the site running locally on your own computer, with the site's code ready to edit from Visual Studio Code.

## License

This code is licensed under the MIT license. See the [LICENSE](/LICENSE) file for more info.
