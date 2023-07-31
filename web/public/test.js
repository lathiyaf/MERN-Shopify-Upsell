// var elements = document.querySelectorAll("link[rel=stylesheet]");
// for (var i = 0; i < elements.length; i++) {
//   elements[i].parentNode.removeChild(elements[i]);
// }

// var linkNode = document.getElementsByTagName("link")[1];
// console.log("linkNode============", linkNode);
// linkNode.parentNode.removeChild(linkNode);

var element = document.createElement("link");
element.setAttribute("rel", "stylesheet");
element.setAttribute("type", "text/css");
element.setAttribute("href", `https://upsell.loca.lt/static/product.css`);
document.getElementsByTagName("head")[0].appendChild(element);

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
  SITE_URL = "",
  ASSETS_URL = "",
  //   reconvertAjaxGetUrl =
  //     ("localhost" === domain_name
  //       ? ((SITE_URL = "http://localhost:4000/rtc_api/v1/"),
  //         (ASSETS_URL = "http://localhost/stilyo-apps/reconvert/v1/"))
  //       : "cdn.stilyoapps.com" == domain_name ||
  //         "stilyoapps.com" == domain_name ||
  //         "www.stilyoapps.com" == domain_name
  //       ? ((SITE_URL = "https://rct-service.stilyoapps.com/rtc_api/v1/"),
  //         (ASSETS_URL = "https://cdn.stilyoapps.com/v1/"))
  //       : "stage-cdn.stilyoapps.com" == domain_name
  //       ? ((SITE_URL = "https://stage-node-ng.stilyoapps.com/rtc_api/v1/"),
  //         (ASSETS_URL = "https://stage-cdn.stilyoapps.com/v1/"))
  //       : "demo.stilyoapps.com" == domain_name
  //       ? ((SITE_URL = "https://demo-node.stilyoapps.com/rtc_api/v1/"),
  //         (ASSETS_URL = "https://demo.stilyoapps.com/reconvert/v1/"))
  //       : "dev.stilyoapps.com" == domain_name
  //       ? ((SITE_URL = "https://dev-rct-argo.stilyoapps.com/rtc_api/v1/"),
  //         (ASSETS_URL = "https://dev.stilyoapps.com/reconvert/v1/"))
  //       : "test-php.stilyoapps.com" == domain_name &&
  //         ((SITE_URL = "https://test-node.stilyoapps.com/rtc_api/v1/"),
  //         (ASSETS_URL = "https://test-php.stilyoapps.com/reconvert/v1/")),
  //     SITE_URL + "reconvert"),
  //   reconvertAjaxUrlnew = SITE_URL + "api",
  //   reconvertAjaxUrl = SITE_URL + "api/reconvert",
  //   reconvertAjaxClientUrl = SITE_URL + "store/reconvert",
  jQueryRCT = null,
  rctCustomerApiDataObj = {},
  is_open = "0",
  timer = "",
  customer_name = "",
  rctIsPopUpTimeDisplay = 0,
  selected_page_id = null,
  is_v = void 0,
  funnel_id = null,
  rows_products = {},
  rows_alt_products = {},
  looxSetting = {},
  ShopInfo = {},
  fcSetting = "";

function init() {
  console.log("init===================");
  var e;
  null != Shopify.checkout &&
    null != Shopify.checkout.order_id &&
    ((shop = Shopify.shop),
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
    (order_id = Shopify.checkout.order_id),
    (is_v = getParameterByName("v", current_script_url)),
    (e = document.createElement("SCRIPT")),
    document.getElementsByTagName("head")[0].appendChild(e),
    (e.async = !0),
    (e.src = "https://kit.fontawesome.com/4339195cc6.js"),
    (e.type = "text/javascript"),
    after_jquery());
}
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
console.log("jQueryRCT================", jQueryRCT);

