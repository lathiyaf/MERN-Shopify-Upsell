import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
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
  ArchiveMajor,
  OrderStatusMinor,
  QuestionMarkMajor,
  AnalyticsMinor,
  CircleTickMinor,
  ArchiveMinor,
} from "@shopify/polaris-icons";
import {
  LineChart,
  PolarisVizProvider,
  SparkLineChart,
} from "@shopify/polaris-viz";
import React, { useEffect } from "react";
import {
  GetLastDayFunnelStats,
  GetMonthFunnelStats,
  GetTodayFunnelStats,
} from "../../service/FunnelService";

function ChartFunnel({
  day,
  funnelRevenueRct,
  setFunnelRevenueRct,
  funnelRevenueOrd,
  setFunnelRevenueOrd,
  totalRevenueRatio,
  setTotalRevenueRatio,
  totalRevenueApp,
  setTotalRevenueApp,
  isLoading,
  setIsLoading,
  acceptedOffer,
  setAcceptedOffer,
  totalAccOffer,
  setTotalAccOffer,
  declineOffer,
  setDeclineOffer,
  activeFunnel,
  setActiveFunnel,
  totalImp,
  setTotalImp,
}) {
  const app = useAppBridge();

  const getFunnelTodayStats = async () => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/funnel/statistics?day=${day}`;

    await GetTodayFunnelStats(url, token)
      .then((res) => {
        const data = res && res.data && res.data.data;
        setFunnelRevenueRct(data.compare_data1);
        setFunnelRevenueOrd(data.compare_data);
        setTotalRevenueRatio(data.revenue_ratio);
        setTotalRevenueApp(data.total_revenue);
        setAcceptedOffer(data.accept_offer_data);
        setTotalAccOffer(data.total_offer_accepted);
        setDeclineOffer(data.decline_offer_data);
        setActiveFunnel(data.active_funnels);
        setTotalImp(data.funnel_impressions);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const getLastdayFunnelStats = async () => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/funnel/statistics/lastdays`;
    const data = {
      days: day === "last7days" ? 7 : 30,
    };

    await GetLastDayFunnelStats(url, token, data)
      .then((res) => {
        const data = res && res.data && res.data.data;
        setFunnelRevenueRct(data.compare_data1);
        setFunnelRevenueOrd(data.compare_data);
        setTotalRevenueApp(data.total_revenue);
        setTotalRevenueRatio(data.revenue_ratio);
        setAcceptedOffer(data.accept_offer_data);
        setTotalAccOffer(data.total_offer_accepted);
        setDeclineOffer(data.decline_offer_data);
        setActiveFunnel(data.active_funnels);
        setTotalImp(data.funnel_impressions);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const getMonthFunnelStats = async () => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    const url = `https://${
      window.location.host
    }/api/funnel/statistics/month?month=${day === "this" ? "this" : "last"}`;

    await GetMonthFunnelStats(url, token)
      .then((res) => {
        const data = res && res.data && res.data.data;
        setFunnelRevenueRct(data.compare_data1);
        setFunnelRevenueOrd(data.compare_data);
        setTotalRevenueApp(data.total_revenue);
        setTotalRevenueRatio(data.revenue_ratio);
        setAcceptedOffer(data.accept_offer_data);
        setTotalAccOffer(data.total_offer_accepted);
        setDeclineOffer(data.decline_offer_data);
        setActiveFunnel(data.active_funnels);
        setTotalImp(data.funnel_impressions);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (day === "today" || day === "yesterday") {
      getFunnelTodayStats();
    }
    if (day === "last7days" || day === "last30days") {
      getLastdayFunnelStats();
    }
    if (day === "this" || day === "last") {
      getMonthFunnelStats();
    }
  }, [day]);

  // chart data Start

  const data = [
    {
      name: "Reconvert",
      data: funnelRevenueRct,
    },
    {
      name: "Store",
      data: funnelRevenueOrd,
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
                    ₹{totalRevenueApp}
                  </Text>
                  <Badge status="success">{totalRevenueRatio}%</Badge>
                </HorizontalStack>
              </HorizontalStack>
            </div>
            {isLoading ? (
              <div className="text-center mt-3">
                <Spinner />
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
                    <Icon source={QuestionMarkMajor} color="base" />
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
        <HorizontalGrid gap="4" columns={{ xs: 1, sm: 2, md: 2, lg: 4, xl: 4 }}>
          <div className="innner_chart">
            <div className="chart_head">
              <VerticalStack align="space-between">
                <HorizontalStack>
                  <div className="icon blue">
                    <Icon source={ArchiveMinor} color="base" />
                  </div>
                  <Text variant="headingSm" as="h6">
                    Active funnels
                  </Text>
                </HorizontalStack>
                <Text variant="headingXl" as="h5">
                  {activeFunnel}
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
                      <Icon source={AnalyticsMinor} color="base" />
                    </div>
                    <Text variant="headingSm" as="h6">
                      Funnel impressions
                    </Text>
                  </HorizontalStack>
                  <HorizontalStack>
                    <Tooltip content="Total ROI">
                      <Icon source={QuestionMarkMajor} color="base" />
                    </Tooltip>
                  </HorizontalStack>
                </HorizontalStack>
                <div className="funnel_chart">
                  <HorizontalStack gap="2">
                    <Text variant="headingXl" as="h5">
                      {totalImp}
                    </Text>
                    <Badge status="success">0.00%</Badge>
                  </HorizontalStack>
                </div>
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
                      <Icon source={CircleTickMinor} />
                    </div>
                    <Text variant="headingSm" as="h6">
                      Acceptence rate
                    </Text>
                  </HorizontalStack>
                  <HorizontalStack>
                    <Tooltip content="AOV increase">
                      <Icon source={QuestionMarkMajor} color="base" />
                    </Tooltip>
                  </HorizontalStack>
                </HorizontalStack>
                <div className="funnel_chart">
                  <HorizontalStack gap="2">
                    <Text variant="headingXl" as="h5">
                      0
                    </Text>
                    <Badge status="success">0.00%</Badge>
                  </HorizontalStack>
                </div>
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
                      <Icon source={OrderStatusMinor} />
                    </div>
                    <Text variant="headingSm" as="h6">
                      AOV increase
                    </Text>
                  </HorizontalStack>
                  <HorizontalStack>
                    <Tooltip content="Conversion rate">
                      <Icon source={QuestionMarkMajor} color="base" />
                    </Tooltip>
                  </HorizontalStack>
                </HorizontalStack>
                <div className="funnel_chart">
                  <HorizontalStack gap="2">
                    <Text variant="headingXl" as="h5">
                      0₹
                    </Text>
                    <Badge status="success">0.00%</Badge>
                  </HorizontalStack>
                </div>
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

export default ChartFunnel;
