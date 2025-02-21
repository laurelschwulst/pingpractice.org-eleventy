import React from "react";
import ReactDOM from "react-dom";

console.log("Preview.js is loaded!");

const StaticPreview = ({ entry }) => {
  console.log("StaticPreview executed!!!", entry);

  if (!entry) {
    console.error("Error: entry is missing!", entry);
    return React.createElement("div", null, "Error: No entry data available");
  }

  const title = entry.getIn(["data", "title"]) || "No title";
  const content = entry.getIn(["data", "body"]) || "No content";

  console.log("Extracted Data -> Title:", title, "Content:", content);

  return React.createElement(
    "div",
    { style: { backgroundColor: "yellow", padding: "20px" } },
    React.createElement("h1", null, title),
    React.createElement("div", null, content)
  );
};

console.log("Registering StaticPreview...");

CMS.registerPreviewTemplate("about", StaticPreview);
CMS.registerPreviewTemplate("method", StaticPreview);
CMS.registerPreviewTemplate("app", StaticPreview);
CMS.registerPreviewTemplate("people", StaticPreview);

CMS.registerPreviewStyle("/admin/custom-preview.css");

console.log("Preview registration complete.");
