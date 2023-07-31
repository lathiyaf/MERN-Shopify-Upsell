import {
  Page,
  Layout,
  Button,
  Popover,
  ActionList,
  HorizontalStack,
} from "@shopify/polaris";

import { useState, useCallback } from "react";
import DashboardTabs from "../components/Dashboard/DashboardTabs";
import FunnelsTabs from "../components/Funnels/FunnelsTabs";
import ThankyouTabs from "../components/Thankyou/ThankyouTabs";
import SettingsTabs from "../components/Settings/SettingsTabs";

export default function HomePage(props) {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelected(selectedTabIndex);
  }, []);
  const [activeToggle, setActive] = useState(false);

  const toggleActive = useCallback(() => {
    setActive((activeToggle) => !activeToggle);
  });

  const [activeDashboard, setDashboard] = useState("dashboard");

  const activator = (
    <Button onClick={toggleActive} disclosure>
      Thank you page
    </Button>
  );

  const [activeSettingToggle, setSettingToggle] = useState(false);
  const [settingActive, setSettingActive] = useState("general");

  const toggleSettingActive = useCallback(() => {
    setSettingToggle((activeSettingToggle) => !activeSettingToggle);
  });

  const activeSetting = (
    <Button onClick={toggleSettingActive} disclosure>
      Settings
    </Button>
  );

  const tabsList = [
    {
      id: "dashboard",
      tabName: "Dashboard",
      panelID: 0,
    },
    {
      id: "Funnels",
      tabName: "Funnels",
      panelID: 1,
    },
    {
      id: "thankyouPage",
      tabName: (
        <Popover
          active={activeToggle}
          activator={activator}
          autofocusTarget="first-node"
          onClose={toggleActive}
        >
          <div className="inner_dropdown">
            <ActionList
              actionRole="menuitem"
              items={[
                {
                  content: "Dashboard",
                  onAction: () => setDashboard("dashboard"),
                },
                {
                  content: "Birthdays",
                  onAction: () => setDashboard("birthday"),
                },
                {
                  content: "Product comments",
                  onAction: () => setDashboard("comments"),
                },
                {
                  content: "Post purchase surveys",
                  onAction: () => setDashboard("purchase"),
                },
              ]}
            />
          </div>
        </Popover>
      ),
      panelID: 2,
    },
    {
      id: "Checkoutbeta",
      tabName: (
        <>
          <HorizontalStack gap="1">
            <img src="/assets/images/shopify-plus-icon.svg" alt="" />
            Checkout(beta)
          </HorizontalStack>
        </>
      ),
      panelID: 3,
    },
    {
      id: "Settings",
      tabName: (
        <Popover
          active={activeSettingToggle}
          activator={activeSetting}
          autofocusTarget="first-node"
          onClose={toggleSettingActive}
        >
          <div className="inner_dropdown">
            <ActionList
              actionRole="menuitem"
              items={[
                {
                  content: "General settings",
                  onAction: () => setSettingActive("general"),
                },
                {
                  content: "Referral program",
                  onAction: () => setSettingActive("referral"),
                },
                {
                  content: "Activity report",
                  onAction: () => setSettingActive("report"),
                },
              ]}
            />
          </div>
        </Popover>
      ),
      panelID: 4,
    },
    {
      id: "designStore",
      tabName: "Design store",
      panelID: 5,
    },
  ];

  return (
    <>
      <Page fullWidth>
        <Layout>
          <div className="dashboard">
            <div className="tabs_row">
              <div className="Polaris-Tabs__Wrapper">
                <ul className="Polaris-Tabs">
                  {tabsList.map((tabName, id) => (
                    <li
                      className="Polaris-Tabs__TabContainer"
                      key={id}
                      onClick={() => handleTabChange(id)}
                    >
                      <a
                        type="button"
                        className={
                          "Polaris-Tabs__Tab " +
                          (selected === id ? "Polaris-Tabs__Tab--active" : "")
                        }
                      >
                        <span className="">{tabName.tabName}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <Button primary>Help & Pricing</Button>
            </div>
            <div className="tabs_wrapper">
              {selected === 0 ? (
                <DashboardTabs />
              ) : selected === 1 ? (
                <FunnelsTabs />
              ) : selected === 2 ? (
                <ThankyouTabs
                  activeDashboard={activeDashboard}
                  setDashboard={setDashboard}
                />
              ) : selected === 3 ? (
                <p>checkout</p>
              ) : selected === 4 ? (
                <SettingsTabs
                  activeSettingToggle={settingActive}
                  setSettingActive={setSettingActive}
                />
              ) : selected === 5 ? (
                <p>designstore</p>
              ) : null}
            </div>
          </div>
        </Layout>
      </Page>
    </>
  );
}
