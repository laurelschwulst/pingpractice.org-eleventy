console.log("Preview.js is loaded!");

const PagePreview = ({ entry }) => {
  console.log("PagePreview executed!"); // Debug log
  console.log("Entry data:", entry.toJS()); // Log full entry data for debugging

  const title = entry.getIn(["data", "title"]);
  const content =
    entry.getIn(["data", "body"]) ||
    entry.getIn(["data", "content"]) ||
    "Content not found."; // Adjust this based on your actual content field

  return `
    <div style="background-color: yellow; padding: 20px;">
      <h1>${title}</h1>
      <h2>Page content below:</h2>
      <div>${content}</div>
    </div>
  `;
};

const TransmissionPreview = ({ entry, widgetFor }) => {
  console.log("TransmissionPreview executed!"); // Debug log
  const data = entry.getIn(["data"]).toJS();
  return `
    <article style="background-color: yellow; padding: 20px;">
      <h1>${data.title}</h1>
      <time>${data.date}</time>
      <div>${widgetFor("body")}</div>
    </article>
  `;
};

console.log("Registering PagePreview...");
CMS.registerPreviewTemplate("pages", PagePreview);

console.log("Registering TransmissionPreview...");
CMS.registerPreviewTemplate("transmissions", TransmissionPreview);

CMS.registerPreviewStyle("/admin/custom-preview.css");
