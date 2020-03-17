import React, { SetStateAction, Dispatch } from 'react';
import {
  Card,
  Grid,
  Typography,
  Icon,
  Divider,
  TextField,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';
import camelcase from 'camelcase';
import { useCurrentRoom } from '../../uses/useRoom';
import { ToolTipProps } from './ToolTip';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

export type AddRecordToolTipProps = {
  address: string;
  x: number;
  y: number;
  lat: number;
  lng: number;
  setAddRecordTooltip: Dispatch<
    SetStateAction<AddRecordToolTipProps | undefined>
  >;
};

export const CREATE_RECORD = gql`
  mutation CreateRecord($newData: RecordCreateInput!) {
    createOneRecord(data: $newData) {
      id
      name
      lat
      lng
      address
    }
  }
`;

const AddRecordToolTip: React.FC<AddRecordToolTipProps> = (
  props: AddRecordToolTipProps
) => {
  const room = useCurrentRoom();
  const [mutation] = useMutation(CREATE_RECORD);
  const [type, setType] = React.useState('');
  const [name, setName] = React.useState('');
  if (!props.address) return null;

  const options = room?.recordType.map((item: any) => ({
    value: item.name
  }));

  if (!options) return null;

  const onChangeInput = (event: any) => {
    setName(event.target.value);
  };
  const onChangeSelect = (event: any) => {
    setType(event.target.value);
  };

  const addRecord = () => {
    const typeInstance = room?.recordType.find(
      (item: any) => item.name === type
    );
    if (!typeInstance) return;
    const newRecord = {
      address: props.address,
      lat: props.lat,
      lng: props.lng,
      name: name,
      type: { connect: { id: typeInstance.id } }
    };
    mutation({
      variables: {
        newData: newRecord
      }
    });
    props.setAddRecordTooltip(undefined);
  };

  return (
    <Card
      style={{
        width: '15rem',
        position: 'absolute',
        zIndex: 700,
        top: props.y,
        left: props.x
      }}
    >
      <Grid container item xs={12}>
        <Grid
          container
          item
          xs={10}
          alignItems={'center'}
          style={{
            padding: '0.3rem'
          }}
        >
          <TextField
            style={{
              width: '15rem'
            }}
            label="Add Record"
            defaultValue={name}
            onChange={onChangeInput}
          />
        </Grid>
      </Grid>
      <Divider />
      <Grid
        container
        item
        xs={12}
        style={{
          padding: '0.3rem'
        }}
      >
        <TextField
          select
          label="Select Type"
          onChange={onChangeSelect}
          style={{
            width: '15rem'
          }}
        >
          {options.map((option: any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid
        container
        item
        xs={12}
        justify={'flex-end'}
        style={{
          padding: '0.3rem'
        }}
      >
        <Button
          color={'primary'}
          onClick={() => props.setAddRecordTooltip(undefined)}
        >
          Cancel
        </Button>
        <Button color={'primary'} onClick={addRecord}>
          Add
        </Button>
      </Grid>
    </Card>
  );
};

export default AddRecordToolTip;
