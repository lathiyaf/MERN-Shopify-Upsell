import {
  Button,
  DataTable,
  HorizontalStack,
  Icon,
  Link,
  Modal,
  Select,
  Text,
  TextContainer,
  TextField,
  Tooltip,
  VerticalStack,
} from "@shopify/polaris";
import {
  ChevronDownMinor,
  DeleteMinor,
  HideMinor,
  ImportMinor,
  InfoMinor,
  MobileBackArrowMajor,
  NoteMinor,
  SearchMajor,
  ViewMinor,
} from "@shopify/polaris-icons";
import { useCallback, useState } from "react";
import React from "react";
import PaginationCustom from "../Common/PaginationCustom";

export default function PurchaseSurvays({ setDashboard }) {
  const handleClearButtonClick = useCallback(() => setTextFieldValue(""), []);
  const [textFieldValue, setTextFieldValue] = useState("Search");

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    []
  );

  const [active, setActive] = useState(false);
  const handleOpen = useCallback(() => setActive(true), []);

  const handleClose = useCallback(() => {
    setActive(false);
  }, []);

  const [enableActive, setEnableDisable] = useState(true);

  const commentsData = [
    [
      "Theresa Webb",
      <div className="survay_action">
        <HorizontalStack gap="4" align="end">
          <Link
            onClick={() => {
              setEnableDisable(!enableActive);
            }}
          >
            {enableActive && <Icon source={ViewMinor} color="base" />}
            {!enableActive && <Icon source={HideMinor} color="base" />}
          </Link>
          <Link>
            <Icon source={NoteMinor} color="base" />
          </Link>
          <Link onClick={handleOpen}>
            <Icon source={DeleteMinor} color="base" />
          </Link>
          <Link>
            <Icon source={ImportMinor} color="base" />
          </Link>
        </HorizontalStack>
      </div>,
    ],
  ];

  const [selected, setSelected] = useState("enabled");

  const handleSelectChange = useCallback((value) => setSelected(value), []);

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
              Survey builder
            </Text>
          </div>
          <div className="head_row birthday_page">
            <HorizontalStack gap="4">
              {commentsData.length > 0 && (
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
                  <Button primary>Create a new survey</Button>
                </>
              )}
            </HorizontalStack>
          </div>
        </HorizontalStack>
        <div className="liststable_main">
          {commentsData.length > 0 && (
            <div className="table survay_table">
              <DataTable
                columnContentTypes={["number", "text"]}
                headings={["Name", "Action"]}
                rows={commentsData}
                footerContent={
                  <>
                    <HorizontalStack gap="4" align="space-between">
                      <HorizontalStack gap="4">
                        <Select
                          options={Pageoptions}
                          onChange={handleSelectChange}
                          value={selected}
                        />
                        Showing {commentsData.length} of {commentsData.length}{" "}
                        results
                      </HorizontalStack>
                      {/* <PaginationCustom /> */}
                    </HorizontalStack>
                  </>
                }
              />
            </div>
          )}
          {commentsData.length <= 0 && (
            <div className="nodata_wrapper">
              <VerticalStack align="center" gap="5">
                <img src="/assets/images/blanktable.svg" alt="blank" />
                <Text variant="headingSm" as="p">
                  Table is blank. Click the <b>“Create a new survey”</b> button
                  to start populating it with information.
                </Text>
                <Button primary>Create a new survey</Button>
              </VerticalStack>
            </div>
          )}
        </div>
      </div>
      <Modal
        instant
        open={active}
        onClose={handleClose}
        title="Delete post purchase survey?"
        primaryAction={{
          content: "Delete post purchase survey",
          onAction: handleClose,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleClose,
          },
        ]}
      >
        <Modal.Section>
          <p>
            Are you sure you want to delete the post purchase survey? This
            action cannot be reversed.
          </p>
        </Modal.Section>
      </Modal>
    </>
  );
}
