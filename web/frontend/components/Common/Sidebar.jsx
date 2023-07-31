import {Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';

export default function Sidebar() {
  const [active, setActive] = useState(true);

  const Sidebar = useCallback(() => setActive((active) => !active), []);

  return (
    <div className='sidebar'>
      <div className='inner_sidebar'
      >
      </div>
    </div>
  );
}