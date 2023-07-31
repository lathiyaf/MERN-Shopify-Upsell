import {
  DataTable,
  HorizontalStack,
  Link,
  Spinner,
  Text,
} from "@shopify/polaris";
import React from "react";
import TopActivityRow from "./TopActivityRow";

export default function LatestActivityReport({
  setOpenActListing,
  openActListing,
  isLoading,
  activityData,
  totalCount,
}) {
  const activityRows = activityData.slice(0, 5).map((item, i) => {
    return TopActivityRow(item);
  });

  return (
    <>
      <div className="top_head">
        <HorizontalStack align="space-between">
          <Text variant="headingLg" as="h5">
            Latest activity report
          </Text>
        </HorizontalStack>
      </div>
      <div className="my-4 activity_table">
        {isLoading ? (
          <div className="text-center mt-3">
            <Spinner accessibilityLabel="Spinner example" size="large" />
          </div>
        ) : (
          <DataTable
            columnContentTypes={["text", "numeric", "text", "text", "text"]}
            headings={["Time", "Order", "Customer", "Action", "Value"]}
            rows={activityRows}
            footerContent={
              <>
                Showing {activityRows.length} of {totalCount} results
                <Link
                  className="Views"
                  onClick={() => {
                    setOpenActListing(!openActListing);
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
