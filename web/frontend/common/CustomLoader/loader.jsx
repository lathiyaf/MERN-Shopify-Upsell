import React from "react";
import { Spinner } from "@shopify/polaris";
import "./spinner.css";

const loader = () => {
  return (
    <React.Fragment>
      <div className="loader">
        <Spinner accessibilityLabel="Spinner example" size="large" />
      </div>
    </React.Fragment>
  );
};

export default loader;
