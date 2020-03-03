import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import IndexTemplate from '../components/templates/Index';

type Props = {};

const GETDATA = gql`
  query {
    records {
      id
      lat
      lng
      name
      address
    }
  }
`;

const Index: React.FC<Props> = (props: Props) => {
  const { data } = useQuery(GETDATA);

  console.log(data);
  return <IndexTemplate />;
};

export default Index;
