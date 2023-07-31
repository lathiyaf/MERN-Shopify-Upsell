import React, { useState, useCallback, useEffect } from "react";
import {
  MobileChevronMajor,
  ViewMinor,
  HeaderMajor,
  DiscountAutomaticMajor,
  DiscountsMajor,
  ClockMajor,
  BuyButtonMajor,
} from "@shopify/polaris-icons";
import { Banner, Button, Icon, Select, TextField } from "@shopify/polaris";
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
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Input,
} from "reactstrap";
import {
  discount,
  discount_type,
  display_widget,
  position,
  text_position,
} from "../../../constants/selectOptions";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const ProductRecom = ({
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
  const [open, setOpen] = useState("");
  const [offerName, setOfferName] = useState("");
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(""))
    )
  );
  const [contentState, setContentState] = useState("");
  const [selectedWidget, setSelectedWidget] = useState("");
  const [widTitleOpen, setWidTitleOpen] = useState(false);
  const [widTitlebgColor, setWidTitleBgColor] = useState(
    "rgba(255, 255, 255, 0)"
  );
  const [exclusionTag, setExclusionTag] = useState(false);
  const [exclTags, setExclTags] = useState([]);
  const [hidePrd, setHidePrd] = useState(false);
  const [editorLoaderState, setEditorLoaderState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(""))
    )
  );
  const [contentLoaderState, setContentLoaderState] = useState("");
  const [editorProductState, setEditorProductState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(""))
    )
  );
  const [contentProductState, setContentProductState] = useState("");
  const [prdRow, setPrdRow] = useState();
  const [noPrd, setNoPrd] = useState();
  const [arrowColor, setArrowColor] = useState("#000");
  const [isArrowOpen, setIsArrowOpen] = useState(false);
  const [qtyPicker, setQtyPicker] = useState(true);
  const [qtyPickerTxt, setQtyPickerTxt] = useState("");
  const [variantSel, setVariantSel] = useState(true);
  const [variantTxt, setVariantTxt] = useState("");
  const [soldTxt, setSoldTxt] = useState("");
  const [prdVendor, setPrdVendor] = useState(false);
  const [priceDrop, setPriceDrop] = useState(true);
  const [selectedDis, setSelectedDis] = useState("automatic");
  const [disCode, setDisCode] = useState("");
  const [disType, setDisType] = useState("");
  const [disValue, setDisValue] = useState("");
  const [productX, setProductX] = useState("");
  const [disPrefix, setDisPrefix] = useState("");
  const [comparePColor, setComparePColor] = useState("#000");
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [sellingColor, setSellingColor] = useState("#000");
  const [isSellOpen, setIsSellOpen] = useState(false);
  const [timer, setTimer] = useState(false);
  const [timerTxt, setTimerTxt] = useState("");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerBgColor, setTimerBgColor] = useState("#e1f3f3");
  const [isTimerBgOpen, setIsTimerBgOpen] = useState(false);
  const [timerColor, setTimerColor] = useState("#000");
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [timerTxtColor, setTimerTxtColor] = useState("#6bc0c0");
  const [isTimerTxtOpen, setIsTimerTxtOpen] = useState(false);
  const [timerBorderColor, setTimerBorderColor] = useState("#6bc0c0");
  const [isTimerBorderOpen, setTimerBorderOpen] = useState(false);
  const [selPosition, setSelPosition] = useState("");
  const [txtPosition, setTxtPosition] = useState("");
  const [dayTxt, setDayTxt] = useState("");
  const [hourTxt, setHourTxt] = useState("");
  const [minuteTxt, setMinuteTxt] = useState("");
  const [secondTxt, setSecondTxt] = useState("");
  const [editorExpireState, setEditorExpireState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(""))
    )
  );
  const [contentExpireState, setContentExpireState] = useState("");
  const [quickView, setQuickView] = useState(true);
  const [btnText, setBtnText] = useState("");
  const [btnBgColor, setBtnBgColor] = useState("#197bbd");
  const [isBgOpen, setIsBgOpen] = useState(false);
  const [btnColor, setBtnColor] = useState("#fff");
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [viewAll, setViewAll] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [viewBtnTxt, setViewBtnTxt] = useState("");
  const [viewBgColor, setViewBgColor] = useState("#197bbd");
  const [isViewBgOpen, setIsViewBgOpen] = useState(false);
  const [viewColor, setViewColor] = useState("#fff");
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [accTxt, setAccTxt] = useState("");
  const [accBgColor, setAccBgColor] = useState("#197bbd");
  const [isAccBgOpen, setIsAccBgOpen] = useState(false);
  const [accColor, setAccColor] = useState("#fff");
  const [isAccOpen, setIsAccOpen] = useState(false);
  const [preview, setPreview] = useState(false);

  const toggleAcc = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const handleContentStateChange = (contentState) => {
    setContentState(draftToHtml(contentState));
  };

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleLoaderContentStateChange = (contentState) => {
    setContentLoaderState(draftToHtml(contentState));
  };

  const handleLoaderEditorStateChange = (editorState) => {
    setEditorLoaderState(editorState);
  };

  const handleProductContentStateChange = (contentState) => {
    setContentProductState(draftToHtml(contentState));
  };

  const handleProductEditorStateChange = (editorState) => {
    setEditorProductState(editorState);
  };

  const handleExpireContentStateChange = (contentState) => {
    setContentExpireState(draftToHtml(contentState));
  };

  const handleExpireEditorStateChange = (editorState) => {
    setEditorExpireState(editorState);
  };

  const handlePastedFiles = (files) => {};

  const handleSelectChange = useCallback(
    (value) => setSelectedWidget(value),
    []
  );

  const handleSelectDisChange = useCallback(
    (value) => setSelectedDis(value),
    []
  );

  const handleSelectDisTypeChange = useCallback(
    (value) => setDisType(value),
    []
  );

  const handleSelectPositionChange = useCallback(
    (value) => setSelPosition(value),
    []
  );

  const handleSelectTxtPositionChange = useCallback(
    (value) => setTxtPosition(value),
    []
  );

  useEffect(() => {
    if (Object.keys(section_data).length > 0) {
      dispatch({
        type: SECTION_DETAILS,
        payload: { ...section_data },
      });
      //! title
      setOfferName(section_data?.settings?.title?.offer_name);
      setContentState(section_data?.settings?.title?.widget_title);
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(section_data?.settings?.title?.widget_title)
          )
        )
      );
      setSelectedWidget(section_data?.settings?.title?.selected_disp_widget);
      setWidTitleBgColor(section_data?.settings?.title?.widget_title_bg_color);
      //! product options
      setExclusionTag(section_data?.settings?.product_options?.exclusion_tag);
      setExclTags(section_data?.settings?.product_options?.exclusion_tags);
      setHidePrd(section_data?.settings?.product_options?.hide_product);
      setContentLoaderState(
        section_data?.settings?.product_options?.loader_text
      );
      setEditorLoaderState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(
              section_data?.settings?.product_options?.loader_text
            )
          )
        )
      );
      setContentProductState(section_data?.settings?.product_options?.title);
      setEditorProductState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(section_data?.settings?.product_options?.title)
          )
        )
      );
      setPrdRow(section_data?.settings?.product_options?.products_per_row);
      setNoPrd(section_data?.settings?.product_options?.no_of_product);
      setArrowColor(section_data?.settings?.product_options?.arrow_color);
      setQtyPicker(section_data?.settings?.product_options?.display_qty_picker);
      setQtyPickerTxt(section_data?.settings?.product_options?.qty_picker_txt);
      setVariantSel(
        section_data?.settings?.product_options?.enable_variant_section
      );
      setVariantTxt(
        section_data?.settings?.product_options?.variant_selection_txt
      );
      setSoldTxt(section_data?.settings?.product_options?.sold_out_txt);
      setPrdVendor(
        section_data?.settings?.product_options?.show_product_vendor
      );
      setPriceDrop(
        section_data?.settings?.product_options?.show_price_in_dropdown
      );
      //! Discount
      setSelectedDis(section_data?.settings?.discount?.selected_discount);
      setDisCode(section_data?.settings?.discount?.discount_code);
      setDisType(section_data?.settings?.discount?.selected_discount_type);
      setDisValue(section_data?.settings?.discount?.discount_value);
      setProductX(section_data?.settings?.discount?.only_apply_products);
      setDisPrefix(section_data?.settings?.discount?.discount_prefix);
      setComparePColor(section_data?.settings?.discount?.compare_price_color);
      setSellingColor(section_data?.settings?.discount?.selling_price_color);
      //! Timer
      setTimer(section_data?.settings?.timer?.add_timer);
      setTimerTxt(section_data?.settings?.timer?.timer_txt);
      setDays(section_data?.settings?.timer?.days);
      setHours(section_data?.settings?.timer?.hours);
      setMinutes(section_data?.settings?.timer?.minutes);
      setSeconds(section_data?.settings?.timer?.seconds);
      setTimerBgColor(section_data?.settings?.timer?.timer_bg_color);
      setTimerColor(section_data?.settings?.timer?.timer_color);
      setTimerTxtColor(section_data?.settings?.timer?.timer_text_color);
      setTimerBorderColor(section_data?.settings?.timer?.timer_border_color);
      setSelPosition(section_data?.settings?.timer?.selected_position);
      setTxtPosition(section_data?.settings?.timer?.selected_text_position);
      setDayTxt(section_data?.settings?.timer?.days_txt);
      setHourTxt(section_data?.settings?.timer?.hours_txt);
      setMinuteTxt(section_data?.settings?.timer?.minutes_txt);
      setSecondTxt(section_data?.settings?.timer?.seconds_txt);
      setContentExpireState(section_data?.settings?.timer?.timer_expired_msg);
      setEditorExpireState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(section_data?.settings?.timer?.timer_expired_msg)
          )
        )
      );
      setPreview(section_data?.settings?.timer?.preview_offer);
      //! Buttons
      setQuickView(section_data?.settings?.buttons?.show_quick_view);
      setBtnText(section_data?.settings?.buttons?.btn_text);
      setBtnBgColor(section_data?.settings?.buttons?.btn_bg_color);
      setBtnColor(section_data?.settings?.buttons?.btn_color);
      setViewAll(section_data?.settings?.buttons?.show_view_all_btn);
      setRedirectUrl(section_data?.settings?.buttons?.collection_redirect_url);
      setViewBtnTxt(section_data?.settings?.buttons?.view_btn_text);
      setViewBgColor(section_data?.settings?.buttons?.view_btn_bg_color);
      setViewColor(section_data?.settings?.buttons?.view_btn_color);
      setAccTxt(section_data?.settings?.buttons?.accept_btn);
      setAccBgColor(section_data?.settings?.buttons?.accept_btn_bg_color);
      setAccColor(section_data?.settings?.buttons?.accept_btn_color);
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
      settings: {
        title: {
          offer_name: offerName,
          widget_title: contentState,
          selected_disp_widget: selectedWidget,
          widget_title_bg_color: widTitlebgColor,
        },
        product_options: {
          exclusion_tag: exclusionTag,
          exclusion_tags: exclTags,
          hide_product: hidePrd,
          loader_text: contentLoaderState,
          title: contentProductState,
          products_per_row: prdRow,
          no_of_product: noPrd,
          arrow_color: arrowColor,
          display_qty_picker: qtyPicker,
          qty_picker_txt: qtyPickerTxt,
          enable_variant_section: variantSel,
          variant_selection_txt: variantTxt,
          sold_out_txt: soldTxt,
          show_product_vendor: prdVendor,
          show_price_in_dropdown: priceDrop,
        },
        discount: {
          selected_discount: selectedDis,
          selected_discount_type: disType,
          discount_code: disCode,
          discount_value: disValue,
          only_apply_products: productX,
          discount_prefix: disPrefix,
          compare_price_color: comparePColor,
          selling_price_color: sellingColor,
        },
        timer: {
          add_timer: timer,
          timer_txt: timerTxt,
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
          timer_bg_color: timerBgColor,
          timer_color: timerColor,
          timer_text_color: timerTxtColor,
          timer_border_color: timerBorderColor,
          selected_position: selPosition,
          selected_text_position: txtPosition,
          days_txt: dayTxt,
          hours_txt: hourTxt,
          minutes_txt: minuteTxt,
          seconds_txt: secondTxt,
          timer_expired_msg: contentExpireState,
          preview_offer: preview,
        },
        buttons: {
          show_quick_view: quickView,
          btn_text: btnText,
          btn_bg_color: btnBgColor,
          btn_color: btnColor,
          show_view_all_btn: viewAll,
          collection_redirect_url: redirectUrl,
          view_btn_text: viewBtnTxt,
          view_btn_bg_color: viewBgColor,
          view_btn_color: viewColor,
          accept_btn: accTxt,
          accept_btn_bg_color: accBgColor,
          accept_btn_color: accColor,
        },
      },
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
    offerName,
    contentState,
    selectedWidget,
    widTitlebgColor,
    exclusionTag,
    exclTags,
    hidePrd,
    contentLoaderState,
    contentProductState,
    prdRow,
    noPrd,
    arrowColor,
    qtyPicker,
    qtyPickerTxt,
    variantSel,
    variantTxt,
    soldTxt,
    prdVendor,
    priceDrop,
    selectedDis,
    disType,
    disCode,
    disValue,
    productX,
    disPrefix,
    comparePColor,
    sellingColor,
    timer,
    timerTxt,
    days,
    hours,
    minutes,
    seconds,
    timerBgColor,
    timerColor,
    timerTxtColor,
    timerBorderColor,
    selPosition,
    txtPosition,
    dayTxt,
    hourTxt,
    minuteTxt,
    secondTxt,
    contentExpireState,
    quickView,
    btnText,
    btnBgColor,
    btnColor,
    viewAll,
    redirectUrl,
    viewBtnTxt,
    viewBgColor,
    viewColor,
    accTxt,
    accBgColor,
    accColor,
    preview,
    section_id,
    characters,
    section_data,
  ]);

  return (
    <>
      <div className="select-prd-sec">
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
          <span>Product recommendations</span>
        </div>

        <label className="custom-label">Settings</label>
      </div>

      <div className="recom-body">
        <div className="mt-2">
          <ul className="nav custom-box-editor">
            <Accordion open={open} toggle={toggleAcc}>
              <AccordionItem>
                <AccordionHeader targetId="1">
                  <span className="Polaris-Icon icon disply-unset editor-set-icon">
                    <Icon source={HeaderMajor} color="base" />
                  </span>
                  <span className="title text">Title</span>
                </AccordionHeader>
                <AccordionBody accordionId="1">
                  <div className="mt-1">
                    <h5>OFFER NAME</h5>
                  </div>

                  <div className="mt-2">
                    <label> Give your offer name</label>
                    <div className="Polaris-Connected mt-1">
                      <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                        <div className="Polaris-TextField Polaris-TextField--hasValue">
                          <input
                            className="Polaris-TextField__Input section_field_update live-update-text"
                            name="question"
                            type="text"
                            value={offerName}
                            onChange={(e) => setOfferName(e.target.value)}
                            autoComplete="off"
                          />
                          <div className="Polaris-TextField__Backdrop"></div>
                        </div>
                      </div>
                    </div>
                    <label className="pt-1 text-gray">
                      This is an internal name your customers will not see it.
                    </label>
                  </div>

                  <hr />

                  <div className="mt-1">
                    <h5>WIDGET TITLE</h5>
                  </div>

                  <div className="mt-1">
                    <label className="mb-1">Title</label>
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
                      label="Display widget title"
                      options={display_widget}
                      onChange={handleSelectChange}
                      value={selectedWidget}
                    />
                  </div>

                  <div className="mt-3">
                    <div className="swatch-color">
                      <div
                        className="swatch"
                        style={{ backgroundColor: widTitlebgColor }}
                        onClick={() => setWidTitleOpen(!widTitleOpen)}
                      />
                      <label className="px-3">
                        Widget title background color
                      </label>
                    </div>

                    {widTitleOpen && (
                      <div className="popover">
                        <HexColorPicker
                          color={widTitlebgColor}
                          onChange={(e) => {
                            setWidTitleBgColor(e);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem className="mt-2">
                <AccordionHeader targetId="2">
                  <span className="Polaris-Icon icon disply-unset editor-set-icon">
                    <Icon source={DiscountAutomaticMajor} color="base" />
                  </span>
                  <span className="title text">Product options</span>
                </AccordionHeader>
                <AccordionBody
                  accordionId="2"
                  className="accordion-body-text accordion-scroll"
                >
                  <div className="mt-1">
                    <h5>PRODUCT</h5>
                  </div>

                  <div className="mt-2">
                    <Input
                      type="checkbox"
                      value={exclusionTag}
                      onChange={() => setExclusionTag(!exclusionTag)}
                    />
                    Exclusion tags -
                    {exclusionTag && " exclude products that are tagged with:"}
                    {exclusionTag && (
                      <div className="mt-2">
                        <TagsInput
                          name="tags"
                          value={exclTags}
                          onChange={(tags) => {
                            setExclTags(tags);
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-3">
                    <Input
                      type="checkbox"
                      value={hidePrd}
                      onChange={() => setHidePrd(!hidePrd)}
                    />
                    Hide products that are in the original order.
                  </div>

                  <div className="mt-3">
                    <label className="mb-1">Loader text</label>
                    <Editor
                      editorState={editorLoaderState}
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
                      onEditorStateChange={handleLoaderEditorStateChange}
                      onContentStateChange={handleLoaderContentStateChange}
                      toolbar={toolbar}
                      spellCheck
                      handlePastedText={handlePastedFiles}
                    />
                  </div>

                  <div className="mt-2 text-gray">
                    Product recommendations might take time to load. Use this
                    box to display a message while loading.
                  </div>

                  <div className="mt-3">
                    <label className="mb-1">Title</label>
                    <Editor
                      editorState={editorProductState}
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
                      onEditorStateChange={handleProductEditorStateChange}
                      onContentStateChange={handleProductContentStateChange}
                      toolbar={toolbar}
                      spellCheck
                      handlePastedText={handlePastedFiles}
                    />
                  </div>

                  <hr />

                  <div>
                    <h5>LAYOUT</h5>
                  </div>

                  <div className="mt-3">
                    <label htmlFor="customRange1" className="form-label">
                      Products per row
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      id="customRange1"
                      value={prdRow}
                      min={1}
                      max={3}
                      onChange={({ target: { value: radius } }) => {
                        setPrdRow(radius);
                      }}
                    ></input>
                    <div>{prdRow}</div>
                  </div>

                  <div className="mt-3">
                    <label htmlFor="customRange1" className="form-label">
                      Number of products
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      id="customRange1"
                      value={noPrd}
                      min={12}
                      max={60}
                      onChange={({ target: { value: radius } }) => {
                        setNoPrd(radius);
                      }}
                    ></input>
                    <div>{noPrd}</div>
                  </div>

                  <div className="mt-3">
                    <div className="swatch-color">
                      <div
                        className="swatch"
                        style={{ backgroundColor: arrowColor }}
                        onClick={() => setIsArrowOpen(!isArrowOpen)}
                      />
                      <label className="px-3">Arrow color</label>
                    </div>

                    {isArrowOpen && (
                      <div className="popover">
                        <HexColorPicker
                          color={arrowColor}
                          onChange={(e) => {
                            setArrowColor(e);
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <hr />

                  <div>
                    <h5>PRODUCT OPTIONS</h5>
                  </div>

                  <div>
                    <Input
                      type="checkbox"
                      value={qtyPicker}
                      onChange={() => setQtyPicker(!qtyPicker)}
                      checked={qtyPicker}
                    />
                    Display quantity picker
                    {qtyPicker && (
                      <div className="mt-3">
                        <label>Quantity picker text</label>
                        <div className="Polaris-Connected mt-1">
                          <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                            <div className="Polaris-TextField Polaris-TextField--hasValue">
                              <input
                                className="Polaris-TextField__Input section_field_update live-update-text"
                                name="question"
                                type="text"
                                value={qtyPickerTxt}
                                onChange={(e) =>
                                  setQtyPickerTxt(e.target.value)
                                }
                                autoComplete="off"
                              />
                              <div className="Polaris-TextField__Backdrop"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-3">
                    <Input
                      type="checkbox"
                      value={variantSel}
                      onChange={() => setVariantSel(!variantSel)}
                      checked={variantSel}
                    />
                    Enable variant selection
                    {variantSel && (
                      <div className="mt-3">
                        <label>Variant selection text</label>
                        <div className="Polaris-Connected mt-1">
                          <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                            <div className="Polaris-TextField Polaris-TextField--hasValue">
                              <input
                                className="Polaris-TextField__Input section_field_update live-update-text"
                                name="question"
                                type="text"
                                value={variantTxt}
                                onChange={(e) => setVariantTxt(e.target.value)}
                                autoComplete="off"
                              />
                              <div className="Polaris-TextField__Backdrop"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-3">
                    <label>Sold out text</label>
                    <div className="Polaris-Connected mt-1">
                      <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                        <div className="Polaris-TextField Polaris-TextField--hasValue">
                          <input
                            className="Polaris-TextField__Input section_field_update live-update-text"
                            name="question"
                            type="text"
                            value={soldTxt}
                            onChange={(e) => setSoldTxt(e.target.value)}
                            autoComplete="off"
                          />
                          <div className="Polaris-TextField__Backdrop"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <Input
                      type="checkbox"
                      value={prdVendor}
                      onChange={() => setPrdVendor(!prdVendor)}
                      checked={prdVendor}
                    />
                    Show product vendors
                  </div>

                  <div className="mt-3">
                    <Input
                      type="checkbox"
                      value={priceDrop}
                      onChange={() => setPriceDrop(!priceDrop)}
                      checked={priceDrop}
                    />
                    Show price in dropdown
                  </div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem className="mt-2">
                <AccordionHeader targetId="3">
                  <span className="Polaris-Icon icon disply-unset editor-set-icon">
                    <Icon source={DiscountsMajor} color="base" />
                  </span>
                  <span className="title text">Discount</span>
                </AccordionHeader>
                <AccordionBody
                  accordionId="3"
                  className="accordion-body-text accordion-scroll"
                >
                  <div>
                    <h5>Discount</h5>
                  </div>

                  <div className="mt-3">
                    <Select
                      label="Discount"
                      options={discount}
                      onChange={handleSelectDisChange}
                      value={selectedDis}
                    />
                  </div>

                  {selectedDis === "pre_made" && (
                    <div className="mt-3">
                      <label>Discount code</label>
                      <div className="Polaris-Connected mt-1">
                        <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
                          <div className="Polaris-TextField Polaris-TextField--hasValue">
                            <input
                              className="Polaris-TextField__Input section_field_update live-update-text"
                              name="question"
                              type="text"
                              value={disCode}
                              onChange={(e) => setDisCode(e.target.value)}
                              autoComplete="off"
                            />
                            <div className="Polaris-TextField__Backdrop"></div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 text-gray">
                        Not recommended: The customer details will not be
                        automatically filled when using a pre-made coupon code
                      </div>

                      <div className="mt-3">
                        <Banner title="" status="warning">
                          Create a discount in your Shopify admin, and enter it
                          above. Create discount
                        </Banner>
                      </div>
                    </div>
                  )}

                  {selectedDis === "automatic" && (
                    <>
                      <div className="mt-3">
                        <Select
                          label="Discount type"
                          options={discount_type}
                          onChange={handleSelectDisTypeChange}
                          value={disType}
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
                          prefix={disType !== "percentage" ? "Rs." : ""}
                          suffix={disType === "percentage" ? "%" : ""}
                        />
                      </div>
                      <div className="mt-3">
                        <TextField
                          label="Only apply to products over $X"
                          type="number"
                          value={productX}
                          onChange={(value) => setProductX(value)}
                          autoComplete="off"
                          min={0}
                          max={100}
                          prefix="Rs."
                        />
                      </div>
                      <div className="mt-3">
                        <TextField
                          label="Discount prefix"
                          type="text"
                          value={disPrefix}
                          onChange={(value) => setDisPrefix(value)}
                          autoComplete="off"
                        />
                      </div>
                      <div className="mt-2 text-gray">
                        Preview : SPECIAL DEAL-{"{Random code}"}
                      </div>
                      <div className="mt-2 text-gray">
                        Preview : You do not need to create this discount code,
                        we create it automatically for you.
                      </div>
                    </>
                  )}

                  <hr />

                  <div>
                    <h5>DISPLAY PRICE</h5>
                  </div>

                  <div className="mt-3">
                    <div className="swatch-color">
                      <div
                        className="swatch"
                        style={{ backgroundColor: comparePColor }}
                        onClick={() => setIsCompareOpen(!isCompareOpen)}
                      />
                      <label className="px-3">Compare price color</label>
                    </div>

                    {isCompareOpen && (
                      <div className="popover">
                        <HexColorPicker
                          color={comparePColor}
                          onChange={(e) => {
                            setComparePColor(e);
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-3">
                    <div className="swatch-color">
                      <div
                        className="swatch"
                        style={{ backgroundColor: sellingColor }}
                        onClick={() => setIsSellOpen(!isSellOpen)}
                      />
                      <label className="px-3">Selling price color</label>
                    </div>

                    {isSellOpen && (
                      <div className="popover">
                        <HexColorPicker
                          color={sellingColor}
                          onChange={(e) => {
                            setSellingColor(e);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem className="mt-2">
                <AccordionHeader targetId="4">
                  <span className="Polaris-Icon icon disply-unset editor-set-icon">
                    <Icon source={ClockMajor} color="base" />
                  </span>
                  <span className="title text">Timer</span>
                </AccordionHeader>
                <AccordionBody
                  accordionId="4"
                  className="accordion-body-text accordion-scroll"
                >
                  <div>
                    <h5>TIMER SETTINGS</h5>
                  </div>

                  <div className="mt-3">
                    <Input
                      type="checkbox"
                      value={timer}
                      onChange={() => setTimer(!timer)}
                      checked={timer}
                    />
                    Add timer
                  </div>

                  {timer && (
                    <>
                      <div className="mt-3">
                        <TextField
                          label="Timer text"
                          type="text"
                          value={timerTxt}
                          onChange={(value) => setTimerTxt(value)}
                          autoComplete="off"
                        />
                      </div>
                      <hr />

                      <div>
                        <h5>DURATION</h5>
                      </div>

                      <div className="mt-3 row">
                        <div className="col-md-6 col-sm-6 col-lg-6 col-12">
                          <TextField
                            label="Days"
                            type="number"
                            value={days}
                            onChange={(value) => setDays(value)}
                            autoComplete="off"
                          />
                        </div>
                        <div className="col-md-6 col-sm-6 col-lg-6 col-12">
                          <TextField
                            label="Hours"
                            type="number"
                            value={hours}
                            onChange={(value) => setHours(value)}
                            autoComplete="off"
                          />
                        </div>
                      </div>

                      <div className="mt-3 row">
                        <div className="col-md-6 col-sm-6 col-lg-6 col-12">
                          <TextField
                            label="Minutes"
                            type="number"
                            value={minutes}
                            onChange={(value) => setMinutes(value)}
                            autoComplete="off"
                          />
                        </div>
                        <div className="col-md-6 col-sm-6 col-lg-6 col-12">
                          <TextField
                            label="Seconds"
                            type="number"
                            value={seconds}
                            onChange={(value) => setSeconds(value)}
                            autoComplete="off"
                          />
                        </div>
                      </div>

                      <hr />

                      <div>
                        <h5> TIMER DESIGN & POSITION</h5>
                      </div>

                      <div className="mt-3">
                        <div className="swatch-color">
                          <div
                            className="swatch"
                            style={{ backgroundColor: timerBgColor }}
                            onClick={() => setIsTimerBgOpen(!isTimerBgOpen)}
                          />
                          <label className="px-3">Timer background color</label>
                        </div>

                        {isTimerBgOpen && (
                          <div className="popover">
                            <HexColorPicker
                              color={timerBgColor}
                              onChange={(e) => {
                                setTimerBgColor(e);
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="mt-3">
                        <div className="swatch-color">
                          <div
                            className="swatch"
                            style={{ backgroundColor: timerColor }}
                            onClick={() => setIsTimerOpen(!isTimerOpen)}
                          />
                          <label className="px-3">Timer title text color</label>
                        </div>

                        {isTimerOpen && (
                          <div className="popover">
                            <HexColorPicker
                              color={timerColor}
                              onChange={(e) => {
                                setTimerColor(e);
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="mt-3">
                        <div className="swatch-color">
                          <div
                            className="swatch"
                            style={{ backgroundColor: timerTxtColor }}
                            onClick={() => setIsTimerTxtOpen(!isTimerTxtOpen)}
                          />
                          <label className="px-3">Timer text color</label>
                        </div>

                        {isTimerTxtOpen && (
                          <div className="popover">
                            <HexColorPicker
                              color={timerTxtColor}
                              onChange={(e) => {
                                setTimerTxtColor(e);
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="mt-3">
                        <div className="swatch-color">
                          <div
                            className="swatch"
                            style={{ backgroundColor: timerBorderColor }}
                            onClick={() =>
                              setTimerBorderOpen(!isTimerBorderOpen)
                            }
                          />
                          <label className="px-3">Timer border color</label>
                        </div>

                        {isTimerBorderOpen && (
                          <div className="popover">
                            <HexColorPicker
                              color={timerBorderColor}
                              onChange={(e) => {
                                setTimerBorderColor(e);
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="mt-3">
                        <Select
                          label="Position"
                          options={position}
                          onChange={handleSelectPositionChange}
                          value={selPosition}
                        />
                      </div>

                      <div className="mt-3">
                        <Select
                          label="Text position"
                          options={text_position}
                          onChange={handleSelectTxtPositionChange}
                          value={txtPosition}
                        />
                      </div>

                      <hr />

                      <div>
                        <h5>TEXT</h5>
                      </div>

                      <div className="mt-2 row">
                        <div className="col-md-6 col-sm-6 col-lg-6 col-12">
                          <TextField
                            label="Days"
                            type="text"
                            value={dayTxt}
                            onChange={(value) => setDayTxt(value)}
                            autoComplete="off"
                          />
                        </div>
                        <div className="col-md-6 col-sm-6 col-lg-6 col-12">
                          <TextField
                            label="Hours"
                            type="text"
                            value={hourTxt}
                            onChange={(value) => setHourTxt(value)}
                            autoComplete="off"
                          />
                        </div>
                      </div>

                      <div className="mt-3 row">
                        <div className="col-md-6 col-sm-6 col-lg-6 col-12">
                          <TextField
                            label="Minutes"
                            type="text"
                            value={minuteTxt}
                            onChange={(value) => setMinuteTxt(value)}
                            autoComplete="off"
                          />
                        </div>
                        <div className="col-md-6 col-sm-6 col-lg-6 col-12">
                          <TextField
                            label="Seconds"
                            type="text"
                            value={secondTxt}
                            onChange={(value) => setSecondTxt(value)}
                            autoComplete="off"
                          />
                        </div>
                      </div>

                      <hr />

                      <div>
                        <h5>EXPIRY SETTINGS</h5>
                      </div>

                      <div className="mt-1">
                        <label className="mb-1">Title</label>
                        <Editor
                          editorState={editorExpireState}
                          wrapperClassName="wrapper-class"
                          editorClassName="editor-class"
                          toolbarClassName="toolbar-class"
                          onEditorStateChange={handleExpireEditorStateChange}
                          onContentStateChange={handleExpireContentStateChange}
                          toolbar={toolbar}
                          spellCheck
                          handlePastedText={handlePastedFiles}
                        />
                      </div>

                      <div className="mt-2 text-gray">
                        Keep empty if you don't want to show any message when
                        the timer runs out
                      </div>

                      <div className="mt-2">
                        <Button onClick={() => setPreview(!preview)}>
                          {preview
                            ? "Preview expired offer"
                            : "Preview live offer"}
                        </Button>
                      </div>
                    </>
                  )}
                </AccordionBody>
              </AccordionItem>
              <AccordionItem className="mt-2">
                <AccordionHeader targetId="5">
                  <span className="Polaris-Icon icon disply-unset editor-set-icon">
                    <Icon source={BuyButtonMajor} color="base" />
                  </span>
                  <span className="title text">Buttons</span>
                </AccordionHeader>
                <AccordionBody
                  accordionId="5"
                  className="accordion-body-text accordion-scroll"
                >
                  <div>
                    <h5>QUICK VIEW</h5>
                  </div>

                  <div className="mt-3">
                    <Input
                      type="checkbox"
                      value={quickView}
                      onChange={() => setQuickView(!quickView)}
                      checked={quickView}
                    />
                    Show quick view
                  </div>

                  {quickView && (
                    <>
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
                        <div className="swatch-color">
                          <div
                            className="swatch"
                            style={{ backgroundColor: btnBgColor }}
                            onClick={() => setIsBgOpen(!isBgOpen)}
                          />
                          <label className="px-3">
                            Button background color
                          </label>
                        </div>

                        {isBgOpen && (
                          <div className="popover">
                            <HexColorPicker
                              color={btnBgColor}
                              onChange={(e) => {
                                setBtnBgColor(e);
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="mt-3">
                        <div className="swatch-color">
                          <div
                            className="swatch"
                            style={{ backgroundColor: btnColor }}
                            onClick={() => setIsColorOpen(!isColorOpen)}
                          />
                          <label className="px-3">Button text color</label>
                        </div>

                        {isColorOpen && (
                          <div className="popover">
                            <HexColorPicker
                              color={btnColor}
                              onChange={(e) => {
                                setBtnColor(e);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <hr />

                  <div>
                    <h5>VIEW ALL</h5>
                  </div>

                  <div className="mt-3">
                    <Input
                      type="checkbox"
                      value={viewAll}
                      onChange={() => setViewAll(!viewAll)}
                      checked={viewAll}
                    />
                    Show View all button
                  </div>

                  {viewAll && (
                    <>
                      <div className="mt-3">
                        <TextField
                          label="Collection redirect link"
                          type="text"
                          value={redirectUrl}
                          onChange={(value) => setRedirectUrl(value)}
                          autoComplete="off"
                        />
                      </div>

                      <div className="mt-2 text-gray">
                        https://crawlapps-trainee.myshopify.com/collections/all
                      </div>

                      <div className="mt-3">
                        <TextField
                          label="Button text"
                          type="text"
                          value={viewBtnTxt}
                          onChange={(value) => setViewBtnTxt(value)}
                          autoComplete="off"
                        />
                      </div>

                      <div className="mt-3">
                        <div className="swatch-color">
                          <div
                            className="swatch"
                            style={{ backgroundColor: viewBgColor }}
                            onClick={() => setIsViewBgOpen(!isViewBgOpen)}
                          />
                          <label className="px-3">
                            Button background color
                          </label>
                        </div>

                        {isViewBgOpen && (
                          <div className="popover">
                            <HexColorPicker
                              color={viewBgColor}
                              onChange={(e) => {
                                setViewBgColor(e);
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="mt-3">
                        <div className="swatch-color">
                          <div
                            className="swatch"
                            style={{ backgroundColor: viewColor }}
                            onClick={() => setIsViewOpen(!isViewOpen)}
                          />
                          <label className="px-3">Button text color</label>
                        </div>

                        {isViewOpen && (
                          <div className="popover">
                            <HexColorPicker
                              color={viewColor}
                              onChange={(e) => {
                                setViewColor(e);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <hr />

                  <div>
                    <h5>ACCEPT BUTTON</h5>
                  </div>

                  <div className="mt-3">
                    <TextField
                      label="Accept button text"
                      type="text"
                      value={accTxt}
                      onChange={(value) => setAccTxt(value)}
                      autoComplete="off"
                    />
                  </div>

                  <div className="mt-3">
                    <div className="swatch-color">
                      <div
                        className="swatch"
                        style={{ backgroundColor: accBgColor }}
                        onClick={() => setIsAccBgOpen(!isAccBgOpen)}
                      />
                      <label className="px-3">
                        Accept button background color
                      </label>
                    </div>

                    {isAccBgOpen && (
                      <div className="popover">
                        <HexColorPicker
                          color={accBgColor}
                          onChange={(e) => {
                            setAccBgColor(e);
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-3">
                    <div className="swatch-color">
                      <div
                        className="swatch"
                        style={{ backgroundColor: accColor }}
                        onClick={() => setIsAccOpen(!isAccOpen)}
                      />
                      <label className="px-3">Accept button text color</label>
                    </div>

                    {isAccOpen && (
                      <div className="popover">
                        <HexColorPicker
                          color={accColor}
                          onChange={(e) => {
                            setAccColor(e);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </ul>
        </div>
      </div>

      <div className="recomm-delete">
        <div className="recomm-delete-section">
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
      </div>
    </>
  );
};

export default ProductRecom;
