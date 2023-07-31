var rct_shop,
  rct_customer_id,
  rct_order_id,
  rct_order_name,
  rct_page_name,
  cartProductIdArr,
  rct_money_format,
  featureProductPrice,
  featureProductRowsSettings,
  js_variant_arr,
  script,
  current_script_url = document.currentScript.src,
  domain_name = current_script_url
    .replace("http://", "")
    .replace("https://", "")
    .split(/[/?#]/)[0],
  RCT_SITE_URL = "",
  RCT_ASSETS_URL = "",
  reconvertAjaxGetUrl =
    ("localhost" === domain_name
      ? ((RCT_SITE_URL = "http://localhost:4000/rtc_api/v1/"),
        (RCT_ASSETS_URL = "http://localhost/stilyo-apps/reconvert/v1/"))
      : "cdn.stilyoapps.com" == domain_name ||
        "stilyoapps.com" == domain_name ||
        "www.stilyoapps.com" == domain_name
      ? ((RCT_SITE_URL = "https://rct-service.stilyoapps.com/rtc_api/v1/"),
        (RCT_ASSETS_URL = "https://cdn.stilyoapps.com/v1/"))
      : "stage-cdn.stilyoapps.com" == domain_name
      ? ((RCT_SITE_URL = "https://stage-node-ng.stilyoapps.com/rtc_api/v1/"),
        (RCT_ASSETS_URL = "https://stage-cdn.stilyoapps.com/v1/"))
      : "demo.stilyoapps.com" == domain_name
      ? ((RCT_SITE_URL = "https://demo-node.stilyoapps.com/rtc_api/v1/"),
        (RCT_ASSETS_URL = "https://demo.stilyoapps.com/reconvert/v1/"))
      : "dev.stilyoapps.com" == domain_name
      ? ((RCT_SITE_URL = "https://dev-rct-argo.stilyoapps.com/rtc_api/v1/"),
        (RCT_ASSETS_URL = "https://dev.stilyoapps.com/reconvert/v1/"))
      : "test-php.stilyoapps.com" == domain_name &&
        ((RCT_SITE_URL = "https://test-node.stilyoapps.com/rtc_api/v1/"),
        (RCT_ASSETS_URL = "https://test-php.stilyoapps.com/reconvert/v1/")),
    RCT_SITE_URL + "reconvert"),
  reconvertAjaxUrlnew = RCT_SITE_URL + "api",
  reconvertAjaxUrl = RCT_SITE_URL + "api/reconvert",
  reconvertAjaxClientUrl = RCT_SITE_URL + "store/reconvert",
  jQueryRCT = null,
  rctCustomerApiDataObj = {},
  rct_is_open = "0",
  rct_timer = "",
  rct_customer_name = "",
  learnq = learnq || [],
  starReviewSettingObj = {},
  rctIsPopUpTimeDisplay = 0,
  rct_selected_page_id = null,
  rct_store_id = null,
  rct_is_v = void 0,
  rct_funnel_id = null,
  rows_products = {},
  rows_alt_products = {},
  looxSetting = {},
  rctShopInfo = {},
  fcSetting = "";
function RCT_init() {
  var e;
  null != Shopify.checkout &&
    null != Shopify.checkout.order_id &&
    ((rct_shop = Shopify.shop),
    null != Shopify.checkout.shipping_address
      ? (rct_customer_name =
          Shopify.checkout.shipping_address.first_name +
          " " +
          Shopify.checkout.shipping_address.last_name)
      : null != Shopify.checkout.billing_address &&
        (rct_customer_name =
          Shopify.checkout.billing_address.first_name +
          " " +
          Shopify.checkout.billing_address.last_name),
    (rct_customer_id = Shopify.checkout.customer_id),
    (rct_order_id = Shopify.checkout.order_id),
    (rct_store_id = RCTgetParameterByName("scid", current_script_url)),
    (rct_is_v = RCTgetParameterByName("v", current_script_url)),
    (e = document.createElement("SCRIPT")),
    document.getElementsByTagName("head")[0].appendChild(e),
    (e.async = !0),
    (e.src = "https://kit.fontawesome.com/4339195cc6.js"),
    (e.type = "text/javascript"),
    RCTReconMainFun(),
    RCT_after_jquery());
}
function RCTReconMainFun() {
  var e = {
    shop: rct_shop,
    store_client_id: rct_store_id,
    rct_is_v: rct_is_v,
  };
  jQueryRCT.get(reconvertAjaxGetUrl, e, function (e) {
    e = JSON.parse(e);
    void 0 !== e.result &&
      "success" == e.result &&
      e.security_token &&
      (jQueryRCT.ajaxSetup({
        headers: {
          Authentication: e.security_token,
        },
      }),
      (rctShopInfo = e.rctShopInfo),
      (rct_money_format = e.rctShopInfo.money_format),
      reConvert());
  });
}
function LoadScript(e, t, r) {
  var i = document.createElement("script");
  (i.type = "text/javascript"),
    i.readyState
      ? (i.onreadystatechange = function () {
          ("loaded" != i.readyState && "complete" != i.readyState) ||
            ((i.onreadystatechange = null), t(r));
        })
      : (i.onload = function () {
          t(r);
        }),
    (i.src = e),
    document.getElementsByTagName("head")[0].appendChild(i);
}
function RCTSetCookie(e, t, r) {
  var i = new Date(),
    r =
      (i.setTime(i.getTime() + 24 * r * 60 * 60 * 1e3),
      "expires=" + i.toUTCString());
  document.cookie =
    e +
    "=" +
    t +
    ";" +
    r +
    ";path=/;" +
    ("localhost" === domain_name ? "" : "SameSite=None; Secure");
}
function RCTSetLocalStorage(e, t, r) {
  localStorage.setItem(e, t);
}
function RCTGetLocalStorage(e) {
  return localStorage.getItem(e);
}
function RCTRemoveLocalStorage(e) {
  return localStorage.removeItem(e);
}
function RCTGetCookie(e) {
  for (
    var t = (e = null != e ? e : "flash_msg") + "=",
      r = document.cookie.split(";"),
      i = 0;
    i < r.length;
    i++
  ) {
    for (var o = r[i]; " " == o.charAt(0); ) o = o.substring(1);
    if (0 == o.indexOf(t)) return o.substring(t.length, o.length);
  }
  return "";
}
function RCTremoveCookie(e) {
  var t = new Date(),
    t = (t.setTime(t.getTime() + 1e3), "; expires=" + t.toGMTString());
  document.cookie = e + "=" + t + "; path=/";
}
function RCTgetParameterByName(e, t) {
  t = "" == t || null == t ? window.location.search : t;
  e = RegExp("[?&]" + e + "=([^&]*)").exec(t);
  return e && decodeURIComponent(e[1].replace(/\+/g, " "));
}
function RCT_check_our_order() {
  var e = RCTGetLocalStorage("RCT-OurOrder");
  e &&
    jQueryRCT.ajax({
      url: reconvertAjaxUrl,
      type: "post",
      dataType: "json",
      async: !1,
      data: {
        order_id: rct_order_id,
        shop: rct_shop,
        action: "count_revenue",
        details: e,
        store_client_id: rct_store_id,
        rctShopInfo: rctShopInfo,
      },
      success: function (e) {
        "success" == e.msg && RCTRemoveLocalStorage("RCT-OurOrder");
      },
    });
}
window.Checkout && window.Checkout.jQuery
  ? ((void 0 === window.Checkout.jQuery.fn.jquery ||
      window.Checkout.jQuery.fn.jquery < "3.4.0") &&
      window.Checkout.jQuery.getScript(
        "https://code.jquery.com/jquery-3.4.0.min.js",
        function (e, t, r) {}
      ),
    (jQueryRCT = window.Checkout.jQuery),
    RCT_init())
  : window.jQuery
  ? ((void 0 === window.jQuery.fn.jquery ||
      window.jQuery.fn.jquery < "3.4.0") &&
      window.jQuery.getScript(
        "https://code.jquery.com/jquery-3.4.0.min.js",
        function (e, t, r) {}
      ),
    (jQueryRCT = window.jQuery),
    RCT_init())
  : ((script = document.createElement("SCRIPT")),
    document.getElementsByTagName("head")[0].appendChild(script),
    (script.async = !0),
    (script.src = "https://code.jquery.com/jquery-3.4.0.min.js"),
    (script.type = "text/javascript"),
    (script.onload = function () {
      (jQueryRCT = window.jQuery), RCT_init();
    }));
var RCTLoadStyle = function (e) {
  var t = document.getElementsByTagName("head")[0],
    r = document.createElement("link");
  (r.rel = "stylesheet"),
    (r.type = "text/css"),
    (r.href = e),
    (r.media = "all"),
    t.appendChild(r);
};
function reConvert(e) {
  var t = jQueryRCT(location).attr("href"),
    r =
      ((e = null == e ? "" : e),
      jQueryRCT(".content-box:first").addClass("reconvert-order-confirmation"),
      jQueryRCT(".content-box:last").addClass("reconvert-customer-information"),
      "localhost" === location.hostname || "127.0.0.1" === location.hostname
        ? RCTLoadStyle(
            RCT_ASSETS_URL + "assets/css/rct_front_application.mini.css"
          )
        : RCTLoadStyle(RCT_ASSETS_URL + "assets/css/rct_front_application.css"),
      RCTLoadStyle(RCT_ASSETS_URL + "assets/css/rct_date-picker-bootstrap.css"),
      RCTLoadStyle(
        "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      ),
      RCTLoadStyle(
        "https://fonts.googleapis.com/css?family=Concert+One|Lato|Lora|Montserrat|Noto+Sans|Nunito+Sans|Open+Sans|Oswald|PT+Sans|Prompt|Raleway|Roboto|Slabo+27px|Source+Sans+Pro|Work+Sans&display=swap"
      ),
      {}),
    i =
      ((r.action = "reconvert"),
      (r.customer_id = rct_customer_id),
      (r.order_id = rct_order_id),
      (r.triggerBase = e),
      (r.order_detail = Shopify.checkout),
      (r.rctShopInfo = rctShopInfo),
      (r.currentUrl = t),
      (r.payNow = jQueryRCT(".notice .notice__content a").text()),
      jQueryRCT.post(reconvertAjaxUrlnew + "/reconvert", r, function (e) {
        var t = JSON.parse(e);
        if (void 0 === t.result || "fail" != t.result) {
          (rctShopInfo.funnel_id = t.funnel_id),
            (rct_funnel_id = t.funnel_id),
            t.rest_order_data &&
              ((Shopify.checkout.line_items =
                t.rest_order_data.order_rest_api_line_items),
              (Shopify.checkout.discount_applications =
                t.rest_order_data.discount_applications),
              (Shopify.checkout.order_status_url =
                t.rest_order_data.order_status_url),
              (Shopify.checkout.tags = t.rest_order_data.tags),
              (Shopify.checkout.fulfillment_status =
                t?.rest_order_data?.fulfillment_status || ""),
              (Shopify.checkout.payment_gateway_names =
                t?.rest_order_data?.payment_gateway_names || []),
              (Shopify.checkout.processing_method =
                t?.rest_order_data?.processing_method || "")),
            (cartProductIdArr = RCTarrayColumn(
              Shopify.checkout.line_items,
              "product_id"
            )),
            (starReviewSettingObj = t.star_review_setting),
            (rct_selected_page_id = t.page_id),
            void 0 !== t.theme_style &&
              "" != t.theme_style &&
              jQueryRCT("head").append(
                '<style type="text/css" id="magicDesigner">' +
                  t.theme_style +
                  "</style>"
              ),
            (null != rct_customer_id && null != Shopify.checkout.customer_id) ||
              (rct_customer_id = Shopify.checkout.customer_id = t.customer_id);
          function r(e) {
            e == a &&
              (jQueryRCT(".reconvert-order-confirmation")
                .closest(".main")
                .addClass("RCT-left-bar-custom")
                .siblings(".sidebar")
                .addClass("RCT-right-bar-custom"),
              t.offer_error &&
                jQueryRCT(".reconvert-order-confirmation")
                  .parent()
                  .prepend(t.offer_error),
              jQueryRCT(".reconvert-order-confirmation").before(
                t.order_confirm_before_html
              ),
              jQueryRCT(".reconvert-order-confirmation").after(
                t.order_confirm_after_html
              ),
              jQueryRCT(".reconvert-customer-information").after(
                t.customer_information_after_html
              ),
              jQueryRCT(".sidebar__content").after(t.right_bar_html),
              jQueryRCT(".feature_product_loader").show(),
              RCTsurvey_que_hide(),
              null != t.klaviyo_key &&
                "" != t.klaviyo_key &&
                RCTklaviyo_integration(t.klaviyo_key),
              RCT_get_feature_product_data_api(),
              0 < jQueryRCT(".feature_collection_api_call").length) &&
              RCTgetCollectionProductApiData();
          }
          var i = 0,
            o = t.exteranl_js_arr,
            a = Object.values(o).length;
          if (
            (jQueryRCT("head").append(t.assets),
            jQueryRCT("head").append(t.star_review_style),
            0 < a)
          )
            for (var n = 0; n < a; n++) LoadScript(o[n], r, ++i);
          else r(0);
          var c,
            s,
            d,
            e = t.product_comment,
            e =
              (jQueryRCT.isEmptyObject(e) ||
                1 != e.is_show ||
                (jQueryRCT("head").append(e.style),
                (c = e.html),
                (s = e.prod_comm_arr),
                jQueryRCT(
                  ".order-summary__section__content table.product-table tbody tr.product[data-product-id!='']"
                ).each(function (e) {
                  var t = jQueryRCT(this),
                    r = t.attr("data-variant-id"),
                    i = t.clone(),
                    o = t
                      .find(".product__description .product__description__name")
                      .text();
                  i.attr("data-product-title", o).html(c),
                    null != s[r] &&
                      "NULL" != s[r] &&
                      "" != s[r] &&
                      i.html(
                        '<td colspan="2" class="RTC-prd-cmt" ><b>Comment : </b><i>' +
                          s[r] +
                          "</i></td>"
                      ),
                    t.after(i);
                })),
              t.header),
            e =
              ("" != e &&
                (jQueryRCT("html").addClass("page--banner page--logo-banner"),
                jQueryRCT("html").removeClass("page--no-banner"),
                "0" == e.full_width && "right" != e.logo_text_alignment
                  ? "" != e.main_header &&
                    (jQueryRCT(".banner").remove(),
                    jQueryRCT(".sidebar__header").remove(),
                    jQueryRCT(".main__header").remove(),
                    jQueryRCT(".main__content").before(e.html),
                    jQueryRCT("body").prepend(e.main_header))
                  : "0" == e.full_width && "right" == e.logo_text_alignment
                  ? "" != e.main_header &&
                    (jQueryRCT(".banner").remove(),
                    jQueryRCT(".main__header").remove(),
                    jQueryRCT(".sidebar__header").remove(),
                    jQueryRCT(".sidebar__content:first").before(e.html),
                    jQueryRCT("body").prepend(e.main_header))
                  : "" != e.logo
                  ? (jQueryRCT(".banner").remove(),
                    jQueryRCT(".main__header").remove(),
                    jQueryRCT("body").prepend(e.main_header))
                  : (jQueryRCT(".banner .wrap").append(e.navigation_html),
                    jQueryRCT(".banner .wrap .navbar-nav").css(
                      "text-align",
                      "center"
                    ))),
              t.popup_with_timer),
            u =
              ("1" == e.is_show &&
                (jQueryRCT("body").append(e.html),
                (rct_timer = e.timer),
                setTimeout(function () {
                  "0" == rct_is_open &&
                    (RCTshow_popup(),
                    jQueryRCT("#RCT-popup").show(),
                    RCTstartTimer(rct_timer),
                    rct_is_open++);
                }, e.popup_timing)),
              t.track17_data);
          "1" == u.is_show &&
            (jQueryRCT(
              ".wrap .main__content .section__content .content-box .tracking-info__number"
            ).css("float", "left"),
            (d = 0),
            jQueryRCT(".tracking-info").each(function () {
              d++;
              var e = "",
                e = (
                  jQueryRCT(this).find(".tracking-info__number p a").length
                    ? jQueryRCT(this).find(".tracking-info__number p a")
                    : jQueryRCT(this).find(".tracking-info__number p")
                ).text();
              jQueryRCT(this).append(
                '<div style="float: right;"><button data-section_id="23" data-id="' +
                  d +
                  '" data-lang="' +
                  u.ui_language +
                  '" data-number="' +
                  e +
                  '" name="button" type="button" onclick="RCTtrack17Submit(this);" data-action="Tracked order" class="field__input-btn btn callTrackTrigger" data-style="button-' +
                  d +
                  '" style="background-color:' +
                  u.button_color +
                  ";color:" +
                  u.button_text_color +
                  ';margin:0;height:35px;"><span class="btn__content" aria-hidden="true" data-key="' +
                  d +
                  '_button-text" data-style="button-text-' +
                  d +
                  '">' +
                  u.button_text +
                  "</span></button></div>"
              ),
                jQueryRCT(this).append(
                  '<div id="YQContainer_' + d + '"></div>'
                );
            }),
            0 < d) &&
            LoadScript(
              "//www.17track.net/externalcall.js",
              RCTcountImpression.bind(null, "23", d),
              0
            ),
            setTimeout(function () {
              -1 != navigator.userAgent.indexOf("Safari") &&
                -1 != navigator.userAgent.indexOf("Mac") &&
                -1 == navigator.userAgent.indexOf("Chrome") &&
                jQueryRCT(".RCT-birthdayFrm .field").css("width", "auto");
            }, 300);
        }
      }),
      RCTGetCookie("order_id"));
  setTimeout(function () {
    i == rct_order_id && RCTtrack17Submit(jQueryRCT(".callTrackTrigger"));
  }, 2500),
    null != jQueryRCT(".tracking-info__number strong").text() &&
      jQueryRCT(".tracking-info__number strong").each(function () {
        jQueryRCT(this).text(
          jQueryRCT(this)
            .text()
            .replace("Other tracking number", "Tracking number")
        );
      });
}
function RCTcountImpression(e, t) {
  t = null == t ? 1 : t;
  var r,
    i,
    o = 0,
    a = setInterval(function () {
      (r = jQueryRCT("#RCT-displayPageId").val()),
        (i = jQueryRCT("#RCT-impressionDate").val()),
        10 < ++o && clearInterval(a),
        null != r &&
          null != i &&
          jQueryRCT.ajax({
            url: reconvertAjaxUrlnew + "/count_impression",
            type: "post",
            dataType: "json",
            async: !"count_impression",
            data: {
              shop: rct_shop,
              section_id: e,
              total_impression: t,
              impression_date: i,
              display_page_id: r,
              selected_page_id: rct_selected_page_id,
              store_client_id: rct_store_id,
              rctShopInfo: rctShopInfo,
            },
            success: function (e) {
              clearInterval(a);
            },
          });
    }, 500);
}
function RCTregisterBirthday(t) {
  var e = jQueryRCT(t).siblings("div").children('input[name="birthday"]').val(),
    r = jQueryRCT(t).siblings('input[name="bdate_format"]').val(),
    i = jQueryRCT(t).attr("data-section_id"),
    o = jQueryRCT(t).data("row_section_id");
  jQueryRCT.ajax({
    url: reconvertAjaxUrl,
    type: "post",
    dataType: "json",
    data: {
      shop: rct_shop,
      action: "save_birthday",
      birthday: e,
      birthday_format: r,
      customer_id: rct_customer_id,
      order_id: rct_order_id,
      section_id: i,
      row_section_id: o,
      selected_page_id: rct_selected_page_id,
      cutomer_api_data: rctCustomerApiDataObj,
      customer_name: rct_customer_name,
      store_client_id: rct_store_id,
      rctShopInfo: rctShopInfo,
    },
    beforeSend: function () {
      jQueryRCT(t).children(".fa.fa-spinner.fa-spin").length <= 0 &&
        jQueryRCT(t)
          .append('<i class="RCT-btn-loader fa fa-spinner fa-spin"></i>')
          .prop("disabled", "true");
    },
    complete: function () {
      jQueryRCT(".RCT-btn-loader").remove();
    },
    success: function (e) {
      "success" == e.result
        ? (RCTupdateBounceRate(),
          void 0 !== e.CUSTOMER_API_DATA_OBJ &&
            (rctCustomerApiDataObj = e.CUSTOMER_API_DATA_OBJ),
          jQueryRCT(".RCT-thankMsg").show(),
          jQueryRCT(".RCT-birthdayFrm").hide(),
          setTimeout(function () {
            jQueryRCT(".RCT-birthDayBlock").remove();
          }, 3e3),
          null != e.is_klaviyo &&
            "1" == e.is_klaviyo &&
            RCTklaviyo_birthday_added(e.email, e.birthday))
        : (jQueryRCT("#section-" + o)
            .find(".RCT-birthday-error")
            .html(e.msg)
            .css("color", "red")
            .show(),
          jQueryRCT(t).removeAttr("disabled"));
    },
  });
}
function RCTsaveProductComment(t) {
  var r = jQueryRCT(t).closest("tr"),
    o = r.attr("data-product-id"),
    a = r.attr("data-variant-id"),
    e = r.attr("data-product-title"),
    n = jQueryRCT(r).find('input[type="text"]').val(),
    i = jQueryRCT(t).attr("data-section_id"),
    c = r.prev().find(".product__description__name").text(),
    s = r.prev().find(".product__description__variant").text();
  jQueryRCT.ajax({
    url: reconvertAjaxUrl,
    type: "post",
    dataType: "json",
    data: {
      shop: rct_shop,
      store_client_id: rct_store_id,
      action: "save_product_comment",
      customer_id: rct_customer_id,
      order_id: rct_order_id,
      product_id: o,
      variant_id: a,
      comment: n,
      section_id: i,
      selected_page_id: rct_selected_page_id,
      item_title: e,
      cutomer_api_data: rctCustomerApiDataObj,
      product_title: c,
      variant_title: s,
      customer_name: rct_customer_name,
      rctShopInfo: rctShopInfo,
    },
    beforeSend: function () {
      jQueryRCT(t).children(".fa.fa-spinner.fa-spin").length <= 0 &&
        jQueryRCT(t)
          .append('<i class="RCT-btn-loader fa fa-spinner fa-spin"></i>')
          .prop("disabled", "true");
    },
    complete: function () {
      jQueryRCT(".RCT-btn-loader").remove();
    },
    success: function (i) {
      var e;
      "success" == i.result
        ? (RCTupdateBounceRate(),
          jQueryRCT(
            ".order-summary__section__content table.product-table tbody tr td div input"
          ).each(function (e) {
            var t = jQueryRCT(this).closest("tr"),
              r = t.attr("data-product-id");
            t.attr("data-variant-id") == a &&
              r == o &&
              (t.html('<td colspan="2" class="RTC-prd-cmt">' + i.msg + "</td>"),
              setTimeout(function () {
                t.html(
                  '<td colspan="2" class="RTC-prd-cmt"><b> Comment : </b><i>' +
                    n +
                    "</i></td>"
                );
              }, 3e3));
          }))
        : ((e =
            '<tr class="RCT-prod-comm-error"><td colspan="2" class="RTC-error-msg"> <center><lable>' +
            i.msg +
            " </lable></center></td></tr>"),
          jQueryRCT(r).after(e).next("tr").css("color", "red"),
          setTimeout(function () {
            jQueryRCT(".RCT-prod-comm-error").remove(),
              jQueryRCT(t).removeAttr("disabled");
          }, 3e3));
    },
  });
}
function RCTgenerateReorder(t) {
  var r = jQueryRCT(t).attr("data-element_id");
  jQueryRCT(".reorderContent" + r).hide(),
    jQueryRCT("#reorder_section_loader_" + r).show(),
    jQueryRCT.ajax({
      url: reconvertAjaxUrl,
      type: "post",
      dataType: "json",
      data: {
        shop: rct_shop,
        store_client_id: rct_store_id,
        action: "generate_reorder",
        customer_id: rct_customer_id,
        order_detail: Shopify.checkout,
        row_section_id: r,
        selected_page_id: rct_selected_page_id,
        rctShopInfo: rctShopInfo,
      },
      beforeSend: function () {
        jQueryRCT(t).children(".fa.fa-spinner.fa-spin").length <= 0 &&
          jQueryRCT(t).append(
            '<i class="RCT-btn-loader fa fa-spinner fa-spin"></i>'
          );
      },
      complete: function () {
        setTimeout(function () {
          jQueryRCT(".RCT-btn-loader").remove();
        }, 2e3);
      },
      success: function (e) {
        "success" == e.result
          ? (RCTcountClick(t),
            null != e.payment_url
              ? RCTCheckURLStatus(e.payment_url)
              : RCTCheckURLStatus(e.invoice_url))
          : ($("#reorder_section_loader_" + r).hide(),
            flashNotice("Something went wrong"));
      },
    });
}
function RCTbottomNotification(e) {
  var t = jQueryRCT(e).attr("data-click"),
    r = jQueryRCT(e).attr("target"),
    i =
      ("accepted" == t && RCTcountClick(e),
      "accepted" != t && jQueryRCT(".RCT #RCT-popup").hide(),
      jQueryRCT(".RCT #countdown_min").val()),
    o = jQueryRCT(".RCT #countdown_sec").val();
  jQueryRCT(e)
    .append('<i class="RCT-btn-loader fa fa-spinner fa-spin"></i>')
    .attr("disabled", "disabled"),
    jQueryRCT.ajax({
      url: reconvertAjaxUrl,
      type: "post",
      dataType: "json",
      async: !1,
      data: {
        shop: rct_shop,
        store_client_id: rct_store_id,
        action: "popup_timer",
        order_id: rct_order_id,
        customer_id: rct_customer_id,
        selected_page_id: rct_selected_page_id,
        rctShopInfo: rctShopInfo,
        min: i,
        sec: o,
      },
      success: function (e) {
        jQueryRCT(".RCT #RCT-popup").hide(),
          RCTSetCookie("RCT-popup", e.id, "1"),
          RCTSetCookie("RCT-popup-time", e.timestamp, "1"),
          RCTSetCookie("RCT-order-id", rct_order_id, "1"),
          RCTSetCookie("RCT-page-id", rct_selected_page_id, "1"),
          RCTSetCookie("RCT-popup-info", e.popupInfo, "1"),
          "decline" == t
            ? (jQueryRCT("body").append(e.html),
              jQueryRCT(".RCT-top-bar").is(":visible") &&
                (jQueryRCT(".RCT-banner").addClass("RCT-top-margin"),
                jQueryRCT(".order-summary-toggle").addClass(
                  "RCT-top-margin-summ"
                )),
              RCTbottomTimer(i, o))
            : null == r || "" == r
            ? (window.location.href = e.redirect)
            : RCTnew_tab_redirect(e.redirect);
      },
    });
}
function RCTnew_tab_redirect(e) {
  window.open(e, "_blank");
}
function RCTstartTimer(e) {
  var t = e < 10 ? "0" + e : e,
    r = 0;
  setInterval(function () {
    --r < 0 &&
      ((r = 59),
      --t < 0 && jQueryRCT("#RCT-popup").remove(),
      (t = t < 10 ? "0" + t : t)),
      (r = r < 10 ? "0" + r : r),
      jQueryRCT(".RCT .countdown-section .min").html(t),
      jQueryRCT(".RCT #countdown_min").val(t),
      jQueryRCT(".RCT .countdown-section .sec").html(r),
      jQueryRCT(".RCT #countdown_sec").val(r);
  }, 1e3);
}
function RCTbottomTimer(e, t) {
  var r = t < 10 ? "0" + t : t;
  setInterval(function () {
    --r < 0 &&
      ((r = 59),
      --e < 0 &&
        (jQueryRCT(".RCT-bar").remove(),
        jQueryRCT(".RCT-banner").removeClass("RCT-top-margin"),
        jQueryRCT(".order-summary-toggle").removeClass("RCT-top-margin-summ")),
      (e = e < 10 ? "0" + e : e)),
      (r = r < 10 ? "0" + r : r),
      jQueryRCT(".RCT-bar .timer.minute").html(e + "m"),
      jQueryRCT(".RCT-bar .timer.sec").html(r + "s");
  }, 1e3);
}
var rctIsUpdateBounceRateCalled = 0;
function RCTupdateBounceRate() {
  var e,
    t = 0,
    r = setInterval(function () {
      (e = jQueryRCT("#RCT-displayPageId").val()),
        10 < ++t && clearInterval(r),
        null != e &&
          0 < parseInt(e) &&
          0 == rctIsUpdateBounceRateCalled &&
          jQueryRCT.ajax({
            url: reconvertAjaxUrlnew + "/update_bounce_rate",
            type: "post",
            dataType: "json",
            async: !1,
            data: {
              shop: rct_shop,
              store_client_id: rct_store_id,
              display_page_id: e,
              rctShopInfo: rctShopInfo,
            },
            success: function (e) {
              "success" == e.result &&
                (clearInterval(r), rctIsUpdateBounceRateCalled++);
            },
          });
    }, 500);
}
function RCTcountClick(e, o, a) {
  var n,
    t,
    r,
    c,
    i,
    s = null != a ? a : "",
    d =
      (null != o &&
        null == a &&
        (o.preventDefault(),
        (s = jQueryRCT(e).attr("href")),
        (n = jQueryRCT(e).attr("target"))),
      jQueryRCT(e).attr("data-section_id")),
    u = "",
    l = "",
    e =
      (null != jQueryRCT(e).data("action") &&
        ((c = (u = jQueryRCT(e).data("action")).replace(
          "Clicked",
          "Purchased after clicking"
        )),
        (r = u.split(":")),
        "18" == d
          ? (c = u.replace("Clicked", "Purchased from"))
          : "24" == d
          ? ((i = $(e).data("id")),
            (t = (e = jQueryRCT(e).closest("#section-" + i))
              .find(".selectedVariantName")
              .val()),
            e.hasClass("product-upsell-large")
              ? (l = e
                  .find(".upsell-quantity-control")
                  .find(".product_qty")
                  .val())
              : e.hasClass("product-upsell-midium")
              ? (l = e.find("#feat_prod_qty" + i + " option:selected").val())
              : e.hasClass("product-upsell-small") && (l = 1),
            (r = u.split(":")),
            (c =
              null != l && 1 < parseInt(l)
                ? "Purchased upsell: " + l + " " + jQueryRCT.trim(r[1])
                : "Purchased upsell: " + jQueryRCT.trim(r[1])),
            "Default Title" != t && (u = u + " - " + t))
          : "25" == d &&
            (c =
              "view all button" != jQueryRCT.trim(r[1])
                ? ((i = r[1]),
                  "Purchased " + jQueryRCT.trim(i) + " recommendation")
                : 'Placed order after clicking the "view all" button')),
      jQueryRCT.ajax({
        url: reconvertAjaxUrl,
        type: "post",
        dataType: "json",
        async: !1,
        data: {
          shop: rct_shop,
          store_client_id: rct_store_id,
          action: "count_click",
          section_id: d,
          order_id: rct_order_id,
          selected_page_id: rct_selected_page_id,
          href: s,
          customer_id: rct_customer_id,
          customer_name: rct_customer_name,
          click_action: u,
          rctShopInfo: rctShopInfo,
        },
        success: function (e) {
          RCTupdateBounceRate();
          var t,
            r,
            i = new Array("8", "10", "24", "25");
          ((0 < parseInt(e.is_revenue) && "-1" == jQueryRCT.inArray(d, i)) ||
            ("25" == d &&
              'Placed order after clicking the "view all" button' == c) ||
            "20" == d) &&
            ((rct_page_name = encodeURIComponent(e.page_name)),
            (rct_order_name = e.order_name),
            (i = {}),
            (t = [
              {
                Section_name: e.section_name,
              },
              {
                Template_name: rct_page_name,
              },
              {
                Original_order_name: e.order_name.replace("#", "%23"),
              },
              {
                Original_order_id: rct_order_id,
              },
              {
                Section_id: d,
              },
              {
                Template_id: rct_selected_page_id,
              },
              {
                Funnel_id: rct_funnel_id,
              },
            ]),
            "1" == rctShopInfo.order_note_status &&
              "" != rctShopInfo.order_note_text &&
              ((r = (r = (r = rctShopInfo.order_note_text.replaceAll(
                "{original order number}",
                rct_order_name
              )).replaceAll("{converting widget}", e.section_name)).replaceAll(
                "{original order link}",
                "https://" +
                  rctShopInfo.store_name +
                  "/admin/orders/" +
                  rct_order_id
              )),
              (i.note = r)),
            null != c &&
              t.push({
                Action: c,
              }),
            (i.additional_details = t),
            RCTSetCookie("RCT-Revenue", JSON.stringify(i), 1)),
            null != o &&
              null == a &&
              (null == n || "" == n
                ? (window.location = s)
                : RCTnew_tab_redirect(s));
        },
      }));
  if (null == o) return e.responseText;
}
function RCTupdateTags(e, t, r) {
  return !0;
}
function RCT_after_jquery() {
  jQueryRCT(document).ready(function () {
    setTimeout(function () {
      RCTupdateBounceRate();
    }, 6e4);
  }),
    jQueryRCT(document).on("click", ".headerMenuToggle", function () {
      jQueryRCT(".RCT-menu .menu-mobile").toggle();
    }),
    jQueryRCT(document).mouseleave(function () {
      "0" == rct_is_open &&
        "" != rct_timer &&
        (RCTshow_popup(),
        jQueryRCT("#RCT-popup").show(),
        RCTstartTimer(rct_timer),
        rct_is_open++);
    }),
    jQueryRCT(document).on("click", ".RCT-bar .close-btn", function (e) {
      jQueryRCT(".RCT-bar").remove(),
        jQueryRCT(".RCT-banner").removeClass("RCT-top-margin"),
        jQueryRCT(".order-summary-toggle").removeClass("RCT-top-margin-summ"),
        RCTremoveCookie("RCT-popup");
    }),
    jQueryRCT(document).on(
      "click",
      "#RCT-popup .modal-content .dismiss",
      function () {
        RCTbottomNotification(this);
      }
    ),
    jQueryRCT(document).on(
      "click",
      "#RCT-popup .modal-content .accepted",
      function () {
        RCTbottomNotification(this);
      }
    ),
    jQueryRCT(document).on("click", "#RCT-popup", function (e) {
      0 < jQueryRCT(e.target).closest(".modal-content").length ||
        RCTbottomNotification(this);
    }),
    jQueryRCT(document).on("click", ".RCT-trigger", function (e) {
      var t = jQueryRCT(this);
      jQueryRCT(t).text() != $("#nxtBtn").text() ||
      "" != RCTsurveyFrmValidation(t)
        ? (jQueryRCT(t)
            .closest(".RCT-survey")
            .find(".RCT-survey--box__row")
            .hide(),
          jQueryRCT(t)
            .closest(".RCT-survey")
            .find("#" + t.attr("rel"))
            .show())
        : (jQueryRCT(t).closest(".RCT-survey").find(".RCT-error-msg").show(),
          setTimeout(function () {
            jQueryRCT(t).closest(".RCT-survey").find(".RCT-error-msg").hide();
          }, 3e3));
    }),
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
    }),
    jQueryRCT(document).on("change", ".option2_options", function () {
      var e = jQueryRCT(this).val(),
        t = jQueryRCT(this).attr("data-id"),
        r = jQueryRCT(
          "#section-" + t + " .variant_detail_section .option1_options"
        ).val();
      jQueryRCT(
        "#section-" + t + " .variant_detail_section .option3_options option"
      ).each(function () {
        void 0 !== js_variant_arr[t][r][e][jQueryRCT(this).val()]
          ? jQueryRCT(this)
              .removeClass("disable_variant")
              .addClass("enable_variant")
              .show()
          : jQueryRCT(this)
              .removeClass("enable_variant")
              .addClass("disable_variant")
              .hide(),
          jQueryRCT(".option3_options").val(
            jQueryRCT(".option3_options .enable_variant").val()
          );
      });
    }),
    jQueryRCT(document).on("change", "select.buyNowBtn", function (e) {
      var t = jQueryRCT(this),
        r = t.find("option:selected").data("price"),
        i = t.closest("form").find(".feature-collection").data("productid");
      t.siblings("input[name=variant_price]").val(r),
        t
          .closest(".btn-group")
          .find("input[name=variant_title]")
          .val(t.find("option:selected").data("title")),
        t.hide(),
        t.closest(".custom-dropdown.small").removeClass("custom-dropdown"),
        t.siblings(".dropdown-loader").show(),
        RCTbuyNowFeatureProduct(t, e, i);
    }),
    jQueryRCT(document).on("click ", "button.buyNowBtn", function (e) {
      var t = jQueryRCT(this),
        r = t.closest("form").find(".feature-collection").attr("DataProductId");
      jQueryRCT(t).children(".fa.fa-spinner.fa-spin").length <= 0
        ? jQueryRCT(t)
            .append(
              '&nbsp;&nbsp;<i class="RCT-btn-loader fa fa-spinner fa-spin"></i>'
            )
            .prop("disabled", "true")
        : jQueryRCT(t).find(".RCT-btn-loader").show(),
        RCTbuyNowFeatureProduct(t, e, r);
    }),
    jQueryRCT(document).on("click", ".btnCollectionClose", function (e) {
      jQueryRCT(this).closest(".FCProductModal").hide(),
        jQueryRCT(".FCPopupProductSlider").slick("unslick"),
        jQueryRCT(".FCPopupProductNavSlider").slick("unslick"),
        jQueryRCT(".FCProductModal").find(".productBodyHtml").html("");
    }),
    jQueryRCT(document).on(
      "change",
      ".features-collection-variant-option .option2_options",
      function () {
        var e = jQueryRCT(this).val(),
          t = jQueryRCT(this).attr("data-id"),
          r = jQueryRCT(this).attr("data-productId"),
          i = jQueryRCT(
            ".quick-product-data-" +
              t +
              " .features-collection-variant-option .option1_options"
          ).val();
        jQueryRCT(
          ".quick-product-data-" +
            t +
            " .features-collection-variant-option .option3_options option"
        ).each(function () {
          void 0 !==
          collection_js_variant_arr[t][r][i][e][jQueryRCT(this).val()]
            ? jQueryRCT(this)
                .removeClass("disable_variant")
                .addClass("enable_variant")
                .show()
            : jQueryRCT(this)
                .removeClass("enable_variant")
                .addClass("disable_variant")
                .hide(),
            jQueryRCT(
              ".quick-product-data-" +
                t +
                " .features-collection-variant-option .option3_options option:selected"
            ).removeAttr("selected"),
            jQueryRCT(
              ".quick-product-data-" +
                t +
                " .features-collection-variant-option .option3_options"
            ).val(jQueryRCT(".option3_options .enable_variant").val()),
            jQueryRCT(
              ".quick-product-data-" +
                t +
                " .features-collection-variant-option .option3_options .enable_variant"
            ).attr("selected", "selected");
        });
      }
    ),
    jQueryRCT(document).on("change", ".productQty", function () {
      jQueryRCT(this).val() <= 0 && jQueryRCT(this).val(1);
      var e = jQueryRCT(this).closest("form"),
        t = parseInt(jQueryRCT(this).val()),
        r = parseFloat(e.find("input[name=product_price]").val()),
        i = e.find("input[name=product_compare_price]").val(),
        o = (o = e
          .find("input[name=product_original_compare_price]")
          .val()).replace("Rs.", "");
      o = Number(o.replace(/[^0-9.-]+/g, ""));
      var a,
        n,
        c,
        s = (s = e.find("input[name=product_original_price]").val()).replace(
          "Rs.",
          ""
        ),
        d =
          ((s = Number(s.replace(/[^0-9.-]+/g, ""))),
          e.find("input[name=cart_discount]").val()),
        u = e.find("input[name=display_price_opt]").val(),
        l = e.find("input[name=display_product_price]").val(),
        p = e.find("input[name=appply_discount_over_value]").val(),
        _ = e.find("input[name=isTimerRunOut]").val(),
        C = e.find("input[name=discount_type]").val();
      "Sold Out" != e.find(".productPrice").text() &&
        ((a = e.find(".productComparePrice").text()),
        0 == u
          ? ((n = l * t), (c = parseFloat(s) * t))
          : "3" == C &&
            ("2" == u || "1" == u) &&
            (0 == Number(p) || Number(p) < Number(s)) &&
            Number(_)
          ? (n = c = parseFloat(s) * t)
          : ((n = r * t), (c = parseFloat(s) * t)),
        null != d && "" != d && (0 == u && (d = 0), (n -= parseFloat(d))),
        Number(n) < 0 && (n = 0),
        e
          .find(".productPrice")
          .html(RCTformat_money(n.toFixed(2), rct_money_format)),
        e
          .find(".productOriginalPrice")
          .html(RCTformat_money(c.toFixed(2), rct_money_format)),
        "" != a) &&
        ((l = parseFloat(i) * t),
        (C = parseFloat(o) * t),
        (Number(_) && parseFloat(l) > parseFloat(n)) ||
        parseFloat(C) > parseFloat(c)
          ? (e
              .find(".productComparePrice")
              .html(RCTformat_money(l.toFixed(2), rct_money_format)),
            e
              .find(".productOriginalComparePrice")
              .html(RCTformat_money(C.toFixed(2), rct_money_format)))
          : (e.find(".productComparePrice").html(),
            e.find(".productOriginalComparePrice").html()));
    }),
    jQueryRCT(document).ready(function () {
      jQueryRCT(document).on("click", ".ty_msg_display", function (e) {
        e.preventDefault();
        var e = jQueryRCT(this).children("option:selected").attr("data-image"),
          t = jQueryRCT(this).closest(".grid-product__content").css("height"),
          r = jQueryRCT(this).attr("data-id"),
          i = jQueryRCT(this).attr("data-index"),
          o =
            ((confirm = "confirm_data_" + r + "_" + i),
            (product = "product_data_" + r + "_" + i),
            jQueryRCT(".grid-product-" + r + "-" + i)
              .find(".product-variant")
              .children("option:selected")
              .attr("data-title")),
          a = jQueryRCT(".grid-product-" + r + "-" + i)
            .find(".product-qty")
            .val();
        (newTitle = o + "  x" + a),
          "undefined" != e &&
            "" != e &&
            null != e &&
            jQueryRCT(this)
              .closest(".grid-product__content")
              .find(".variant-image")
              .attr("src", e),
          jQueryRCT(this)
            .closest(".grid-product-" + r + "-" + i)
            .find(".confirm-variant")
            .html(newTitle),
          jQueryRCT(this)
            .closest(".grid-product-" + r + "-" + i)
            .find("." + confirm)
            .css("height", parseInt(t) - 4),
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          ) &&
            (jQueryRCT(this)
              .closest(".grid-product-" + r + "-" + i)
              .find(".mobile_confirm_btn")
              .css("display", ""),
            jQueryRCT(this)
              .closest(".grid-product-" + r + "-" + i)
              .find(".desktop_confirm_btn")
              .css("display", "none")),
          jQueryRCT(this)
            .closest(".grid-product-" + r + "-" + i)
            .find("." + confirm)
            .css("display", ""),
          jQueryRCT(this)
            .closest(".grid-product-" + r + "-" + i)
            .find("." + product)
            .css("display", "none");
      }),
        jQueryRCT(document).on("click", ".plus", function (e) {
          e.preventDefault();
          var t,
            r,
            e = jQueryRCT(this).attr("data-id"),
            i = jQueryRCT(this).attr("data-index"),
            o = parseFloat(
              jQueryRCT(this)
                .closest(".grid-product-" + e + "-" + i)
                .find(".compare-price")
                .attr("compare-price")
            ),
            a = parseFloat(
              jQueryRCT(this)
                .closest(".grid-product-" + e + "-" + i)
                .find(".product-price")
                .attr("final-price")
            ),
            n = parseFloat(
              jQueryRCT(this)
                .closest(".grid-product-" + e + "-" + i)
                .find(".product-original-price")
                .attr("original-price")
            ),
            c = jQueryRCT(this).closest("form"),
            s = jQueryRCT(c).find(".is_discount_apply").val(),
            d = parseFloat(jQueryRCT(c).find(".discount").val()),
            u = jQueryRCT(c).find(".appply_discount_over_value").val(),
            c = jQueryRCT(c).find(".display_price_opt").val(),
            l = jQueryRCT(this).parent().find(".product-qty").val(),
            p = jQueryRCT(this).parent().find(".isTimerRunOut").val(),
            l = 98 < l ? 99 : ++l;
          "3" == s &&
          ("2" == c || "1" == c) &&
          (0 == Number(u) || Number(u) < Number(n)) &&
          Number(p)
            ? ((t = (o * l).toFixed(2)),
              (r = (parseFloat(t) - parseFloat(d)).toFixed(2)) < 0 &&
                (r = "0.00"))
            : ((t = (o * l).toFixed(2)), (r = (a * l).toFixed(2))),
            (s = RCTformat_money(t.toString(), rct_money_format)),
            (c = RCTformat_money(r.toString(), rct_money_format)),
            Number(t) > Number(r)
              ? (jQueryRCT(this)
                  .closest(".grid-product-" + e + "-" + i)
                  .find(".product-compare-price")
                  .text(s),
                jQueryRCT(this)
                  .closest(".grid-product-" + e + "-" + i)
                  .find(".pop-up-product-compare-price")
                  .text(s))
              : (jQueryRCT(this)
                  .closest(".grid-product__content")
                  .find(".compare-price")
                  .empty(),
                jQueryRCT(this)
                  .closest(".grid-product__content")
                  .find(".pop-up-product-compare-price")
                  .empty()),
            jQueryRCT(this)
              .closest(".grid-product-" + e + "-" + i)
              .find(".product-price")
              .text(c),
            jQueryRCT(this)
              .closest(".grid-product-" + e + "-" + i)
              .find(".pop-up-product-price")
              .text(c),
            jQueryRCT(this).parent().find(".product-qty").val(l);
        }),
        jQueryRCT(document).on("click", ".minus", function (e) {
          e.preventDefault();
          var t,
            r,
            e = jQueryRCT(this).attr("data-id"),
            i = jQueryRCT(this).attr("data-index"),
            o = parseFloat(
              jQueryRCT(this)
                .closest(".grid-product-" + e + "-" + i)
                .find(".compare-price")
                .attr("compare-price")
            ),
            a = parseFloat(
              jQueryRCT(this)
                .closest(".grid-product-" + e + "-" + i)
                .find(".product-price")
                .attr("final-price")
            ),
            n = parseFloat(
              jQueryRCT(this)
                .closest(".grid-product-" + e + "-" + i)
                .find(".product-original-price")
                .attr("original-price")
            ),
            c = jQueryRCT(this).closest("form"),
            s = jQueryRCT(c).find(".is_discount_apply").val(),
            d = parseFloat(jQueryRCT(c).find(".discount").val()),
            u = jQueryRCT(c).find(".appply_discount_over_value").val(),
            c = jQueryRCT(c).find(".display_price_opt").val(),
            l = jQueryRCT(this).parent().find(".product-qty").val(),
            p = jQueryRCT(this).parent().find(".isTimerRunOut").val(),
            l = l <= 1 ? 1 : --l;
          "3" == s &&
          ("2" == c || "1" == c) &&
          (0 == Number(u) || Number(u) < Number(n)) &&
          Number(p)
            ? ((t = (o * l).toFixed(2)),
              (r = (parseFloat(t) - parseFloat(d)).toFixed(2)) < 0 &&
                (r = "0.00"))
            : ((t = (o * l).toFixed(2)), (r = (a * l).toFixed(2))),
            (compare = RCTformat_money(t.toString(), rct_money_format)),
            (final = RCTformat_money(r.toString(), rct_money_format)),
            Number(t) > Number(r)
              ? (jQueryRCT(this)
                  .closest(".grid-product-" + e + "-" + i)
                  .find(".product-compare-price")
                  .text(compare),
                jQueryRCT(this)
                  .closest(".grid-product-" + e + "-" + i)
                  .find(".pop-up-product-compare-price")
                  .text(compare))
              : (jQueryRCT(this)
                  .closest(".grid-product__content")
                  .find(".compare-price")
                  .empty(),
                jQueryRCT(this)
                  .closest(".grid-product__content")
                  .find(".pop-up-product-compare-price")
                  .empty()),
            jQueryRCT(this)
              .closest(".grid-product-" + e + "-" + i)
              .find(".product-price")
              .text(final),
            jQueryRCT(this)
              .closest(".grid-product-" + e + "-" + i)
              .find(".pop-up-product-price")
              .text(final),
            jQueryRCT(this).parent().find(".product-qty").val(l);
        }),
        jQueryRCT(document).on("change", ".product-variant", function () {
          var e = jQueryRCT(this)
              .children("option:selected")
              .attr("data-image"),
            t = jQueryRCT(this).children("option:selected").attr("data-price"),
            r = jQueryRCT(this)
              .children("option:selected")
              .attr("data-variant-price"),
            i = jQueryRCT(this)
              .children("option:selected")
              .attr("product-original-compare-price"),
            o = jQueryRCT(this)
              .children("option:selected")
              .attr("compare-variant-price"),
            a = jQueryRCT(this)
              .closest(".grid-product__content")
              .find(".product-qty")
              .val(),
            n = (t * a).toFixed(2),
            c = (o * a).toFixed(2);
          (final = RCTformat_money(n.toString(), rct_money_format)),
            (finalCompare = RCTformat_money(c.toString(), rct_money_format)),
            "undefined" != e &&
              "" != e &&
              null != e &&
              jQueryRCT(this)
                .closest(".grid-product__content")
                .find(".variant-image")
                .attr("src", e),
            jQueryRCT(this)
              .closest(".grid-product__content")
              .find(".compare-price")
              .attr("compare-price", o),
            Number(i) > Number(r) &&
            jQueryRCT(this)
              .children("option:selected")
              .hasClass("timerRunOutoption")
              ? (jQueryRCT(this)
                  .closest(".grid-product__content")
                  .find(".compare-price")
                  .attr("compare-price", i),
                (i = RCTformat_money(
                  (i = (i * a).toFixed(2)).toString(),
                  rct_money_format
                )),
                jQueryRCT(this)
                  .closest(".grid-product__content")
                  .find(".compare-price")
                  .text(i),
                jQueryRCT(this)
                  .closest(".grid-product__content")
                  .find(".pop-up-product-compare-price")
                  .text(finalCompare),
                (n = ((t = r) * a).toFixed(2)),
                (final = RCTformat_money(n.toString(), rct_money_format)))
              : Number(t) < Number(o)
              ? (jQueryRCT(this)
                  .closest(".grid-product__content")
                  .find(".compare-price")
                  .text(finalCompare),
                jQueryRCT(this)
                  .closest(".grid-product__content")
                  .find(".pop-up-product-compare-price")
                  .text(finalCompare))
              : (jQueryRCT(this)
                  .closest(".grid-product__content")
                  .find(".compare-price")
                  .empty(),
                jQueryRCT(this)
                  .closest(".grid-product__content")
                  .find(".pop-up-product-compare-price")
                  .empty()),
            jQueryRCT(this)
              .closest(".grid-product__content")
              .find(".product-price")
              .attr("final-price", t),
            jQueryRCT(this)
              .closest(".grid-product__content")
              .find(".product-price")
              .text(final),
            jQueryRCT(this)
              .closest(".grid-product__content")
              .find(".pop-up-product-price")
              .text(final);
        }),
        jQueryRCT(document).on("click", ".quick_confirm_display", function (e) {
          e.preventDefault();
          var e = jQueryRCT(this).attr("data-id"),
            t =
              (jQueryRCT(this).attr("data-index"),
              jQueryRCT(this).attr("data-key")),
            r = t.replace("confirm", "product"),
            i = jQueryRCT("#FCProductModal_" + e)
              .find(".productTitle")
              .text(),
            o = jQueryRCT("#FCProductModal_" + e)
              .find(".productQty")
              .val(),
            a = jQueryRCT("#FCProductModal_" + e)
              .find(".option1_options")
              .children("option:selected")
              .text(),
            n = jQueryRCT("#FCProductModal_" + e)
              .find(".option2_options")
              .children("option:selected")
              .text(),
            c = jQueryRCT("#FCProductModal_" + e)
              .find(".productPrice")
              .text(),
            s = jQueryRCT("#FCProductModal_" + e)
              .find(".productComparePrice")
              .text(),
            a = a + "/" + n + " x" + o;
          jQueryRCT("#FCProductModal_" + e)
            .find(".product-confirm-js")
            .text(i),
            jQueryRCT("#FCProductModal_" + e)
              .find(".product-variant-js")
              .text(a),
            jQueryRCT("#FCProductModal_" + e)
              .find(".product-compare")
              .text(s),
            jQueryRCT("#FCProductModal_" + e)
              .find(".product-main-price")
              .text(c),
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            ) &&
              ((n = jQueryRCT(window).height()),
              jQueryRCT(document)
                .find("." + t)
                .css("height", parseInt(n) - 55),
              jQueryRCT(document)
                .find("." + t)
                .find(".mobile_confirm_btn")
                .css("display", ""),
              jQueryRCT(document)
                .find("." + t)
                .find(".desktop_confirm_btn")
                .css("display", "none")),
            jQueryRCT(document)
              .find("." + t)
              .css("display", ""),
            jQueryRCT(document)
              .find("." + r)
              .css("display", "none");
        }),
        jQueryRCT(document).on("click", ".quick_confirm", function (e) {
          var t = jQueryRCT(this),
            r = t.closest("form").find(".feature-collection").data("productid");
          jQueryRCT(t).children(".fa.fa-spinner.fa-spin").length <= 0 &&
            jQueryRCT(t)
              .append(
                '&nbsp;&nbsp;<i class="RCT-btn-loader fa fa-spinner fa-spin"></i>'
              )
              .prop("disabled", "true"),
            RCTbuyNowFeatureProduct(t, e, r);
        }),
        jQueryRCT(document).on("click", ".close-quick", function () {
          var e = jQueryRCT(this).attr("data-key"),
            t = jQueryRCT(this).attr("data-target");
          jQueryRCT(document)
            .find("." + t)
            .css("display", "none"),
            jQueryRCT(document)
              .find("." + e)
              .css("display", "");
        }),
        jQueryRCT(document).on("click", ".confirm_display", function () {
          var e = jQueryRCT(this).attr("data-id"),
            t = jQueryRCT(this).attr("data-index");
          (confirm = "confirm_data_" + e + "_" + t),
            (product = "product_data_" + e + "_" + t),
            jQueryRCT("." + confirm)
              .find(".confirm_btn")
              .trigger("click");
        }),
        jQueryRCT(document).on("click", ".confirm_btn", function (e) {
          jQueryRCT(this).closest(".grid-product__content").css("height");
          var t = jQueryRCT(this).attr("data-id"),
            r = jQueryRCT(this).attr("data-index"),
            i = jQueryRCT(this)
              .closest(".grid-product-" + t + "-" + r)
              .find(".product-variant")
              .children("option:selected")
              .data("variant-price"),
            t =
              (jQueryRCT(this)
                .closest(".grid-product-" + t + "-" + r)
                .find(".product_variant_price")
                .val(i),
              jQueryRCT(this)),
            r = t.closest("form").find(".feature-collection").data("productid");
          jQueryRCT(t).children(".fa.fa-spinner.fa-spin").length <= 0 &&
            jQueryRCT(t)
              .append(
                '&nbsp;&nbsp;<i class="RCT-btn-loader fa fa-spinner fa-spin"></i>'
              )
              .prop("disabled", "true"),
            RCTbuyNowFeatureProduct(t, e, r);
        }),
        jQueryRCT(document).on("click", ".close_confirm", function (e) {
          e.preventDefault();
          var e = jQueryRCT(this).attr("data-id"),
            t = jQueryRCT(this).attr("data-index");
          (jQueryRCT(this).parent().hasClass("confirm_payment")
            ? jQueryRCT(".confirm_payment_" + e + "_" + t)
            : jQueryRCT(".confirm_data_" + e + "_" + t)
          ).css("display", "none"),
            jQueryRCT(".product_data_" + e + "_" + t).css("display", "");
        });
    }),
    jQueryRCT(document).on("click", ".changeProQty", function () {
      var e = jQueryRCT(this)
        .closest(".upsell-quantity-control")
        .find(".product_qty")
        .val();
      "plus" == jQueryRCT(this).data("id")
        ? jQueryRCT(this)
            .closest(".upsell-quantity-control")
            .find(".product_qty")
            .val(parseInt(e) + 1)
        : 1 < e
        ? jQueryRCT(this)
            .closest(".upsell-quantity-control")
            .find(".product_qty")
            .val(parseInt(e) - 1)
        : jQueryRCT(this)
            .closest(".upsell-quantity-control")
            .find(".product_qty")
            .val(1),
        jQueryRCT(this)
          .closest(".upsell-quantity-control")
          .find(".product_qty")
          .trigger("change");
    }),
    jQueryRCT(document).on("click", ".fpAcceptBtn", function () {
      var e = jQueryRCT(this).data("id"),
        t = jQueryRCT("#section-" + e)
          .find(".selectedVariantName")
          .val(),
        r = "",
        i = jQueryRCT(this).closest("#section-" + e),
        o = jQueryRCT(this)
          .closest("#section-" + e)
          .find(".upsell_content_block")
          .css("height");
      "Default Title" != t &&
        i
          .find(".confirm_product_add_block")
          .find(".title_variant")
          .text(t)
          .show(),
        i.hasClass("product-upsell-large")
          ? ((r =
              " x" +
              i.find(".upsell-quantity-control").find(".product_qty").val()),
            jQueryRCT(this)
              .closest("#section-" + e)
              .find(".upsell-btn-large-box")
              .css("height", parseInt(o) - 4))
          : (i.hasClass("product-upsell-midium") ||
              i.hasClass("product-upsell-small")) &&
            ((r =
              "Quentity" !=
                (r = i.find("#feat_prod_qty" + e + " option:selected").val()) &&
              null != r
                ? " x" + r
                : ""),
            jQueryRCT(this)
              .closest("#section-" + e)
              .find(".confirm_product_add_block")
              .css("height", o)),
        i
          .find(".confirm_product_add_block")
          .find(".confirm_product_qty")
          .text(r)
          .show(),
        jQueryRCT(this)
          .closest("#section-" + e)
          .find(".upsell_content_block")
          .css("display", "none"),
        jQueryRCT(this)
          .closest("#section-" + e)
          .find(".confirm_product_add_block")
          .css("display", "");
    }),
    jQueryRCT(document).on("click", ".closeConfirmBlock", function () {
      var e = jQueryRCT(this).data("id");
      jQueryRCT(this)
        .closest("#section-" + e)
        .find(".confirm_product_add_block")
        .css("display", "none"),
        jQueryRCT(this)
          .closest("#section-" + e)
          .find(".upsell_content_block")
          .css("display", "");
    }),
    jQueryRCT(document).on("click", ".confirmProductAdd", function (e) {
      jQueryRCT(this).data("id");
      var t = jQueryRCT(this),
        r = t.closest("form").find(".feature-collection").data("productid");
      jQueryRCT(t).children(".fa.fa-spinner.fa-spin").length <= 0 &&
        jQueryRCT(t)
          .append(
            '&nbsp;&nbsp;<i class="RCT-btn-loader fa fa-spinner fa-spin"></i>'
          )
          .prop("disabled", "true"),
        RCTbuyNowFeatureProduct(t, e, r);
    }),
    jQueryRCT(document).on("click", ".offer_error_close", function () {
      jQueryRCT.ajax({
        url: reconvertAjaxUrlnew + "/offer_error_close",
        type: "post",
        dataType: "json",
        data: {
          order_id: rct_order_id,
          shop: rct_shop,
          store_client_id: rct_store_id,
          rctShopInfo: rctShopInfo,
        },
        beforeSend: function () {
          jQueryRCT(".Polaris-Banner").hide();
        },
        success: function (e) {},
      });
    });
}
function RCTsharepopupwindow(e, t, r, i, o) {
  var a = e,
    i =
      (RCTcountClick(i, "custom event", e),
      RegExp("[?&]RCT-media=([^&]*)").exec(e)),
    i = i && decodeURIComponent(i[1].replace(/\+/g, " ")),
    [i, n, c] = RCTgetParameterByName(
      "RCT-media",
      (e = e.replace(
        /(RCT-media=).*?(&)/,
        "$1" + i + "-" + rct_order_id + "-" + rctShopInfo.funnel_id + "$2"
      ))
    ).split("-"),
    c =
      ((c && i && n) ||
        genrate_db_log("error_page_id_refferel", {
          log: JSON.stringify({
            old_url: a,
            new_url: e,
            order_details: Shopify.checkout,
          }),
          store_client_id: rct_store_id || 0,
          type: "3",
        }),
      screen.width / 2 - t / 2),
    i = screen.height / 2 - r / 2;
  return window.open(
    e,
    "Sharing",
    "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" +
      t +
      ", height=" +
      r +
      ", top=" +
      i +
      ", left=" +
      c
  );
}
function genrate_db_log(e, t) {
  jQueryRCT.ajax({
    url: reconvertAjaxUrl,
    type: "post",
    dataType: "json",
    data: {
      action: "genrate_db_log",
      log: t,
      table: e,
      shop: rct_shop,
    },
  });
}
function RCTsurvey_que_hide() {
  jQueryRCT(".RCT-survey--box__row").not(".current").hide();
}
function RCTsurveyFrmValidation(e) {
  var t = "",
    e = e.closest(".RCT-survey--box__row"),
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
function RCTsurveySubmit(e) {
  var t = jQueryRCT(e),
    e = RCTsurveyFrmValidation(t),
    r = t.attr("data-section_id");
  "" != e
    ? ((e = {
        survey_answer: (e = JSON.stringify(
          jQueryRCT(t.closest("form")).serializeObject()
        )),
        action: "survey_submit",
        store_client_id: rct_store_id,
        shop: rct_shop,
        customer_id: rct_customer_id,
        selected_page_id: rct_selected_page_id,
        order_id: rct_order_id,
        section_id: r,
        customer_name: rct_customer_name,
        rctShopInfo: rctShopInfo,
        cutomer_api_data: rctCustomerApiDataObj,
      }),
      t
        .append('<i class="RCT-btn-loader fa fa-spinner fa-spin"></i>')
        .attr("disabled", "disabled"),
      jQueryRCT.ajax({
        url: reconvertAjaxUrl,
        type: "post",
        dataType: "json",
        data: e,
        success: function (e) {
          "success" == e.result &&
            (RCTupdateBounceRate(),
            jQueryRCT(t).closest("form").hide(),
            jQueryRCT(t).closest("form").siblings(".content-box__row").show(),
            setTimeout(function () {
              jQueryRCT(t).closest(".RCT-survey").remove();
            }, 4500),
            void 0 !== e.CUSTOMER_API_DATA_OBJ) &&
            (rctCustomerApiDataObj = e.CUSTOMER_API_DATA_OBJ);
        },
      }))
    : (t.closest(".RCT-survey").find(".RCT-error-msg").show(),
      setTimeout(function () {
        t.closest(".RCT-survey").find(".RCT-error-msg").hide();
      }, 3e3));
}
function RCTklaviyo_integration(e) {
  var t;
  learnq.push(["account", e]),
    ((e = document.createElement("script")).type = "text/javascript"),
    (e.async = !0),
    (e.src =
      ("https:" == document.location.protocol ? "https://" : "http://") +
      "a.klaviyo.com/media/js/analytics/analytics.js"),
    (t = document.getElementsByTagName("script")[0]).parentNode.insertBefore(
      e,
      t
    );
}
function RCTklaviyo_birthday_added(e, t) {
  learnq.push([
    "identify",
    {
      $email: e,
      Birthday: t,
    },
  ]);
}
function RCTshow_popup() {
  var e,
    t = 0,
    r = setInterval(function () {
      (e = jQueryRCT("#RCT-displayPageId").val()),
        (10 < ++t || null != e) && clearInterval(r),
        null != e &&
          0 == rctIsPopUpTimeDisplay &&
          (rctIsPopUpTimeDisplay++,
          jQueryRCT.ajax({
            url: reconvertAjaxUrlnew + "/is_popup_show",
            type: "post",
            dataType: "json",
            async: !1,
            data: {
              shop: rct_shop,
              store_client_id: rct_store_id,
              order_id: rct_order_id,
              customer_id: rct_customer_id,
              selected_page_id: rct_selected_page_id,
              display_page_id: e,
              rctShopInfo: rctShopInfo,
            },
          }));
    }, 500);
}
function RCTtrack17Submit(e) {
  RCTSetCookie("order_id", "");
  var t = jQueryRCT(e).attr("data-id"),
    r = jQueryRCT(e).attr("data-lang"),
    i = jQueryRCT(e).attr("data-number");
  jQueryRCT.ajax({
    url: reconvertAjaxUrl,
    type: "post",
    dataType: "json",
    async: !1,
    data: {
      shop: rct_shop,
      store_client_id: rct_store_id,
      action: "track_order_17_trigger",
      order_id: rct_order_id,
      customer_id: rct_customer_id,
      tracking_number: i,
      rctShopInfo: rctShopInfo,
      cutomer_api_data: rctCustomerApiDataObj,
    },
  }),
    RCTcountClick(e),
    YQV5.trackSingle({
      YQ_ContainerId: "YQContainer_" + t,
      YQ_Height: 560,
      YQ_Fc: "0",
      YQ_Lang: r,
      YQ_Num: i,
    });
}
function RCTget_product_from_cart(e, t) {
  return [
    (t =
      "cheap" == t
        ? e.reduce(function (e, t) {
            return parseFloat(e.price) < parseFloat(t.price) ? e : t;
          })
        : e.reduce(function (e, t) {
            return parseFloat(e.price) > parseFloat(t.price) ? e : t;
          })).product_id,
    t.variant_id,
  ];
}
function RCTarrayColumn(e, r) {
  return e.map(function (e, t) {
    return e[r];
  });
}
function arrayIntersect(e) {
  var t,
    r = {},
    i = arguments.length,
    o = i - 1,
    a = "",
    n = 0,
    c = "";
  e: for (a in e)
    t: for (n = 1; n < i; n++) {
      for (c in (t = arguments[n]))
        if (t[c] === e[a]) {
          n === o && (r[a] = e[a]);
          continue t;
        }
      continue e;
    }
  return r;
}
function RCT_get_feature_product_data_api() {
  var e,
    o = [],
    a = [],
    l = {},
    p = [],
    n = [],
    t = [],
    c = [],
    s = {},
    d = {},
    u = {};
  Shopify.checkout.line_items.map(function (e) {
    t.push(e.product_id);
  }),
    jQueryRCT(".feature_product_api_call").each(function () {
      var e,
        t,
        r = jQueryRCT(this).data("rowid"),
        i =
          (o.push(jQueryRCT(this).data("rowid")),
          jQueryRCT(this).data("productid"),
          jQueryRCT(this).data("rowid"),
          jQueryRCT(this).data("productid"));
      "recommendation" == i ||
      "rebuy" == i ||
      "recomatic" == i ||
      "personalized" == i ||
      "wiser" == i
        ? (c.push(jQueryRCT(this).data("rowid")),
          (rows_products[jQueryRCT(this).data("rowid")] = i),
          (d[r] = i))
        : ((e = i),
          isNaN(i)
            ? 0 <
                (t = RCTget_product_from_cart(Shopify.checkout.line_items, i))
                  .length &&
              ((i = t[0]),
              (rows_products[jQueryRCT(this).data("rowid")] = i),
              (l[jQueryRCT(this).data("rowid")] = t[1]),
              (s[r] = i))
            : ((rows_products[jQueryRCT(this).data("rowid")] = i),
              (s[r] = jQueryRCT(this).data("productid"))),
          a.push(i),
          null != (t = jQueryRCT(this).data("alt-productid")) &&
            "" != t &&
            "number" == typeof e &&
            (a.push((u[r] = t)),
            n.push(t),
            (rows_alt_products[jQueryRCT(this).data("rowid")] = t)));
    }),
    a[0] || c[0]
      ? ((e = {
          page_id: "FRONT_PAGE",
          action: "get_feature_product_data_api",
          rows_product_ids: JSON.stringify(s),
          rows_dynamic_products: JSON.stringify(d),
          rows_alter_products: JSON.stringify(u),
          row_ids: o,
          selected_page_id: rct_selected_page_id,
          all_product_ids: t,
          rctShopInfo: rctShopInfo,
        }),
        jQueryRCT.ajax({
          url: reconvertAjaxUrl,
          type: "post",
          dataType: "json",
          data: e,
          success: function (u) {
            "success" == u.result &&
              ((js_variant_arr = u.js_variant_arr),
              (featureProductRowsSettings = u.rows_settings),
              "" == u.products &&
                "" == u.alter_products_data &&
                jQueryRCT.each(rows_products, function (e, t) {
                  jQueryRCT("#feat_prod_section_loader_" + e).hide(),
                    jQueryRCT("#feat_prod_section_data_" + e).remove();
                }),
              jQueryRCT.each(o, function (e, t) {
                var r = "";
                if (
                  (null != u.products[t]
                    ? (jQueryRCT(".variants_arr" + t).val(
                        u.variants_arr[t + "_final"]
                      ),
                      (r = u.products[t]))
                    : null != u.alter_products_data[t] &&
                      (jQueryRCT(".variants_arr" + t).val(
                        u.variants_arr[t + "_other"]
                      ),
                      (r = u.alter_products_data[t])),
                  "" != r)
                ) {
                  var i = r.id,
                    o = featureProductRowsSettings[t],
                    a =
                      ("1" == o.is_timer_added &&
                        RCTstartWidgetTimer(rct_order_id, t, o.timer_style),
                      o.default_variants);
                  if ("0" == o.product_type)
                    null == u.products[t] && (a = o[i][0].variant_id);
                  else if (
                    -1 !=
                    jQueryRCT.inArray(o.product_type, ["3", "4", "5", "6", "7"])
                  ) {
                    if (null == r) {
                      if ("0" != o.alternate_option) return;
                      if (null == o.alternate_product_id) return;
                      (i = o.alternate_product_id),
                        (rows_products[t] = i),
                        (featureProductRowsSettings[t].is_show_prod_desc = 1),
                        (featureProductRowsSettings[t].is_show_vendor = 0),
                        (featureProductRowsSettings[t].is_show_qty = 1),
                        (featureProductRowsSettings[t].is_show_variant = 1),
                        (o = featureProductRowsSettings[t]);
                    }
                  } else "1" != o.product_type && o.product_type;
                  jQueryRCT("#section-" + t + " .putProductHandle").attr({
                    "data-handle": RCThtmlSpecialCharacterDecode(r.handle),
                    "data-id": r.id,
                  }),
                    jQueryRCT("#section-" + t + " .loox-rating").attr(
                      "data-id",
                      r.id
                    ),
                    jQueryRCT(
                      "#section-" +
                        t +
                        " .loox-rating, #section-" +
                        t +
                        " .stamped-product-reviews-badge"
                    ).attr("data-id", r.id),
                    jQueryRCT(
                      "#section-" + t + " .title-above-image.addFromApi"
                    ).html(RCThtmlSpecialCharacterDecode(r.title)),
                    jQueryRCT(
                      "#section-" + t + " .title-belove-image.addFromApi"
                    ).html(RCThtmlSpecialCharacterDecode(r.title)),
                    jQueryRCT(
                      "#section-" + t + " .product-title .addFromApi"
                    ).text(RCThtmlSpecialCharacterDecode(r.title)),
                    void 0 ===
                      jQueryRCT("#section-" + t + " .buyNowBtn").attr(
                        "data-action"
                      ) &&
                      (jQueryRCT("#section-" + t + " .buyNowBtn").attr(
                        "data-action",
                        "Clicked upsell: " +
                          RCThtmlSpecialCharacterDecode(r.title)
                      ),
                      jQueryRCT("#section-" + t + " .confirmProductAdd").attr(
                        "data-action",
                        "Clicked upsell: " +
                          RCThtmlSpecialCharacterDecode(r.title)
                      ),
                      jQueryRCT("#section-" + t + " #dragable_btn" + t).attr(
                        "data-action",
                        "Clicked upsell: " +
                          RCThtmlSpecialCharacterDecode(r.title)
                      ),
                      jQueryRCT("#section-" + t + " .slider_" + t).attr(
                        "data-action",
                        "Clicked upsell: " +
                          RCThtmlSpecialCharacterDecode(r.title)
                      )),
                    jQueryRCT("#section-" + t + " .vendor-title").text(
                      RCThtmlSpecialCharacterDecode(r.vendor)
                    ),
                    "0" == o.is_show_vendor &&
                      jQueryRCT("#section-" + t + " .vendor-title").remove();
                  i = !1;
                  if ("0" == o.layout)
                    void 0 !== r.variants_options && null !== r.variants_options
                      ? (void 0 !== r.variants_name[0] &&
                        null !== r.variants_name[0]
                          ? ((i = !0),
                            jQueryRCT(
                              "#section-" +
                                t +
                                " .variant_detail_section .option1"
                            ).text(
                              RCThtmlSpecialCharacterDecode(r.variants_name[0])
                            ),
                            jQueryRCT(
                              "#section-" +
                                t +
                                " .variant_detail_section .option1_options"
                            ).html(r.variants_options[r.variants_name[0]]))
                          : jQueryRCT(
                              "#section-" +
                                t +
                                " .variant_detail_section .allOptionDiv"
                            ).hide(),
                        void 0 !== r.variants_name[1] &&
                        null !== r.variants_name[1]
                          ? (jQueryRCT(
                              "#section-" +
                                t +
                                " .variant_detail_section .option2"
                            ).text(
                              RCThtmlSpecialCharacterDecode(r.variants_name[1])
                            ),
                            jQueryRCT(
                              "#section-" +
                                t +
                                " .variant_detail_section .option2_options"
                            ).html(r.variants_options[r.variants_name[1]]))
                          : jQueryRCT(
                              "#section-" +
                                t +
                                " .variant_detail_section .option2Div"
                            ).hide(),
                        void 0 !== r.variants_name[2] &&
                        null !== r.variants_name[2]
                          ? (jQueryRCT(
                              "#section-" +
                                t +
                                " .variant_detail_section .option3"
                            ).text(
                              RCThtmlSpecialCharacterDecode(r.variants_name[2])
                            ),
                            jQueryRCT(
                              "#section-" +
                                t +
                                " .variant_detail_section .option3_options"
                            ).html(r.variants_options[r.variants_name[2]]))
                          : (jQueryRCT(
                              "#section-" +
                                t +
                                " .variant_detail_section .option3Div"
                            ).hide(),
                            jQueryRCT(
                              "#section-" + t + " .variant_detail_section"
                            ).removeClass("upsell-wrap-four")))
                      : (jQueryRCT(
                          "#section-" +
                            t +
                            " .variant_detail_section .allOptionDiv"
                        ).hide(),
                        jQueryRCT(
                          "#section-" + t + " .variant_detail_section"
                        ).removeClass("upsell-wrap-four"));
                  else {
                    var n = "",
                      c = ((feature_product_price = o[r.id]), []),
                      s = [];
                    if (
                      (jQueryRCT.each(feature_product_price, function (e, t) {
                        (1 == t.sold_out ? c : s).push(t);
                      }),
                      (feature_product_price = jQueryRCT.merge(
                        jQueryRCT.merge([], s),
                        c
                      )),
                      jQueryRCT.each(feature_product_price, function (e, t) {
                        "Default Title" != t.op1 &&
                          (n +=
                            '<option value="' +
                            t.variant_id +
                            '">' +
                            RCThtmlSpecialCharacterDecode(t.variant_title) +
                            "</option>");
                      }),
                      "" !=
                        (n =
                          0 != o.default_variants && "0" == o.is_show_variant
                            ? n.replace(
                                'value="' + o.default_variants + '"',
                                'value="' + o.default_variants + '" selected'
                              )
                            : n))
                    ) {
                      i = !0;
                      try {
                        jQueryRCT(
                          "#section-" + t + " .upsell-vairent .variant_options"
                        ).html(n);
                      } catch (e) {}
                    } else
                      try {
                        jQueryRCT(
                          "#section-" + t + " .singleVariantBox"
                        ).hide();
                      } catch (e) {}
                  }
                  try {
                    jQueryRCT(
                      "#section-" + t + " .feat_prod_description.addFromApi"
                    ).html(RCThtmlSpecialCharacterDecode(r.body_html));
                  } catch (e) {
                    console.log("Product description issue");
                  }
                  null != l[t] && (r.selected_variant_id = l[t]);
                  var d = r.images;
                  void 0 !== r.images &&
                    null !== r.images &&
                    (jQueryRCT("#section-" + t + " .slider_main").html(d),
                    1 == r.more_images
                      ? jQueryRCT("#section-" + t + " .slider_sub").html(d)
                      : (jQueryRCT("#section-" + t + " .slider_sub").html(""),
                        jQueryRCT(".main_slider_img_" + t).css("width", "100%"),
                        jQueryRCT(
                          ".main_slider_img_" + t + " .fpSlider_" + t + " div"
                        ).css("text-align", "center"))),
                    jQueryRCT("#section-" + t + " .selectedProductId").val(
                      r.id
                    ),
                    RCT_set_feature_product_price(
                      t,
                      i,
                      !0,
                      a,
                      o.default_variant_text,
                      o.variant_id
                    ) &&
                      (RCTchange_product_price(
                        jQueryRCT(".option1_options" + t),
                        t,
                        !0
                      ),
                      -1 == jQueryRCT.inArray(t, p)) &&
                      p.push(parseInt(t));
                }
              }));
          },
          error: function (e) {
            console.log("get_feature_product_data_api error ");
          },
          complete: function (e) {
            var t,
              r,
              i = o.length;
            jQueryRCT.each(o, function (e, r) {
              -1 == jQueryRCT.inArray(r, p)
                ? (i--,
                  jQueryRCT("#feat_prod_section_loader_" + r).hide(),
                  jQueryRCT("#feat_prod_section_data_" + r).remove())
                : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                  ) &&
                  "0" == featureProductRowsSettings[r].layout &&
                  (init_draggable(),
                  $("#dragable_btn" + r).draggable({
                    axis: "y",
                    stop: function (e, t) {
                      $("#dragable_btn" + r).css("top", ""),
                        RCTbuyNowFeatureProduct($(this), e, "");
                    },
                  }));
            }),
              0 < i && RCTcountImpression("24", i),
              0 < jQueryRCT(".alr-display-review-badge").length &&
                (jQueryRCT.ajax({
                  type: "GET",
                  url: "https://alireviews-cdn.fireapps.vn/js/frontend/45/comment.js?version=5.2.2",
                  dataType: "script",
                  cache: !0,
                }),
                (t = jQueryRCT(".alr-display-review-badge").attr("product-id")),
                (r = jQueryRCT(".alr-display-review-badge").data(
                  "row-section-id"
                )),
                jQueryRCT(".alr-display-review-badge").each(function () {
                  (t = jQueryRCT(this).attr("product-id")),
                    (r = jQueryRCT(this).data("row-section-id")),
                    RCTaliAppReview(t, r, "1");
                })),
              0 < jQueryRCT(".judgemeRating").length && RCTjudgemeReview(),
              0 < jQueryRCT(".wc_product_review_badge_reconvert").length &&
                RCTrivyoStarReview(),
              0 < jQueryRCT(".loox-rating").length &&
                ("undefined" == typeof LOOX
                  ? jQueryRCT.ajax({
                      type: "GET",
                      url: "//loox.io/widget/loox.js?shop=" + rct_shop,
                      dataType: "script",
                      cache: !0,
                    })
                  : ("function" == typeof drawRating && drawRating(),
                    "undefined" != typeof LOOX &&
                      "function" == typeof LOOX.drawRating &&
                      LOOX.drawRating())),
              0 < jQueryRCT(".stamped-product-reviews-badge").length &&
                ("undefined" == typeof StampedFn ||
                "function" != typeof StampedFn.loadBadges
                  ? jQueryRCT.ajax({
                      type: "GET",
                      url:
                        "//cdn-stamped-io.azureedge.net/files/widget.min.js?shop=" +
                        rct_shop,
                      dataType: "script",
                      cache: !0,
                    })
                  : StampedFn.loadBadges());
          },
        }))
      : jQueryRCT.each(rows_products, function (e, t) {
          jQueryRCT("#feat_prod_section_loader_" + e).hide(),
            jQueryRCT("#feat_prod_section_data_" + e).remove();
        });
}
function RCTaliAppReview(e, n, c) {
  jQueryRCT.ajax({
    url: reconvertAjaxUrlnew + "/get_ali_review_settings",
    type: "post",
    dataType: "json",
    data: {
      shop: rct_shop,
      rctShopInfo: rctShopInfo,
      product_id: e,
      call_from: c,
      row_id: n,
    },
    success: function (o) {
      var e, t, a;
      "success" == o.result &&
        ((e = o.data.avg_star),
        (t = Object.keys(e).length),
        (a = 0),
        jQueryRCT.each(e, function (e, t) {
          var r =
            '<div class="added-product-skelton star-review-skelton"><div class="star-review">';
          if (0 == t)
            (r +=
              '<em class="wc_icon_color"><svg style="fill:orange" viewBox="0 0 55.867 55.867" enable-background="new 0 0 19.481 19.481"><g></g></svg></em></div></div>'),
              jQueryRCT(".aliStarDsiplay_" + n + "_" + e).html(r),
              a++;
          else {
            for (i = 0; i < 5; i++)
              t <= i
                ? (r +=
                    '<em class="wc_icon_color"><svg style="fill:orange" viewBox="0 0 55.867 55.867" enable-background="new 0 0 19.481 19.481"><g><path d="M11.287,54.548c-0.207,0-0.414-0.064-0.588-0.191c-0.308-0.224-0.462-0.603-0.397-0.978l3.091-18.018L0.302,22.602 c-0.272-0.266-0.37-0.663-0.253-1.024c0.118-0.362,0.431-0.626,0.808-0.681l18.09-2.629l8.091-16.393 c0.168-0.342,0.516-0.558,0.896-0.558l0,0c0.381,0,0.729,0.216,0.896,0.558l8.09,16.393l18.091,2.629 c0.377,0.055,0.689,0.318,0.808,0.681c0.117,0.361,0.02,0.759-0.253,1.024L42.475,35.363l3.09,18.017 c0.064,0.375-0.09,0.754-0.397,0.978c-0.308,0.226-0.717,0.255-1.054,0.076l-16.18-8.506l-16.182,8.506 C11.606,54.51,11.446,54.548,11.287,54.548z M3.149,22.584l12.016,11.713c0.235,0.229,0.343,0.561,0.287,0.885L12.615,51.72 l14.854-7.808c0.291-0.154,0.638-0.154,0.931,0l14.852,7.808l-2.836-16.538c-0.056-0.324,0.052-0.655,0.287-0.885l12.016-11.713 l-16.605-2.413c-0.326-0.047-0.607-0.252-0.753-0.547L27.934,4.578l-7.427,15.047c-0.146,0.295-0.427,0.5-0.753,0.547L3.149,22.584z"/></g></svg></em>')
                : (r +=
                    '<em class="wc_icon_color"><svg style="fill:orange" viewBox="0 0 19.481 19.481" enable-background="new 0 0 19.481 19.481"><g><path d="m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z"/></g></svg></em>');
            (r +=
              '</div><span class="star-product-review-title"> &nbsp;' +
              o.data.total_review[e] +
              '<span style="color:' +
              starReviewSettingObj.review_cnt_color +
              '"><span class="">&nbsp;reviews</span></span></span></div>'),
              jQueryRCT(
                2 == c
                  ? ".aliStarDsiplay_" + n + "_" + e
                  : ".aliStarDsiplay" + n
              ).html(r);
          }
        }),
        t == a) &&
        jQueryRCT(".aliStartMainDiv_" + n).hide();
    },
  });
}
function addEscape(e) {
  return (e + "").replace(/[\\"' ]/g, "\\$&").replace(/\u0000/g, "\\0");
}
function RCT_set_feature_product_price(t, N, e, r, i, o) {
  var a,
    n,
    c,
    s,
    d = !0,
    u = jQueryRCT("#section-" + t + " .option1_options")
      .find(":selected")
      .text(),
    l = jQueryRCT("#section-" + t + " .option2_options")
      .find(":selected")
      .text(),
    p = jQueryRCT("#section-" + t + " .option3_options")
      .find(":selected")
      .text(),
    _ = jQueryRCT("#section-" + t + " .variant_options")
      .find(":selected")
      .val(),
    C = "",
    T = "",
    y = "",
    m = "",
    R = 0,
    f = 0,
    h = !1,
    j = "",
    v = "",
    Q = 0,
    g = [],
    b = [],
    w = 0,
    S = 0,
    A = 0,
    g = [],
    b = [],
    x = jQueryRCT("#section-" + t + " .selectedProductId").val(),
    x = (j = featureProductRowsSettings[t])[x],
    k =
      ((total_variant_combination = x.length),
      jQueryRCT.each(x, function (e, t) {
        (1 == t.sold_out ? g : b).push(t);
      }),
      (x = jQueryRCT.merge(jQueryRCT.merge([], b), g)),
      1 == e &&
        ((c = n = a = !0),
        (s = 300),
        (1 != j.secondary_options && "0" == j.layout) || ((a = !1), (s = 0)),
        1 == j.secondary_options || "0" != j.layout
          ? (c = n = !1)
          : 2 == j.secondary_options
          ? (n = !1)
          : 3 == j.secondary_options && (c = !1),
        (P = new Array("ar", "he", "fa", "ur", "he-IL", "ar-SA")),
        (2 != j.secondary_options && 3 != j.secondary_options) ||
        "-1" == jQueryRCT.inArray(rctShopInfo.theme_language, P)
          ? setTimeout(function () {
              jQueryRCT(".fpSlider_" + t)
                .not(".slick-initialized")
                .slick({
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  speed: s,
                  draggable: a,
                  arrows: n,
                  infinite: !0,
                  cssEase: "linear",
                  asNavFor: ".fpNav_" + t,
                }),
                jQueryRCT(".fpNav_" + t)
                  .not(".slick-initialized")
                  .slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    draggable: a,
                    asNavFor: ".fpSlider_" + t,
                    arrows: c,
                    infinite: !0,
                    focusOnSelect: !0,
                    responsive: [
                      {
                        breakpoint: 1024,
                        settings: {
                          slidesToShow: 3,
                          slidesToScroll: 3,
                          infinite: !0,
                          dots: !1,
                        },
                      },
                      {
                        breakpoint: 600,
                        settings: {
                          slidesToShow: 3,
                          slidesToScroll: 2,
                          infinite: !0,
                        },
                      },
                      {
                        breakpoint: 480,
                        settings: {
                          slidesToShow: 3,
                          slidesToScroll: 1,
                          infinite: !0,
                        },
                      },
                    ],
                  });
            }, 500)
          : setTimeout(function () {
              jQueryRCT(".fpSlider_" + t)
                .not(".slick-initialized")
                .slick({
                  rtl: !0,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  speed: s,
                  draggable: a,
                  arrows: n,
                  infinite: !0,
                  cssEase: "linear",
                  asNavFor: ".fpNav_" + t,
                }),
                jQueryRCT(".fpNav_" + t)
                  .not(".slick-initialized")
                  .slick({
                    rtl: !0,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    draggable: a,
                    asNavFor: ".fpSlider_" + t,
                    arrows: c,
                    infinite: !0,
                    focusOnSelect: !0,
                    responsive: [
                      {
                        breakpoint: 1024,
                        settings: {
                          slidesToShow: 3,
                          slidesToScroll: 3,
                          infinite: !0,
                          dots: !1,
                        },
                      },
                      {
                        breakpoint: 600,
                        settings: {
                          slidesToShow: 3,
                          slidesToScroll: 2,
                          infinite: !0,
                        },
                      },
                      {
                        breakpoint: 480,
                        settings: {
                          slidesToShow: 3,
                          slidesToScroll: 1,
                          infinite: !0,
                        },
                      },
                    ],
                  }),
                jQueryRCT(".RCT.product-upsell-large .slick-next").css(
                  "right",
                  "auto"
                );
            }, 500)),
      1 == e &&
        (jQueryRCT("#section-" + t + " .option1_options")
          .find(
            'option[value="' +
              addEscape(RCThtmlSpecialCharacterDecode(x[0].op1)) +
              '"]'
          )
          .prop("selected", "selected"),
        jQueryRCT("#section-" + t + " .option2_options")
          .find(
            'option[value="' +
              addEscape(RCThtmlSpecialCharacterDecode(x[0].op2)) +
              '"]'
          )
          .prop("selected", "selected"),
        jQueryRCT("#section-" + t + " .option3_options")
          .find(
            'option[value="' +
              addEscape(RCThtmlSpecialCharacterDecode(x[0].op3)) +
              '"]'
          )
          .prop("selected", "selected"),
        (u = jQueryRCT("#section-" + t + " .option1_options")
          .find(":selected")
          .text()),
        (l = jQueryRCT("#section-" + t + " .option2_options")
          .find(":selected")
          .text()),
        (p = jQueryRCT("#section-" + t + " .option3_options")
          .find(":selected")
          .text()),
        (_ = jQueryRCT("#section-" + t + " .variant_options")
          .find(":selected")
          .val())),
      ""),
    I = "",
    x =
      ("0" == j.is_show_variant
        ? ((0 != j.default_variants && j.default_variants) ||
            (j.default_variants = x[0].variant_id || 0),
          jQueryRCT.each(x, function (e, t) {
            t.variant_id == j.default_variants
              ? ("1" != j.is_show_variant &&
                  1 == t.sold_out &&
                  r == t.variant_id &&
                  (h = !0),
                (t.op1 = RCThtmlSpecialCharacterDecode(t.op1)),
                (t.op2 = RCThtmlSpecialCharacterDecode(t.op2)),
                (t.op3 = RCThtmlSpecialCharacterDecode(t.op3)),
                null != t.op3 && "" != t.op3
                  ? (t.variant_id == r &&
                      ((S = t.price), (A = t.compare_at_price)),
                    "" == v &&
                      ((Q = t.variant_id),
                      (v =
                        1 == t.sold_out
                          ? RCThtmlSpecialCharacterDecode(t.variant_title) +
                            " (Sold out) "
                          : RCThtmlSpecialCharacterDecode(t.variant_title))),
                    (w = j.discount_value),
                    "" == k &&
                      ((k = RCThtmlSpecialCharacterDecode(t.variant_title)),
                      (T = t.variant_id)),
                    "1" == j.is_show_variant &&
                      ((o = t.variant_id),
                      (I = t.variant_title),
                      (y = t.variant_image_id)),
                    1 == t.sold_out
                      ? (h = !0)
                      : ((C = t.price),
                        (m = t.compare_at_price),
                        (R = t.position)),
                    r == t.variant_id &&
                      1 != j.is_show_variant &&
                      (y = t.variant_image_id))
                  : null != t.op2 && "" != t.op2
                  ? (t.variant_id == r &&
                      ((S = t.price), (A = t.compare_at_price)),
                    "" == v &&
                      ((Q = t.variant_id),
                      (v =
                        1 == t.sold_out
                          ? RCThtmlSpecialCharacterDecode(t.variant_title) +
                            " (Sold out) "
                          : RCThtmlSpecialCharacterDecode(t.variant_title))),
                    (w = j.discount_value),
                    "" == k &&
                      ((k = RCThtmlSpecialCharacterDecode(t.variant_title)),
                      (T = t.variant_id)),
                    "1" == j.is_show_variant &&
                      ((y = t.variant_image_id),
                      (o = t.variant_id),
                      (I = t.variant_title)),
                    1 == t.sold_out
                      ? (h = !0)
                      : ((C = t.price),
                        (m = t.compare_at_price),
                        (R = t.position)),
                    r == t.variant_id &&
                      1 != j.is_show_variant &&
                      (y = t.variant_image_id))
                  : null != t.op1 && "" != t.op1
                  ? (t.variant_id == r &&
                      ((S = t.price),
                      (A = t.compare_at_price),
                      (y = t.variant_image_id)),
                    "" == v &&
                      ((Q = t.variant_id),
                      (v =
                        1 == t.sold_out
                          ? RCThtmlSpecialCharacterDecode(t.variant_title) +
                            " (Sold out) "
                          : RCThtmlSpecialCharacterDecode(t.variant_title))),
                    (w = j.discount_value),
                    "" == k &&
                      ((k = RCThtmlSpecialCharacterDecode(t.variant_title)),
                      (T = t.variant_id)),
                    "1" == j.is_show_variant &&
                      ((o = t.variant_id),
                      (I = t.variant_title),
                      (y = t.variant_image_id)),
                    1 == t.sold_out
                      ? (h = !0)
                      : ((C = t.price),
                        (m = t.compare_at_price),
                        (R = t.position)))
                  : console.log("Something went wrong"))
              : null != _ &&
                "" != _ &&
                (t.variant_id == r &&
                  ((S = t.price),
                  (A = t.compare_at_price),
                  (y = t.variant_image_id)),
                "" == v &&
                  ((Q = t.variant_id),
                  (v =
                    1 == t.sold_out
                      ? RCThtmlSpecialCharacterDecode(t.variant_title) +
                        " (Sold out) "
                      : RCThtmlSpecialCharacterDecode(t.variant_title))),
                (t.variant_id != _ && "Default Title" != t.op1) ||
                  ((w = j.discount_value),
                  "" == k &&
                    ((k = RCThtmlSpecialCharacterDecode(t.variant_title)),
                    (T = t.variant_id)),
                  "1" == j.is_show_variant &&
                    ((o = t.variant_id),
                    (I = t.variant_title),
                    (y = t.variant_image_id)),
                  1 == t.sold_out
                    ? (h = !0)
                    : ((C = t.price),
                      (m = t.compare_at_price),
                      (R = t.position))),
                1 == t.sold_out) &&
                f++;
          }))
        : jQueryRCT.each(x, function (e, t) {
            "0" == j.layout
              ? ("1" != j.is_show_variant &&
                  1 == t.sold_out &&
                  r == t.variant_id &&
                  (h = !0),
                (t.op1 = RCThtmlSpecialCharacterDecode(t.op1)),
                (t.op2 = RCThtmlSpecialCharacterDecode(t.op2)),
                (t.op3 = RCThtmlSpecialCharacterDecode(t.op3)),
                null != t.op3 && "" != t.op3
                  ? (t.variant_id == r &&
                      ((S = t.price), (A = t.compare_at_price)),
                    "" == v &&
                      ((Q = t.variant_id),
                      (v =
                        1 == t.sold_out
                          ? RCThtmlSpecialCharacterDecode(t.variant_title) +
                            " (Sold out) "
                          : RCThtmlSpecialCharacterDecode(t.variant_title))),
                    t.op1 == u && t.op2 == l && t.op3 == p
                      ? ((w = j.discount_value),
                        "" == k &&
                          ((k = RCThtmlSpecialCharacterDecode(t.variant_title)),
                          (T = t.variant_id)),
                        "1" == j.is_show_variant &&
                          ((o = t.variant_id),
                          (I = t.variant_title),
                          (y = t.variant_image_id)),
                        1 == t.sold_out
                          ? (h = !0)
                          : ((C = t.price),
                            (m = t.compare_at_price),
                            (R = t.position)))
                      : f++,
                    r == t.variant_id &&
                      1 != j.is_show_variant &&
                      (y = t.variant_image_id))
                  : null != t.op2 && "" != t.op2
                  ? (t.variant_id == r &&
                      ((S = t.price), (A = t.compare_at_price)),
                    "" == v &&
                      ((Q = t.variant_id),
                      (v =
                        1 == t.sold_out
                          ? RCThtmlSpecialCharacterDecode(t.variant_title) +
                            " (Sold out) "
                          : RCThtmlSpecialCharacterDecode(t.variant_title))),
                    t.op1 == u && t.op2 == l
                      ? ((w = j.discount_value),
                        "" == k &&
                          ((k = RCThtmlSpecialCharacterDecode(t.variant_title)),
                          (T = t.variant_id)),
                        "1" == j.is_show_variant &&
                          ((y = t.variant_image_id),
                          (o = t.variant_id),
                          (I = t.variant_title)),
                        1 == t.sold_out
                          ? (h = !0)
                          : ((h = !1),
                            (C = t.price),
                            (m = t.compare_at_price),
                            (R = t.position)))
                      : f++,
                    r == t.variant_id &&
                      1 != j.is_show_variant &&
                      (y = t.variant_image_id))
                  : null != t.op1 && "" != t.op1
                  ? (t.variant_id == r &&
                      ((S = t.price),
                      (A = t.compare_at_price),
                      (y = t.variant_image_id)),
                    "" == v &&
                      ((Q = t.variant_id),
                      (v =
                        1 == t.sold_out
                          ? RCThtmlSpecialCharacterDecode(t.variant_title) +
                            " (Sold out) "
                          : RCThtmlSpecialCharacterDecode(t.variant_title))),
                    t.op1 == u || "Default Title" == t.op1
                      ? ((w = j.discount_value),
                        "" == k &&
                          ((k = RCThtmlSpecialCharacterDecode(t.variant_title)),
                          (T = t.variant_id)),
                        "1" == j.is_show_variant &&
                          ((o = t.variant_id),
                          (I = t.variant_title),
                          (y = t.variant_image_id)),
                        1 == t.sold_out
                          ? (h = !0)
                          : ((C = t.price),
                            (m = t.compare_at_price),
                            (R = t.position)))
                      : f++)
                  : console.log("Something went wrong"))
              : null != _ &&
                "" != _ &&
                (t.variant_id == r &&
                  ((S = t.price),
                  (A = t.compare_at_price),
                  (y = t.variant_image_id)),
                "" == v &&
                  ((Q = t.variant_id),
                  (v =
                    1 == t.sold_out
                      ? RCThtmlSpecialCharacterDecode(t.variant_title) +
                        " (Sold out) "
                      : RCThtmlSpecialCharacterDecode(t.variant_title))),
                (t.variant_id != _ && "Default Title" != t.op1) ||
                  ((w = j.discount_value),
                  "" == k &&
                    ((k = RCThtmlSpecialCharacterDecode(t.variant_title)),
                    (T = t.variant_id)),
                  "1" == j.is_show_variant &&
                    ((o = t.variant_id),
                    (I = t.variant_title),
                    (y = t.variant_image_id)),
                  1 == t.sold_out
                    ? (h = !0)
                    : ((C = t.price),
                      (m = t.compare_at_price),
                      (R = t.position))),
                1 == t.sold_out) &&
                f++;
          }),
      jQueryRCT(".fpSlider_" + t).resize(),
      "" != y &&
        (1 == e
          ? setTimeout(function () {
              var e = jQueryRCT(".main_slider_img_" + t)
                .find(".slider_default_image")
                .parent()
                .parent()
                .attr("data-slick-index");
              null != e &&
                (jQueryRCT(".fpSlider_" + t).slick("slickGoTo", e),
                jQueryRCT(".fpNav_" + t).slick("slickGoTo", e));
            }, 700)
          : null ==
            (P = jQueryRCT(
              ".main_slider_img_" + t + " [data-variant-id='" + y + "']"
            )
              .closest(".slick-slide")
              .attr("data-slick-index"))
          ? jQueryRCT(".fpSlider_" + t).resize()
          : (jQueryRCT(".fpSlider_" + t).slick("slickGoTo", P),
            jQueryRCT(".fpNav_" + t).slick("slickGoTo", P))),
      0 != o && null != o
        ? (jQueryRCT("#section-" + t + " .selectedVariantId").val(o),
          jQueryRCT("#section-" + t + " .selectedVariantName").val(I))
        : (jQueryRCT("#section-" + t + " .selectedVariantId").val(T),
          jQueryRCT("#section-" + t + " .selectedVariantName").val(k)),
      ""),
    P =
      ((1 == j.is_show_variant && 0 != k && null != k) ||
        (0 == j.is_show_variant &&
        (0 == r || 0 == i || null == i) &&
        1 < total_variant_combination
          ? ((x = " (" + v + ")"),
            jQueryRCT("#section-" + t + " .selectedVariantName").val(v),
            jQueryRCT("#section-" + t + " .selectedVariantId").val(Q))
          : 0 == j.is_show_variant &&
            0 != r &&
            0 != i &&
            null != i &&
            null != r &&
            ((x = " (" + i + ")"),
            jQueryRCT("#section-" + t + " .selectedVariantName").val(i),
            jQueryRCT("#section-" + t + " .selectedVariantId").val(r),
            (C = S),
            (m = A))),
      " (Default Title)" != x &&
        jQueryRCT("#section-" + t + " .title_variant").text(x),
      0 != R && R--,
      0),
    i =
      ("0" == j.is_show_compare_price || "" == m
        ? ((m = C),
          jQueryRCT(
            "#section-" + t + " .product-price-card .product-compare-api-price"
          ).html(RCTformat_money(m, rct_money_format)),
          "1" == j.is_show_compare_price &&
          parseInt(m) == parseInt(C) &&
          "0" == j.is_show_product_price
            ? (jQueryRCT(
                "#section-" +
                  t +
                  " .product-price-card .product-compare-api-price"
              ).show(),
              jQueryRCT(
                "#section-" +
                  t +
                  " .product-price-card .product-compare-api-price"
              ).css("text-decoration", ""))
            : (jQueryRCT(
                "#section-" +
                  t +
                  " .product-price-card .product-compare-api-price"
              ).hide(),
              P++))
        : parseInt(m) > parseInt(C) ||
          ("1" == j.is_show_compare_price &&
            parseInt(m) == parseInt(C) &&
            "0" == j.is_show_product_price)
        ? (jQueryRCT(
            "#section-" + t + " .product-price-card .product-compare-api-price"
          ).html(RCTformat_money(m, rct_money_format)),
          jQueryRCT(
            "#section-" + t + " .product-price-card .product-compare-api-price"
          ).show(),
          "1" == j.is_show_compare_price &&
            parseInt(m) == parseInt(C) &&
            "0" == j.is_show_product_price &&
            jQueryRCT(
              "#section-" +
                t +
                " .product-price-card .product-compare-api-price"
            ).css("text-decoration", ""))
        : jQueryRCT(
            "#section-" + t + " .product-price-card .product-compare-api-price"
          ).hide(),
      C);
  if (1 == e && "1" != j.is_show_variant && 1 == h)
    (d = !1),
      jQueryRCT("#feat_prod_section_loader_" + t).hide(),
      jQueryRCT("#feat_prod_section_data_" + t).remove();
  else {
    if (1 == e && "0" != j.is_show_variant && 1 == h) {
      if (total_variant_combination == f && "0" != j.layout)
        return (
          (d = !1),
          jQueryRCT("#feat_prod_section_loader_" + t).hide(),
          jQueryRCT("#feat_prod_section_data_" + t).remove(),
          d
        );
      if ("0" == j.layout)
        return (
          (d = !1),
          jQueryRCT("#feat_prod_section_loader_" + t).hide(),
          jQueryRCT("#feat_prod_section_data_" + t).remove(),
          d
        );
    }
    f == total_variant_combination || 1 == h
      ? ((D = "SOLD OUT"),
        (m = ""),
        jQueryRCT("#section-" + t + " .buy-now-btn").attr("disabled", "true"))
      : (jQueryRCT("#section-" + t + " .buy-now-btn").removeAttr("disabled"),
        "" != C && "SOLD OUT" != C
          ? ((D = C),
            Number(D) >= Number(j.discount_over_order_value) &&
              (1 != j.discount || (1 != j.discount_type && 3 != j.discount_type)
                ? 1 == j.discount &&
                  2 == j.discount_type &&
                  Number(j.discount_value) <= 100 &&
                  ((F = jQueryRCT(".timerExpire" + t).val()),
                  (O = jQueryRCT(".expirySettings" + t).val()),
                  "0" == F &&
                    "1" == O &&
                    (jQueryRCT(
                      "#section-" + t + " .product-price-card .product-price"
                    ).addClass("Discount_removed"),
                    jQueryRCT(
                      "#section-" + t + " .product-price-card .product-price"
                    ).hide()),
                  jQueryRCT(
                    "#section-" + t + " .product-price-card .product-price"
                  ).addClass("display-discount-price"),
                  "1" == j.is_show_discounted_price &&
                    0 != parseFloat(j.discount_value) &&
                    0 ==
                      jQueryRCT(
                        "#section-" + t + " .product-price-card .product-price"
                      ).hasClass("Discount_removed") &&
                    (jQueryRCT(
                      "#section-" + t + " .product-price-card .product-price"
                    ).show(),
                    jQueryRCT(
                      "#section-" +
                        t +
                        " .product-price-card .product-compare-api-price"
                    ).css("text-decoration", "line-through"),
                    jQueryRCT(
                      "#section-" +
                        t +
                        " .product-price-card .product-compare-price"
                    ).css("text-decoration", "line-through")),
                  (x = D * (j.discount_value / 100)),
                  (x *= Math.pow(10, 2)),
                  (x = parseFloat(x)),
                  (D = (D - (x /= Math.pow(10, 2)).toFixed(2)).toFixed(2)),
                  "" == m) &&
                  (m = C)
                : ((F = jQueryRCT(".timerExpire" + t).val()),
                  (O = jQueryRCT(".expirySettings" + t).val()),
                  "0" == F &&
                    "1" == O &&
                    (jQueryRCT(
                      "#section-" + t + " .product-price-card .product-price"
                    ).addClass("Discount_removed"),
                    jQueryRCT(
                      "#section-" + t + " .product-price-card .product-price"
                    ).hide()),
                  jQueryRCT(
                    "#section-" + t + " .product-price-card .product-price"
                  ).addClass("display-discount-price"),
                  "1" == j.is_show_discounted_price &&
                    0 != parseFloat(j.discount_value) &&
                    0 ==
                      jQueryRCT(
                        "#section-" + t + " .product-price-card .product-price"
                      ).hasClass("Discount_removed") &&
                    (jQueryRCT(
                      "#section-" + t + " .product-price-card .product-price"
                    ).show(),
                    jQueryRCT(
                      "#section-" +
                        t +
                        " .product-price-card .product-compare-api-price"
                    ).css("text-decoration", "line-through"),
                    jQueryRCT(
                      "#section-" +
                        t +
                        " .product-price-card .product-compare-price"
                    ).css("text-decoration", "line-through")),
                  (D = (D - parseFloat(j.discount_value)).toFixed(2)) < 0 &&
                    (D = (D = 0).toFixed(2)),
                  "" == m && (m = C))))
          : (D = C)),
      "" != m &&
        parseFloat(m) != parseFloat(D) &&
        jQueryRCT("#product_compare_price_" + t).val(m),
      jQueryRCT("#section-" + t + " .selectedVariantPrice").val(C),
      "" == D ||
        "SOLD OUT" == D ||
        isNaN(D) ||
        (D = RCTformat_money(D, rct_money_format)),
      "0" == j.is_show_product_price || "" == i
        ? (jQueryRCT(
            "#section-" + t + " .product-price-card .product-compare-price"
          ).hide(),
          P++)
        : jQueryRCT(
            "#section-" + t + " .product-price-card .product-compare-price"
          ).show(),
      2 < P
        ? jQueryRCT("#section-" + t + " .product-price-card").hide()
        : jQueryRCT("#section-" + t + " .product-price-card").show(),
      "0" == j.is_show_discounted_price ||
      ("1" == j.is_show_discounted_price &&
        "0" == parseFloat(j.discount_value)) ||
      "0" == j.discount
        ? (jQueryRCT(
            "#section-" + t + " .product-price-card .product-price"
          ).hide(),
          jQueryRCT(
            "#section-" + t + " .product-price-card .product-compare-price"
          ).css("text-decoration", "unset"),
          "0" == j.is_show_product_price &&
            jQueryRCT(
              "#section-" + t + " .product-price-card .product-compare-price"
            ).css("text-decoration", "unset"),
          "0" == j.is_show_compare_price &&
          "1" == j.is_show_discounted_price &&
          "0" == parseFloat(j.discount_value) &&
          "0" == j.is_show_product_price
            ? jQueryRCT(
                "#section-" + t + " .product-price-card .product-price"
              ).show()
            : "1" == j.is_show_compare_price &&
              parseInt(m) != parseInt(C) &&
              "0" == j.is_show_product_price &&
              "1" == j.is_show_discounted_price &&
              "0" == parseFloat(j.discount_value) &&
              (jQueryRCT(
                "#section-" + t + " .product-price-card .product-price"
              ).show(),
              jQueryRCT(
                "#section-" +
                  t +
                  " .product-price-card .product-compare-api-price"
              ).css("text-decoration", "line-through")),
          P++)
        : (("1" == j.discount && 0 == j.discount_type) ||
            Number(C) <= Number(j.discount_over_order_value)) &&
          (jQueryRCT(
            "#section-" + t + " .product-price-card .product-price"
          ).hide(),
          (0 == j.is_show_product_price
            ? jQueryRCT(
                "#section-" +
                  t +
                  " .product-price-card .product-compare-api-price"
              )
            : jQueryRCT(
                "#section-" + t + " .product-price-card .product-compare-price"
              )
          ).css("text-decoration", "none"),
          P++);
    var D,
      F,
      O,
      e = j.soldout_text,
      x =
        ("" == j.soldout_text &&
          (e =
            null != jQueryRCT(".soldOutText" + t).val()
              ? jQueryRCT(".soldOutText" + t).val()
              : "SOLD OUT"),
        "SOLD OUT" == D
          ? '<span class="sold_out" style="color:inherit">' + e + "</span>"
          : D);
    jQueryRCT(
      "#section-" + t + " .product-price-card .product-compare-price"
    ).html(RCTformat_money(i, rct_money_format)),
      jQueryRCT("#section-" + t + " .product-price-card .product-price").html(
        x
      ),
      "SOLD OUT" == D &&
        (jQueryRCT(
          "#section-" + t + " .product-price-card .product-compare-api-price"
        ).hide(),
        jQueryRCT(
          "#section-" + t + " .product-price-card .product-compare-price"
        ).hide(),
        jQueryRCT("#section-" + t + " .product-price-card").show(),
        jQueryRCT(
          "#section-" + t + " .product-price-card .product-price"
        ).show()),
      jQueryRCT("#discount_value_" + t).val(w),
      jQueryRCT("#product_price_" + t).val(C),
      setTimeout(function () {
        jQueryRCT("#feat_prod_section_loader_" + t).hide(),
          jQueryRCT("#feat_prod_section_data_" + t).show(),
          jQueryRCT(".fpSlider_" + t).slick("setPosition"),
          jQueryRCT(".fpNav_" + t).slick("setPosition");
      }, 1e3);
  }
  return d;
}
function RCTchange_product_price(e, r, t) {
  var i;
  $(e).hasClass("option1_options") &&
    "Select Box" != $(e).val() &&
    (jQueryRCT(
      "#section-" + r + " .variant_detail_section .option2_options option"
    )
      .removeClass("enable_variant")
      .addClass("disable_variant")
      .hide(),
    jQueryRCT(
      "#section-" + r + " .variant_detail_section .option3_options option"
    )
      .removeClass("enable_variant")
      .addClass("disable_variant")
      .hide(),
    (i = jQueryRCT(e).children("option:selected").val()),
    jQueryRCT(
      "#section-" + r + " .variant_detail_section .option2_options option"
    ).each(function () {
      var t = jQueryRCT(this).val();
      "undefined" != typeof js_variant_arr[r][i][t] &&
        (jQueryRCT(this)
          .removeClass("disable_variant")
          .addClass("enable_variant")
          .show(),
        jQueryRCT(".option3_options option").each(function () {
          var e = jQueryRCT(this).val();
          "undefined" != typeof js_variant_arr[r][i][t][e] &&
            jQueryRCT(this)
              .removeClass("disable_variant")
              .addClass("enable_variant")
              .show();
        }),
        jQueryRCT(
          "#section-" + r + " .variant_detail_section .option2_options"
        ).val(
          jQueryRCT(
            "#section-" +
              r +
              " .variant_detail_section .option2_options .enable_variant"
          ).val()
        ),
        jQueryRCT(
          "#section-" + r + " .variant_detail_section .option3_options"
        ).val(
          jQueryRCT(
            "#section-" +
              r +
              " .variant_detail_section .option3_options .enable_variant"
          ).val()
        ),
        jQueryRCT(
          "#section-" + r + " .variant_detail_section .option2_options"
        ).trigger("change"));
    })),
    jQueryRCT("#feat_prod_qty" + r).val("1"),
    jQueryRCT("#feat_prod_qty" + r + "[value=1]").attr("selected", "selected"),
    setTimeout(function () {
      RCT_set_feature_product_price(r, !0, t, 0, 0, 0);
    }, 100);
}
function RCTformat_money(e, t) {
  var r = e,
    o = (-1 < e.toString().indexOf(".") && (r = e.split(".")), "0");
  function a(e, t) {
    return void 0 === e ? t : e;
  }
  function i(e, t, r, i) {
    if (
      ((t = a(t, 2)), (r = a(r, ",")), (i = a(i, ".")), isNaN(e) || null === e)
    )
      return 0;
    3 == o
      ? (e = (e / 1e3).toFixed(t))
      : (0 == o && 0 == t) || (e = (0 == o ? e : e / 100).toFixed(t));
    t = e.split(".");
    return (
      t[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + r) +
      (t[1] ? i + t[1] : "")
    );
  }
  if (
    (Array.isArray(r) && null != r[1] && (o = r[1].length), void 0 !== e && e)
  ) {
    "string" == typeof e && (e = e.replace(".", ""));
    var n = "",
      r = /\{\{\s*(\w+)\s*\}\}/;
    t = t || "${{amount}}";
    try {
      switch (t.match(r)[1]) {
        case "amount":
          n = i(e, 2);
          break;
        case "amount_no_decimals":
          n = i(e, 0);
          break;
        case "amount_with_comma_separator":
          n = i(e, 2, ".", ",");
          break;
        case "amount_with_space_separator":
          n = i(e, 2, " ", ",");
          break;
        case "amount_with_period_and_space_separator":
          n = i(e, 2, " ", ".");
          break;
        case "amount_no_decimals_with_comma_separator":
          n = i(e, 0, ".", ",");
          break;
        case "amount_no_decimals_with_space_separator":
          n = i(e, 0, " ");
          break;
        case "amount_with_apostrophe_separator":
          n = i(e, 2, "'", ".");
      }
      return t.replace(r, n);
    } catch (e) {}
  }
  return e;
}
function RCT_change_product_quantity(e) {
  "0" == jQueryRCT(e).val() && jQueryRCT(e).val(1);
  var t,
    r = parseInt(jQueryRCT(e).val()),
    e = jQueryRCT(e).data("id"),
    i = jQueryRCT("#is_show_discounted_price" + e).val(),
    o = jQueryRCT("#is_show_compare_price" + e).val(),
    a = parseFloat(jQueryRCT("#product_compare_price_" + e).val()),
    n = parseFloat(jQueryRCT("#discount_value_" + e).val()),
    c = parseFloat(jQueryRCT("#product_price_" + e).val()),
    s = jQueryRCT("#discount_type_" + e).val(),
    d = jQueryRCT("#discount_option_" + e).val(),
    u = jQueryRCT("#discount_over_order_value" + e).val(),
    l =
      (jQueryRCT("#is_timer_added" + e).val(),
      jQueryRCT("#section-" + e + " .product-price span").hasClass("sold_out"));
  1 == l
    ? jQueryRCT("#section-" + e + " .product-price").text()
    : ((l = (c * r).toFixed(2)),
      (o = ("1" == o && a < c ? c * r : a * r).toFixed(2)),
      (a = Number(l)),
      (t = Number(o)),
      1 == s
        ? (n = (n * r).toFixed(2))
        : 2 == s && (n = ((c * (n * r)) / 100).toFixed(2)),
      0 != o &&
        ((o = RCTformat_money(o, rct_money_format)),
        jQueryRCT(
          "#section-" + e + " .product-price-card .product-compare-api-price"
        ).html(o),
        (r = RCTformat_money(l, rct_money_format)),
        jQueryRCT(
          "#section-" + e + " .product-price-card .product-compare-price"
        ).html(r)),
      0 != s && Number(c) > Number(u) && 0 != Number(l)
        ? ((l = (
            parseFloat(n) < parseFloat(l) && 0 != s ? l - n : (l = 0)
          ).toFixed(2)),
          (o = Number(l)),
          (l = RCTformat_money(l, rct_money_format)),
          jQueryRCT(
            "#section-" + e + " .product-price-card .product-price"
          ).html(l),
          "1" == i &&
            0 ==
              jQueryRCT(
                "#section-" + e + " .product-price-card .product-price"
              ).hasClass("Discount_removed") &&
            a < t &&
            o < a &&
            (jQueryRCT(
              "#section-" + e + " .product-price-card .product-price"
            ).show(),
            jQueryRCT(
              "#section-" + e + " .product-price-card .product-price"
            ).addClass("display-discount-price"),
            jQueryRCT(
              "#section-" +
                e +
                " .product-price-card .product-compare-api-price"
            ).css("text-decoration", "line-through"),
            "1" == d
              ? jQueryRCT(
                  "#section-" +
                    e +
                    " .product-price-card .product-compare-price"
                ).css("text-decoration", "line-through")
              : jQueryRCT(
                  "#section-" + e + " .product-price-card .product-price"
                ).hide()))
        : (jQueryRCT(
            "#section-" + e + " .product-price-card .product-price"
          ).removeClass("display-discount-price"),
          0 ==
            jQueryRCT(
              "#section-" + e + " .product-price-card .product-price:first"
            ).is(":hidden") &&
            (jQueryRCT(
              "#section-" + e + " .product-price-card .product-price"
            ).hide(),
            (jQueryRCT(
              "#section-" +
                e +
                " .product-price-card .product-compare-price:first"
            ).is(":hidden")
              ? jQueryRCT(
                  "#section-" +
                    e +
                    " .product-price-card .product-compare-api-price"
                )
              : jQueryRCT(
                  "#section-" +
                    e +
                    " .product-price-card .product-compare-price"
                )
            ).css("text-decoration", "none"))));
}
function flashNotice(e, t) {
  t =
    '<div class="RCT_inline-flash-wrapper animated bounceInUp RCT_inline-flash-wrapper--is-visible RCT_ourFlashMsg"><div class="inline-flash ' +
    (t = null != t ? t : "") +
    '  "><p class="inline-flash__message">' +
    e +
    "</p></div></div>";
  $(".RCT_ourFlashMsg").length && $(".RCT_ourFlashMsg").remove(),
    $("body").append(t),
    setTimeout(function () {
      $(".RCT_ourFlashMsg").length && $(".RCT_ourFlashMsg").remove();
    }, 3e3);
}
function RCTbuyNowFeatureProduct(t, e, r) {
  e.preventDefault();
  var i,
    e = jQueryRCT(t).closest("form").serialize(),
    o = jQueryRCT(t).data("section_id"),
    a = "",
    n = jQueryRCT(t).data("action").split(":");
  "24" == o
    ? (a =
        null !=
          (i = jQueryRCT(t)
            .closest(".variant-detail-section")
            .find("input[name=quantity]")
            .val()) && 1 < parseInt(i)
          ? "Purchased upsell: " + i + " " + jQueryRCT.trim(n[1])
          : "Purchased upsell: " + jQueryRCT.trim(n[1]))
    : "25" == o &&
      (a =
        "view all button" != jQueryRCT.trim(n[1])
          ? "Purchased " + jQueryRCT.trim(n[1]) + " recommendation"
          : 'Placed order after clicking the "view all" button'),
    (e +=
      "&" +
      jQueryRCT.param({
        action: "buy_now_feature_product",
        store_client_id: rct_store_id,
        selected_page_id: rct_selected_page_id,
        product_id: r,
        shop: rct_shop,
        order_id: rct_order_id,
        customer_id: rct_customer_id,
        order_detail: Shopify.checkout,
        section_id: o,
        purchase_action: a,
        rctShopInfo: rctShopInfo,
      })),
    jQueryRCT.ajax({
      url: reconvertAjaxUrl,
      type: "post",
      dataType: "json",
      data: e,
      beforeSend: function () {},
      success: function (e) {
        "success" == e.result
          ? (RCTcountClick(t),
            null != e.invoice_url
              ? RCTCheckURLStatus(e.invoice_url)
              : null != e.order_edit
              ? null != e.payment_url
                ? (window.location = e.payment_url)
                : getPaymentUrl(rct_order_id)
              : (jQueryRCT.ajax({
                  type: "GET",
                  url: "/checkout?discount=%20",
                  async: !1,
                }),
                jQueryRCT.ajax({
                  type: "GET",
                  url: e.discount_url,
                  success: function () {
                    window.location = e.cart_url;
                  },
                })))
          : "fail" == e.result &&
            (flashNotice("Something went wrong"),
            jQueryRCT(t).closest(".buy_now_select").addClass("custom-dropdown"),
            jQueryRCT(t).siblings(".dropdown-loader,.RCT-btn-loader").hide(),
            jQueryRCT(t).find(".RCT-btn-loader").hide(),
            jQueryRCT(t)
              .closest(".buy_now_select")
              .find(".buyNowBtn")
              .prop("selectedIndex", 0),
            jQueryRCT(t).closest(".buy_now_select").find(".buyNowBtn").show()),
          jQueryRCT(t).removeProp("disabled");
      },
    });
}
function getPaymentUrl(e) {
  jQueryRCT.ajax({
    url: reconvertAjaxUrlnew + "/get_order_payment_url",
    type: "post",
    dataType: "json",
    data: {
      shop: rct_shop,
      order_id: e,
      order_detail: Shopify.checkout,
    },
    success: function (e) {
      "success" == e.result
        ? null != e.payment_url &&
          ("" != e.payment_url
            ? (window.location = e.payment_url)
            : location.reload())
        : location.reload();
    },
  });
}
function putProductInPopup(e, r, t) {
  if (
    "undefined" != typeof productArr &&
    void 0 !== productArr[r] &&
    0 < Object.keys(productArr).length &&
    null != productArr[r][t]
  ) {
    for (
      var i = {},
        o = productArr[r][t],
        a = collection_js_variant_arr[r][o.id],
        n = RCThtmlSpecialCharacterDecode(
          RCThtmlSpecialCharacterDecode(o.title)
        ),
        c = RCThtmlSpecialCharacterDecode(
          RCThtmlSpecialCharacterDecode(o.vendor)
        ),
        s = RCThtmlSpecialCharacterDecode(
          RCThtmlSpecialCharacterDecode(o.body_html)
        ),
        d =
          ((0 != jQueryRCT("#FCProductModal_" + r).find(".buyNowBtn").length
            ? jQueryRCT("#FCProductModal_" + r).find(".buyNowBtn")
            : jQueryRCT("#FCProductModal_" + r).find(".quick_confirm ")
          ).attr("data-action", "Clicked recommendation: " + n),
          jQueryRCT.ajax({
            url: reconvertAjaxUrl,
            type: "post",
            dataType: "json",
            data: {
              shop: rct_shop,
              store_client_id: rct_store_id,
              action: "click_quick_view",
              order_id: rct_order_id,
              page_id: rct_selected_page_id,
              customer_id: rct_customer_id,
              customer_name: rct_customer_name,
              product_title: n,
              rctShopInfo: rctShopInfo,
            },
          }),
          '<option value="">No variant</option>'),
        u = [],
        l = o.variants,
        p = 0,
        _ =
          (jQueryRCT.each(l, function (e, t) {
            u.length <= 0 &&
              ((p = (u = t).image_id),
              jQueryRCT("#FCProductModal_" + r)
                .find("input[name=variant_price]")
                .val(t.price)),
              (i[t.id] = t.price),
              (d += '<option value="' + t.id + '">' + t.title + "</option>");
          }),
          jQueryRCT("#FCProductModal_" + r)
            .find(".variant_arr_" + r)
            .val(btoa(JSON.stringify(i))),
          ""),
        C = 0,
        T =
          (jQueryRCT.each(o.images, function (e, t) {
            p == t.id && (C = parseInt(t.position) - 1),
              (_ +=
                '<div class="features-image-responsive"><img src="' +
                t.src +
                '"/></div>');
          }),
          o.options),
        y = "",
        m = "",
        R = "",
        f = 0;
      f <= 2;
      f++
    ) {
      var h,
        j,
        v,
        Q = f + 1;
      null != T[f] &&
        ((h = ""),
        0 == f
          ? jQueryRCT.each(T[f].values, function (e, t) {
              "Default Title" != t &&
                a[t] &&
                (u["option" + Q] == t
                  ? ((m = t),
                    (t = RCT_htmlspecialchars(t)),
                    (h +=
                      '<option value="' +
                      t +
                      '" selected="selected">' +
                      t +
                      "</option>"))
                  : ((t = RCT_htmlspecialchars(t)),
                    (h += '<option value="' + t + '">' + t + "</option>")));
            })
          : 1 == f
          ? ((j = a[m]),
            (j = Object.keys(j)),
            jQueryRCT.each(T[f].values, function (e, t) {
              "Default Title" != t &&
                ("-1" != j.indexOf(t)
                  ? ((R = t),
                    (t = RCT_htmlspecialchars(t)),
                    (h +=
                      '<option value="' +
                      t +
                      '" selected="selected" class="enable_variant">' +
                      t +
                      "</option>"))
                  : ((t = RCT_htmlspecialchars(t)),
                    (h +=
                      '<option value="' +
                      t +
                      '" class="disable_variant">' +
                      t +
                      "</option>")));
            }))
          : ((j = a[m]),
            (v = (v = j[R]) ? Object.keys(v) : []),
            jQueryRCT.each(T[f].values, function (e, t) {
              "Default Title" != t &&
                ("-1" != v.indexOf(t)
                  ? ((m = t),
                    (t = RCT_htmlspecialchars(t)),
                    (h +=
                      '<option value="' +
                      t +
                      '" selected="selected" class="enable_variant">' +
                      t +
                      "</option>"))
                  : ((t = RCT_htmlspecialchars(t)),
                    (h +=
                      '<option value="' +
                      t +
                      '" class="disable_variant" style="display: none;">' +
                      t +
                      "</option>")));
            })),
        "" != h) &&
        (y +=
          '<div class="field field--optional"><div class="field__input-wrapper field__input-wrapper--select"><label class=" option' +
          Q +
          '">' +
          T[f].name +
          '</label><select name="option' +
          Q +
          '" class="field__input field__input--select option' +
          Q +
          '_options variantOption" data-id=' +
          r +
          " data-productId=" +
          o.id +
          ' aria-required="true" onchange="RCTselectOriginalVarint(this,' +
          r +
          "," +
          t +
          ')" >' +
          h +
          "</select></div></div>");
    }
    var g,
      l = jQueryRCT(e).closest("form").find(".rct-fc-star-rating").clone();
    jQueryRCT("#FCProductModal_" + r)
      .find(".rct-fc-star-rating")
      .remove(),
      jQueryRCT("#FCProductModal_" + r)
        .find(".popupPriceBlock")
        .after(l),
      jQueryRCT("#FCProductModal_" + r)
        .find(".productVarOpt")
        .html(y),
      jQueryRCT("#FCProductModal_" + r)
        .find(".productTitle")
        .html(n),
      jQueryRCT("#FCProductModal_" + r)
        .find(".FCPopupProductSlider")
        .html(_),
      jQueryRCT("#FCProductModal_" + r)
        .find(".FCPopupProductNavSlider")
        .html(_),
      jQueryRCT("#FCProductModal_" + r)
        .find(".productVendor")
        .html(c),
      jQueryRCT("#FCProductModal_" + r)
        .find(".productVariantDD")
        .html(d),
      jQueryRCT("#FCProductModal_" + r)
        .find(".productBodyHtml")
        .html(s),
      RCTcollectionModelSlider(C),
      (g =
        "0" ==
        jQueryRCT("#FCProductModal_" + r + " .variantOption:first").length
          ? jQueryRCT("#FCProductModal_" + r).find(".productVariantDD")
          : jQueryRCT("#FCProductModal_" + r + " .variantOption:first")),
      setTimeout(function () {
        RCTselectOriginalVarint(g, r, t, !1),
          jQueryRCT("#FCProductModal_" + r).css("display", "flex"),
          jQueryRCT(".FCPopupProductNavSlider").slick("setPosition"),
          jQueryRCT(".FCPopupProductSlider").slick("setPosition");
      }, 200);
  } else console.log("productArr is undefined");
}
function RCTselectOriginalVarint(e, a, n, c) {
  c = null == c || c;
  var r,
    s = [],
    d = jQueryRCT(e).closest("form"),
    t = productArr[a][n],
    i = collection_js_variant_arr[a][t.id];
  jQueryRCT(e).hasClass("option1_options") &&
    "Select Box" != $(e).val() &&
    (jQueryRCT(
      ".quick-product-data-" +
        a +
        " .features-collection-variant-option .option2_options option"
    )
      .removeClass("enable_variant")
      .addClass("disable_variant")
      .hide(),
    jQueryRCT(
      ".quick-product-data-" +
        a +
        " .features-collection-variant-option .option3_options option"
    )
      .removeClass("enable_variant")
      .addClass("disable_variant")
      .hide(),
    (r = jQueryRCT(e).children("option:selected").val()),
    jQueryRCT(
      ".quick-product-data-" +
        a +
        " .features-collection-variant-option .option2_options option"
    ).each(function () {
      var t = jQueryRCT(this).val();
      "undefined" != typeof i[r][t]
        ? (jQueryRCT(this)
            .removeClass("disable_variant")
            .addClass("enable_variant")
            .show(),
          jQueryRCT(
            ".quick-product-data-" +
              a +
              " .features-collection-variant-option .option3_options option"
          ).each(function () {
            var e = jQueryRCT(this).val();
            "undefined" != typeof i[r][t][e]
              ? jQueryRCT(this)
                  .removeClass("disable_variant")
                  .addClass("enable_variant")
                  .show()
              : jQueryRCT(this)
                  .removeClass("enable_variant")
                  .addClass("disable_variant")
                  .hide();
          }),
          jQueryRCT(
            ".quick-product-data-" +
              a +
              " .features-collection-variant-option .option2_options"
          ).val(
            jQueryRCT(
              ".quick-product-data-" +
                a +
                " .features-collection-variant-option .option2_options .enable_variant"
            ).val()
          ),
          jQueryRCT(
            ".quick-product-data-" +
              a +
              " .features-collection-variant-option .option3_options"
          ).val(
            jQueryRCT(
              ".quick-product-data-" +
                a +
                " .features-collection-variant-option .option3_options .enable_variant"
            ).val()
          ),
          0 != c &&
            jQueryRCT(
              ".quick-product-data-" +
                a +
                " .features-collection-variant-option .option2_options"
            ).trigger("change"))
        : jQueryRCT(this)
            .removeClass("enable_variant")
            .addClass("disable_variant")
            .hide();
    })),
    setTimeout(function () {
      jQueryRCT.each(d.find(".variantOption"), function (e) {
        var t = "option" + (e + 1),
          r = jQueryRCT(this).find("option:selected").text();
        s[e] = {
          value: r,
          index: t,
        };
      });
      var e,
        t,
        r = productArr[a][n].variants,
        i = productArr[a][n].images,
        o = [],
        r =
          (jQueryRCT.each(r, function (e, t) {
            if (
              s.every(function (e) {
                return t[e.index] == e.value;
              })
            )
              return (o = t), !1;
          }),
          d.find(".productQty").val("1"),
          jQueryRCT("#soldout_text_" + a).val());
      0 < Object.keys(o).length
        ? ("" != o.inventory_management &&
          null != o.inventory_management &&
          o.inventory_quantity <= 0 &&
          "deny" == o.inventory_policy
            ? (d.find("input[name=variant_price]").val("Sold Out"),
              d.find(".productBuyBtn").attr("disabled", "true"),
              d.find(".productVariantDD").val(""),
              d.find("input[name=product_price]").val("0"),
              d.find("input[name=product_compare_price]").val("0"),
              d.find("input[name=cart_discount]").val(""),
              d.find("input[name=display_price_opt]").val(""),
              d.find("input[name=display_product_price]").val("0"),
              d.find(".productComparePrice").text(""),
              d.find(".productOriginalComparePrice").text(""),
              d.find(".productPrice").text(r),
              d.find(".productOriginalPrice").text(r),
              d.find(".productDisPrice").text(r))
            : (d.find("input[name=variant_price]").val(o.price),
              d.find(".productBuyBtn").removeAttr("disabled"),
              d.find(".productVariantDD").val(o.id),
              d.find("input[name=product_price]").val(o.dis_price),
              d
                .find("input[name=product_compare_price]")
                .val(o.our_compare_price),
              d.find("input[name=cart_discount]").val(o.cart_dis),
              d
                .find("input[name=display_price_opt]")
                .val(fcSetting.display_price_opt),
              d.find("input[name=display_product_price]").val(o.price),
              d
                .find("input[name=product_original_price]")
                .val(o.original_price),
              d
                .find("input[name=product_original_compare_price]")
                .val(o.compare_at_original_price),
              d.find(".productPrice").html(o.f_price),
              d.find(".productOriginalPrice").html(o.original_price),
              null != o.f_compare_at_price
                ? ((t =
                    parseInt(o.compare_at_price) > parseInt(o.price) ||
                    "2" == fcSetting.display_price_opt
                      ? o.f_compare_at_price
                      : ""),
                  (e = ""),
                  null != o.compare_at_price &&
                    ((parseInt(o.compare_at_price) > parseInt(o.price) &&
                      "2" == fcSetting.display_price_opt) ||
                      (parseInt(o.compare_at_price) > parseInt(o.price) &&
                        "2" != fcSetting.display_price_opt)) &&
                    (e = o.compare_at_original_price),
                  d.find(".productComparePrice").html(t),
                  d.find(".productOriginalComparePrice").html(e))
                : d.find(".productComparePrice").text("")),
          null !=
            (t = i.filter(function (e) {
              return e.id == o.image_id;
            })[0]) &&
            c &&
            jQueryRCT(".FCPopupProductSlider").slick(
              "slickGoTo",
              t.position - 1
            ))
        : (d.find("input[name=variant_price]").val("Sold Out"),
          d.find(".productBuyBtn").attr("disabled", "true"),
          d.find(".productVariantDD").val(""),
          d.find("input[name=product_price]").val("0"),
          d.find("input[name=product_compare_price]").val("0"),
          d.find("input[name=cart_discount]").val(""),
          d.find("input[name=display_price_opt]").val(""),
          d.find("input[name=display_product_price]").val("0"),
          d.find(".productComparePrice").text(""),
          d.find(".productOriginalComparePrice").text(""),
          d.find(".productPrice").text(r),
          d.find(".productOriginalPrice").text(r),
          d.find(".productDisPrice").text(r));
    }, 50);
}
function RCTcollectionModelSlider(e) {
  var t = new Array("ar", "he", "fa", "ur", "he-IL"),
    r = "-1" != jQueryRCT.inArray(rctShopInfo.theme_language, t);
  setTimeout(function () {
    jQueryRCT(".FCPopupProductSlider").slick({
      rtl: r,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: !1,
      infinite: !1,
      cssEase: "linear",
    }),
      jQueryRCT(".FCPopupProductNavSlider").slick({
        rtl: r,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: ".FCPopupProductSlider",
        arrows: !0,
        infinite: !1,
        focusOnSelect: !0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: !0,
              dots: !1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
        ],
      }),
      0 < e && jQueryRCT(".FCPopupProductSlider").slick("slickGoTo", e);
  }, 100);
}
function RCTgetCollectionProductApiData() {
  var o = [],
    r = {},
    i = {};
  jQueryRCT(".feature_collection_api_call").each(function () {
    var e = jQueryRCT(this).data("row-section-id"),
      t = (o.push(e), jQueryRCT(this).data("collection-id")),
      t = ((r[e] = t), jQueryRCT(this).data("section-position"));
    i[e] = t;
  }),
    jQueryRCT.ajax({
      url: reconvertAjaxUrl,
      type: "post",
      dataType: "json",
      data: {
        shop: rct_shop,
        store_client_id: rct_store_id,
        action: "get_collection_product_api_data",
        row_section_id_arr: o,
        collection_id_arr: JSON.stringify(r),
        collection_section_position_arr: JSON.stringify(i),
        cart_product_id_arr: cartProductIdArr,
        rctShopInfo: rctShopInfo,
      },
      beforeSend: function () {},
      success: function (a) {
        var n;
        "success" == a.result
          ? ((productArr = a.product_arr),
            (collection_js_variant_arr = a.collection_js_variant_arr || {}),
            (rct_money_format = a.money_format),
            (n = 0),
            jQueryRCT.each(o, function (e, r) {
              var t, i, o;
              null != a.script && jQueryRCT("body").append(a.script[r]),
                null != a.auto_change && null != a.auto_change[r]
                  ? (n++,
                    (t = a.auto_change[r]),
                    jQueryRCT("#feat_coll_section_loader_" + r).remove(),
                    jQueryRCT("#feat_coll_section_data_" + r).show(),
                    jQueryRCT(".fpNav_" + r).slick("unslick"),
                    (i = a.feat_coll_setting),
                    "1" == (fcSetting = i[r]).is_timer_added &&
                      RCTstartWidgetTimer(
                        rct_order_id,
                        r,
                        fcSetting.timer_style
                      ),
                    (i = (i = fcSetting.f_price_css.replace(
                      "color:",
                      ""
                    )).replace(";", "")),
                    (o = (o = fcSetting.f_compare_at_price_css.replace(
                      "color:",
                      ""
                    )).replace(";", "")),
                    jQueryRCT("#FCProductModal_" + r)
                      .find(".productVariantDD")
                      .attr("style", fcSetting.buy_btn_css),
                    jQueryRCT("#FCProductModal_" + r)
                      .find(".productBuyBtn")
                      .html(
                        '<span class="btn__content">' +
                          fcSetting.buy_btn_text +
                          "</span>"
                      )
                      .attr("style", fcSetting.buy_btn_css),
                    jQueryRCT("#FCProductModal_" + r)
                      .find(".productPrice")
                      .attr("style", fcSetting.f_price_css),
                    jQueryRCT("#FCProductModal_" + r)
                      .find(".productOriginalPrice")
                      .css("color", i),
                    jQueryRCT("#FCProductModal_" + r)
                      .find(".productComparePrice")
                      .attr("style", fcSetting.f_compare_at_price_css),
                    jQueryRCT("#FCProductModal_" + r)
                      .find(".productOriginalComparePrice")
                      .css("color", o),
                    "0" == fcSetting.vendor &&
                      jQueryRCT("#FCProductModal_" + r)
                        .find(".productVendor")
                        .remove(),
                    jQueryRCT.each(t, function (e, t) {
                      jQueryRCT("#section-" + r)
                        .find("." + e)
                        .html(t);
                    }))
                  : jQueryRCT("#section-" + r).remove(),
                setTimeout(function () {
                  jQueryRCT("#section-" + r).show(),
                    jQueryRCT("#section-" + r).hasClass("is-display-none") &&
                      jQueryRCT("#section-" + r).hide(),
                    jQueryRCT(".fpNav_" + r).slick("setPosition");
                }, 500);
            }),
            RCTcountImpression("25", n))
          : jQueryRCT.each(a.failure, function (e, t) {
              jQueryRCT("#section-" + t).remove();
            });
      },
      complete: function (e) {
        var r,
          i = e.responseJSON.product_id_arr;
        void 0 !== e &&
          void (r = 0) !== (e = e.responseJSON) &&
          void 0 !== e.result &&
          "success" == e.result &&
          (0 < jQueryRCT(".wc_product_review_badge_reconvert").length &&
            (RCTrivyoStarReview(), (r = 1)),
          0 < jQueryRCT(".stamped-product-reviews-badge").length &&
            ("undefined" == typeof StampedFn ||
            "function" != typeof StampedFn.loadBadges
              ? jQueryRCT.ajax({
                  type: "GET",
                  url:
                    "//cdn-stamped-io.azureedge.net/files/widget.min.js?shop=" +
                    rct_shop,
                  dataType: "script",
                  cache: !0,
                })
              : StampedFn.loadBadges(),
            (r = 1)),
          0 < jQueryRCT(".alr-display-review-badge").length &&
            (jQueryRCT.each(o, function (e, t) {
              RCTaliAppReview(i, t, "2");
            }),
            (r = 1)),
          0 < jQueryRCT(".judgemeRating").length &&
            (RCTjudgemeReview(), (r = 1)),
          0 < jQueryRCT(".loox-rating").length &&
            ("undefined" == typeof LOOX
              ? jQueryRCT.ajax({
                  type: "GET",
                  url: "//loox.io/widget/loox.js?shop=" + rct_shop,
                  dataType: "script",
                  cache: !0,
                })
              : ("function" == typeof drawRating && drawRating(),
                "undefined" != typeof LOOX &&
                  "function" == typeof LOOX.drawRating &&
                  LOOX.drawRating()),
            (r = 1)),
          setTimeout(function () {
            var t = setInterval(function () {
              var e;
              r &&
                "" !=
                  (e = jQueryRCT(
                    ".RCT-left-bar-custom .RCT .rct-jm.rct-fc-star-rating.fc-col-1 .jdgm-prev-badge[data-average-rating!='0.00'], .RCT-left-bar-custom .RCT .rct-jm.rct-fc-star-rating.fc-col-2 .jdgm-prev-badge[data-average-rating!='0.00'], .RCT-left-bar-custom .RCT .rct-jm.rct-fc-star-rating.fc-col-3 .jdgm-prev-badge[data-average-rating!='0.00'], .RCT-right-bar-custom .RCT .rct-jm.rct-fc-star-rating.fc-col-1 .jdgm-prev-badge[data-average-rating!='0.00'], .RCT-right-bar-custom .RCT .rct-jm.rct-fc-star-rating.fc-col-2 .jdgm-prev-badge[data-average-rating!='0.00'], .RCT-right-bar-custom .RCT .rct-jm.rct-fc-star-rating.fc-col-3 .jdgm-prev-badge[data-average-rating!='0.00'],.RCT-left-bar-custom .RCT .rct-si.rct-fc-star-rating.fc-col-1 .stamped-badge[data-rating!=\"0.0\"], .RCT-left-bar-custom .RCT .rct-si.rct-fc-star-rating.fc-col-2 .stamped-badge[data-rating!=\"0.0\"], .RCT-left-bar-custom .RCT .rct-si.rct-fc-star-rating.fc-col-3 .stamped-badge[data-rating!=\"0.0\"], .RCT-right-bar-custom .RCT .rct-si.rct-fc-star-rating.fc-col-1 .stamped-badge[data-rating!=\"0.0\"], .RCT-right-bar-custom .RCT .rct-si.rct-fc-star-rating.fc-col-2 .stamped-badge[data-rating!=\"0.0\"], .RCT-right-bar-custom .RCT .rct-si.rct-fc-star-rating.fc-col-3 .stamped-badge[data-rating!=\"0.0\"]"
                  ).height()) &&
                null != e &&
                (jQueryRCT(
                  ".RCT-left-bar-custom .RCT .rct-jm.rct-fc-star-rating.fc-col-1, .RCT-left-bar-custom .RCT .rct-jm.rct-fc-star-rating.fc-col-2, .RCT-left-bar-custom .RCT .rct-jm.rct-fc-star-rating.fc-col-3, .RCT-left-bar-custom .RCT .rct-lx.rct-fc-star-rating, .RCT-left-bar-custom .RCT .rct-si.rct-fc-star-rating.fc-col-1, .RCT-left-bar-custom .RCT .rct-si.rct-fc-star-rating.fc-col-2, .RCT-left-bar-custom .RCT .rct-si.rct-fc-star-rating.fc-col-3, .RCT-right-bar-custom .RCT .rct-jm.rct-fc-star-rating.fc-col-1, .RCT-right-bar-custom .RCT .rct-jm.rct-fc-star-rating.fc-col-2, .RCT-right-bar-custom .RCT .rct-lx.rct-fc-star-rating, .RCT-right-bar-custom .RCT .rct-si.rct-fc-star-rating.fc-col-1, .RCT-right-bar-custom .RCT .rct-si.rct-fc-star-rating.fc-col-2"
                ).css("min-height", e),
                clearInterval(t));
            }, 1e3);
          }, 1e3)),
          jQueryRCT(document).width() < 1024 && RCTsetFontSizeOfCollection(),
          jQueryRCT(".feat_coll_sect_loader_cls").remove(),
          setTimeout(function () {
            setInterval(function () {
              jQueryRCT(".prodRecom").each(function () {
                var e,
                  t = jQueryRCT(this).attr("id"),
                  r = jQueryRCT(this).find(".rct-fc-star-rating");
                0 < jQueryRCT(this).find(".rct-jm").length
                  ? ((e = jQueryRCT("#" + t).find(
                      '.jdgm-prev-badge[data-average-rating="0.00"]'
                    ).length),
                    r.length == e &&
                      (jQueryRCT("#" + t)
                        .find(".rct-fc-star-rating")
                        .remove(),
                      jQueryRCT("." + t.replace("section-", "fpNav_")).slick(
                        "slickGoTo",
                        0
                      )))
                  : 0 < jQueryRCT(this).find(".rct-lx").length
                  ? ((e = jQueryRCT("#" + t).find(
                      ".rct-lx[data-rating]"
                    ).length),
                    0 < r.length &&
                      0 == e &&
                      (jQueryRCT("#" + t)
                        .find(".rct-fc-star-rating")
                        .remove(),
                      jQueryRCT("." + t.replace("section-", "fpNav_")).slick(
                        "slickGoTo",
                        0
                      )))
                  : 0 < jQueryRCT(this).find(".rct-si").length &&
                    ((e = jQueryRCT("#" + t).find(
                      '.stamped-badge[data-rating="0.0"]'
                    ).length),
                    r.length == e) &&
                    (jQueryRCT("#" + t)
                      .find(".rct-fc-star-rating")
                      .remove(),
                    jQueryRCT("." + t.replace("section-", "fpNav_")).slick(
                      "slickGoTo",
                      0
                    ));
              });
            }, 1e3);
          }, 1e3),
          setTimeout(function () {
            jQueryRCT.each(o, function (e, t) {
              jQueryRCT(".fpNav_" + t).resize();
            });
          }, 1500);
      },
    });
}
function RCTsetFontSizeOfCollection() {
  jQueryRCT(".prodRecom .fc-price-block").each(function () {
    var e = jQueryRCT(this).find(".product-compare-price").text(),
      t = jQueryRCT(this).find(".product-price").text(),
      e = e.length + t.length;
    20 <= e
      ? jQueryRCT(this).css("font-size", "9px")
      : 18 <= e
      ? jQueryRCT(this).css("font-size", "11px")
      : 15 <= e && jQueryRCT(this).css("font-size", "12px");
  });
}
function RCTrivyoStarReview() {
  var i,
    r = jQueryRCT(".wc_product_review_badge_reconvert").not(
      ".rivyoDone"
    ).length;
  0 < (r = parseInt(r)) &&
    ((i = new Array()),
    jQueryRCT(".wc_product_review_badge_reconvert")
      .not(".rivyoDone")
      .each(function (e, t) {
        i.push(jQueryRCT(this).data("handle")),
          e === r - 1 &&
            jQueryRCT.ajax({
              url: "//thimatic-apps.com/product_review/get_review_rating_update.php",
              type: "post",
              dataType: "json",
              data: {
                support_app: !0,
                shop: rct_shop,
                product_handles: i,
                rctShopInfo: rctShopInfo,
              },
              success: function (r) {
                jQueryRCT("body").append(r.style),
                  jQueryRCT(".wc_product_review_badge_reconvert")
                    .not(".rivyoDone")
                    .html(r.empty.html),
                  jQueryRCT.each(i, function (e, t) {
                    (void 0 !== r[t]
                      ? jQueryRCT(
                          '.wc_product_review_badge_reconvert[data-handle="' +
                            t +
                            '"]'
                        )
                          .not(".rivyoDone")
                          .html(r[t].html)
                      : jQueryRCT(
                          '.wc_product_review_badge_reconvert[data-handle="' +
                            t +
                            '"]'
                        ).not(".rivyoDone")
                    ).addClass("rivyoDone");
                  });
              },
              error: function (e, t) {
                console.log(e);
              },
            });
      }));
}
function RCTjudgemeReview(e) {
  "1" == starReviewSettingObj.review_app &&
    (jQueryRCT("head").prepend(
      '<style class=\'jdgm-miracle-styles\'>@-webkit-keyframes jdgm-spin{0%{-webkit-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);-ms-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes jdgm-spin{0%{-webkit-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);-ms-transform:rotate(359deg);transform:rotate(359deg)}}@font-face{font-family:\'JudgemeStar\';src:url("data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAScAA0AAAAABrAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEgAAAABoAAAAcbyQ+3kdERUYAAARgAAAAHgAAACAAMwAGT1MvMgAAAZgAAABGAAAAVi+vS9xjbWFwAAAB8AAAAEAAAAFKwBMjvmdhc3AAAARYAAAACAAAAAj//wADZ2x5ZgAAAkAAAAEJAAABdH33LXtoZWFkAAABMAAAAC0AAAA2BroQKWhoZWEAAAFgAAAAHAAAACQD5QHQaG10eAAAAeAAAAAPAAAAFAYAAABsb2NhAAACMAAAAA4AAAAOAO4AeG1heHAAAAF8AAAAHAAAACAASgAvbmFtZQAAA0wAAADeAAABkorWfVZwb3N0AAAELAAAACkAAABEp3ubLXgBY2BkYADhPPP4OfH8Nl8ZuJkYQODS2fRrCPr/aSYGxq1ALgcDWBoAO60LkwAAAHgBY2BkYGDc+v80gx4TAwgASaAICmABAFB+Arl4AWNgZGBgYGPQYWBiAAIwyQgWc2AAAwAHVQB6eAFjYGRiYJzAwMrAwejDmMbAwOAOpb8ySDK0MDAwMbByMsCBAAMCBKS5pjA4PGB4wMR44P8BBj3GrQymQGFGkBwAjtgK/gAAeAFjYoAAEA1jAwAAZAAHAHgB3crBCcAwDEPRZydkih567CDdf4ZskmLwFBV8xBfCaC4BXkOUmx4sU0h2ngNb9V0vQCxaRKIAevT7fGWuBrEAAAAAAAAAAAA0AHgAugAAeAF9z79Kw1AUx/FzTm7un6QmJtwmQ5Bg1abgEGr/BAqlU6Gju+Cgg1MkQ/sA7Vj7BOnmO/gUvo2Lo14NqIO6/IazfD8HEODtmQCfoANwNsyp2/GJt3WKQrd1NLiYYWx2PBqOsmJMEOznPOTzfSCrhAtbbLdmeFLJV9eKd63WLrZcIcuaEVdssWCKM6pLCfTVOYbz/0pNSMSZKLIZpvh78sAUH6PlMrreTCabP9r+Z/puPZ2ur/RqpQHgh+MIegCnXeM4MRAPjYN//5tj4ZtTjkFqEdmeMShlEJ7tVAly2TAkx6R68Fl4E/aVvn8JqHFQ4JS1434gXKcuL31dDhzs3YbsEOAd/IU88gAAAHgBfY4xTgMxEEVfkk0AgRCioKFxQYd2ZRtpixxgRU2RfhU5q5VWseQ4JdfgAJyBlmNwAM7ABRhZQ0ORwp7nr+eZAa54YwYg9zm3ynPOeFRe8MCrciXOh/KSS76UV5L/iDmrLiS5AeU519wrL3jmSbkS5115yR2fyivJv9kx0ZMZ2RLZw27q87iNQi8EBo5FSPIMw3HqBboi5lKTGAGDp8FKXWP+t9TU01Lj5His1Ba6uM9dTEMwvrFmbf5GC/q2drW3ruXUhhsCiQOjznFlCzYhHUZp4xp76vsvQh89CQAAeAFjYGJABowM6IANLMrEyMTIzMjCXpyRWJBqZshWXJJYBKOMAFHFBucAAAAAAAAB//8AAngBY2BkYGDgA2IJBhBgAvKZGViBJAuYxwAABJsAOgAAeAFjYGBgZACCk535hiD60tn0azAaAEqpB6wAAA==") format("woff");font-weight:normal;font-style:normal}.jdgm-star{font-family:\'JudgemeStar\';display:inline !important;text-decoration:none !important;padding:0 4px 0 0 !important;margin:0 !important;font-weight:bold;opacity:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.jdgm-star:hover{opacity:1}.jdgm-star:last-of-type{padding:0 !important}.jdgm-star.jdgm--on:before{content:"\\e000"}.jdgm-star.jdgm--off:before{content:"\\e001"}.jdgm-star.jdgm--half:before{content:"\\e002"}.jdgm-widget *{margin:0;line-height:1.4;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-overflow-scrolling:touch}.jdgm-hidden{display:none !important;visibility:hidden !important}.jdgm-temp-hidden{display:none}.jdgm-spinner{width:40px;height:40px;margin:auto;border-radius:50%;border-top:2px solid #eee;border-right:2px solid #eee;border-bottom:2px solid #eee;border-left:2px solid #ccc;-webkit-animation:jdgm-spin 0.8s infinite linear;animation:jdgm-spin 0.8s infinite linear}.jdgm-prev-badge{display:block !important}</style>'
    ),
    jQueryRCT.ajax({
      url: reconvertAjaxUrl,
      type: "post",
      dataType: "json",
      data: {
        shop: rct_shop,
        store_client_id: rct_store_id,
        action: "get_shop_metafield_judgeme_setting",
        rctShopInfo: rctShopInfo,
      },
      success: function (e) {
        console.log(e),
          "success" == e.result && jQueryRCT("head").prepend(e.value);
      },
      complete: function () {
        jQueryRCT.ajax({
          url: "https://cdn.judge.me/shopify_v2.js",
          dataType: "script",
          success: function () {
            setTimeout(function () {
              var o = [];
              jQueryRCT(".judgemeRating")
                .not(".judgeMeComplete")
                .each(function (e, t) {
                  jQueryRCT(this).addClass("judgeMeComplete");
                  var r = jQueryRCT(this).attr("data-handle"),
                    i = jQueryRCT(this).attr("data-id");
                  o[e] = {
                    productHandle: r,
                    badgePlaceholder: ".judgemeRating[data-id=" + i + "]",
                  };
                }),
                window.jdgm &&
                  jdgm.batchRenderBadges &&
                  jdgm.batchRenderBadges(o);
            }, 500);
          },
          cache: !0,
        });
      },
    }));
}
function RCThtmlSpecialCharacterDecode(e) {
  var t = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
    "&#8217;": "’",
    "&#8216;": "‘",
    "&#8211;": "–",
    "&#8212;": "—",
    "&#8230;": "…",
    "&#8221;": "�?",
  };
  return e.replace(/\&[\w\d\#]{2,5}\;/g, function (e) {
    return t[e];
  });
}
function check_health_status() {
  var e = {
    js: !0,
    php: !1,
  };
  return (
    jQueryRCT.ajax({
      url: reconvertAjaxUrl,
      type: "post",
      dataType: "json",
      async: !1,
      data: {
        shop: rct_shop,
        store_client_id: rct_store_id,
        action: "health_check_page",
      },
      success: function () {
        (e.php = !0), console.log("success...");
      },
      error: function (e) {
        console.log("there are some errors...");
      },
    }),
    e
  );
}
var RCTupdateTimeToDBtimerInter,
  RCTtimerInter = new Array(),
  RCTstyle1ProgressBar = new Array(),
  RCTshortcode_date = new Array(),
  RCT_expire_row_section_ids = [];
