import {
  Button,
  DataTable,
  HorizontalStack,
  Link,
  Spinner,
  Text,
} from "@shopify/polaris";
import React from "react";
import TopTyRow from "./TopTyRow";
import DateRangePickers from "./DateRangePickers";
import NewTemplateSidebar from "./SidebarFunnel/NewTemplateSidebar";

export default function TopThankyouTable({
  setThankyoulisting,
  openThankyouListing,
  isLoading,
  tyPageData,
  getAllTyPages,
  setActivePage,
  activePage,
  pageDataCount,
  totalCount,
  setDay,
  setCustomDate,
  getCustomDashboardStats,
}) {
  const tyPageRows = tyPageData.slice(0, 5).map((item, i) => {
    return TopTyRow(
      item,
      i,
      getAllTyPages,
      setActivePage,
      activePage,
      pageDataCount,
      totalCount
    );
  });

  return (
    <>
      <div className="top_head">
        <HorizontalStack align="space-between">
          <Text variant="headingLg" as="h5">
            Top thank you pages
          </Text>
          <div>
            <HorizontalStack>
              <DateRangePickers
                setDay={setDay}
                setCustomDate={setCustomDate}
                getCustomDashboardStats={getCustomDashboardStats}
                onPageChange={setActivePage}
              />
              <NewTemplateSidebar />
            </HorizontalStack>
          </div>
        </HorizontalStack>
      </div>
      {/* {
       selected === 2 && */}
      <div className="placeholder_images">Place holder Image</div>
      <div className="my-4">
        {isLoading ? (
          <div className="text-center mt-3">
            <Spinner accessibilityLabel="Spinner example" size="large" />
          </div>
        ) : (
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
                Showing {tyPageRows.length} of {totalCount} results
                <Link
                  onClick={() => {
                    setThankyoulisting(!openThankyouListing);
                  }}
                >
                  View all
                </Link>
              </>
            }
          />
        )}
      </div>
    </>
  );
}
