console.log("Preview.js is loaded!");

const PagePreview = () => {
  console.log("PagePreview executed!"); // Debug log
  return `
      <div style="background-color: yellow; height: 100px; padding: 20px;">
        <h1>Custom Template Applied!</h1>
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
