// import React, { useEffect, useState } from "react";
// import {
//   extend,
//   render,
//   useExtensionInput,
//   BlockStack,
//   Button,
//   CalloutBanner,
//   Heading,
//   Image,
//   Text,
//   TextContainer,
//   Separator,
//   Tiles,
//   TextBlock,
//   Layout,
//   Banner,
//   View,
//   Select,
//   TextField,
// } from "@shopify/post-purchase-ui-extensions-react";
// import axios from "axios";
// import getSymbolFromCurrency from "currency-symbol-map";
// // import parse from "html-react-parser";

// extend(
//   "Checkout::PostPurchase::ShouldRender",
//   async ({ inputData, storage }) => {
//     // console.log("inputData============================", inputData);
//     // console.log("storage============================", storage);

//     await storage.update(inputData);
//     // await axios({
//     //   url: `http://localhost:42739/api/offer`,
//     //   method: "GET",
//     //   headers: {
//     //     "Access-Control-Allow-Origin": "*",
//     //     "Access-Control-Allow-Methods": "*",
//     //   },
//     // })
//     //   .then(async (res) => {
//     //     console.log("res===================", res);
//     //     await storage.update(res.data);
//     //   })
//     //   .catch((err) => {
//     //     console.log("err==============", err);
//     //   });

//     return { render: true };
//   }
// );

// render("Checkout::PostPurchase::Render", () => <App />);

// export function App() {
//   const { done, storage, calculateChangeset, applyChangeset, inputData } =
//     useExtensionInput();
//   console.log("storage============================", inputData);

//   const [loading, setLoading] = useState(true);
//   const [calculatedPurchase, setCalculatedPurchase] = useState();
//   const [productData, setProductData] = useState({});
//   const [time, setTime] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });
//   const [qty, setQty] = useState(1);

//   useEffect(() => {
//     async function getProducts() {
//       setLoading(true);
//       await fetch(`http://localhost:42739/api/get/products`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(storage),
//       })
//         .then((response) => response.json())
//         .then((res) => {
//           const data = res && res.data && res.data.data;
//           setProductData(data);
//           setLoading(false);
//           setTime({
//             days: Number(data.days),
//             hours: Number(data.hours),
//             minutes: Number(data.minute),
//             seconds: Number(data.seconds),
//           });
//         })
//         .catch((err) => {
//           // console.log("err==================", err);
//           setLoading(false);
//         });
//     }

//     getProducts();
//   }, []);

//   async function calculatePurchase() {
//     // Request Shopify to calculate shipping costs and taxes for the upsell
//     const result = await calculateChangeset({ changes });

//     setCalculatedPurchase(result.calculatedPurchase);
//     setLoading(false);
//   }

//   useEffect(() => {
//     if (Object.keys(productData).length > 0) {
//       console.log("if===============");
//       calculatePurchase();
//     }
//   }, [qty, productData]);

//   const variantId =
//     productData && productData.variants && productData.variants.id;
//   const productTitle = productData && productData.product_title;
//   const productImageURL = productData && productData.images;

//   const changes = [{ type: "add_variant", variantId, quantity: qty }];

//   console.log("calculatedPurchase==============", calculatedPurchase);

//   // Extract values from the calculated purchase
//   const shipping =
//     calculatedPurchase?.addedShippingLines[0]?.priceSet?.presentmentMoney
//       ?.amount;
//   const taxes =
//     calculatedPurchase?.addedTaxLines[0]?.priceSet?.presentmentMoney?.amount;
//   const total = calculatedPurchase?.totalOutstandingSet.presentmentMoney.amount;
//   const originalPrice =
//     calculatedPurchase?.updatedLineItems[0].totalPriceSet.presentmentMoney
//       .amount;
//   const discount = Math.round(
//     (originalPrice * productData.discount_value) / 100
//   );
//   const discountedPrice = originalPrice - discount;

