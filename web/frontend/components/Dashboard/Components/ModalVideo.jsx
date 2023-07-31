import {Button, HorizontalStack, Icon, Modal} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {PlayCircleMajor} from '@shopify/polaris-icons';
export default function HelpvideoModal() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = <Button onClick={toggleActive}> 
            <HorizontalStack>
                <Icon source={PlayCircleMajor}
                                color="base" />
                            Help Video        
                          </HorizontalStack>
                          </Button>;

  return (
    <div>
      <Modal
        large
        activator={activator}
        open={active}
        titleHidden
        onClose={toggleActive}
      >
        <iframe src="https://admin.shopify.com/store/crawlapps-trainee/" width={'100%'} height={'400px'}></iframe>
      </Modal>
    </div>
  );
}