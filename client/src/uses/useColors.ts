import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const query = gql`
  query {
    recordTypes {
      color
    }
  }
`;

const useColors = () => {
  const { data } = useQuery(query);
  return data?.recordTypes.map((item: any) => item.color) as number[][];
};

export default useColors;
