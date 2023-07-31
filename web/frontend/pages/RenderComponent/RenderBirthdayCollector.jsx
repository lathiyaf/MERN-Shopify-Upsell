import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RenderBirthdayCollector = ({
  section_data,
  setSection,
  setSelectedSection,
  setSectionId,
  sectionRef,
}) => {
  const data = useSelector((state) => state.section_data);
  const [isEdit, setIsEdit] = useState(false);
  const [startDate, setStartDate] = useState();

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
              <div className="content-box-row">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.title,
                  }}
                />
                <div className="mt-2 d-flex">
                  <input
                    type="date"
                    className="calendar_input"
                    onChange={(date) => setStartDate(date)}
                    placeholder={data?.placeholder_text}
                    value={startDate}
                  />
                  <a
                    style={{
                      backgroundColor: data?.bg_color,
                      color: data?.color,
                      height: 50,
                    }}
                    className="btn mx-3"
                    id={"bd_btn-" + data?.row_section_id}
                  >
                    {data?.btn_text}
                  </a>
                </div>
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
              <div className="content-box-row">
                <div
                  dangerouslySetInnerHTML={{
                    __html: section_data?.title,
                  }}
                />
                <div className="mt-2 d-flex">
                  <input
                    type="date"
                    className="calendar_input"
                    onChange={(date) => setStartDate(date)}
                    placeholder={section_data?.placeholder_text}
                    value={startDate}
                  />
                  <a
                    style={{
                      backgroundColor: section_data?.bg_color,
                      color: section_data?.color,
                      height: 50,
                    }}
                    className="btn mx-3"
                    id={"bd_btn-" + section_data?.row_section_id}
                  >
                    {section_data?.btn_text}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RenderBirthdayCollector;
