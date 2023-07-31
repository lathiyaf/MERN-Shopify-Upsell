import React, { useState, useEffect, useCallback } from "react";
import { MobileChevronMajor, ViewMinor } from "@shopify/polaris-icons";
import { Icon, Select } from "@shopify/polaris";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { toolbar } from "../../../constants/toolbar";
import { HexColorPicker } from "react-colorful";
import draftToHtml from "draftjs-to-html";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { SECTION_DELETE, SECTION_DETAILS } from "../../Store/consts";

const CallToAction = ({
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
  const [layout, setLayout] = useState();
  const [selectLayout, setSelectLayout] = useState("");
  const [btnText, setBtnText] = useState("");
  const [isOpen, toggle] = useState(false);
  const [bgColor, setBgColor] = useState("#197BBD");
  const [color, setColor] = useState("#fff");
  const [isColorOpen, toggleColor] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

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
      setBtnText(section_data?.btn_text);
      setBgColor(section_data?.bg_color);
      setColor(section_data?.color);
      setLayout(section_data?.layout);
      setSelectLayout(section_data?.selected_layout);
      setRedirectUrl(section_data?.redirect_url);
    }
  }, [section_data]);

  const handleContentStateChange = (contentState) => {
    setContentState(draftToHtml(contentState));
  };

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handlePastedFiles = (files) => {
    console.log("files================", files);
    // const formData = new FormData();
    // formData.append("file", files[0]);
    // fetch("/api/uploads", { method: "POST", body: formData })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.file) {
    //       setEditorState(insertImage(data.file)); //created below
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleSelectChange = useCallback((value) => setSelectLayout(value), []);

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
        btn_text: btnText,
        bg_color: bgColor,
        color: color,
        layout: layout,
        selected_layout: selectLayout,
        redirect_url: redirectUrl,
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
          btn_text: btnText,
          bg_color: bgColor,
          color: color,
          layout: layout,
          selected_layout: selectLayout,
          redirect_url: redirectUrl,
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
        btn_text: btnText,
        bg_color: bgColor,
        color: color,
        layout: layout,
        selected_layout: selectLayout,
        redirect_url: redirectUrl,
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
          btn_text: btnText,
          bg_color: bgColor,
          color: color,
          layout: layout,
          selected_layout: selectLayout,
          redirect_url: redirectUrl,
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
    layout,
    selectLayout,
    btnText,
    bgColor,
    color,
    redirectUrl,
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
        <span>Call to action</span>
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
            <Select
              label="Layout"
              options={layout}
              onChange={handleSelectChange}
              value={selectLayout}
            />
          </div>

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
                style={{ backgroundColor: bgColor }}
                onClick={() => toggle(!isOpen)}
              />
              <label className="px-3">Button background color</label>
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
              <label className="px-3">Button text color</label>
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

          <div className="mt-3 pb-4">
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

export default CallToAction;
