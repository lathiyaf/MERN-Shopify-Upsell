import React, { useState } from "react";
import GeneralSettings from "./GeneralSettings";
import ReferralSettings from "./ReferralSettings";
// import ReportSettings from './ReportSettings';
import ActivityListing from "../Dashboard/Components/main/ActivityListing";

export default function SettingsTabs({
  activeSettingToggle,
  setSettingActive,
}) {
  const [openLatestActivityListing, setLatestActivity] = useState(false);

  return (
    <>
      <div>
        <div className="dashboard_content">
          {activeSettingToggle != "general" &&
            activeSettingToggle != "referral" &&
            activeSettingToggle != "report" && (
              <GeneralSettings
                activeSettingToggle={activeSettingToggle}
                setSetting={setSettingActive}
              />
            )}
          {activeSettingToggle == "general" && (
            // activeSettingToggle != 'referral' && activeSettingToggle != 'report' &&
            <GeneralSettings
              activeSettingToggle={activeSettingToggle}
              setSetting={setSettingActive}
            />
          )}
          {activeSettingToggle == "referral" && (
            <ReferralSettings
              activeSettingToggle={activeSettingToggle}
              setSetting={setSettingActive}
            />
          )}
          {activeSettingToggle == "report" && !openLatestActivityListing && (
            <ActivityListing setLatestActivity={setLatestActivity} />
          )}
        </div>
      </div>
    </>
  );
}
