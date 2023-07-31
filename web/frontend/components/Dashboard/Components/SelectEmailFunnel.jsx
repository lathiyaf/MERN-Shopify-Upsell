import React, { useState, useEffect } from "react";
import {
  Listbox,
  TextField,
  Icon,
  Popover,
  AutoSelection,
  Scrollable,
  EmptySearchResult,
  Button,
} from "@shopify/polaris";
import { SearchMinor, SelectMinor } from "@shopify/polaris-icons";
import moment from "moment-timezone";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { EditFunnel } from "../../../service/FunnelService";

const actionValue = "__ACTION__";
const interval = 25;

export default function SelectFunnel({ funnelData, getAllFunnels }) {
  const [segments, setSegment] = useState([]);
  const [activeOptionId, setActiveOptionId] = useState(segments[0]?.id);

  useEffect(() => {
    if (funnelData.length > 0) {
      let arr = [];
      funnelData.map((funnel, i) => {
        let obj = {
          label: funnel.funnel_title,
          id: i + 1,
          value: i.toString(),
          updated_at: funnel.updated_at,
          funnel_id: funnel.funnel_id,
        };
        if (funnel.is_default === true) {
          setActiveOptionId(obj.id);
          setSelectedSegmentIndex(obj.value);
        }
        arr.push(obj);
      });
      setSegment(arr);
    }
  }, [funnelData]);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [showFooterAction, setShowFooterAction] = useState(true);
  const [query, setQuery] = useState("");
  const [lazyLoading, setLazyLoading] = useState(false);
  const [willLoadMoreResults, setWillLoadMoreResults] = useState(true);
  const [visibleOptionIndex, setVisibleOptionIndex] = useState(6);
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
  const [filteredSegments, setFilteredSegments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowAll = () => {
    setShowFooterAction(false);
    setVisibleOptionIndex(interval);
  };

  const handleFilterSegments = (query) => {
    const nextFilteredSegments = segments.filter((segment) => {
      return segment.label
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase().trim());
    });

    setFilteredSegments(nextFilteredSegments);
  };

  const handleQueryChange = (query) => {
    setQuery(query);

    if (query.length >= 2) handleFilterSegments(query);
  };

  const handleQueryClear = () => {
    handleQueryChange("");
  };

  const handleOpenPicker = () => {
    setPickerOpen(true);
  };

  const handleClosePicker = () => {
    setPickerOpen(false);
    handleQueryChange("");
  };

  const handleSegmentSelect = (segmentIndex) => {
    if (segmentIndex === actionValue) {
      return handleClickShowAll();
    }

    setSelectedSegmentIndex(segmentIndex);
    handleClosePicker();
  };

  const handleActiveOptionChange = (domIdg) => {
    setActiveOptionId(domIdg);
  };

  /* This is just to illustrate lazy loading state vs loading state. This is an example, so we aren't fetching from GraphQL. You'd use `pageInfo.hasNextPage` from your GraphQL query data instead of this fake "willLoadMoreResults" state along with setting `first` your GraphQL query's variables to your app's default max edges limit (e.g., 250). */

  const handleLazyLoadSegments = () => {
    if (willLoadMoreResults && !showFooterAction) {
      setLazyLoading(true);

      const options = query ? filteredSegments : segments;

      setTimeout(() => {
        const remainingOptionCount = options.length - visibleOptionIndex;
        const nextVisibleOptionIndex =
          remainingOptionCount >= interval
            ? visibleOptionIndex + interval
            : visibleOptionIndex + remainingOptionCount;

        setLazyLoading(false);
        setVisibleOptionIndex(nextVisibleOptionIndex);

        if (remainingOptionCount <= interval) {
          setWillLoadMoreResults(false);
        }
      }, 1000);
    }
  };

  const listboxId = "SearchableListboxInPopover";

  /* Your app's feature/context specific activator here */
  const activator = (
    <TextField
      label={
        <div>
          <span>Select default funnel</span>
          <span className="text-info">
            Last saved on{" "}
            {moment(segments[selectedSegmentIndex]?.updated_at).format(
              "ddd DD, HH:mm a"
            )}
          </span>
        </div>
      }
      placeholder="Customer Email Funnel"
      value={segments[selectedSegmentIndex]?.label}
      suffix={<Icon source={SelectMinor} />}
      onFocus={handleOpenPicker}
    />
  );

  const textFieldMarkup = (
    <div style={{ padding: "12px" }}>
      <StopPropagation>
        <TextField
          focused={showFooterAction}
          placeholder="Customer Email Funnel"
          value={query}
          prefix={<Icon source={SearchMinor} />}
          ariaActiveDescendant={activeOptionId}
          ariaControls={listboxId}
          onChange={handleQueryChange}
          onClearButtonClick={handleQueryClear}
        />
      </StopPropagation>
    </div>
  );

  const segmentOptions = query ? filteredSegments : segments;

  const segmentList =
    segmentOptions.length > 0
      ? segmentOptions
          .slice(0, visibleOptionIndex)
          .map(({ label, id, value }) => {
            const selected = segments[selectedSegmentIndex].id === id;

            return (
              <Listbox.Option key={id} value={value} selected={selected}>
                <Listbox.TextOption selected={selected}>
                  {label}
                </Listbox.TextOption>
              </Listbox.Option>
            );
          })
      : null;

  const lazyLoadingMarkup = lazyLoading ? (
    <Listbox.Loading
      accessibilityLabel={`${
        query ? "Filtering" : "Loading"
      } customer segments`}
    />
  ) : null;

  const noResultsMarkup =
    segmentOptions.length === 0 ? (
      <EmptySearchResult
        title=""
        description={`No segments found matching "${query}"`}
      />
    ) : null;

  const showAllMarkup = showFooterAction ? (
    <Listbox.Action value={actionValue}>
      <span style={{ color: "var(--p-color-text-interactive)" }}>
        Show all 111 segments
      </span>
    </Listbox.Action>
  ) : null;

  const listboxMarkup = (
    <Listbox
      enableKeyboardControl
      autoSelection={AutoSelection.FirstSelected}
      accessibilityLabel="Search for and select a customer segment"
      customListId={listboxId}
      onSelect={handleSegmentSelect}
      onActiveOptionChange={handleActiveOptionChange}
    >
      {segmentList}
      {showAllMarkup}
      {noResultsMarkup}
      {lazyLoadingMarkup}
    </Listbox>
  );

  const app = useAppBridge();

  const handleSubmit = async () => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/funnel?funnel_id=${segments[activeOptionId].funnel_id}`;
    const data = {
      is_default: true,
    };

    await EditFunnel(url, token, data)
      .then((res) => {
        setIsLoading(false);
        getAllFunnels();
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div>
        <Popover
          active={pickerOpen}
          activator={activator}
          ariaHaspopup="listbox"
          preferredAlignment="left"
          onClose={handleClosePicker}
        >
          <Popover.Pane fixed>
            <div
              style={{
                alignItems: "stretch",
                borderTop: "1px solid #DFE3E8",
                display: "flex",
                flexDirection: "column",
                justifyContent: "stretch",
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            >
              {textFieldMarkup}

              <Scrollable
                shadow
                style={{
                  position: "relative",
                  width: "310px",
                  height: "292px",
                  padding: "var(--p-space-2) 0",
                  borderBottomLeftRadius: "var(--p-border-radius-2)",
                  borderBottomRightRadius: "var(--p-border-radius-2)",
                }}
                onScrolledToBottom={handleLazyLoadSegments}
              >
                {listboxMarkup}
              </Scrollable>
            </div>
          </Popover.Pane>
        </Popover>
      </div>
      <Button primary onClick={handleSubmit} loading={isLoading}>
        Edit
      </Button>
    </>
  );
}

const StopPropagation = ({ children }) => {
  const stopEventPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <div onClick={stopEventPropagation} onTouchStart={stopEventPropagation}>
      {children}
    </div>
  );
};
