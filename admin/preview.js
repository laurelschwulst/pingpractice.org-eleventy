console.log("Preview.js is loaded!");

// Check if CMS is initialized
console.log("CMS instance: ", CMS);

// Simple static preview to test if templates are rendering
const StaticPreview = () => {
  console.log("StaticPreview executed!"); // Debug log
  return React.createElement(
    "div",
    { style: { backgroundColor: "yellow", padding: "20px" } },
    React.createElement("h1", null, "Static Title"),
    React.createElement("div", null, "This is some static content for testing.")
  );
};

// Debug logs for CMS registration
console.log("Registering StaticPreview...");
CMS.registerPreviewTemplate("pages", StaticPreview);

console.log("Registering TransmissionPreview...");
CMS.registerPreviewTemplate("transmissions", (entry) => {
  console.log("entry object: ", entry); // Inspect entry object for transmissions
  return `
    <article style="background-color: yellow; padding: 20px;">
      <h1>Static Title for Transmission</h1>
      <div>This is some static content for testing.</div>
    </article>
  `;
});

// Add custom preview styles
CMS.registerPreviewStyle("/admin/custom-preview.css");
