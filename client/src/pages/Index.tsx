import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import IndexTemplate from '../components/templates/Index';

type Props = {};

const Index: React.FC<Props> = (props: Props) => {
  return <IndexTemplate />;
};

export default Index;
