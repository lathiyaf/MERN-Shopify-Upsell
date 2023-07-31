import React, { useEffect, useState } from "react";
import {
  extend,
  render,
  useExtensionInput,
  BlockStack,
  Button,
  CalloutBanner,
  Heading,
  Image,
  Text,
  TextContainer,
  Separator,
  Tiles,
  TextBlock,
  Layout,
  Banner,
  View,
  Select,
  TextField,
  Spinner,
} from "@shopify/post-purchase-ui-extensions-react";
import axios from "axios";
import getSymbolFromCurrency from "currency-symbol-map";
import {
  ApplyChangeset,
  FunnelActivity,
  FunnelOrder,
  GetAllProducts,
  ImpressionCount,
  NextFunnelAPI,
  OfferAccept,
} from "./services/apiService";
// import parse from "html-react-parser";

extend(
  "Checkout::PostPurchase::ShouldRender",
  async ({ inputData, storage }) => {
    await storage.update(inputData);
    return { render: true };
  }
);

render("Checkout::PostPurchase::Render", () => <App />);

export function App() {
  const { done, storage, calculateChangeset, applyChangeset, inputData } =
    useExtensionInput();

  const [loading, setLoading] = useState(true);
  const [calculatedPurchase, setCalculatedPurchase] = useState();
  const [productData, setProductData] = useState({});
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [over, setOver] = useState(false);
  const [qty, setQty] = useState(1);
  const [upsell, setUpsell] = useState();
  const [downsell, setDownsell] = useState();

  const variantId =
    productData && productData.variants && productData.variants.id;
  const productTitle = productData && productData.product_title;
  const productImageURL = productData && productData.images;
  const changes = [
    { type: "add_variant", variantId, quantity: qty <= 0 ? 1 : qty },
  ];

  // Extract values from the calculated purchase
  const shipping =
    calculatedPurchase?.addedShippingLines[0]?.priceSet?.presentmentMoney
      ?.amount;
  const taxes =
    calculatedPurchase?.addedTaxLines[0]?.priceSet?.presentmentMoney?.amount;
  const total = calculatedPurchase?.totalOutstandingSet.presentmentMoney.amount;
  const originalPrice =
    calculatedPurchase?.updatedLineItems[0].totalPriceSet.presentmentMoney
      .amount;
  const discount = Math.round(
    (originalPrice * productData.discount_value) / 100
  );
  const discountedPrice = (originalPrice - discount).toFixed(2);

  useEffect(() => {
    function getProducts() {
      setLoading(true);
      GetAllProducts(JSON.parse(JSON.stringify(storage)))
        .then((res) => {
          const data = res && res.data && res.data.data && res.data.data.data;
          setProductData(data);
          setLoading(false);
          setTime({
            days: Number(data.days),
            hours: Number(data.hours),
            minutes: Number(data.minute),
            seconds: Number(data.seconds),
          });
        })
        .catch((err) => {
          setLoading(false);
        });
    }

    getProducts();
  }, []);

  useEffect(() => {
    async function calculatePurchase() {
      setLoading(true);
      const result = await calculateChangeset({ changes });
      setCalculatedPurchase(result.calculatedPurchase);
      setLoading(false);
    }
    if (Object.keys(productData).length > 0) {
      if (productData.thankyou_page) {
        setLoading(true);
      } else {
        calculatePurchase();
        setLoading(false);
      }
    }
  }, [qty, productData]);

  const countImpression = () => {
    const { initialPurchase } = inputData;
    const body = {
      customer_id: initialPurchase.customerId,
      discount_value_per: productData.discount_value,
      funnel_id: productData.funnel_id,
      location_no: productData.location_no,
      offer_id: productData.offer_id,
      order_id:
        productData && productData.order_data && productData.order_data.id,
      offer_name: productData.offer_name,
      shop: inputData && inputData.shop && inputData.shop.domain,
      impressionId: false,
    };

    ImpressionCount(body)
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data;
      })
      .catch((err) => {});
  };

  const funnelActivityAPI = (action, value) => {
    const { initialPurchase } = inputData;

    const data = {
      action: action
        ? action
        : "First offer displayed - No action was taken by the customer",
      customer_id: initialPurchase.customerId,
      funnel_id: productData.funnel_id,
      offer_id: productData.offer_id,
      order_id:
        productData && productData.order_data && productData.order_data.id,
      order_name:
        productData && productData.order_data && productData.order_data.name,
      shop: inputData && inputData.shop && inputData.shop.domain,
      value: value ? value : "",
      activityId: false,
    };

    FunnelActivity(data)
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data;
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (Object.keys(productData).length > 0) {
      NextFunnel();
    }
  }, [productData]);

  async function acceptOffer() {
    setLoading(true);

    // Make a request to your app server to sign the changeset
    const body = {
      referenceId: inputData.initialPurchase.referenceId,
      changes: changes,
      shop: inputData && inputData.shop && inputData.shop.domain,
      token: inputData.token,
    };

    const token = await ApplyChangeset(body).then((res) => {
      let data = res && res.data && res.data && res.data.data.token;
      return data;
    });

    // Make a request to Shopify servers to apply the changeset
    await applyChangeset(token);

    const data = {
      order_id:
        productData && productData.order_data && productData.order_data.id,
      funnel_id: productData.funnel_id,
      funnel_offer_id: productData.funnel_offer_id,
      is_accept: true,
    };

    OfferAccept(data)
      .then((res) => {})
      .catch((err) => {});

    countImpression();
    funnelActivityAPI(
      `Accepted Upsell: ${upsell.offer_name}`,
      `${formatCurrency(
        discountedPrice,
        inputData.initialPurchase.totalPriceSet.shopMoney.currencyCode
      )} (+ ${formatCurrency(
        taxes,
        inputData.initialPurchase.totalPriceSet.shopMoney.currencyCode
      )})`
    );

    setProductData(upsell);
    setTime({
      days: Number(upsell.days),
      hours: Number(upsell.hours),
      minutes: Number(upsell.minute),
      seconds: Number(upsell.seconds),
    });

    const { initialPurchase } = inputData;
    const orderData = {
      checkout_token:
        productData &&
        productData.order_data &&
        productData.order_data.checkout_token,
      customer_id: initialPurchase.customerId,
      final_price: total,
      funnel_id: productData.funnel_id,
      funnel_offer_id: productData.funnel_offer_id,
      order_id:
        productData && productData.order_data && productData.order_data.id,
      qty: qty,
      subtotal_price: discountedPrice,
      total_discount: discount,
      total_price: total,
      total_tax: taxes,
      variant_id:
        productData && productData.variants && productData.variants.id,
      shop: inputData && inputData.shop && inputData.shop.domain,
      discount_price: discountedPrice + discount,
    };

    FunnelOrder(orderData)
      .then((res) => {})
      .catch((err) => {});

    // Redirect to the thank-you page
    if (upsell.thankyou_page) {
      setLoading(true);
      done();
    }
  }

  function declineOffer() {
    setLoading(true);
    setOver(false);
    setProductData(downsell);
    setTime({
      days: Number(downsell.days),
      hours: Number(downsell.hours),
      minutes: Number(downsell.minute),
      seconds: Number(downsell.seconds),
    });

    const data = {
      order_id:
        productData && productData.order_data && productData.order_data.id,
      funnel_id: productData.funnel_id,
      funnel_offer_id: productData.funnel_offer_id,
      is_accept: false,
    };

    OfferAccept(data)
      .then((res) => {})
      .catch((err) => {});

    funnelActivityAPI(
      `Declined Downsell: ${upsell.offer_name}`,
      `${formatCurrency(
        discountedPrice,
        inputData.initialPurchase.totalPriceSet.shopMoney.currencyCode
      )} (+ ${formatCurrency(
        taxes,
        inputData.initialPurchase.totalPriceSet.shopMoney.currencyCode
      )})`
    );

    if (downsell.thankyou_page) {
      setLoading(true);
      done();
    }
  }

  const getTime = () => {
    if (
      time.days == 0 &&
      time.hours == 0 &&
      time.minutes == 0 &&
      time.seconds == 0
    )
      setOver(true);
    else if (time.hours == 0 && time.minutes == 0 && time.seconds == 0)
      setTime({
        days: time.days - 1,
        hours: 24,
        minutes: 59,
        seconds: 59,
      });
    else if (time.minutes == 0 && time.seconds == 0)
      setTime({
        days: time.days,
        hours: time.hours - 1,
        minutes: 59,
        seconds: 59,
      });
    else if (time.seconds == 0)
      setTime({
        days: time.days,
        hours: time.hours,
        minutes: time.minutes - 1,
        seconds: 59,
      });
    else
      setTime({
        days: time.days,
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1,
      });
  };

  useEffect(() => {
    let timerID = setInterval(() => getTime(), 1000);
    return () => clearInterval(timerID);
  });

  useEffect(() => {
    if (over) {
      declineOffer();
    }
  }, [over, downsell, time]);

  const NextFunnel = () => {
    const body = {
      funnel_id: productData.funnel_id,
      funnel_offer_id: productData.funnel_offer_id,
      shop: inputData && inputData.shop && inputData.shop.domain,
    };

    NextFunnelAPI(body)
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data;
        setUpsell(data.upsell);
        setDownsell(data.downSell);
      })
      .catch((err) => {});
  };

  return (
    <>
      {loading && (
        <BlockStack alignment="center" spacing="loose">
          <BlockStack />
          <View padding="base" border="base">
            <Spinner size="large" />
          </View>
        </BlockStack>
      )}
      {!loading && (
        <BlockStack spacing="loose" alignment="center">
          <CalloutBanner
            alignment="center"
            border="none"
            background="transparent"
          >
            <BlockStack spacing="loose">
              <TextContainer>
                <Text size="large" emphasized>
                  {productData.widget_title}
                </Text>
              </TextContainer>
              <Banner iconHidden={true} status="critical">
                <TextContainer>
                  <Text size="large" emphasized id="test">
                    {over
                      ? productData.timer_exp_msg
                      : `${productData.timer_offer_txt} ${time.days
                          .toString()
                          .padStart(2, "0")}:${time.hours
                          .toString()
                          .padStart(2, "0")}:${time.minutes
                          .toString()
                          .padStart(2, "0")}:${time.seconds
                          .toString()
                          .padStart(2, "0")}`}
                  </Text>
                </TextContainer>
              </Banner>
            </BlockStack>
          </CalloutBanner>
          <Layout
            media={[
              { viewportSize: "small", sizes: [1, 0, 1], maxInlineSize: 0.9 },
              {
                viewportSize: "medium",
                sizes: [532, 0, 1],
                maxInlineSize: 420,
              },
              { viewportSize: "large", sizes: [560, 38, 340] },
            ]}
          >
            <Image description="product photo" source={productImageURL} />
            <BlockStack />

            <BlockStack>
              <Heading>{productTitle}</Heading>
              <PriceHeader
                discountedPrice={discountedPrice}
                originalPrice={originalPrice}
                loading={!calculatedPurchase}
                inputData={inputData}
              />
              <VariantPicker
                options={[
                  {
                    value:
                      productData &&
                      productData.variants &&
                      productData.variants.id,
                    label:
                      productData &&
                      productData.variants &&
                      productData.variants.option1,
                  },
                ]}
                defaultValue={
                  productData && productData.variants && productData.variants.id
                }
              />
              <TextField
                type="number"
                value={qty}
                label="Quantity"
                onInput={(e) => setQty(Number(e))}
              />
              <BlockStack spacing="tight">
                <Separator />
                <MoneyLine
                  label={productData.sub_total_txt}
                  amount={discountedPrice}
                  loading={!calculatedPurchase}
                  inputData={inputData}
                />
                <MoneyLine
                  label={productData.discount_txt}
                  amount={discount}
                  loading={!calculatedPurchase}
                  inputData={inputData}
                />
                <MoneyLine
                  label={productData.shipping_txt}
                  amount={shipping}
                  loading={!calculatedPurchase}
                  inputData={inputData}
                />
                <MoneyLine
                  label={productData.taxes_txt}
                  amount={taxes}
                  loading={!calculatedPurchase}
                  inputData={inputData}
                />
                <Separator />
                <MoneySummary
                  label={productData.total_txt}
                  amount={total}
                  loading={!calculatedPurchase}
                  inputData={inputData}
                />
              </BlockStack>
              <BlockStack>
                <Button onPress={acceptOffer} submit loading={loading}>
                  {productData.acc_btn_txt} ·{" "}
                  {formatCurrency(
                    total,
                    inputData.initialPurchase.totalPriceSet.shopMoney
                      .currencyCode
                  )}
                </Button>
                <Button onPress={declineOffer} subdued loading={loading}>
                  {productData.decline_btn_txt}
                </Button>
              </BlockStack>
            </BlockStack>
          </Layout>
        </BlockStack>
      )}
    </>
  );
}

