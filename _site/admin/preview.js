import CMS from "netlify-cms-app";

// Custom preview for "Pages"
const PagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();

  return `
    <div class="page-preview" style="background-color: yellow; padding: 20px;">
      <h1>${data.title}</h1>
      <div class="content">${widgetFor("body")}</div>
    </div>
  `;
};

// Custom preview for "Transmissions"
const TransmissionPreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();

  return `
    <article class="transmission-preview" style="background-color: yellow; padding: 20px;">
      <h1>${data.title}</h1>
      <time>${data.date}</time>
      <div class="content">${widgetFor("body")}</div>
    </article>
  `;
};

// Register preview templates
CMS.registerPreviewTemplate("pages", PagePreview);
CMS.registerPreviewTemplate("transmissions", TransmissionPreview);
