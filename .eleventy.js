module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.setTemplateFormats(["md", "njk"]);

  eleventyConfig.addCollection("transmissions", function (collection) {
    return collection
      .getAll()
      .filter((item) => item.inputPath.startsWith("./transmissions/"));
  });

  eleventyConfig.addCollection("pages", function (collectionApi) {
    return collectionApi.getFilteredByGlob("pages/**/*.md").sort((a, b) => {
      return (a.data.nav_order || 0) - (b.data.nav_order || 0);
    });
  });

  // eleventyConfig.addCollection("authors", function (collectionApi) {
  //   const authors = collectionApi.getAll()[0].data.authors;
  //   return authors.map((world) => author.name);
  // });
};
