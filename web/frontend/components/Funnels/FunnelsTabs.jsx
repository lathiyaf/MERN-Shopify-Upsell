import React, { useEffect } from "react";
import HelpvideoModal from "../Dashboard/Components/ModalVideo";
import {
  DataTable,
  Grid,
  HorizontalStack,
  Link,
  Spinner,
  Text,
} from "@shopify/polaris";
import SelectFunnel from "../Dashboard/Components/SelectEmailFunnel";
import NewTemplateSidebar from "../Dashboard/Components/SidebarFunnel/NewTemplateSidebar.jsx";
import { useState } from "react";
import TopFunnelsListing from "../Dashboard/Components/main/TopFunnelsListing";
import ChartFunnel from "./ChartFunnel";
import LatestActivityReport from "../Dashboard/Components/LatestActivityReport";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  GetAllFunnels,
  GetCustomFunnelStats,
} from "../../service/FunnelService";
import TopFunnelRow from "../Dashboard/Components/TopFunnelRow";
import DateRangePickers from "../Dashboard/Components/DateRangePickers";
import { GetAllActivities } from "../../service/ActivityService";
import ActivityListing from "../Dashboard/Components/main/ActivityListing";

function FunnelsTabs() {
  const app = useAppBridge();
  const [funnelData, setFunnelData] = useState([]);
  const [openTopListing, setToplisting] = useState(false);
  const [openLatestActivityListing, setLatestActivity] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageDataCount, setPageDataCount] = useState(5);
  const [day, setDay] = useState("last30days");
  const [customDate, setCustomDate] = useState({
    start_date: "",
    end_date: "",
  });
  const [activityData, setActivityData] = useState([]);
  const [selectAct, setSelectAct] = useState("funnels");
  const [totalActCount, setTotalActCount] = useState(0);
  const [funnelRevenueRct, setFunnelRevenueRct] = useState([]);
  const [funnelRevenueOrd, setFunnelRevenueOrd] = useState([]);
  const [totalRevenueRatio, setTotalRevenueRatio] = useState(0);
  const [totalRevenueApp, setTotalRevenueApp] = useState(0);
  const [acceptedOffer, setAcceptedOffer] = useState([]);
  const [totalAccOffer, setTotalAccOffer] = useState(0);
  const [declineOffer, setDeclineOffer] = useState([]);
  const [activeFunnel, setActiveFunnel] = useState(0);
  const [totalImp, setTotalImp] = useState(0);

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
    if (!openLatestActivityListing) {
      getAllFunnels();
    }
  }, [activePage, pageDataCount, openTopListing, day]);

  const getAllActivities = async () => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    let pagination;
    if (openLatestActivityListing) {
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
    if (!openTopListing) {
      getAllActivities();
    }
  }, [activePage, pageDataCount, openLatestActivityListing, day, selectAct]);

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

  const getCustomFunnelStats = async () => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/funnel/statistics/dynamic_dates`;
    const data = {
      start_date: customDate.start_date,
      end_date: customDate.end_date,
    };

    await GetCustomFunnelStats(url, token, data)
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

  return (
    <>
      {!openTopListing && !openLatestActivityListing && (
        <div className="dashboard_content">
          <div>
            <div className="head">
              <Text variant="headingLg" as="h4" fontWeight="700">
                Post purchase funnels
              </Text>

              <HelpvideoModal />
            </div>
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
            <div className="placeholder_images">Place holder Image</div>
            <div className="border my-4"></div>

            {/* post purchase funnel */}
            <div className="top_head">
              <HorizontalStack align="space-between" wrap>
                <Text variant="headingLg" as="h5" fontWeight="semibold">
                  Post purchase funnels
                </Text>
                <div className="head_row">
                  <HorizontalStack gap="4">
                    <DateRangePickers
                      setDay={setDay}
                      setCustomDate={setCustomDate}
                      getCustomDashboardStats={() => {
                        getAllFunnels();
                        getCustomFunnelStats();
                        getAllActivities();
                      }}
                      onPageChange={(page) => setActivePage(page)}
                    />
                    <NewTemplateSidebar />
                  </HorizontalStack>
                </div>
              </HorizontalStack>
            </div>
            <div className="">
              {isLoading ? (
                <div className="text-center mt-3">
                  <Spinner />
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
            <div className="border my-4"></div>
            <div>
              <Text variant="headingLg" as="h5" fontWeight="semibold">
                Analytics
              </Text>
              <ChartFunnel
                day={day}
                funnelRevenueRct={funnelRevenueRct}
                setFunnelRevenueRct={setFunnelRevenueRct}
                funnelRevenueOrd={funnelRevenueOrd}
                setFunnelRevenueOrd={setFunnelRevenueOrd}
                totalRevenueRatio={totalRevenueRatio}
                setTotalRevenueRatio={setTotalRevenueRatio}
                totalRevenueApp={totalRevenueApp}
                setTotalRevenueApp={setTotalRevenueApp}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                acceptedOffer={acceptedOffer}
                setAcceptedOffer={setAcceptedOffer}
                totalAccOffer={totalAccOffer}
                setTotalAccOffer={setTotalAccOffer}
                declineOffer={declineOffer}
                setDeclineOffer={setDeclineOffer}
                activeFunnel={activeFunnel}
                setActiveFunnel={setActiveFunnel}
                totalImp={totalImp}
                setTotalImp={setTotalImp}
              />
            </div>
            <div className="border my-4"></div>

            {/* latest activity report */}
            <LatestActivityReport
              setOpenActListing={setLatestActivity}
              openActListing={openLatestActivityListing}
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
      {openLatestActivityListing && (
        <ActivityListing
          setOpenActListing={setLatestActivity}
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
          type="funnel"
        />
      )}
    </>
  );
}

export default FunnelsTabs;
