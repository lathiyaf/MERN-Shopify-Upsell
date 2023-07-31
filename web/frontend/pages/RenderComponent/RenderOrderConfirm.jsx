import React from "react";
import { SkeletonBodyText } from "@shopify/polaris";
import RenderOrderTracking from "./RenderOrderTracking";

const RenderOrderConfirm = ({
  id,
  orderTrack,
  setSection,
  setSelectedSection,
  setSectionId,
  sectionRef,
}) => {
  return (
    <>
      <div className="section mt-3 pl-15" id={id} key={id}>
        <div className="content-box order_confirmation">
          <div className="content-order-box-row pb-3">
            <div className="map">
              <img
                src="https://cdn.stilyoapps.com/v1/assets/img/map.png"
                style={{ width: "100%" }}
              />
            </div>

            <div className="mx-3">
              <h2 className="mt-4 oc_title">Your order is confirmed</h2>
              <SkeletonBodyText />
            </div>

            <div className="mx-3">
              <hr />
            </div>

            <RenderOrderTracking
              orderTrack={orderTrack}
              setSection={setSection}
              setSelectedSection={setSelectedSection}
              setSectionId={setSectionId}
              sectionRef={sectionRef}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RenderOrderConfirm;
