const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const repoRoot = path.resolve(__dirname, "..");
const postsDir = path.join(repoRoot, "posts");
const articlesOutput = path.join(postsDir, "articles.js");

function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };

  const rawMeta = match[1];
  const body = match[2];
  const meta = {};

  for (const line of rawMeta.split("\n")) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;

    let value = m[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    meta[m[1].trim()] = value;
  }

  return { meta, body };
}

function slugify(input) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function renderHtml(post) {
  const htmlBody = marked.parse(post.body || "");
  const title = escapeHtml(post.meta.title || "Untitled");
  const date = escapeHtml(post.meta.date || "");
  const minutes = post.meta.minutes ? `${escapeHtml(post.meta.minutes)} min read` : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    body {
      max-width: 760px;
      margin: 40px auto;
      padding: 0 20px;
      font-family: Georgia, serif;
      line-height: 1.8;
      color: #222;
    }
    h1, h2, h3 { line-height: 1.2; }
    a { color: #3b3b72; }
    .meta {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 24px;
    }
    .back-link {
      display: inline-block;
      margin-bottom: 18px;
      color: #3b3b72;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <a class="back-link" href="../index.html">← Back to home</a>
  <div class="meta">${date}${date && minutes ? " • " : ""}${minutes}</div>
  <article>${htmlBody}</article>
</body>
</html>`;
}

function main() {
  ensureDir(postsDir);

  const markdownFiles = fs
    .readdirSync(postsDir)
    .filter(file => file.endsWith(".md"))
    .sort();

  const validSlugs = new Set();

  const articleList = [];

  for (const fileName of markdownFiles) {
    const fullPath = path.join(postsDir, fileName);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { meta, body } = parseFrontmatter(raw);

    const base = fileName.replace(/\\.md$/, "");
    const slug = slugify(base) || "post";
    const htmlPath = path.join(postsDir, `${slug}.html`);

    validSlugs.add(slug);

    const title = meta.title || base.replace(/[-_]/g, " ");
    const articlePath = `posts/${slug}.html`;

    fs.writeFileSync(htmlPath, renderHtml({ meta, body }));

    articleList.push({
      id: slug,
      title,
      category: meta.category || "General",
      description: meta.description || "",
      path: articlePath,
      date: meta.date || "",
      minutes: Number(meta.minutes || 0)
    });
  }

  // Delete stale generated HTML files that no longer have a matching .md file
  const generatedHtmlFiles = fs
    .readdirSync(postsDir)
    .filter(file => file.endsWith(".html") && file !== "index.html");

  for (const file of generatedHtmlFiles) {
    const base = file.replace(/\\.html$/, "");
    if (!validSlugs.has(base)) {
      fs.unlinkSync(path.join(postsDir, file));
    }
  }

  // Write the homepage list (this is what your site reads)
  fs.writeFileSync(
    articlesOutput,
    `window.ChaturmukhiArticles = ${JSON.stringify(articleList, null, 2)};\n`
  );

  console.log(`Built ${articleList.length} articles`);
}

main();
