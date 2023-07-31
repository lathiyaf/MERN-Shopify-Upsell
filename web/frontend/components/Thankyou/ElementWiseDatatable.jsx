import { DataTable, Text } from "@shopify/polaris";
import React from "react";

export default function ElementWiseDatatable() {
  const elementWisedata = [
    [
      "Product recommendations",
      <span>7</span>,
      <span>1</span>,
      <span>N/A</span>,
      <span>0.00</span>,
      <span>0</span>,
      <span>14.29%</span>,
      <span>14.29%</span>,
    ],
    [
      "Image with text",
      <span>7</span>,
      <span>1</span>,
      <span>N/A</span>,
      <span>0.00</span>,
      <span>0</span>,
      <span>14.29%</span>,
      <span>14.29%</span>,
    ],
  ];

  return (
    <>
      <div>
        <div className="mb-3">
          <Text variant="headingLg" as="h5" fontWeight="semibold">
            Element wise data
          </Text>
        </div>
        <DataTable
          columnContentTypes={[
            "text",
            "numeric",
            "numeric",
            "numeric",
            "numeric",
            "numeric",
            "numeric",
            "numeric",
          ]}
          headings={[
            "Element",
            "Impression",
            "Clicks",
            "Accepted offers",
            "Revenue",
            "Conversions",
            "CTR",
            "CVR",
          ]}
          rows={elementWisedata}
        />
      </div>
    </>
  );
}
