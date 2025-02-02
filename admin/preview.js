console.log("Preview.js is loaded!");

const StaticPreview = () => {
  console.log("StaticPreview executed!!!");
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

CMS.registerPreviewTemplate("about", StaticPreview);
CMS.registerPreviewTemplate("method", StaticPreview);
CMS.registerPreviewTemplate("app", StaticPreview);
CMS.registerPreviewTemplate("people", StaticPreview);

// Register each page
// ["about", "method", "app", "people"].forEach((page) => {
//   CMS.registerPreviewTemplate(page, StaticPreview);
// });

CMS.registerPreviewStyle("/admin/custom-preview.css");
