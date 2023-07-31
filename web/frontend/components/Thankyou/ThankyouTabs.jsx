import React, { useEffect } from "react";
import { Grid, Text } from "@shopify/polaris";
import SelectMonsterFunnel from "../Dashboard/Components/SelectMonsterFunnel";
import { useState } from "react";
import LatestActivityReport from "../Dashboard/Components/LatestActivityReport";
import TopThankyouTable from "../Dashboard/Components/TopThankyouTable";
import ThankyouListing from "../Dashboard/Components/main/ThankyouListing";
import ChartThankyou from "./ChartThankyou";
import ElementWiseDatatable from "./ElementWiseDatatable";
import BirthdayPage from "./BirthdayPage";
import CommentsInfo from "./CommentsInfo";
import PurchaseSurvays from "./PurchaseSurvays";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import {
  GetAllTyPages,
  GetCustomTyStats,
  GetLastDayTyDashboardStats,
  GetMonthTyStats,
  GetTodayTyStatistics,
} from "../../service/TyPageService";
import { GetAllActivities } from "../../service/ActivityService";
import ActivityListing from "../Dashboard/Components/main/ActivityListing";

function ThankyouTabs({ activeDashboard, setDashboard }) {
  const app = useAppBridge();
  const [openThankyouListing, setThankyoulisting] = useState(false);
  const [openLatestActivityListing, setLatestActivity] = useState(false);
  const [tyPageData, setTyPageData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pageDataCount, setPageDataCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [day, setDay] = useState("last30days");
  const [customDate, setCustomDate] = useState({
    start_date: "",
    end_date: "",
  });
  const [activityData, setActivityData] = useState([]);
  const [totalActCount, setTotalActCount] = useState(0);
  const [selectAct, setSelectAct] = useState("thankyou");
  const [tyPageRct, setTyPageRct] = useState([]);
  const [tyPageOrd, setTyPageOrd] = useState([]);
  const [totalRevenueApp, setTotalRevenueApp] = useState(0);
  const [totalRevenueRatio, setTotalRevenueRatio] = useState(0);
  const [acceptedOffer, setAcceptedOffer] = useState([]);
  const [totalAccOffer, setTotalAccOffer] = useState(0);
  const [declineOffer, setDeclineOffer] = useState([]);
  const [totalStoreOrder, setTotalStoreOrder] = useState(0);
  const [totalImp, setTotalImp] = useState(0);
  const [totalDOB, setTotalDob] = useState(0);
  const [totalPrdComment, setTotalPrdComment] = useState(0);
  const [totalSurvey, setTotalSurvey] = useState(0);

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
        setTotalCount(count);
        setTyPageData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!openLatestActivityListing) {
      getAllTyPages();
    }
  }, [activePage, pageDataCount, openThankyouListing, day]);

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
    if (!openThankyouListing) {
      getAllActivities();
    }
  }, [activePage, pageDataCount, openLatestActivityListing, day, selectAct]);

  const getTodayTYStats = async () => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/template/statistics?day=${day}`;

    await GetTodayTyStatistics(url, token)
      .then((res) => {
        const data = res && res.data && res.data.data;
        setTyPageRct(data.compare_data1);
        setTyPageOrd(data.compare_data);
        setIsLoading(false);
        setTotalRevenueApp(data.total_revenue);
        setTotalRevenueRatio(data.revenue_ratio);
        setAcceptedOffer(data.accept_offer_data);
        setTotalAccOffer(data.total_offer_accepted);
        setDeclineOffer(data.decline_offer_data);
        setTotalStoreOrder(data.total_store_order);
        setTotalImp(data.ty_page_impressions);
        setTotalDob(data.total_birthday);
        setTotalPrdComment(data.total_product_comment);
        setTotalSurvey(data.total_survey);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const getLastdayTyStats = async () => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/template/statistics/lastdays`;
    const data = {
      days: day === "last7days" ? 7 : 30,
    };

    await GetLastDayTyDashboardStats(url, token, data)
      .then((res) => {
        const data = res && res.data && res.data.data;
        setTyPageRct(data.compare_data1);
        setTyPageOrd(data.compare_data);
        setIsLoading(false);
        setTotalRevenueApp(data.total_revenue);
        setTotalRevenueRatio(data.revenue_ratio);
        setAcceptedOffer(data.accept_offer_data);
        setTotalAccOffer(data.total_offer_accepted);
        setDeclineOffer(data.decline_offer_data);
        setTotalStoreOrder(data.total_store_order);
        setTotalImp(data.ty_page_impressions);
        setTotalDob(data.total_birthday);
        setTotalPrdComment(data.total_product_comment);
        setTotalSurvey(data.total_survey);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const getMonthTyStats = async () => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    const url = `https://${
      window.location.host
    }/api/template/statistics/month?month=${day === "this" ? "this" : "last"}`;
    const data = {
      days: day === "last7days" ? 7 : 30,
    };

    await GetMonthTyStats(url, token, data)
      .then((res) => {
        const data = res && res.data && res.data.data;
        setTyPageRct(data.compare_data1);
        setTyPageOrd(data.compare_data);
        setIsLoading(false);
        setTotalRevenueApp(data.total_revenue);
        setTotalRevenueRatio(data.revenue_ratio);
        setAcceptedOffer(data.accept_offer_data);
        setTotalAccOffer(data.total_offer_accepted);
        setDeclineOffer(data.decline_offer_data);
        setTotalStoreOrder(data.total_store_order);
        setTotalImp(data.ty_page_impressions);
        setTotalDob(data.total_birthday);
        setTotalPrdComment(data.total_product_comment);
        setTotalSurvey(data.total_survey);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const getCustomTyStats = async () => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/template/statistics/dynamic_dates`;
    const data = {
      start_date: customDate.start_date,
      end_date: customDate.end_date,
    };

    await GetCustomTyStats(url, token, data)
      .then((res) => {
        const data = res && res.data && res.data.data;
        setTyPageRct(data.compare_data1);
        setTyPageOrd(data.compare_data);
        setIsLoading(false);
        setTotalRevenueApp(data.total_revenue);
        setTotalRevenueRatio(data.revenue_ratio);
        setAcceptedOffer(data.accept_offer_data);
        setTotalAccOffer(data.total_offer_accepted);
        setDeclineOffer(data.decline_offer_data);
        setTotalStoreOrder(data.total_store_order);
        setTotalImp(data.ty_page_impressions);
        setTotalDob(data.total_birthday);
        setTotalPrdComment(data.total_product_comment);
        setTotalSurvey(data.total_survey);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (day === "today" || day === "yesterday") {
      getTodayTYStats();
    }
    if (day === "last7days" || day === "last30days") {
      getLastdayTyStats();
    }
    if (day === "this" || day === "last") {
      getMonthTyStats();
    }
  }, [day]);

  return (
    <>
      {!openThankyouListing &&
        !openLatestActivityListing &&
        activeDashboard == "dashboard" && (
          <div className="dashboard_content">
            <div>
              <div className="head">
                <Text variant="headingXl" as="h4" fontWeight="700">
                  Dashboard
                </Text>
              </div>
              {/* default funnel */}
              <div className="default_funnel">
                <Grid>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 5, xl: 5 }}>
                    <Text variant="headingLg" fontWeight="semibold" as="h6">
                      Default thank you page
                    </Text>
                    <p>
                      This is the thank you page template your customers see
                      when they complete a purchase, and none of the triggers
                      are being met
                    </p>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 7, xl: 7 }}>
                    <div className="select_main">
                      <SelectMonsterFunnel
                        tyPageData={tyPageData}
                        getAllTyPages={getAllTyPages}
                      />
                    </div>
                  </Grid.Cell>
                </Grid>
              </div>
              <div className="placeholder_images">Place holder Image</div>
              <div className="border my-4"></div>

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
                totalCount={totalCount}
                setDay={setDay}
                setCustomDate={setCustomDate}
                getCustomDashboardStats={() => {
                  getAllTyPages();
                  getCustomTyStats();
                }}
              />

              <div className="border my-4"></div>

              {/* chart */}
              <div>
                <Text variant="headingLg" as="h5" fontWeight="semibold">
                  Analytics
                </Text>
                <ChartThankyou
                  tyPageRct={tyPageRct}
                  tyPageOrd={tyPageOrd}
                  totalRevenueApp={totalRevenueApp}
                  totalRevenueRatio={totalRevenueRatio}
                  isLoading={isLoading}
                  acceptedOffer={acceptedOffer}
                  totalAccOffer={totalAccOffer}
                  declineOffer={declineOffer}
                  totalStoreOrder={totalStoreOrder}
                  totalImp={totalImp}
                  totalDOB={totalDOB}
                  totalPrdComment={totalPrdComment}
                  totalSurvey={totalSurvey}
                />
              </div>

              <div className="border my-4"></div>

              {/* ElementWiseDatatable */}
              <ElementWiseDatatable />
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
      {openThankyouListing && (
        <ThankyouListing
          setThankyoulisting={setThankyoulisting}
          tyPageData={tyPageData}
          getAllTyPages={getAllTyPages}
          activePage={activePage}
          totalCount={totalCount}
          pageDataCount={pageDataCount}
          onPageChange={(page) => setActivePage(page)}
          isLoading={isLoading}
          setPageDataCount={setPageDataCount}
          setDay={setDay}
          setCustomDate={setCustomDate}
          getCustomDashboardStats={getAllTyPages}
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
          type="thankyou"
        />
      )}
      {
        /* birthdays pages */
        activeDashboard == "birthday" && (
          <BirthdayPage
            activeDashboard={activeDashboard}
            setDashboard={setDashboard}
          />
        )
      }
      {activeDashboard == "comments" && (
        <CommentsInfo
          activeDashboard={activeDashboard}
          setDashboard={setDashboard}
        />
      )}
      {activeDashboard == "purchase" && (
        <PurchaseSurvays
          activeDashboard={activeDashboard}
          setDashboard={setDashboard}
        />
      )}
    </>
  );
}

export default ThankyouTabs;
