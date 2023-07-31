import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "reactstrap";

const RenderSurvey = ({
  section_data,
  setSection,
  setSelectedSection,
  setSectionId,
  sectionRef,
}) => {
  const data = useSelector((state) => state.section_data);
  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState(0);

  const handleNext = (e, data) => {
    setSelected((prev) => {
      if (prev === data?.questions.length - 1) {
        return 0;
      } else {
        return (prev + 1) % data?.questions.length;
      }
    });
    e.preventDefault();
  };

  const handlePrev = (e) => {
    setSelected((prev) => {
      if (prev === 0) {
        return 0;
      } else {
        return prev - 1;
      }
    });
    e.preventDefault();
  };

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
              <div className="content-box-row survey">
                {data?.select_survey === "" ? (
                  <>
                    <div className="px-3 mt-3 mb-3">
                      You did not select any survey yet. Select survey to this
                      section using the sidebar and this text will disappear.
                    </div>
                  </>
                ) : (
                  <>
                    <div className="survey-title">
                      <h2>{data?.title}</h2>
                    </div>
                    <div className="content-box-row survey-box">
                      <div className="survey-title">
                        <h2>
                          {data?.questions && data?.questions.length > 0
                            ? data?.questions[selected].question
                            : ""}
                        </h2>
                        <div className="mt-3">
                          {data?.questions &&
                            data?.questions.length > 0 &&
                            data?.questions[selected].answer_type ===
                              "textarea" && (
                              <textarea className="survey-textarea"></textarea>
                            )}
                          {data?.questions &&
                            data?.questions.length > 0 &&
                            data?.questions[selected].answer_type ===
                              "select" && (
                              <Input
                                type="select"
                                name="select"
                                id="exampleSelect"
                              >
                                <option>Select</option>
                              </Input>
                            )}
                          {data?.questions &&
                            data?.questions.length > 0 &&
                            data?.questions[selected].answer_type ===
                              "radio" && (
                              <>
                                <Input type="radio" name="radio1" /> {"test"}
                              </>
                            )}
                          {data?.questions &&
                            data?.questions.length > 0 &&
                            data?.questions[selected].answer_type ===
                              "checkbox" && (
                              <>
                                <Input type="checkbox" /> Check me out
                              </>
                            )}
                        </div>

                        <div className="mt-3 d-flex justify-content-between">
                          {selected > 0 && (
                            <div>
                              <a
                                style={{
                                  backgroundColor: data?.prev_btn_bg_color,
                                  color: data?.prev_btn_color,
                                }}
                                className="btn"
                                onClick={(e) => handlePrev(e)}
                              >
                                {data?.prev_btn_text}
                              </a>
                            </div>
                          )}
                          {data &&
                            data?.questions &&
                            data?.questions.length === selected && (
                              <div>
                                <a
                                  style={{
                                    backgroundColor: data?.bg_color,
                                    color: data?.color,
                                  }}
                                  className="btn"
                                >
                                  {data?.btn_text}
                                </a>
                              </div>
                            )}
                          {data &&
                            data?.questions &&
                            data?.questions.length !== selected && (
                              <div>
                                <a
                                  style={{
                                    backgroundColor: data?.next_btn_bg_color,
                                    color: data?.next_btn_color,
                                  }}
                                  className="btn"
                                  onClick={(e) => handleNext(e, data)}
                                >
                                  {data?.next_btn_text}
                                </a>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
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
              <div className="content-box-row survey">
                {section_data?.select_survey === "" ? (
                  <>
                    <div className="px-3 mt-3 mb-3">
                      You did not select any survey yet. Select survey to this
                      section using the sidebar and this text will disappear.
                    </div>
                  </>
                ) : (
                  <>
                    <div className="survey-title">
                      <h2>{section_data?.title}</h2>
                    </div>
                    <div className="content-box-row survey-box">
                      <div className="survey-title">
                        <h2>
                          {section_data?.questions &&
                          section_data?.questions.length > 0
                            ? section_data?.questions[selected].question
                            : ""}
                        </h2>
                        <div className="mt-3">
                          {section_data?.questions.length > 0 &&
                            section_data?.questions[selected].answer_type ===
                              "textarea" && (
                              <textarea className="survey-textarea"></textarea>
                            )}
                          {section_data?.questions.length > 0 &&
                            section_data?.questions[selected].answer_type ===
                              "select" && (
                              <Input
                                type="select"
                                name="select"
                                id="exampleSelect"
                              >
                                <option>Select</option>
                              </Input>
                            )}
                          {section_data?.questions.length > 0 &&
                            section_data?.questions[selected].answer_type ===
                              "radio" && (
                              <>
                                <Input type="radio" name="radio1" /> {"test"}
                              </>
                            )}
                          {section_data?.questions.length > 0 &&
                            section_data?.questions[selected].answer_type ===
                              "checkbox" && (
                              <>
                                <Input type="checkbox" /> Check me out
                              </>
                            )}
                        </div>

                        <div className="mt-3 d-flex justify-content-between">
                          <div>
                            <a
                              style={{
                                backgroundColor: section_data?.bg_color,
                                color: section_data?.color,
                              }}
                              className="btn"
                            >
                              {section_data?.btn_text}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RenderSurvey;
