console.log("Preview.js is loaded!");

const StaticPreview = ({ entry }) => {
  console.log("StaticPreview executed!!!", entry ? entry.toJS() : "No entry");

  if (!entry) {
    return React.createElement("div", null, "No entry data available");
  }

  const title = entry.getIn(["data", "title"], "No title");
  const content = entry.getIn(["data", "body"], "No content");

  return React.createElement(
    "div",
    { style: { backgroundColor: "yellow", padding: "20px" } },
    React.createElement("h1", null, title),
    React.createElement("div", null, content)
  );
};

console.log("Registering StaticPreview...");

// Dynamically register preview templates for all pages
["about", "method", "app", "people"].forEach((page) => {
  CMS.registerPreviewTemplate(page, StaticPreview);
});

// Register custom CSS for preview styles
CMS.registerPreviewStyle("/admin/custom-preview.css");
