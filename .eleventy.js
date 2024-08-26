module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.setTemplateFormats(["md", "njk"]);

  eleventyConfig.addCollection("transmissions", function (collection) {
    // Filter the collection to include only transmissions
    return collection
      .getAll()
      .filter((item) => item.inputPath.startsWith("./transmissions/"));
  });

  eleventyConfig.addCollection("pages", function (collectionApi) {
    return collectionApi.getFilteredByGlob("pages/**/*.md").sort((a, b) => {
      return (a.data.nav_order || 0) - (b.data.nav_order || 0);
    });
  });
};
