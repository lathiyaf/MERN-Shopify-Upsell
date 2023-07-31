import {
  Button,
  DataTable,
  HorizontalStack,
  Icon,
  Select,
  Spinner,
  Text,
  VerticalStack,
} from "@shopify/polaris";
import { ChevronDownMinor, MobileBackArrowMajor } from "@shopify/polaris-icons";
import DateRangePickers from "../DateRangePickers";
import { useCallback, useState } from "react";
import React from "react";
import PaginationCustom from "../../../Common/PaginationCustom";
import TopFunnelRow from "../TopFunnelRow";
import blankTable from "../../../../assets/images/blanktable.svg";

export default function TopFunnelsListing({
  setToplisting,
  funnelData,
  getAllFunnels,
  activePage,
  totalCount,
  pageDataCount,
  onPageChange,
  isLoading,
  setPageDataCount,
  setDay,
  setCustomDate,
  getCustomDashboardStats,
}) {
  const Topfunnelrows = funnelData.map((item, i) => {
    return TopFunnelRow(
      item,
      i,
      getAllFunnels,
      onPageChange,
      activePage,
      pageDataCount,
      totalCount
    );
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
    {
      label: "30",
      value: "30",
      suffix: <Icon source={ChevronDownMinor} />,
    },
    {
      label: "40",
      value: "40",
      suffix: <Icon source={ChevronDownMinor} />,
    },
  ];

  return (
    <>
      <div className="main_list_page">
        <HorizontalStack align="space-between">
          <div className="d-flex align-items-center">
            <div
              className="back_btn"
              onClick={() => {
                setToplisting(false);
                setPageDataCount(5);
                onPageChange(1);
                setDay("last30days");
              }}
            >
              <Icon source={MobileBackArrowMajor} color="base" />
            </div>
            <Text variant="headingXl" fontWeight="semibold" as="h4">
              Manage Funnels
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

              <Button>Premade funnels</Button>
              {Topfunnelrows.length > 0 && (
                <Button primary>Create a new funnel</Button>
              )}
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
              {Topfunnelrows.length > 0 && (
                <div className="table">
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
                        <HorizontalStack gap="4" align="space-between">
                          <HorizontalStack gap="4">
                            <Select
                              options={Pageoptions}
                              onChange={handleSelectChange}
                              value={selected}
                            />
                            Showing {Topfunnelrows.length} of {totalCount}{" "}
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
          {Topfunnelrows.length <= 0 && (
            <div className="nodata_wrapper">
              <VerticalStack align="center" gap="5">
                <img src={blankTable} alt="blank" />
                <Text variant="headingSm" as="p">
                  Table is blank. Click the <b>“Create a new funnel”</b> button
                  to start populating it with information.
                </Text>
                <Button primary>Create a new funnel</Button>
              </VerticalStack>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