//   async function acceptOffer() {
//     setLoading(true);

//     // Make a request to your app server to sign the changeset
//     const token = await fetch(`http://localhost:42739/sign-changeset`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         referenceId: inputData.initialPurchase.referenceId,
//         changes: changes,
//         token: inputData.token,
//       }),
//     })
//       .then((response) => response.json())
//       .then((response) => response.token);

//     // Make a request to Shopify servers to apply the changeset
//     await applyChangeset(token);

//     // Redirect to the thank-you page
//     done();
//   }

//   function declineOffer() {
//     setLoading(true);
//     done();
//   }

//   const [over, setOver] = useState(false);

//   const getTime = () => {
//     if (
//       time.days === 0 &&
//       time.hours === 0 &&
//       time.minutes === 0 &&
//       time.seconds === 0
//     ) {
//       setOver(true);
//     } else if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
//       setTime({
//         days: time.days - 1,
//         hours: time.hours,
//         minutes: 59,
//         seconds: 59,
//       });
//     } else if (time.minutes === 0 && time.seconds === 0) {
//       setTime({
//         hours: time.hours - 1,
//         minutes: 59,
//         seconds: 59,
//       });
//     } else if (time.seconds === 0) {
//       setTime({
//         hours: time.hours,
//         minutes: time.minutes - 1,
//         seconds: 59,
//       });
//     } else {
//       setTime({
//         hours: time.hours,
//         minutes: time.minutes,
//         seconds: time.seconds - 1,
//       });
//     }
//   };

//   // useEffect(() => {
//   //   let timerID = setInterval(() => getTime(), 100);
//   //   return () => clearInterval(timerID);
//   // });

//   return (
//     <>
//       <BlockStack spacing="loose" alignment="center">
//         <CalloutBanner
//           alignment="center"
//           border="none"
//           background="transparent"
//         >
//           <BlockStack spacing="loose">
//             <TextContainer>
//               <Text size="large" emphasized>
//                 {productData.widget_title}
//               </Text>
//             </TextContainer>
//             <Banner iconHidden={true} status="critical">
//               <TextContainer>
//                 <Text size="large" emphasized id="test">
//                   {over
//                     ? productData.timer_exp_msg
//                     : `${productData.timer_offer_txt} ${time.hours
//                         .toString()
//                         .padStart(2, "0")}:${time.minutes
//                         .toString()
//                         .padStart(2, "0")}:${time.seconds
//                         .toString()
//                         .padStart(2, "0")}`}
//                 </Text>
//               </TextContainer>
//             </Banner>
//           </BlockStack>
//         </CalloutBanner>
//         <Layout
//           media={[
//             { viewportSize: "small", sizes: [1, 0, 1], maxInlineSize: 0.9 },
//             { viewportSize: "medium", sizes: [532, 0, 1], maxInlineSize: 420 },
//             { viewportSize: "large", sizes: [560, 38, 340] },
//           ]}
//         >
//           <Image description="product photo" source={productImageURL} />
//           <BlockStack />
//           <BlockStack>
//             <Heading>{productTitle}</Heading>
//             <PriceHeader
//               discountedPrice={discountedPrice}
//               originalPrice={originalPrice}
//               loading={!calculatedPurchase}
//               inputData={inputData}
//             />
//             <VariantPicker
//               options={[
//                 {
//                   value:
//                     productData &&
//                     productData.variants &&
//                     productData.variants.id,
//                   label:
//                     productData &&
//                     productData.variants &&
//                     productData.variants.option1,
//                 },
//               ]}
//               defaultValue={
//                 productData && productData.variants && productData.variants.id
//               }
//             />
//             <TextField
//               type="number"
//               label="Quantity"
//               onChange={(e) => {
//                 setQty(Number(e));
//                 calculatePurchase();
//               }}
//               value={qty}
//             ></TextField>
//             <BlockStack spacing="tight">
//               <Separator />
//               <MoneyLine
//                 label={productData.sub_total_txt}
//                 amount={discountedPrice}
//                 loading={!calculatedPurchase}
//                 inputData={inputData}
//               />
//               <MoneyLine
//                 label={productData.discount_txt}
//                 amount={discount}
//                 loading={!calculatedPurchase}
//                 inputData={inputData}
//               />
//               <MoneyLine
//                 label={productData.shipping_txt}
//                 amount={shipping}
//                 loading={!calculatedPurchase}
//                 inputData={inputData}
//               />
//               <MoneyLine
//                 label={productData.taxes_txt}
//                 amount={taxes}
//                 loading={!calculatedPurchase}
//                 inputData={inputData}
//               />
//               <Separator />
//               <MoneySummary
//                 label={productData.total_txt}
//                 amount={total}
//                 loading={!calculatedPurchase}
//                 inputData={inputData}
//               />
//             </BlockStack>
//             <BlockStack>
//               <Button onPress={acceptOffer} submit loading={loading}>
//                 {productData.acc_btn_txt} ·{" "}
//                 {formatCurrency(
//                   total,
//                   inputData.initialPurchase.totalPriceSet.shopMoney.currencyCode
//                 )}
//               </Button>
//               <Button onPress={declineOffer} subdued loading={loading}>
//                 {productData.decline_btn_txt}
//               </Button>
//             </BlockStack>
//           </BlockStack>
//         </Layout>
//       </BlockStack>
//     </>
//   );
// }

