import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";

const RenderOrderTracking = ({ orderTrack }) => {
  const data = useSelector((state) => state.section_data);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (orderTrack?.section_data?.section_id?.toString() === data?.section_id) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [data, orderTrack, isEdit]);

  return (
    <>
      {isEdit ? (
        <>
          <div className="tracking-info mx-3">
            <div className="tracking-info-number" style={{ float: "left" }}>
              <strong>Tracking number</strong>
              <p>
                <a style={{ color: "#15669d" }} href="#">
                  XXXXXXXXXXXXX
                </a>
              </p>
            </div>
            <div style={{ float: "right" }}>
              <Button
                style={{
                  background: data?.bg_color,
                  color: data?.color,
                }}
                className="Polaris-Button"
              >
                {data?.btn_text}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="tracking-info mx-3">
            <div className="tracking-info-number" style={{ float: "left" }}>
              <strong>Tracking number</strong>
              <p>
                <a style={{ color: "#15669d" }} href="#">
                  XXXXXXXXXXXXX
                </a>
              </p>
            </div>
            <div style={{ float: "right" }}>
              <Button
                style={{
                  background: orderTrack?.section_data?.bg_color,
                  color: orderTrack?.section_data?.color,
                }}
                className="Polaris-Button"
              >
                {orderTrack?.section_data?.btn_text}
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RenderOrderTracking;
