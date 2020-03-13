import React from 'react';

import Map from '../organisms/Map';
import Sidebar from '../organisms/Sidebar';

type Props = {};

const Index: React.FC<Props> = (props: Props) => {
  return (
    <>
      <Sidebar
        typePanel={{
          title: 'Controls',
          typeArray: [
            { type: 'Cell Size' },
            { type: 'Mark Size' },
            { type: 'Dark Mode' }
          ]
        }}
      ></Sidebar>
    </>
  );
};

export default Index;
