import React, { useState, useCallback, useEffect } from "react";
import {
  MobileChevronMajor,
  ViewMinor,
  ImageMajor,
} from "@shopify/polaris-icons";
import { Button, Icon, Select } from "@shopify/polaris";
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

const CollectionList = ({
  section_data,
  setSection,
  setLabel,
  section_id,
  GetSectionsAPI,
  characters,
  updateCharacters,
  addCollection,
  setAddCollection,
  setIndex,
  areas,
}) => {
  const data = useSelector((state) => state.section_data);
  const dispatch = useDispatch();
  const app = useAppBridge();
  const [headText, setHeadtext] = useState("");
  const [color, setColor] = useState("#000");
  const [isColorOpen, toggleColor] = useState(false);
  const [headFsSize, setHeadFsSize] = useState();
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
  const [titleColor, setTitleColor] = useState("#000");
  const [isTitleOpen, toggleTitleColor] = useState(false);
  const [collFsSize, setCollFsSize] = useState();
  const [selectColTran, setSelectColTran] = useState("");
  const [colRow, setColRow] = useState(2);
  const [open, setOpen] = useState("");
  const [headStyle, setHeadStyle] = useState([]);
  const [collStyle, setCollStyle] = useState([]);

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const addFields = () => {
    setAddCollection([...addCollection, { collection_name: {} }]);
  };

  const removeFields = (i) => {
    let newValue = [...addCollection];
    newValue.splice(i, 1);
    setAddCollection(newValue);
  };

  const handleSelectChange = useCallback(
    (value) => setSelectHeadTran(value),
    []
  );

  const handleCollTransformSelectChange = useCallback(
    (value) => setSelectColTran(value),
    []
  );

  useEffect(() => {
    if (Object.keys(section_data).length > 0) {
      dispatch({
        type: SECTION_DETAILS,
        payload: { ...section_data },
      });
      setHeadtext(section_data?.heading);
      setColor(section_data?.head_color);
      setHeadFsSize(section_data?.head_fs_size);
      setSelectHeadTran(section_data?.head_selected_text_transform);
      setTitleColor(section_data?.coll_title_color);
      setCollFsSize(section_data?.coll_fs_size);
      setSelectColTran(section_data?.coll_selected_text_transform);
      setColRow(section_data?.coll_per_row);
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
        heading: headText,
        head_color: color,
        head_fs_size: headFsSize,
        head_style: [...new Set(headStyle)],
        head_selected_text_transform: selectHeadTran,
        coll_title_color: titleColor,
        coll_fs_size: collFsSize,
        coll_style: [...new Set(collStyle)],
        coll_selected_text_transform: selectColTran,
        coll_per_row: colRow,
        content: addCollection,
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
          heading: headText,
          head_color: color,
          head_fs_size: headFsSize,
          head_style: [...new Set(headStyle)],
          head_selected_text_transform: selectHeadTran,
          coll_title_color: titleColor,
          coll_fs_size: collFsSize,
          coll_style: [...new Set(collStyle)],
          coll_selected_text_transform: selectColTran,
          coll_per_row: colRow,
          content: addCollection,
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
        heading: headText,
        head_color: color,
        head_fs_size: headFsSize,
        head_style: [...new Set(headStyle)],
        head_selected_text_transform: selectHeadTran,
        coll_title_color: titleColor,
        coll_fs_size: collFsSize,
        coll_style: [...new Set(collStyle)],
        coll_selected_text_transform: selectColTran,
        coll_per_row: colRow,
        content: addCollection,
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
          heading: headText,
          head_color: color,
          head_fs_size: headFsSize,
          head_style: [...new Set(headStyle)],
          head_selected_text_transform: selectHeadTran,
          coll_title_color: titleColor,
          coll_fs_size: collFsSize,
          coll_style: [...new Set(collStyle)],
          coll_selected_text_transform: selectColTran,
          coll_per_row: colRow,
          content: addCollection,
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
    headText,
    color,
    headFsSize,
    selectHeadTran,
    selectColTran,
    colRow,
    headStyle,
    collFsSize,
    addCollection,
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
        <span>Collection list</span>
      </div>

      <div className="panel-body min-height">
        <label className="custom-label">Settings</label>
        <div className="form-group">
          <div className="mt-3">
            <label>Heading</label>
            <div className="Polaris-Connected mt-1">
              <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                <div className="Polaris-TextField Polaris-TextField--hasValue">
                  <input
                    className="Polaris-TextField__Input section_field_update live-update-text"
                    name="btn_text"
                    type="text"
                    value={headText}
                    onChange={(e) => setHeadtext(e.target.value)}
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
                style={{ backgroundColor: color }}
                onClick={() => toggleColor(!isColorOpen)}
              />
              <label className="px-3">Heading color</label>
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
              Heading font size
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
            <div>{headFsSize}</div>
          </div>

          <div className="mt-3">
            <label>Heading style</label>
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
              label="Heading text transform"
              options={headTransform}
              onChange={handleSelectChange}
              value={selectHeadTran}
            />
          </div>

          <div className="mt-3">
            <div className="swatch-color">
              <div
                className="swatch"
                style={{ backgroundColor: titleColor }}
                onClick={() => toggleTitleColor(!isTitleOpen)}
              />
              <label className="px-3">Collection title color</label>
            </div>

            {isTitleOpen && (
              <div className="popover">
                <HexColorPicker
                  color={titleColor}
                  onChange={(e) => {
                    setTitleColor(e);
                  }}
                />
              </div>
            )}
          </div>

          <div className="mt-3">
            <label htmlFor="customRange1" className="form-label">
              Collection font size
            </label>
            <input
              type="range"
              className="form-range"
              id="customRange1"
              value={collFsSize}
              min={10}
              max={32}
              onChange={({ target: { value: radius } }) => {
                setCollFsSize(radius);
              }}
            ></input>
            <div>{collFsSize}</div>
          </div>

          <div className="mt-3">
            <label>Collection title style</label>
            <div className="mt-1">
              <label
                htmlFor="head_font"
                className={
                  collStyle && collStyle.includes("B")
                    ? "head_font head_active"
                    : "head_font"
                }
                onClick={() => {
                  setCollStyle([...collStyle, "B"]);
                }}
              >
                <i className="fa fa-bold"></i>
              </label>
              <label
                htmlFor="head_font"
                className={
                  collStyle && collStyle.includes("I")
                    ? "head_font head_active"
                    : "head_font"
                }
                onClick={() => {
                  setCollStyle([...collStyle, "I"]);
                }}
              >
                <i className="fa fa-italic"></i>
              </label>
            </div>
          </div>

          <div className="mt-3">
            <Select
              label="Collection title text transform"
              options={headTransform}
              onChange={handleCollTransformSelectChange}
              value={selectColTran}
            />
          </div>

          <div className="mt-3 pb-4">
            <label htmlFor="customRange1" className="form-label">
              Collection per row
            </label>
            <input
              type="range"
              className="form-range"
              id="customRange1"
              value={colRow}
              min={2}
              max={3}
              onChange={({ target: { value: radius } }) => {
                setColRow(radius);
              }}
            ></input>
            <div>{colRow}</div>
          </div>
        </div>

        <div className="add-coll">
          <div className="form-group">
            <h5 className="mt-2">Content</h5>
            <div>
              <ul className="nav custom-box-editor mt-3">
                {addCollection &&
                  addCollection.length > 0 &&
                  addCollection.map((coll, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Accordion open={open} toggle={toggle}>
                          <AccordionItem>
                            <AccordionHeader targetId={index.toString()}>
                              <span className="Polaris-Icon icon disply-unset editor-set-icon">
                                <i className="fa fa-list-alt"></i>
                              </span>
                              <span className="title text">
                                {coll?.collection_name &&
                                Object.keys(coll.collection_name).length > 0
                                  ? coll.collection_name?.title
                                  : "Collection"}
                              </span>
                            </AccordionHeader>
                            <AccordionBody accordionId={index.toString()}>
                              <div className="mt-2">
                                <label
                                  htmlFor="customRange1"
                                  className="form-label"
                                >
                                  {coll?.collection_name &&
                                  Object.keys(coll.collection_name).length > 0
                                    ? coll.collection_name?.title
                                    : "Collection"}
                                </label>

                                {coll?.collection_name &&
                                Object.keys(coll.collection_name).length > 0 ? (
                                  <>
                                    <div className="coll-container">
                                      <div>
                                        <span className="coll-content-img">
                                          {coll.collection_name?.image?.src ? (
                                            <img
                                              src={
                                                coll.collection_name?.image?.src
                                              }
                                              alt=""
                                              className="img-fluid"
                                            />
                                          ) : (
                                            <Icon
                                              source={ImageMajor}
                                              color="base"
                                            />
                                          )}
                                        </span>
                                        <span>
                                          {coll.collection_name?.title}
                                        </span>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <div className="empty-coll">
                                    <Button
                                      onClick={() => {
                                        setSection("section5");
                                        setLabel("Select collection");
                                        setIndex(index);
                                      }}
                                    >
                                      Select collection
                                    </Button>
                                  </div>
                                )}
                              </div>
                              <div
                                className="mt-2 remove-coll"
                                onClick={() => removeFields(index)}
                              >
                                <i className="fa fa-trash"></i> Remove content
                              </div>
                            </AccordionBody>
                          </AccordionItem>
                        </Accordion>
                      </React.Fragment>
                    );
                  })}

                <li className="list-group-item">
                  <div className="item" onClick={addFields}>
                    <span className="Polaris-Icon icon disply-unset editor-set-icon">
                      <i
                        className="fa fa-regular fa-plus-square icon"
                        style={{ color: "#5c6ac4" }}
                      ></i>
                    </span>
                    <span className="title text">Add collection</span>
                  </div>
                </li>
              </ul>
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

export default CollectionList;
