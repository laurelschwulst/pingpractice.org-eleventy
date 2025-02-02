console.log("Preview.js is loaded!");

const PagePreview = ({ entry }) => {
  console.log("PagePreview executed!"); // Debug log
  return React.createElement(
    "div",
    { style: { backgroundColor: "yellow", padding: "20px" } },
    React.createElement("h1", null, "Custom Template Applied!"),
    React.createElement("h2", null, entry.getIn(["data", "title"])),
    React.createElement("div", null, entry.getIn(["data", "body"]))
  );
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
