import React from 'react';

import Map from '../organisms/Map';
import Sidebar from '../organisms/Sidebar';

type Props = {};

const Index: React.FC<Props> = (props: Props) => {
  return (
    <>
      <Sidebar
        typePanel={{
          title: 'Layers',
          typeArray: [
            { icon: 'store', type: 'Supermarket' },
            { icon: 'directionsBus', type: 'Bus Stop' },
            { icon: 'restaurantMenu', type: 'Restaurant' },
            { icon: 'hotel', type: 'Medical Clinic' }
          ]
        }}
      ></Sidebar>
    </>
  );
};

export default Index;
