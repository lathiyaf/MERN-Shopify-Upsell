import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RenderSocialMediaLink = ({
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
                  >
                    <li>
                      <a
                        href={data?.facebook_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-facebook"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={data?.twitter_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-twitter"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={data?.pinterest_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-pinterest"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={data?.instagram_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-instagram"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={data?.linkedin_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-linkedin"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={data?.tumblr_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-tumblr"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={data?.google_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-google-plus"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={data?.youtube_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-youtube-play"></span>
                      </a>
                    </li>
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
                  >
                    <li>
                      <a
                        href={section_data?.facebook_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-facebook"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={section_data?.twitter_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-twitter"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={section_data?.pinterest_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-pinterest"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={section_data?.instagram_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-instagram"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={section_data?.linkedin_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-linkedin"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={section_data?.tumblr_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-tumblr"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={section_data?.google_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-google-plus"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={section_data?.youtube_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="fa fa-youtube-play"></span>
                      </a>
                    </li>
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

export default RenderSocialMediaLink;
