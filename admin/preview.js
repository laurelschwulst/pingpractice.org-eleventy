import CMS from "netlify-cms-app";

// Import your site's CSS
import "../assets/styles/main.css"; // Adjust this path to match your project's CSS location

// Register global preview styles
CMS.registerPreviewStyle("/assets/styles/main.css");

// Custom preview template for "Pages" collection
const PagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();

  return `<div class="page-preview">
      <h1>${data.title}</h1>
      <div class="content">${widgetFor("body")}</div>
    </div>`;
};

// Custom preview template for "Transmissions" collection
const TransmissionPreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();

  return `<article class="transmission-preview">
      <h1>${data.title}</h1>
      <time>${data.date}</time>
      <div class="content">${widgetFor("body")}</div>
    </article>`;
};

// Register preview templates
CMS.registerPreviewTemplate("pages", PagePreview);
CMS.registerPreviewTemplate("transmissions", TransmissionPreview);
