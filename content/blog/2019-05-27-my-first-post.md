---
title: my first post
date: 2019-05-28T02:24:39.698Z
description: this is a description of the post
---
![](/img/pp.jpeg "y bueno mijo")

# Gatsby

This guide will help you get started using Netlify CMS and Gatsby.

To get up and running with Gatsby, you’ll need to have Node.js installed on your computer. Note: Gatsby's minimum supported Node.js version is Node 8.

## Create a new Gatsby site

Let's create a new site using the default Gatsby Starter Blog. Run the following commands in the terminal, in the folder where you'd like to create the blog:

```
npm install -g gatsby-cli
```

```
gatsby new blog https://github.com/gatsbyjs/gatsby-starter-blog
```

```
cd blog
```

## Get to know Gatsby

In your favorite code editor, open up the code generated for your "Gatsby Starter Blog" site, and take a look at the content directory.

You will see that there are multiple Markdown files that represent blog posts. Open one .md file and you will see something like this:

```
---
```

```
title: New Beginnings
```

```
date: "2015-05-28T22:40:32.169Z"
```

```
description: This is an optional description for SEO and Open Graph purposes, rather than the default generated excerpt.
```

```
---
```

Far far away, behind the word mountains, far from the countries Vokalia and

Consonantia, there live the blind texts.

We can see above that each blog post has a title, a date, a description and a body. Now, let's recreate this using Netlify CMS.

Note: each existing blog post in gatsby-starter-blog is stored in its own directory. Netlify CMS doesn't work with files that are stored this way (feature request here), so you won't be able to see or edit the starter's included sample blog posts in Netlify CMS, but you will be able to create and edit new posts.

Add Netlify CMS to your site

First let's install some dependencies. We'll need netlify-cms-app and gatsby-plugin-netlify-cms. Run the following command in the terminal at the root of your site:

npm install --save netlify-cms-app gatsby-plugin-netlify-cms

Configuration

For the purpose of this guide we will deploy to Netlify from a GitHub repository which requires the minimum configuration.

Create a config.yml file in the directory structure you see below:

├── static

│   ├── admin

│   │   ├── config.yml

In your config.yml file paste the following configuration:

backend:

  name: git-gateway

  branch: master

media_folder: static/img

public_folder: /img

collections:

\- name: "blog"

\    label: "Blog"

\    folder: "content/blog"

\    create: true

\    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"

\    editor:

\    preview: false

\    fields:

\- { label: "Title", name: "title", widget: "string" }

\- { label: "Publish Date", name: "date", widget: "datetime" }

\- { label: "Description", name: "description", widget: "string" }

\- { label: "Body", name: "body", widget: "markdown" }

Finally, add the plugin to your gatsby-config.js.

plugins: \[\`gatsby-plugin-netlify-cms\`]

Push to GitHub

It's now time to commit your changes and push to GitHub. The Gatsby starter initializes Git automatically for you, so you only need to do:

git add .

git commit -m "Initial Commit"

git remote add origin https://github.com/YOUR_USERNAME/NEW_REPO_NAME.git

git push -u origin master

Add your repo to Netlify

Go to Netlify and select 'New Site from Git'. Select GitHub and the repository you just pushed to. Click Configure Netlify on GitHub and give access to your repository. Finish the setup by clicking Deploy Site. Netlify will begin reading your repository and starting building your project.

Enable Identity and Git Gateway

Netlify's Identity and Git Gateway services allow you to manage CMS admin users for your site without requiring them to have an account with your Git host or commit access on your repo. From your site dashboard on Netlify:

Go to Settings > Identity, and select Enable Identity service.

Under Registration preferences, select Open or Invite only. In most cases, you want only invited users to access your CMS, but if you're just experimenting, you can leave it open for convenience.

If you'd like to allow one-click login with services like Google and GitHub, check the boxes next to the services you'd like to use, under External providers.

Scroll down to Services > Git Gateway, and click Enable Git Gateway. This authenticates with your Git host and generates an API access token. In this case, we're leaving the Roles field blank, which means any logged in user may access the CMS. For information on changing this, check the Netlify Identity documentation.

Start publishing

It's time to create your first blog post. Login to your site's /admin/ page and create a new post by clicking New Blog. Add a title, a date and some text. When you click Publish, a new commit will be created in your GitHub repo with this format Create Blog “year-month-date-title”.

Then Netlify will detect that there was a commit in your repo, and will start rebuilding your project. When your project is deployed you'll be able to see the post you created.

Cleanup

It is now safe to remove the default Gatsby blog posts.
