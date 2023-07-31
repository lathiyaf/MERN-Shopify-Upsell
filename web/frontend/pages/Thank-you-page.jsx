import React, { useEffect, useState } from "react";
import "./product.css";
import {
  SidebarLeftMajor,
  SidebarRightMajor,
  SettingsMajor,
  QuestionMarkMajor,
  ReceiptMajor,
  CancelMajor,
  DragHandleMinor,
  ImageMajor,
  CircleTickOutlineMinor,
  LegalMajor,
  HeaderMajor,
  ProductsMajor,
  WandMajor,
} from "@shopify/polaris-icons";
import {
  Badge,
  Button,
  ButtonGroup,
  FullscreenBar,
  Icon,
  TextContainer,
} from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Fullscreen } from "@shopify/app-bridge/actions";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { sectionData } from "./sections";
import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";
import parse from "html-react-parser";
import DonateForUkraine from "./ThankYouPageSection/DonateForUkraine";
import RenderDonateUkraine from "./RenderComponent/RenderDonateUkraine";
import { SECTION_DELETE, SECTION_DETAILS } from "../Store/consts";
import { useDispatch, useSelector } from "react-redux";
import RenderOrderConfirm from "./RenderComponent/RenderOrderConfirm";
import RenderCustomerInfo from "./RenderComponent/RenderCustomerInfo";
import $ from "jquery";
import Spinner from "../common/CustomLoader/loader";
import BirthdayCollector from "./ThankYouPageSection/BirthdayCollector";
import RenderBirthdayCollector from "./RenderComponent/RenderBirthdayCollector";
import CallToAction from "./ThankYouPageSection/CallToAction";
import RenderCallToAction from "./RenderComponent/RenderCallToAction";
import CollectionList from "./ThankYouPageSection/CollectionList";
import RenderCollectionList from "./RenderComponent/RenderCollectionList";
import { useRef } from "react";
import CustomHtml from "./ThankYouPageSection/CustomHtml";
import RenderCustomHtml from "./RenderComponent/RenderCustomHtml";
import Discount from "./ThankYouPageSection/Discount";
import RenderDiscount from "./RenderComponent/RenderDiscount";
import FreeText from "./ThankYouPageSection/FreeText";
import RenderFreeText from "./RenderComponent/RenderFreeText";
import ImageText from "./ThankYouPageSection/ImageText";
import RenderImageText from "./RenderComponent/RenderImageText";
import LinkList from "./ThankYouPageSection/LinkList";
import RenderLinkList from "./RenderComponent/RenderLinkList";
import Survey from "./ThankYouPageSection/Survey";
import RenderSurvey from "./RenderComponent/RenderSurvey";
import ProductRecom from "./ThankYouPageSection/ProductRecom";
import RenderProductRecom from "./RenderComponent/RenderProductRecom";
import ProductUpsell from "./ThankYouPageSection/ProductUpsell";
import RenderProductUpsell from "./RenderComponent/RenderProductUpsell";
import Reorder from "./ThankYouPageSection/Reorder";
import RenderReorder from "./RenderComponent/RenderReorder";
import SocialFollow from "./ThankYouPageSection/SocialFollow";
import RenderSocialFollow from "./RenderComponent/RenderSocialFollow";
import SocialMediaLink from "./ThankYouPageSection/SocialMediaLink";
import RenderSocialMediaLink from "./RenderComponent/RenderSocialMediaLink";
import SocialSharing from "./ThankYouPageSection/SocialSharing";
import RenderSocialSharing from "./RenderComponent/RenderSocialSharing";
import Video from "./ThankYouPageSection/Video";
import RenderVideo from "./RenderComponent/RenderVideo";
import Header from "./ThankYouPageSection/Header";
import RenderHeader from "./RenderComponent/RenderHeader";
import OrderTracking from "./ThankYouPageSection/OrderTracking";
import ProductComment from "./ThankYouPageSection/ProductComment";
import RenderProductComment from "./RenderComponent/RenderProductComment";
import MagicDesinger from "./ThankYouPageSection/MagicDesinger";

