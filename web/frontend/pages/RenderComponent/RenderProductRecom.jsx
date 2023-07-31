import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Row } from "reactstrap";

const RenderProductRecom = ({
  section_data,
  setSection,
  setSelectedSection,
  setSectionId,
  sectionRef,
}) => {
  const data = useSelector((state) => state.section_data);
  const [isEdit, setIsEdit] = useState(false);
  const [sliderData] = useState([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: isEdit
      ? data?.settings?.product_options?.products_per_row
      : section_data?.settings?.product_options?.products_per_row,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          // background: isEdit
          //   ? data?.settings?.product_options?.arrow_color
          //   : section_data?.settings?.product_options?.arrow_color,
        }}
        onClick={onClick}
      />
    );
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          // background: isEdit
          //   ? data?.settings?.product_options?.arrow_color
          //   : section_data?.settings?.product_options?.arrow_color,
        }}
        onClick={onClick}
      />
    );
  }

  useEffect(() => {
    if (section_data?._id === data?._id) {
      setIsEdit(true);
    } else if (section_data?.row_section_id === data?.row_section_id) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [data, section_data, isEdit]);

  return (
    <>
      {isEdit ? (
        <>
          <div
            className="content-box section-element pl-15 mt-3 prd-recomm"
            id={data?.row_section_id}
            onClick={(e) => {
              e.preventDefault();
              setSection("section4");
              setSelectedSection(data);
              window.scrollTo(0, 0);
              setSectionId(data?.row_section_id);
            }}
            ref={sectionRef}
          >
            <div className="section-content">
              <div className="content-box-row">
                {data?.settings?.title?.selected_disp_widget ===
                  "above_widget" && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data?.settings?.title?.widget_title,
                    }}
                    style={{
                      background: data?.settings?.title?.widget_title_bg_color,
                    }}
                  />
                )}

                {data?.settings?.timer?.add_timer &&
                  data?.settings?.timer?.selected_position ===
                    "above_title" && (
                    <>
                      {data?.settings?.timer?.preview_offer ? (
                        <div
                          className="timer mt-2"
                          style={{
                            background: data?.settings?.timer?.timer_bg_color,
                            border:
                              "1px solid " +
                              data?.settings?.timer?.timer_border_color,
                          }}
                        >
                          {data?.settings?.timer?.selected_text_position ===
                            "above_timer" && (
                            <div className="d-flex align-items-center flex-column justify-content-center">
                              <h2
                                style={{
                                  color: data?.settings?.timer?.timer_color,
                                }}
                              >
                                {data?.settings?.timer?.timer_txt}
                              </h2>

                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    data?.settings?.timer?.timer_text_color,
                                }}
                              >
                                {data?.settings?.timer?.minutes}{" "}
                                {data?.settings?.timer?.minutes_txt}:
                                {data?.settings?.timer?.seconds}{" "}
                                {data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                          {data?.settings?.timer?.selected_text_position ===
                            "left_timer" && (
                            <div className="d-flex align-items-center justify-content-center">
                              <h2
                                style={{
                                  color: data?.settings?.timer?.timer_color,
                                }}
                              >
                                {data?.settings?.timer?.timer_txt}
                              </h2>

                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    data?.settings?.timer?.timer_text_color,
                                }}
                              >
                                {data?.settings?.timer?.minutes}{" "}
                                {data?.settings?.timer?.minutes_txt}:
                                {data?.settings?.timer?.seconds}{" "}
                                {data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                          {data?.settings?.timer?.selected_text_position ===
                            "right_timer" && (
                            <div className="d-flex align-items-center justify-content-center">
                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    data?.settings?.timer?.timer_text_color,
                                }}
                              >
                                {data?.settings?.timer?.minutes}{" "}
                                {data?.settings?.timer?.minutes_txt}:
                                {data?.settings?.timer?.seconds}{" "}
                                {data?.settings?.timer?.seconds_txt}
                              </span>
                              <h2
                                style={{
                                  color: data?.settings?.timer?.timer_color,
                                }}
                              >
                                {data?.settings?.timer?.timer_txt}
                              </h2>
                            </div>
                          )}
                          {data?.settings?.timer?.selected_text_position ===
                            "below_timer" && (
                            <div className="d-flex align-items-center flex-column-reverse justify-content-center">
                              <h2
                                style={{
                                  color: data?.settings?.timer?.timer_color,
                                }}
                              >
                                {data?.settings?.timer?.timer_txt}
                              </h2>
                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    data?.settings?.timer?.timer_text_color,
                                }}
                              >
                                {data?.settings?.timer?.minutes}{" "}
                                {data?.settings?.timer?.minutes_txt}:
                                {data?.settings?.timer?.seconds}{" "}
                                {data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data?.settings?.timer?.timer_expired_msg,
                          }}
                          className="mt-2 mb-2"
                        />
                      )}
                    </>
                  )}

                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.settings?.product_options?.title,
                  }}
                  className="mt-2 mb-2"
                />

                {data?.settings?.timer?.add_timer &&
                  data?.settings?.timer?.selected_position ===
                    "below_title" && (
                    <>
                      {data?.settings?.timer?.preview_offer ? (
                        <div
                          className="timer mt-2"
                          style={{
                            background: data?.settings?.timer?.timer_bg_color,
                            border:
                              "1px solid " +
                              data?.settings?.timer?.timer_border_color,
                          }}
                        >
                          {data?.settings?.timer?.selected_text_position ===
                            "above_timer" && (
                            <div className="d-flex align-items-center flex-column justify-content-center">
                              <h2
                                style={{
                                  color: data?.settings?.timer?.timer_color,
                                }}
                              >
                                {data?.settings?.timer?.timer_txt}
                              </h2>

                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    data?.settings?.timer?.timer_text_color,
                                }}
                              >
                                {data?.settings?.timer?.minutes}{" "}
                                {data?.settings?.timer?.minutes_txt}:
                                {data?.settings?.timer?.seconds}{" "}
                                {data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                          {data?.settings?.timer?.selected_text_position ===
                            "left_timer" && (
                            <div className="d-flex align-items-center justify-content-center">
                              <h2
                                style={{
                                  color: data?.settings?.timer?.timer_color,
                                }}
                              >
                                {data?.settings?.timer?.timer_txt}
                              </h2>

                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    data?.settings?.timer?.timer_text_color,
                                }}
                              >
                                {data?.settings?.timer?.minutes}{" "}
                                {data?.settings?.timer?.minutes_txt}:
                                {data?.settings?.timer?.seconds}{" "}
                                {data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                          {data?.settings?.timer?.selected_text_position ===
                            "right_timer" && (
                            <div className="d-flex align-items-center justify-content-center">
                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    data?.settings?.timer?.timer_text_color,
                                }}
                              >
                                {data?.settings?.timer?.minutes}{" "}
                                {data?.settings?.timer?.minutes_txt}:
                                {data?.settings?.timer?.seconds}{" "}
                                {data?.settings?.timer?.seconds_txt}
                              </span>
                              <h2
                                style={{
                                  color: data?.settings?.timer?.timer_color,
                                }}
                              >
                                {data?.settings?.timer?.timer_txt}
                              </h2>
                            </div>
                          )}
                          {data?.settings?.timer?.selected_text_position ===
                            "below_timer" && (
                            <div className="d-flex align-items-center flex-column-reverse justify-content-center">
                              <h2
                                style={{
                                  color: data?.settings?.timer?.timer_color,
                                }}
                              >
                                {data?.settings?.timer?.timer_txt}
                              </h2>
                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    data?.settings?.timer?.timer_text_color,
                                }}
                              >
                                {data?.settings?.timer?.minutes}{" "}
                                {data?.settings?.timer?.minutes_txt}:
                                {data?.settings?.timer?.seconds}{" "}
                                {data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data?.settings?.timer?.timer_expired_msg,
                          }}
                          className="mt-2 mb-2"
                        />
                      )}
                    </>
                  )}
                <Row className="mt-3 text-center">
                  <Slider {...settings}>
                    {sliderData.map((slider, i) => {
                      return (
                        <React.Fragment key={i}>
                          <div>
                            <Col lg={12} md={12} sm={12}>
                              <div className="productCard__container slider-card">
                                {data?.settings?.buttons?.show_quick_view && (
                                  <>
                                    <div
                                      className="productCard__addToBasket"
                                      style={{
                                        background:
                                          data?.settings?.buttons?.btn_bg_color,
                                        color:
                                          data?.settings?.buttons?.btn_color,
                                      }}
                                    >
                                      <span>Quick view</span>
                                    </div>
                                    <div className="productCard__productImage">
                                      <img
                                        src="https://cdn.stilyoapps.com/v1/assets/img/placeholder.png"
                                        alt=""
                                        height={170}
                                        width={170}
                                      />
                                    </div>
                                  </>
                                )}

                                <div className="feature-coll">
                                  <h4>Product title</h4>

                                  {data?.settings?.product_options
                                    ?.show_product_vendor && (
                                    <h3 className="text-left">Vendor</h3>
                                  )}

                                  <div className="text-left mt-1">
                                    <span
                                      className="compare-price"
                                      style={{
                                        color:
                                          data?.settings?.discount
                                            ?.compare_price_color,
                                      }}
                                    >
                                      Rs. XX.XX
                                    </span>
                                    <span
                                      style={{
                                        color:
                                          data?.settings?.discount
                                            ?.selling_price_color,
                                      }}
                                    >
                                      {" "}
                                      Rs. YY.YY
                                    </span>
                                  </div>

                                  <div className="text-left prd-variant">
                                    {data?.settings?.product_options
                                      ?.enable_variant_section && (
                                      <div
                                        className="prd-variant-select"
                                        style={{
                                          width: data?.settings?.product_options
                                            ?.display_qty_picker
                                            ? ""
                                            : "100%",
                                        }}
                                      >
                                        <label className="mb-2">
                                          {
                                            data?.settings?.product_options
                                              ?.variant_selection_txt
                                          }
                                        </label>
                                        <select
                                          disabled
                                          className="form-select"
                                        ></select>
                                      </div>
                                    )}

                                    {data?.settings?.product_options
                                      ?.display_qty_picker && (
                                      <div className="prd-variant-qty">
                                        <label className="mb-2">
                                          {
                                            data?.settings?.product_options
                                              ?.qty_picker_txt
                                          }
                                        </label>
                                        <div className="qty-control">
                                          <button className="btn-left">
                                            -
                                          </button>
                                          <input
                                            type="number"
                                            min={1}
                                            max={100}
                                            value="1"
                                            disabled
                                          />
                                          <button className="btn-right">
                                            +
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  <div className="mt-2">
                                    <button
                                      className="btn btn-buy"
                                      style={{
                                        background:
                                          data?.settings?.buttons
                                            ?.accept_btn_bg_color,
                                        color:
                                          data?.settings?.buttons
                                            ?.accept_btn_color,
                                      }}
                                    >
                                      {data?.settings?.buttons?.accept_btn}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </Slider>
                </Row>

                {data?.settings?.timer?.add_timer &&
                  data?.settings?.timer?.selected_position ===
                    "above_view_btn" && (
                    <>
                      {data?.settings?.timer?.preview_offer ? (
                        <div
                          className="timer mt-2"
                          style={{
                            background: data?.settings?.timer?.timer_bg_color,
                            border:
                              "1px solid " +
                              data?.settings?.timer?.timer_border_color,
                          }}
                        >
                          {data?.settings?.timer?.selected_text_position ===
                            "above_timer" && (
                            <div className="d-flex align-items-center flex-column justify-content-center">
                              <h2
                                style={{
                                  color: data?.settings?.timer?.timer_color,
                                }}
                              >
                                {data?.settings?.timer?.timer_txt}
                              </h2>

                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    data?.settings?.timer?.timer_text_color,
                                }}
                              >
                                {data?.settings?.timer?.minutes}{" "}
                                {data?.settings?.timer?.minutes_txt}:
                                {data?.settings?.timer?.seconds}{" "}
                                {data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                          {data?.settings?.timer?.selected_text_position ===
                            "left_timer" && (
                            <div className="d-flex align-items-center justify-content-center">
                              <h2
                                style={{
                                  color: data?.settings?.timer?.timer_color,
                                }}
                              >
                                {data?.settings?.timer?.timer_txt}
                              </h2>

                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    data?.settings?.timer?.timer_text_color,
                                }}
                              >
                                {data?.settings?.timer?.minutes}{" "}
                                {data?.settings?.timer?.minutes_txt}:
                                {data?.settings?.timer?.seconds}{" "}
                                {data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                          {data?.settings?.timer?.selected_text_position ===
                            "right_timer" && (
                            <div className="d-flex align-items-center justify-content-center">
                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    data?.settings?.timer?.timer_text_color,
                                }}
                              >
                                {data?.settings?.timer?.minutes}{" "}
                                {data?.settings?.timer?.minutes_txt}:
                                {data?.settings?.timer?.seconds}{" "}
                                {data?.settings?.timer?.seconds_txt}
                              </span>
                              <h2
                                style={{
                                  color: data?.settings?.timer?.timer_color,
                                }}
                              >
                                {data?.settings?.timer?.timer_txt}
                              </h2>
                            </div>
                          )}
                          {data?.settings?.timer?.selected_text_position ===
                            "below_timer" && (
                            <div className="d-flex align-items-center flex-column-reverse justify-content-center">
                              <h2
                                style={{
                                  color: data?.settings?.timer?.timer_color,
                                }}
                              >
                                {data?.settings?.timer?.timer_txt}
                              </h2>
                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    data?.settings?.timer?.timer_text_color,
                                }}
                              >
                                {data?.settings?.timer?.minutes}{" "}
                                {data?.settings?.timer?.minutes_txt}:
                                {data?.settings?.timer?.seconds}{" "}
                                {data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data?.settings?.timer?.timer_expired_msg,
                          }}
                          className="mt-2 mb-2"
                        />
                      )}
                    </>
                  )}

                {data?.settings?.buttons?.show_view_all_btn && (
                  <div className="mt-2 text-center mb-2">
                    <a
                      href={
                        "https://crawlapps-trainee.myshopify.com" +
                        data?.settings?.buttons?.collection_redirect_url
                      }
                      style={{
                        backgroundColor:
                          data?.settings?.buttons?.view_btn_bg_color,
                        color: data?.settings?.buttons?.view_btn_color,
                      }}
                      className="btn"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View all
                    </a>
                  </div>
                )}

                {data?.settings?.timer?.add_timer &&
                  data?.settings?.timer?.selected_position ===
                    "below_view_btn" && (
                    <>
                      {data?.settings?.timer?.preview_offer ? (
                        <div
                          className="timer mt-2"
                          style={{
                            background: data?.settings?.timer?.timer_bg_color,
                            border:
                              "1px solid " +
                              data?.settings?.timer?.timer_border_color,
                          }}
                        >
                          {data?.settings?.timer?.selected_text_position ===
                            "above_timer" && (
                            <div className="d-flex align-items-center flex-column justify-content-center">
                              <h2
                                style={{
                                  color: data?.settings?.timer?.timer_color,
                                }}
                              >
                                {data?.settings?.timer?.timer_txt}
                              </h2>

                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    data?.settings?.timer?.timer_text_color,
                                }}
                              >
                                {data?.settings?.timer?.minutes}{" "}
                                {data?.settings?.timer?.minutes_txt}:
                                {data?.settings?.timer?.seconds}{" "}
                                {data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                          {data?.settings?.timer?.selected_text_position ===
                            "left_timer" && (
                            <div className="d-flex align-items-center justify-content-center">
                              <h2
                                style={{
                                  color: data?.settings?.timer?.timer_color,
                                }}
                              >
                                {data?.settings?.timer?.timer_txt}
                              </h2>

                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    data?.settings?.timer?.timer_text_color,
                                }}
                              >
                                {data?.settings?.timer?.minutes}{" "}
                                {data?.settings?.timer?.minutes_txt}:
                                {data?.settings?.timer?.seconds}{" "}
                                {data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                          {data?.settings?.timer?.selected_text_position ===
                            "right_timer" && (
                            <div className="d-flex align-items-center justify-content-center">
                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    data?.settings?.timer?.timer_text_color,
                                }}
                              >
                                {data?.settings?.timer?.minutes}{" "}
                                {data?.settings?.timer?.minutes_txt}:
                                {data?.settings?.timer?.seconds}{" "}
                                {data?.settings?.timer?.seconds_txt}
                              </span>
                              <h2
                                style={{
                                  color: data?.settings?.timer?.timer_color,
                                }}
                              >
                                {data?.settings?.timer?.timer_txt}
                              </h2>
                            </div>
                          )}
                          {data?.settings?.timer?.selected_text_position ===
                            "below_timer" && (
                            <div className="d-flex align-items-center flex-column-reverse justify-content-center">
                              <h2
                                style={{
                                  color: data?.settings?.timer?.timer_color,
                                }}
                              >
                                {data?.settings?.timer?.timer_txt}
                              </h2>
                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    data?.settings?.timer?.timer_text_color,
                                }}
                              >
                                {data?.settings?.timer?.minutes}{" "}
                                {data?.settings?.timer?.minutes_txt}:
                                {data?.settings?.timer?.seconds}{" "}
                                {data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data?.settings?.timer?.timer_expired_msg,
                          }}
                          className="mt-2 mb-2"
                        />
                      )}
                    </>
                  )}

                {data?.settings?.title?.selected_disp_widget ===
                  "below_widget" && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data?.settings?.title?.title,
                    }}
                    style={{
                      background: data?.settings?.title?.widget_title_bg_color,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="content-box section-element pl-15 mt-3 prd-recomm"
            id={section_data && section_data.row_section_id}
            onClick={(e) => {
              e.preventDefault();
              setSection("section4");
              setSelectedSection(section_data);
              window.scrollTo(0, 0);
              setSectionId(section_data?.row_section_id);
            }}
            ref={sectionRef}
          >
            <div className="section-content">
              <div className="content-box-row">
                {section_data?.settings?.title?.selected_disp_widget ===
                  "above_widget" && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: section_data?.settings?.title?.widget_title,
                    }}
                    style={{
                      background:
                        section_data?.settings?.title?.widget_title_bg_color,
                    }}
                  />
                )}

                {section_data?.settings?.timer?.add_timer &&
                  section_data?.settings?.timer?.selected_position ===
                    "above_title" && (
                    <>
                      {section_data?.settings?.timer?.preview_offer ? (
                        <div
                          className="timer mt-2"
                          style={{
                            background:
                              section_data?.settings?.timer?.timer_bg_color,
                            border:
                              "1px solid " +
                              section_data?.settings?.timer?.timer_border_color,
                          }}
                        >
                          {section_data?.settings?.timer
                            ?.selected_text_position === "above_timer" && (
                            <div className="d-flex align-items-center flex-column justify-content-center">
                              <h2
                                style={{
                                  color:
                                    section_data?.settings?.timer?.timer_color,
                                }}
                              >
                                {section_data?.settings?.timer?.timer_txt}
                              </h2>

                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    section_data?.settings?.timer
                                      ?.timer_text_color,
                                }}
                              >
                                {section_data?.settings?.timer?.minutes}{" "}
                                {section_data?.settings?.timer?.minutes_txt}:
                                {section_data?.settings?.timer?.seconds}{" "}
                                {section_data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                          {section_data?.settings?.timer
                            ?.selected_text_position === "left_timer" && (
                            <div className="d-flex align-items-center justify-content-center">
                              <h2
                                style={{
                                  color:
                                    section_data?.settings?.timer?.timer_color,
                                }}
                              >
                                {section_data?.settings?.timer?.timer_txt}
                              </h2>

                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    section_data?.settings?.timer
                                      ?.timer_text_color,
                                }}
                              >
                                {section_data?.settings?.timer?.minutes}{" "}
                                {section_data?.settings?.timer?.minutes_txt}:
                                {section_data?.settings?.timer?.seconds}{" "}
                                {section_data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                          {section_data?.settings?.timer
                            ?.selected_text_position === "right_timer" && (
                            <div className="d-flex align-items-center justify-content-center">
                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    section_data?.settings?.timer
                                      ?.timer_text_color,
                                }}
                              >
                                {section_data?.settings?.timer?.minutes}{" "}
                                {section_data?.settings?.timer?.minutes_txt}:
                                {section_data?.settings?.timer?.seconds}{" "}
                                {section_data?.settings?.timer?.seconds_txt}
                              </span>
                              <h2
                                style={{
                                  color:
                                    section_data?.settings?.timer?.timer_color,
                                }}
                              >
                                {section_data?.settings?.timer?.timer_txt}
                              </h2>
                            </div>
                          )}
                          {section_data?.settings?.timer
                            ?.selected_text_position === "below_timer" && (
                            <div className="d-flex align-items-center flex-column-reverse justify-content-center">
                              <h2
                                style={{
                                  color:
                                    section_data?.settings?.timer?.timer_color,
                                }}
                              >
                                {section_data?.settings?.timer?.timer_txt}
                              </h2>
                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    section_data?.settings?.timer
                                      ?.timer_text_color,
                                }}
                              >
                                {section_data?.settings?.timer?.minutes}{" "}
                                {section_data?.settings?.timer?.minutes_txt}:
                                {section_data?.settings?.timer?.seconds}{" "}
                                {section_data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              section_data?.settings?.timer?.timer_expired_msg,
                          }}
                          className="mt-2 mb-2"
                        />
                      )}
                    </>
                  )}

                <div
                  dangerouslySetInnerHTML={{
                    __html: section_data?.settings?.product_options?.title,
                  }}
                  className="mt-2 mb-2"
                />

                {section_data?.settings?.timer?.add_timer &&
                  section_data?.settings?.timer?.selected_position ===
                    "below_title" && (
                    <>
                      {section_data?.settings?.timer?.preview_offer ? (
                        <div
                          className="timer mt-2"
                          style={{
                            background:
                              section_data?.settings?.timer?.timer_bg_color,
                            border:
                              "1px solid " +
                              section_data?.settings?.timer?.timer_border_color,
                          }}
                        >
                          {section_data?.settings?.timer
                            ?.selected_text_position === "above_timer" && (
                            <div className="d-flex align-items-center flex-column justify-content-center">
                              <h2
                                style={{
                                  color:
                                    section_data?.settings?.timer?.timer_color,
                                }}
                              >
                                {section_data?.settings?.timer?.timer_txt}
                              </h2>

                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    section_data?.settings?.timer
                                      ?.timer_text_color,
                                }}
                              >
                                {section_data?.settings?.timer?.minutes}{" "}
                                {section_data?.settings?.timer?.minutes_txt}:
                                {section_data?.settings?.timer?.seconds}{" "}
                                {section_data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                          {section_data?.settings?.timer
                            ?.selected_text_position === "left_timer" && (
                            <div className="d-flex align-items-center justify-content-center">
                              <h2
                                style={{
                                  color:
                                    section_data?.settings?.timer?.timer_color,
                                }}
                              >
                                {section_data?.settings?.timer?.timer_txt}
                              </h2>

                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    section_data?.settings?.timer
                                      ?.timer_text_color,
                                }}
                              >
                                {section_data?.settings?.timer?.minutes}{" "}
                                {section_data?.settings?.timer?.minutes_txt}:
                                {section_data?.settings?.timer?.seconds}{" "}
                                {section_data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                          {section_data?.settings?.timer
                            ?.selected_text_position === "right_timer" && (
                            <div className="d-flex align-items-center justify-content-center">
                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    section_data?.settings?.timer
                                      ?.timer_text_color,
                                }}
                              >
                                {section_data?.settings?.timer?.minutes}{" "}
                                {section_data?.settings?.timer?.minutes_txt}:
                                {section_data?.settings?.timer?.seconds}{" "}
                                {section_data?.settings?.timer?.seconds_txt}
                              </span>
                              <h2
                                style={{
                                  color:
                                    section_data?.settings?.timer?.timer_color,
                                }}
                              >
                                {section_data?.settings?.timer?.timer_txt}
                              </h2>
                            </div>
                          )}
                          {section_data?.settings?.timer
                            ?.selected_text_position === "below_timer" && (
                            <div className="d-flex align-items-center flex-column-reverse justify-content-center">
                              <h2
                                style={{
                                  color:
                                    section_data?.settings?.timer?.timer_color,
                                }}
                              >
                                {section_data?.settings?.timer?.timer_txt}
                              </h2>
                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    section_data?.settings?.timer
                                      ?.timer_text_color,
                                }}
                              >
                                {section_data?.settings?.timer?.minutes}{" "}
                                {section_data?.settings?.timer?.minutes_txt}:
                                {section_data?.settings?.timer?.seconds}{" "}
                                {section_data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              section_data?.settings?.timer?.timer_expired_msg,
                          }}
                          className="mt-2 mb-2"
                        />
                      )}
                    </>
                  )}
                <Row className="mt-3 text-center">
                  <Slider {...settings}>
                    {sliderData.map((slider, i) => {
                      return (
                        <React.Fragment key={i}>
                          <div>
                            <Col lg={12} md={12} sm={12}>
                              <div className="productCard__container slider-card">
                                {section_data?.settings?.buttons
                                  ?.show_quick_view && (
                                  <>
                                    <div
                                      className="productCard__addToBasket"
                                      style={{
                                        background:
                                          section_data?.settings?.buttons
                                            ?.btn_bg_color,
                                        color:
                                          section_data?.settings?.buttons
                                            ?.btn_color,
                                      }}
                                    >
                                      <span>Quick view</span>
                                    </div>
                                    <div className="productCard__productImage">
                                      <img
                                        src="https://cdn.stilyoapps.com/v1/assets/img/placeholder.png"
                                        alt=""
                                        height={170}
                                        width={170}
                                      />
                                    </div>
                                  </>
                                )}

                                <div className="feature-coll">
                                  <h4>Product title</h4>

                                  {section_data?.settings?.product_options
                                    ?.show_product_vendor && (
                                    <h3 className="text-left">Vendor</h3>
                                  )}

                                  <div className="text-left mt-1">
                                    <span
                                      className="compare-price"
                                      style={{
                                        color:
                                          section_data?.settings?.discount
                                            ?.compare_price_color,
                                      }}
                                    >
                                      Rs. XX.XX
                                    </span>
                                    <span
                                      style={{
                                        color:
                                          section_data?.settings?.discount
                                            ?.selling_price_color,
                                      }}
                                    >
                                      {" "}
                                      Rs. YY.YY
                                    </span>
                                  </div>

                                  <div className="text-left prd-variant">
                                    {section_data?.settings?.product_options
                                      ?.enable_variant_section && (
                                      <div
                                        className="prd-variant-select"
                                        style={{
                                          width: section_data?.settings
                                            ?.product_options
                                            ?.display_qty_picker
                                            ? ""
                                            : "100%",
                                        }}
                                      >
                                        <label className="mb-2">
                                          {
                                            section_data?.settings
                                              ?.product_options
                                              ?.variant_selection_txt
                                          }
                                        </label>
                                        <select
                                          disabled
                                          className="form-select"
                                        ></select>
                                      </div>
                                    )}

                                    {section_data?.settings?.product_options
                                      ?.display_qty_picker && (
                                      <div className="prd-variant-qty">
                                        <label className="mb-2">
                                          {
                                            section_data?.settings
                                              ?.product_options?.qty_picker_txt
                                          }
                                        </label>
                                        <div className="qty-control">
                                          <button className="btn-left">
                                            -
                                          </button>
                                          <input
                                            type="number"
                                            min={1}
                                            max={100}
                                            value="1"
                                            disabled
                                          />
                                          <button className="btn-right">
                                            +
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  <div className="mt-2">
                                    <button
                                      className="btn btn-buy"
                                      style={{
                                        background:
                                          section_data?.settings?.buttons
                                            ?.accept_btn_bg_color,
                                        color:
                                          section_data?.settings?.buttons
                                            ?.accept_btn_color,
                                      }}
                                    >
                                      {
                                        section_data?.settings?.buttons
                                          ?.accept_btn
                                      }
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </Slider>
                </Row>

                {section_data?.settings?.timer?.add_timer &&
                  section_data?.settings?.timer?.selected_position ===
                    "above_view_btn" && (
                    <>
                      {section_data?.settings?.timer?.preview_offer ? (
                        <div
                          className="timer mt-2"
                          style={{
                            background:
                              section_data?.settings?.timer?.timer_bg_color,
                            border:
                              "1px solid " +
                              section_data?.settings?.timer?.timer_border_color,
                          }}
                        >
                          {section_data?.settings?.timer
                            ?.selected_text_position === "above_timer" && (
                            <div className="d-flex align-items-center flex-column justify-content-center">
                              <h2
                                style={{
                                  color:
                                    section_data?.settings?.timer?.timer_color,
                                }}
                              >
                                {section_data?.settings?.timer?.timer_txt}
                              </h2>

                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    section_data?.settings?.timer
                                      ?.timer_text_color,
                                }}
                              >
                                {section_data?.settings?.timer?.minutes}{" "}
                                {section_data?.settings?.timer?.minutes_txt}:
                                {section_data?.settings?.timer?.seconds}{" "}
                                {section_data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                          {section_data?.settings?.timer
                            ?.selected_text_position === "left_timer" && (
                            <div className="d-flex align-items-center justify-content-center">
                              <h2
                                style={{
                                  color:
                                    section_data?.settings?.timer?.timer_color,
                                }}
                              >
                                {section_data?.settings?.timer?.timer_txt}
                              </h2>

                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    section_data?.settings?.timer
                                      ?.timer_text_color,
                                }}
                              >
                                {section_data?.settings?.timer?.minutes}{" "}
                                {section_data?.settings?.timer?.minutes_txt}:
                                {section_data?.settings?.timer?.seconds}{" "}
                                {section_data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                          {section_data?.settings?.timer
                            ?.selected_text_position === "right_timer" && (
                            <div className="d-flex align-items-center justify-content-center">
                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    section_data?.settings?.timer
                                      ?.timer_text_color,
                                }}
                              >
                                {section_data?.settings?.timer?.minutes}{" "}
                                {section_data?.settings?.timer?.minutes_txt}:
                                {section_data?.settings?.timer?.seconds}{" "}
                                {section_data?.settings?.timer?.seconds_txt}
                              </span>
                              <h2
                                style={{
                                  color:
                                    section_data?.settings?.timer?.timer_color,
                                }}
                              >
                                {section_data?.settings?.timer?.timer_txt}
                              </h2>
                            </div>
                          )}
                          {section_data?.settings?.timer
                            ?.selected_text_position === "below_timer" && (
                            <div className="d-flex align-items-center flex-column-reverse justify-content-center">
                              <h2
                                style={{
                                  color:
                                    section_data?.settings?.timer?.timer_color,
                                }}
                              >
                                {section_data?.settings?.timer?.timer_txt}
                              </h2>
                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    section_data?.settings?.timer
                                      ?.timer_text_color,
                                }}
                              >
                                {section_data?.settings?.timer?.minutes}{" "}
                                {section_data?.settings?.timer?.minutes_txt}:
                                {section_data?.settings?.timer?.seconds}{" "}
                                {section_data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              section_data?.settings?.timer?.timer_expired_msg,
                          }}
                          className="mt-2 mb-2"
                        />
                      )}
                    </>
                  )}

                {section_data?.settings?.buttons?.show_view_all_btn && (
                  <div className="mt-2 text-center mb-2">
                    <a
                      href={
                        "https://crawlapps-trainee.myshopify.com" +
                        section_data?.settings?.buttons?.collection_redirect_url
                      }
                      style={{
                        backgroundColor:
                          section_data?.settings?.buttons?.view_btn_bg_color,
                        color: section_data?.settings?.buttons?.view_btn_color,
                      }}
                      className="btn"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View all
                    </a>
                  </div>
                )}

                {section_data?.settings?.timer?.add_timer &&
                  section_data?.settings?.timer?.selected_position ===
                    "below_view_btn" && (
                    <>
                      {section_data?.settings?.timer?.preview_offer ? (
                        <div
                          className="timer mt-2"
                          style={{
                            background:
                              section_data?.settings?.timer?.timer_bg_color,
                            border:
                              "1px solid " +
                              section_data?.settings?.timer?.timer_border_color,
                          }}
                        >
                          {section_data?.settings?.timer
                            ?.selected_text_position === "above_timer" && (
                            <div className="d-flex align-items-center flex-column justify-content-center">
                              <h2
                                style={{
                                  color:
                                    section_data?.settings?.timer?.timer_color,
                                }}
                              >
                                {section_data?.settings?.timer?.timer_txt}
                              </h2>

                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    section_data?.settings?.timer
                                      ?.timer_text_color,
                                }}
                              >
                                {section_data?.settings?.timer?.minutes}{" "}
                                {section_data?.settings?.timer?.minutes_txt}:
                                {section_data?.settings?.timer?.seconds}{" "}
                                {section_data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                          {section_data?.settings?.timer
                            ?.selected_text_position === "left_timer" && (
                            <div className="d-flex align-items-center justify-content-center">
                              <h2
                                style={{
                                  color:
                                    section_data?.settings?.timer?.timer_color,
                                }}
                              >
                                {section_data?.settings?.timer?.timer_txt}
                              </h2>

                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    section_data?.settings?.timer
                                      ?.timer_text_color,
                                }}
                              >
                                {section_data?.settings?.timer?.minutes}{" "}
                                {section_data?.settings?.timer?.minutes_txt}:
                                {section_data?.settings?.timer?.seconds}{" "}
                                {section_data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                          {section_data?.settings?.timer
                            ?.selected_text_position === "right_timer" && (
                            <div className="d-flex align-items-center justify-content-center">
                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    section_data?.settings?.timer
                                      ?.timer_text_color,
                                }}
                              >
                                {section_data?.settings?.timer?.minutes}{" "}
                                {section_data?.settings?.timer?.minutes_txt}:
                                {section_data?.settings?.timer?.seconds}{" "}
                                {section_data?.settings?.timer?.seconds_txt}
                              </span>
                              <h2
                                style={{
                                  color:
                                    section_data?.settings?.timer?.timer_color,
                                }}
                              >
                                {section_data?.settings?.timer?.timer_txt}
                              </h2>
                            </div>
                          )}
                          {section_data?.settings?.timer
                            ?.selected_text_position === "below_timer" && (
                            <div className="d-flex align-items-center flex-column-reverse justify-content-center">
                              <h2
                                style={{
                                  color:
                                    section_data?.settings?.timer?.timer_color,
                                }}
                              >
                                {section_data?.settings?.timer?.timer_txt}
                              </h2>
                              <span
                                className="counter mx-1"
                                style={{
                                  color:
                                    section_data?.settings?.timer
                                      ?.timer_text_color,
                                }}
                              >
                                {section_data?.settings?.timer?.minutes}{" "}
                                {section_data?.settings?.timer?.minutes_txt}:
                                {section_data?.settings?.timer?.seconds}{" "}
                                {section_data?.settings?.timer?.seconds_txt}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              section_data?.settings?.timer?.timer_expired_msg,
                          }}
                          className="mt-2 mb-2"
                        />
                      )}
                    </>
                  )}

                {section_data?.settings?.title?.selected_disp_widget ===
                  "below_widget" && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: section_data?.settings?.title?.title,
                    }}
                    style={{
                      background:
                        section_data?.settings?.title?.widget_title_bg_color,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RenderProductRecom;
