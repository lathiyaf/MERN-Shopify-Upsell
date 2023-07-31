import React, { useCallback, useState } from "react";
import { MobileChevronMajor } from "@shopify/polaris-icons";
import { Button, Icon, Select } from "@shopify/polaris";
import { HexColorPicker } from "react-colorful";
import { useEffect } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { SECTION_DETAILS } from "../../Store/consts";
import { HeaderMajor } from "@shopify/polaris-icons";

const Header = ({
  section_data,
  setSection,
  setLabel,
  section_id,
  characters,
  updateCharacters,
  selectedImage,
  setSelectedImage,
  areas,
}) => {
  const data = useSelector((state) => state.section_data);
  const dispatch = useDispatch();
  const app = useAppBridge();
  const [plcText, setPlcText] = useState("");
  const [isOpen, toggle] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [color, setColor] = useState("");
  const [isColorOpen, toggleColor] = useState(false);
  const [btnAlign, setBtnAlign] = useState("");
  const [headFsSize, setHeadFsSize] = useState("");
  const [headStyle, setHeadStyle] = useState("");
  const [headTransform] = useState([
    {
      value: "",
      label: "None",
    },
    {
      value: "uppercase",
      label: "UPPERCASE",
    },
    {
      value: "capitalize",
      label: "Capitalize",
    },
    {
      value: "lowercase",
      label: "lowercase",
    },
  ]);
  const imgAlignment = [
    {
      value: "left",
      label: "Left",
    },
    {
      value: "center",
      label: "Center",
    },
    {
      value: "right",
      label: "Right",
    },
  ];
  const [selectHeadTran, setSelectHeadTran] = useState("");
  const [addLink, setAddLink] = useState([{ name: "", url: "" }]);

  const addFields = () => {
    setAddLink([...addLink, { name: "", url: "" }]);
  };

  const removeFields = (i) => {
    let newValue = [...addLink];
    newValue.splice(i, 1);
    setAddLink(newValue);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...addLink];
    list[index][name] = value;
    setAddLink(list);
  };

  useEffect(() => {
    if (Object.keys(section_data).length > 0) {
      dispatch({
        type: SECTION_DETAILS,
        payload: { ...section_data },
      });
      setPlcText(section_data?.placeholder_text);
      setBgColor(section_data?.bg_color);
      setColor(section_data?.color);
      setBtnAlign(section_data?.btn_alignment);
      setHeadFsSize(section_data?.head_fs_size);
      setHeadStyle(section_data?.head_style);
      setSelectHeadTran(section_data?.head_selected_text_transform);
      setAddLink(section_data?.links);
    }
  }, [section_data]);

  const updateSectionAPI = async () => {
    if (data?.section_id === section_data?.section_id.toString()) {
      let body = {
        img: selectedImage,
        placeholder_text: plcText,
        bg_color: bgColor,
        color: color,
        btn_alignment: btnAlign,
        head_fs_size: headFsSize,
        head_style: [...new Set(headStyle)],
        head_selected_text_transform: selectHeadTran,
        links: addLink,
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
        iconName: HeaderMajor,
        is_fa_icon: data?.is_fa_icon,
        is_disabled: data?.is_disabled,
        name: data?.section_name,
        area: data?.area,
        section_data: {
          img: selectedImage,
          placeholder_text: plcText,
          bg_color: bgColor,
          color: color,
          btn_alignment: btnAlign,
          head_fs_size: headFsSize,
          head_style: [...new Set(headStyle)],
          head_selected_text_transform: selectHeadTran,
          links: addLink,
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

  const handleSelectChange = useCallback((value) => setBtnAlign(value), []);

  const handleTextTransSelectChange = useCallback(
    (value) => setSelectHeadTran(value),
    []
  );

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      updateSectionAPI();
    }
  }, [
    plcText,
    bgColor,
    color,
    btnAlign,
    headFsSize,
    headStyle,
    selectHeadTran,
    addLink,
    selectedImage,
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
        <span>Header</span>
      </div>

      <div className="panel-body min-height">
        <label className="custom-label">Settings</label>
        <div className="form-group">
          <div className="mt-1">
            <h5>LOGO</h5>
          </div>
          <div className="mt-2">
            <label>Logo Image</label>
            {selectedImage !== "" ? (
              <>
                <div className="empty-coll">
                  <img src={selectedImage} alt="" height={120} width={120} />
                </div>
              </>
            ) : (
              <div className="empty-coll">
                <Button
                  onClick={() => {
                    setSection("section6");
                    setLabel("Images");
                  }}
                >
                  Select image
                </Button>
              </div>
            )}
          </div>

          <div className="mt-3">
            <label>Logo text</label>
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
            <div className="swatch-color">
              <div
                className="swatch"
                style={{ backgroundColor: bgColor }}
                onClick={() => toggle(!isOpen)}
              />
              <label className="px-3">Logo text color</label>
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
            <Select
              label="Logo alignment"
              options={imgAlignment}
              onChange={handleSelectChange}
              value={btnAlign}
            />
          </div>

          <hr />

          <div>
            <h5>LINKS</h5>
          </div>

          <div className="mt-3">
            <div className="swatch-color">
              <div
                className="swatch"
                style={{ backgroundColor: color }}
                onClick={() => toggleColor(!isColorOpen)}
              />
              <label className="px-3">Color</label>
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
            <label htmlFor="customRange1" className="form-label">
              Size
            </label>
            <input
              type="range"
              className="form-range"
              id="customRange1"
              value={headFsSize}
              min={10}
              max={32}
              onChange={({ target: { value: radius } }) => {
                setHeadFsSize(radius);
              }}
            ></input>
            <div>
              {headFsSize}
              {"px"}
            </div>
          </div>

          <div className="mt-3">
            <label>Style</label>
            <div className="mt-1">
              <label
                htmlFor="head_font"
                className={
                  headStyle && headStyle.includes("B")
                    ? "head_font head_active"
                    : "head_font"
                }
                onClick={() => {
                  setHeadStyle([...headStyle, "B"]);
                }}
              >
                <i className="fa fa-bold"></i>
              </label>
              <label
                htmlFor="head_font"
                className={
                  headStyle && headStyle.includes("I")
                    ? "head_font head_active"
                    : "head_font"
                }
                onClick={() => {
                  setHeadStyle([...headStyle, "I"]);
                }}
              >
                <i className="fa fa-italic"></i>
              </label>
            </div>
          </div>

          <div className="mt-3">
            <Select
              label="Text transform"
              options={headTransform}
              onChange={handleTextTransSelectChange}
              value={selectHeadTran}
            />
          </div>

          <div className="mt-3">
            {addLink &&
              addLink.length > 0 &&
              addLink.map((link, i) => {
                return (
                  <React.Fragment key={i}>
                    <div className="d-flex justify-content-between">
                      <label>LINK</label>
                      <a id="delete" onClick={removeFields}>
                        Delete
                      </a>
                    </div>

                    <div className="mt-3">
                      <label>Name</label>
                      <div className="Polaris-Connected mt-1">
                        <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                          <div className="Polaris-TextField Polaris-TextField--hasValue">
                            <input
                              className="Polaris-TextField__Input section_field_update live-update-text"
                              name="name"
                              type="text"
                              value={link.name}
                              onChange={(e) => handleInputChange(e, i)}
                              autoComplete="off"
                            />
                            <div className="Polaris-TextField__Backdrop"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <label>URL</label>
                      <div className="Polaris-Connected mt-1">
                        <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                          <div className="Polaris-TextField Polaris-TextField--hasValue">
                            <input
                              className="Polaris-TextField__Input section_field_update live-update-text"
                              name="url"
                              type="text"
                              value={link.url}
                              onChange={(e) => handleInputChange(e, i)}
                              autoComplete="off"
                            />
                            <div className="Polaris-TextField__Backdrop"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr />
                  </React.Fragment>
                );
              })}
          </div>

          <div className="mt-3 pb-4">
            <Button primary onClick={addFields}>
              {addLink?.length === 0 ? "Add link" : "Add more"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
