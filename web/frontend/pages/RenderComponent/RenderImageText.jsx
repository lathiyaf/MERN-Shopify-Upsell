import React, { useEffect, useState, forwardRef } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "reactstrap";

const RenderImageText = ({
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

  const openLinkNewTab = (data) => {
    if (data?.redirect_url ? data?.redirect_url : "#") {
      window.open(data?.redirect_url ? data?.redirect_url : "#", "_blank");
    }
  };

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
                <Row className="align-items-center">
                  {data?.selected_img_align === "center" && (
                    <>
                      <Col lg={12} md={12} sm={12}>
                        <div className="position-relative">
                          <div className="position-relative">
                            {data?.img !== "" ? (
                              <a
                                href={
                                  data?.redirect_url ? data?.redirect_url : "#"
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={data?.img}
                                  alt=""
                                  className={
                                    data?.selected_img_layout === "circle"
                                      ? "circle img-fluid"
                                      : "img-fluid"
                                  }
                                />
                              </a>
                            ) : (
                              <a
                                href={
                                  data?.redirect_url ? data?.redirect_url : "#"
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src="https://cdn.stilyoapps.com/v1/assets/img/img_placeholder.png"
                                  alt=""
                                  className={
                                    data?.selected_img_layout === "circle"
                                      ? "circle img-fluid"
                                      : "img-fluid"
                                  }
                                />
                              </a>
                            )}
                          </div>
                        </div>
                      </Col>
                      <Col lg={12} md={12} sm={12}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data?.title,
                          }}
                        />
                      </Col>
                    </>
                  )}
                  {data?.selected_img_align === "left" && (
                    <>
                      <Col lg={6} md={6} sm={6}>
                        <div className="position-relative">
                          <div className="position-relative">
                            {data?.img !== "" ? (
                              <a
                                href={
                                  data?.redirect_url ? data?.redirect_url : "#"
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={data?.img}
                                  alt=""
                                  className={
                                    data?.selected_img_layout === "circle"
                                      ? "circle img-fluid"
                                      : "img-fluid"
                                  }
                                />
                              </a>
                            ) : (
                              <a
                                href={
                                  data?.redirect_url ? data?.redirect_url : "#"
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src="https://cdn.stilyoapps.com/v1/assets/img/img_placeholder.png"
                                  alt=""
                                  className={
                                    data?.selected_img_layout === "circle"
                                      ? "circle img-fluid"
                                      : "img-fluid"
                                  }
                                />
                              </a>
                            )}
                          </div>
                        </div>
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data?.title,
                          }}
                        />
                      </Col>
                    </>
                  )}
                  {data?.selected_img_align === "right" && (
                    <>
                      <Col lg={6} md={6} sm={6}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data?.title,
                          }}
                        />
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <div className="position-relative">
                          <div className="position-relative">
                            {data?.img !== "" ? (
                              <a
                                href={
                                  data?.redirect_url ? data?.redirect_url : "#"
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={data?.img}
                                  alt=""
                                  className={
                                    data?.selected_img_layout === "circle"
                                      ? "circle img-fluid"
                                      : "img-fluid"
                                  }
                                />
                              </a>
                            ) : (
                              <a
                                href={
                                  data?.redirect_url ? data?.redirect_url : "#"
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src="https://cdn.stilyoapps.com/v1/assets/img/img_placeholder.png"
                                  alt=""
                                  className={
                                    data?.selected_img_layout === "circle"
                                      ? "circle img-fluid"
                                      : "img-fluid"
                                  }
                                />
                              </a>
                            )}
                          </div>
                        </div>
                      </Col>
                    </>
                  )}
                </Row>
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
                <Row className="align-items-center">
                  {section_data?.selected_img_align === "center" && (
                    <>
                      <Col lg={12} md={12} sm={12}>
                        <div className="position-relative">
                          <div className="position-relative">
                            {section_data?.img !== "" ? (
                              <a
                                href={
                                  section_data?.redirect_url
                                    ? data?.redirect_url
                                    : "#"
                                    ? section_data?.redirect_url
                                      ? data?.redirect_url
                                      : "#"
                                    : "#"
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={section_data?.img}
                                  alt=""
                                  className={
                                    section_data?.selected_img_layout ===
                                    "circle"
                                      ? "circle img-fluid"
                                      : "img-fluid"
                                  }
                                />
                              </a>
                            ) : (
                              <a
                                href={
                                  section_data?.redirect_url
                                    ? data?.redirect_url
                                    : "#"
                                    ? section_data?.redirect_url
                                      ? data?.redirect_url
                                      : "#"
                                    : "#"
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src="https://cdn.stilyoapps.com/v1/assets/img/img_placeholder.png"
                                  alt=""
                                  className={
                                    section_data?.selected_img_layout ===
                                    "circle"
                                      ? "circle img-fluid"
                                      : "img-fluid"
                                  }
                                />
                              </a>
                            )}
                          </div>
                        </div>
                      </Col>
                      <Col lg={12} md={12} sm={12}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: section_data?.title,
                          }}
                        />
                      </Col>
                    </>
                  )}

                  {section_data?.selected_img_align === "left" && (
                    <>
                      <Col lg={6} md={6} sm={6}>
                        <div className="position-relative">
                          <div className="position-relative">
                            {section_data?.img !== "" ? (
                              <a
                                href={
                                  section_data?.redirect_url
                                    ? data?.redirect_url
                                    : "#"
                                    ? section_data?.redirect_url
                                      ? data?.redirect_url
                                      : "#"
                                    : "#"
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={section_data?.img}
                                  alt=""
                                  className={
                                    section_data?.selected_img_layout ===
                                    "circle"
                                      ? "circle img-fluid"
                                      : "img-fluid"
                                  }
                                />
                              </a>
                            ) : (
                              <a
                                href={
                                  section_data?.redirect_url
                                    ? data?.redirect_url
                                    : "#"
                                    ? section_data?.redirect_url
                                      ? data?.redirect_url
                                      : "#"
                                    : "#"
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src="https://cdn.stilyoapps.com/v1/assets/img/img_placeholder.png"
                                  alt=""
                                  className={
                                    section_data?.selected_img_layout ===
                                    "circle"
                                      ? "circle img-fluid"
                                      : "img-fluid"
                                  }
                                />
                              </a>
                            )}
                          </div>
                        </div>
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: section_data?.title,
                          }}
                        />
                      </Col>
                    </>
                  )}
                  {section_data?.selected_img_align === "right" && (
                    <>
                      <Col lg={6} md={6} sm={6}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: section_data?.title,
                          }}
                        />
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <div className="position-relative">
                          <div className="position-relative">
                            {section_data?.img !== "" ? (
                              <a
                                href={
                                  section_data?.redirect_url
                                    ? data?.redirect_url
                                    : "#"
                                    ? section_data?.redirect_url
                                      ? data?.redirect_url
                                      : "#"
                                    : "#"
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src={section_data?.img}
                                  alt=""
                                  className={
                                    section_data?.selected_img_layout ===
                                    "circle"
                                      ? "circle img-fluid"
                                      : "img-fluid"
                                  }
                                />
                              </a>
                            ) : (
                              <a
                                href={
                                  section_data?.redirect_url
                                    ? data?.redirect_url
                                    : "#"
                                    ? section_data?.redirect_url
                                      ? data?.redirect_url
                                      : "#"
                                    : "#"
                                }
                                target="_blank"
                                rel="noreferrer"
                              >
                                <img
                                  src="https://cdn.stilyoapps.com/v1/assets/img/img_placeholder.png"
                                  alt=""
                                  className={
                                    section_data?.selected_img_layout ===
                                    "circle"
                                      ? "circle img-fluid"
                                      : "img-fluid"
                                  }
                                />
                              </a>
                            )}
                          </div>
                        </div>
                      </Col>
                    </>
                  )}
                </Row>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RenderImageText;
