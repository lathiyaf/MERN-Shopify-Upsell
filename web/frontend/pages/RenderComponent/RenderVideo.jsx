import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";

const RenderVideo = ({
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

                <div className="mt-4">
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${data?.video_id}`}
                    width={450}
                    height={234}
                    className="react-player"
                  />
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

                <div className="mt-4">
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${section_data?.video_id}`}
                    width={450}
                    height={234}
                    className="react-player"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RenderVideo;
