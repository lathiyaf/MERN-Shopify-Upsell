import {
  Badge,
  DataTable,
  Grid,
  HorizontalGrid,
  HorizontalStack,
  Icon,
  Link,
  Spinner,
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
} from "@shopify/polaris-icons";
import {
  LineChart,
  PolarisVizProvider,
  SparkLineChart,
} from "@shopify/polaris-viz";
import "@shopify/polaris-viz/build/esm/styles.css";
import { useState, useEffect } from "react";
import React from "react";
import SelectFunnel from "./Components/SelectEmailFunnel.jsx";
import SelectMonsterFunnel from "./Components/SelectMonsterFunnel.jsx";
import TopThankyouTable from "./Components/TopThankyouTable.jsx";
import DateRangePicker from "./Components/DateRangePickers.jsx";
import HelpvideoModal from "./Components/ModalVideo.jsx";
import LatestActivityReport from "./Components/LatestActivityReport.jsx";
import ExploreFunnelSidebar from "./Components/ExploreFunnelSidebar.jsx";
import TopFunnelsListing from "./Components/main/TopFunnelsListing.jsx";
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  GetCustomStats,
  GetLastDayDashboardStats,
  GetMonthDashboardStats,
  GetTodayDashboardStatistics,
} from "../../service/DashboardService.js";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { GetAllFunnels } from "../../service/FunnelService.js";
import TopFunnelRow from "./Components/TopFunnelRow.jsx";
import { GetAllTyPages } from "../../service/TyPageService.js";
import ThankyouListing from "./Components/main/ThankyouListing.jsx";
import { GetAllActivities } from "../../service/ActivityService.js";
import ActivityListing from "./Components/main/ActivityListing.jsx";

