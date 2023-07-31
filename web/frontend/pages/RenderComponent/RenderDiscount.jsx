import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RenderDiscount = ({
  section_data,
  setSection,
  setSelectedSection,
  setSectionId,
  sectionRef,
}) => {
  const data = useSelector((state) => state.section_data);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (section_data?._id === data?._id) {
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
          <div
            className="content-box section-element pl-15 mt-3"
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
              <div
                className="content-box-row"
                style={{
                  background: data?.bg_color,
                  color: "#fff",
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.title,
                  }}
                  className="pt-4"
                />

                <div className="d-flex mt-3 justify-content-center">
                  <span
                    className="d-inline-block dis_code"
                    style={{
                      background: data?.discount_bg_color,
                      color: data?.discount_color,
                    }}
                  >
                    {data?.discount_code}
                  </span>
                  <a
                    className="d-inline-block btn btn_url"
                    style={{
                      background: data?.btn_bg_color,
                      color: data?.btn_color,
                    }}
                    href={data?.redirect_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {data?.btn_text}
                  </a>
                </div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.term_condition_txt,
                  }}
                  className="mt-3 pb-5"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="content-box section-element pl-15 mt-3"
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
              <div
                className="content-box-row"
                style={{
                  background: section_data?.bg_color,
                  color: "#fff",
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: section_data?.title,
                  }}
                  className="pt-4"
                />

                <div className="d-flex mt-3 justify-content-center">
                  <span
                    className="d-inline-block dis_code"
                    style={{
                      background: section_data?.discount_bg_color,
                      color: section_data?.discount_color,
                    }}
                  >
                    {section_data?.discount_code}
                  </span>
                  <a
                    className="d-inline-block btn btn_url"
                    style={{
                      background: section_data?.btn_bg_color,
                      color: section_data?.btn_color,
                    }}
                    href={section_data?.redirect_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {section_data?.btn_text}
                  </a>
                </div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: section_data?.term_condition_txt,
                  }}
                  className="mt-3 pb-5"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RenderDiscount;
