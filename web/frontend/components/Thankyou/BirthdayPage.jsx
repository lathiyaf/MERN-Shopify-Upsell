import {
  Button,
  DataTable,
  HorizontalStack,
  Icon,
  Link,
  Select,
  Text,
  TextField,
  Tooltip,
  VerticalStack,
} from "@shopify/polaris";
import {
  ChevronDownMinor,
  ExportMinor,
  InfoMinor,
  MobileBackArrowMajor,
  SearchMajor,
} from "@shopify/polaris-icons";
import { useCallback, useState } from "react";
import React from "react";
import PaginationCustom from "../Common/PaginationCustom";

export default function BirthdayPage({ setDashboard }) {
  const handleClearButtonClick = useCallback(() => setTextFieldValue(""), []);
  const [textFieldValue, setTextFieldValue] = useState("Search");

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    []
  );

  const birthdayData = [
    ["Customer Email Funnel", "nathan.roberts@example.com", "12/06/2020"],
    ["12/06/2020", "curtis.weaver@example.com", "16/08/2013"],
    ["Customer Email Funnel", "nathan.roberts@example.com", "12/06/2020"],
  ];

  const [selected, setSelected] = useState("enabled");

  const handleSelectChange = useCallback((value) => setSelected(value), []);
  const [reportselected, setreportSelected] = useState("today");

  const handleChange = useCallback((value) => setreportSelected(value), []);

  const options = [
    { label: "All", value: "All" },
    { label: "Thank you page", value: "Thank you page" },
    { label: "Funnels", value: "Funnels" },
  ];

  const Pageoptions = [
    {
      label: "1",
      value: "1",
      suffix: <Icon source={ChevronDownMinor} />,
    },
    {
      label: "2",
      value: "2",
      suffix: <Icon source={ChevronDownMinor} />,
    },
    {
      label: "3",
      value: "3",
      suffix: <Icon source={ChevronDownMinor} />,
    },
    {
      label: "4",
      value: "4",
      suffix: <Icon source={ChevronDownMinor} />,
    },
  ];

  return (
    <>
      {
        <div className="main_list_page">
          <HorizontalStack align="space-between">
            <div className="d-flex align-items-center">
              <div
                className="back_btn"
                onClick={() => {
                  setDashboard("dashboard");
                }}
              >
                <Icon source={MobileBackArrowMajor} color="base" />
              </div>
              <Text variant="headingXl" fontWeight="semibold" as="h4">
                Customers birthday information
              </Text>
            </div>
            <div className="head_row birthday_page">
              <HorizontalStack gap="4">
                {birthdayData.length > 0 && (
                  <>
                    <TextField
                      value={textFieldValue}
                      onChange={handleTextFieldChange}
                      clearButton
                      prefix={<Icon source={SearchMajor} color="base" />}
                      onClearButtonClick={handleClearButtonClick}
                      suffix={
                        <Tooltip content="Type at least 3 characters">
                          <Text fontWeight="bold" as="span">
                            <Icon source={InfoMinor} color="base" />
                          </Text>
                        </Tooltip>
                      }
                    />
                    <Button>
                      <HorizontalStack>
                        Export
                        <Icon source={ExportMinor} color="base" />
                      </HorizontalStack>
                    </Button>
                  </>
                )}
              </HorizontalStack>
            </div>
          </HorizontalStack>
          <div className="liststable_main">
            {birthdayData.length > 0 && (
              <div className="table">
                <DataTable
                  columnContentTypes={["text", "text", "text"]}
                  headings={["Customer name", "Email", "Date of birth"]}
                  rows={birthdayData}
                  footerContent={
                    <>
                      <HorizontalStack gap="4" align="space-between">
                        <HorizontalStack gap="4">
                          <Select
                            options={Pageoptions}
                            onChange={handleSelectChange}
                            value={selected}
                          />
                          Showing {birthdayData.length} of {birthdayData.length}{" "}
                          results
                        </HorizontalStack>
                        {/* <PaginationCustom /> */}
                      </HorizontalStack>
                    </>
                  }
                />
              </div>
            )}
            {birthdayData.length <= 0 && (
              <div className="nodata_wrapper">
                <VerticalStack align="center" gap="5">
                  <img src="/assets/images/blanktable.svg" alt="blank" />
                  <Text variant="headingSm" as="p">
                    Table is blank
                  </Text>
                </VerticalStack>
              </div>
            )}
          </div>
        </div>
      }
    </>
  );
}
