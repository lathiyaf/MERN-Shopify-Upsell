import React, { useState, useEffect } from "react";
import { MobileChevronMajor, ViewMinor } from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { toolbar } from "../../../constants/toolbar";
import draftToHtml from "draftjs-to-html";
import { useSelector, useDispatch } from "react-redux";
import { SECTION_DELETE, SECTION_DETAILS } from "../../Store/consts";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";

const FreeText = ({
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

  const handleContentStateChange = (contentState) => {
    setContentState(draftToHtml(contentState));
  };

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handlePastedFiles = (files) => {};

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
  }, [contentState, section_id, characters, section_data]);

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
        <span>Free text</span>
      </div>
      <div className="panel-body min-height">
        <label className="custom-label">Settings</label>
        <div className="form-group">
          <label>Free text </label>
          <div className="mt-1 pb-4">
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

export default FreeText;
