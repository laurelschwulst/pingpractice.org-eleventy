console.log("Preview.js is loaded!");

const StaticPreview = ({ entry }) => {
  // <-- Ensure entry is received as a prop
  console.log("StaticPreview executed!!!", entry.toJS()); // Debugging

  const title = entry.getIn(["data", "title"]) || "No title";
  const content = entry.getIn(["data", "body"]) || "No content";

  return React.createElement(
    "div",
    { style: { backgroundColor: "yellow", padding: "20px" } },
    React.createElement("h1", null, title),
    React.createElement("div", null, content)
  );
};

console.log("Registering StaticPreview...");

// Register each page dynamically
["about", "method", "app", "people"].forEach((page) => {
  CMS.registerPreviewTemplate(page, StaticPreview);
});

// Register custom CSS for preview styles
CMS.registerPreviewStyle("/admin/custom-preview.css");
