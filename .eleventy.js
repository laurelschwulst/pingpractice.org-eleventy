module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.setTemplateFormats(["md", "njk"]);

  eleventyConfig.addCollection("transmissions", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("transmissions/**/*.md")
      .sort((a, b) => {
        return new Date(a.data.date) - new Date(b.data.date); // Chronological order
      });
  });

  eleventyConfig.addCollection(
    "transmissions_staging",
    function (collectionApi) {
      return collectionApi
        .getFilteredByGlob("transmissions-staging/**/*.md")
        .sort((a, b) => {
          return new Date(a.data.date) - new Date(b.data.date); // Chronological order
        });
    }
  );

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