const ThankYouPage = () => {
  const app = useAppBridge();
  const fullscreen = Fullscreen.create(app);
  const [label, setLabel] = useState("Conversion Master");
  const [id, setId] = useState("");
  const [section, setSection] = useState("section1");
  const [section_id, setSectionId] = useState("");
  const [selectedSection, setSelectedSection] = useState();
  const [sectionSelectedData, setSectionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [collectionData, setCollectionData] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.section_data);
  const [addCollection, setAddCollection] = useState(
    Object.keys(data).length > 0 ? data && data?.content : []
  );
  const [index, setIndex] = useState();
  const sectionRef = useRef();
  const imgRef = useRef();
  const [selectedImage, setSelectedImage] = useState("");
  const [areas, setAreas] = useState("left");
  const [leftArea, setLeftArea] = useState([]);
  const [rightArea, setRightArea] = useState([]);
  const [generalSett, setGeneralSett] = useState([]);
  const [orderTrack, setOrderTrack] = useState([]);

  useEffect(() => {
    fullscreen.dispatch(Fullscreen.Action.ENTER);
  }, []);

  let finalSpaceCharacters = [
    {
      id: "1",
      name: "Order confirmed",
      iconName: ReceiptMajor,
      is_fa_icon: false,
      is_disabled: true,
      area: "left",
    },
    {
      id: "2",
      name: "Customer information",
      iconName: <i className="fa fa-user icon"></i>,
      is_fa_icon: true,
      is_disabled: true,
      area: "left",
    },
    {
      id: "20",
      name: "Order summary",
      iconName: LegalMajor,
      is_fa_icon: false,
      is_disabled: true,
      area: "right",
    },
    {
      id: "21",
      name: "Header",
      iconName: HeaderMajor,
      is_fa_icon: false,
      is_disabled: false,
      area: "general",
      section_data: {
        section_id: 21,
        section_name: "Header",
        img: "",
        placeholder_text: "",
        bg_color: "#ee0000",
        btn_alignment: "left",
        color: "#000",
        head_fs_size: "32",
        head_style: ["B", "I"],
        head_selected_text_transform: "none",
        links: [{ name: "", url: "" }],
        area: "general",
      },
    },
    {
      id: "22",
      name: "Order tracking",
      iconName: <i className="fas fa-shipping-fast"></i>,
      is_fa_icon: true,
      is_disabled: false,
      area: "general",
      section_data: {
        section_id: 22,
        section_name: "Order tracking",
        area: "general",
        is_order_track: true,
        btn_text: "Track",
        bg_color: "#197BBD",
        color: "#fff",
      },
    },
    {
      id: "23",
      name: "Product comments",
      iconName: ProductsMajor,
      is_fa_icon: false,
      is_disabled: false,
      area: "general",
      section_data: {
        section_id: 23,
        section_name: "Product comments",
        area: "general",
        is_product_comment: false,
        placeholder_text: "Why did you buy this product?",
        btn_text: "Submit",
        bg_color: "#197BBD",
        color: "#fff",
        thank_you_msg_txt: "Thank you for your comment",
        thank_you_msg_txt_color: "#fff",
        error_msg: "Comment is required.",
        error_msg_color: "#e32c2b",
      },
    },
    {
      id: "24",
      name: "Magic designer",
      iconName: WandMajor,
      is_fa_icon: false,
      is_disabled: false,
      area: "general",
      section_data: {
        section_id: 24,
        section_name: "Magic designer",
        area: "general",
        is_magic: false,
      },
    },
  ];

  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateCharacters(items);
  }

  //! Add Section API
  const AddSectionAPI = async (section_id) => {
    setIsLoading(true);
    const [result] = sectionData.filter(
      (item) => item.section_id === section_id
    );

    let data = {
      ...result,
      template_id: "0c005e69-17a2-4062-ad6a-c7f0deddd07a",
      area: areas,
    };

    const token = await getSessionToken(app);
    axios({
      url: `https://${window.location.host}/api/thankyou/section`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    })
      .then((res) => {
        const data = res && res.data && res.data.data;
        dispatch({
          type: SECTION_DETAILS,
          payload: { ...data?.section_data },
        });
        setSectionId(data?.section_data?.row_section_id);
        GetSectionsAPI();
        setId("");
        updateThankyouPage();
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  //! Get Selected Sections
  const GetSectionsAPI = async () => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    axios({
      url: `https://${window.location.host}/api/thankyou/section?template_id=0c005e69-17a2-4062-ad6a-c7f0deddd07a`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data.data;
        let arr = [...finalSpaceCharacters];
        if (data.length > 0) {
          data.map((item) => {
            let obj = {
              id: item.row_section_id.toString(),
              name: item.section_name,
              iconName: item.iconName,
              is_fa_icon: item.is_fa_icon,
              is_disabled: item.is_disabled,
              section_data: item,
              area: item.area ? item.area : areas,
            };
            arr.push(obj);
          });
          const uniqueAddresses = Array.from(new Set(arr.map((a) => a.id))).map(
            (id) => {
              return arr.find((a) => a.id === id);
            }
          );
          let filteredData = [];
          let names = [];

          uniqueAddresses.forEach((obj) => {
            if (obj.area === "general") {
              if (!names.includes(obj.name)) {
                names.push(obj.name);
                filteredData.push(obj);
              }
            } else {
              filteredData.push(obj);
            }
          });

          setSectionData(uniqueAddresses);
          updateCharacters(filteredData);
          setIsLoading(false);
        } else {
          setSectionData([]);
          updateCharacters(finalSpaceCharacters);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  //! Get Thank you page by id
  const GetThankYouPageById = async () => {
    const token = await getSessionToken(app);
    axios({
      url: `https://${window.location.host}/api/thankyou?template_id=0c005e69-17a2-4062-ad6a-c7f0deddd07a`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data.data;
        let arr = [];
        if (sectionSelectedData.length === data.left_section_data.length) {
          data &&
            data.left_section_data.map((section) => {
              let obj = {
                id: section.id,
                name: section.name,
              };

              sectionSelectedData.map((item) => {
                if (item.id === section.id) {
                  obj = {
                    ...obj,
                    iconName: item.iconName,
                    is_fa_icon: item.is_fa_icon,
                    is_disabled: item.is_disabled,
                    area: item.area ? item.area : areas,
                    section_data: item.section_data,
                  };
                }
              });
              arr.push(obj);
            });
          let filteredData = [];
          let names = [];

          arr.forEach((obj) => {
            if (obj.area === "general") {
              if (!names.includes(obj.name)) {
                names.push(obj.name);
                filteredData.push(obj);
              }
            } else {
              filteredData.push(obj);
            }
          });
          updateCharacters(filteredData);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    GetSectionsAPI();
    GetAllCollections();
  }, []);

  useEffect(() => {
    GetThankYouPageById();
  }, [sectionSelectedData]);

  //! Update Thank you page
  const updateThankyouPage = async () => {
    let order_confirm_after_html = [];
    let order_confirm_before_html = [];
    let customer_information_after_html = [];

    $(document).ready(function () {
      $("#1").each(function () {
        const nextData = $(this).nextUntil("#2");
        nextData.each(function (index) {
          order_confirm_after_html.push($(this)[0].outerHTML);
        });
      });
      $("#header").each(function () {
        const nextData = $(this).nextUntil("#1");
        nextData.each(function (index) {
          order_confirm_before_html.push($(this)[0].outerHTML);
        });
      });
      $("#2").each(function () {
        const nextData = $(this).nextUntil("#footer");
        nextData.each(function (index) {
          customer_information_after_html.push($(this)[0].outerHTML);
        });
      });
    });

    let leftArr = [];
    characters.map((item) => {
      let leftObj = {
        id: item.id,
        name: item.name,
      };
      leftArr.push(leftObj);
    });

    const token = await getSessionToken(app);
    let data = {
      left_section_data: leftArr,
      order_confirm_before_html,
      order_confirm_after_html,
      customer_information_after_html,
    };
    axios({
      url: `https://${window.location.host}/api/thankyou?template_id=0c005e69-17a2-4062-ad6a-c7f0deddd07a`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    })
      .then((res) => {})
      .catch((err) => {});
  };

  //! Get All Collection API
  const GetAllCollections = async () => {
    const token = await getSessionToken(app);
    axios({
      url: `https://${window.location.host}/api/funnel/collection`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data.data;
        setCollectionData(data);
      })
      .catch((err) => {});
  };

  const handleInputChange = (index, collection) => {
    const list = [...addCollection];
    list[index]["collection_name"] = collection;
    setAddCollection(list);
  };

  const fileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    setLeftArea(characters.filter((item) => item.area === "left"));
    setRightArea(characters.filter((item) => item.area === "right"));
    setGeneralSett(characters.filter((item) => item.area === "general"));
    setOrderTrack(
      characters.filter(
        (item) => item.area === "general" && item.name === "Order tracking"
      )
    );
  }, [characters]);

  //! Get Section By Id
  const GetSectionById = async (section) => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    axios({
      url: `https://${window.location.host}/api/thankyou/section/details?section_id=${section.section_id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data.data;
        dispatch({
          type: SECTION_DETAILS,
          payload: data,
        });
        let filteredData = [];
        let names = [];

        characters.forEach((obj) => {
          if (obj.area === "general") {
            if (!names.includes(obj.name)) {
              names.push(obj.name);
              filteredData.push(obj);
            }
          } else {
            filteredData.push(obj);
          }
        });

        filteredData = filteredData.map((item) => {
          if (item.name === selectedSection?.section_name) {
            item.section_data = { ...data };
            item.id = item.id;
            return item;
          }
          if (item?.area === "general" && item.name === data?.section_name) {
            item.section_data = { ...data };
            item.id = item.id;
            return item;
          }
          return item;
        });
        updateCharacters(result);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (selectedSection?.area === "general") {
      GetSectionById(selectedSection);
    }
  }, [selectedSection]);

  useEffect(async () => {
    await Promise.all([
      characters.map(async (char) => {
        if (char.area === "general") {
          await GetSectionById(char.section_data);
        }
      }),
    ]);
  }, []);

  return (
    <>
      <FullscreenBar
        onAction={() => {
          if (section === "section3") {
            setSection("section2");
            setLabel(`${areas} Area`);
          }
          if (section === "section2") {
            setSection("section1");
            setLabel(`Conversion Master`);
          }
        }}
      >
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          <div style={{ marginLeft: "1rem", flexGrow: 1 }}>
            <TextContainer variant="headingLg" as="p">
              {label}
            </TextContainer>
          </div>
          <div className="border-left">
            <ButtonGroup>
              <div className="mx-3">
                <Badge status="info">Draft</Badge>
              </div>
              <Button primary onClick={() => updateThankyouPage()}>
                Save
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </FullscreenBar>
      {isLoading && <Spinner />}
      <div className="main_wrapp mt-3">
        <div className="leftpanel">
          {section === "section1" && (
            <>
              <ul className="nav custom-box-editor">
                <li
                  className="list-group-item"
                  onClick={() => {
                    setSection("section2");
                    setAreas("left");
                    setLabel(`Left Area`);
                  }}
                >
                  <div className="item">
                    <span className="Polaris-Icon icon disply-unset editor-set-icon">
                      <Icon source={SidebarRightMajor} color="base" />
                    </span>
                    <span className="title">Left Area</span>
                  </div>
                </li>
              </ul>
              <ul className="nav custom-box-editor">
                <li
                  className="list-group-item"
                  onClick={() => {
                    setSection("section2");
                    setAreas("right");
                    setLabel(`Right Area`);
                  }}
                >
                  <div className="item">
                    <span className="Polaris-Icon icon disply-unset editor-set-icon">
                      <Icon source={SidebarLeftMajor} color="base" />
                    </span>
                    <span className="title">Right Area</span>
                  </div>
                </li>
              </ul>
              <div className="hr mt-3">
                <hr />
              </div>
              <ul className="nav custom-box-editor">
                <li
                  className="list-group-item"
                  onClick={() => {
                    setSection("section2");
                    setAreas("general");
                    setLabel("General Settings");
                  }}
                >
                  <div className="item">
                    <span className="Polaris-Icon icon disply-unset editor-set-icon">
                      <Icon source={SettingsMajor} color="base" />
                    </span>
                    <span className="title">General Settings</span>
                  </div>
                </li>
              </ul>
            </>
          )}

          {section === "section2" && (
            <>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="nav custom-box-editor">
                  {(provided) => (
                    <ul
                      className="nav custom-box-editor"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      id="draggable"
                    >
                      {characters.map(
                        (
                          {
                            id,
                            name,
                            iconName,
                            is_fa_icon,
                            is_disabled,
                            area,
                            section_data,
                          },
                          index
                        ) => {
                          return (
                            <React.Fragment>
                              {areas === area && (
                                <Draggable
                                  key={id}
                                  draggableId={id}
                                  index={index}
                                  isDragDisabled={is_disabled}
                                >
                                  {(provided) => (
                                    <li
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      className={
                                        is_disabled
                                          ? "list-group-item-disabled list-group-item"
                                          : "list-group-item"
                                      }
                                      onClick={() => {
                                        setSection("section4");
                                        if (area === "general") {
                                          setSelectedSection(section_data);
                                        } else {
                                          setSelectedSection(section_data);
                                          dispatch({
                                            type: `${SECTION_DETAILS}`,
                                            payload: {
                                              ...section_data,
                                            },
                                          });
                                        }

                                        sectionRef?.current?.scrollIntoView({
                                          behavior: "smooth",
                                        });
                                      }}
                                    >
                                      <div className="item">
                                        <span className="Polaris-Icon icon disply-unset editor-set-icon">
                                          {is_fa_icon ? (
                                            typeof iconName === "string" ? (
                                              parse(iconName)
                                            ) : (
                                              iconName
                                            )
                                          ) : (
                                            <Icon
                                              source={iconName}
                                              color="base"
                                            />
                                          )}
                                        </span>
                                        <span className="title">{name}</span>
                                        <div {...provided.dragHandleProps}>
                                          {area === "general" ||
                                            (!is_disabled && (
                                              <Icon
                                                source={DragHandleMinor}
                                                color="base"
                                              />
                                            ))}
                                        </div>
                                      </div>
                                    </li>
                                  )}
                                </Draggable>
                              )}
                            </React.Fragment>
                          );
                        }
                      )}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>

              {areas !== "general" && (
                <ul className="nav custom-box-editor mt-3">
                  <li
                    className="list-group-item"
                    onClick={() => {
                      setSection("section3");
                      setLabel("Add section");
                    }}
                  >
                    <div className="item">
                      <span className="Polaris-Icon icon disply-unset editor-set-icon">
                        <i
                          className="fa fa-regular fa-plus-square icon"
                          style={{ color: "#5c6ac4" }}
                        ></i>
                      </span>
                      <span className="title text">Add Section</span>
                    </div>
                  </li>
                </ul>
              )}
            </>
          )}

          {section === "section3" && (
            <>
              <div className="select-prd-sec">
                <div className="select-prd">
                  <span className="title">Add section</span>
                  <div
                    className="btn-close"
                    onClick={() => {
                      setSection("section2");
                      setLabel(`${areas} Area`);
                      setId("");
                    }}
                  >
                    <Icon source={CancelMajor} color="base" />
                  </div>
                </div>
              </div>
              <div className="add-section-body">
                <ul className="list-group" id="add-section">
                  {sectionData.map((section, index) => {
                    return (
                      <React.Fragment>
                        <li
                          className="list-group-item"
                          onClick={(e) => {
                            setId(section.section_id);
                          }}
                          key={index}
                        >
                          <div
                            className={
                              section.section_id === id
                                ? "add-section-div add-section-div-active"
                                : "add-section-div"
                            }
                          >
                            <span>{section.section_name}</span>
                            {section.section_id === id && (
                              <a
                                href="#"
                                className="confirm-section-add Polaris-Button Polaris-Button--primary"
                                onClick={() => {
                                  dispatch({
                                    type: SECTION_DELETE,
                                    payload: {},
                                  });
                                  setSection("section4");
                                  AddSectionAPI(section.section_id);
                                  setSelectedSection(section);
                                  sectionRef.current.scrollIntoView({
                                    behavior: "smooth",
                                  });
                                }}
                              >
                                Add
                              </a>
                            )}
                          </div>
                        </li>
                      </React.Fragment>
                    );
                  })}
                </ul>
              </div>
            </>
          )}

          {section === "section4" && (
            <>
              <div className="border-round">
                <div className="select-prd-sec">
                  {selectedSection?.section_name === "Header" && (
                    <Header
                      section_data={selectedSection}
                      setSection={setSection}
                      setLabel={setLabel}
                      section_id={section_id}
                      characters={characters}
                      updateCharacters={updateCharacters}
                      selectedImage={selectedImage}
                      setSelectedImage={setSelectedImage}
                      areas={areas}
                    />
                  )}
                  {selectedSection?.section_name === "Order tracking" && (
                    <OrderTracking
                      section_data={selectedSection}
                      setSection={setSection}
                      setLabel={setLabel}
                      section_id={section_id}
                      characters={characters}
                      updateCharacters={updateCharacters}
                      areas={areas}
                    />
                  )}
                  {selectedSection?.section_name === "Magic designer" && (
                    <MagicDesinger
                      section_data={selectedSection}
                      setSection={setSection}
                      setLabel={setLabel}
                      section_id={section_id}
                      GetSectionsAPI={GetSectionsAPI}
                      characters={characters}
                      updateCharacters={updateCharacters}
                      areas={areas}
                    />
                  )}
                  {selectedSection?.section_name === "Product comments" && (
                    <ProductComment
                      section_data={selectedSection}
                      setSection={setSection}
                      setLabel={setLabel}
                      section_id={section_id}
                      characters={characters}
                      updateCharacters={updateCharacters}
                      areas={areas}
                    />
                  )}
                  {selectedSection?.section_name === "Donate for Ukraine" && (
                    <DonateForUkraine
                      section_data={selectedSection}
                      setSection={setSection}
                      setLabel={setLabel}
                      section_id={section_id}
                      GetSectionsAPI={GetSectionsAPI}
                      characters={characters}
                      updateCharacters={updateCharacters}
                      areas={areas}
                    />
                  )}
                  {selectedSection?.section_name ===
                    "Birthday collector widget" && (
                    <BirthdayCollector
                      section_data={selectedSection}
                      setSection={setSection}
                      setLabel={setLabel}
                      section_id={section_id}
                      GetSectionsAPI={GetSectionsAPI}
                      characters={characters}
                      updateCharacters={updateCharacters}
                      areas={areas}
                    />
                  )}
                  {selectedSection?.section_name === "Call to action" && (
                    <CallToAction
                      section_data={selectedSection}
                      setSection={setSection}
                      setLabel={setLabel}
                      section_id={section_id}
                      GetSectionsAPI={GetSectionsAPI}
                      characters={characters}
                      updateCharacters={updateCharacters}
                      areas={areas}
                    />
                  )}
                  {selectedSection?.section_name === "Collection list" && (
                    <CollectionList
                      section_data={selectedSection}
                      setSection={setSection}
                      setLabel={setLabel}
                      section_id={section_id}
                      GetSectionsAPI={GetSectionsAPI}
                      characters={characters}
                      updateCharacters={updateCharacters}
                      addCollection={addCollection}
                      setAddCollection={setAddCollection}
                      setIndex={setIndex}
                      areas={areas}
                    />
                  )}
                  {selectedSection?.section_name === "Custom HTML" && (
                    <CustomHtml
                      section_data={selectedSection}
                      setSection={setSection}
                      setLabel={setLabel}
                      section_id={section_id}
                      GetSectionsAPI={GetSectionsAPI}
                      characters={characters}
                      updateCharacters={updateCharacters}
                      areas={areas}
                    />
                  )}
                  {selectedSection?.section_name === "Discount" && (
                    <Discount
                      section_data={selectedSection}
                      setSection={setSection}
                      setLabel={setLabel}
                      section_id={section_id}
                      GetSectionsAPI={GetSectionsAPI}
                      characters={characters}
                      updateCharacters={updateCharacters}
                      areas={areas}
                    />
                  )}
                  {selectedSection?.section_name === "Free text" && (
                    <FreeText
                      section_data={selectedSection}
                      setSection={setSection}
                      setLabel={setLabel}
                      section_id={section_id}
                      GetSectionsAPI={GetSectionsAPI}
                      characters={characters}
                      updateCharacters={updateCharacters}
                      areas={areas}
                    />
                  )}
                  {selectedSection?.section_name === "Image with text" && (
                    <ImageText
                      section_data={selectedSection}
                      setSection={setSection}
                      setLabel={setLabel}
                      section_id={section_id}
                      GetSectionsAPI={GetSectionsAPI}
                      characters={characters}
                      updateCharacters={updateCharacters}
                      selectedImage={selectedImage}
                      setSelectedImage={setSelectedImage}
                      areas={areas}
                    />
                  )}
                  {selectedSection?.section_name === "Link list" && (
                    <LinkList
                      section_data={selectedSection}
                      setSection={setSection}
                      setLabel={setLabel}
                      section_id={section_id}
                      GetSectionsAPI={GetSectionsAPI}
                      characters={characters}
                      updateCharacters={updateCharacters}
                      areas={areas}
                    />
                  )}
                  {selectedSection?.section_name ===
                    "Post purchase surveys" && (
                    <Survey
                      section_data={selectedSection}
                      setSection={setSection}
                      setLabel={setLabel}
                      section_id={section_id}
                      GetSectionsAPI={GetSectionsAPI}
                      characters={characters}
                      updateCharacters={updateCharacters}
                      areas={areas}
                    />
                  )}
                  {selectedSection?.section_name === "Reorder" && (
                    <Reorder
                      section_data={selectedSection}
                      setSection={setSection}
                      setLabel={setLabel}
                      section_id={section_id}
                      GetSectionsAPI={GetSectionsAPI}
                      characters={characters}
                      updateCharacters={updateCharacters}
                      areas={areas}
                    />
                  )}
                  {selectedSection?.section_name ===
                    "Social follow buttons" && (
                    <SocialFollow
                      section_data={selectedSection}
                      setSection={setSection}
                      setLabel={setLabel}
                      section_id={section_id}
                      GetSectionsAPI={GetSectionsAPI}
                      characters={characters}
                      updateCharacters={updateCharacters}
                      areas={areas}
                    />
                  )}
                  {selectedSection?.section_name === "Social media links" && (
                    <SocialMediaLink
                      section_data={selectedSection}
                      setSection={setSection}
                      setLabel={setLabel}
                      section_id={section_id}
                      GetSectionsAPI={GetSectionsAPI}
                      characters={characters}
                      updateCharacters={updateCharacters}
                      areas={areas}
                    />
                  )}
                  {selectedSection?.section_name === "Social sharing" && (
                    <SocialSharing
                      section_data={selectedSection}
                      setSection={setSection}
                      setLabel={setLabel}
                      section_id={section_id}
                      GetSectionsAPI={GetSectionsAPI}
                      characters={characters}
                      updateCharacters={updateCharacters}
                      areas={areas}
                    />
                  )}
                  {selectedSection?.section_name === "Video" && (
                    <Video
                      section_data={selectedSection}
                      setSection={setSection}
                      setLabel={setLabel}
                      section_id={section_id}
                      GetSectionsAPI={GetSectionsAPI}
                      characters={characters}
                      updateCharacters={updateCharacters}
                      areas={areas}
                    />
                  )}
                </div>

                {selectedSection?.section_name ===
                  "Product recommendations" && (
                  <ProductRecom
                    section_data={selectedSection}
                    setSection={setSection}
                    setLabel={setLabel}
                    section_id={section_id}
                    GetSectionsAPI={GetSectionsAPI}
                    characters={characters}
                    updateCharacters={updateCharacters}
                    areas={areas}
                  />
                )}
                {selectedSection?.section_name === "Product upsell" && (
                  <ProductUpsell
                    section_data={selectedSection}
                    setSection={setSection}
                    setLabel={setLabel}
                    section_id={section_id}
                    GetSectionsAPI={GetSectionsAPI}
                    characters={characters}
                    updateCharacters={updateCharacters}
                    areas={areas}
                  />
                )}
              </div>
            </>
          )}

          {section === "section5" && (
            <>
              <div className="coll-select-prd-sec">
                <div className="select-prd">
                  <span className="title">Select collection</span>
                  <div
                    className="btn-close"
                    onClick={() => {
                      setSection("section4");
                      sectionRef.current.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    <Icon source={CancelMajor} color="base" />
                  </div>
                </div>
              </div>
              <ul className="list-group" id="select-coll">
                <li
                  className="list-group-item"
                  onClick={() => {
                    window.open(
                      "https://admin.shopify.com/store/crawlapps-trainee/collections/new"
                    );
                  }}
                >
                  <div className="item">
                    <span className="Polaris-Icon icon disply-unset editor-set-icon">
                      <i
                        className="fa fa-regular fa-plus-square icon"
                        style={{ color: "#5c6ac4" }}
                      ></i>
                    </span>
                    <span className="title text">Create collection</span>
                  </div>
                </li>
                {collectionData &&
                  collectionData.length > 0 &&
                  collectionData.map((collection, i) => {
                    return (
                      <React.Fragment>
                        <li
                          className="list-group-item collection"
                          onClick={() => {
                            setSection("section4");
                            handleInputChange(index, collection);
                            sectionRef.current.scrollIntoView({
                              behavior: "smooth",
                            });
                          }}
                          id="collection"
                        >
                          <div className="item">
                            <span className="Polaris-Icon icon disply-unset editor-set-icon">
                              {collection?.image?.src ? (
                                <img
                                  src={collection?.image?.src}
                                  alt=""
                                  className="img-fluid coll-img"
                                />
                              ) : (
                                <Icon source={ImageMajor} color="base" />
                              )}
                            </span>
                            <span className="coll-title">
                              {collection.title}
                            </span>
                            <span className="Polaris-Icon coll-info">
                              <Icon
                                source={CircleTickOutlineMinor}
                                color="base"
                              />
                            </span>
                          </div>
                        </li>
                      </React.Fragment>
                    );
                  })}
              </ul>
            </>
          )}

          {section === "section6" && (
            <>
              <div className="border-round">
                <div className="select-prd-sec">
                  <div className="coll-select-prd-sec">
                    <div className="select-prd">
                      <span className="title">Images</span>
                      <div
                        className="btn-close"
                        onClick={() => {
                          setSection("section4");
                          sectionRef.current.scrollIntoView({
                            behavior: "smooth",
                          });
                        }}
                      >
                        <Icon source={CancelMajor} color="base" />
                      </div>
                    </div>
                  </div>
                  <div className="panel-body min-height">
                    <label className="upload-img-label">
                      <div
                        className="upload-img-content"
                        onClick={imgRef?.current?.click()}
                      >
                        <i className="ri-upload-cloud-2-line ri-5x"></i>
                        <span className="upload-img-text">Upload an image</span>
                      </div>
                      <input
                        type="file"
                        name="upload-img"
                        id="upload-img"
                        accept="image/*"
                        hidden
                        onChange={(event) => fileChange(event)}
                        ref={imgRef}
                      ></input>
                    </label>

                    {selectedImage !== "" && (
                      <div
                        className="thumbnail mx-3"
                        onClick={() => {
                          setSection("section4");
                        }}
                      >
                        <img
                          src={selectedImage}
                          alt=""
                          height={120}
                          width={120}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="rightpanel">
          <div className="content">
            <div className="left-area" id="left-area">
              <div className="section mt-5" id="header">
                {generalSett.map((section) => {
                  if (section.name === "Header") {
                    return (
                      <RenderHeader
                        section_data={section && section.section_data}
                      />
                    );
                  }
                })}
                <div className="section__header os-header">
                  <div className="px-2">
                    <Icon source={QuestionMarkMajor} color="base" />
                  </div>
                  <svg
                    width="50"
                    height="50"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="#000"
                    strokeWidth="2"
                    className="os-header__hanging-icon checkmark"
                  >
                    <path
                      className="checkmark__circle"
                      d="M25 49c13.255 0 24-10.745 24-24S38.255 1 25 1 1 11.745 1 25s10.745 24 24 24z"
                    ></path>
                    <path
                      className="checkmark__check"
                      d="M15 24.51l7.307 7.308L35.125 19"
                    ></path>
                  </svg>
                  <div className="d-flex flex-column px-3">
                    <span>Order #1001</span>
                    <h2 className="header_title pt-1">
                      Thank you (first name!)
                    </h2>
                  </div>
                </div>
              </div>
              {leftArea.map((section) => {
                if (section.name === "Order confirmed") {
                  return (
                    <RenderOrderConfirm
                      id={section.id}
                      orderTrack={orderTrack[0]}
                      setSection={setSection}
                      setSelectedSection={setSelectedSection}
                      setSectionId={setSectionId}
                      sectionRef={sectionRef}
                    />
                  );
                }
                if (section.name === "Customer information") {
                  return <RenderCustomerInfo id={section.id} />;
                }
                if (section.name === "Donate for Ukraine") {
                  return (
                    <RenderDonateUkraine
                      section_data={section && section.section_data}
                      setSection={setSection}
                      setSelectedSection={setSelectedSection}
                      setSectionId={setSectionId}
                      sectionRef={sectionRef}
                    />
                  );
                }
                if (section.name === "Birthday collector widget") {
                  return (
                    <RenderBirthdayCollector
                      section_data={section && section.section_data}
                      setSection={setSection}
                      setSelectedSection={setSelectedSection}
                      setSectionId={setSectionId}
                      sectionRef={sectionRef}
                    />
                  );
                }
                if (section.name === "Call to action") {
                  return (
                    <RenderCallToAction
                      section_data={section && section.section_data}
                      setSection={setSection}
                      setSelectedSection={setSelectedSection}
                      setSectionId={setSectionId}
                      sectionRef={sectionRef}
                    />
                  );
                }
                if (section.name === "Collection list") {
                  return (
                    <RenderCollectionList
                      section_data={section && section.section_data}
                      setSection={setSection}
                      setSelectedSection={setSelectedSection}
                      setSectionId={setSectionId}
                      sectionRef={sectionRef}
                    />
                  );
                }
                if (section.name === "Custom HTML") {
                  return (
                    <RenderCustomHtml
                      section_data={section && section.section_data}
                      setSection={setSection}
                      setSelectedSection={setSelectedSection}
                      setSectionId={setSectionId}
                      sectionRef={sectionRef}
                    />
                  );
                }
                if (section.name === "Discount") {
                  return (
                    <RenderDiscount
                      section_data={section && section.section_data}
                      setSection={setSection}
                      setSelectedSection={setSelectedSection}
                      setSectionId={setSectionId}
                      sectionRef={sectionRef}
                    />
                  );
                }
                if (section.name === "Free text") {
                  return (
                    <RenderFreeText
                      section_data={section && section.section_data}
                      setSection={setSection}
                      setSelectedSection={setSelectedSection}
                      setSectionId={setSectionId}
                      sectionRef={sectionRef}
                    />
                  );
                }
                if (section.name === "Image with text") {
                  return (
                    <RenderImageText
                      section_data={section && section.section_data}
                      setSection={setSection}
                      setSelectedSection={setSelectedSection}
                      setSectionId={setSectionId}
                      sectionRef={sectionRef}
                    />
                  );
                }
                if (section.name === "Link list") {
                  return (
                    <RenderLinkList
                      section_data={section && section.section_data}
                      setSection={setSection}
                      setSelectedSection={setSelectedSection}
                      setSectionId={setSectionId}
                      sectionRef={sectionRef}
                    />
                  );
                }
                if (section.name === "Post purchase surveys") {
                  return (
                    <RenderSurvey
                      section_data={section && section.section_data}
                      setSection={setSection}
                      setSelectedSection={setSelectedSection}
                      setSectionId={setSectionId}
                      sectionRef={sectionRef}
                    />
                  );
                }
                if (section.name === "Product recommendations") {
                  return (
                    <RenderProductRecom
                      section_data={section && section.section_data}
                      setSection={setSection}
                      setSelectedSection={setSelectedSection}
                      setSectionId={setSectionId}
                      sectionRef={sectionRef}
                    />
                  );
                }
                if (section.name === "Product upsell") {
                  return (
                    <RenderProductUpsell
                      section_data={section && section.section_data}
                      setSection={setSection}
                      setSelectedSection={setSelectedSection}
                      setSectionId={setSectionId}
                      sectionRef={sectionRef}
                    />
                  );
                }
                if (section.name === "Reorder") {
                  return (
                    <RenderReorder
                      section_data={section && section.section_data}
                      setSection={setSection}
                      setSelectedSection={setSelectedSection}
                      setSectionId={setSectionId}
                      sectionRef={sectionRef}
                    />
                  );
                }
                if (section.name === "Social follow buttons") {
                  return (
                    <RenderSocialFollow
                      section_data={section && section.section_data}
                      setSection={setSection}
                      setSelectedSection={setSelectedSection}
                      setSectionId={setSectionId}
                      sectionRef={sectionRef}
                    />
                  );
                }
                if (section.name === "Social media links") {
                  return (
                    <RenderSocialMediaLink
                      section_data={section && section.section_data}
                      setSection={setSection}
                      setSelectedSection={setSelectedSection}
                      setSectionId={setSectionId}
                      sectionRef={sectionRef}
                    />
                  );
                }
                if (section.name === "Social sharing") {
                  return (
                    <RenderSocialSharing
                      section_data={section && section.section_data}
                      setSection={setSection}
                      setSelectedSection={setSelectedSection}
                      setSectionId={setSectionId}
                      sectionRef={sectionRef}
                    />
                  );
                }
                if (section.name === "Video") {
                  return (
                    <RenderVideo
                      section_data={section && section.section_data}
                      setSection={setSection}
                      setSelectedSection={setSelectedSection}
                      setSectionId={setSectionId}
                      sectionRef={sectionRef}
                    />
                  );
                }
              })}

              <div className="footer pl-15 mb-5" id="footer">
                <div className="footer-right-area">
                  <div className="px-3">
                    <Button size="large" primary>
                      Continue Shopping
                    </Button>
                  </div>
                  <Icon source={QuestionMarkMajor} color="base" />
                </div>
                <div className="footer-left-area">
                  <Icon source={QuestionMarkMajor} color="base" />
                  <span className="mx-2">
                    Need help?
                    <a href="#"> Contact us</a>
                  </span>
                  <div>
                    <Icon source={QuestionMarkMajor} color="base" />
                  </div>
                </div>
              </div>
              <div className="pl-15">
                <hr />
              </div>
            </div>
            <div className="right-area">
              <div className="section mt-5 mb-3">
                <div className="order_summary_sections">
                  <div className="order_summary_section order_summary_section-prd-list">
                    <div className="order_summary_content">
                      <table className="prd-table">
                        <thead>
                          <tr>
                            <th scope="col">
                              <span className="hide">Product Image</span>
                            </th>
                            <th scope="col">
                              <span className="hide">Description</span>
                            </th>
                            <th scope="col">
                              <span className="hide">Price</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="prd">
                            <td className="prd_img">
                              <div className="prd_thumbnail">
                                <div className="thumbnail_wrap">
                                  <img
                                    alt="Product name here"
                                    className="prd_thumbnail_img"
                                    src="https://cdn.stilyoapps.com/v1/assets/img/placeholder.png"
                                  />
                                </div>
                                <span className="prd_qty">1</span>
                              </div>
                            </td>
                            <td className="prd_des">
                              <span className="prd_des_name">
                                Product name here...
                              </span>
                              <span className="prd_des_variant prd_des_small-text">
                                Variant here...
                              </span>
                            </td>
                            <td className="prd_price">
                              <span className="fw-500">Rs. 34.45</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div>
                        <hr />
                      </div>
                    </div>
                  </div>
                  <div className="order_summary_section-total">
                    <table className="tbl-total">
                      <thead>
                        <tr>
                          <th scope="col">
                            <span className="hide">Description</span>
                          </th>
                          <th scope="col">
                            <span className="hide">Description</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="total-line">
                          <td>Subtotal</td>
                          <td>
                            <span>Rs. 34.45</span>
                          </td>
                        </tr>
                        <tr className="total-line">
                          <td>Shipping</td>
                          <td>
                            <span>Rs. 25.00</span>
                          </td>
                        </tr>
                        <tr className="total-line">
                          <td>Taxes</td>
                          <td>
                            <span>Rs. 0</span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            <hr />
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="total-line">
                          <th scope="row">Total</th>
                          <td>
                            <span className="total_price">Rs. 59.45</span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>

                    {generalSett.map((section) => {
                      if (section.name === "Product comments") {
                        return (
                          <RenderProductComment
                            section_data={section && section.section_data}
                            setSection={setSection}
                            setSelectedSection={setSelectedSection}
                            setSectionId={setSectionId}
                            sectionRef={sectionRef}
                          />
                        );
                      }
                    })}

                    {rightArea.map((section) => {
                      if (section.name === "Donate for Ukraine") {
                        return (
                          <RenderDonateUkraine
                            section_data={section && section.section_data}
                            setSection={setSection}
                            setSelectedSection={setSelectedSection}
                            setSectionId={setSectionId}
                            sectionRef={sectionRef}
                          />
                        );
                      }
                      if (section.name === "Birthday collector widget") {
                        return (
                          <RenderBirthdayCollector
                            section_data={section && section.section_data}
                            setSection={setSection}
                            setSelectedSection={setSelectedSection}
                            setSectionId={setSectionId}
                            sectionRef={sectionRef}
                          />
                        );
                      }
                      if (section.name === "Call to action") {
                        return (
                          <RenderCallToAction
                            section_data={section && section.section_data}
                            setSection={setSection}
                            setSelectedSection={setSelectedSection}
                            setSectionId={setSectionId}
                            sectionRef={sectionRef}
                          />
                        );
                      }
                      if (section.name === "Collection list") {
                        return (
                          <RenderCollectionList
                            section_data={section && section.section_data}
                            setSection={setSection}
                            setSelectedSection={setSelectedSection}
                            setSectionId={setSectionId}
                            sectionRef={sectionRef}
                          />
                        );
                      }
                      if (section.name === "Custom HTML") {
                        return (
                          <RenderCustomHtml
                            section_data={section && section.section_data}
                            setSection={setSection}
                            setSelectedSection={setSelectedSection}
                            setSectionId={setSectionId}
                            sectionRef={sectionRef}
                          />
                        );
                      }
                      if (section.name === "Discount") {
                        return (
                          <RenderDiscount
                            section_data={section && section.section_data}
                            setSection={setSection}
                            setSelectedSection={setSelectedSection}
                            setSectionId={setSectionId}
                            sectionRef={sectionRef}
                          />
                        );
                      }
                      if (section.name === "Free text") {
                        return (
                          <RenderFreeText
                            section_data={section && section.section_data}
                            setSection={setSection}
                            setSelectedSection={setSelectedSection}
                            setSectionId={setSectionId}
                            sectionRef={sectionRef}
                          />
                        );
                      }
                      if (section.name === "Image with text") {
                        return (
                          <RenderImageText
                            section_data={section && section.section_data}
                            setSection={setSection}
                            setSelectedSection={setSelectedSection}
                            setSectionId={setSectionId}
                            sectionRef={sectionRef}
                          />
                        );
                      }
                      if (section.name === "Link list") {
                        return (
                          <RenderLinkList
                            section_data={section && section.section_data}
                            setSection={setSection}
                            setSelectedSection={setSelectedSection}
                            setSectionId={setSectionId}
                            sectionRef={sectionRef}
                          />
                        );
                      }
                      if (section.name === "Post purchase surveys") {
                        return (
                          <RenderSurvey
                            section_data={section && section.section_data}
                            setSection={setSection}
                            setSelectedSection={setSelectedSection}
                            setSectionId={setSectionId}
                            sectionRef={sectionRef}
                          />
                        );
                      }
                      if (section.name === "Product recommendations") {
                        return (
                          <RenderProductRecom
                            section_data={section && section.section_data}
                            setSection={setSection}
                            setSelectedSection={setSelectedSection}
                            setSectionId={setSectionId}
                            sectionRef={sectionRef}
                          />
                        );
                      }
                      if (section.name === "Product upsell") {
                        return (
                          <RenderProductUpsell
                            section_data={section && section.section_data}
                            setSection={setSection}
                            setSelectedSection={setSelectedSection}
                            setSectionId={setSectionId}
                            sectionRef={sectionRef}
                          />
                        );
                      }
                      if (section.name === "Reorder") {
                        return (
                          <RenderReorder
                            section_data={section && section.section_data}
                            setSection={setSection}
                            setSelectedSection={setSelectedSection}
                            setSectionId={setSectionId}
                            sectionRef={sectionRef}
                          />
                        );
                      }
                      if (section.name === "Social follow buttons") {
                        return (
                          <RenderSocialFollow
                            section_data={section && section.section_data}
                            setSection={setSection}
                            setSelectedSection={setSelectedSection}
                            setSectionId={setSectionId}
                            sectionRef={sectionRef}
                          />
                        );
                      }
                      if (section.name === "Social media links") {
                        return (
                          <RenderSocialMediaLink
                            section_data={section && section.section_data}
                            setSection={setSection}
                            setSelectedSection={setSelectedSection}
                            setSectionId={setSectionId}
                            sectionRef={sectionRef}
                          />
                        );
                      }
                      if (section.name === "Social sharing") {
                        return (
                          <RenderSocialSharing
                            section_data={section && section.section_data}
                            setSection={setSection}
                            setSelectedSection={setSelectedSection}
                            setSectionId={setSectionId}
                            sectionRef={sectionRef}
                          />
                        );
                      }
                      if (section.name === "Video") {
                        return (
                          <RenderVideo
                            section_data={section && section.section_data}
                            setSection={setSection}
                            setSelectedSection={setSelectedSection}
                            setSectionId={setSectionId}
                            sectionRef={sectionRef}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;
