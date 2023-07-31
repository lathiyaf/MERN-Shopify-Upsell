import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import {
  ActionList,
  Badge,
  Button,
  HorizontalStack,
  Icon,
  LegacyStack,
  Link,
  Modal,
  Popover,
  TextField,
} from "@shopify/polaris";
import { EditMinor } from "@shopify/polaris-icons";
import React, { useCallback, useState } from "react";
import {
  AddTyPage,
  DeleteTyPage,
  EditTyPage,
} from "../../../service/TyPageService";

const TopTyRow = (
  item,
  i,
  getAllTyPages,
  setActivePage,
  activePage,
  pageDataCount,
  totalCount
) => {
  return [
    <>{item.name}</>,
    <span>
      {item.is_default ? (
        <Badge>Default</Badge>
      ) : (
        <>
          {item.status === 1 && <Badge status="success">Live</Badge>}
          {item.status === 0 && <Badge status="attention"> Draft</Badge>}
        </>
      )}
    </span>,
    <span>{item.total_impression}</span>,
    <span>{item.accepted_offers}</span>,
    <span>{0}%</span>,
    <span>{0}</span>,
    <FunnelExpand />,
    <span className="action_btn d-flex align-items-center">
      <FunnelAction
        item={item}
        getAllTyPages={getAllTyPages}
        setActivePage={setActivePage}
        activePage={activePage}
        pageDataCount={pageDataCount}
        totalCount={totalCount}
      />
    </span>,
  ];
};

export const FunnelExpand = () => {
  const funnelsNameList = [
    "Text Funnel",
    "Conversion monster",
    "Funnel name 2",
  ];
  const [expanded, setExpanded] = useState(false);
  const num = funnelsNameList.length - 1;

  return (
    <div className={`align-items-center ${expanded ? "show_block" : "d-flex"}`}>
      {funnelsNameList.slice(0, 1).map((funnelsName, i) => (
        <span className="edit_more_btn" key={i}>
          <HorizontalStack align="center">
            {" "}
            {funnelsName} <Icon source={EditMinor} color="base" />
          </HorizontalStack>
        </span>
      ))}

      {funnelsNameList.slice(1).map((funnelsName, i) => {
        return (
          expanded && (
            <span className="edit_more_btn" key={i}>
              <HorizontalStack align="center">
                {" "}
                {funnelsName} <Icon source={EditMinor} color="base" />
              </HorizontalStack>
            </span>
          )
        );
      })}
      <div className="showMore">
        <Button
          plain
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          {expanded ? "Show less" : "+" + num + " more"}
        </Button>
      </div>
    </div>
  );
};

export const FunnelAction = ({
  item,
  getAllTyPages,
  setActivePage,
  activePage,
  pageDataCount,
  totalCount,
}) => {
  const [active, setActive] = useState(false);
  const app = useAppBridge();
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = useCallback(() => setModalOpen((active) => !active), []);
  const [value, setValue] = useState(item?.name);

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  const handleDuplicateAction = useCallback(() => duplicateFunnelAPI(), []);

  const duplicateFunnelAPI = async () => {
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/thankyou`;
    const data = {
      is_duplicate: true,
      funnel_id: item.funnel_id,
      name: item.name,
      section_data: item.section_data,
    };

    await AddTyPage(url, token, data)
      .then((res) => {
        setActivePage(1);
        getAllTyPages();
        setActive(false);
      })
      .catch((err) => {});
  };

  const handleRenameAction = useCallback(() => {
    toggleModal();
  }, []);

  const renameTyPageAPI = async () => {
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/thankyou?template_id=${item.template_id}`;
    const data = {
      name: value,
    };

    await EditTyPage(url, token, data)
      .then((res) => {
        getAllTyPages();
        toggleModal();
      })
      .catch((err) => {});
  };

  const handleDefaultAction = useCallback(() => {
    defaultTyPageAPI();
  }, []);

  const defaultTyPageAPI = async () => {
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/thankyou?template_id=${item.template_id}`;
    const data = {
      is_default: true,
    };

    await EditTyPage(url, token, data)
      .then((res) => {
        getAllTyPages();
        setActive(false);
      })
      .catch((err) => {});
  };

  const handleDeleteAction = useCallback(() => {
    deleteTyPageAPI();
  }, []);

  const deleteTyPageAPI = async () => {
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/thankyou?template_id=${item.template_id}`;

    await DeleteTyPage(url, token)
      .then((res) => {
        if (totalCount % pageDataCount === 1) {
          activePage = activePage - 1;
          setActivePage(activePage);
        }
        getAllTyPages();
        setActive(false);
      })
      .catch((err) => {});
  };

  const handlePreviewAction = useCallback(() => {
    console.log("Preview action");
  }, []);

  const handleAnalyticsAction = useCallback(() => {
    console.log("Analytics action");
  }, []);

  const itemsAction = item.is_default
    ? [
        {
          content: "Rename",
          onAction: handleRenameAction,
        },
        {
          content: "Duplicate",
          onAction: handleDuplicateAction,
        },
        {
          content: "Analytics",
          onAction: handleAnalyticsAction,
        },
      ]
    : [
        {
          content: "Preview",
          onAction: handlePreviewAction,
        },
        {
          content: "Make Default",
          onAction: handleDefaultAction,
        },
        {
          content: "Rename",
          onAction: handleRenameAction,
        },
        {
          content: "Duplicate",
          onAction: handleDuplicateAction,
        },
        {
          content: "Delete",
          onAction: handleDeleteAction,
        },
        {
          content: "Analytics",
          onAction: handleAnalyticsAction,
        },
      ];

  const activator = (
    <Button onClick={toggleActive} disclosure>
      Actions
    </Button>
  );

  return (
    <>
      {modalOpen && (
        <Modal
          small
          open={modalOpen}
          onClose={toggleModal}
          title="Rename template"
          primaryAction={{
            content: "Rename",
            onAction: renameTyPageAPI,
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: toggleModal,
            },
          ]}
        >
          <Modal.Section>
            <LegacyStack vertical>
              <LegacyStack.Item>
                <TextField
                  label="Provide a new name for this template"
                  value={value}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </LegacyStack.Item>
            </LegacyStack>
          </Modal.Section>
        </Modal>
      )}
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList actionRole="menuitem" items={itemsAction} />
      </Popover>
      <Link>Customize</Link>
    </>
  );
};

export default TopTyRow;
