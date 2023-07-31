import {
  Badge,
  Grid,
  HorizontalGrid,
  HorizontalStack,
  Icon,
  Spinner,
  Text,
  Tooltip,
  VerticalStack,
} from "@shopify/polaris";
import {
  OrderStatusMinor,
  QuestionMarkMinor,
  AnalyticsMinor,
  CircleTickMinor,
  WandMinor,
  OrdersMinor,
  StoreMinor,
  GiftCardMinor,
  ProductsMinor,
  BlockquoteMajor,
} from "@shopify/polaris-icons";
import {
  LineChart,
  PolarisVizProvider,
  SparkLineChart,
} from "@shopify/polaris-viz";
import React from "react";

function ChartThankyou({
  tyPageRct,
  tyPageOrd,
  totalRevenueApp,
  totalRevenueRatio,
  isLoading,
  acceptedOffer,
  totalAccOffer,
  declineOffer,
  totalStoreOrder,
  totalImp,
  totalDOB,
  totalPrdComment,
  totalSurvey,
}) {
  // chart data Start

  const data = [
    {
      name: "Reconvert",
      data: tyPageRct,
    },
    {
      name: "Store",
      data: tyPageOrd,
    },
  ];

  const dataOffers = [
    {
      name: "Accepted",
      data: acceptedOffer,
    },
    {
      name: "Declined",
      data: declineOffer,
    },
  ];

  const ROIData = [
    {
      name: "ROIData",
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

  const bouncerateData = [
    {
      name: "ROIData",
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

  const AOVData = [
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

  const storeData = [
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

  const commentsData = [
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

  const impressionData = [
    {
      name: "ROI",
      color: "#51CD88",
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

  const ConversionData = [
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

  const birthdayData = [
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

  const surveysData = [
    {
      name: "ROI",
      color: "#51CD88",
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
                    <Icon source={QuestionMarkMinor} color="base" />
                  </Tooltip>
                </HorizontalStack>
                <HorizontalStack>
                  <Text variant="headingXl" as="h4">
                    ₹{totalRevenueApp}
                  </Text>
                  <Badge status="success">{totalRevenueRatio}%</Badge>
                </HorizontalStack>
              </HorizontalStack>
            </div>
            {isLoading ? (
              <div className="text-center mt-3">
                <Spinner size="large" />
              </div>
            ) : (
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
            )}
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
            <div className="chart_head">
              <HorizontalStack align="space-between">
                <HorizontalStack>
                  <Text variant="bodyLg" fontWeight="semibold" as="p">
                    Accepted offers
                  </Text>
                  <Tooltip content="All orders">
                    <Icon source={QuestionMarkMinor} color="base" />
                  </Tooltip>
                </HorizontalStack>
                <HorizontalStack>
                  <Text variant="headingXl" as="h4">
                    {totalAccOffer}
                  </Text>
                  <Badge status="success">12.56%</Badge>
                </HorizontalStack>
              </HorizontalStack>
            </div>
            {isLoading ? (
              <div className="text-center mt-3">
                <Spinner size="large" />
              </div>
            ) : (
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
            )}
          </Grid.Cell>
        </Grid>
      </div>

      <div className="sub_chart">
        <HorizontalGrid gap="4" columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}>
          <div className="innner_chart">
            <div className="chart_head">
              <VerticalStack align="space-between">
                <HorizontalStack>
                  <div className="icon blue">
                    <Icon source={OrdersMinor} color="base" />
                  </div>
                  <Text variant="headingSm" as="h6">
                    ROI
                  </Text>
                </HorizontalStack>
                <Text variant="headingXl" as="h5">
                  ∞
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
              <SparkLineChart data={ROIData} theme="Light" />
            </PolarisVizProvider>
          </div>

          <div className="innner_chart">
            <div className="chart_head">
              <VerticalStack>
                <HorizontalStack align="space-between">
                  <HorizontalStack>
                    <div className="icon purple">
                      <Icon source={AnalyticsMinor} color="base" />
                    </div>
                    <Text variant="headingSm" as="h6">
                      ReConvert orders AOV
                    </Text>
                  </HorizontalStack>
                  <HorizontalStack>
                    <Tooltip content="Total ROI">
                      <Icon source={QuestionMarkMinor} color="base" />
                    </Tooltip>
                  </HorizontalStack>
                </HorizontalStack>
                <Text variant="headingXl" as="h5">
                  ₹0
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
              <SparkLineChart data={AOVData} theme="Light" />
            </PolarisVizProvider>
          </div>

          <div className="innner_chart">
            <div className="chart_head">
              <VerticalStack>
                <HorizontalStack align="space-between">
                  <HorizontalStack>
                    <div className="icon pink">
                      <Icon source={StoreMinor} />
                    </div>
                    <Text variant="headingSm" as="h6">
                      Total store orders
                    </Text>
                  </HorizontalStack>
                </HorizontalStack>
                <Text variant="headingXl" as="h5">
                  {totalStoreOrder}
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
              <SparkLineChart data={storeData} theme="Light" />
            </PolarisVizProvider>
          </div>

          <div className="innner_chart">
            <div className="chart_head">
              <VerticalStack>
                <HorizontalStack align="space-between">
                  <HorizontalStack>
                    <div className="icon green">
                      <Icon source={OrderStatusMinor} />
                    </div>
                    <Text variant="headingSm" as="h6">
                      Thank you page impressions
                    </Text>
                  </HorizontalStack>
                </HorizontalStack>
                <Text variant="headingXl" as="h5">
                  {totalImp}
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
              <SparkLineChart data={impressionData} theme="Light" />
            </PolarisVizProvider>
          </div>

          <div className="innner_chart">
            <div className="chart_head">
              <VerticalStack>
                <HorizontalStack align="space-between">
                  <HorizontalStack>
                    <div className="icon orange">
                      <Icon source={WandMinor} />
                    </div>
                    <Text variant="headingSm" as="h6">
                      Thank you page conversion rate
                    </Text>
                  </HorizontalStack>
                  <HorizontalStack>
                    <Tooltip content="Conversion rate">
                      <Icon source={QuestionMarkMinor} color="base" />
                    </Tooltip>
                  </HorizontalStack>
                </HorizontalStack>
                <Text variant="headingXl" as="h5">
                  0.00%
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
              <SparkLineChart data={ConversionData} theme="Light" />
            </PolarisVizProvider>
          </div>

          <div className="innner_chart">
            <div className="chart_head">
              <VerticalStack align="space-between">
                <HorizontalStack align="space-between">
                  <HorizontalStack>
                    <div className="icon blue">
                      <Icon source={CircleTickMinor} color="base" />
                    </div>
                    <Text variant="headingSm" as="h6">
                      Bounce rate
                    </Text>
                  </HorizontalStack>
                  <HorizontalStack>
                    <Tooltip content="Bounce rate">
                      <Icon source={QuestionMarkMinor} color="base" />
                    </Tooltip>
                  </HorizontalStack>
                </HorizontalStack>
                <Text variant="headingXl" as="h5">
                  0.00%
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
              <SparkLineChart data={bouncerateData} theme="Light" />
            </PolarisVizProvider>
          </div>

          <div className="innner_chart">
            <div className="chart_head">
              <VerticalStack>
                <HorizontalStack align="space-between">
                  <HorizontalStack>
                    <div className="icon purple">
                      <Icon source={GiftCardMinor} color="base" />
                    </div>
                    <Text variant="headingSm" as="h6">
                      Birthdays collected
                    </Text>
                  </HorizontalStack>
                  <HorizontalStack>
                    <Tooltip content="Total ROI">
                      <Icon source={QuestionMarkMinor} color="base" />
                    </Tooltip>
                  </HorizontalStack>
                </HorizontalStack>
                <Text variant="headingXl" as="h5">
                  {totalDOB}
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
              <SparkLineChart data={birthdayData} theme="Light" />
            </PolarisVizProvider>
          </div>

          <div className="innner_chart">
            <div className="chart_head">
              <VerticalStack>
                <HorizontalStack align="space-between">
                  <HorizontalStack>
                    <div className="icon pink">
                      <Icon source={ProductsMinor} color="base" />
                    </div>
                    <Text variant="headingSm" as="h6">
                      Product comments collected
                    </Text>
                  </HorizontalStack>
                  <HorizontalStack>
                    <Tooltip content="Conversion rate">
                      <Icon source={QuestionMarkMinor} color="base" />
                    </Tooltip>
                  </HorizontalStack>
                </HorizontalStack>
                <Text variant="headingXl" as="h5">
                  {totalPrdComment}
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
              <SparkLineChart data={commentsData} theme="Light" />
            </PolarisVizProvider>
          </div>

          <div className="innner_chart">
            <div className="chart_head">
              <VerticalStack>
                <HorizontalStack align="space-between">
                  <HorizontalStack>
                    <div className="icon green">
                      <Icon source={BlockquoteMajor} />
                    </div>
                    <Text variant="headingSm" as="h6">
                      Surveys answered
                    </Text>
                  </HorizontalStack>
                </HorizontalStack>
                <Text variant="headingXl" as="h5">
                  {totalSurvey}
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
              <SparkLineChart data={surveysData} theme="Light" />
            </PolarisVizProvider>
          </div>
        </HorizontalGrid>
      </div>
    </>
  );
}

export default ChartThankyou;
