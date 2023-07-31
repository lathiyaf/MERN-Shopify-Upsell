import React, { useCallback, useState } from "react";
import TopActivityRow from "../TopActivityRow";
import {
  DataTable,
  HorizontalStack,
  Icon,
  Select,
  Spinner,
  VerticalStack,
  Text,
} from "@shopify/polaris";
import { ChevronDownMinor, MobileBackArrowMajor } from "@shopify/polaris-icons";
import PaginationCustom from "../../../Common/PaginationCustom";
import blankTable from "../../../../assets/images/blanktable.svg";
import DateRangePickers from "../DateRangePickers";

const ActivityListing = ({
  setOpenActListing,
  activityData,
  activePage,
  totalCount,
  pageDataCount,
  onPageChange,
  isLoading,
  setPageDataCount,
  setDay,
  setCustomDate,
  getCustomDashboardStats,
  setSelectAct,
  selectAct,
  type,
}) => {
  const activityRows = activityData.map((item) => {
    return TopActivityRow(item);
  });

  const [selected, setSelected] = useState("enabled");

  const handleSelectChange = useCallback((value) => {
    setSelected(value);
    setPageDataCount(Number(value));
    onPageChange(1);
  }, []);

  const Pageoptions = [
    {
      label: "10",
      value: "10",
      suffix: <Icon source={ChevronDownMinor} />,
    },
    {
      label: "20",
      value: "20",
      suffix: <Icon source={ChevronDownMinor} />,
    },
    { label: "30", value: "30", suffix: <Icon source={ChevronDownMinor} /> },
    { label: "40", value: "40", suffix: <Icon source={ChevronDownMinor} /> },
  ];

  const handleSelectActChange = useCallback((value) => {
    setSelectAct(value);
  }, []);

  const activityOptions = [
    { label: "All", value: "all" },
    { label: "Thank you page", value: "thankyou" },
    { label: "Funnels", value: "funnels" },
  ];

  return (
    <>
      <div className="main_list_page">
        <HorizontalStack align="space-between">
          <div className="d-flex align-items-center">
            <div
              className="back_btn"
              onClick={() => {
                setOpenActListing(false);
                setPageDataCount(5);
                onPageChange(1);
                setSelectAct(
                  type === "funnel"
                    ? "funnels"
                      ? type === "thankyou"
                      : "thankyou"
                    : "all"
                );
                setDay("last30days");
              }}
            >
              <Icon source={MobileBackArrowMajor} color="base" />
            </div>
            <Text variant="headingXl" fontWeight="semibold" as="h4">
              Latest activity Report
            </Text>
          </div>
          <div className="head_row">
            <HorizontalStack gap="4">
              <DateRangePickers
                setDay={setDay}
                setCustomDate={setCustomDate}
                getCustomDashboardStats={getCustomDashboardStats}
                onPageChange={onPageChange}
              />
              <Select
                options={activityOptions}
                onChange={handleSelectActChange}
                value={selectAct}
              />
            </HorizontalStack>
          </div>
        </HorizontalStack>
        <div className="liststable_main">
          {isLoading ? (
            <div className="text-center mt-3">
              <Spinner accessibilityLabel="Spinner example" size="large" />
            </div>
          ) : (
            <>
              {activityData.length > 0 && (
                <div className="table">
                  <DataTable
                    columnContentTypes={[
                      "text",
                      "numeric",
                      "text",
                      "text",
                      "text",
                    ]}
                    headings={["Time", "Order", "Customer", "Action", "Value"]}
                    rows={activityRows}
                    footerContent={
                      <>
                        <HorizontalStack gap="4" align="space-between">
                          <HorizontalStack gap="4">
                            <Select
                              options={Pageoptions}
                              onChange={handleSelectChange}
                              value={selected}
                            />
                            Showing {activityRows.length} of {totalCount}{" "}
                            results
                          </HorizontalStack>
                          <PaginationCustom
                            activePage={activePage}
                            totalCount={totalCount}
                            pageDataCount={pageDataCount}
                            onPageChange={onPageChange}
                          />
                        </HorizontalStack>
                      </>
                    }
                  />
                </div>
              )}
            </>
          )}

          {activityRows.length <= 0 && (
            <div className="nodata_wrapper">
              <VerticalStack align="center" gap="5">
                <img src={blankTable} alt="blank" />
                <Text variant="headingSm" as="p">
                  Activity data not found.
                </Text>
              </VerticalStack>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ActivityListing;
