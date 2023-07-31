import React, { useState, useCallback, useEffect } from "react";
import { MobileChevronMajor, ViewMinor } from "@shopify/polaris-icons";
import { Icon, Select, TextField } from "@shopify/polaris";
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
import { Input } from "reactstrap";
import {
  btn_alignment,
  reorder_discount_type,
} from "../../../constants/selectOptions";

const Reorder = ({
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
  const [editorLoaderState, setEditorLoaderState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(""))
    )
  );
  const [contentLoaderState, setContentLoaderState] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [disValue, setDisValue] = useState("");
  const [disName, setDisName] = useState("");
  const [isFreeShip, setIsFreeShip] = useState("");
  const [shipName, setShipName] = useState("");
  const [btnText, setBtnText] = useState("");
  const [btnAlign, setBtnAlign] = useState("");
  const [bgColor, setBgColor] = useState("#197bbd");
  const [isBgOpen, setIsBgOpen] = useState(false);
  const [color, setColor] = useState("#fff");
  const [isOpen, setIsOpen] = useState(false);

  const handleContentStateChange = (contentState) => {
    setContentState(draftToHtml(contentState));
  };

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handlePastedFiles = (files) => {};

  const handleContentLoaderStateChange = (contentState) => {
    setContentLoaderState(draftToHtml(contentState));
  };

  const handleEditorLoaderStateChange = (editorState) => {
    setEditorLoaderState(editorState);
  };

  const handleSelectDisChange = useCallback(
    (value) => setSelectedDiscount(value),
    []
  );

  const handleSelectBtnAlignChange = useCallback(
    (value) => setBtnAlign(value),
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
      setContentLoaderState(section_data?.loader_text);
      setEditorLoaderState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(section_data?.loader_text)
          )
        )
      );
      setSelectedDiscount(section_data?.selected_discount_type);
      setDisValue(section_data?.discount_value);
      setDisName(section_data?.discount_name);
      setIsFreeShip(section_data?.free_ship);
      setShipName(section_data?.free_ship_name);
      setBtnText(section_data?.btn_text);
      setBtnAlign(section_data?.btn_alignment);
      setBgColor(section_data?.bg_color);
      setColor(section_data?.color);
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
      loader_text: contentLoaderState,
      selected_discount_type: selectedDiscount,
      discount_value: disValue,
      discount_name: disName,
      free_ship: isFreeShip,
      free_ship_name: shipName,
      btn_text: btnText,
      btn_alignment: btnAlign,
      bg_color: bgColor,
      color: color,
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
    contentLoaderState,
    selectedDiscount,
    disValue,
    disName,
    isFreeShip,
    shipName,
    btnText,
    btnAlign,
    bgColor,
    color,
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
        <span>Reorder</span>
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
            <label>Loader text </label>
            <div className="mt-1">
              <Editor
                editorState={editorLoaderState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                onEditorStateChange={handleEditorLoaderStateChange}
                onContentStateChange={handleContentLoaderStateChange}
                toolbar={toolbar}
                spellCheck
                handlePastedText={handlePastedFiles}
              />
            </div>

            <div className="text-gray">
              Reorder might take time to load. Use this box to display a message
              while loading.
            </div>
          </div>

          <div className="mt-3">
            <Select
              label="Discount type"
              options={reorder_discount_type}
              onChange={handleSelectDisChange}
              value={selectedDiscount}
            />
          </div>

          <div className="mt-3">
            <TextField
              label="Discount value"
              type="number"
              value={disValue}
              onChange={(value) => setDisValue(value)}
              autoComplete="off"
              min={0}
              max={100}
              prefix={selectedDiscount !== "percentage" ? "Rs." : ""}
              suffix={selectedDiscount === "percentage" ? "%" : ""}
            />
          </div>
          <div className="mt-3">
            <TextField
              label="Discount name"
              type="text"
              value={disName}
              onChange={(value) => setDisName(value)}
              autoComplete="off"
            />
            <div className="mt-1 text-gray">
              You do not need to create this discount code, we create it
              automatically for you.
            </div>
          </div>

          <div className="mt-3">
            <Input
              type="checkbox"
              value={isFreeShip}
              onChange={() => setIsFreeShip(!isFreeShip)}
              checked={isFreeShip}
            />
            Also apply free shipping
          </div>

          {isFreeShip && (
            <div className="mt-3">
              <TextField
                label="Free ship name"
                type="text"
                value={shipName}
                onChange={(value) => setShipName(value)}
                autoComplete="off"
              />
              <div className="mt-1 text-gray">
                Will be displayed to the customer as the shipping method at
                checkout.
              </div>
            </div>
          )}

          <div className="mt-3">
            <TextField
              label="Button text"
              type="text"
              value={btnText}
              onChange={(value) => setBtnText(value)}
              autoComplete="off"
            />
          </div>

          <div className="mt-3">
            <Select
              label="Button alignment"
              options={btn_alignment}
              onChange={handleSelectBtnAlignChange}
              value={btnAlign}
            />
          </div>

          <div className="mt-3">
            <div className="swatch-color">
              <div
                className="swatch"
                style={{ backgroundColor: bgColor }}
                onClick={() => setIsBgOpen(!isBgOpen)}
              />
              <label className="px-3">Background color</label>
            </div>

            {isBgOpen && (
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

          <div className="mt-3 pb-4">
            <div className="swatch-color">
              <div
                className="swatch"
                style={{ backgroundColor: color }}
                onClick={() => setIsOpen(!isOpen)}
              />
              <label className="px-3">Color</label>
            </div>

            {isOpen && (
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

export default Reorder;
