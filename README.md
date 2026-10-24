# Chaturmukhi Darshan

A lightweight static blog for philosophical writing and reflections.

This project is intentionally simple: it is a static GitHub Pages website built with plain HTML, CSS, and JavaScript. There is no server, database, build step, or framework required.

## How to publish a new article

1. Open the `posts/` folder.
2. Copy the structure from `posts/article-template.html`.
3. Rename the file to something meaningful, for example:
   - `posts/first-essay.html`
   - `posts/seeing-the-world.html`
4. Write your article content in that file.
5. Add the article to the homepage list by editing `posts/articles.js`.
6. Commit the changes and push them to GitHub.
7. Visit the live site to confirm the article appears correctly.

## Add an article to the homepage

Open `posts/articles.js` and add an object in this format:

```js
window.ChaturmukhiArticles = [
  {
    title: 'The Four Directions of Insight',
    description: 'A reflection on looking at life from different perspectives.',
    path: 'posts/the-four-directions-of-insight.html'
  }
];
```

Add one object per article. The homepage displays each item in the same order as the array.

## Beginner-friendly workflow

### Step 1: Create the article page

Make a copy of `posts/article-template.html`.

Rename it to something like:

- `posts/meaning-and-duty.html`
- `posts/inner-vision.html`
- `posts/faith-and-reason.html`

Then replace the placeholder title, summary, and article text with your own writing.

### Step 2: Add it to the homepage

In `posts/articles.js`, add a new article object using the same template shown above.

### Step 3: Publish to GitHub

1. Save the files.
2. Commit the changes.
3. Push to the main branch.
4. Wait a few minutes for GitHub Pages to update.

### Step 4: Check the live website

Open:

https://deepak4730.github.io/Chaturmukhi-Darshan/

Then click the article card to confirm it opens the correct page.

## Important notes

- Every article should live in its own HTML file inside the `posts/` folder.
- The homepage displays only the entries listed in `posts/articles.js`.
- This is a static site, so it does not require a database or backend.
- If no article has been published yet, the homepage stays empty rather than inventing content.

## File structure

- `index.html` — homepage
- `posts/article-template.html` — copy this to create a new article file
- `posts/articles.js` — article list shown on the homepage
- `README.md` — instructions for future publishing

## Very simple summary

To add your next article:

1. Copy `posts/article-template.html`
2. Rename it and edit the content
3. Add it to `posts/articles.js`
4. Push to GitHub

That is all you need to do for a new static article page.
