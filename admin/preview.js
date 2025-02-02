console.log("Preview.js is loaded!");

const StaticPreview = () => {
  console.log("StaticPreview executed!"); // Debug log
  return React.createElement(
    "div",
    { style: { backgroundColor: "yellow", padding: "20px" } },
    React.createElement("h1", null, "Static Title"),
    React.createElement("p", null, "This is some static content for testing.")
  );
};

console.log("Registering StaticPreview...");
CMS.registerPreviewTemplate("pages", StaticPreview);

// Add custom preview styles (optional, can test without it)
CMS.registerPreviewStyle("/admin/custom-preview.css");
