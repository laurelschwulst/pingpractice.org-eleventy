console.log("Preview.js is loaded!");

const PagePreview = ({ entry }) => {
  console.log("PagePreview executed!"); // Debug log

  // Fallback in case data is not available
  const title = entry.getIn(["data", "title"]) || "No title available";
  const content = entry.getIn(["data", "body"]) || "No content available";

  console.log("PagePreview data: ", title, content); // Check if data is accessible

  return React.createElement(
    "div",
    { style: { backgroundColor: "yellow", padding: "20px" } },
    React.createElement("h1", null, title),
    React.createElement("div", null, content)
  );
};

console.log("Registering PagePreview...");
CMS.registerPreviewTemplate("pages", PagePreview);

console.log("Registering TransmissionPreview...");
CMS.registerPreviewTemplate("transmissions", (entry) => {
  const title = entry.getIn(["data", "title"]) || "No title available";
  const content = entry.getIn(["data", "body"]) || "No content available";
  return `
    <article style="background-color: yellow; padding: 20px;">
      <h1>${title}</h1>
      <div>${content}</div>
    </article>
  `;
});

// Add custom preview styles
CMS.registerPreviewStyle("/admin/custom-preview.css");
