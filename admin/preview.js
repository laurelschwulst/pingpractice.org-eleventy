console.log("Preview.js is loaded!");

// Custom preview for "Pages"
const PagePreview = () => `
  <div style="background-color: yellow; height: 100px;">
    <h1>Custom Template Applied!</h1>
  </div>
`;

CMS.registerPreviewTemplate("pages", PagePreview);
