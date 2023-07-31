import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RenderSocialFollow = ({
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
              <div className="content-box-row">
                {data?.content &&
                  data?.content.length > 0 &&
                  data.content.map((cont, i) => {
                    return (
                      <React.Fragment key={i}>
                        <p>
                          {cont.contains} <br />
                        </p>
                      </React.Fragment>
                    );
                  })}
              </div>
            </div>
          </div>
        </>
      ) : (
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
              {section_data?.content &&
                section_data?.content.length > 0 &&
                section_data.content.map((cont, i) => {
                  return (
                    <React.Fragment key={i}>
                      <p>
                        {cont.contains} <br />
                      </p>
                    </React.Fragment>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RenderSocialFollow;