function RCTstartWidgetTimer(r, i, o) {
  var a,
    c,
    s,
    d,
    u = 0,
    e = jQueryRCT(".timerType" + i).val(),
    l = "",
    t = RCTGetLocalStorage("RCTWidgetTimer"),
    t =
      (t &&
        (u =
          (l = JSON.parse(atob(t)))[r] && l[r][i]
            ? ((l[r][i].start_time = RCT_strtotime()),
              (t = RCT_getDifference(l[r][i])),
              (a = Number(t.days) || 0),
              (c = Number(t.hours) || 0),
              (s = Number(t.minutes) || 0),
              Number(t.seconds) || 0)
            : ((a =
                "" != jQueryRCT(".isDisplayTimer" + i + " .days").text()
                  ? Number(
                      jQueryRCT(".isDisplayTimer" + i + " .days:first").text()
                    )
                  : 0),
              (c = jQueryRCT(".isDisplayTimer" + i + " .hours").text()
                ? Number(
                    jQueryRCT(".isDisplayTimer" + i + " .hours:first").text()
                  )
                : 0),
              (s = jQueryRCT(".isDisplayTimer" + i + " .minutes").text()
                ? Number(
                    jQueryRCT(".isDisplayTimer" + i + " .minutes:first").text()
                  )
                : 0),
              jQueryRCT(".isDisplayTimer" + i + " .seconds").text()
                ? Number(
                    jQueryRCT(".isDisplayTimer" + i + " .seconds:first").text()
                  )
                : 0)),
      0 == a &&
        0 == c &&
        0 == s &&
        0 == u &&
        0 == e &&
        ((a =
          "" != jQueryRCT(".isDisplayTimer" + i + " .days").text()
            ? Number(jQueryRCT(".isDisplayTimer" + i + " .days:first").text())
            : 0),
        (c = jQueryRCT(".isDisplayTimer" + i + " .hours").text()
          ? Number(jQueryRCT(".isDisplayTimer" + i + " .hours:first").text())
          : 0),
        (s = jQueryRCT(".isDisplayTimer" + i + " .minutes").text()
          ? Number(jQueryRCT(".isDisplayTimer" + i + " .minutes:first").text())
          : 0),
        (u = jQueryRCT(".isDisplayTimer" + i + " .seconds").text()
          ? Number(jQueryRCT(".isDisplayTimer" + i + " .seconds:first").text())
          : 0)),
      60 < s ? Math.floor(s / 60) : 0),
    e = 60 < u ? Math.floor(u / 60) : 0,
    t =
      (jQueryRCT(".style4Timer" + i).css("display", "none"),
      (c = 0 == t ? parseInt(c) : parseInt(c) + parseInt(t)),
      (s = 0 == e ? parseInt(s) : parseInt(s) + parseInt(e)),
      60 < (s = 0 == t ? s : s - 60 * Math.floor(s / 60)) &&
        ((t = 60 * ((t = s / 60 + c) - (c = Math.floor(t)))),
        (s = Math.round(t))),
      (u = 0 == e ? u : u - 60 * Math.floor(u / 60)),
      24 < c ? Math.floor(c / 24) : 0),
    p =
      ((a = 0 == t ? a : parseInt(a) + parseInt(t)),
      0 < t && ((e = c % 24), (c = Math.floor(e))),
      null != RCTtimerInter[i] && clearInterval(RCTtimerInter[i]),
      10 <= a ? a : "0" + a),
    _ =
      (null != a && "" != a
        ? jQueryRCT(".widgetTimerBlock" + i + " .days").text(p)
        : jQueryRCT(".widgetTimerBlock" + i + " .secctionDays").hide(),
      10 <= c ? c : "0" + c),
    C =
      (("0" == c || null == c || "" == c) && a <= 0
        ? jQueryRCT(".widgetTimerBlock" + i + " .sectionHours").hide()
        : (jQueryRCT(".widgetTimerBlock" + i + " .sectionHours").show(),
          jQueryRCT(".widgetTimerBlock" + i + " .hours").text(_)),
      10 <= (s = "" == s || "0" == s ? "0" : s) ? s : "0" + s),
    T = 10 <= (u = "" == u || "0" == u ? "0" : u) ? u : "0" + u,
    y =
      (jQueryRCT(".widgetTimerBlock" + i + " .minutes").text(C),
      jQueryRCT(".widgetTimerBlock" + i + " .seconds").text(T),
      (RCTshortcode_date[i] =
        24 * parseInt(a) * 60 * 60 +
        60 * parseInt(c) * 60 +
        60 * parseInt(s) +
        parseInt(u)),
      RCTshortcode_date[i] -
        (24 * parseInt(a) * 60 * 60 +
          60 * parseInt(c) * 60 +
          60 * parseInt(s) +
          parseInt(u))),
    m =
      (3 == o
        ? jQueryRCT(".widgetTimerBlock" + i + " .style4_data_id" + i).each(
            function () {
              var e = document.getElementById(jQueryRCT(this).val()),
                t = jQueryRCT("#" + jQueryRCT(this).val())
                  .closest(".countup")
                  .find(".timer_button_color")
                  .val(),
                r = jQueryRCT("#" + jQueryRCT(this).val())
                  .closest(".countup")
                  .find(".timer_state_color")
                  .val();
              (RCTstyle1ProgressBar[jQueryRCT(this).val()] =
                new ProgressBar.Circle(e, {
                  duration: 200,
                  color: t,
                  trailColor: r,
                  strokeWidth: 5,
                  trailWidth: 5,
                })),
                RCTstyle1ProgressBar[jQueryRCT(this).val()].setText(
                  jQueryRCT(
                    ".widgetTimerBlock" + i + " #style4_default_time" + i
                  ).html()
                ),
                RCTstyle1ProgressBar[jQueryRCT(this).val()].animate(
                  y / RCTshortcode_date[i]
                );
            }
          )
        : 2 == o &&
          ((d = ((y / RCTshortcode_date[i]) * 100).toFixed(2)),
          jQueryRCT(".progressbar_" + i).css("width", d + "%")),
      0 != a
        ? ".showDaysValue"
        : 0 != c
        ? ".showHourValue"
        : 0 != s
        ? ".showMinuteValue"
        : ".showSecondsValue"),
    R =
      (jQueryRCT(m + i).css("display", "block"),
      jQueryRCT(".widgetTimerBlock" + i + " .expirySettings").val());
  RCTtimerInter[i] = setInterval(function () {
    var e, n, t;
    --u < 0 &&
      ((u = 59), --s < 0) &&
      ((s = 59), --c < 0) &&
      ((c = 23), --a < 0) &&
      (jQueryRCT(".timerExpire" + i).val("0"),
      jQueryRCT(".isDisplayExpireMsg" + i).show(),
      (e = jQueryRCT(".isDisplayExpireMsg" + i).html()),
      RCTupdateTimeToDB(),
      RCT_expire_row_section_ids.push(i),
      jQueryRCT(".isDisplayTimer" + i).hide(),
      "1" == R
        ? (jQueryRCT("#section-" + i).hasClass("secFeColl") &&
            ("0" !=
              (n = jQueryRCT("#section-" + i)
                .find(".priceSelectedOption" + i)
                .val()) &&
              (jQueryRCT("#section-" + i)
                .find("#popupProductFrm_" + i)
                .find(".productComparePrice")
                .hide(),
              jQueryRCT("#section-" + i)
                .find("#popupProductFrm_" + i)
                .find(".productOriginalComparePrice")
                .show(),
              "2" == n) &&
              (jQueryRCT("#section-" + i)
                .find("#popupProductFrm_" + i)
                .find(".productOriginalPrice")
                .show(),
              jQueryRCT("#section-" + i)
                .find("#popupProductFrm_" + i)
                .find(".productOriginalComparePrice")
                .css("text-decoration", "line-through"),
              jQueryRCT("#section-" + i)
                .find("#popupProductFrm_" + i)
                .find(".productPrice")
                .hide()),
            jQueryRCT(".fpNav_" + i)
              .find(".slick-slide")
              .each(function (e, t) {
                var r, i, o, a;
                (n = jQueryRCT(this).find(".displayPriceOption").val()),
                  jQueryRCT(this)
                    .find(
                      ".feature-collection select[name='selected_variant_id']  > option"
                    )
                    .each(function (e, t) {
                      return "discountedOption" == jQueryRCT(this).attr("class")
                        ? jQueryRCT(this).attr(
                            "class",
                            "discountedOption hide-discounted-option"
                          )
                        : jQueryRCT(this).attr("class", "timerRunOutoption");
                    }),
                  jQueryRCT(this).find(".ProdRecom").hasClass("ProdRecom")
                    ? (jQueryRCT(this)
                        .find(".product-variant .timerRunOutoption:first")
                        .attr("selected", "selected"),
                      jQueryRCT(this).find(".product-price").empty(),
                      jQueryRCT(this)
                        .find(".product-compare-original-price")
                        .text(),
                      (a = jQueryRCT(this)
                        .find(".product-compare-original-price")
                        .attr("compare-original-price")),
                      (r = jQueryRCT(this)
                        .find(".product-original-price")
                        .text()),
                      (i = jQueryRCT(this)
                        .find(".product-original-price")
                        .attr("original-price")),
                      (o = jQueryRCT(this).find(".display_price_opt").val()),
                      jQueryRCT(this)
                        .find(".compare-price")
                        .attr("compare-price", a),
                      "2" == o &&
                        ((a = jQueryRCT(this)
                          .find(".product-original-compare-price")
                          .text()),
                        Number(i) < Number(a)
                          ? (jQueryRCT(this)
                              .find(".compare-price")
                              .attr("compare-price", a),
                            (a = RCTformat_money(
                              a.toString(),
                              rct_money_format
                            )),
                            jQueryRCT(this).find(".compare-price").text(a))
                          : jQueryRCT(this).find(".compare-price").empty()),
                      jQueryRCT(this).find(".product-qty").val("1"),
                      jQueryRCT(this).find(".isTimerRunOut").val("0"),
                      jQueryRCT(this).find(".product-price").text(r),
                      jQueryRCT(this)
                        .find(".product-price")
                        .attr("final-price", i))
                    : "1" == n
                    ? (jQueryRCT(this).find(".product-price").hide(),
                      jQueryRCT(this).find(".product-original-price").show())
                    : "2" == n &&
                      (jQueryRCT(this).find(".product-price").hide(),
                      jQueryRCT(this).find(".product-compare-price").hide(),
                      (o = Number(
                        jQueryRCT(this)
                          .find(".product-compare-original-price")
                          .text()
                          .replace(/[^0-9.-]+/g, "")
                      )),
                      (a = Number(
                        jQueryRCT(this)
                          .find(".product-original-price")
                          .text()
                          .replace(/[^0-9.-]+/g, "")
                      )),
                      "0" != o &&
                        a < o &&
                        (jQueryRCT(this)
                          .find(".product-compare-original-price")
                          .show(),
                        jQueryRCT(this)
                          .find(".product-compare-original-price")
                          .css("text-decoration", "line-through")),
                      jQueryRCT(this).find(".product-original-price").show());
              })),
          jQueryRCT(
            ".quick-product-data-" + i + " .popupPriceBlock .isTimerRunOut"
          ).val("0"),
          jQueryRCT(".RCT")
            .find("[data-key='product-discount-price-" + i + "']")
            .addClass("Discount_removed"),
          (t = jQueryRCT(".RCT")
            .find("[data-key='product-discount-price-" + i + "']")
            .find(".sold_out")
            .text()),
          jQueryRCT(".RCT")
            .find("[data-key='product-discount-price-" + i + "']")
            .hasClass("display-discount-price") &&
            !t &&
            (jQueryRCT("#section-" + i)
              .find(".display-discount-price")
              .hide(),
            (jQueryRCT("#section-" + i)
              .find(".product-compare-price:first")
              .is(":hidden")
              ? jQueryRCT("#section-" + i).find(".product-compare-api-price")
              : jQueryRCT("#section-" + i).find(".product-compare-price")
            ).css("text-decoration", "none")))
        : "2" == R
        ? (jQueryRCT("#section-" + i).html(e),
          setTimeout(function () {
            jQueryRCT("#section-" + i).hide();
          }, 2500))
        : "3" == R &&
          setTimeout(function () {
            jQueryRCT("#section-" + i).addClass("widget-gray-out");
          }, 1500),
      clearInterval(RCTtimerInter[i]),
      jQueryRCT(".widgetTimerBlock" + i).addClass("timer_expire"),
      (u = s = c = a = 0)),
      (m =
        0 != a
          ? ".showDaysValue"
          : 0 != c
          ? ".showHourValue"
          : 0 != s
          ? ".showMinuteValue"
          : ".showSecondsValue"),
      jQueryRCT("#countDown_time_above_title_" + i)
        .find(".style4_section_div")
        .css("display", "none"),
      jQueryRCT(".widgetTimerBlock" + i)
        .find(".style4_section_div")
        .css("display", "none"),
      jQueryRCT(m + i).css("display", "block"),
      (y =
        RCTshortcode_date[i] -
        (24 * parseInt(a) * 60 * 60 +
          60 * parseInt(c) * 60 +
          60 * parseInt(s) +
          parseInt(u))),
      (p = 10 <= a ? a : "0" + a),
      "0" != a && null != a && "" != a
        ? jQueryRCT(".widgetTimerBlock" + i + " .days").text(p)
        : (jQueryRCT(".widgetTimerBlock" + i + " .days").text(a),
          jQueryRCT(".widgetTimerBlock" + i + " .secctionDays").hide(),
          jQueryRCT(".widgetTimerBlock" + i)
            .find(".showDaysValue" + i)
            .css("display", "none")),
      (_ = 10 <= c ? c : "0" + c),
      ("0" == c || null == c || "" == c) && a <= 0
        ? (jQueryRCT(".widgetTimerBlock" + i + " .sectionHours").hide(),
          jQueryRCT(".widgetTimerBlock" + i + " .hours").text(c))
        : jQueryRCT(".widgetTimerBlock" + i + " .hours").text(_),
      (C = (s = "" == s || "0" == s ? "0" : s) < 10 ? "0" + s : s),
      (T = (u = "" == u || "0" == u ? "0" : u) < 10 ? "0" + u : u),
      jQueryRCT(".widgetTimerBlock" + i + " .minutes").text(C),
      jQueryRCT(".widgetTimerBlock" + i + " .seconds").text(T),
      3 == o
        ? jQueryRCT(".widgetTimerBlock" + i + " .style4_data_id" + i).each(
            function () {
              RCTstyle1ProgressBar[jQueryRCT(this).val()].animate(
                y / RCTshortcode_date[i]
              );
            }
          )
        : 2 == o &&
          ((d = ((y / RCTshortcode_date[i]) * 100).toFixed(2)),
          jQueryRCT(".progressbar_" + i).css("width", d + "%")),
      0 < RCT_expire_row_section_ids.length &&
        jQueryRCT(RCT_expire_row_section_ids).each(function (e, t) {
          l[r] && l[r][t] && delete l[r][t];
        });
  }, 1e3);
}
function RCTupdateTimeToDB() {
  var n = new Array(),
    c = 0;
  jQueryRCT(".widgetTimer").each(function () {
    var e, t, r, i, o, a;
    jQueryRCT(this).hasClass("timer_out") ||
      (jQueryRCT(this).hasClass("timer_expire") &&
        jQueryRCT(this).addClass("timer_out").removeClass("timer_expire"),
      (e = jQueryRCT(this).data("id")),
      (t = jQueryRCT(this).data("timertype")),
      (r =
        "" != jQueryRCT(".isDisplayTimer" + e + " .days:first").text()
          ? jQueryRCT(".isDisplayTimer" + e + " .days:first").text()
          : 0),
      (i =
        "" != jQueryRCT(".isDisplayTimer" + e + " .hours:first").text()
          ? jQueryRCT(".isDisplayTimer" + e + " .hours:first").text()
          : 0),
      (o =
        "" != jQueryRCT(".isDisplayTimer" + e + " .minutes:first").text()
          ? jQueryRCT(".isDisplayTimer" + e + " .minutes:first").text()
          : 0),
      (a =
        "" != jQueryRCT(".isDisplayTimer" + e + " .seconds:first").text()
          ? jQueryRCT(".isDisplayTimer" + e + " .seconds:first").text()
          : 0),
      (n[c++] = {
        id: e,
        timer_type: t,
        day: parseInt(r),
        hour: parseInt(i),
        minute: parseInt(o),
        second: parseInt(a),
      }));
  }),
    0 != n.length
      ? jQueryRCT.ajax({
          url: reconvertAjaxUrl,
          type: "post",
          dataType: "json",
          async: !1,
          data: {
            shop: rct_shop,
            store_client_id: rct_store_id,
            page_id: rct_selected_page_id,
            customer_id: rct_customer_id,
            order_id: rct_order_id,
            timer_data: n,
            action: "update_timer_time",
          },
          success: function (e) {},
          error: function (e) {
            console.log("there are some errors...");
          },
        })
      : clearInterval(RCTupdateTimeToDBtimerInter);
}
setTimeout(function () {
  RCTupdateTimeToDBtimerInter = setInterval(RCTupdateTimeToDB, 3e5);
}, 5e3);
const RCT_getDifference = (e) => {
    var t, r, i;
    return e.end_time < e.start_time
      ? {
          seconds: 0,
          minutes: 0,
          hours: 0,
          days: 0,
        }
      : ((e = (e.end_time - e.start_time) / 1e3),
        (t = parseInt(e / 86400)),
        (e %= 86400),
        (r = parseInt(e / 3600)),
        (i = (e %= 3600) / 60),
        (e = e %= 60),
        {
          days: t,
          hours: r,
          minutes: parseInt(i),
          seconds: parseInt(e),
        });
  },
  RCT_strtotime = (e = {}, t = new Date(), r = !1) => {
    let i = new Date(t);
    return (
      r && (i = new Date(1e3 * t)),
      e.days && i.setDate(i.getDate() + parseInt(e.days)),
      e.hours && i.setHours(i.getHours() + parseInt(e.hours)),
      e.minute && i.setMinutes(i.getMinutes() + parseInt(e.minute)),
      e.seconds && i.setSeconds(i.getSeconds() + parseInt(e.seconds)),
      i.getTime()
    );
  };
