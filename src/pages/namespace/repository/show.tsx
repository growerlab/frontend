import React, { useEffect, useState } from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Menu, PageHeader, Popover, Tag } from 'antd';

import { Repository } from '../../../components/repository/Repository';

export default function(props: FormComponentProps) {
  const { t } = props;
  const [current, setCurrent] = useState('code');
  const { SubMenu } = Menu;

  const handleClick = (e: any) => {
    console.log(e.key);
    if (e.key == 'clone') {
      return;
    }
    setCurrent(e.key);
  };

  return (
    <div>
      <Repository ownerPath="moli" path="1112" />
    </div>
  );
}
