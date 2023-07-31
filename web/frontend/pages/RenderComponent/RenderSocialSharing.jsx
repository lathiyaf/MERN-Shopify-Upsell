import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RenderSocialSharing = ({
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
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.title,
                  }}
                />

                <div>
                  <ul
                    className={
                      data?.selected_icon_style === "logo"
                        ? "social-links logo_only mt-4"
                        : data?.selected_icon_style === "circle"
                        ? "social-links circle mt-4"
                        : data?.selected_icon_style === "square"
                        ? "social-links square mt-4"
                        : data?.selected_icon_style === "round"
                        ? "social-links round-edge mt-4"
                        : "social-links logo_only mt-4"
                    }
                    style={{
                      textAlign:
                        data?.btn_alignment === "left"
                          ? "left"
                          : data?.btn_alignment === "center"
                          ? "center"
                          : data?.btn_alignment === "right"
                          ? "right"
                          : "center",
                    }}
                  >
                    {data?.share_facebook && (
                      <li>
                        <a>
                          <span className="fa fa-facebook"></span>
                        </a>
                      </li>
                    )}
                    {data?.share_twitter && (
                      <li>
                        <a>
                          <span className="fa fa-twitter"></span>
                        </a>
                      </li>
                    )}
                    {data?.share_pinterest && (
                      <li>
                        <a>
                          <span className="fa fa-pinterest"></span>
                        </a>
                      </li>
                    )}
                    {data?.share_linkedin && (
                      <li>
                        <a>
                          <span className="fa fa-linkedin"></span>
                        </a>
                      </li>
                    )}
                    {data?.share_google && (
                      <li>
                        <a>
                          <span className="fa fa-google-plus"></span>
                        </a>
                      </li>
                    )}
                  </ul>
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

                <div>
                  <ul
                    className={
                      section_data?.selected_icon_style === "logo"
                        ? "social-links logo_only mt-4"
                        : section_data?.selected_icon_style === "circle"
                        ? "social-links circle mt-4"
                        : section_data?.selected_icon_style === "square"
                        ? "social-links square mt-4"
                        : section_data?.selected_icon_style === "round"
                        ? "social-links round-edge mt-4"
                        : "social-links logo_only mt-4"
                    }
                    style={{
                      textAlign:
                        section_data?.btn_alignment === "left"
                          ? "left"
                          : section_data?.btn_alignment === "center"
                          ? "center"
                          : section_data?.btn_alignment === "right"
                          ? "right"
                          : "center",
                    }}
                  >
                    {section_data?.share_facebook && (
                      <li>
                        <a>
                          <span className="fa fa-facebook"></span>
                        </a>
                      </li>
                    )}
                    {section_data?.share_twitter && (
                      <li>
                        <a>
                          <span className="fa fa-twitter"></span>
                        </a>
                      </li>
                    )}
                    {section_data?.share_pinterest && (
                      <li>
                        <a>
                          <span className="fa fa-pinterest"></span>
                        </a>
                      </li>
                    )}
                    {section_data?.share_linkedin && (
                      <li>
                        <a>
                          <span className="fa fa-linkedin"></span>
                        </a>
                      </li>
                    )}
                    {section_data?.share_google && (
                      <li>
                        <a>
                          <span className="fa fa-google-plus"></span>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RenderSocialSharing;