function getParameterByName(e, t) {
  t = "" == t || null == t ? window.location.search : t;
  e = RegExp("[?&]" + e + "=([^&]*)").exec(t);
  return e && decodeURIComponent(e[1].replace(/\+/g, " "));
}

function after_jquery() {}

async function Upsell(e) {
  var t = jQueryRCT(location).attr("href");
  console.log("t==============", t);

  await fetch("https://upsell.loca.lt/api/thank_you", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      // console.log("data========cart=========", data);
      var data = res && res.data && res.data.data;
      console.log("data=============", data.order_confirm_before_html);

      jQueryRCT(".reconvert-order-confirmation").before(
        data.order_confirm_before_html
      ),
        jQueryRCT(".reconvert-order-confirmation").after(
          data.order_confirm_after_html
        ),
        jQueryRCT(".reconvert-customer-information").after(
          data.customer_information_after_html
        );
    })
    .catch((err) => {
      console.log("err=============", err);
    });
}

Upsell();

RegisterBirthday();

function RegisterBirthday(t) {
  jQueryRCT(document).on("click", function (e) {
    var t = jQueryRCT(this);
    console.log("t=================", t, jQueryRCT(t).find("#bd_btn"));
  });

  // jQueryRCT(document).ready(function () {
  //   console.log("ready================");
  //   document.addEventListener("click", (e) => {
  //     e.preventDefault()
  //     console.log("An element was clicked.");
  //     let elementId = e.target.id;
  //     console.log("elementId============", elementId);
  //   });
  //   var buttons = document.getElementById("#bd_btn");
  //   console.log("buttons=============", buttons);
  //   // jQueryRCT("#bd_btn").each(function () {
  //   //   var t = jQueryRCT(this).val();
  //   // });
  //   // $("#bd_btn").click(function () {
  //   //   var ids = $(this).attr("id");
  //   //   alert(ids);
  //   // });
  //   $("#bd_btn").click(function (event) {
  //     event.preventDefault();
  //     console.log("click===================");
  //     // var $modal = $(this).next();
  //     // $modal.show();
  //   });
  //   // $(".btn").click(function () {
  //   //   alert("test!");
  //   //   return false;
  //   // });
  //   // $('button[id="bd_btn"]').click(function () {
  //   //   alert("test!");
  //   //   return false;
  //   // });
  //   // $("#bd_btn").click(function () {
  //   //   var bid = $(this).attr("id");
  //   //   alert(bid);
  //   // });

  //   // $("button[id='bd_btn']").on("click", function () {
  //   //   $(location).attr("href", $(this).data("options").url);
  //   //   console.log("run===============");
  //   // });

  //   // jQueryRCT(document).on("click", "#bd_btn", function (e) {
  //   //   e.preventDefault();
  //   //   // var e = jQueryRCT(this).data("id");
  //   //   // console.log("e===========", e);
  //   //   // var i = jQueryRCT(this).val();
  //   //   // console.log("i===============", i);
  //   //   // console.log("e---------------", e);
  //   //   alert("Does this work?");
  //   // });
  //   // var e = jQueryRCT(t).siblings("div").children('input[name="birthday"]');
  //   // console.log("e===========", e);
  //   // $("bd_btn").on("click", function () {
  //   //   console.log("click=============");
  //   // });
  //   // let btn = document.getElementById("#bd_btn");
  //   // console.log("btn============", btn);
  //   // $("#bd_btn").click(function () {
  //   //   alert("Does this work?");
  //   // });
  //   // console.log("btn============", btn);
  // });
  // let birthdayBtn = document.getElementById("#bd_btn");
  // console.log("birthdayBtn=============", birthdayBtn);
  // console.log(
  //   "jquery===========",
  //   jQueryRCT(document).getElementById("#bd_btn")
  // );
  // console.log("registerBirthday==============", t);
  // var e = jQueryRCT(t).siblings("div").children('input[name="birthday"]').val();
  // console.log("e============", e);
}
