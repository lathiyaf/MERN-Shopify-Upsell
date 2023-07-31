import React, { useState, useCallback, useEffect } from "react";
import { MobileChevronMajor, ViewMinor } from "@shopify/polaris-icons";
import { Icon, Select, Button } from "@shopify/polaris";
import { HexColorPicker } from "react-colorful";
import { useSelector, useDispatch } from "react-redux";
import { SECTION_DELETE, SECTION_DETAILS } from "../../Store/consts";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";

const LinkList = ({
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
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [color, setColor] = useState("#000");
  const [headFsSize, setHeadFsSize] = useState(14);
  const [headStyle, setHeadStyle] = useState([]);
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
  const [selectHeadTran, setSelectHeadTran] = useState("");
  const [addLink, setAddLink] = useState([{ name: "", url: "" }]);

  const handleSelectChange = useCallback(
    (value) => setSelectHeadTran(value),
    []
  );

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
      setColor(section_data?.color);
      setHeadFsSize(section_data?.head_fs_size);
      setHeadStyle(section_data?.head_style);
      setSelectHeadTran(section_data?.head_selected_text_transform);
      setAddLink(section_data?.links);
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
        color: color,
        head_fs_size: headFsSize,
        head_style: headStyle,
        head_selected_text_transform: selectHeadTran,
        links: addLink,
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
          color: color,
          head_fs_size: headFsSize,
          head_style: headStyle,
          head_selected_text_transform: selectHeadTran,
          links: addLink,
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
        color: color,
        head_fs_size: headFsSize,
        head_style: headStyle,
        head_selected_text_transform: selectHeadTran,
        links: addLink,
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
          color: color,
          head_fs_size: headFsSize,
          head_style: headStyle,
          head_selected_text_transform: selectHeadTran,
          links: addLink,
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
    color,
    headFsSize,
    headStyle,
    selectHeadTran,
    addLink,
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
        <span>Link list</span>
      </div>
      <div className="panel-body min-height">
        <label className="custom-label">Settings</label>
        <div className="form-group">
          <div className="mt-1">
            <div className="swatch-color">
              <div
                className="swatch"
                style={{ backgroundColor: color }}
                onClick={() => setIsColorOpen(!isColorOpen)}
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
              onChange={handleSelectChange}
              value={selectHeadTran}
            />
          </div>

          <hr />

          <div>
            <h5>LINKS</h5>
          </div>

          <div className="mt-2">
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
              Add more
            </Button>
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

export default LinkList;
