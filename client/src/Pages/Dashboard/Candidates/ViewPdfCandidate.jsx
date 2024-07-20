import React from "react";
import "tailwindcss/tailwind.css";
import { RAPIDHIRE_ENDPOINT } from "../../../constants";

function ViewPdfCandidate({ resume }) {
  const pdfURL = RAPIDHIRE_ENDPOINT + `/${resume}`;

  // Use Google Docs Viewer to display the PDF as an image
  const googleDocsViewerURL = `https://docs.google.com/gview?url=${encodeURIComponent(
    pdfURL
  )}&embedded=true`;

  return (
    <div className="container mx-auto mt-10">
      <iframe
        title="PDF Viewer"
        src={googleDocsViewerURL}
        width="100%"
        height="500"
      />
    </div>
  );
}

export default ViewPdfCandidate;