export default function DashboardTabs() {
  const [day, setDay] = useState("last30days");
  const [openTopListing, setToplisting] = useState(false);
  const [todayRevenueRct, setTodayRevenueRct] = useState([]);
  const [todayRevenueOrd, setTodayRevenuerOrd] = useState([]);
  const [totalRevenueApp, setTotalRevenueApp] = useState(0);
  const [totalRevenueRatio, setTotalRevenueRatio] = useState(0);
  const [acceptedOffer, setAcceptedOffer] = useState([]);
  const [totalAccOffer, setTotalAccOffer] = useState(0);
  const [declineOffer, setDeclineOffer] = useState([]);
  const [customDate, setCustomDate] = useState({
    start_date: "",
    end_date: "",
  });
  const [funnelData, setFunnelData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageDataCount, setPageDataCount] = useState(5);
  const [tyPageData, setTyPageData] = useState([]);
  const [openThankyouListing, setThankyoulisting] = useState(false);
  const [activityData, setActivityData] = useState([]);
  const [openActListing, setOpenActListing] = useState(false);
  const [selectAct, setSelectAct] = useState("all");
  const [totalTyCount, setTotalTyCount] = useState(0);
  const [totalActCount, setTotalActCount] = useState(0);

  const app = useAppBridge();

  const getDashboardStatistics = async () => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/statistics?day=${day}`;

    await GetTodayDashboardStatistics(url, token)
      .then((res) => {
        const data = res && res.data && res.data.data;
        setTodayRevenueRct(data.compare_data1);
        setTodayRevenuerOrd(data.compare_data);
        setTotalRevenueApp(data.total_revenue);
        setTotalRevenueRatio(data.revenue_ratio);
        setAcceptedOffer(data.accept_offer_data);
        setTotalAccOffer(data.total_offer_accepted);
        setDeclineOffer(data.decline_offer_data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const getLastdayDashboardStats = async () => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/statistics/lastdays`;
    const data = {
      days: day === "last7days" ? 7 : 30,
    };

    await GetLastDayDashboardStats(url, token, data)
      .then((res) => {
        const data = res && res.data && res.data.data;
        setTodayRevenueRct(data.compare_data1);
        setTodayRevenuerOrd(data.compare_data);
        setTotalRevenueApp(data.total_revenue);
        setTotalRevenueRatio(data.revenue_ratio);
        setAcceptedOffer(data.accept_offer_data);
        setTotalAccOffer(data.total_offer_accepted);
        setDeclineOffer(data.decline_offer_data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const getMonthDashboardStats = async () => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/statistics/month?month=${
      day === "this" ? "this" : "last"
    }`;

    await GetMonthDashboardStats(url, token)
      .then((res) => {
        const data = res && res.data && res.data.data;
        setTodayRevenueRct(data.compare_data1);
        setTodayRevenuerOrd(data.compare_data);
        setTotalRevenueApp(data.total_revenue);
        setTotalRevenueRatio(data.revenue_ratio);
        setAcceptedOffer(data.accept_offer_data);
        setTotalAccOffer(data.total_offer_accepted);
        setDeclineOffer(data.decline_offer_data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const getCustomDashboardStats = async () => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/statistics/dynamic_dates`;
    const data = {
      start_date: customDate.start_date,
      end_date: customDate.end_date,
    };

    await GetCustomStats(url, token, data)
      .then((res) => {
        const data = res && res.data && res.data.data;
        setTodayRevenueRct(data.compare_data1);
        setTodayRevenuerOrd(data.compare_data);
        setTotalRevenueApp(data.total_revenue);
        setTotalRevenueRatio(data.revenue_ratio);
        setAcceptedOffer(data.accept_offer_data);
        setTotalAccOffer(data.total_offer_accepted);
        setDeclineOffer(data.decline_offer_data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (day === "today" || day === "yesterday") {
      getDashboardStatistics();
    }
    if (day === "last7days" || day === "last30days") {
      getLastdayDashboardStats();
    }
    if (day === "this" || day === "last") {
      getMonthDashboardStats();
    }
  }, [day]);

  const getAllFunnels = async () => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    let pagination;
    if (openTopListing) {
      pagination = `?page=${activePage}&limit=${pageDataCount}&day=${day}`;
    } else {
      pagination = `?page=${activePage}&day=${day}`;
    }
    if (day === "custom") {
      pagination =
        pagination +
        `&start_date=${customDate.start_date}&end_date=${customDate.end_date}`;
    }
    const url = `https://${window.location.host}/api/funnel/all` + pagination;

    await GetAllFunnels(url, token)
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data.data;
        const count = res && res.data && res.data.data && res.data.data.count;
        setTotalCount(count);
        setFunnelData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!openThankyouListing && !openActListing) {
      getAllFunnels();
    }
  }, [activePage, pageDataCount, openTopListing, day]);

  const getAllTyPages = async () => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    let pagination;
    if (openThankyouListing) {
      pagination = `?page=${activePage}&limit=${pageDataCount}&day=${day}`;
    } else {
      pagination = `?page=${activePage}&day=${day}`;
    }
    if (day === "custom") {
      pagination =
        pagination +
        `&start_date=${customDate.start_date}&end_date=${customDate.end_date}`;
    }
    const url = `https://${window.location.host}/api/thankyou/all` + pagination;

    await GetAllTyPages(url, token)
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data.data;
        const count = res && res.data && res.data.data && res.data.data.count;
        setTotalTyCount(count);
        setTyPageData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!openActListing && !openTopListing) {
      getAllTyPages();
    }
  }, [activePage, pageDataCount, openThankyouListing, day]);

  const getAllActivities = async () => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    let pagination;
    if (openActListing) {
      pagination = `?page=${activePage}&limit=${pageDataCount}&day=${day}&type=${selectAct}`;
    } else {
      pagination = `?page=${activePage}&day=${day}&type=${selectAct}`;
    }
    if (day === "custom") {
      pagination =
        pagination +
        `&start_date=${customDate.start_date}&end_date=${customDate.end_date}`;
    }
    const url = `https://${window.location.host}/api/activity` + pagination;

    await GetAllActivities(url, token)
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data.data;
        const count = res && res.data && res.data.data && res.data.data.count;
        setActivityData(data);
        setTotalActCount(count);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!openThankyouListing && !openTopListing) {
      getAllActivities();
    }
  }, [activePage, pageDataCount, openActListing, day, selectAct]);

  // chart data Start

  const data = [
    {
      name: "Reconvert",
      data: todayRevenueRct,
    },
    {
      name: "Store",
      data: todayRevenueOrd,
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
  // chart data End

  const Topfunnelrows = funnelData.slice(0, 5).map((item, i) => {
    return TopFunnelRow(
      item,
      i,
      getAllFunnels,
      setActivePage,
      activePage,
      pageDataCount,
      totalCount
    );
  });

  return (
    <>
      {!openTopListing && !openThankyouListing && !openActListing && (
        <div className="dashboard_content">
          <div>
            <div className="head">
              <Text variant="headingXl" as="h4" fontWeight="700">
                Dashboard
              </Text>

              <HelpvideoModal />
              <div className="d-sm-inline-block ms-auto end_btn">
                <DateRangePicker
                  setDay={setDay}
                  setCustomDate={setCustomDate}
                  getCustomDashboardStats={() => {
                    getCustomDashboardStats();
                    getAllActivities();
                    getAllFunnels();
                    getAllTyPages();
                  }}
                  onPageChange={(page) => setActivePage(page)}
                />
              </div>
            </div>

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
                      <Spinner
                        accessibilityLabel="Spinner example"
                        size="large"
                      />
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
                      <Spinner
                        accessibilityLabel="Spinner example"
                        size="large"
                      />
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
              <HorizontalGrid
                gap="4"
                columns={{ xs: 1, sm: 2, md: 2, lg: 4, xl: 4 }}
              >
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
                            <Icon source={RefreshMajor} />
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

            <div className="border my-4"></div>
            {/* default funnel */}
            <div className="default_funnel">
              <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 5, xl: 5 }}>
                  <Text variant="headingLg" fontWeight="semibold" as="h6">
                    Default funnel
                  </Text>
                  <p>
                    Select a default fall-back funnel, to be used whenever non
                    of the other funnels triggers are met.
                  </p>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 7, xl: 7 }}>
                  <div className="select_main">
                    <SelectFunnel
                      funnelData={funnelData}
                      getAllFunnels={getAllFunnels}
                    ></SelectFunnel>
                  </div>
                </Grid.Cell>
              </Grid>
            </div>
            {/* Top funnel */}
            <div className="top_head">
              <HorizontalStack align="space-between" wrap>
                <Text variant="headingXl" as="h5" fontWeight="semibold">
                  Top funnels
                </Text>
                <ExploreFunnelSidebar />
              </HorizontalStack>
            </div>
            <div className="my-4">
              {isLoading ? (
                <div className="text-center mt-3">
                  <Spinner accessibilityLabel="Spinner example" size="large" />
                </div>
              ) : (
                <DataTable
                  columnContentTypes={[
                    "numeric",
                    "text",
                    "numeric",
                    "numeric",
                    "numeric",
                    "numeric",
                    "numeric",
                    "numeric",
                    "text",
                  ]}
                  headings={[
                    "Priority",
                    "Funnel Name",
                    "Trigger",
                    "Impressions",
                    "Accepted offers",
                    "CVR",
                    "Revenue",
                    "Status",
                    "Actions",
                  ]}
                  rows={Topfunnelrows}
                  footerContent={
                    <>
                      Showing {Topfunnelrows.length} of {totalCount} results
                      <Link
                        className="Views"
                        onClick={() => {
                          setToplisting(!openTopListing);
                        }}
                      >
                        View all
                      </Link>
                    </>
                  }
                />
              )}
            </div>
            <div className="border"></div>

            {/* default Monster funnel */}
            <div className="default_funnel">
              <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 5, xl: 5 }}>
                  <Text variant="headingLg" as="h6">
                    Default thank you page
                  </Text>
                  <p>
                    This is the thank you page template your customers see when
                    they complete a purchase, and none of the triggers are being
                    met
                  </p>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 7, xl: 7 }}>
                  <div className="select_main">
                    <SelectMonsterFunnel
                      tyPageData={tyPageData}
                      getAllTyPages={getAllTyPages}
                    ></SelectMonsterFunnel>
                  </div>
                </Grid.Cell>
              </Grid>
            </div>

            {/* top thankyou page */}
            <TopThankyouTable
              setThankyoulisting={setThankyoulisting}
              openThankyouListing={openThankyouListing}
              isLoading={isLoading}
              tyPageData={tyPageData}
              getAllTyPages={getAllTyPages}
              setActivePage={setActivePage}
              activePage={activePage}
              pageDataCount={pageDataCount}
              totalCount={totalTyCount}
            />

            {/* latest activity report */}
            <LatestActivityReport
              setOpenActListing={setOpenActListing}
              openActListing={openActListing}
              isLoading={isLoading}
              activityData={activityData}
              totalCount={totalActCount}
            />
          </div>
        </div>
      )}
      {openTopListing && (
        <TopFunnelsListing
          setToplisting={setToplisting}
          funnelData={funnelData}
          getAllFunnels={getAllFunnels}
          activePage={activePage}
          totalCount={totalCount}
          pageDataCount={pageDataCount}
          onPageChange={(page) => setActivePage(page)}
          isLoading={isLoading}
          setPageDataCount={setPageDataCount}
          setDay={setDay}
          setCustomDate={setCustomDate}
          getCustomDashboardStats={getAllFunnels}
        />
      )}
      {openThankyouListing && (
        <ThankyouListing
          setThankyoulisting={setThankyoulisting}
          tyPageData={tyPageData}
          getAllTyPages={getAllTyPages}
          activePage={activePage}
          totalCount={totalTyCount}
          pageDataCount={pageDataCount}
          onPageChange={(page) => setActivePage(page)}
          isLoading={isLoading}
          setPageDataCount={setPageDataCount}
          setDay={setDay}
          setCustomDate={setCustomDate}
          getCustomDashboardStats={getAllTyPages}
        />
      )}
      {openActListing && (
        <ActivityListing
          setOpenActListing={setOpenActListing}
          activityData={activityData}
          activePage={activePage}
          totalCount={totalActCount}
          pageDataCount={pageDataCount}
          onPageChange={(page) => setActivePage(page)}
          isLoading={isLoading}
          setPageDataCount={setPageDataCount}
          setDay={setDay}
          setCustomDate={setCustomDate}
          getCustomDashboardStats={getAllActivities}
          setSelectAct={setSelectAct}
          selectAct={selectAct}
        />
      )}
    </>
  );
}
