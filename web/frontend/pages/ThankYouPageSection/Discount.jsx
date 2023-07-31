import React, { useState, useEffect } from "react";
import { MobileChevronMajor, ViewMinor } from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { toolbar } from "../../../constants/toolbar";
import draftToHtml from "draftjs-to-html";
import { HexColorPicker } from "react-colorful";
import { useSelector, useDispatch } from "react-redux";
import { SECTION_DELETE, SECTION_DETAILS } from "../../Store/consts";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";

const Discount = ({
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
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(""))
    )
  );
  const [contentState, setContentState] = useState("");
  const [isOpen, toggle] = useState(false);
  const [bgColor, setBgColor] = useState("#000");
  const [btnText, setBtnText] = useState("");
  const [isBgOpen, setIsBgOpen] = useState(false);
  const [btnBgColor, setBtnBgColor] = useState("#197BBD");
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [btnColor, setBtnColor] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [disCode, setDisCode] = useState("");
  const [isDisBgOpen, setIsDisBgOpen] = useState(false);
  const [disBgColor, setDisBgColor] = useState("#fff");
  const [isDisColorOpen, setIsDisColorOpen] = useState(false);
  const [disColor, setDisColor] = useState("#000");
  const [termsEditorState, setTermsEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(""))
    )
  );
  const [termsContentState, setTermsContentState] = useState("");

  const handleContentStateChange = (contentState) => {
    setContentState(draftToHtml(contentState));
  };

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleTermsContentStateChange = (contentState) => {
    setTermsContentState(draftToHtml(contentState));
  };

  const handleTermsEditorStateChange = (editorState) => {
    setTermsEditorState(editorState);
  };

  const handlePastedFiles = (files) => {};

  const handleTermsPastedFiles = (files) => {};

  useEffect(() => {
    if (Object.keys(section_data).length > 0) {
      dispatch({
        type: SECTION_DETAILS,
        payload: { ...section_data },
      });
      setContentState(section_data?.title);
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(section_data?.title)
          )
        )
      );
      setBgColor(section_data?.bg_color);
      setBtnText(section_data?.btn_text);
      setBtnBgColor(section_data?.btn_bg_color);
      setBtnColor(section_data?.btn_color);
      setRedirectUrl(section_data?.redirect_url);
      setDisCode(section_data?.discount_code);
      setDisBgColor(section_data?.discount_bg_color);
      setDisColor(section_data?.discount_color);
      setTermsContentState(section_data?.term_condition_txt);
      setTermsEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(section_data?.term_condition_txt)
          )
        )
      );
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
        title: contentState,
        bg_color: bgColor,
        btn_text: btnText,
        btn_bg_color: btnBgColor,
        btn_color: btnColor,
        redirect_url: redirectUrl,
        discount_code: disCode,
        discount_bg_color: disBgColor,
        discount_color: disColor,
        term_condition_txt: termsContentState,
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
          title: contentState,
          bg_color: bgColor,
          btn_text: btnText,
          btn_bg_color: btnBgColor,
          btn_color: btnColor,
          redirect_url: redirectUrl,
          discount_code: disCode,
          discount_bg_color: disBgColor,
          discount_color: disColor,
          term_condition_txt: termsContentState,
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
        title: contentState,
        bg_color: bgColor,
        btn_text: btnText,
        btn_bg_color: btnBgColor,
        btn_color: btnColor,
        redirect_url: redirectUrl,
        discount_code: disCode,
        discount_bg_color: disBgColor,
        discount_color: disColor,
        term_condition_txt: termsContentState,
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
          title: contentState,
          bg_color: bgColor,
          btn_text: btnText,
          btn_bg_color: btnBgColor,
          btn_color: btnColor,
          redirect_url: redirectUrl,
          discount_code: disCode,
          discount_bg_color: disBgColor,
          discount_color: disColor,
          term_condition_txt: termsContentState,
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
    contentState,
    bgColor,
    btnText,
    btnBgColor,
    btnColor,
    redirectUrl,
    disCode,
    disBgColor,
    disColor,
    termsContentState,
    section_id,
    characters,
    section_data,
  ]);

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
        <span>Discount</span>
      </div>
      <div className="panel-body min-height">
        <label className="custom-label">Settings</label>
        <div className="form-group">
          <label>Free text </label>

          <div className="mt-1">
            <Editor
              editorState={editorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              onEditorStateChange={handleEditorStateChange}
              onContentStateChange={handleContentStateChange}
              toolbar={toolbar}
              spellCheck
              handlePastedText={handlePastedFiles}
            />
          </div>

          <div className="mt-3">
            <div className="swatch-color">
              <div
                className="swatch"
                style={{ backgroundColor: bgColor }}
                onClick={() => toggle(!isOpen)}
              />
              <label className="px-3">Background color</label>
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

          <hr style={{ color: "#b4b9be" }} />

          <div className="mt-3">
            <label>Button text</label>
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
                style={{ backgroundColor: btnBgColor }}
                onClick={() => setIsBgOpen(!isBgOpen)}
              />
              <label className="px-3">Button background color</label>
            </div>

            {isBgOpen && (
              <div className="popover">
                <HexColorPicker
                  color={btnBgColor}
                  onChange={(e) => {
                    setBtnBgColor(e);
                  }}
                />
              </div>
            )}
          </div>

          <div className="mt-3">
            <div className="swatch-color">
              <div
                className="swatch"
                style={{ backgroundColor: btnColor }}
                onClick={() => setIsColorOpen(!isColorOpen)}
              />
              <label className="px-3">Button color</label>
            </div>

            {isColorOpen && (
              <div className="popover">
                <HexColorPicker
                  color={btnColor}
                  onChange={(e) => {
                    setBtnColor(e);
                  }}
                />
              </div>
            )}
          </div>

          <div className="mt-3">
            <label>Redirect url</label>
            <div className="Polaris-Connected mt-1">
              <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                <div className="Polaris-TextField Polaris-TextField--hasValue">
                  <input
                    className="Polaris-TextField__Input section_field_update live-update-text"
                    name="btn_text"
                    type="text"
                    value={redirectUrl}
                    onChange={(e) => setRedirectUrl(e.target.value)}
                    autoComplete="off"
                  />
                  <div className="Polaris-TextField__Backdrop"></div>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div className="mt-3">
            <label>Discount code</label>
            <div className="Polaris-Connected mt-1">
              <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                <div className="Polaris-TextField Polaris-TextField--hasValue">
                  <input
                    className="Polaris-TextField__Input section_field_update live-update-text"
                    name="btn_text"
                    type="text"
                    value={disCode}
                    onChange={(e) => setDisCode(e.target.value)}
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
                style={{ backgroundColor: disColor }}
                onClick={() => setIsDisColorOpen(!isDisColorOpen)}
              />
              <label className="px-3">Discount code color</label>
            </div>

            {isDisColorOpen && (
              <div className="popover">
                <HexColorPicker
                  color={disColor}
                  onChange={(e) => {
                    setDisColor(e);
                  }}
                />
              </div>
            )}
          </div>

          <div className="mt-3">
            <div className="swatch-color">
              <div
                className="swatch"
                style={{ backgroundColor: disBgColor }}
                onClick={() => setIsDisBgOpen(!isDisBgOpen)}
              />
              <label className="px-3">Discount background color</label>
            </div>

            {isDisBgOpen && (
              <div className="popover">
                <HexColorPicker
                  color={disBgColor}
                  onChange={(e) => {
                    setDisBgColor(e);
                  }}
                />
              </div>
            )}
          </div>

          <div className="mt-3 pb-4">
            <label className="mb-1">Terms and conditions text</label>

            <Editor
              editorState={termsEditorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              onEditorStateChange={handleTermsEditorStateChange}
              onContentStateChange={handleTermsContentStateChange}
              toolbar={toolbar}
              spellCheck
              handlePastedText={handleTermsPastedFiles}
            />
          </div>
        </div>
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

export default Discount;
