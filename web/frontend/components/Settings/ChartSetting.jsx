import {
  HorizontalGrid,
  HorizontalStack,
  Icon,
  Text,
  Tooltip,
  VerticalStack,
} from "@shopify/polaris";
import {
  CapturePaymentMinor,
  CashDollarMinor,
  CustomersMinor,
  DisputeMinor,
  QuestionMarkMinor,
} from "@shopify/polaris-icons";
import { PolarisVizProvider, SparkLineChart } from "@shopify/polaris-viz";
import React from "react";

function ChartSetting() {
  // chart data Start
  const visitorsData = [
    {
      name: "Accepted",
      color: "#4B88CD",
      data: [
        {
          key: 0,
          value: 100,
        },
        {
          key: 1,
          value: 200,
        },
        {
          key: 2,
          value: 300,
        },
        {
          key: 3,
          value: 200,
        },
        {
          key: 4,
          value: 400,
        },
        {
          key: 5,
          value: 300,
        },
      ],
    },
  ];

  const referralData = [
    {
      name: "ROI",
      color: "#7239EA",
      data: [
        {
          key: 0,
          value: 500,
        },
        {
          key: 1,
          value: 500,
        },
        {
          key: 2,
          value: 500,
        },
        {
          key: 3,
          value: 500,
        },
        {
          key: 4,
          value: 500,
        },
        {
          key: 5,
          value: 500,
        },
      ],
    },
  ];

  const earningData = [
    {
      name: "ROI",
      color: "#E34984",
      data: [
        {
          key: 0,
          value: 400,
        },
        {
          key: 1,
          value: 200,
        },
        {
          key: 2,
          value: 400,
        },
        {
          key: 3,
          value: 300,
        },
        {
          key: 4,
          value: 400,
        },
        {
          key: 5,
          value: 500,
        },
        {
          key: 6,
          value: 600,
        },
      ],
    },
  ];

  const paidData = [
    {
      name: "ROI",
      color: "#E38049",
      data: [
        {
          key: 0,
          value: 400,
        },
        {
          key: 1,
          value: 100,
        },
        {
          key: 2,
          value: 300,
        },
        {
          key: 3,
          value: 400,
        },
        {
          key: 4,
          value: 500,
        },
        {
          key: 5,
          value: 600,
        },
        {
          key: 6,
          value: 700,
        },
      ],
    },
  ];

  return (
    <>
      <div className="sub_chart">
        <HorizontalGrid gap="4" columns={{ xs: 1, sm: 2, md: 2, lg: 4, xl: 4 }}>
          <div className="innner_chart">
            <div className="chart_head">
              <VerticalStack align="space-between">
                <HorizontalStack>
                  <div className="icon blue">
                    <Icon source={CustomersMinor} />
                  </div>
                  <Text variant="headingSm" as="h6">
                    Visitors
                  </Text>
                </HorizontalStack>
                <Text variant="headingXl" as="h5">
                  65
                </Text>
              </VerticalStack>
            </div>
            <PolarisVizProvider
              themes={{
                Default: {
                  line: {
                    pointStroke: "lime",
                  },
                },
              }}
            >
              <SparkLineChart data={visitorsData} theme="Light" />
            </PolarisVizProvider>
          </div>
          <div className="innner_chart">
            <div className="chart_head">
              <VerticalStack>
                <HorizontalStack align="space-between">
                  <HorizontalStack>
                    <div className="icon purple">
                      <Icon source={DisputeMinor} color="" />
                    </div>
                    <Text variant="headingSm" as="h6">
                      Referrals
                    </Text>
                  </HorizontalStack>
                  <HorizontalStack>
                    <Tooltip content="Total ROI">
                      <Icon source={QuestionMarkMinor} color="base" />
                    </Tooltip>
                  </HorizontalStack>
                </HorizontalStack>
                <Text variant="headingXl" as="h5">
                  10
                </Text>
              </VerticalStack>
            </div>
            <PolarisVizProvider
              themes={{
                Default: {
                  line: {
                    pointStroke: "lime",
                  },
                },
              }}
            >
              <SparkLineChart data={referralData} theme="Light" />
            </PolarisVizProvider>
          </div>

          <div className="innner_chart">
            <div className="chart_head">
              <VerticalStack>
                <HorizontalStack align="space-between">
                  <HorizontalStack>
                    <div className="icon pink">
                      <Icon source={CashDollarMinor} />
                    </div>
                    <Text variant="headingSm" as="h6">
                      Total earnings
                    </Text>
                  </HorizontalStack>
                  <HorizontalStack>
                    <Tooltip content="Total earnings">
                      <Icon source={QuestionMarkMinor} color="base" />
                    </Tooltip>
                  </HorizontalStack>
                </HorizontalStack>
                <Text variant="headingXl" as="h5">
                  ₹15.59
                </Text>
              </VerticalStack>
            </div>
            <PolarisVizProvider
              themes={{
                Default: {
                  line: {
                    pointStroke: "lime",
                  },
                },
              }}
            >
              <SparkLineChart data={earningData} theme="Light" />
            </PolarisVizProvider>
          </div>

          <div className="innner_chart">
            <div className="chart_head">
              <VerticalStack>
                <HorizontalStack align="space-between">
                  <HorizontalStack>
                    <div className="icon orange">
                      <Icon source={CapturePaymentMinor} />
                    </div>
                    <Text variant="headingSm" as="h6">
                      Total paid
                    </Text>
                  </HorizontalStack>
                  <HorizontalStack>
                    <Tooltip content="Total paid">
                      <Icon source={QuestionMarkMinor} color="base" />
                    </Tooltip>
                  </HorizontalStack>
                </HorizontalStack>
                <Text variant="headingXl" as="h5">
                  ₹15.59
                </Text>
              </VerticalStack>
            </div>
            <PolarisVizProvider
              themes={{
                Default: {
                  line: {
                    pointStroke: "lime",
                  },
                },
              }}
            >
              <SparkLineChart data={paidData} theme="Light" />
            </PolarisVizProvider>
          </div>
        </HorizontalGrid>
      </div>
    </>
  );
}

export default ChartSetting;
