import React, { useCallback, useState } from "react";
import { MobileChevronMajor, ProductsMajor } from "@shopify/polaris-icons";
import { Icon, Checkbox } from "@shopify/polaris";
import { HexColorPicker } from "react-colorful";
import { useEffect } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { SECTION_DETAILS } from "../../Store/consts";

const ProductComment = ({
  section_data,
  setSection,
  setLabel,
  section_id,
  characters,
  updateCharacters,
  areas,
}) => {
  const data = useSelector((state) => state.section_data);
  const dispatch = useDispatch();
  const app = useAppBridge();
  const [isProductComment, setIsProductComment] = useState(false);
  const [plcText, setPlcText] = useState("");
  const [btnText, setBtnText] = useState("");
  const [isOpen, toggle] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [color, setColor] = useState("");
  const [isColorOpen, toggleColor] = useState(false);
  const [tyText, setTyText] = useState("");
  const [isTyOpen, setTyOpen] = useState(false);
  const [tyColor, setTyColor] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isErrOpen, setErrOpen] = useState(false);
  const [errColor, setErrColor] = useState("");

  useEffect(() => {
    if (Object.keys(section_data).length > 0) {
      dispatch({
        type: SECTION_DETAILS,
        payload: { ...section_data },
      });
      setIsProductComment(section_data?.is_product_comment);
      setPlcText(section_data?.placeholder_text);
      setBtnText(section_data?.btn_text);
      setBgColor(section_data?.bg_color);
      setColor(section_data?.color);
      setTyText(section_data?.thank_you_msg_txt);
      setTyColor(section_data?.thank_you_msg_txt_color);
      setErrMsg(section_data?.error_msg);
      setErrColor(section_data?.error_msg_color);
    }
  }, [section_data]);

  const updateSectionAPI = async () => {
    if (data?.section_id === section_data?.section_id.toString()) {
      let body = {
        is_product_comment: isProductComment,
        placeholder_text: plcText,
        btn_text: btnText,
        bg_color: bgColor,
        color: color,
        thank_you_msg_txt: tyText,
        thank_you_msg_txt_color: tyColor,
        error_msg: errMsg,
        error_msg_color: errColor,
        section_id: data?.section_id,
        section_name: data?.section_name,
      };
      dispatch({
        type: `${SECTION_DETAILS}`,
        payload: { ...data, ...body },
      });
      let result = characters;
      var item = {
        id: data?.section_id,
        iconName: ProductsMajor,
        is_fa_icon: data?.is_fa_icon,
        is_disabled: data?.is_disabled,
        name: data?.section_name,
        area: data?.area,
        section_data: {
          is_product_comment: isProductComment,
          placeholder_text: plcText,
          btn_text: btnText,
          bg_color: bgColor,
          color: color,
          thank_you_msg_txt: tyText,
          thank_you_msg_txt_color: tyColor,
          error_msg: errMsg,
          error_msg_color: errColor,
          section_id: data?.section_id,
          section_name: data?.section_name,
        },
      };

      characters.forEach((element, index) => {
        if (
          element.id === data?.section_id &&
          element.name === data?.section_name
        ) {
          characters[index] = item;
        }
      });

      updateCharacters(result);
      const token = await getSessionToken(app);
      axios({
        url: `https://${window.location.host}/api/thankyou/section?section_id=${data.section_id}&type=general`,
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
    isProductComment,
    plcText,
    btnText,
    bgColor,
    color,
    tyText,
    tyColor,
    errMsg,
    errColor,
    section_id,
    characters,
    section_data,
  ]);

  const handleChange = useCallback(
    (newChecked) => setIsProductComment(newChecked),
    []
  );

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
        <span>Product comments</span>
      </div>

      <div className="panel-body min-height">
        <label className="custom-label">Settings</label>
        <div className="form-group">
          <Checkbox
            label="Enable product comments"
            checked={isProductComment}
            onChange={handleChange}
          />

          <div className="mt-3">
            <label>Placeholder text</label>
            <div className="Polaris-Connected mt-1">
              <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                <div className="Polaris-TextField Polaris-TextField--hasValue">
                  <input
                    className="Polaris-TextField__Input section_field_update live-update-text"
                    name="btn_text"
                    type="text"
                    value={plcText}
                    onChange={(e) => setPlcText(e.target.value)}
                    autoComplete="off"
                  />
                  <div className="Polaris-TextField__Backdrop"></div>
                </div>
              </div>
            </div>
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

          <hr />

          <div>
            <h5>THANK YOU MESSAGE</h5>
          </div>

          <div className="mt-3">
            <label>Thank you message text</label>
            <div className="Polaris-Connected mt-1">
              <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                <div className="Polaris-TextField Polaris-TextField--hasValue">
                  <input
                    className="Polaris-TextField__Input section_field_update live-update-text"
                    name="btn_text"
                    type="text"
                    value={tyText}
                    onChange={(e) => setTyText(e.target.value)}
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
                onClick={() => setTyOpen(!isTyOpen)}
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

          <hr />

          <div>
            <h5>ERROR MESSAGE</h5>
          </div>

          <div className="mt-3">
            <label>Error message text</label>
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

          <div className="mt-3 pb-4">
            <div className="swatch-color">
              <div
                className="swatch"
                style={{ backgroundColor: errColor }}
                onClick={() => setErrOpen(!isErrOpen)}
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
        </div>
      </div>
    </>
  );
};

export default ProductComment;
