import {
  Banner,
  Button,
  HorizontalStack,
  Icon,
  RangeSlider,
  Text,
  TextField,
} from "@shopify/polaris";
import {
  DuplicateMinor,
  EditMinor,
  MobileBackArrowMajor,
} from "@shopify/polaris-icons";
import React, { useCallback, useEffect, useState } from "react";
import ChartSetting from "./ChartSetting";
import ReferralStoreTable from "./ReferralStoreTable";
import PaymentHistoryTable from "./PaymentHistoryTable";

export default function ReferralSettings({ setSetting }) {
  const [value, setValue] = useState(
    "https://www.stilyoapps.com/reconvert/v1/?scid=VtFFnMOi&ref=ST01-ZHz5PQRgCF35zM1"
  );

  const [email, setEmailValue] = useState("bernadette.lapresse@jadedpixel.com");

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  const handleEmailChange = useCallback(
    (newValue) => setEmailValue(newValue),
    []
  );
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(50);
  }, []);

  return (
    <>
      <div className="main_list_page">
        <div className="d-flex align-items-center">
          <div
            className="back_btn"
            onClick={() => {
              setSetting("general");
            }}
          >
            <Icon source={MobileBackArrowMajor} color="base" />
          </div>
          <Text variant="headingXl" fontWeight="semibold" as="h4">
            Referral Program Settings
          </Text>
        </div>
        <div>
          <div className="mt-4">
            <Banner title="Referral Program" status="info">
              <p>
                This is where you can share ReConvert with other friendly stores
                and earn some money in the process. You'll get 10% commission
                for life on whatever the stores referred by you will pay.{" "}
              </p>
            </Banner>
            <div className="my-4">
              <div className="progress_box">
                <Text variant="headingMd" fontWeight="semibold" as="h5">
                  Affiliate link
                </Text>
                <HorizontalStack align="space-between">
                  <Text variant="headingSm" as="p">
                    You get 10% commission
                  </Text>
                  <Text variant="headingSm" as="p">
                    You get 10% commission
                  </Text>
                </HorizontalStack>

                {/* progress bar */}
                <div className="progressbar_main_wrap">
                  <RangeSlider value={progress} />
                </div>
                <div className="assets_wrap">
                  <HorizontalStack gap="2">
                    <TextField
                      value={value}
                      handleChange={handleChange}
                      autoComplete="off"
                    />
                    <Button>
                      <Icon source={EditMinor} color="base" />
                    </Button>
                    <Button>
                      <Icon source={DuplicateMinor} color="base" />
                    </Button>
                  </HorizontalStack>
                  <Text fontWeight="regular" variant="headingSm" as="p">
                    Your affiliate commission payout is 10% of whatever the
                    store registered through the above link spends on a paid
                    plan for ReConvert. Minimum payable amount - $50 (but not
                    earlier than 2 weeks from the original charge).
                  </Text>
                </div>
                <div className="border my-4"></div>
                <div className="setup_paypal_wrap">
                  <div className="mb-1">
                    <Text variant="headingSm" fontWeight="semibold" as="h5">
                      PayPal email setup
                    </Text>
                  </div>
                  <HorizontalStack align="space-between">
                    <TextField
                      type="email"
                      placeholder="Please enter your PayPal email address here."
                      handleChange={handleEmailChange}
                      value={email}
                    />
                    <Button primary>Save</Button>
                  </HorizontalStack>
                </div>
                <div className="border my-4"></div>
                <ChartSetting />
                <div className="border my-4"></div>
                <ReferralStoreTable />
                <div className="border my-4"></div>
                <PaymentHistoryTable />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Text variant="headingXl" fontWeight="semibold" as="h4">
        Referral Program Settings
      </Text>

      <div>
        <Banner title="Referral Program" status="info">
          <p>
            This is where you can share ReConvert with other friendly stores and
            earn some money in the process. You'll get 10% commission for life
            on whatever the stores referred by you will pay.
          </p>
        </Banner>
      </div>
    </>
  );
}