function PriceHeader({ discountedPrice, originalPrice, loading, inputData }) {
  return (
    <TextContainer alignment="leading" spacing="loose">
      <Text role="deletion" size="large">
        {!loading &&
          formatCurrency(
            originalPrice,
            inputData.initialPurchase.totalPriceSet.shopMoney.currencyCode
          )}
      </Text>
      <Text emphasized size="large">
        {" "}
        {!loading &&
          formatCurrency(
            discountedPrice,
            inputData.initialPurchase.totalPriceSet.shopMoney.currencyCode
          )}
      </Text>
    </TextContainer>
  );
}

function ProductDescription({ textLines }) {
  return (
    <BlockStack spacing="xtight">
      {textLines.map((text, index) => (
        <TextBlock key={index} subdued>
          {text}
        </TextBlock>
      ))}
    </BlockStack>
  );
}

function MoneyLine({ label, amount, loading = false, inputData }) {
  return (
    <Tiles>
      <TextBlock size="small">{label}</TextBlock>
      <TextContainer alignment="trailing">
        <TextBlock emphasized size="small">
          {loading
            ? "-"
            : formatCurrency(
                amount,
                inputData.initialPurchase.totalPriceSet.shopMoney.currencyCode
              )}
        </TextBlock>
      </TextContainer>
    </Tiles>
  );
}

function MoneySummary({ label, amount, inputData }) {
  return (
    <Tiles>
      <TextBlock size="medium" emphasized>
        {label}
      </TextBlock>
      <TextContainer alignment="trailing">
        <TextBlock emphasized size="medium">
          {formatCurrency(
            amount,
            inputData.initialPurchase.totalPriceSet.shopMoney.currencyCode
          )}
        </TextBlock>
      </TextContainer>
    </Tiles>
  );
}

function formatCurrency(amount, currency) {
  if (!amount || parseInt(amount, 10) === 0) {
    return "Free";
  }
  return `${getSymbolFromCurrency(currency)}${amount}`;
}

function VariantPicker({ options, defaultValue }) {
  return <Select label="Size" value={defaultValue} options={options} />;
}
