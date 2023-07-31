import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RenderProductUpsell = ({
  section_data,
  setSection,
  setSelectedSection,
  setSectionId,
  sectionRef,
}) => {
  const data = useSelector((state) => state.section_data);
  const [isEdit, setIsEdit] = useState(false);

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
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
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.settings?.title?.widget_title,
                  }}
                  className="mt-3"
                  style={{
                    display:
                      data?.settings?.title?.selected_disp_widget ===
                      "above_widget"
                        ? ""
                        : "none",
                    background: data?.settings?.title?.widget_title_bg_color,
                  }}
                />

                {data?.settings?.timer?.preview_offer ? (
                  <div
                    className="timer mt-2"
                    style={{
                      display:
                        data?.settings?.timer?.selected_position ===
                        "above_widget"
                          ? ""
                          : "none",
                      background: data?.settings?.timer?.timer_bg_color,
                      border:
                        "1px solid " +
                        data?.settings?.timer?.timer_border_color,
                    }}
                  >
                    {/* //! Above timer */}
                    <div
                      style={{
                        display:
                          data?.settings?.timer?.selected_text_position ===
                          "above_timer"
                            ? ""
                            : "none",
                      }}
                    >
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
                            color: data?.settings?.timer?.timer_text_color,
                          }}
                        >
                          {data?.settings?.timer?.minutes}{" "}
                          {data?.settings?.timer?.minutes_txt}:{" "}
                          {data?.settings?.timer?.seconds}{" "}
                          {data?.settings?.timer?.seconds_txt}
                        </span>
                      </div>
                    </div>

                    {/* //! left timer */}
                    <div
                      style={{
                        display:
                          data?.settings?.timer?.selected_text_position ===
                          "left_timer"
                            ? ""
                            : "none",
                      }}
                    >
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
                            color: data?.settings?.timer?.timer_text_color,
                          }}
                        >
                          {data?.settings?.timer?.minutes}{" "}
                          {data?.settings?.timer?.minutes_txt}:{" "}
                          {data?.settings?.timer?.seconds}{" "}
                          {data?.settings?.timer?.seconds_txt}
                        </span>
                      </div>
                    </div>
                    {/* //! Right timer */}
                    <div
                      style={{
                        display:
                          data?.settings?.timer?.selected_text_position ===
                          "right_timer"
                            ? ""
                            : "none",
                      }}
                    >
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
                            color: data?.settings?.timer?.timer_text_color,
                          }}
                        >
                          {data?.settings?.timer?.minutes}{" "}
                          {data?.settings?.timer?.minutes_txt}:{" "}
                          {data?.settings?.timer?.seconds}{" "}
                          {data?.settings?.timer?.seconds_txt}
                        </span>
                      </div>
                    </div>
                    {/* //! Below timer */}
                    <div
                      style={{
                        display:
                          data?.settings?.timer?.selected_text_position ===
                          "below_timer"
                            ? ""
                            : "none",
                      }}
                    >
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
                            color: data?.settings?.timer?.timer_text_color,
                          }}
                        >
                          {data?.settings?.timer?.minutes}{" "}
                          {data?.settings?.timer?.minutes_txt}:{" "}
                          {data?.settings?.timer?.seconds}{" "}
                          {data?.settings?.timer?.seconds_txt}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data?.settings?.timer?.timer_expired_msg,
                    }}
                    className="mt-2 mb-2"
                    style={{
                      display:
                        data?.settings?.timer?.selected_disp_widget ===
                        "above_widget"
                          ? ""
                          : "none",
                    }}
                  />
                )}

                <div
                  style={{
                    display:
                      data?.settings?.product_options?.selected_layout ===
                      "large"
                        ? ""
                        : "none",
                  }}
                >
                  {data?.settings?.product_options?.title ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.settings?.product_options?.title,
                      }}
                      className="mt-2 mb-3"
                    />
                  ) : (
                    <div className="mt-2 mb-3">Product title</div>
                  )}
                  <div
                    style={{
                      width: "100%",
                      display: "inline-block",
                    }}
                  >
                    <img
                      src="https://cdn.stilyoapps.com/v1/assets/img/placeholder.png"
                      alt=""
                    />
                  </div>

                  <div className="mt-2">
                    <div
                      style={{
                        display: data?.settings?.product_options
                          ?.show_product_vendor
                          ? ""
                          : "none",
                      }}
                    >
                      Vendor
                    </div>

                    <span
                      style={{
                        display: data?.settings?.discount?.display_compare_price
                          ? ""
                          : "none",
                        fontSize:
                          data?.settings?.discount?.compare_price_fs_price +
                          "px",
                        color: data?.settings?.discount?.compare_price_color,
                      }}
                      className={
                        data?.settings?.discount?.display_product_price
                          ? "compare-price"
                          : ""
                      }
                    >
                      Rs. XX.XX
                    </span>
                    <span
                      style={{
                        display: data?.settings?.discount?.display_product_price
                          ? ""
                          : "none",
                        fontSize:
                          data?.settings?.discount?.product_price_fs_price +
                          "px",
                        color: data?.settings?.discount?.product_price_color,
                      }}
                    >
                      {" "}
                      Rs. ZZ.ZZ
                    </span>

                    <div className="row mt-3">
                      <div
                        className="col"
                        style={{
                          display: data?.settings?.product_options
                            ?.display_qty_picker
                            ? ""
                            : "none",
                        }}
                      >
                        {data?.settings?.product_options?.qty_picker_txt}
                        <div className="qty-control mt-1">
                          <button className="btn-left">-</button>
                          <input
                            type="number"
                            min={1}
                            max={100}
                            value="1"
                            disabled
                          />
                          <button className="btn-right">+</button>
                        </div>
                      </div>
                      <div className="col">
                        <select disabled className="form-select mt-4"></select>
                      </div>
                    </div>

                    <div className="mt-2">
                      <a
                        className="btn"
                        style={{
                          width: "100%",
                          background: data?.settings?.buttons?.btn_bg_color,
                          color: data?.settings?.buttons?.btn_color,
                        }}
                      >
                        {data?.settings?.buttons?.btn_text}
                      </a>
                    </div>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.settings?.product_options?.product_des,
                      }}
                      style={{
                        display: data?.settings?.product_options
                          ?.display_description
                          ? ""
                          : "none",
                      }}
                      className="mt-2"
                    />
                  </div>
                </div>
                <div
                  className="row"
                  style={{
                    display:
                      data?.settings?.product_options?.selected_layout ===
                      "medium"
                        ? ""
                        : "none",
                  }}
                >
                  <div className="col-sm-3 col-md-3 col-lg-3">
                    <div
                      className="mt-2 prd_thumbnail"
                      style={{
                        width: 128,
                        height: 128,
                      }}
                    >
                      <div className="thumbnail_wrap">
                        <img
                          src="https://cdn.stilyoapps.com/v1/assets/img/placeholder.png"
                          alt=""
                          style={{
                            width: 128,
                            height: 128,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-8 col-md-8 col-lg-8 mx-3">
                    {data?.settings?.product_options?.title ? (
                      <div
                        className="mt-4"
                        dangerouslySetInnerHTML={{
                          __html: data?.settings?.product_options?.title,
                        }}
                      />
                    ) : (
                      <div className="mt-4">Product title</div>
                    )}
                    <div className="mt-2">
                      <span
                        style={{
                          display: data?.settings?.discount
                            ?.display_compare_price
                            ? ""
                            : "none",
                          fontSize:
                            data?.settings?.discount?.compare_price_fs_price +
                            "px",
                          color: data?.settings?.discount?.compare_price_color,
                        }}
                        className={
                          data?.settings?.discount?.display_product_price
                            ? "compare-price"
                            : ""
                        }
                      >
                        Rs. XX.XX
                      </span>
                      <span
                        style={{
                          display: data?.settings?.discount
                            ?.display_product_price
                            ? ""
                            : "none",
                          fontSize:
                            data?.settings?.discount?.product_price_fs_price +
                            "px",
                          color: data?.settings?.discount?.product_price_color,
                        }}
                      >
                        {" "}
                        Rs. ZZ.ZZ
                      </span>
                      <div className="row mt-3">
                        <div
                          className="col"
                          style={{
                            display: data?.settings?.product_options
                              ?.display_qty_picker
                              ? ""
                              : "none",
                          }}
                        >
                          <select className="form-select">
                            <option value="" selected>
                              {data?.settings?.product_options?.qty_picker_txt}
                            </option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                          </select>
                        </div>
                        <div className="col">
                          <select disabled className="form-select"></select>
                        </div>
                        <div className="col">
                          <a
                            className="btn"
                            style={{
                              background: data?.settings?.buttons?.btn_bg_color,
                              color: data?.settings?.buttons?.btn_color,
                            }}
                          >
                            {data?.settings?.buttons?.btn_text}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="row"
                  style={{
                    display:
                      data?.settings?.product_options?.selected_layout ===
                      "small"
                        ? ""
                        : "none",
                  }}
                >
                  <div className="col-sm-2 col-md-2 col-lg-2">
                    <div className="mt-2 prd_thumbnail">
                      <div className="thumbnail_wrap">
                        <img
                          src="https://cdn.stilyoapps.com/v1/assets/img/placeholder.png"
                          alt=""
                          style={{
                            width: "4.6em",
                            height: "4.6em",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4">
                    {data?.settings?.product_options?.title ? (
                      <div
                        className="mt-2"
                        dangerouslySetInnerHTML={{
                          __html: data?.settings?.product_options?.title,
                        }}
                      />
                    ) : (
                      <div className="mt-2">Product title</div>
                    )}
                    <div className="mt-2">
                      <span
                        style={{
                          display: data?.settings?.discount
                            ?.display_compare_price
                            ? ""
                            : "none",
                          fontSize:
                            data?.settings?.discount?.compare_price_fs_price +
                            "px",
                          color: data?.settings?.discount?.compare_price_color,
                        }}
                        className={
                          data?.settings?.discount?.display_product_price
                            ? "compare-price"
                            : ""
                        }
                      >
                        Rs. XX.XX
                      </span>
                      <span
                        style={{
                          display: data?.settings?.discount
                            ?.display_product_price
                            ? ""
                            : "none",
                          fontSize:
                            data?.settings?.discount?.product_price_fs_price +
                            "px",
                          color: data?.settings?.discount?.product_price_color,
                        }}
                      >
                        {" "}
                        Rs. ZZ.ZZ
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="row mt-3">
                      <div className="col">
                        <select disabled className="form-select"></select>
                      </div>
                      <div className="col">
                        <a
                          className="btn"
                          style={{
                            background: data?.settings?.buttons?.btn_bg_color,
                            color: data?.settings?.buttons?.btn_color,
                          }}
                        >
                          {data?.settings?.buttons?.btn_text}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {data?.settings?.timer?.preview_offer ? (
                  <div
                    className="timer mt-5"
                    style={{
                      display:
                        data?.settings?.timer?.selected_position ===
                        "below_widget"
                          ? ""
                          : "none",
                      background: data?.settings?.timer?.timer_bg_color,
                      border:
                        "1px solid " +
                        data?.settings?.timer?.timer_border_color,
                    }}
                  >
                    {/* //! Above timer */}
                    <div
                      style={{
                        display:
                          data?.settings?.timer?.selected_text_position ===
                          "above_timer"
                            ? ""
                            : "none",
                      }}
                    >
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
                            color: data?.settings?.timer?.timer_text_color,
                          }}
                        >
                          {data?.settings?.timer?.minutes}{" "}
                          {data?.settings?.timer?.minutes_txt}:{" "}
                          {data?.settings?.timer?.seconds}{" "}
                          {data?.settings?.timer?.seconds_txt}
                        </span>
                      </div>
                    </div>

                    {/* //! left timer */}
                    <div
                      style={{
                        display:
                          data?.settings?.timer?.selected_text_position ===
                          "left_timer"
                            ? ""
                            : "none",
                      }}
                    >
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
                            color: data?.settings?.timer?.timer_text_color,
                          }}
                        >
                          {data?.settings?.timer?.minutes}{" "}
                          {data?.settings?.timer?.minutes_txt}:{" "}
                          {data?.settings?.timer?.seconds}{" "}
                          {data?.settings?.timer?.seconds_txt}
                        </span>
                      </div>
                    </div>
                    {/* //! Right timer */}
                    <div
                      style={{
                        display:
                          data?.settings?.timer?.selected_text_position ===
                          "right_timer"
                            ? ""
                            : "none",
                      }}
                    >
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
                            color: data?.settings?.timer?.timer_text_color,
                          }}
                        >
                          {data?.settings?.timer?.minutes}{" "}
                          {data?.settings?.timer?.minutes_txt}:{" "}
                          {data?.settings?.timer?.seconds}{" "}
                          {data?.settings?.timer?.seconds_txt}
                        </span>
                      </div>
                    </div>
                    {/* //! Below timer */}
                    <div
                      style={{
                        display:
                          data?.settings?.timer?.selected_text_position ===
                          "below_timer"
                            ? ""
                            : "none",
                      }}
                    >
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
                            color: data?.settings?.timer?.timer_text_color,
                          }}
                        >
                          {data?.settings?.timer?.minutes}{" "}
                          {data?.settings?.timer?.minutes_txt}:{" "}
                          {data?.settings?.timer?.seconds}{" "}
                          {data?.settings?.timer?.seconds_txt}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data?.settings?.timer?.timer_expired_msg,
                    }}
                    className="mt-2 mb-2"
                    style={{
                      display:
                        data?.settings?.timer?.selected_disp_widget ===
                        "below_widget"
                          ? ""
                          : "none",
                    }}
                  />
                )}

                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.settings?.title?.widget_title,
                  }}
                  className="mt-3"
                  style={{
                    display:
                      data?.settings?.title?.selected_disp_widget ===
                      "below_widget"
                        ? ""
                        : "none",
                    background: data?.settings?.title?.widget_title_bg_color,
                  }}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="content-box section-element pl-15 mt-3 prd-recomm"
            id={section_data?.row_section_id}
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
                <div
                  dangerouslySetInnerHTML={{
                    __html: section_data?.settings?.title?.widget_title,
                  }}
                  className="mt-3"
                  style={{
                    display:
                      section_data?.settings?.title?.selected_disp_widget ===
                      "above_widget"
                        ? ""
                        : "none",
                    background:
                      section_data?.settings?.title?.widget_title_bg_color,
                  }}
                />

                {section_data?.settings?.timer?.preview_offer ? (
                  <div
                    className="timer mt-2"
                    style={{
                      display:
                        section_data?.settings?.timer?.selected_position ===
                        "above_widget"
                          ? ""
                          : "none",
                      background: section_data?.settings?.timer?.timer_bg_color,
                      border:
                        "1px solid " +
                        section_data?.settings?.timer?.timer_border_color,
                    }}
                  >
                    {/* //! Above timer */}
                    <div
                      style={{
                        display:
                          section_data?.settings?.timer
                            ?.selected_text_position === "above_timer"
                            ? ""
                            : "none",
                      }}
                    >
                      <div className="d-flex align-items-center flex-column justify-content-center">
                        <h2
                          style={{
                            color: section_data?.settings?.timer?.timer_color,
                          }}
                        >
                          {section_data?.settings?.timer?.timer_txt}
                        </h2>

                        <span
                          className="counter mx-1"
                          style={{
                            color:
                              section_data?.settings?.timer?.timer_text_color,
                          }}
                        >
                          {section_data?.settings?.timer?.minutes}{" "}
                          {section_data?.settings?.timer?.minutes_txt}:{" "}
                          {section_data?.settings?.timer?.seconds}{" "}
                          {section_data?.settings?.timer?.seconds_txt}
                        </span>
                      </div>
                    </div>

                    {/* //! left timer */}
                    <div
                      style={{
                        display:
                          section_data?.settings?.timer
                            ?.selected_text_position === "left_timer"
                            ? ""
                            : "none",
                      }}
                    >
                      <div className="d-flex align-items-center flex-column justify-content-center">
                        <h2
                          style={{
                            color: section_data?.settings?.timer?.timer_color,
                          }}
                        >
                          {section_data?.settings?.timer?.timer_txt}
                        </h2>

                        <span
                          className="counter mx-1"
                          style={{
                            color:
                              section_data?.settings?.timer?.timer_text_color,
                          }}
                        >
                          {section_data?.settings?.timer?.minutes}{" "}
                          {section_data?.settings?.timer?.minutes_txt}:{" "}
                          {section_data?.settings?.timer?.seconds}{" "}
                          {section_data?.settings?.timer?.seconds_txt}
                        </span>
                      </div>
                    </div>
                    {/* //! Right timer */}
                    <div
                      style={{
                        display:
                          section_data?.settings?.timer
                            ?.selected_text_position === "right_timer"
                            ? ""
                            : "none",
                      }}
                    >
                      <div className="d-flex align-items-center flex-column justify-content-center">
                        <h2
                          style={{
                            color: section_data?.settings?.timer?.timer_color,
                          }}
                        >
                          {section_data?.settings?.timer?.timer_txt}
                        </h2>

                        <span
                          className="counter mx-1"
                          style={{
                            color:
                              section_data?.settings?.timer?.timer_text_color,
                          }}
                        >
                          {section_data?.settings?.timer?.minutes}{" "}
                          {section_data?.settings?.timer?.minutes_txt}:{" "}
                          {section_data?.settings?.timer?.seconds}{" "}
                          {section_data?.settings?.timer?.seconds_txt}
                        </span>
                      </div>
                    </div>
                    {/* //! Below timer */}
                    <div
                      style={{
                        display:
                          section_data?.settings?.timer
                            ?.selected_text_position === "below_timer"
                            ? ""
                            : "none",
                      }}
                    >
                      <div className="d-flex align-items-center flex-column justify-content-center">
                        <h2
                          style={{
                            color: section_data?.settings?.timer?.timer_color,
                          }}
                        >
                          {section_data?.settings?.timer?.timer_txt}
                        </h2>

                        <span
                          className="counter mx-1"
                          style={{
                            color:
                              section_data?.settings?.timer?.timer_text_color,
                          }}
                        >
                          {section_data?.settings?.timer?.minutes}{" "}
                          {section_data?.settings?.timer?.minutes_txt}:{" "}
                          {section_data?.settings?.timer?.seconds}{" "}
                          {section_data?.settings?.timer?.seconds_txt}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: section_data?.settings?.timer?.timer_expired_msg,
                    }}
                    className="mt-2 mb-2"
                    style={{
                      display:
                        section_data?.settings?.timer?.selected_disp_widget ===
                        "above_widget"
                          ? ""
                          : "none",
                    }}
                  />
                )}

                <div
                  style={{
                    display:
                      section_data?.settings?.product_options
                        ?.selected_layout === "large"
                        ? ""
                        : "none",
                  }}
                >
                  {section_data?.settings?.product_options?.title ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: section_data?.settings?.product_options?.title,
                      }}
                      className="mt-2 mb-3"
                    />
                  ) : (
                    <div className="mt-2 mb-3">Product title</div>
                  )}
                  <div
                    style={{
                      width: "100%",
                      display: "inline-block",
                    }}
                  >
                    <img
                      src="https://cdn.stilyoapps.com/v1/assets/img/placeholder.png"
                      alt=""
                    />
                  </div>

                  <div className="mt-2">
                    <div
                      style={{
                        display: section_data?.settings?.product_options
                          ?.show_product_vendor
                          ? ""
                          : "none",
                      }}
                    >
                      Vendor
                    </div>

                    <span
                      style={{
                        display: section_data?.settings?.discount
                          ?.display_compare_price
                          ? ""
                          : "none",
                        fontSize:
                          section_data?.settings?.discount
                            ?.compare_price_fs_price + "px",
                        color:
                          section_data?.settings?.discount?.compare_price_color,
                      }}
                      className={
                        section_data?.settings?.discount?.display_product_price
                          ? "compare-price"
                          : ""
                      }
                    >
                      Rs. XX.XX
                    </span>
                    <span
                      style={{
                        display: section_data?.settings?.discount
                          ?.display_product_price
                          ? ""
                          : "none",
                        fontSize:
                          section_data?.settings?.discount
                            ?.product_price_fs_price + "px",
                        color:
                          section_data?.settings?.discount?.product_price_color,
                      }}
                    >
                      {" "}
                      Rs. ZZ.ZZ
                    </span>

                    <div className="row mt-3">
                      <div
                        className="col"
                        style={{
                          display: section_data?.settings?.product_options
                            ?.display_qty_picker
                            ? ""
                            : "none",
                        }}
                      >
                        {
                          section_data?.settings?.product_options
                            ?.qty_picker_txt
                        }
                        <div className="qty-control mt-1">
                          <button className="btn-left">-</button>
                          <input
                            type="number"
                            min={1}
                            max={100}
                            value="1"
                            disabled
                          />
                          <button className="btn-right">+</button>
                        </div>
                      </div>
                      <div className="col">
                        <select disabled className="form-select mt-4"></select>
                      </div>
                    </div>

                    <div className="mt-2">
                      <a
                        className="btn"
                        style={{
                          width: "100%",
                          background:
                            section_data?.settings?.buttons?.btn_bg_color,
                          color: section_data?.settings?.buttons?.btn_color,
                        }}
                      >
                        {section_data?.settings?.buttons?.btn_text}
                      </a>
                    </div>

                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          section_data?.settings?.product_options?.product_des,
                      }}
                      style={{
                        display: section_data?.settings?.product_options
                          ?.display_description
                          ? ""
                          : "none",
                      }}
                      className="mt-2"
                    />
                  </div>
                </div>
                <div
                  className="row"
                  style={{
                    display:
                      section_data?.settings?.product_options
                        ?.selected_layout === "medium"
                        ? ""
                        : "none",
                  }}
                >
                  <div className="col-sm-3 col-md-3 col-lg-3">
                    <div
                      className="mt-2 prd_thumbnail"
                      style={{
                        width: 128,
                        height: 128,
                      }}
                    >
                      <div className="thumbnail_wrap">
                        <img
                          src="https://cdn.stilyoapps.com/v1/assets/img/placeholder.png"
                          alt=""
                          style={{
                            width: 128,
                            height: 128,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-8 col-md-8 col-lg-8 mx-3">
                    {section_data?.settings?.product_options?.title ? (
                      <div
                        className="mt-4"
                        dangerouslySetInnerHTML={{
                          __html:
                            section_data?.settings?.product_options?.title,
                        }}
                      />
                    ) : (
                      <div className="mt-4">Product title</div>
                    )}
                    <div className="mt-2">
                      <span
                        style={{
                          display: section_data?.settings?.discount
                            ?.display_compare_price
                            ? ""
                            : "none",
                          fontSize:
                            section_data?.settings?.discount
                              ?.compare_price_fs_price + "px",
                          color:
                            section_data?.settings?.discount
                              ?.compare_price_color,
                        }}
                        className={
                          section_data?.settings?.discount
                            ?.display_product_price
                            ? "compare-price"
                            : ""
                        }
                      >
                        Rs. XX.XX
                      </span>
                      <span
                        style={{
                          display: section_data?.settings?.discount
                            ?.display_product_price
                            ? ""
                            : "none",
                          fontSize:
                            section_data?.settings?.discount
                              ?.product_price_fs_price + "px",
                          color:
                            section_data?.settings?.discount
                              ?.product_price_color,
                        }}
                      >
                        {" "}
                        Rs. ZZ.ZZ
                      </span>
                      <div className="row mt-3">
                        <div
                          className="col"
                          style={{
                            display: section_data?.settings?.product_options
                              ?.display_qty_picker
                              ? ""
                              : "none",
                          }}
                        >
                          <select className="form-select">
                            <option value="" selected>
                              {
                                section_data?.settings?.product_options
                                  ?.qty_picker_txt
                              }
                            </option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                          </select>
                        </div>
                        <div className="col">
                          <select disabled className="form-select"></select>
                        </div>
                        <div className="col">
                          <a
                            className="btn"
                            style={{
                              background:
                                section_data?.settings?.buttons?.btn_bg_color,
                              color: section_data?.settings?.buttons?.btn_color,
                            }}
                          >
                            {section_data?.settings?.buttons?.btn_text}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="row"
                  style={{
                    display:
                      section_data?.settings?.product_options
                        ?.selected_layout === "small"
                        ? ""
                        : "none",
                  }}
                >
                  <div className="col-sm-2 col-md-2 col-lg-2">
                    <div className="mt-2 prd_thumbnail">
                      <div className="thumbnail_wrap">
                        <img
                          src="https://cdn.stilyoapps.com/v1/assets/img/placeholder.png"
                          alt=""
                          style={{
                            width: "4.6em",
                            height: "4.6em",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4">
                    {section_data?.settings?.product_options?.title ? (
                      <div
                        className="mt-2"
                        dangerouslySetInnerHTML={{
                          __html:
                            section_data?.settings?.product_options?.title,
                        }}
                      />
                    ) : (
                      <div className="mt-2">Product title</div>
                    )}
                    <div className="mt-2">
                      <span
                        style={{
                          display: section_data?.settings?.discount
                            ?.display_compare_price
                            ? ""
                            : "none",
                          fontSize:
                            section_data?.settings?.discount
                              ?.compare_price_fs_price + "px",
                          color:
                            section_data?.settings?.discount
                              ?.compare_price_color,
                        }}
                        className={
                          section_data?.settings?.discount
                            ?.display_product_price
                            ? "compare-price"
                            : ""
                        }
                      >
                        Rs. XX.XX
                      </span>
                      <span
                        style={{
                          display: section_data?.settings?.discount
                            ?.display_product_price
                            ? ""
                            : "none",
                          fontSize:
                            section_data?.settings?.discount
                              ?.product_price_fs_price + "px",
                          color:
                            section_data?.settings?.discount
                              ?.product_price_color,
                        }}
                      >
                        {" "}
                        Rs. ZZ.ZZ
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="row mt-3">
                      <div className="col">
                        <select disabled className="form-select"></select>
                      </div>
                      <div className="col">
                        <a
                          className="btn"
                          style={{
                            background:
                              section_data?.settings?.buttons?.btn_bg_color,
                            color: section_data?.settings?.buttons?.btn_color,
                          }}
                        >
                          {section_data?.settings?.buttons?.btn_text}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {section_data?.settings?.timer?.preview_offer ? (
                  <div
                    className="timer mt-5"
                    style={{
                      display:
                        section_data?.settings?.timer?.selected_position ===
                        "below_widget"
                          ? ""
                          : "none",
                      background: section_data?.settings?.timer?.timer_bg_color,
                      border:
                        "1px solid " +
                        section_data?.settings?.timer?.timer_border_color,
                    }}
                  >
                    {/* //! Above timer */}
                    <div
                      style={{
                        display:
                          section_data?.settings?.timer
                            ?.selected_text_position === "above_timer"
                            ? ""
                            : "none",
                      }}
                    >
                      <div className="d-flex align-items-center flex-column justify-content-center">
                        <h2
                          style={{
                            color: section_data?.settings?.timer?.timer_color,
                          }}
                        >
                          {section_data?.settings?.timer?.timer_txt}
                        </h2>

                        <span
                          className="counter mx-1"
                          style={{
                            color:
                              section_data?.settings?.timer?.timer_text_color,
                          }}
                        >
                          {section_data?.settings?.timer?.minutes}{" "}
                          {section_data?.settings?.timer?.minutes_txt}:{" "}
                          {section_data?.settings?.timer?.seconds}{" "}
                          {section_data?.settings?.timer?.seconds_txt}
                        </span>
                      </div>
                    </div>

                    {/* //! left timer */}
                    <div
                      style={{
                        display:
                          section_data?.settings?.timer
                            ?.selected_text_position === "left_timer"
                            ? ""
                            : "none",
                      }}
                    >
                      <div className="d-flex align-items-center flex-column justify-content-center">
                        <h2
                          style={{
                            color: section_data?.settings?.timer?.timer_color,
                          }}
                        >
                          {section_data?.settings?.timer?.timer_txt}
                        </h2>

                        <span
                          className="counter mx-1"
                          style={{
                            color:
                              section_data?.settings?.timer?.timer_text_color,
                          }}
                        >
                          {section_data?.settings?.timer?.minutes}{" "}
                          {section_data?.settings?.timer?.minutes_txt}:{" "}
                          {section_data?.settings?.timer?.seconds}{" "}
                          {section_data?.settings?.timer?.seconds_txt}
                        </span>
                      </div>
                    </div>
                    {/* //! Right timer */}
                    <div
                      style={{
                        display:
                          section_data?.settings?.timer
                            ?.selected_text_position === "right_timer"
                            ? ""
                            : "none",
                      }}
                    >
                      <div className="d-flex align-items-center flex-column justify-content-center">
                        <h2
                          style={{
                            color: section_data?.settings?.timer?.timer_color,
                          }}
                        >
                          {section_data?.settings?.timer?.timer_txt}
                        </h2>

                        <span
                          className="counter mx-1"
                          style={{
                            color:
                              section_data?.settings?.timer?.timer_text_color,
                          }}
                        >
                          {section_data?.settings?.timer?.minutes}{" "}
                          {section_data?.settings?.timer?.minutes_txt}:{" "}
                          {section_data?.settings?.timer?.seconds}{" "}
                          {section_data?.settings?.timer?.seconds_txt}
                        </span>
                      </div>
                    </div>
                    {/* //! Below timer */}
                    <div
                      style={{
                        display:
                          section_data?.settings?.timer
                            ?.selected_text_position === "below_timer"
                            ? ""
                            : "none",
                      }}
                    >
                      <div className="d-flex align-items-center flex-column justify-content-center">
                        <h2
                          style={{
                            color: section_data?.settings?.timer?.timer_color,
                          }}
                        >
                          {section_data?.settings?.timer?.timer_txt}
                        </h2>

                        <span
                          className="counter mx-1"
                          style={{
                            color:
                              section_data?.settings?.timer?.timer_text_color,
                          }}
                        >
                          {section_data?.settings?.timer?.minutes}{" "}
                          {section_data?.settings?.timer?.minutes_txt}:{" "}
                          {section_data?.settings?.timer?.seconds}{" "}
                          {section_data?.settings?.timer?.seconds_txt}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: section_data?.settings?.timer?.timer_expired_msg,
                    }}
                    className="mt-2 mb-2"
                    style={{
                      display:
                        section_data?.settings?.timer?.selected_disp_widget ===
                        "below_widget"
                          ? ""
                          : "none",
                    }}
                  />
                )}

                <div
                  dangerouslySetInnerHTML={{
                    __html: section_data?.settings?.title?.widget_title,
                  }}
                  className="mt-3"
                  style={{
                    display:
                      section_data?.settings?.title?.selected_disp_widget ===
                      "below_widget"
                        ? ""
                        : "none",
                    background:
                      section_data?.settings?.title?.widget_title_bg_color,
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RenderProductUpsell;
