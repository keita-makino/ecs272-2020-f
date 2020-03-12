import React from 'react';

import Map from '../organisms/Map';
import Sidebar from '../organisms/Sidebar';

type Props = {};

const Index: React.FC<Props> = (props: Props) => {
  return (
    <>
      <Sidebar
        typePanel={{
          title: 'hoge',
          typeArray: [
            { type: 'Supermarket' },
            { type: 'Bus Stop' },
            { type: 'Restaurant' },
            { type: 'Medical Clinic' }
          ]
        }}
      ></Sidebar>
      <Map />
    </>
  );
};

export default Index;
