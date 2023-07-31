import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import {
  ActionList,
  Badge,
  Button,
  Checkbox,
  Icon,
  LegacyStack,
  Link,
  Popover,
  Tooltip,
  Modal,
  TextField,
} from "@shopify/polaris";
import { QuestionMarkMajor } from "@shopify/polaris-icons";
import React, { useCallback, useState } from "react";
import {
  AddFunnel,
  DeleteFunnel,
  EditFunnel,
} from "../../../service/FunnelService";

const TopFunnelRow = (
  item,
  i,
  getAllFunnels,
  setActivePage,
  activePage,
  pageDataCount,
  totalCount
) => {
  return [
    <span>{i + 1}</span>,
    <>{item.funnel_title}</>,
    <span>
      <Tooltip content={JSON.parse(item.conditions)[0].categores}>
        <Icon source={QuestionMarkMajor} color="base" />
      </Tooltip>
    </span>,
    <span>{item.total_impression}</span>,
    <span>{item.accepted_offers}</span>,
    <span>{0}%</span>,
    <span>{0}</span>,
    <span>
      {item.is_default ? (
        <Badge>Default</Badge>
      ) : (
        <span className="switch">
          <FunnelStatus
            status={item?.status}
            getAllFunnels={getAllFunnels}
            funnel_id={item?.funnel_id}
          />
        </span>
      )}
    </span>,
    <span className="action_btn d-flex align-items-center">
      <FunnelAction
        item={item}
        getAllFunnels={getAllFunnels}
        setActivePage={setActivePage}
        activePage={activePage}
        pageDataCount={pageDataCount}
        totalCount={totalCount}
      />
      <Link>Edit</Link>
    </span>,
  ];
};

export const FunnelStatus = ({ status, getAllFunnels, funnel_id }) => {
  const [checked, setChecked] = useState(status === 1 ? true : false);
  const app = useAppBridge();

  const editStatus = async () => {
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/funnel?funnel_id=${funnel_id}`;
    const data = {
      status: status === 1 ? 0 : 1,
    };

    await EditFunnel(url, token, data)
      .then((res) => {
        getAllFunnels();
      })
      .catch((err) => {});
  };

  return (
    <>
      <Checkbox
        checked={checked}
        onChange={() => {
          setChecked(!checked);
          editStatus();
        }}
      />
    </>
  );
};

export const FunnelAction = ({
  item,
  getAllFunnels,
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
  const [value, setValue] = useState(item?.funnel_title);

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  const duplicateFunnelAPI = async () => {
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/funnel`;
    const data = {
      is_duplicate: true,
      funnel_title: item.funnel_title,
      conditions: JSON.parse(item.conditions),
    };

    await AddFunnel(url, token, data)
      .then((res) => {
        setActivePage(1);
        getAllFunnels();
        setActive(false);
      })
      .catch((err) => {});
  };

  const handleDuplicateAction = useCallback(() => duplicateFunnelAPI(), []);

  const handleRenameAction = useCallback(() => {
    toggleModal();
  }, []);

  const handleDeleteAction = useCallback(() => {
    deleteFunnelAPI();
  }, []);

  const renameFunnelAPI = async () => {
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/funnel?funnel_id=${item.funnel_id}`;
    const data = {
      funnel_title: value,
    };

    await EditFunnel(url, token, data)
      .then((res) => {
        getAllFunnels();
        toggleModal();
      })
      .catch((err) => {});
  };

  const deleteFunnelAPI = async () => {
    const token = await getSessionToken(app);
    const url = `https://${window.location.host}/api/funnel?funnel_id=${item.funnel_id}`;

    await DeleteFunnel(url, token)
      .then((res) => {
        if (totalCount % pageDataCount === 1) {
          activePage = activePage - 1;
          setActivePage(activePage);
        }
        getAllFunnels();
        setActive(false);
      })
      .catch((err) => {});
  };

  const activator = (
    <Button onClick={toggleActive} disclosure>
      Actions
    </Button>
  );

  const itemsAction = item.is_default
    ? [
        {
          content: "Duplicate",
          onAction: handleDuplicateAction,
        },
        {
          content: "Rename",
          onAction: handleRenameAction,
        },
      ]
    : [
        {
          content: "Duplicate",
          onAction: handleDuplicateAction,
        },
        {
          content: "Rename",
          onAction: handleRenameAction,
        },
        {
          content: "Delete",
          onAction: handleDeleteAction,
        },
      ];

  return (
    <>
      {modalOpen && (
        <Modal
          small
          open={modalOpen}
          onClose={toggleModal}
          title="Rename funnel"
          primaryAction={{
            content: "Rename",
            onAction: renameFunnelAPI,
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
                  label="Provide a new name for this funnel"
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
    </>
  );
};

export default TopFunnelRow;
