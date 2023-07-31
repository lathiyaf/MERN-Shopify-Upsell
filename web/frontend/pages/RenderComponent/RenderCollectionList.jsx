import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";

const RenderCollectionList = ({
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
              sectionRef.current.scrollIntoView({
                behavior: "smooth",
              });
            }}
            ref={sectionRef}
          >
            <div className="section-content">
              <div className="content-box-row">
                <div
                  className="section-coll-title"
                  style={{
                    color: data?.head_color,
                    fontSize: data?.head_fs_size + "px",
                    textTransform: data?.head_selected_text_transform,
                    fontWeight:
                      data?.head_style && data?.head_style.includes("B")
                        ? "bold"
                        : "",
                    fontStyle:
                      data?.head_style && data?.head_style.includes("I")
                        ? "italic"
                        : "",
                  }}
                >
                  {data?.heading}
                </div>
                <div className="section-content-box mt-4">
                  <Row className="mx-3 mb-2">
                    {data && data?.content && data?.content.length > 0 ? (
                      data?.content.map((content, i) => {
                        return (
                          <React.Fragment key={i}>
                            <Col
                              lg={data?.coll_per_row === 2 ? 6 : 4}
                              md={data?.coll_per_row === 2 ? 6 : 4}
                              sm={data?.coll_per_row === 2 ? 6 : 4}
                              className="mb-2"
                            >
                              <div className="position-relative">
                                <div className="position-relative">
                                  {content.collection_name?.image?.src ? (
                                    <img
                                      src={content.collection_name?.image?.src}
                                      alt=""
                                      className="img-fluid"
                                    />
                                  ) : (
                                    <img
                                      src="https://cdn.stilyoapps.com/v1/assets/img/img_placeholder.png"
                                      alt=""
                                      className="img-fluid"
                                    />
                                  )}
                                </div>
                                <div className="collection-title-wrapper">
                                  <div
                                    className="collection-title"
                                    style={{
                                      color: data?.coll_title_color,
                                      fontSize: data?.coll_fs_size + "px",
                                      textTransform:
                                        data?.coll_selected_text_transform,
                                      fontWeight: data?.coll_style.includes("B")
                                        ? "bold"
                                        : "",
                                      fontStyle: data?.coll_style.includes("I")
                                        ? "italic"
                                        : "",
                                    }}
                                  >
                                    {content?.collection_name?.title}
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <div>
                        You didn't add any collections yet. Once you'll add
                        collections, this text will disappear.
                      </div>
                    )}
                  </Row>
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
              sectionRef.current.scrollIntoView({
                behavior: "smooth",
              });
            }}
            ref={sectionRef}
          >
            <div className="section-content">
              <div className="content-box-row">
                <div
                  className="section-coll-title"
                  style={{
                    color: section_data?.head_color,
                    fontSize: section_data?.head_fs_size + "px",
                    textTransform: section_data?.head_selected_text_transform,
                    fontWeight:
                      section_data?.head_style &&
                      section_data?.head_style.includes("B")
                        ? "bold"
                        : "",
                    fontStyle:
                      section_data?.head_style &&
                      section_data?.head_style.includes("I")
                        ? "italic"
                        : "",
                  }}
                >
                  {section_data?.heading}
                </div>
                <div className="section-content-box mt-4">
                  <Row className="mx-3 mb-2">
                    {section_data &&
                    section_data?.content &&
                    section_data?.content.length > 0 ? (
                      section_data?.content.map((content, i) => {
                        return (
                          <React.Fragment key={i}>
                            <Col
                              lg={section_data?.coll_per_row === 2 ? 6 : 4}
                              md={section_data?.coll_per_row === 2 ? 6 : 4}
                              sm={section_data?.coll_per_row === 2 ? 6 : 4}
                              className="mb-2"
                            >
                              <div className="position-relative">
                                <div className="position-relative">
                                  {content.collection_name?.image?.src ? (
                                    <img
                                      src={content.collection_name?.image?.src}
                                      alt=""
                                      className="img-fluid"
                                    />
                                  ) : (
                                    <img
                                      src="https://cdn.stilyoapps.com/v1/assets/img/img_placeholder.png"
                                      alt=""
                                      className="img-fluid"
                                    />
                                  )}
                                </div>
                                <div className="collection-title-wrapper">
                                  <div
                                    className="collection-title"
                                    style={{
                                      color: section_data?.coll_title_color,
                                      fontSize:
                                        section_data?.coll_fs_size + "px",
                                      textTransform:
                                        section_data?.coll_selected_text_transform,
                                      fontWeight:
                                        section_data?.coll_style.includes("B")
                                          ? "bold"
                                          : "",
                                      fontStyle:
                                        section_data?.coll_style.includes("I")
                                          ? "italic"
                                          : "",
                                    }}
                                  >
                                    {content?.collection_name?.title}
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <div>
                        You didn't add any collections yet. Once you'll add
                        collections, this text will disappear.
                      </div>
                    )}
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RenderCollectionList;
