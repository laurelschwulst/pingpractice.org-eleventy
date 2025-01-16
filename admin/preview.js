// Confirm that preview.js is loaded
console.log("Preview.js is loaded!");

// Import CMS library
import CMS from "netlify-cms-app";

// Custom preview template for "Pages"
const PagePreview = () => `
  <div style="background-color: yellow; height: 100px; padding: 20px;">
    <h1>Custom Template Applied!</h1>
    <p>This is a test preview for Pages collection with a yellow background.</p>
  </div>
`;

// Custom preview template for "Transmissions"
const TransmissionPreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();

  // Return custom HTML for the transmission preview
  return `
    <article class="transmission-preview" style="background-color: yellow; padding: 20px;">
      <h1>${data.title}</h1>
      <time>${data.date}</time>
      <div class="content">${widgetFor("body")}</div>
    </article>
  `;
};

// Register the preview templates
CMS.registerPreviewTemplate("pages", PagePreview);
CMS.registerPreviewTemplate("transmissions", TransmissionPreview);
