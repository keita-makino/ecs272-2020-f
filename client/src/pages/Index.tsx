import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import IndexTemplate from '../components/templates/Index';
import initialStateIndex from '../data/initialState';

type Props = {};

const Index: React.FC<Props> = (props: Props) => {
  return (
    <IndexTemplate
      sideBarProps={initialStateIndex.sideBar}
      mapProps={initialStateIndex.map}
    />
  );
};

export default Index;
