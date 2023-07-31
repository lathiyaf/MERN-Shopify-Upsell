import React, { useEffect, useState } from "react";
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
import { EditTyPage } from "../../../service/TyPageService";
import { getSessionToken } from "@shopify/app-bridge-utils";

const actionValue = "__ACTION__";
const interval = 25;

export default function SelectFunnel({ tyPageData, getAllTyPages }) {
  const [segments, setSegment] = useState([]);
  const [activeOptionId, setActiveOptionId] = useState(segments[0]?.id);
  const [pickerMonsterOpen, setPickerMonsterOpen] = useState(false);
  const [showFooterAction, setShowFooterAction] = useState(true);
  const [queryMonster, setQuery] = useState("");
  const [lazyLoading, setLazyLoading] = useState(false);
  const [willLoadMoreResults, setWillLoadMoreResults] = useState(true);
  const [visibleOptionIndex, setVisibleOptionIndex] = useState(6);
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
  const [filteredSegments, setFilteredSegments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (tyPageData.length > 0) {
      let arr = [];
      tyPageData.map((ty, i) => {
        let obj = {
          label: ty.name,
          id: i + 1,
          value: i.toString(),
          updated_at: ty.updated_at,
          template_id: ty.template_id,
        };
        if (ty.is_default === true) {
          setActiveOptionId(obj.id);
          setSelectedSegmentIndex(obj.value);
        }
        arr.push(obj);
      });
      setSegment(arr);
    }
  }, [tyPageData]);

  const handleClickShowAll = () => {
    setShowFooterAction(false);
    setVisibleOptionIndex(interval);
  };

  const handleFilterSegments = (queryMonster) => {
    const nextFilteredSegments = segments.filter((segment) => {
      return segment.label
        .toLocaleLowerCase()
        .includes(queryMonster.toLocaleLowerCase().trim());
    });

    setFilteredSegments(nextFilteredSegments);
  };

  const handleChange = (queryMonster) => {
    setQuery(queryMonster);

    if (queryMonster.length >= 2) handleFilterSegments(queryMonster);
  };

  const handleClear = () => {
    handleChange("");
  };

  const handleOpenPicker = () => {
    setPickerMonsterOpen(true);
  };

  const handleClosePicker = () => {
    setPickerMonsterOpen(false);
    handleChange("");
  };

  const handleSegmentSelect = (segmentIndex) => {
    if (segmentIndex === actionValue) {
      return handleClickShowAll();
    }

    setSelectedSegmentIndex(segmentIndex);
    handleClosePicker();
  };

  const handleActiveOptionChange = (domdg) => {
    setActiveOptionId(domdg);
  };

  const handleLazyLoadSegments = () => {
    if (willLoadMoreResults && !showFooterAction) {
      setLazyLoading(true);

      const options = queryMonster ? filteredSegments : segments;

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

  const listmonsterboxId = "SearchableListboxInPopover";

  const activatorMonster = (
    <div className="thankyou_dropdown">
      <TextField
        label={
          <div>
            <span>Select default thank you page</span>
            <span className="text-info">
              Last saved on{" "}
              {moment(segments[selectedSegmentIndex]?.updated_at).format(
                "ddd DD, HH:mm a"
              )}
            </span>
          </div>
        }
        placeholder="Conversion Monster Funnel"
        value={segments[selectedSegmentIndex]?.label}
        suffix={<Icon source={SelectMinor} />}
        onFocus={handleOpenPicker}
      />
    </div>
  );

  const textFieldMonster = (
    <div style={{ padding: "12px" }}>
      <StopPropagation>
        <TextField
          focused={showFooterAction}
          placeholder="Conversion Monster Funnel"
          value={queryMonster}
          prefix={<Icon source={SearchMinor} />}
          ariaActiveDescendant={activeOptionId}
          ariaControls={listmonsterboxId}
          onChange={handleChange}
          onClearButtonClick={handleClear}
        />
      </StopPropagation>
    </div>
  );

  const segmentMonsterOptions = queryMonster ? filteredSegments : segments;

  const segmentMonsterList =
    segmentMonsterOptions.length > 0
      ? segmentMonsterOptions
          .slice(0, visibleOptionIndex)
          .map(({ label, id, value }) => {
            const selected = segments[selectedSegmentIndex]?.id === id;

            return (
              <Listbox.Option key={id} value={value} selected={selected}>
                <Listbox.TextOption selected={selected}>
                  {label}
                </Listbox.TextOption>
              </Listbox.Option>
            );
          })
      : null;

  const showAllMonster = showFooterAction ? (
    <Listbox.Action value={actionValue}>
      <span style={{ color: "var(--p-color-text-interactive)" }}>
        Show all 111 segments
      </span>
    </Listbox.Action>
  ) : null;

  const lazyLoadingMarkup = lazyLoading ? (
    <Listbox.Loading
      accessibilityLabel={`${
        queryMonster ? "Filtering" : "Loading"
      } customer segments`}
    />
  ) : null;

  const noResultsMarkup =
    segmentMonsterOptions.length === 0 ? (
      <EmptySearchResult
        title=""
        description={`No segments found matching "${queryMonster}"`}
      />
    ) : null;

  const listboxMonsterMarkup = (
    <Listbox
      enableKeyboardControl
      autoSelection={AutoSelection.FirstSelected}
      accessibilityLabel="Search for and select a customer segment"
      customListId={listmonsterboxId}
      onSelect={handleSegmentSelect}
      onActiveOptionChange={handleActiveOptionChange}
    >
      {segmentMonsterList}
      {showAllMonster}
      {noResultsMarkup}
      {lazyLoadingMarkup}
    </Listbox>
  );

  const app = useAppBridge();

  const handleSubmit = async () => {
    setIsLoading(true);
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/thankyou?template_id=${segments[activeOptionId].template_id}`;
    const data = {
      is_default: true,
    };

    await EditTyPage(url, token, data)
      .then((res) => {
        setIsLoading(false);
        getAllTyPages();
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div>
        <Popover
          active={pickerMonsterOpen}
          activator={activatorMonster}
          ariaHaspopup="listbox"
          preferredAlignment="left"
          onClose={handleClosePicker}
        >
          <Popover.Pane>
            <div>
              {textFieldMonster}

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
                {listboxMonsterMarkup}
              </Scrollable>
            </div>
          </Popover.Pane>
        </Popover>
      </div>
      <Button primary onClick={handleSubmit} loading={isLoading}>
        Customize
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
