console.log("Preview.js is loaded!");

const StaticPreview = (props) => {
  console.log("StaticPreview executed!!!", props);

  // Ensure entry exists before accessing data
  if (!props || !props.entry) {
    console.error("Error: entry is missing!", props);
    return React.createElement("div", null, "Error: No entry data available");
  }

  const entry = props.entry; // Explicitly define
  const title = entry.getIn(["data", "title"]) || "No title";
  const content = entry.getIn(["data", "body"]) || "No content";

  console.log("Extracted Data -> Title:", title, "Content:", content);

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
  console.log(`Registering template for: ${page}`);
  CMS.registerPreviewTemplate(page, StaticPreview);
});

CMS.registerPreviewStyle("/admin/custom-preview.css");