// function PriceHeader({ discountedPrice, originalPrice, loading, inputData }) {
//   return (
//     <TextContainer alignment="leading" spacing="loose">
//       <Text role="deletion" size="large">
//         {!loading &&
//           formatCurrency(
//             originalPrice,
//             inputData.initialPurchase.totalPriceSet.shopMoney.currencyCode
//           )}
//       </Text>
//       <Text emphasized size="large">
//         {!loading &&
//           formatCurrency(
//             discountedPrice,
//             inputData.initialPurchase.totalPriceSet.shopMoney.currencyCode
//           )}
//       </Text>
//     </TextContainer>
//   );
// }

// function ProductDescription({ textLines }) {
//   return (
//     <BlockStack spacing="xtight">
//       {textLines.map((text, index) => (
//         <TextBlock key={index} subdued>
//           {text}
//         </TextBlock>
//       ))}
//     </BlockStack>
//   );
// }

// function MoneyLine({ label, amount, loading = false, inputData }) {
//   return (
//     <Tiles>
//       <TextBlock size="small">{label}</TextBlock>
//       <TextContainer alignment="trailing">
//         <TextBlock emphasized size="small">
//           {loading
//             ? "-"
//             : formatCurrency(
//                 amount,
//                 inputData.initialPurchase.totalPriceSet.shopMoney.currencyCode
//               )}
//         </TextBlock>
//       </TextContainer>
//     </Tiles>
//   );
// }

// function MoneySummary({ label, amount, inputData }) {
//   return (
//     <Tiles>
//       <TextBlock size="medium" emphasized>
//         {label}
//       </TextBlock>
//       <TextContainer alignment="trailing">
//         <TextBlock emphasized size="medium">
//           {formatCurrency(
//             amount,
//             inputData.initialPurchase.totalPriceSet.shopMoney.currencyCode
//           )}
//         </TextBlock>
//       </TextContainer>
//     </Tiles>
//   );
// }

// function formatCurrency(amount, currency) {
//   if (!amount || parseInt(amount, 10) === 0) {
//     return "Free";
//   }
//   return `${getSymbolFromCurrency(currency)}${amount}`;
// }

// function VariantPicker({ options, defaultValue }) {
//   return <Select label="Size" value={defaultValue} options={options} />;
// }

// // function QuantityStepper({ label }) {
// //   return <Stepper label={label} />;
// // }
