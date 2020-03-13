import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const query = gql`
  query recordTypeSingle($id: Int!) {
    recordType(where: { id: $id }) {
      color
    }
  }
`;

const useColor = (index: number) => {
  const { data } = useQuery(query, { variables: { id: index } });
  return data.recordType.color;
};

export default useColor;