function RCTwidgetTimerCookieSet(e, t, r, i) {
  var o = RCT_strtotime(),
    r = RCT_strtotime(r),
    a = RCTGetLocalStorage("RCTWidgetTimer");
  a
    ? (a = JSON.parse(atob(a)))[e]
      ? (a[e][t] && "1" != i) ||
        ((a[e][t] = {
          start_time: o,
          end_time: r,
        }),
        RCTSetLocalStorage("RCTWidgetTimer", btoa(JSON.stringify(a))))
      : ((a[e] = {
          [t]: {
            start_time: o,
            end_time: r,
          },
        }),
        RCTSetLocalStorage("RCTWidgetTimer", btoa(JSON.stringify(a))))
    : ((a = {
        [e]: {
          [t]: {
            start_time: o,
            end_time: r,
          },
        },
      }),
      RCTSetLocalStorage("RCTWidgetTimer", btoa(JSON.stringify(a))));
}
var cnt = 0;
function RCTCheckURLStatus(i) {
  if (15 < cnt) return (window.location = i), !0;
  jQueryRCT
    .get(i)
    .done(function (e, t, r) {
      if (null != r && null != r.status && 200 == r.status)
        return (window.location = i), !0;
      setTimeout(function () {
        RCTCheckURLStatus(i);
      }, 500);
    })
    .fail(function () {
      setTimeout(function () {
        RCTCheckURLStatus(i);
      }, 500);
    }),
    cnt++;
}
const RCT_htmlspecialchars = (e = "", t = 2, r, i = !0) => {
  (e = (e = e || "").toString()),
    (e = (e = i ? e.replace(/&/g, "&amp;") : e)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;"));
  i = {
    ENT_NOQUOTES: 0,
    ENT_HTML_QUOTE_SINGLE: 1,
    ENT_HTML_QUOTE_DOUBLE: 2,
    ENT_COMPAT: 2,
    ENT_QUOTES: 3,
    ENT_IGNORE: 4,
  };
  return (
    (t = "number" != typeof t ? i[t] : t) &&
      i.ENT_HTML_QUOTE_SINGLE &&
      (e = e.replace(/'/g, "&#039;")),
    (e = 0 !== t ? e.replace(/"/g, "&quot;") : e)
  );
};
