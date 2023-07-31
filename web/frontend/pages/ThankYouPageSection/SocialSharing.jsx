import React, { useState, useCallback, useEffect } from "react";
import { MobileChevronMajor, ViewMinor } from "@shopify/polaris-icons";
import { Icon, Select, TextField, Banner } from "@shopify/polaris";
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
import { icon_style, btn_alignment } from "../../../constants/selectOptions";
import { Input } from "reactstrap";

const SocialSharing = ({
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
  const [disCode, setDisCode] = useState("");
  const [iconStyle, setIconStyle] = useState("");
  const [iconAlign, setIconAlign] = useState("");
  const [isFb, setIsFB] = useState(false);
  const [isTweet, setIsTweet] = useState(false);
  const [isPin, setIsPin] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isGoogle, setIsGoogle] = useState(false);

  const handleContentStateChange = (contentState) => {
    setContentState(draftToHtml(contentState));
  };

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handlePastedFiles = (files) => {};

  const handleSelectIconChange = useCallback(
    (value) => setIconStyle(value),
    []
  );

  const handleSelectIconAlignChange = useCallback(
    (value) => setIconAlign(value),
    []
  );

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
      setDisCode(section_data?.discount_code);
      setIconStyle(section_data?.selected_icon_style);
      setIconAlign(section_data?.btn_alignment);
      setIsFB(section_data?.share_facebook);
      setIsTweet(section_data?.share_twitter);
      setIsPin(section_data?.share_pinterest);
      setIsLink(section_data?.share_linkedin);
      setIsGoogle(section_data?.share_google);
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
    let body = {
      title: contentState,
      discount_code: disCode,
      selected_icon_style: iconStyle,
      btn_alignment: iconAlign,
      share_facebook: isFb,
      share_twitter: isTweet,
      share_pinterest: isPin,
      share_linkedin: isLink,
      share_google: isGoogle,
    };
    if (
      data.row_section_id === section_id &&
      data?.section_name === section_data?.section_name
    ) {
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
          ...body,
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
          ...body,
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
    disCode,
    iconStyle,
    iconAlign,
    isFb,
    isTweet,
    isPin,
    isLink,
    isGoogle,
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
        <span>Social sharing</span>
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
            <TextField
              label="Discount code"
              type="text"
              value={disCode}
              onChange={(value) => setDisCode(value)}
              autoComplete="off"
            />
          </div>

          <div className="mt-3">
            <Banner title="" status="warning">
              Create a discount in your Shopify admin, and enter it above.
              <br />
              <a
                className="social-banner"
                href="https://shopify.com/admin/discounts/new"
                target="_blank"
              >
                Create discount
              </a>
            </Banner>
          </div>

          <div className="mt-3">
            <Select
              label="Icon style"
              options={icon_style}
              onChange={handleSelectIconChange}
              value={iconStyle}
            />
          </div>

          <div className="mt-3 pb-2">
            <Select
              label="Icon alignment"
              options={btn_alignment}
              onChange={handleSelectIconAlignChange}
              value={iconAlign}
            />
          </div>

          <hr />

          <div>
            <h5>SOCIAL MEDIA SHARING</h5>
          </div>

          <div>
            <Input
              type="checkbox"
              value={isFb}
              onChange={() => setIsFB(!isFb)}
              checked={isFb}
            />
            Share on Facebook
          </div>

          <div className="mt-3">
            <Input
              type="checkbox"
              value={isTweet}
              onChange={() => setIsTweet(!isTweet)}
              checked={isTweet}
            />
            Tweet on Twitter
          </div>

          <div className="mt-3">
            <Input
              type="checkbox"
              value={isPin}
              onChange={() => setIsPin(!isPin)}
              checked={isPin}
            />
            Pin on Pinterest
          </div>

          <div className="mt-3">
            <Input
              type="checkbox"
              value={isLink}
              onChange={() => setIsLink(!isLink)}
              checked={isLink}
            />
            Link on LinkedIn
          </div>

          <div className="mt-3 pb-4">
            <Input
              type="checkbox"
              value={isGoogle}
              onChange={() => setIsGoogle(!isGoogle)}
              checked={isGoogle}
            />
            Share on Google+
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

export default SocialSharing;
