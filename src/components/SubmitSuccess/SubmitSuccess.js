import React from "react";
import "./SubmitSuccess.scss";

function SubmitSuccess({ trigger }) {
  return trigger ? (
    <div className="submit-success">
      <div className="submit-success__content">
        <h3 className="submit-success__message">
          Account successfully created!
        </h3>
      </div>
    </div>
  ) : (
    ""
  );
}

export default SubmitSuccess;
