import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RenderLinkList = ({
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
            className="content-box section-element pl-10 mt-3"
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
                <ul className="navigation">
                  {data &&
                    data?.links &&
                    data?.links.length > 0 &&
                    data?.links.map((link, i) => {
                      return (
                        <li
                          style={{
                            fontSize: data?.head_fs_size + "px",
                            textTransform: data?.head_selected_text_transform,
                            fontWeight: data?.head_style.includes("B")
                              ? "bold"
                              : "",
                            fontStyle: data?.head_style.includes("I")
                              ? "italic"
                              : "",
                          }}
                        >
                          <a
                            href={link?.url}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              color: data?.color,
                            }}
                          >
                            {link?.name}
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="content-box section-element pl-10 mt-3"
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
                <ul className="navigation">
                  {section_data &&
                    section_data?.links &&
                    section_data?.links.length > 0 &&
                    section_data?.links.map((link, i) => {
                      return (
                        <li
                          style={{
                            fontSize: section_data?.head_fs_size + "px",
                            textTransform:
                              section_data?.head_selected_text_transform,
                            fontWeight: section_data?.head_style.includes("B")
                              ? "bold"
                              : "",
                            fontStyle: section_data?.head_style.includes("I")
                              ? "italic"
                              : "",
                          }}
                        >
                          <a
                            href={link?.url}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              color: section_data?.color,
                            }}
                          >
                            {link?.name}
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RenderLinkList;
