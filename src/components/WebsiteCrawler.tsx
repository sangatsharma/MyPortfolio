import React, { useEffect, useState } from "react";

interface CrawledItem {
  route: string;
  divIds: string[];
}

const WebsiteCrawler: React.FC = () => {
  const [crawledData, setCrawledData] = useState<CrawledItem[]>([]);

  useEffect(() => {
    // Simulate crawling: Example routes and divs
    const routes = [
      { path: "/", content: document.querySelectorAll("div") },
      { path: "/about", content: document.querySelectorAll("#about div") },
      { path: "/contact", content: document.querySelectorAll("#contact div") },
    ];

    // Map the routes and extract div IDs
    const crawled = routes.map((route) => ({
      route: route.path,
      divIds: Array.from(route.content).map((div) => div.id || "Unnamed"),
    }));

    setCrawledData(crawled);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Website Crawled Data</h1>
      <pre className=" p-4 rounded shadow">
        {JSON.stringify(crawledData, null, 2)}
      </pre>
    </div>
  );
};

export default WebsiteCrawler;
