# Chaturmukhi Darshan

A lightweight static philosophy blog built for GitHub Pages.

This repository is intentionally simple: it uses static HTML files, no server, no database, and no build step.

## How to add a new article

1. Create a new file in the `posts/` folder.
2. Copy the structure from `posts/article-template.html`.
3. Replace the placeholder title, short description, and article text with your own content.
4. Add the article to `posts/articles.js` so it appears on the homepage.
5. Commit and push the changes to GitHub.
6. Check the live GitHub Pages site to confirm the article appears correctly.

## Step-by-step

### 1) Create the article page

In the `posts/` folder, create a new HTML file such as:

- `posts/four-directions.html`
- `posts/the-source-of-meaning.html`

Use the same design and structure as `posts/article-template.html`.

### 2) Add the article to the homepage list

Open `posts/articles.js` and add a new object like this:

```js
window.ChaturmukhiArticles = [
  {
    title: "The Four Directions of Insight",
    description: "A short reflection on different ways to look at life.",
    path: "posts/four-directions.html"
  }
];
```

You can add more posts by adding more objects to the array.

### 3) Publish changes to GitHub

1. Save your files.
2. Open GitHub Desktop or the repository in GitHub.
3. Commit the changes.
4. Push to the `main` branch.
5. Wait a few minutes for GitHub Pages to update.

### 4) Check the live website

Visit:

- https://deepak4730.github.io/Chaturmukhi-Darshan/

Then click the new article card to verify it opens the correct post page and that the theme toggle still works.

## Important notes

- This is a static website, so there is no server-side database or CMS.
- Every published article should have its own HTML file in `posts/`.
- The homepage shows only the article entries listed in `posts/articles.js`.
- If no article is published yet, the homepage will show a simple empty-state message instead of inventing content.

## File overview

- `index.html` — homepage
- `posts/` — individual article pages
- `posts/articles.js` — homepage article list
- `posts/article-template.html` — copy this when creating a new article

## Beginner-friendly summary

To publish a new article:

1. Copy `posts/article-template.html`.
2. Rename it to a meaningful file name.
3. Edit the content inside that file.
4. Add the article to `posts/articles.js`.
5. Push the changes to GitHub.

If you want, you can later add more articles in the same way without changing the site design or framework.
