import React, { useState, useCallback, useEffect } from "react";
import { MobileChevronMajor, ViewMinor } from "@shopify/polaris-icons";
import { Icon, Select, TextField } from "@shopify/polaris";
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
import { icon_style } from "../../../constants/selectOptions";

const SocialMediaLink = ({
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
  const [iconStyle, setIconStyle] = useState("");
  const [fbUrl, setFbUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [pintererstUrl, setPinterestUrl] = useState("");
  const [instaUrl, setInstaUrl] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [tumblrUrl, setTumblrUrl] = useState("");
  const [googleUrl, setGoogleUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

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
      setIconStyle(section_data?.selected_icon_style);
      setFbUrl(section_data?.facebook_link);
      setTwitterUrl(section_data?.twitter_link);
      setPinterestUrl(section_data?.pinterest_link);
      setInstaUrl(section_data?.instagram_link);
      setLinkedInUrl(section_data?.linkedin_link);
      setTumblrUrl(section_data?.tumblr_link);
      setGoogleUrl(section_data?.google_link);
      setYoutubeUrl(section_data?.youtube_link);
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
      selected_icon_style: iconStyle,
      facebook_link: fbUrl,
      twitter_link: twitterUrl,
      pinterest_link: pintererstUrl,
      instagram_link: instaUrl,
      linkedin_link: linkedInUrl,
      tumblr_link: tumblrUrl,
      google_link: googleUrl,
      youtube_link: youtubeUrl,
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
    iconStyle,
    fbUrl,
    twitterUrl,
    pintererstUrl,
    instaUrl,
    linkedInUrl,
    tumblrUrl,
    googleUrl,
    youtubeUrl,
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
        <span>Social media links</span>
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
              label="Icon style"
              options={icon_style}
              onChange={handleSelectIconChange}
              value={iconStyle}
            />
          </div>

          <hr />

          <div>
            <h5>SOCIAL MEDIA LINKS</h5>
            <div className="text-gray">
              Add links to your social media profiles.
            </div>
          </div>

          <div className="mt-3">
            <TextField
              label="Facebook"
              type="text"
              value={fbUrl}
              onChange={(value) => setFbUrl(value)}
              autoComplete="off"
            />
          </div>

          <div className="mt-3">
            <TextField
              label="Twitter"
              type="text"
              value={twitterUrl}
              onChange={(value) => setTwitterUrl(value)}
              autoComplete="off"
            />
          </div>

          <div className="mt-3">
            <TextField
              label="Pinterest"
              type="text"
              value={pintererstUrl}
              onChange={(value) => setPinterestUrl(value)}
              autoComplete="off"
            />
          </div>

          <div className="mt-3">
            <TextField
              label="Instagram"
              type="text"
              value={instaUrl}
              onChange={(value) => setInstaUrl(value)}
              autoComplete="off"
            />
          </div>

          <div className="mt-3">
            <TextField
              label="LinkedIn"
              type="text"
              value={linkedInUrl}
              onChange={(value) => setLinkedInUrl(value)}
              autoComplete="off"
            />
          </div>

          <div className="mt-3">
            <TextField
              label="Tumblr"
              type="text"
              value={tumblrUrl}
              onChange={(value) => setTumblrUrl(value)}
              autoComplete="off"
            />
          </div>

          <div className="mt-3">
            <TextField
              label="Google+"
              type="text"
              value={googleUrl}
              onChange={(value) => setGoogleUrl(value)}
              autoComplete="off"
            />
          </div>

          <div className="mt-3 pb-4">
            <TextField
              label="YouTube"
              type="text"
              value={youtubeUrl}
              onChange={(value) => setYoutubeUrl(value)}
              autoComplete="off"
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

export default SocialMediaLink;
