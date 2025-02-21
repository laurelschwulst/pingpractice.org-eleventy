// /admin/preview-templates/method-preview.js
import React from "react";

const MethodPreview = ({ entry }) => {
  const { title, body } = entry.fields;

  return (
    <div className="method-preview">
      <h1>{title}</h1>
      <div className="content">{body}</div>
    </div>
  );
};

export default MethodPreview;
