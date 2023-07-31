import { TitleBar } from "@shopify/app-bridge-react";
import { Card, Layout, Page, Icon } from "@shopify/polaris";
import React, { useState } from "react";
import "./product.css";
import {
  SidebarLeftMajor,
  SidebarRightMajor,
  VocabularyMajor,
} from "@shopify/polaris-icons";

const product = () => {
  const [hide, setHide] = useState(false);

  const Add_section = [
    {
      _id: 1,
      section_name: "Birthday collector widget",
      title:
        "Let us know your birthday. a special gift will be heading your way!",
      date_format: "MM/DD/YYYY",
      placeholder_text: "Select your birthday",
      btn_text: "Submit",
      btn_bg_color: "#197bbd",
      btn_colot: "#fff",
      thank_you_msg_txt: "Thank You!",
      thank_you_msg_txt_color: "#000",
      error_msg: "Birthday is required",
      error_msg_color: "#e32c2b",
      status: 0,
    },
    {
      _id: 2,
      section_name: "Social Sharing",
      title: "Share your order on social media",
      discount_code: "",
      icon_style: "logo_only",
      icon_alignment: "center",
      facebook: true,
      twitter: true,
      pinterest: true,
      linkedin: true,
      google: false,
      status: 0,
    },
  ];

  //   CSS

  //   .siteHeader {
  //   position: relative;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: space-between;
  //   padding: 10px;
  //   background-color: #fff;
  //   border: 1px solid rgba(201, 204, 207, 1);
  // }

  // @media (min-width: 500px) {
  //   .siteHeader {
  //     flex-direction: row;
  //   }
  // }

  // .siteHeader__section {
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  // }

  // @media (min-width: 500px) {
  //   .siteHeader__section {
  //     flex-direction: row;
  //   }
  // }

  // .siteHeader__item {
  //   padding: 5px 15px;
  //   font-size: 12px;
  //   white-space: nowrap;
  //   border-radius: 4px;
  //   width: 100%;
  // }

  // @media (min-width: 500px) {
  //   .siteHeader__item {
  //     width: auto;
  //   }
  // }

  // .border-left {
  //   border-left: 1px solid #ced3d7;
  // }

  // .siteHeaderButton {
  //   cursor: pointer;
  //   color: #000;
  //   font-size: 14px;
  // }

  // @media (min-width: 500px) {
  //   .collapse .siteHeaderButton,
  //   .siteHeaderButton {
  //     display: block;
  //   }
  // }

  // .aact-logo {
  //   width: 50px;
  //   height: 40px;
  //   transition: all 1s;
  //   border-right: 1px solid #ced3d7;
  //   display: flex;
  //   align-items: center;
  // }

  return (
    <>
      {/* <div className="siteHeader">
        <div className="siteHeader__section">
          <div className="aact-logo siteHeader__item">
            <Icon source={MobileBackArrowMajor} color="base" />
          </div>
          <div className="siteHeader__item siteHeaderButton siteHeader__item--selected">
            Conversion Master
          </div>
        </div>
        <div className="siteHeader__section border-left">
          <div className="siteHeader__item siteHeaderButton appControl">
            <Badge status="info"> Draft</Badge>
          </div>
          <div className="siteHeader__item siteHeaderButton appControl">
            <Button primary> Save</Button>
          </div>
        </div>
      </div> */}
    </>
    // <Page
    //   breadcrumbs={[{ content: "Thank You Page", url: "/product" }]}
    //   title="Thank You Page"
    //   primaryAction={{ content: "Save" }}
    //   fullWidth
    //   divider
    // >
    //   <Layout>
    //     <Layout.Section secondary>
    //       <div style={{ display: hide === true ? "none" : "" }}>
    //         <Card>
    //           <div className="area" onClick={() => setHide(true)}>
    //             <span class="Polaris-Icon icon disply-unset editor-set-icon mx-3 mt-3 mb-3">
    //               <Icon source={SidebarLeftMajor} color="base" />
    //             </span>
    //             <span class="title">Left Area</span>
    //           </div>
    //         </Card>
    //         <Card>
    //           <div className="area" onClick={() => setHide(true)}>
    //             <span class="Polaris-Icon icon disply-unset editor-set-icon mx-3 mt-3 mb-3">
    //               <Icon source={SidebarRightMajor} color="base" />
    //             </span>
    //             <span class="title">Right Area</span>
    //           </div>
    //         </Card>
    //       </div>
    //       <div>
    //         <Card>
    //           <Card.Section>
    //             <div
    //               className="area"
    //               onClick={() => setHide(true)}
    //               disabled="true"
    //             >
    //               <span class="Polaris-Icon icon disply-unset editor-set-icon mx-3 mt-3 mb-3">
    //                 <Icon source={VocabularyMajor} color="base" />
    //               </span>
    //               <span class="title">Order confirmed</span>
    //             </div>
    //             <ul>
    //               <li disabled={true}>sdjfnjd</li>
    //               <li>fsdnfk</li>
    //             </ul>
    //           </Card.Section>
    //           <Card.Section>
    //             <div className="area" onClick={() => setHide(true)}>
    //               <span class="Polaris-Icon icon disply-unset editor-set-icon mx-3 mt-3 mb-3">
    //                 <Icon source={VocabularyMajor} color="base" />
    //               </span>
    //               <span class="title">Customer information</span>
    //             </div>
    //           </Card.Section>
    //         </Card>
    //       </div>
    //     </Layout.Section>
    //     <Layout.Section>
    //       <Card sectioned>ncdj</Card>
    //     </Layout.Section>
    //   </Layout>
    // </Page>
  );
};

export default product;
