import {
  Badge,
  Grid,
  HorizontalGrid,
  HorizontalStack,
  Icon,
  Text,
  Tooltip,
  VerticalStack,
} from "@shopify/polaris";
import {
  CashDollarMajor,
  OrderStatusMinor,
  OrdersMinor,
  QuestionMarkMajor,
  RefreshMajor,
  RefreshMinor,
} from "@shopify/polaris-icons";
import {
  LineChart,
  PolarisVizProvider,
  SparkLineChart,
} from "@shopify/polaris-viz";
import React from "react";

function ChartDash() {
  // chart data Start

  const data = [
    {
      name: "Reconvert",
      data: [
        {
          key: "1 Apr",
          value: 1000,
        },
        {
          key: "2 Apr",
          value: 800,
        },
        {
          key: "3 Apr",
          value: 200,
        },
        {
          key: "4 Apr",
          value: 100,
        },
        {
          key: "5 Apr",
          value: 600,
        },
        {
          key: "6 Apr",
          value: 800,
        },
        {
          key: "7 Apr",
          value: 1000,
        },
      ],
    },
    {
      name: "Store",
      data: [
        {
          key: "1 Apr",
          value: 500,
        },
        {
          key: "2 Apr",
          value: 100,
        },
        {
          key: "3 Apr",
          value: 1000,
        },
        {
          key: "4 Apr",
          value: 80,
        },
        {
          key: "5 Apr",
          value: 400,
        },
        {
          key: "6 Apr",
          value: 800,
        },
        {
          key: "7 Apr",
          value: 100,
        },
      ],
    },
  ];

  const dataOffers = [
    {
      name: "Accepted",
      data: [
        {
          key: "1 Apr",
          value: 1000,
        },
        {
          key: "2 Apr",
          value: 800,
        },
        {
          key: "3 Apr",
          value: 200,
        },
        {
          key: "4 Apr",
          value: 100,
        },
        {
          key: "5 Apr",
          value: 600,
        },
        {
          key: "6 Apr",
          value: 800,
        },
        {
          key: "7 Apr",
          value: 1000,
        },
      ],
    },
    {
      name: "Declined",
      data: [
        {
          key: "1 Apr",
          value: 1000,
        },
        {
          key: "2 Apr",
          value: 800,
        },
        {
          key: "3 Apr",
          value: 200,
        },
        {
          key: "4 Apr",
          value: 100,
        },
        {
          key: "5 Apr",
          value: 600,
        },
        {
          key: "6 Apr",
          value: 800,
        },
        {
          key: "7 Apr",
          value: 1000,
        },
      ],
    },
  ];

  const orderVal = [
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

  const ROIVal = [
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

  const AOV = [
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

  const conversionRate = [
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
      <div className="chart_main">
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <div className="chart_head">
              <HorizontalStack
                align="space-between"
                wrap={true}
                className="flex-wrap"
              >
                <HorizontalStack>
                  <Text variant="bodyLg" fontWeight="semibold" as="p">
                    Revenue generated by the app
                  </Text>
                  <Tooltip content="All orders">
                    <Icon source={QuestionMarkMajor} color="base" />
                  </Tooltip>
                </HorizontalStack>
                <HorizontalStack>
                  <Text variant="headingXl" as="h4">
                    ₹20,236
                  </Text>
                  <Badge status="success">12.56%</Badge>
                </HorizontalStack>
              </HorizontalStack>
            </div>
            <PolarisVizProvider
              themes={{
                Default: {
                  line: {
                    hasSpline: false,
                    style: "dotted",
                    width: 5,
                    pointStroke: "lime",
                  },
                },
              }}
            >
              <LineChart data={data} theme="Light" />
            </PolarisVizProvider>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <div className="chart_head">
              <HorizontalStack align="space-between">
                <HorizontalStack>
                  <Text variant="bodyLg" fontWeight="semibold" as="p">
                    Accepted offers
                  </Text>
                  <Tooltip content="All orders">
                    <Icon source={QuestionMarkMajor} color="base" />
                  </Tooltip>
                </HorizontalStack>
                <HorizontalStack>
                  <Text variant="headingXl" as="h4">
                    536
                  </Text>
                  <Badge status="success">12.56%</Badge>
                </HorizontalStack>
              </HorizontalStack>
            </div>
            <PolarisVizProvider
              themes={{
                Default: {
                  line: {
                    hasSpline: false,
                    style: "dotted",
                    width: 5,
                    pointStroke: "lime",
                  },
                },
              }}
            >
              <LineChart data={dataOffers} theme="Light" />
            </PolarisVizProvider>
          </Grid.Cell>
        </Grid>
      </div>

      <div className="sub_chart">
        <HorizontalGrid gap="4" columns={{ xs: 1, sm: 2, md: 2, lg: 4, xl: 4 }}>
          <div className="innner_chart">
            <div className="chart_head">
              <VerticalStack align="space-between">
                <HorizontalStack>
                  <div className="icon blue">
                    <Icon source={CashDollarMajor} />
                  </div>
                  <Text variant="headingSm" as="h6">
                    Value per order
                  </Text>
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
              <SparkLineChart data={orderVal} theme="Light" />
            </PolarisVizProvider>
          </div>

          <div className="innner_chart">
            <div className="chart_head">
              <VerticalStack>
                <HorizontalStack align="space-between">
                  <HorizontalStack>
                    <div className="icon purple">
                      <Icon source={OrdersMinor} color="" />
                    </div>
                    <Text variant="headingSm" as="h6">
                      ROI
                    </Text>
                  </HorizontalStack>
                  <HorizontalStack>
                    <Tooltip content="Total ROI">
                      <Icon source={QuestionMarkMajor} color="base" />
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
              <SparkLineChart data={ROIVal} theme="Light" />
            </PolarisVizProvider>
          </div>

          <div className="innner_chart">
            <div className="chart_head">
              <VerticalStack>
                <HorizontalStack align="space-between">
                  <HorizontalStack>
                    <div className="icon pink">
                      <Icon source={OrderStatusMinor} />
                    </div>
                    <Text variant="headingSm" as="h6">
                      AOV increase
                    </Text>
                  </HorizontalStack>
                  <HorizontalStack>
                    <Tooltip content="AOV increase">
                      <Icon source={QuestionMarkMajor} color="base" />
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
              <SparkLineChart data={AOV} theme="Light" />
            </PolarisVizProvider>
          </div>

          <div className="innner_chart">
            <div className="chart_head">
              <VerticalStack>
                <HorizontalStack align="space-between">
                  <HorizontalStack>
                    <div className="icon orange">
                      <Icon source={RefreshMinor} />
                    </div>
                    <Text variant="headingSm" as="h6">
                      Conversion rate
                    </Text>
                  </HorizontalStack>
                  <HorizontalStack>
                    <Tooltip content="Conversion rate">
                      <Icon source={QuestionMarkMajor} color="base" />
                    </Tooltip>
                  </HorizontalStack>
                </HorizontalStack>
                <Text variant="headingXl" as="h5">
                  15%
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
              <SparkLineChart data={conversionRate} theme="Light" />
            </PolarisVizProvider>
          </div>
        </HorizontalGrid>
      </div>
    </>
  );
}

export default ChartDash;
