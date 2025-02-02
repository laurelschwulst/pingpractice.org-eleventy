console.log("Preview.js is loaded!");

// PagePreview component for "pages" collection
const PagePreview = ({ entry }) => {
  console.log("PagePreview executed!"); // Debug log
  console.log(entry.toJS()); // Log full entry data for debugging

  const title = entry.getIn(["data", "title"]);
  const body = entry.getIn(["data", "body"]);

  return React.createElement(
    "div",
    { style: { backgroundColor: "yellow", padding: "20px" } },
    React.createElement("h1", null, title),
    React.createElement("h2", null, "Page content below:"),
    React.createElement("div", null, body)
  );
};

// TransmissionPreview component for "transmissions" collection
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

// Registering custom styles
CMS.registerPreviewStyle("/admin/custom-preview.css");
