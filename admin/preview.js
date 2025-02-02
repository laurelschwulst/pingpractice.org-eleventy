console.log("Preview.js is loaded!");

const StaticPreview = () => {
  console.log("StaticPreview executed!");
};

console.log("Registering StaticPreview...");
CMS.registerPreviewTemplate("about", StaticPreview);

CMS.registerPreviewStyle("/admin/custom-preview.css");
