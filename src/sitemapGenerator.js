import { readdirSync, statSync, writeFileSync } from "fs";
import { join, relative } from "path";

const BASE_URL = "https://www.sangatsharma.com.np"; // Replace with your actual domain

// Function to recursively get all page paths
function getPages(directory, pages = []) {
  const files = readdirSync(directory);

  files.forEach((file) => {
    const fullPath = join(directory, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      getPages(fullPath, pages);
    } else if (file.endsWith(".html") || file === "index.html") {
      const pagePath = relative("public", fullPath).replace(/\\/g, "/");
      const formattedPath = pagePath.replace(/index\.html$/, "");
      pages.push(`${BASE_URL}/${formattedPath}`);
    }
  });

  return pages;
}

// Generate sitemap
const pages = getPages(join(process.cwd(), "public"));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((page) => {
      return `
  <url>
    <loc>${page}</loc>
    <changefreq>weekly</changefreq>
  </url>`;
    })
    .join("")}
</urlset>`;

// Save sitemap.xml to public directory
writeFileSync(join(process.cwd(), "public", "sitemap.xml"), sitemap);

console.log("Sitemap generated successfully!");
