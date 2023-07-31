import { Button, Modal, HorizontalStack, Icon, Text, List, TextField } from '@shopify/polaris';
import { CancelMajor, MobileBackArrowMajor, QuestionMarkMinor } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';

export default function ExploreFunnelSidebar() {
    
    const [active, setActive] = useState(false);


    const toggleExploreSidebar = useCallback(() => setActive((active) => !active), []);

    const toggleExploreclose = useCallback(() => setOpenfunnel((openFunnel) => !openFunnel) || setActive((active) => !active), []);

    const [openFunnel, setOpenfunnel] = useState(false);

    const activator = <Button onClick={toggleExploreSidebar} primary>Create a new funnels </Button>;


    const [textFieldValue, setTextFieldValue] = useState('30');

    const handleTextFieldChange = useCallback(
      (value) => setTextFieldValue(value),
      [],
    );
  
    return (
        <div className=''>
            <Modal
                activator={activator}
                open={active}
                onClose={toggleExploreSidebar}
            >
                <div className='sidebar'>
                    {
                        !openFunnel && (
                            <div>
                                <div className="modal_header">
                                    <HorizontalStack align='space-between'>
                                        <Text as='h5'>Explore free funnels</Text>
                                        <span onClick={toggleExploreSidebar}>
                                            <Icon
                                                source={CancelMajor}
                                                color="base"
                                            />
                                        </span>
                                    </HorizontalStack>
                                </div>
                                <div className="sidebar_body">
                                    <div className="funnel_img"
                                        onClick={() => {
                                            setOpenfunnel(!openFunnel);
                                        }}>
                                        <div className="priview_img">Preview Image</div>
                                        <p>Conversion monster funnel</p>
                                    </div>
                                    <div className="funnel_img"
                                        onClick={() => {
                                            setOpenfunnel(!openFunnel);
                                        }}>
                                        <div className="priview_img">Preview Image</div>
                                        <p>Conversion monster funnel</p>
                                    </div>
                                    <div className="funnel_img">
                                        <div className="priview_img">
                                            <a className='empty_temp'>
                                                <img src="/assets/images/addfile.svg" alt="add" />
                                            </a>
                                        </div>
                                        <p>Add Empty Funnel</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {/* open conversion Monster funnel */}
                    {
                        openFunnel && (
                            <div className='conversion_funnel'>

                                <div className="modal_header">
                                    <HorizontalStack align='space-between'>
                                        <span onClick={() => {
                                            setOpenfunnel(!openFunnel)
                                        }}>
                                            <Icon
                                                source={MobileBackArrowMajor}
                                                color="base"
                                            />
                                        </span>
                                        <Text as='h5'>Conversion monster funnel</Text>
                                        <span onClick={toggleExploreclose}>
                                            <Icon
                                                source={CancelMajor}
                                                color="base"
                                            />
                                        </span>
                                    </HorizontalStack>
                                </div>
                                <div className="sidebar_body">
                                    <div className="funnel_img">
                                        <div className="priview_img">Preview Image</div>
                                        <p>Conversion monster funnel</p>
                                    </div>
                                    <div className="sidebar_content">
                                        <Text as='p'>This funnel is optimized to <b>maximize conversions</b> for your post-purchase offers & on your thank you page. Immediately after purchase, you'll show customers 1-click upsells designed using data-backed best practices. Customers will see a total of 2 offers per order:</Text>
                                        <List type="bullet">
                                            <List.Item> <b>First upsell</b> - Customers can claim <b>15%</b> off if they add one more of the same item they bought (most expensive item in the cart)</List.Item>
                                            <List.Item> <b>Downsell</b> - If customers decline your offer, you ramp up your offer to <b>30%</b> off on the same item.</List.Item>
                                            <List.Item> <b>2nd upsell</b> - If the customer accepts your first offer, you'll offer them <b>30%</b> off another product recommended by our algorithm.</List.Item>
                                        </List>
                                        <Text as='p'>From here, you'll redirect customers to your custom thank you page for more conversions. The thank you page contains seven of our most powerful features:</Text>
                                        <List type="bullet">
                                            <List.Item> <b>Product recommendations</b> Offer <b>7.5%</b> off for customers buying product recommendations directly from the thank you page.</List.Item>
                                            <List.Item> <b>Customer Reviews</b> -  We recommend adding product reviews from your reviews app through the <b>Settings General settings</b> page.</List.Item>
                                            <List.Item> <b> A Pop up with a timer</b> - Give <b>30%</b> off for customers going back to the store with an eye-catching pop-up.</List.Item>
                                            <List.Item> <b> Product upsell </b> - Offer <b>15%</b> off for customers buying the most expensive product from the original order again</List.Item>
                                            <List.Item> <b> Birthday subscription </b> - collect customer birthdays. We recommend syncing this data with your email and SMS app of choice through the <b>Settings General settings</b> page.</List.Item>
                                            <List.Item> <b> Social sharing widgets </b> - Invite customers to share their order and get free social engagement </List.Item>
                                            <List.Item> <b> Order tracking </b> - Add a 17Track tracking widget directly to the thank you page2 </List.Item>
                                        </List>
                                    </div>
                                </div>
                                <div className="modal_footer">
                                    <div className='btm_content'>
                                    <Icon
                                        source={QuestionMarkMinor}
                                        color="base"
                                    />
                                    <span>Max discount:</span>
                                    <TextField
                                    type="number"
                                    value={textFieldValue}
                                    onChange={handleTextFieldChange}
                                    suffix="%"
                                    autoComplete="off"
                                    />
                                    <Button primary>Add</Button>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </Modal>
        </div>
    );
}