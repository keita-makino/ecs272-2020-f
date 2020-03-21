import React, { Dispatch, SetStateAction } from 'react';
import {
  Card,
  Grid,
  Typography,
  ButtonBase,
  Divider,
  Icon
} from '@material-ui/core';
import getIcon from '../../utils/getIcon';
import camelcase from 'camelcase';
import { DeleteForever } from '@material-ui/icons';
import { gql } from 'apollo-boost';
import { useCurrentRoom, GET_ROOM } from '../../uses/useRoom';
import { useMutation } from '@apollo/react-hooks';

export type ToolTipProps = {
  id: number;
  type: string;
  name: string;
  address: string;
  x: number;
  y: number;
  setTooltip: Dispatch<SetStateAction<ToolTipProps | undefined>>;
};

export const DELETE_RECORD = gql`
  mutation DeleteRecord($where: RecordWhereUniqueInput!) {
    deleteOneRecord(where: $where) {
      id
      name
      lat
      lng
      address
    }
  }
`;

const ToolTip: React.FC<ToolTipProps> = (props: ToolTipProps) => {
  const currentRoom = useCurrentRoom();
  const [mutation] = useMutation(DELETE_RECORD, {
    update: (cache, { data: { deleteOneRecord } }) => {
      const { room } = cache.readQuery<any>({
        query: GET_ROOM,
        variables: { id: currentRoom.id }
      });

      const typeIndex = room.recordType.findIndex(
        (item: any) => item.name === props.type
      );

      const newRoom = {
        ...room,
        recordType: [
          ...room.recordType.filter(
            (item: any, index: any) => index !== typeIndex
          ),
          {
            ...room.recordType[typeIndex],
            record: room.recordType[typeIndex].record
              .filter((item: { id: number }) => item.id !== props.id)
              .sort((a: { id: number }, b: { id: number }) =>
                a.id < b.id ? -1 : 1
              )
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

  const onClick = () => {
    mutation({
      variables: {
        where: {
          id: props.id
        }
      }
    });
    props.setTooltip(undefined);
  };

  if (!props.name) return null;
  return (
    <Card
      style={{
        maxWidth: '20rem',
        position: 'absolute',
        zIndex: 7,
        top: props.y,
        left: props.x
      }}
    >
      <Grid
        container
        item
        xs={12}
        style={{
          padding: '0.3rem'
        }}
      >
        <Grid container item xs={2} alignItems={'center'} justify={'center'}>
          <Icon>{getIcon[camelcase(props.type)] || 'place'}</Icon>
        </Grid>
        <Grid container item xs={9} alignItems={'center'}>
          <Typography variant={'h6'}>{props.name}</Typography>
        </Grid>
        <Grid container item xs={1} alignItems={'center'}>
          <ButtonBase onClick={onClick}>
            <DeleteForever color={'error'} />
          </ButtonBase>
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
        <Typography variant={'body1'}>{props.address}</Typography>
      </Grid>
    </Card>
  );
};

export default ToolTip;
