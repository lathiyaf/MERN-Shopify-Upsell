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
import TopTyRow from "../TopTyRow";
import blankTable from "../../../../assets/images/blanktable.svg";

export default function ThankyouListing({
  setThankyoulisting,
  tyPageData,
  getAllTyPages,
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
  const tyPageRows = tyPageData.map((item, i) => {
    return TopTyRow(
      item,
      i,
      getAllTyPages,
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
                setThankyoulisting(false);
                setPageDataCount(5);
                onPageChange(1);
              }}
            >
              <Icon source={MobileBackArrowMajor} color="base" />
            </div>
            <Text variant="headingXl" fontWeight="semibold" as="h4">
              Manage Templates
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
              <Button>Premade templates</Button>
              {tyPageRows.length > 0 && (
                <Button primary>Create a new template</Button>
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
              {tyPageRows.length > 0 && (
                <div className="table">
                  <DataTable
                    columnContentTypes={[
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
                      "Template name",
                      "Status",
                      "Impressions",
                      "Accepted offers",
                      "CVR",
                      "Revenue",
                      "Funnels",
                      "Actions",
                    ]}
                    rows={tyPageRows}
                    footerContent={
                      <>
                        <HorizontalStack gap="4" align="space-between">
                          <HorizontalStack gap="4">
                            <Select
                              options={Pageoptions}
                              onChange={handleSelectChange}
                              value={selected}
                            />
                            Showing {tyPageRows.length} of {totalCount} results
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

          {tyPageRows.length <= 0 && (
            <div className="nodata_wrapper">
              <VerticalStack align="center" gap="5">
                <img src={blankTable} alt="blank" />
                <Text variant="headingSm" as="p">
                  Table is blank. Click the <b>“Create a new template”</b>{" "}
                  button to start populating it with information.
                </Text>
                <Button primary>Create a new template</Button>
              </VerticalStack>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
