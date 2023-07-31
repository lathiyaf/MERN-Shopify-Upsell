var html = document.querySelector(".placeholder");
html.classList.remove("placeholder");

var shop,
  customer_id,
  order_id,
  order_name,
  page_name,
  cartProductIdArr,
  money_format,
  featureProductPrice,
  featureProductRowsSettings,
  js_variant_arr,
  script,
  current_script_url = document.currentScript.src,
  domain_name = current_script_url
    .replace("http://", "")
    .replace("https://", "")
    .split(/[/?#]/)[0],
  jQueryRCT = null,
  CustomerApiDataObj = {},
  selected_page_id = null,
  store_id = null,
  funnel_id = null,
  rows_products = {},
  rows_alt_products = {},
  shopInfo = {},
  ASSETS_URL = "https://upsell.crawlapps.com/",
  selected = 0,
  order_data = null,
  customer_name,
  submit_survey,
  is_time_over = false,
  time = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

function init() {
  console.log("init==================", Shopify.checkout);
  var e;
  null != Shopify.checkout &&
    null != Shopify.checkout.order_id &&
    (shop = Shopify.shop),
    null != Shopify.checkout.shipping_address
      ? (customer_name =
          Shopify.checkout.shipping_address.first_name +
          " " +
          Shopify.checkout.shipping_address.last_name)
      : null != Shopify.checkout.billing_address &&
        (customer_name =
          Shopify.checkout.billing_address.first_name +
          " " +
          Shopify.checkout.billing_address.last_name),
    (customer_id = Shopify.checkout.customer_id),
    (order_data = Shopify.checkout),
    (order_id = Shopify.checkout.order_id),
    (store_id = RCTgetParameterByName("scid", current_script_url)),
    (e = document.createElement("SCRIPT")),
    document.getElementsByTagName("head")[0].appendChild(e),
    (e.async = !0),
    (e.src = "https://kit.fontawesome.com/4339195cc6.js"),
    (e.type = "text/javascript"),
    upsell();

  // jQueryRCT(document).ready(function ($) {
  //   $(".slider").slick({
  //     dots: false,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 3,
  //     slidesToScroll: 1,
  //     autoplay: true,
  //     autoplaySpeed: 2000,
  //     arrows: true,
  //   });
  // });
}

function upsell(e) {
  var t = jQueryRCT(location).attr("href"),
    r =
      ((e = null == e ? "" : e),
      jQueryRCT(".content-box:first").addClass("order_confirmation"),
      jQueryRCT(".content-box:first").attr("id", "1"),
      jQueryRCT(".content-box:last").addClass("customer_information"),
      jQueryRCT(".content-box:last").attr("id", "2"),
      "localhost" === location.hostname || "127.0.0.1" === location.hostname
        ? RCTLoadStyle(ASSETS_URL + "static/product.css")
        : RCTLoadStyle(ASSETS_URL + "static/product.css"),
      RCTLoadStyle(
        "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      ),
      RCTLoadStyle(
        "https://fonts.googleapis.com/css?family=Concert+One|Lato|Lora|Montserrat|Noto+Sans|Nunito+Sans|Open+Sans|Oswald|PT+Sans|Prompt|Raleway|Roboto|Slabo+27px|Source+Sans+Pro|Work+Sans&display=swap"
      ),
      RCTLoadStyle(
        "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      ),
      RCTLoadStyle(
        "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      ),
      RCTLoadStyle(
        "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      ),
      {}),
    i =
      ((r.action = "upsell"),
      (r.customer_id = customer_id),
      (r.order_id = order_id),
      (r.triggerBase = e),
      (r.order_detail = Shopify.checkout),
      (r.shopInfo = shopInfo),
      (r.currentUrl = t),
      (r.shop = shop),
      (r.payNow = jQueryRCT(".notice .notice__content a").text()),
      jQueryRCT.post(ASSETS_URL + "api/thank_you", r, function (e) {
        // console.log("e================", e);
        var t = JSON.parse(JSON.stringify(e && e.data && e.data.data));
        if (void 0 === t.result || "fail" != t.result) {
          (shopInfo.funnel_id = t?.thankyou_data[0]?.funnel_id),
            (funnel_id = t?.thankyou_data[0]?.funnel_id),
            (order_name = t?.order_data?.name),
            t.order_data &&
              ((Shopify.checkout.line_items = t.order_data.line_items),
              (Shopify.checkout.discount_applications =
                t.order_data.discount_applications),
              (Shopify.checkout.order_status_url =
                t.order_data.order_status_url),
              (Shopify.checkout.tags = t.order_data.tags),
              (Shopify.checkout.fulfillment_status =
                t?.order_data?.fulfillment_status || ""),
              (Shopify.checkout.payment_gateway_names =
                t?.order_data?.payment_gateway_names || []),
              (Shopify.checkout.processing_method =
                t?.order_data?.processing_method || "")),
            (cartProductIdArr = arrayColumn(
              Shopify.checkout.line_items,
              "product_id"
            )),
            (selected_page_id = t.template_id),
            (null != customer_id && null != Shopify.checkout.customer_id) ||
              (customer_id = Shopify.checkout.customer_id = t.customer_id),
            (submit_survey = t.surveyData);
          function r(e) {
            let tyData = t.thankyou_data[0]?.section_data;
            let leftArea = tyData.filter((item) => item.area === "left");
            let rightArea = tyData.filter((item) => item.area === "right");
            let headerArea = tyData.filter((item) => item.area === "general");

            if (leftArea.length > 0) {
              leftArea?.map((ty, index) => {
                DonateUkraine(ty, leftArea, index);
                birthdayCollector(ty, leftArea, index, t.is_birthday_submitted);
                CallAction(ty, leftArea, index);
                CollectionList(ty, leftArea, index);
                CustomHtml(ty, leftArea, index);
                Discount(ty, leftArea, index);
                FreeText(ty, leftArea, index);
                ImageText(ty, leftArea, index);
                LinkList(ty, leftArea, index);
                SocialFollowButton(ty, leftArea, index);
                SocialMediaLink(ty, leftArea, index);
                SocialSharing(ty, leftArea, index);
                Video(ty, leftArea, index);
                PostPurchaseSurvey(ty, leftArea, index);
                Reorder(ty, leftArea, index);
                ProductUpsell(ty, leftArea, index);
              });
            }
            if (rightArea.length > 0) {
              rightArea?.map((ty, index) => {
                DonateUkraine(ty, rightArea, index);
                birthdayCollector(
                  ty,
                  rightArea,
                  index,
                  t.is_birthday_submitted
                );
                CallAction(ty, rightArea, index);
                CollectionList(ty, rightArea, index);
                CustomHtml(ty, rightArea, index);
                Discount(ty, rightArea, index);
                FreeText(ty, rightArea, index);
                ImageText(ty, rightArea, index);
                LinkList(ty, rightArea, index);
                SocialFollowButton(ty, rightArea, index);
                SocialMediaLink(ty, rightArea, index);
                SocialSharing(ty, rightArea, index);
                Video(ty, rightArea, index);
                PostPurchaseSurvey(ty, rightArea, index);
                Reorder(ty, rightArea, index);
                ProductUpsell(ty, rightArea, index);
              });
            }

            if (headerArea.length > 0) {
              var e = t.product_comment;
              headerArea.map((ty, index) => {
                Header(ty, index);
                ProductComments(ty, e.prod_comm_arr);
              });
            }
            // e == a &&
            //   (jQueryRCT(".order_confirmation").before(
            //     t.order_confirm_before_html
            //   ),
            //   jQueryRCT(".order_confirmation").after(
            //     t.order_confirm_after_html
            //   ),
            //   jQueryRCT(".customer_information").after(
            //     t.customer_information_after_html
            //   ));
          }
          var i = 0,
            o = t.exteranl_js_arr ? t.exteranl_js_arr : [],
            a = Object.values(o).length;

          if (
            (jQueryRCT("head").append(t.assets),
            jQueryRCT("head").append(t.star_review_style),
            0 < a)
          )
            for (var n = 0; n < a; n++) RCTLoadScript(o[n], r, ++i);
          else r(0);
        }
      }));
}

function RCTgetParameterByName(e, t) {
  t = "" == t || null == t ? window.location.search : t;
  e = RegExp("[?&]" + e + "=([^&]*)").exec(t);
  return e && decodeURIComponent(e[1].replace(/\+/g, " "));
}

var RCTLoadStyle = function (e) {
  var t = document.getElementsByTagName("head")[0],
    r = document.createElement("link");
  (r.rel = "stylesheet"),
    (r.type = "text/css"),
    (r.href = e),
    (r.media = "all"),
    t.appendChild(r);
};

window.Checkout && window.Checkout.jQuery
  ? ((void 0 === window.Checkout.jQuery.fn.jquery ||
      window.Checkout.jQuery.fn.jquery < "3.4.0") &&
      window.Checkout.jQuery.getScript(
        "https://code.jquery.com/jquery-3.4.0.min.js",
        function (e, t, r) {}
      ),
    (jQueryRCT = window.Checkout.jQuery),
    init())
  : window.jQuery
  ? ((void 0 === window.jQuery.fn.jquery ||
      window.jQuery.fn.jquery < "3.4.0") &&
      window.jQuery.getScript(
        "https://code.jquery.com/jquery-3.4.0.min.js",
        function (e, t, r) {}
      ),
    (jQueryRCT = window.jQuery),
    init())
  : ((script = document.createElement("SCRIPT")),
    document.getElementsByTagName("head")[0].appendChild(script),
    (script.async = !0),
    (script.src = "https://code.jquery.com/jquery-3.4.0.min.js"),
    (script.type = "text/javascript"),
    (script.onload = function () {
      (jQueryRCT = window.jQuery), init();
    }));

function arrayColumn(e, r) {
  return e.map(function (e, t) {
    return e[r];
  });
}

function DonateUkraine(ty, tyData, index) {
  if (ty.section_name === "Donate for Ukraine") {
    let content = `<div class="content-box section-element pl-15 mt-3"id=${
      ty?.row_section_id
    }><div class="section-content"><divclass="content-box-row"><div>${
      ty.title
    }</div><div class="mt-2 text-center"><a href="https://www.defendukraine.org/donate" style="         background: ${
      ty.bg_color
    };         color: ${
      ty.color
    };       "class="btn" target="_blank" rel="noreferrer" onclick=${DonateForUkraine(
      ty
    )}>${ty.btn_text}</a></div></div></div></div>
    `;

    if (ty.area === "right") {
      if ($("#" + tyData[index - 1].row_section_id).length) {
        jQueryRCT("#" + tyData[index - 1].row_section_id).after(content);
      } else {
        jQueryRCT(`.order-summary`).after(content);
      }
    } else {
      jQueryRCT(`#${tyData[index - 1].row_section_id}`).after(content);
    }
  }
}

function DonateForUkraine(ty) {
  jQueryRCT(document).on(
    "click",
    `#${ty?.row_section_id} .btn`,
    async function () {
      await addActivityAPI("Donate to Ukrain button clicked", ty);
    }
  );
}

function birthdayCollector(ty, tyData, index, is_birthday_submitted) {
  if (ty.section_name === "Birthday collector widget") {
    let content = `<div class="content-box section-element pl-15 mt-3"id=${
      ty?.row_section_id
    }><div class="section-content"id="section-content${
      ty.row_section_id
    }"><div class="content-box-row"><div>${
      ty.title
    }</div><div class="mt-2 d-flex"><input type="date" class="calendar_input" name="birthday"/><a class="btn mx-3" style="background:${
      ty.bg_color
    };color:${ty.color};height:50px;width=${
      ty.area === "right" ? "34%" : "21%"
    }" onclick=${registerBirthday(ty)}>${
      ty.btn_text
    }</a></div></div></div></div>`;
    if (!is_birthday_submitted) {
      if (ty.area === "right") {
        if ($("#" + tyData[index - 1].row_section_id).length) {
          jQueryRCT("#" + tyData[index - 1].row_section_id).after(content);
        } else {
          jQueryRCT(`.order-summary`).after(content);
        }
      } else {
        jQueryRCT(`#${tyData[index - 1].row_section_id}`).after(content);
      }
    }
  }
}

function registerBirthday(ty) {
  jQueryRCT(document).on(
    "click",
    `#${ty?.row_section_id} .btn`,
    async function () {
      var e = jQueryRCT('input[name="birthday"]').val();
      if (e === "" || e === null) {
        let err = `<div class="birthday-error" style="color: ${ty.error_msg_color};">${ty.error_msg}</div>`;
        jQueryRCT(`#${ty?.row_section_id} .content-box-row`).after(err);
        setTimeout(function () {
          jQueryRCT(".birthday-error").remove();
        }, 3e3);
      } else {
        let loader = `<div class="loader text-center" id="loader-${ty.row_section_id}"></div>`;
        jQueryRCT(`#section-content${ty.row_section_id}`).hide();
        jQueryRCT("#" + ty.row_section_id).append(loader);
        jQueryRCT(`#loader-${ty.row_section_id}`).append(
          '<div class="spinner-border text-primary"></div>'
        );
        jQueryRCT(`.spinner-border`).after(
          '<div class="row justify-content-center" id="loader"></div>'
        );

        let data = {
          shop: shop,
          birthday: e,
          customer_id: customer_id,
          order_id: order_id,
          row_section_id: ty.row_section_id,
          customer_name: customer_name,
          shopInfo: shopInfo,
        };
        await fetch(ASSETS_URL + "api/birthday", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then(async (data) => {
            jQueryRCT(`#loader-${ty.row_section_id}`).hide();
            await addActivityAPI("Submitted Birthday", ty, e);
            init();
          })
          .catch((err) => {});
      }
    }
  );
}

function CallAction(ty, tyData, index) {
  if (ty.section_name === "Call to action") {
    let content = `
    <div class="content-box section-element pl-15 mt-3" id=${
      ty.row_section_id
    }><div class="section-content"><div class="content-box-row"><div class="align-items-center row"><div class="${
      ty.selected_layout === "vertical"
        ? "col-md-12 col-sm-12 col-lg-12"
        : "col-md-6 col-sm-6 col-lg-6"
    }"><div>${ty.title}</div></div><div class="${
      ty.selected_layout === "vertical"
        ? "col-md-12 col-sm-12 col-lg-12"
        : "col-md-6 col-sm-6 col-lg-6"
    }"><div class="mt-2 text-center"><a class="btn" style="background:  ${
      ty.bg_color
    }; color:  ${ty.color};" target="_blank" rel="noreferrer" href=${
      ty.redirect_url ? ty.redirect_url : "#"
    } onclick=${CallToAction(ty)}>${
      ty.btn_text
    }</a></div></div></div></div></div></div>
    `;
    if (ty.area === "right") {
      if ($("#" + tyData[index - 1].row_section_id).length) {
        jQueryRCT("#" + tyData[index - 1].row_section_id).after(content);
      } else {
        jQueryRCT(`.order-summary`).after(content);
      }
    } else {
      jQueryRCT(`#${tyData[index - 1].row_section_id}`).after(content);
    }
  }
}

function CallToAction(ty) {
  jQueryRCT(document).on(
    "click",
    `#${ty.row_section_id} .btn`,
    async function () {
      await addActivityAPI("Clicked CTA", ty);
    }
  );
}

function CollectionList(ty, tyData, index) {
  if (ty.section_name === "Collection list") {
    let content =
      ty.content.length > 0 &&
      `
      <div class="content-box section-element pl-15 mt-3" id=${
        ty.row_section_id
      }><div class="section-content"><div class="content-box-row"><div class="section-coll-title" style="color: ${
        ty.head_color
      };font-size: ${ty.head_fs_size};text-transform:${
        ty?.head_selected_text_transform
      };     font-weight:${
        ty?.head_style && ty?.head_style.includes("B") ? "bold" : ""
      };     font-style:${
        ty?.head_style && ty?.head_style.includes("I") ? "italic" : ""
      }     ">${
        ty?.heading
      }</div><div class="section-content-box mt-4"><div class="row mx-3 mb-2" id="content"></div></div></div></div></div>
    `;

    if (ty.area === "right") {
      if ($("#" + tyData[index - 1].row_section_id).length) {
        jQueryRCT("#" + tyData[index - 1].row_section_id).after(content);
      } else {
        jQueryRCT(`.order-summary`).after(content);
      }
    } else {
      jQueryRCT(`#${tyData[index - 1].row_section_id}`).after(content);
    }

    if (ty.content.length > 0) {
      ty.content.map((content, i) => {
        let col = ty?.coll_per_row === 2 ? 6 : 4;
        jQueryRCT(`#content`).append(
          `<div class="col col-lg-${col} col-md-${col} col-sm-${col} mb-2"><div class="position-relative" onclick=${CollectionListClick(
            ty,
            content?.collection_name?.title,
            i
          )}id=${i}><div class="position-relative"><img src=${
            content.collection_name?.image?.src
              ? content.collection_name?.image?.src
              : "https://cdn.stilyoapps.com/v1/assets/img/img_placeholder.png"
          } class="img-fluid"/></div><div class="collection-title-wrapper"><div class="collection-title" style="color:${
            ty?.coll_title_color
          };font-size:${ty?.coll_fs_size}px";text-transform:${
            ty?.coll_selected_text_transform
          };font-weight:${
            ty?.coll_style.includes("B") ? "bold" : ""
          };font-style:${ty?.coll_style.includes("I") ? "italic" : ""}>${
            content?.collection_name?.title
              ? content?.collection_name?.title
              : "Your collection's name"
          }</div></div></div></div>
          `
        );
      });
    }
  }
}

function CollectionListClick(ty, content, index) {
  jQueryRCT(document).on(
    "click",
    `#${ty.row_section_id} #${index}`,
    async function () {
      await addActivityAPI(
        `Clicked ${content ? content : "Your collection's name"} collection`,
        ty
      );
      new_tab_redirect(shop);
    }
  );
}

function CustomHtml(ty, tyData, index) {
  if (ty.section_name === "Custom HTML" || ty.section_name === "Free text") {
    let content = `
    <div class="content-box section-element pl-15 mt-3" id=${ty.row_section_id}><div class="section-content"><div class="content-box-row"><div>${ty.custom_html}</div></div></div></div>
    `;
    if (ty.area === "right") {
      if ($("#" + tyData[index - 1].row_section_id).length) {
        jQueryRCT("#" + tyData[index - 1].row_section_id).after(content);
      } else {
        jQueryRCT(`.order-summary`).after(content);
      }
    } else {
      jQueryRCT(`#${tyData[index - 1].row_section_id}`).after(content);
    }
  }
}

function Discount(ty, tyData, index) {
  if (ty.section_name === "Discount") {
    let content = `
    <div class="content-boc section-element mt-3" id=${
      ty?.row_section_id
    }><div class="section-content"><div class="content-box-row" style="background: ${
      ty?.bg_color
    }; color: #fff"><div class="pt-4">${
      ty.title
    }</div><div class="d-flex mt-3 justify-content-center"><span class="d-inline-block dis_code" style="background: ${
      ty?.discount_bg_color
    };color:${ty?.discount_color}">${
      ty?.discount_code
    }</span><a class="d-inline-block btn btn_url" style="background: ${
      ty?.btn_bg_color
    };color:${ty?.btn_color}" id="discount-${
      ty.row_section_id
    }" onclick=${DiscountClick(ty)}>${
      ty?.btn_text
    }</a></div><div class="mt-3 pb-5">${
      ty?.term_condition_txt
    }</div></div></div></div>
    `;
    if (ty.area === "right") {
      if ($("#" + tyData[index - 1].row_section_id).length) {
        jQueryRCT("#" + tyData[index - 1].row_section_id).after(content);
      } else {
        jQueryRCT(`.order-summary`).after(content);
      }
    } else {
      jQueryRCT(`#${tyData[index - 1].row_section_id}`).after(content);
    }
  }
}

function DiscountClick(ty) {
  jQueryRCT(document).on(
    "click",
    `#discount-${ty.row_section_id}`,
    async function () {
      await addActivityAPI("Clicked Discount widget", ty);
      new_tab_redirect(ty.redirect_url);
    }
  );
}

function FreeText(ty, tyData, index) {
  if (ty.section_name === "Free text") {
    let content = `<div class="content-box section-element pl-15 mt-3" id=${ty.row_section_id}><div class="section-content"><div class="content-box-row"><div>${ty.title}</div></div></div></div>`;
    if (ty.area === "right") {
      if ($("#" + tyData[index - 1].row_section_id).length) {
        jQueryRCT("#" + tyData[index - 1].row_section_id).after(content);
      } else {
        jQueryRCT(`.order-summary`).after(content);
      }
    } else {
      jQueryRCT(`#${tyData[index - 1].row_section_id}`).after(content);
    }
  }
}

function ImageText(ty, tyData, index) {
  if (ty.section_name === "Image with text") {
    let col = ty.selected_img_align === "center" ? 12 : 6;
    let content = `
    <div class="content-box section-element pl-15 mt-3" id=${
      ty.row_section_id
    }><div class="section-content"><div class="content-box-row"><div class="row align-items-center ${
      ty.selected_img_align === "right" ? "flex-row-reverse" : ""
    }"><div class="col col-lg-${col} col-md-${col} col-sm-${col}"><div class="position-relative"><div class="position-relative"><a onclick=${ImageTextClick(
      ty
    )} id="a-${ty.row_section_id}"><img src=${
      ty.img
        ? ty.img
        : "https://cdn.stilyoapps.com/v1/assets/img/img_placeholder.png"
    } class="${
      ty?.selected_img_layout === "circle" ? "circleimg-fluid" : "img-fluid"
    }"/></a></div></div></div><div class="col col-lg-${col} col-md-${col} col-sm-${col}"><div>${
      ty.title
    }</div></div></div></div></div></div>
    `;
    if (ty.area === "right") {
      if ($("#" + tyData[index - 1].row_section_id).length) {
        jQueryRCT("#" + tyData[index - 1].row_section_id).after(content);
      } else {
        jQueryRCT(`.order-summary`).after(content);
      }
    } else {
      jQueryRCT(`#${tyData[index - 1].row_section_id}`).after(content);
    }
  }
}

function ImageTextClick(ty) {
  jQueryRCT(document).on("click", `#a-${ty.row_section_id}`, async function () {
    new_tab_redirect(ty.redirect_url ? ty.redirect_url : shop);
    await addActivityAPI("Clicked Image", ty);
  });
}

function LinkList(ty, tyData, index) {
  if (ty.section_name === "Link list") {
    let content = `<div class="content-box section-element pl-10 mt-3" id=${ty.row_section_id}><div class="section-content"><div class="content-box-row"><ul class="navigation" id=nav-${ty.row_section_id}></ul></div></div></div>`;

    if (ty.area === "right") {
      if ($("#" + tyData[index - 1].row_section_id).length) {
        jQueryRCT("#" + tyData[index - 1].row_section_id).after(content);
      } else {
        jQueryRCT(`.order-summary`).after(content);
      }
    } else {
      jQueryRCT(`#${tyData[index - 1].row_section_id}`).after(content);
    }

    if (ty.links.length > 0) {
      ty.links.map((link, i) => {
        jQueryRCT(`#nav-${ty.row_section_id}`).append(
          `
          <li style="font-size: ${ty.head_fs_size}px;text-transform: ${
            ty.head_selected_text_transform
          };font-weight:${
            ty?.head_style.includes("B") ? "bold" : ""
          };font-style:${
            ty?.head_style.includes("I") ? "italic" : ""
          }"><a href=${
            link.url
          } target="_blank" rel="noreferrer" style="color: ${
            ty.color
          }" onclick=${LinkListClick(ty, link, i)} id="a-${i}">${
            link?.name
          }</a></li>
          `
        );
      });
    }
  }
}

function LinkListClick(ty, link, index) {
  jQueryRCT(document).on(
    "click",
    `#${ty.row_section_id} #a-${index}`,
    async function () {
      await addActivityAPI("Clicked " + link.name + " link", ty);
    }
  );
}

function SocialFollowButton(ty, tyData, index) {
  if (ty.section_name === "Social follow buttons") {
    let content = `<div class="content-box section-element pl-15 mt-3" id=${ty.row_section_id}><div class="section-content"><div class="content-box-row"></div></div></div>`;
    if (ty.area === "right") {
      if ($("#" + tyData[index - 1].row_section_id).length) {
        jQueryRCT("#" + tyData[index - 1].row_section_id).after(content);
      } else {
        jQueryRCT(`.order-summary`).after(content);
      }
    } else {
      jQueryRCT(`#${tyData[index - 1].row_section_id}`).after(content);
    }
    if (ty.content.length > 0) {
      ty.content.map((cont) => {
        jQueryRCT(`#${ty.row_section_id} .content-box-row`).append(
          `<p>${cont.contains} <br/></p>`
        );
      });
    }
  }
}

function SocialMediaLink(ty, tyData, index) {
  if (ty.section_name === "Social media links") {
    let content = `
    <div class="content-box section-element pl-15 mt-3" id=${
      ty.row_section_id
    }><div class="section-content"><div class="content-box-row"><div>${
      ty.title
    }</div><div><ul class="${
      ty?.selected_icon_style === "logo"
        ? "social-links logo_only mt-4"
        : ty?.selected_icon_style === "circle"
        ? "social-links circle mt-4"
        : ty?.selected_icon_style === "square"
        ? "social-links square mt-4"
        : ty?.selected_icon_style === "round"
        ? "social-links round-edge mt-4"
        : "social-links logo_only mt-4"
    }"></ul></div></div></div></div>
    `;
    if (ty.area === "right") {
      if ($("#" + tyData[index - 1].row_section_id).length) {
        jQueryRCT("#" + tyData[index - 1].row_section_id).after(content);
      } else {
        jQueryRCT(`.order-summary`).after(content);
      }
    } else {
      jQueryRCT(`#${tyData[index - 1].row_section_id}`).after(content);
    }
    let socialMedia = [
      { name: "facebook", url: ty.facebook_link },
      { name: "twitter", url: ty.twitter_link },
      { name: "pinterest", url: ty.pinterest_link },
      { name: "instagram", url: ty.instagram_link },
      { name: "linkedin", url: ty.linkedin_link },
      { name: "tumblr", url: ty.tumblr_link },
      { name: "google-plus", url: ty.google_link },
      { name: "youtube-play", url: ty.youtube_link },
    ];
    socialMedia.map((social, i) => {
      jQueryRCT(`#${ty.row_section_id} ul`).append(
        `<li><a href=${
          social.url
        } target="_blank" rel="noreferrer" onclick=${SocialMediaLinkClick(
          ty,
          i,
          social
        )} id="sm-${i}"><span class="fa fa-${social.name}"></span></a></li>`
      );
    });
  }
}

function SocialMediaLinkClick(ty, index, social) {
  jQueryRCT(document).on(
    "click",
    `#${ty.row_section_id} #sm-${index}`,
    async function () {
      await addActivityAPI("Clicked " + social.name, ty);
    }
  );
}

function SocialSharing(ty, tyData, index) {
  if (ty.section_name === "Social sharing") {
    let content = `
    <div class="content-box section-element pl-15 mt-3" id=${
      ty.row_section_id
    }><div class="section-content"><div class="content-box-row"><div>${
      ty.title
    }</div><div><ul class="${
      ty?.selected_icon_style === "logo"
        ? "social-links logo_only mt-4"
        : ty?.selected_icon_style === "circle"
        ? "social-links circle mt-4"
        : ty?.selected_icon_style === "square"
        ? "social-links square mt-4"
        : ty?.selected_icon_style === "round"
        ? "social-links round-edge mt-4"
        : "social-links logo_only mt-4"
    }" style="text-align:${
      ty?.btn_alignment === "left"
        ? "left"
        : ty?.btn_alignment === "center"
        ? "center"
        : ty?.btn_alignment === "right"
        ? "right"
        : "center"
    }"></ul></div></div></div></div>
    `;
    if (ty.area === "right") {
      if ($("#" + tyData[index - 1].row_section_id).length) {
        jQueryRCT("#" + tyData[index - 1].row_section_id).after(content);
      } else {
        jQueryRCT(`.order-summary`).after(content);
      }
    } else {
      jQueryRCT(`#${tyData[index - 1].row_section_id}`).after(content);
    }
    let socialMedia = [
      {
        name: "facebook",
        status: ty.share_facebook,
        url: "https://facebook.com",
      },
      { name: "twitter", status: ty.share_twitter, url: "https://twitter.com" },
      {
        name: "pinterest",
        status: ty.share_pinterest,
        url: "https://pinterest.com",
      },
      {
        name: "linkedin",
        status: ty.share_linkedin,
        url: "https://linkedin.com",
      },
      {
        name: "google-plus",
        status: ty.share_google,
        url: "https://plus.google.com/",
      },
    ];
    socialMedia.map((sm, i) => {
      jQueryRCT(`#${ty.row_section_id} ul`).append(
        sm.status === true &&
          `<li><a href=${
            sm.url
          } target="_blank" rel="noreferrer" onclick=${socailSharingClick(
            ty,
            i,
            sm
          )} id="ss-${i}"><span class="fa fa-${sm.name}"></span></a></li>
        `
      );
    });
  }
}

function socailSharingClick(ty, index, sm) {
  jQueryRCT(document).on(
    "click",
    `#${ty.row_section_id} #ss-${index}`,
    async function () {
      await addActivityAPI("Shared on " + sm.name, ty);
    }
  );
}

function Video(ty, tyData, index) {
  if (ty.section_name === "Video") {
    let content = `<div class="content-box section-element pl-15 mt-3" id=${ty.row_section_id}><div class="section-content"><div class="content-box-row"><div>${ty.title}</div><div class="mt-4"><div class="react-player" style="width:450px; height:234px;"><div style="width:100%;height:100%"><iframe style="width:100%;height:100%" src="https://www.youtube.com/embed/${ty?.video_id}"></iframe></div></div></div></div></div></div>`;
    if (ty.area === "right") {
      if ($("#" + tyData[index - 1].row_section_id).length) {
        jQueryRCT("#" + tyData[index - 1].row_section_id).after(content);
      } else {
        jQueryRCT(`.order-summary`).after(content);
      }
    } else {
      jQueryRCT(`#${tyData[index - 1].row_section_id}`).after(content);
    }
  }
}

function PostPurchaseSurvey(ty, tyData, index) {
  if (ty.section_name === "Post purchase surveys") {
    if (ty.questions.length > 0) {
      let content = `<div class="content-box section-element pl-15 mt-3" id=${
        ty.row_section_id
      }><div class="section-content"><div class="content-box-row survey" id="sur-${
        ty.row_section_id
      }"><div class="survey-title"><h2>${
        ty.title
      }</h2></div><div class="content-box-row survey-box"><div class="survey-title"><div class="content-holder"><form id="form-${
        ty.row_section_id
      }" onclick="${surveySubmit(
        ty
      )}"></form></div><div class="error-msg mt-3" style="color:${
        ty.error_msg_color
      };">${ty.error_msg}</div></div></div></div></div></div>`;

      if (ty.area === "right") {
        if ($("#" + tyData[index - 1].row_section_id).length) {
          jQueryRCT("#" + tyData[index - 1].row_section_id).after(content);
        } else {
          jQueryRCT(`.order-summary`).after(content);
        }
      } else {
        jQueryRCT(`#${tyData[index - 1].row_section_id}`).after(content);
      }

      if (
        submit_survey.length === 0 ||
        submit_survey.find((sur) => sur.survey_id != ty.select_survey)
      ) {
        $("#" + ty.row_section_id).show();
      } else {
        $("#" + ty.row_section_id).hide();
      }

      ty.questions.map((que, i) => {
        i = i + 1;
        jQueryRCT(
          `#${ty.row_section_id} .content-holder #form-${ty.row_section_id}`
        ).append(
          `<div class="div-content" id="content-${
            ty.row_section_id
          }-${i}" data-id="${i}" style="display: ${i === 1 && "block"}"><h2>${
            que.question
          }</h2>${
            que.answer_type === "textarea"
              ? `<textarea  class="survey-textarea" id="survey-${i}" type="textarea"  name="${i}" rows="3"></textarea>`
              : ""
          }${
            que.answer_type === "select"
              ? `<select class="form-select" id="survey-${i}" type="select"  name="${i}"> <option value="">${ty.place_holder_dropdown}</option></select>`
              : ""
          }
          ${que.answer_type === "radio" ? `<div class="radio"></div>` : ""}
          ${
            que.answer_type === "checkbox" ? `<div class="checkbox"></div>` : ""
          }
          <div class="mt-3 d-flex justify-content-between"><a class="back" style="background: ${
            ty.prev_btn_bg_color
          };color:${ty.prev_btn_color}">${
            ty.prev_btn_text
          }</a><a class="next" style="background: ${
            ty.next_btn_bg_color
          };color:${ty.next_btn_color}" id="#nxtBtn">${
            ty.next_btn_text
          }</a><a class="end" style="background: ${ty.bg_color};color:${
            ty.color
          }" id="end-${i}" type="submit">${ty.btn_text}</a></div></div>
          `
        );

        if (que.options.length > 0) {
          que.options.map((opt) => {
            if (que.answer_type === "select") {
              jQueryRCT(`#${ty.row_section_id} .form-select`).append(
                `<option value=${opt}>${opt}</option>`
              );
            }
            if (que.answer_type === "radio") {
              jQueryRCT(`#${ty.row_section_id} .radio`).append(
                `<input class="survey-textarea form-check-input" id="survey-${i}" name="${i}"  type=${que.answer_type} value="${opt}" /><label>${opt}</label><br/>`
              );
            }
            if (que.answer_type === "checkbox") {
              jQueryRCT(`#${ty.row_section_id} .checkbox`).append(
                `<input class="survey-textarea form-check-input" id="survey-${i}" name="${i}"  type=${que.answer_type} value="${opt}" /><label>${opt}</label><br/>`
              );
            }
          });
        }
      });

      jQueryRCT(document).on(
        "click",
        `#${ty.row_section_id} .next`,
        function () {
          var t = jQueryRCT(this);
          var id = jQueryRCT(`#${ty.row_section_id} .div-content:visible`).data(
            "id"
          );
          var nextId =
            jQueryRCT(`#${ty.row_section_id} .div-content:visible`).data("id") +
            1;

          if ("" == surveyFrmValidation(t)) {
            jQueryRCT(`#${ty.row_section_id} .error-msg`).show(),
              setTimeout(function () {
                jQueryRCT(`#${ty.row_section_id} .error-msg`).hide();
              }, 3e3);
          } else {
            $(`#${ty.row_section_id} [data-id="` + id + '"]').hide();
            $(`#${ty.row_section_id} [data-id="` + nextId + '"]').show();

            if ($(`#${ty.row_section_id} .back:hidden`).length == 1) {
              $(`#${ty.row_section_id} .back`).show();
            }
            if (nextId == ty.questions.length) {
              $(`#${ty.row_section_id} .back`).show();
              $(`#${ty.row_section_id} .next`).hide();
              $(`#${ty.row_section_id} .end`).show();
            } else {
              $(`#${ty.row_section_id} .back`).show();
            }
          }
        }
      ),
        (jQueryRCT.fn.serializeObject = function () {
          var e = {},
            t = this.serializeArray();
          return (
            jQueryRCT.each(t, function () {
              void 0 !== e[this.name]
                ? (e[this.name].push || (e[this.name] = [e[this.name]]),
                  e[this.name].push(this.value || ""))
                : (e[this.name] = this.value || "");
            }),
            e
          );
        });

      jQueryRCT(document).ready(function () {
        var nextId = jQueryRCT(
          `#${ty.row_section_id} .div-content:visible`
        ).data("id");
        if (nextId == ty.questions.length) {
          $(`#${ty.row_section_id} .next`).hide();
          $(`#${ty.row_section_id} .end`).show();
        }
      });

      $("body").on("click", `#${ty.row_section_id} .back`, function () {
        var id = $(`#${ty.row_section_id} .div-content:visible`).data("id");
        var prevId =
          $(`#${ty.row_section_id} .div-content:visible`).data("id") - 1;
        $(`#${ty.row_section_id} [data-id="` + id + '"]').hide();
        $(`#${ty.row_section_id} [data-id="` + prevId + '"]').show();

        if (prevId == 1) {
          $(`#${ty.row_section_id} .back`).hide();
          $(`#${ty.row_section_id} .next`).show();
          $(`#${ty.row_section_id} .end`).hide();
        } else {
          $(`#${ty.row_section_id} .next`).show();
          $(`#${ty.row_section_id} .end`).hide();
        }
      });
    }
  }
}

function surveySubmit(ty) {
  jQueryRCT("body").on(
    "click",
    `#${ty.row_section_id} .end`,
    async function () {
      var t = jQueryRCT(this),
        e = surveyFrmValidation(t);
      if ("" != e) {
        let loader = `<div class="loader text-center" id="loader-${ty.row_section_id}"></div>`;
        jQueryRCT(`#${ty.row_section_id} .survey-title`).hide();
        jQueryRCT(`#${ty.row_section_id} .content-box-row survey-box`).hide();
        jQueryRCT(`#sur-${ty.row_section_id}`).append(loader);
        jQueryRCT(`#loader-${ty.row_section_id}`).append(
          '<div class="spinner-border text-primary mt-5 mb-5"></div>'
        );
        jQueryRCT(`.spinner-border`).after(
          '<div class="row justify-content-center" id="loader"></div>'
        );

        let data = {
          answer: jQueryRCT(t.closest("form")).serializeObject(),
          shop: shop,
          customer_id: customer_id,
          order_id: order_id,
          survey_id: ty.select_survey,
        };

        await fetch(ASSETS_URL + "api/survey_submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            jQueryRCT(`#loader-${ty.row_section_id}`).hide();
            let tyMsg = `<div style="color: ${ty.thank_you_msg_color}" class="text-center mt-5 mb-5">${ty.thank_you_msg}</div>`;
            jQueryRCT(`#sur-${ty.row_section_id}`).append(tyMsg).show(),
              setTimeout(function () {
                jQueryRCT(`#sur-${ty.row_section_id}`).hide(), init();
              }, 3e3);
          })
          .catch((err) => {});
      } else {
        t.closest(".survey").find(".error-msg").show(),
          setTimeout(function () {
            t.closest(".survey").find(".error-msg").hide();
          }, 3e3);
      }
    }
  );
}

function surveyFrmValidation(e, ty) {
  var t = "",
    e = e.closest(".div-content"),
    r = e.find("input"),
    i = r.attr("type");
  return (
    "checkbox" == i || "radio" == i
      ? (t = r.is(":checked") ? "1" : "")
      : "1" == e.find("textarea").length
      ? (t = e.find("textarea").val())
      : "1" == e.find("select").length && (t = e.find("select").val()),
    t
  );
}

function Reorder(ty, tyData, index) {
  if (ty.section_name === "Reorder") {
    let content1 = `
    <div class="content-box section-element pl-15 mt-3" id="${
      ty.row_section_id
    }"><div class="section-content" id="section-content${
      ty.row_section_id
    }"><div class="content-box-row"><div>${
      ty.title
    }</div><div class="mt-3" style="text-align:left;"><a class="btn" style="background:${
      ty.bg_color
    };color:${ty.color}" onclick="${generateReorder(ty)}">${
      ty.btn_text
    }</a></div></div></div><div class="loader text-center" id="loader-${
      ty.row_section_id
    }"></div></div>
    `;
    if (ty.area === "right") {
      if ($("#" + tyData[index - 1].row_section_id).length) {
        jQueryRCT("#" + tyData[index - 1].row_section_id).after(content1);
      } else {
        jQueryRCT(`.order-summary`).after(content1);
      }
    } else {
      jQueryRCT(`#${tyData[index - 1].row_section_id}`).after(content1);
    }
  }
}

function generateReorder(ty) {
  jQueryRCT(document).on(
    "click",
    `#${ty.row_section_id} .btn`,
    async function () {
      jQueryRCT(`#section-content${ty.row_section_id}`).hide();
      jQueryRCT(`#loader-${ty.row_section_id}`).show();
      jQueryRCT(`#loader-${ty.row_section_id}`).append(
        '<div class="spinner-border text-primary"></div>'
      );
      jQueryRCT(`.spinner-border`).after(
        '<div class="row justify-content-center" id="loader"></div>'
      );
      jQueryRCT(`#loader`).html(ty.loader_text);
      let data = {
        order_detail: order_data,
        shop: shop,
        customer_id: customer_id,
        row_section_id: ty.row_section_id,
        shopInfo: shopInfo,
        funnel_id: funnel_id,
      };

      await fetch(ASSETS_URL + "api/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then(async (data) => {
          const res = data && data.data;
          await addActivityAPI("Clicked reorder button", ty);
          if (res.invoice_url) {
            return (window.location = res.invoice_url);
          }
        })
        .catch((err) => {});
    }
  );
}

async function getUpsellProduct() {
  return await fetch(ASSETS_URL + `api/upsell_product?shop=${shop}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "ngrok-skip-browser-warning": "true",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const res = data && data.data && data.data.data;
      return res;
    })
    .catch((err) => {});
}

async function ProductUpsell(ty, tyData, index) {
  if (ty.section_name === "Product upsell") {
    let content = `<div class="content-box section-element pl-15 mt-3 prd-recomm" id="${ty.row_section_id}"><div class="section-content"><div class="content-box-row"></div></div></div>`;

    time = {
      days: ty?.settings?.timer?.days,
      hours: ty?.settings?.timer?.hours,
      minutes: ty?.settings?.timer?.minutes,
      seconds: ty?.settings?.timer?.seconds,
    };

    let product = await getUpsellProduct();

    if (ty.area === "right") {
      if ($("#" + tyData[index - 1].row_section_id).length) {
        jQueryRCT("#" + tyData[index - 1].row_section_id).after(content);
      } else {
        jQueryRCT(`.order-summary`).after(content);
      }
    } else {
      jQueryRCT(`#${tyData[index - 1].row_section_id}`).after(content);
    }

    let titleContent = `<div class="mt-3" style="background: ${ty?.settings?.title?.widget_title_bg_color};border-radius:3px;">${ty?.settings?.title?.widget_title}</div>`;
    if (ty?.settings?.title?.selected_disp_widget === "above_widget") {
      jQueryRCT(`#${ty.row_section_id} .content-box-row`).append(titleContent);
    }

    var timer;
    if (ty?.settings?.timer?.add_timer) {
      timer = `<div class="upsell-timer"><div class="expire mt-2 mb-2" id="expire-${
        ty.row_section_id
      }" style="display: ${is_time_over ? "" : "none"}">${
        ty?.settings?.timer?.timer_expired_msg
      }</div><div class="timer mt-2" style="background: ${
        ty?.settings?.timer?.timer_bg_color
      };border: 1px solid ${
        ty?.settings?.timer?.timer_border_color
      }"><div><div id="timer-${ty.row_section_id}"><h2 style="color: ${
        ty?.settings?.timer?.timer_color
      };">${
        ty?.settings?.timer?.timer_txt
      }</h2><span class="counter mx-1" style="color: ${
        ty?.settings?.timer?.timer_text_color
      }" id="time-${ty.row_section_id}"></span></div></div></div></div>`;

      if (ty?.settings?.timer?.selected_position === "above_widget") {
        jQueryRCT(`#${ty.row_section_id} .content-box-row`).append(timer);
      }

      if (ty?.settings?.timer?.selected_text_position === "below_timer") {
        jQueryRCT(`#timer-${ty.row_section_id}`).addClass("below-timer");
      } else if (ty?.settings?.timer?.selected_text_position === "left_timer") {
        jQueryRCT(`#timer-${ty.row_section_id}`).addClass("left-timer");
      } else if (
        ty?.settings?.timer?.selected_text_position === "right_timer"
      ) {
        jQueryRCT(`#timer-${ty.row_section_id}`).addClass("right-timer");
      } else {
        jQueryRCT(`#timer-${ty.row_section_id}`).addClass("above-timer");
      }
    }

    var dPrice = product.variants.price;
    var discountPrice = (
      Number(dPrice) -
      (Number(dPrice) * Number(ty?.settings?.discount?.discount_value)) / 100
    ).toFixed(2);
    var cPrice = product.variants.compare_at_price;
    var pPrice = product.variants.price;

    let smallUpsell = `<div class="row small-upsell upsell-box"><div class="col-sm-2 col-md-2 col-lg-2"><div class="mt-2 prd_thumbnail"><div class="thumbnail_wrap"><img src=${
      product?.images
    } alt=""/></div></div></div><div class="col-sm-4 col-md-4 col-lg-4"><div class="mt-2">${
      product?.title
    }</div><div class="mt-2"><span style="display: ${
      ty?.settings?.discount?.display_compare_price ? "" : "none"
    };font-size:${ty?.settings?.discount?.compare_price_fs_price};color: ${
      ty?.settings?.discount?.compare_price_color
    } "class="compare-price">Rs.${
      product.variants.compare_at_price
    }</span><span style="display: ${
      ty?.settings?.discount?.display_product_price ? "" : "none"
    };font-size: ${ty?.settings?.discount?.product_price_fs_price}px;color: ${
      ty?.settings?.discount?.product_price_color
    } "class="compare-price"> Rs.${
      product.variants.price
    }</span><span style="display: ${
      ty?.settings?.discount?.discount_price ? "" : "none"
    };font-size: ${ty?.settings?.discount?.discount_fs_size}px;color: ${
      ty?.settings?.discount?.discount_color
    }"> Rs.${discountPrice}</span></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="row mt-3"><div class="col"><select class="form-select" name="size"><option value="${
      product.variants.title
    }">${
      product.variants.title
    }</option></select></div><div class="col"><a class="btn" id="upsell-btn-${
      ty.row_section_id
    }" style="background: ${ty?.settings?.buttons?.btn_bg_color};color: ${
      ty?.settings?.buttons?.btn_color
    }">${ty?.settings?.buttons?.btn_text}</a></div></div></div></div>`;

    let mediumUpsell = `<div class="row medium-upsell upsell-box"><div class="col-sm-4 col-md-4 col-lg-4"><div class="mt-2 prd_thumbnail"><div class="thumbnail_wrap"><img src=${
      product?.images
    } alt=""/></div></div></div><div class="col-sm-8 col-md-8 col-lg-8"><div class="mt-2">${
      product?.title
    }</div><div class="mt-2"><span style="display: ${
      ty?.settings?.discount?.display_compare_price ? "" : "none"
    };font-size:${ty?.settings?.discount?.compare_price_fs_price};color: ${
      ty?.settings?.discount?.compare_price_color
    } "class="compare-price cp">Rs.${cPrice}</span><span style="display: ${
      ty?.settings?.discount?.display_product_price ? "" : "none"
    };font-size: ${ty?.settings?.discount?.product_price_fs_price}px;color: ${
      ty?.settings?.discount?.product_price_color
    } "class="compare-price pp"> Rs.${pPrice}</span><span style="display: ${
      ty?.settings?.discount?.discount_price ? "" : "none"
    };font-size: ${ty?.settings?.discount?.discount_fs_size}px;color: ${
      ty?.settings?.discount?.discount_color
    }" class="dp"> Rs.${discountPrice}</span></div><div class="row mt-3"><div class="col-12"><div class="row mt-3"><div class="col-12"><div class="d-flex align-items-center changeProQty"><select class="form-select quantity" name="quantity" style="display: ${
      ty?.settings?.product_options?.display_qty_picker ? "" : "none"
    }"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option></select><select class="form-select mx-2" name="size"><option value="${
      product.variants.title
    }">${
      product.variants.title
    }</option></select><a class="btn" id="upsell-btn-${
      ty.row_section_id
    }" style="background: ${ty?.settings?.buttons?.btn_bg_color};color: ${
      ty?.settings?.buttons?.btn_color
    }" >${
      ty?.settings?.buttons?.btn_text
    }</a></div></div></div></div></div></div></div>`;

    let largeUpsell = `<div class="row large-upsell upsell-box"><div class="col col-sm-12 col-md-12 col-lg-12"><div class="mt-2">${
      product?.title
    }</div><div class="mt-2 prd_thumbnail"><div class="thumbnail_wrap"><img src=${
      product?.images
    } alt=""/></div></div></div><div class="col-sm-12 col-md-12 col-lg-12"><div class="mt-5"><div style="display: ${
      ty?.settings?.product_options?.show_product_vendor ? "" : "none"
    }">${product?.vendor}</div><span style="display: ${
      ty?.settings?.discount?.display_compare_price ? "" : "none"
    };font-size:${ty?.settings?.discount?.compare_price_fs_price};color: ${
      ty?.settings?.discount?.compare_price_color
    }" class="compare-price cp">Rs.${cPrice}</span><span style="display: ${
      ty?.settings?.discount?.display_product_price ? "" : "none"
    };font-size: ${ty?.settings?.discount?.product_price_fs_price}px;color: ${
      ty?.settings?.discount?.product_price_color
    }" class="compare-price pp"> Rs.${pPrice}</span><span style="display: ${
      ty?.settings?.discount?.discount_price ? "" : "none"
    };font-size:${ty?.settings?.discount?.discount_fs_size}px;color: ${
      ty?.settings?.discount?.discount_color
    }" class="dp"> Rs.${discountPrice}</span><div class="row"><div class="col" style="display: ${
      ty?.settings?.product_options?.display_qty_picker ? "" : "none"
    }"><label>Quantity</label><div class="qty-control mt-2"><button class="btn-left changeProQty" data-id="minus">-</button><input type="number" min="1" max="100" value="1" name="quantity" readonly class="quantity" /><button class="btn-right changeProQty" data-id="plus">+</button></div></div><div class="col"><label class="mb-1">Size</label><select class="form-select" name="size"><option value="${
      product.variants.title
    }">${
      product.variants.title
    }</option></select></div><div class="col-12 mt-2"><a class="btn" id="upsell-btn-${
      ty.row_section_id
    }" style="width: 100%;background: ${
      ty?.settings?.buttons?.btn_bg_color
    };color: ${ty?.settings?.buttons?.btn_color};">${
      ty?.settings?.buttons?.btn_text
    }</a></div></div></div></div></div>`;

    if (ty.settings.product_options.selected_layout === "small") {
      jQueryRCT(`#${ty.row_section_id} .content-box-row`).append(smallUpsell);
    } else if (ty.settings.product_options.selected_layout === "medium") {
      jQueryRCT(`#${ty.row_section_id} .content-box-row`).append(mediumUpsell);
    } else {
      jQueryRCT(`#${ty.row_section_id} .content-box-row`).append(largeUpsell);
    }

    if (ty?.settings?.product_options?.display_description) {
      let des = `<div class="mt-2">${ty?.settings?.product_options?.product_des}</div>`;
      if (ty.settings.product_options.selected_layout === "small") {
        jQueryRCT(`#${ty.row_section_id} .small-upsell`).after(des);
      } else if (ty.settings.product_options.selected_layout === "medium") {
        jQueryRCT(`#${ty.row_section_id} .medium-upsell`).after(des);
      } else {
        jQueryRCT(`#${ty.row_section_id} .btn`).after(des);
      }
    }

    if (ty?.settings?.timer?.selected_position === "below_widget") {
      jQueryRCT(`#${ty.row_section_id} .upsell-box`).append(timer);
    }
    if (
      ty?.settings?.timer?.selected_position === "above_btn" &&
      ty?.settings?.product_options?.selected_layout === "large"
    ) {
      jQueryRCT(`#${ty.row_section_id} .btn`).before(timer);
      jQueryRCT(`#${ty.row_section_id} .timer`).addClass("mb-2");
    }
    if (
      ty?.settings?.timer?.selected_position === "below_btn" &&
      ty?.settings?.product_options?.selected_layout === "large"
    ) {
      jQueryRCT(`#${ty.row_section_id} .btn`).after(timer);
    }

    if (is_time_over === false) {
      setInterval(() => {
        jQueryRCT(`#${ty.row_section_id} #expire-${ty.row_section_id}`).hide();
        getTime();
        jQueryRCT(`#${ty.row_section_id} #time-${ty.row_section_id}`).text(
          `${time.days.toString().padStart(2, "0")}:${time.hours
            .toString()
            .padStart(2, "0")}:${time.minutes
            .toString()
            .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}
            `
        );
        if (is_time_over) {
          jQueryRCT(`#${ty.row_section_id} .upsell-timer .timer`).hide();
          jQueryRCT(
            `#${ty.row_section_id} #expire-${ty.row_section_id}`
          ).show();
        }
      }, 1000);
    }

    if (ty?.settings?.title?.selected_disp_widget === "below_widget") {
      jQueryRCT(`#${ty.row_section_id} .upsell-box`).after(titleContent);
    }

    jQueryRCT(document).on("click", ".changeProQty", function () {
      var e =
        ty.settings.product_options.selected_layout === "medium"
          ? jQueryRCT(this).find(".quantity").val()
          : jQueryRCT(this).closest(".qty-control").find(".quantity").val();

      "plus" == jQueryRCT(this).data("id")
        ? jQueryRCT(this)
            .closest(".qty-control")
            .find(".quantity")
            .val(parseInt(e) + 1)
        : 1 < e
        ? jQueryRCT(this)
            .closest(".qty-control")
            .find(".quantity")
            .val(parseInt(e) - 1)
        : jQueryRCT(this).closest(".qty-control").find(".quantity").val(1);

      var qty =
        ty.settings.product_options.selected_layout === "medium"
          ? jQueryRCT(this).find(".quantity").val()
          : jQueryRCT(this).closest(".qty-control").find(".quantity").val();

      cp = (cPrice * qty).toFixed(2);
      pp = (pPrice * qty).toFixed(2);
      dp = (discountPrice * qty).toFixed(2);
      jQueryRCT(`#${ty.row_section_id} .cp`).text(`Rs. ${cp}`);
      jQueryRCT(`#${ty.row_section_id} .dp`).text(`Rs. ${dp}`);
      jQueryRCT(`#${ty.row_section_id} .pp`).text(`Rs. ${pp}`);
    });

    jQueryRCT(document).on(
      "click",
      `#upsell-btn-${ty.row_section_id}`,
      function (e) {
        e.preventDefault();
      }
    );
  }
}

const getTime = () => {
  if (
    time.days == 0 &&
    time.hours == 0 &&
    time.minutes == 0 &&
    time.seconds == 0
  ) {
    is_time_over = true;
  } else if (time.hours == 0 && time.minutes == 0 && time.seconds == 0) {
    time = {
      days: time.days - 1,
      hours: 24,
      minutes: 59,
      seconds: 59,
    };
  } else if (time.minutes == 0 && time.seconds == 0) {
    time = {
      days: time.days,
      hours: time.hours - 1,
      minutes: 59,
      seconds: 59,
    };
  } else if (time.seconds == 0) {
    time = {
      days: time.days,
      hours: time.hours,
      minutes: time.minutes - 1,
      seconds: 59,
    };
  } else {
    time = {
      days: time.days,
      hours: time.hours,
      minutes: time.minutes,
      seconds: time.seconds - 1,
    };
  }
};

function Header(ty, index) {
  if (ty.section_name === "Header") {
    jQueryRCT(".main__header").append(
      `<div style="text-align:${ty.btn_alignment}"><div>${
        ty.img !== "" && ty.img !== undefined
          ? `<img src=${ty.img} style="height= 4.28571em" alt="logo"/>`
          : `<p>${ty.placeholder_text}</p>`
      }</div><div class="mt-3 mb-3"><ul class="navigation pl-15" id="nav-${
        ty.row_section_id
      }"></ul></div></div>`
    );

    if (ty.links.length > 0) {
      ty.links.map((link) => {
        jQueryRCT(`#nav-${ty.row_section_id}`).append(
          `<li style="font-size: ${ty?.head_fs_size}px;text-transform:${
            ty?.head_selected_text_transform
          };font-weight:${
            ty?.head_style.includes("B") ? "bold" : ""
          };font-style:${
            ty?.head_style.includes("I") ? "italic" : ""
          }"><a href=${link.url} target="_blank" style="color:${ty.color}">${
            link.name
          }</a></li>`
        );
      });
    }
  }
}

function ProductComments(ty, prod_comm_arr) {
  if (ty.section_name === "Product comments" && ty.is_product_comment) {
    jQueryRCT(
      ".order-summary__section__content table.product-table tbody tr.product[data-product-id!='']"
    ).each(function (e) {
      var t = jQueryRCT(this),
        r = t.attr("data-variant-id"),
        i = t.clone(),
        o = t.find(".product__description .product__description__name").text();

      let content = `<td colspan="4" style="width:100%"><div class="d-flex"><input type="text" class="comment_input" name="comment" style="width:100%" placeholder="${
        ty.placeholder_text
      }"/><button style="background: ${ty.bg_color}; color: ${
        ty.color
      }" class="btn mx-3" id="btn-${
        ty.row_section_id
      }" onclick="${ProductCommentsClick(t, ty, i)}">${
        ty.btn_text
      }</button></div></td>`;

      var s = prod_comm_arr;
      i.attr("data-product-title", o).html(content),
        null != s[r] &&
          "NULL" != s[r] &&
          "" != s[r] &&
          i.html(
            '<td colspan="2" class="prd-cmt" ><b>Comment : </b><i>' +
              s[r] +
              "</i></td>"
          ),
        t.after(i);
    });
  }
}

function ProductCommentsClick(t, ty, i) {
  jQueryRCT(document).on(
    "click",
    `#btn-${ty.row_section_id}`,
    async function () {
      if (jQueryRCT(".comment_input").val() === "") {
        let err =
          '<tr class="RCT-prod-comm-error"><td colspan="2" class="RTC-error-msg"> <center><lable>' +
          ty.error_msg +
          " </lable></center></td></tr>";
        jQueryRCT(i).after(err).next("tr").css("color", "red");
        setTimeout(function () {
          jQueryRCT(".RCT-prod-comm-error").remove(),
            jQueryRCT(t).removeAttr("disabled");
        }, 3e3);
      } else {
        var r = jQueryRCT(this).closest("tr"),
          o = r.attr("data-product-id"),
          a = r.attr("data-variant-id"),
          e = r.attr("data-product-title"),
          n = jQueryRCT(r).find('input[type="text"]').val(),
          c = r.prev().find(".product__description__name").text(),
          s = r.prev().find(".product__description__variant").text();

        jQueryRCT(this).children(".fa.fa-spinner.fa-spin").length <= 0 &&
          jQueryRCT(this)
            .append('<i class="btn-loader fa fa-spinner fa-spin"></i>')
            .prop("disabled", "true");

        let data = {
          shop: shop,
          customer_id: customer_id,
          order_id: order_id,
          product_id: o,
          variant_id: a,
          comment: n,
          item_title: e,
          product_title: c,
          variant_title: s,
          customer_name: customer_name,
        };

        await fetch(ASSETS_URL + "api/product_comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then(async (data) => {
            await addActivityAPI("Submitted comment for " + c, ty, n);
            jQueryRCT(".btn-loader").remove();
            jQueryRCT(
              ".order-summary__section__content table.product-table tbody tr td div input"
            ).each(function (e) {
              var t = jQueryRCT(this).closest("tr"),
                r = t.attr("data-product-id");
              t.attr("data-variant-id") == a &&
                r == o &&
                setTimeout(function () {
                  t.html(
                    '<td colspan="2" class="prd-cmt"><b> Comment : </b><i>' +
                      n +
                      "</i></td>"
                  );
                }, 3e3);
            });
          })
          .catch((err) => {});
      }
    }
  );
}

async function addActivityAPI(message, ty, value) {
  let data = {
    action: message,
    order_id: order_id,
    order_name: order_name,
    shop: shop,
    template_id: ty.template_id,
    value: value,
  };

  await fetch(ASSETS_URL + "api/activity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data=================", data);
    })
    .catch((err) => {
      console.log("err================", err);
    });
}

function new_tab_redirect(e) {
  window.open(e, "_blank");
}
