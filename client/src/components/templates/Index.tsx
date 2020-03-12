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
            { icon: 'StoreIcon', type: 'Supermarket' },
            { icon: 'DirectionsBusIcon', type: 'Bus Stop' },
            { icon: 'RestaurantMenuIcon', type: 'Restaurant' },
            { icon: 'LocalHospitalIcon', type: 'Medical Clinic' }
          ]
        }}
      ></Sidebar>
      <Map />
    </>
  );
};

export default Index;
