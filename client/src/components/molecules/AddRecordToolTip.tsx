import React, { SetStateAction, Dispatch } from 'react';
import {
  Card,
  Grid,
  Divider,
  TextField,
  MenuItem,
  Button,
  useTheme,
  Paper,
  makeStyles,
  Theme
} from '@material-ui/core';
import { useCurrentRoom, GET_ROOM } from '../../uses/useRoom';
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

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    backgroundColor: theme.palette.background.default,
    width: '15rem',
    position: 'absolute',
    padding: '0.6rem 0.8rem 0.8rem 0.8rem',
    zIndex: 700,
    top: (props: any) => props.y,
    left: (props: any) => props.x
  },
  label: {
    color: theme.palette.text.primary
  }
}));

const AddRecordToolTip: React.FC<AddRecordToolTipProps> = (
  props: AddRecordToolTipProps
) => {
  const classes = useStyles(props);
  const currentRoom = useCurrentRoom();
  const [mutation] = useMutation(CREATE_RECORD, {
    update: (cache, { data: { createOneRecord } }) => {
      const { room } = cache.readQuery<any>({
        query: GET_ROOM,
        variables: { id: currentRoom.id }
      });

      const typeIndex = room.recordType.findIndex(
        (item: any) => item.name === type
      );
      const newRecord = {
        ...createOneRecord,
        type: { connect: { id: room.recordType[typeIndex].id } }
      };

      const newRoom = {
        ...room,
        recordType: [
          ...room.recordType.filter(
            (item: any, index: any) => index !== typeIndex
          ),
          {
            ...room.recordType[typeIndex],
            record: [
              ...room.recordType[typeIndex].record,
              newRecord
            ].sort((a, b) => (a.id < b.id ? -1 : 1))
          }
        ].sort((a, b) => (a.id < b.id ? -1 : 1))
      };

      cache.writeQuery({
        query: GET_ROOM,
        variables: {
          id: currentRoom.id
        },
        data: {
          room: newRoom
        }
      });
    }
  });
  const [type, setType] = React.useState('');
  const [name, setName] = React.useState('');
  if (!props.address || !currentRoom) return null;

  const options = currentRoom?.recordType.map((item: any) => ({
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
    const typeInstance = currentRoom?.recordType.find(
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
    setName('');
  };

  return (
    <Card className={classes.card}>
      <Grid container item xs={12}>
        <Grid
          container
          item
          xs={12}
          alignItems={'center'}
          style={{
            padding: '0.6rem'
          }}
        >
          <TextField
            color={'secondary'}
            style={{
              width: '15rem'
            }}
            InputLabelProps={{ className: classes.label }}
            label="Add Record"
            value={name}
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
          padding: '0.6rem'
        }}
      >
        <TextField
          color={'secondary'}
          select
          label="Select Type"
          InputLabelProps={{ className: classes.label }}
          value={type}
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
          padding: '0.6rem'
        }}
      >
        <Button
          style={{ marginRight: '0.5rem' }}
          variant={'outlined'}
          color={'secondary'}
          onClick={() => props.setAddRecordTooltip(undefined)}
        >
          Cancel
        </Button>
        <Button variant={'contained'} color={'primary'} onClick={addRecord}>
          Add
        </Button>
      </Grid>
    </Card>
  );
};

export default AddRecordToolTip;
