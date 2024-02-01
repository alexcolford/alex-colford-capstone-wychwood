import React from "react";
import "./SubmitSuccess.scss";

function SubmitSuccess({ trigger }) {
  return trigger ? (
    <div className="upload-success">
      <div className="upload-success__content">
        <h3 className="upload-success__message">
          Account successfully created!
        </h3>
      </div>
    </div>
  ) : (
    ""
  );
}

export default SubmitSuccess;
