import React from "react";
import { Icon, SkeletonBodyText } from "@shopify/polaris";
import { QuestionMarkMajor } from "@shopify/polaris-icons";

const RenderCustomerInfo = ({ id }) => {
  return (
    <>
      <div className="section pl-15" id={id} key={id}>
        <div className="content-box customer_information">
          <div className="content-box-row pb-3">
            <div className="cust-info-content mx-3 pt-2">
              <div>
                <h2 className="mt-4 oc_title">Customer information</h2>
              </div>
              <div className="pt-2">
                <Icon source={QuestionMarkMajor} color="base" />
              </div>
            </div>
            <hr />
            <div className="mx-3 pt-2">
              <div className="row">
                <div className="col-sm-6">
                  <h3 className="pb-4">Shipping address</h3>
                  <SkeletonBodyText lines={4} />
                </div>
                <div className="col-sm-6">
                  <h3 className="pb-4">Billing address</h3>
                  <SkeletonBodyText lines={4} />
                </div>
              </div>
              <div className="row pt-4">
                <div className="col-sm-6">
                  <h3 className="pb-4">Shipping method</h3>
                  <SkeletonBodyText lines={1} />
                </div>
                <div className="col-sm-6">
                  <h3 className="pb-4">Payment method</h3>
                  <SkeletonBodyText lines={1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RenderCustomerInfo;
