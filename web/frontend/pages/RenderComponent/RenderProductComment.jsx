import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RenderProductComment = ({
  section_data,
  setSection,
  setSelectedSection,
  setSectionId,
  sectionRef,
}) => {
  const data = useSelector((state) => state.section_data);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (section_data?.section_id?.toString() === data?.section_id) {
      setIsEdit(true);
    } else if (section_data?.row_section_id === data?.row_section_id) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [data, section_data, isEdit]);

  return (
    <>
      {isEdit ? (
        <>
          {data?.is_product_comment && (
            <div
              className="content-box section-element mt-3"
              id={data?.row_section_id}
              onClick={(e) => {
                e.preventDefault();
                setSection("section4");
                setSelectedSection(data);
                window.scrollTo(0, 0);
                setSectionId(data?.row_section_id);
              }}
              ref={sectionRef}
            >
              <div className="section-content">
                <div className="content-box-row">
                  <div className="d-flex">
                    <input type="text" name="type" style={{ width: "100%" }} />
                    <a
                      href="#"
                      style={{
                        backgroundColor: data && data.bg_color,
                        color: data && data.color,
                      }}
                      className="btn mx-3"
                    >
                      {data?.btn_text}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {section_data?.is_product_comment && (
            <div
              className="content-box section-element mt-3"
              id={section_data?.row_section_id}
              onClick={(e) => {
                e.preventDefault();
                setSection("section4");
                setSelectedSection(section_data);
                window.scrollTo(0, 0);
                setSectionId(section_data?.row_section_id);
              }}
              ref={sectionRef}
            >
              <div className="section-content">
                <div className="content-box-row">
                  <div className="d-flex">
                    <input type="text" name="type" style={{ width: "100%" }} />
                    <a
                      href="#"
                      style={{
                        backgroundColor: section_data && section_data.bg_color,
                        color: section_data && section_data.color,
                      }}
                      className="btn mx-3"
                    >
                      {section_data?.btn_text}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RenderProductComment;
