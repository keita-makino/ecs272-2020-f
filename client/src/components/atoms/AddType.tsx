import React, { useState } from 'react';
import { Add, KeyboardArrowDown, Done } from '@material-ui/icons';
import {
  Grid,
  Typography,
  Checkbox,
  useTheme,
  TextField,
  IconButton
} from '@material-ui/core';
import { useCurrentRoom, GET_ROOM } from '../../uses/useRoom';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export type AddTypeProps = {};

export const CREATE_RECORD_TYPE = gql`
  mutation CreateRecordType($newData: RecordTypeCreateInput!) {
    createOneRecordType(data: $newData) {
      id
      name
      active
      color
      record {
        id
        name
        lat
        lng
        address
      }
    }
  }
`;

const AddType: React.FC<AddTypeProps> = (props: AddTypeProps) => {
  const theme = useTheme();
  const currentRoom = useCurrentRoom();
  const [name, setName] = useState<string>('');
  const [mutation] = useMutation(CREATE_RECORD_TYPE, {
    update: (cache, { data: { createOneRecordType } }) => {
      console.log(createOneRecordType);
      const { room } = cache.readQuery<any>({
        query: GET_ROOM,
        variables: { id: currentRoom.id }
      });
      console.log(
        [...room.recordType, createOneRecordType].sort((a, b) =>
          a.id < b.id ? -1 : 1
        )
      );
      cache.writeQuery({
        query: GET_ROOM,
        data: {
          room: {
            ...room,
            recordType: [...room.recordType, createOneRecordType].sort((a, b) =>
              a.id < b.id ? -1 : 1
            )
          }
        }
      });
    }
  });

  const onClick = (event: any) => {
    if (!currentRoom) return;

    const newRecordType = {
      active: true,
      name: name || 'no name',
      room: { connect: { id: currentRoom.id } },
      record: { create: [] }
    };
    mutation({
      variables: {
        newData: newRecordType
      }
    });
  };

  const onChange = (event: any) => {
    setName(event.target.value);
  };

  return (
    <Grid
      style={{
        height: '3rem',
        color: theme.palette.text.primary
      }}
      container
      item
      xs={12}
    >
      <Grid container item xs={2} alignItems={'center'}>
        <Add />
      </Grid>
      <Grid
        container
        item
        xs={10}
        justify={'space-between'}
        alignItems={'center'}
      >
        <TextField
          label="Add Type"
          size="small"
          style={{ width: '10rem' }}
          defaultValue={name}
          onChange={onChange}
        />
        <IconButton onClick={onClick} style={{ color: 'inherit' }}>
          <Done />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default AddType;
