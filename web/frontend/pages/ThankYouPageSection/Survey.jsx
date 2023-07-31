import React, { useState, useCallback, useEffect } from "react";
import {
  DeleteMinor,
  MobileChevronMajor,
  ViewMinor,
} from "@shopify/polaris-icons";
import { Button, Icon, Select } from "@shopify/polaris";
import { HexColorPicker } from "react-colorful";
import { useSelector, useDispatch } from "react-redux";
import { SECTION_DELETE, SECTION_DETAILS } from "../../Store/consts";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

const Survey = ({
  section_data,
  setSection,
  setLabel,
  section_id,
  GetSectionsAPI,
  characters,
  updateCharacters,
  areas,
}) => {
  const data = useSelector((state) => state.section_data);
  const dispatch = useDispatch();
  const app = useAppBridge();
  const [surveyData, setSurveyData] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [btnText, setBtnText] = useState("");
  const [isOpen, toggle] = useState(false);
  const [bgColor, setBgColor] = useState("#197BBD");
  const [color, setColor] = useState("#fff");
  const [isColorOpen, toggleColor] = useState(false);
  const [nextText, setNextText] = useState("");
  const [isNextBgOpen, setIsNextBgOpen] = useState(false);
  const [nextBgColor, setNextBgColor] = useState("#197BBD");
  const [isNextOpen, setIsNextOpen] = useState(false);
  const [nextColor, setNextColor] = useState("#fff");
  const [prevText, setPrevText] = useState("");
  const [isPrevBgOpen, setIsPrevBgOpen] = useState(false);
  const [prevBgColor, setPrevBgColor] = useState("#197BBD");
  const [isPrevOpen, setIsPrevOpen] = useState(false);
  const [prevColor, setPrevColor] = useState("#fff");
  const [tyMessage, setTyMessage] = useState("");
  const [isTyOpen, setIsTyOpen] = useState(false);
  const [tyColor, setTyColor] = useState("#000");
  const [errMsg, setErrMsg] = useState("");
  const [isErrOpen, setIsErrOpen] = useState(false);
  const [errColor, setErrColor] = useState("#e32c2b");
  const [placeHolder, setPlaceHolder] = useState("");
  const [dropdownPlaceholder, setDropdownPlaceholder] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", answer_type: "textarea", options: [""] },
  ]);
  const [open, setOpen] = useState("");
  const [title, setTitle] = useState("");

  const toggleAcc = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const GetAllSurveys = async () => {
    const token = await getSessionToken(app);
    axios({
      url: `https://${window.location.host}/api/survey`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data.data;
        let arr = [
          {
            label: "Select",
            value: "",
          },
        ];
        data.map((item) => {
          let obj = {
            label: item.title,
            value: item.survey_id,
          };
          arr.push(obj);
        });

        setSurveyData(arr);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    GetAllSurveys();
  }, []);

  const handleSelectChange = useCallback(
    (value) => setSelectedSurvey(value),
    []
  );

  const GetSurveyById = async () => {
    const token = await getSessionToken(app);
    axios({
      url: `https://${window.location.host}/api/survey/details?survey_id=${selectedSurvey}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data.data;
        setQuestions(data?.question_answer);
        setTitle(data?.title);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (selectedSurvey !== "") {
      GetSurveyById();
    }
  }, [selectedSurvey]);

  const answerType = [
    {
      label: "Textarea",
      value: "textarea",
    },
    {
      label: "Select",
      value: "select",
    },
    {
      label: "Radio",
      value: "radio",
    },
    {
      label: "Checkbox",
      value: "checkbox",
    },
  ];

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].answer_type = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", answer_type: "textarea", options: [""] },
    ]);
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push("");
    setQuestions(newQuestions);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  useEffect(() => {
    if (Object.keys(section_data).length > 0) {
      dispatch({
        type: SECTION_DETAILS,
        payload: { ...section_data },
      });
      setSelectedSurvey(section_data?.select_survey);
      setBtnText(section_data?.btn_text);
      setBgColor(section_data?.bg_color);
      setColor(section_data?.color);
      setNextText(section_data?.next_btn_text);
      setNextBgColor(section_data?.next_btn_bg_color);
      setNextColor(section_data?.next_btn_color);
      setPrevText(section_data?.prev_btn_text);
      setPrevBgColor(section_data?.prev_btn_bg_color);
      setPrevColor(section_data?.prev_btn_color);
      setTyMessage(section_data?.thank_you_msg);
      setTyColor(section_data?.thank_you_msg_color);
      setErrMsg(section_data?.error_msg);
      setErrColor(section_data?.err_msg_color);
      setPlaceHolder(section_data?.place_holder_answer);
      setDropdownPlaceholder(section_data?.place_holder_dropdown);
      setQuestions(section_data?.questions);
    }
  }, [section_data]);

  const deleteSectionAPI = async () => {
    if (section_data?.row_section_id) {
      const token = await getSessionToken(app);
      axios({
        url: `https://${window.location.host}/api/thankyou/section?section_id=${section_data?.row_section_id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setSection("section2");
          GetSectionsAPI();
          dispatch({
            type: SECTION_DELETE,
            payload: {},
          });
        })
        .catch((err) => {});
    } else if (section_id !== undefined) {
      const token = await getSessionToken(app);
      axios({
        url: `https://${window.location.host}/api/thankyou/section?section_id=${section_id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setSection("section2");
          GetSectionsAPI();
          dispatch({
            type: SECTION_DELETE,
            payload: {},
          });
        })
        .catch((err) => {});
    }
  };

  const updateSectionAPI = async () => {
    if (
      data.row_section_id === section_id &&
      data?.section_name === section_data?.section_name
    ) {
      let body = {
        select_survey: selectedSurvey,
        btn_text: btnText,
        bg_color: bgColor,
        color: color,
        next_btn_text: nextText,
        next_btn_bg_color: nextBgColor,
        next_btn_color: nextColor,
        prev_btn_text: prevText,
        prev_btn_bg_color: prevBgColor,
        prev_btn_color: prevColor,
        thank_you_msg: tyMessage,
        thank_you_msg_color: tyColor,
        error_msg: errMsg,
        err_msg_color: errColor,
        place_holder_answer: placeHolder,
        place_holder_dropdown: dropdownPlaceholder,
        questions: questions,
        title: title,
      };
      dispatch({
        type: `${SECTION_DETAILS}`,
        payload: { ...section_data, ...body },
      });
      let result = characters;
      var item = {
        id: data?.row_section_id,
        iconName: data?.iconName,
        is_fa_icon: data?.is_fa_icon,
        is_disabled: data?.is_disabled,
        area: data?.area,
        name: data?.section_name,
        section_data: {
          select_survey: selectedSurvey,
          btn_text: btnText,
          bg_color: bgColor,
          color: color,
          next_btn_text: nextText,
          next_btn_bg_color: nextBgColor,
          next_btn_color: nextColor,
          prev_btn_text: prevText,
          prev_btn_bg_color: prevBgColor,
          prev_btn_color: prevColor,
          thank_you_msg: tyMessage,
          thank_you_msg_color: tyColor,
          error_msg: errMsg,
          err_msg_color: errColor,
          place_holder_answer: placeHolder,
          place_holder_dropdown: dropdownPlaceholder,
          questions: questions,
          title: title,
          iconName: data?.iconName,
          is_disabled: data?.is_disabled,
          is_fa_icon: data?.is_fa_icon,
          row_section_id: data?.row_section_id,
          section_id: data?.section_id,
          section_name: data?.section_name,
          status: data?.status,
          template_id: data?.template_id,
        },
      };

      characters.forEach((element, index) => {
        if (
          element.id === data?.row_section_id &&
          element.name === data?.section_name
        ) {
          characters[index] = item;
        }
      });

      updateCharacters(result);
      const token = await getSessionToken(app);
      axios({
        url: `https://${window.location.host}/api/thankyou/section?section_id=${data.row_section_id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: body,
      })
        .then((res) => {})
        .catch((err) => {});
    } else if (
      data.row_section_id === section_data?.row_section_id &&
      data?.section_name === section_data?.section_name
    ) {
      let body = {
        select_survey: selectedSurvey,
        btn_text: btnText,
        bg_color: bgColor,
        color: color,
        next_btn_text: nextText,
        next_btn_bg_color: nextBgColor,
        next_btn_color: nextColor,
        prev_btn_text: prevText,
        prev_btn_bg_color: prevBgColor,
        prev_btn_color: prevColor,
        thank_you_msg: tyMessage,
        thank_you_msg_color: tyColor,
        error_msg: errMsg,
        err_msg_color: errColor,
        place_holder_answer: placeHolder,
        place_holder_dropdown: dropdownPlaceholder,
        questions: questions,
        title: title,
      };
      dispatch({
        type: `${SECTION_DETAILS}`,
        payload: { ...section_data, ...body },
      });
      let result = characters;
      var item = {
        id: data?.row_section_id,
        iconName: data?.iconName,
        is_fa_icon: data?.is_fa_icon,
        is_disabled: data?.is_disabled,
        area: data?.area,
        name: data?.section_name,
        section_data: {
          select_survey: selectedSurvey,
          btn_text: btnText,
          bg_color: bgColor,
          color: color,
          next_btn_text: nextText,
          next_btn_bg_color: nextBgColor,
          next_btn_color: nextColor,
          prev_btn_text: prevText,
          prev_btn_bg_color: prevBgColor,
          prev_btn_color: prevColor,
          thank_you_msg: tyMessage,
          thank_you_msg_color: tyColor,
          error_msg: errMsg,
          err_msg_color: errColor,
          place_holder_answer: placeHolder,
          place_holder_dropdown: dropdownPlaceholder,
          questions: questions,
          title: title,
          iconName: data?.iconName,
          is_disabled: data?.is_disabled,
          is_fa_icon: data?.is_fa_icon,
          row_section_id: data?.row_section_id,
          section_id: data?.section_id,
          section_name: data?.section_name,
          status: data?.status,
          template_id: data?.template_id,
        },
      };

      characters.forEach((element, index) => {
        if (
          element.id === data?.row_section_id &&
          element.name === data?.section_name
        ) {
          characters[index] = item;
        }
      });

      updateCharacters(result);
      const token = await getSessionToken(app);
      axios({
        url: `https://${window.location.host}/api/thankyou/section?section_id=${data.row_section_id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: body,
      })
        .then((res) => {})
        .catch((err) => {});
    }
  };

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      updateSectionAPI();
    }
  }, [
    selectedSurvey,
    btnText,
    bgColor,
    color,
    nextText,
    nextBgColor,
    nextColor,
    prevText,
    prevBgColor,
    prevColor,
    tyMessage,
    tyColor,
    errMsg,
    errColor,
    placeHolder,
    dropdownPlaceholder,
    questions,
    title,
    section_id,
    characters,
    section_data,
  ]);

  const updateSurvey = async () => {
    if (selectedSurvey !== "") {
      const token = await getSessionToken(app);
      const data = {
        question_answer: questions,
      };
      axios({
        url: `https://${window.location.host}/api/survey?survey_id=${selectedSurvey}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      })
        .then((res) => {})
        .catch((err) => {});
    }
  };

  useEffect(() => {
    updateSurvey();
  }, [questions, selectedSurvey]);

  return (
    <>
      <div className="select-prd-sec-new">
        <span
          className="hover-button-close"
          onClick={() => {
            setSection("section2");
            setLabel(
              areas === "general" ? "General Settings" : areas + " Area"
            );
          }}
        >
          <Icon source={MobileChevronMajor} color="base" />
        </span>
        <span>Post purchase surveys</span>
      </div>
      <div className="panel-body min-height">
        <label className="custom-label">Settings</label>
        <div className="form-group">
          <div className="mt-1">
            <Select
              label="Select survey"
              options={surveyData}
              onChange={handleSelectChange}
              value={selectedSurvey}
            />
          </div>

          <div className="mt-3">
            <label>Submit button text</label>
            <div className="Polaris-Connected mt-1">
              <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                <div className="Polaris-TextField Polaris-TextField--hasValue">
                  <input
                    className="Polaris-TextField__Input section_field_update live-update-text"
                    name="btn_text"
                    type="text"
                    value={btnText}
                    onChange={(e) => setBtnText(e.target.value)}
                    autoComplete="off"
                  />
                  <div className="Polaris-TextField__Backdrop"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="swatch-color">
              <div
                className="swatch"
                style={{ backgroundColor: bgColor }}
                onClick={() => toggle(!isOpen)}
              />
              <label className="px-3">Submit button background color</label>
            </div>

            {isOpen && (
              <div className="popover">
                <HexColorPicker
                  color={bgColor}
                  onChange={(e) => {
                    setBgColor(e);
                  }}
                />
              </div>
            )}
          </div>

          <div className="mt-3">
            <div className="swatch-color">
              <div
                className="swatch"
                style={{ backgroundColor: color }}
                onClick={() => toggleColor(!isColorOpen)}
              />
              <label className="px-3">Submit button text color</label>
            </div>

            {isColorOpen && (
              <div className="popover">
                <HexColorPicker
                  color={color}
                  onChange={(e) => {
                    setColor(e);
                  }}
                />
              </div>
            )}
          </div>

          <div className="mt-3">
            <label>Next button text</label>
            <div className="Polaris-Connected mt-1">
              <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                <div className="Polaris-TextField Polaris-TextField--hasValue">
                  <input
                    className="Polaris-TextField__Input section_field_update live-update-text"
                    name="btn_text"
                    type="text"
                    value={nextText}
                    onChange={(e) => setNextText(e.target.value)}
                    autoComplete="off"
                  />
                  <div className="Polaris-TextField__Backdrop"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="swatch-color">
              <div
                className="swatch"
                style={{ backgroundColor: nextBgColor }}
                onClick={() => setIsNextBgOpen(!isNextBgOpen)}
              />
              <label className="px-3">Next button background color</label>
            </div>

            {isNextBgOpen && (
              <div className="popover">
                <HexColorPicker
                  color={nextBgColor}
                  onChange={(e) => {
                    setNextBgColor(e);
                  }}
                />
              </div>
            )}
          </div>

          <div className="mt-3">
            <div className="swatch-color">
              <div
                className="swatch"
                style={{ backgroundColor: nextColor }}
                onClick={() => setIsNextOpen(!isNextOpen)}
              />
              <label className="px-3">Next button text color</label>
            </div>

            {isNextOpen && (
              <div className="popover">
                <HexColorPicker
                  color={nextColor}
                  onChange={(e) => {
                    setNextColor(e);
                  }}
                />
              </div>
            )}
          </div>

          <div className="mt-3">
            <label>Previous button text</label>
            <div className="Polaris-Connected mt-1">
              <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                <div className="Polaris-TextField Polaris-TextField--hasValue">
                  <input
                    className="Polaris-TextField__Input section_field_update live-update-text"
                    name="btn_text"
                    type="text"
                    value={prevText}
                    onChange={(e) => setPrevText(e.target.value)}
                    autoComplete="off"
                  />
                  <div className="Polaris-TextField__Backdrop"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="swatch-color">
              <div
                className="swatch"
                style={{ backgroundColor: prevBgColor }}
                onClick={() => setIsPrevBgOpen(!isPrevBgOpen)}
              />
              <label className="px-3">Previous button background color</label>
            </div>

            {isPrevBgOpen && (
              <div className="popover">
                <HexColorPicker
                  color={prevBgColor}
                  onChange={(e) => {
                    setPrevBgColor(e);
                  }}
                />
              </div>
            )}
          </div>

          <div className="mt-3">
            <div className="swatch-color">
              <div
                className="swatch"
                style={{ backgroundColor: prevColor }}
                onClick={() => setIsPrevOpen(!isPrevOpen)}
              />
              <label className="px-3">Previous button text color</label>
            </div>

            {isPrevOpen && (
              <div className="popover">
                <HexColorPicker
                  color={prevColor}
                  onChange={(e) => {
                    setPrevColor(e);
                  }}
                />
              </div>
            )}
          </div>

          <div className="mt-3">
            <label>Thank you message</label>
            <div className="Polaris-Connected mt-1">
              <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                <div className="Polaris-TextField Polaris-TextField--hasValue">
                  <input
                    className="Polaris-TextField__Input section_field_update live-update-text"
                    name="btn_text"
                    type="text"
                    value={tyMessage}
                    onChange={(e) => setTyMessage(e.target.value)}
                    autoComplete="off"
                  />
                  <div className="Polaris-TextField__Backdrop"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="swatch-color">
              <div
                className="swatch"
                style={{ backgroundColor: tyColor }}
                onClick={() => setIsTyOpen(!isTyOpen)}
              />
              <label className="px-3">Thank you message text color</label>
            </div>

            {isTyOpen && (
              <div className="popover">
                <HexColorPicker
                  color={tyColor}
                  onChange={(e) => {
                    setTyColor(e);
                  }}
                />
              </div>
            )}
          </div>

          <div className="mt-3">
            <label>Error message</label>
            <div className="Polaris-Connected mt-1">
              <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                <div className="Polaris-TextField Polaris-TextField--hasValue">
                  <input
                    className="Polaris-TextField__Input section_field_update live-update-text"
                    name="btn_text"
                    type="text"
                    value={errMsg}
                    onChange={(e) => setErrMsg(e.target.value)}
                    autoComplete="off"
                  />
                  <div className="Polaris-TextField__Backdrop"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="swatch-color">
              <div
                className="swatch"
                style={{ backgroundColor: errColor }}
                onClick={() => setIsErrOpen(!isErrOpen)}
              />
              <label className="px-3">Error message text color</label>
            </div>

            {isErrOpen && (
              <div className="popover">
                <HexColorPicker
                  color={errColor}
                  onChange={(e) => {
                    setErrColor(e);
                  }}
                />
              </div>
            )}
          </div>

          <div className="mt-3">
            <label>Placeholder text for free text questions</label>
            <div className="Polaris-Connected mt-1">
              <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                <div className="Polaris-TextField Polaris-TextField--hasValue">
                  <input
                    className="Polaris-TextField__Input section_field_update live-update-text"
                    name="btn_text"
                    type="text"
                    value={placeHolder}
                    onChange={(e) => setPlaceHolder(e.target.value)}
                    autoComplete="off"
                  />
                  <div className="Polaris-TextField__Backdrop"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 pb-4">
            <label>Placeholder text for dropdown questions</label>
            <div className="Polaris-Connected mt-1">
              <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                <div className="Polaris-TextField Polaris-TextField--hasValue">
                  <input
                    className="Polaris-TextField__Input section_field_update live-update-text"
                    name="btn_text"
                    type="text"
                    value={dropdownPlaceholder}
                    onChange={(e) => setDropdownPlaceholder(e.target.value)}
                    autoComplete="off"
                  />
                  <div className="Polaris-TextField__Backdrop"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedSurvey !== "" && (
          <>
            <div className="add-coll">
              <div className="form-group">
                <h5 className="mt-3">QUESTIONS</h5>
                <div>
                  <ul className="nav custom-box-editor mt-3">
                    {questions &&
                      questions.length > 0 &&
                      questions.map((question, questionIndex) => (
                        <React.Fragment key={questionIndex}>
                          <Accordion open={open} toggle={toggleAcc}>
                            <AccordionItem>
                              <AccordionHeader
                                targetId={questionIndex.toString()}
                              >
                                <span className="Polaris-Icon icon disply-unset editor-set-icon">
                                  <i className="ri-error-warning-fill"></i>
                                </span>
                                <span className="title text">
                                  {question.question
                                    ? question.question
                                    : `Question${questionIndex}`}
                                </span>
                              </AccordionHeader>
                              <AccordionBody
                                accordionId={questionIndex.toString()}
                              >
                                <div className="mt-2">
                                  <label>Question</label>
                                  <div className="Polaris-Connected mt-1">
                                    <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                      <div className="Polaris-TextField Polaris-TextField--hasValue">
                                        <input
                                          className="Polaris-TextField__Input section_field_update live-update-text"
                                          name="question"
                                          type="text"
                                          value={question.question}
                                          onChange={(event) =>
                                            handleQuestionChange(
                                              questionIndex,
                                              event
                                            )
                                          }
                                          autoComplete="off"
                                        />
                                        <div className="Polaris-TextField__Backdrop"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-3">
                                  <Select
                                    label="Answer type"
                                    options={answerType}
                                    onChange={(event) =>
                                      handleAnswerChange(questionIndex, event)
                                    }
                                    value={question.answer_type}
                                    name="answer_type"
                                  />
                                </div>

                                {question.answer_type !== "textarea" && (
                                  <>
                                    <div className="d-flex align-items-center justify-content-between mt-3">
                                      <label>Options</label>
                                      <Button
                                        primary
                                        onClick={() => addOption(questionIndex)}
                                      >
                                        Add options
                                      </Button>
                                    </div>
                                    {question.options.length > 0 &&
                                      question.options.map(
                                        (option, optionIndex) => (
                                          <div
                                            key={optionIndex}
                                            className="mt-3 d-flex align-items-center justify-content-between"
                                          >
                                            <div
                                              className="Polaris-Connected mt-1"
                                              style={{ paddingRight: 8 }}
                                            >
                                              <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                                                <div className="Polaris-TextField Polaris-TextField--hasValue">
                                                  <input
                                                    className="Polaris-TextField__Input section_field_update live-update-text"
                                                    name="options"
                                                    type="text"
                                                    value={option}
                                                    onChange={(event) =>
                                                      handleOptionChange(
                                                        questionIndex,
                                                        optionIndex,
                                                        event
                                                      )
                                                    }
                                                    autoComplete="off"
                                                  />
                                                  <div className="Polaris-TextField__Backdrop"></div>
                                                </div>
                                              </div>
                                            </div>

                                            <div
                                              onClick={() =>
                                                removeOption(
                                                  questionIndex,
                                                  optionIndex
                                                )
                                              }
                                            >
                                              <Icon
                                                source={DeleteMinor}
                                                color="base"
                                              />
                                            </div>
                                          </div>
                                        )
                                      )}
                                  </>
                                )}

                                <div className="mt-3">
                                  <Button
                                    onClick={() =>
                                      removeQuestion(questionIndex)
                                    }
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </AccordionBody>
                            </AccordionItem>
                          </Accordion>
                        </React.Fragment>
                      ))}
                    <li className="list-group-item">
                      <div className="item" onClick={addQuestion}>
                        <span className="Polaris-Icon icon disply-unset editor-set-icon">
                          <i
                            className="fa fa-regular fa-plus-square icon"
                            style={{ color: "#5c6ac4" }}
                          ></i>
                        </span>
                        <span className="title text">Add question</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="delete-section">
        <a
          className="Polaris-Button Polaris-Button--outline"
          onClick={() => deleteSectionAPI()}
        >
          <i className="fa fa-trash px-3" aria-hidden="true"></i>
          Delete Section
        </a>
        <a className="Polaris-Button Polaris-Button--outline">
          <Icon source={ViewMinor} color="base" />
        </a>
      </div>
    </>
  );
};

export default Survey;
