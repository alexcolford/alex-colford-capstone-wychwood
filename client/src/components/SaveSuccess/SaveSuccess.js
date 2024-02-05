import React from "react";
import "./SaveSuccess.scss";

function SaveSuccess({ trigger }) {
  return trigger ? (
    <div className="save-success">
      <div className="save-success__content">
        <h3 className="save-success__message">Changes saved successfully!</h3>
      </div>
    </div>
  ) : (
    ""
  );
}

export default SaveSuccess;
