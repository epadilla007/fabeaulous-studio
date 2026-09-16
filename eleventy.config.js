export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy("src/*.png");

  // Collapse whitespace-only lines in output HTML
  eleventyConfig.addTransform("tidy", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      return content.replace(/\n\s*\n+/g, "\n");
    }
    return content;
  });

  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));
  eleventyConfig.addFilter("absUrl", (path, base) => new URL(path, base).href);

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
  };
}
