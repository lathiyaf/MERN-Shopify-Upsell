import {
  Badge,
  Button,
  Checkbox,
  Form,
  FormLayout,
  Grid,
  HorizontalStack,
  Select,
  Text,
  VerticalStack,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import HelpvideoModal from "../Dashboard/Components/ModalVideo";

export default function GeneralSettings() {
  const handleSubmit = useCallback(() => {
    setEmail("");
    setNewsletter(false);
  }, []);
  const [newsletter, setNewsletter] = useState(false);
  const handleNewsLetterChange = useCallback(
    (value) => setNewsletter(value),
    []
  );

  const [selected, setSelected] = useState("English");

  const handleLangaugeChange = useCallback((value) => setSelected(value), []);

  const [selectedService, setServiceSelected] = useState(
    "Select more integration option"
  );
  const handleServiceChange = useCallback(
    (value) => setServiceSelected(value),
    []
  );

  const LangaugeOptions = [
    { label: "English", value: "English" },
    { label: "Hindi", value: "Hindi" },
    { label: "German", value: "German" },
    { label: "Italian", value: "Italian" },
    { label: "French", value: "French" },
  ];

  const thirdPartyServiceList = [
    {
      label: "Select more integration option",
      value: "Select more integration option",
    },
    { label: "SMS Notification", value: "SMS Notification" },
  ];

  const [selectedReview, setReviewSelected] = useState("today");

  const handleReviewChange = useCallback(
    (value) => setReviewSelected(value),
    []
  );

  const reviewAppList = [
    { label: "Select review app", value: "reviewApp" },
    { label: "Select review app 2", value: "reviewApp2" },
  ];

  const [selectedLocation, setLocationSelected] = useState(
    "At least at one location"
  );

  const handleLocationChange = useCallback(
    (value) => setLocationSelected(value),
    []
  );
  const locationList = [
    { label: "At least at one location", value: "At least at one location" },
    { label: "Location", value: "Location" },
  ];

  return (
    <>
      {
        <div>
          <div className="head mb-4">
            <Text variant="headingXl" as="h4" fontWeight="700">
              General Settings
            </Text>
          </div>
          <div className="main_wrap_row">
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 5, xl: 5 }}>
                <Text variant="headingMd" as="h6">
                  Application status
                </Text>
                <Text variant="headingsm" as="p">
                  Enable or disable the app.
                </Text>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 7, xl: 7 }}>
                <div className="bg_box">
                  <HorizontalStack align="space-between">
                    <Text variant="headingMd" as="h5">
                      App is now <b>enabled</b>.
                    </Text>
                    <Button destructive>Disable ReConvert</Button>
                  </HorizontalStack>
                </div>
              </Grid.Cell>
            </Grid>
          </div>
          <div className="border my-4"></div>
          <div className="main_wrap_row">
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 5, xl: 5 }}>
                <Text variant="headingMd" as="h6">
                  Application statusSet ReConvert as your post purchase app
                </Text>
                <Text variant="headingsm" as="p">
                  Make sure ReConvert is your post purchase app, so customers
                  can see your full funnel.
                </Text>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 7, xl: 7 }}>
                <div className="bg_box">
                  <HorizontalStack gap="2">
                    <Text variant="headingSm" as="h5">
                      Post purchase app:
                    </Text>
                    <Badge progress="Complete" status="success">
                      ReConvert
                    </Badge>
                  </HorizontalStack>
                  <Text variant="headingsm" as="p">
                    ReConvert in configured as your post purchase page app on
                    Shopify, everything should work as expected.
                  </Text>
                </div>
              </Grid.Cell>
            </Grid>
          </div>
          <div className="border my-4"></div>
          <div className="main_wrap_row">
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 5, xl: 5 }}>
                <VerticalStack align="center">
                  <Text variant="headingMd" as="h6">
                    Language
                  </Text>
                  <Text variant="headingsm" as="p">
                    Set app admin language.
                  </Text>
                </VerticalStack>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 7, xl: 7 }}>
                <div className="bg_box">
                  <HorizontalStack gap="2">
                    <div className="w-100">
                      <Select
                        label="Select language"
                        options={LangaugeOptions}
                        onChange={handleLangaugeChange}
                        value={selected}
                      />
                    </div>
                  </HorizontalStack>
                </div>
              </Grid.Cell>
            </Grid>
          </div>
          <div className="main_wrap_row my-4">
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 5, xl: 5 }}>
                <VerticalStack align="center">
                  <Text variant="headingMd" as="h6">
                    Third party birthday integration
                  </Text>
                  <Text variant="headingsm" as="p">
                    In this section you can set up integrations with third party
                    services for the birthday collector widget, this will allow
                    you to set up automated birthday messages to your customers.
                  </Text>
                </VerticalStack>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 7, xl: 7 }}>
                <div className="bg_box">
                  <HorizontalStack gap="2">
                    <div className="w-100">
                      <Form onSubmit={handleSubmit}>
                        <FormLayout>
                          <Select
                            label="Select third party service"
                            options={thirdPartyServiceList}
                            onChange={handleServiceChange}
                            value={selectedService}
                          />
                          <Checkbox
                            label="Collect in the app"
                            checked={newsletter}
                            onChange={handleNewsLetterChange}
                          />
                          <div className="border"></div>
                          <HorizontalStack align="space-between">
                            <Button>Cancel</Button>
                            <Button submit primary>
                              Save
                            </Button>
                          </HorizontalStack>
                        </FormLayout>
                      </Form>
                    </div>
                  </HorizontalStack>
                </div>
              </Grid.Cell>
            </Grid>
          </div>
          <div className="main_wrap_row my-4">
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 5, xl: 5 }}>
                <VerticalStack align="center">
                  <Text variant="headingMd" as="h6">
                    Star reviews third party integration
                  </Text>
                  <Text variant="headingsm" as="p">
                    In this section, you can set an integration with product
                    reviews apps, to display star ratings on the product
                    recommendations and product upsell widgets.
                  </Text>
                </VerticalStack>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 7, xl: 7 }}>
                <div className="bg_box ">
                  <HorizontalStack gap="2">
                    <div className="w-100">
                      <Form onSubmit={handleSubmit}>
                        <FormLayout>
                          <HorizontalStack align="end">
                            <div className="d-flex align-items-end justify-content-between w-100 video_bg">
                              <div className="w-100">
                                <Select
                                  label="Select third party review app"
                                  options={reviewAppList}
                                  onChange={handleReviewChange}
                                  value={selectedReview}
                                />
                              </div>
                              <HelpvideoModal />
                            </div>
                          </HorizontalStack>
                          <div className="border"></div>
                          <div className="footer_btn">
                            <HorizontalStack align="space-between">
                              <Button>Cancel</Button>
                              <Button submit primary>
                                Save
                              </Button>
                            </HorizontalStack>
                          </div>
                        </FormLayout>
                      </Form>
                    </div>
                  </HorizontalStack>
                </div>
              </Grid.Cell>
            </Grid>
          </div>
          <div className="main_wrap_row my-4">
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 5, xl: 5 }}>
                <VerticalStack align="center">
                  <Text variant="headingMd" as="h6">
                    Multi-location inventory
                  </Text>
                  <Text variant="headingsm" as="p">
                    We can’t determine which location the order will be shipped
                    from until it gets fulfilled.
                  </Text>
                  <Text variant="headingsm" as="p">
                    This section will allow you to decide whether or not to
                    display offers with products that are out of stock in 1 or
                    more locations.
                  </Text>
                </VerticalStack>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 7, xl: 7 }}>
                <div className="bg_box ">
                  <HorizontalStack gap="2">
                    <div className="w-100">
                      <Form onSubmit={handleSubmit}>
                        <FormLayout>
                          <HorizontalStack align="end">
                            <div className="d-flex align-items-end justify-content-between w-100 video_bg">
                              <div className="w-100">
                                <Select
                                  label="Display offers with products that are available:"
                                  options={locationList}
                                  onChange={handleLocationChange}
                                  value={selectedLocation}
                                />
                              </div>
                              <HelpvideoModal />
                            </div>
                          </HorizontalStack>
                          <div className="border"></div>
                          <div className="footer_btn">
                            <HorizontalStack align="space-between">
                              <Button>Cancel</Button>
                              <Button submit primary>
                                Save
                              </Button>
                            </HorizontalStack>
                          </div>
                        </FormLayout>
                      </Form>
                    </div>
                  </HorizontalStack>
                </div>
              </Grid.Cell>
            </Grid>
          </div>
        </div>
      }
    </>
  );
}
