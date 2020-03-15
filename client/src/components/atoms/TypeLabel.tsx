import React, { ChangeEvent, useState, useEffect } from 'react';
import { Grid, Checkbox, Icon, Typography, useTheme } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { GET_ROOM, useCurrentRoom } from '../../uses/useRoom';

export type TypeLabelProps = {
  id: number;
  icon: string;
  label: string;
  color?: number[];
  active: boolean;
};

export const UPDATE_RECORD_TYPE = gql`
  mutation UpdateBoolean($newData: RecordTypeUpdateInput!, $id: Int!) {
    updateOneRecordType(data: $newData, where: { id: $id }) {
      id
      name
      color
      active
    }
  }
`;

const TypeLabel: React.FC<TypeLabelProps> = (props: TypeLabelProps) => {
  const theme = useTheme();
  const currentRoom = useCurrentRoom();
  const [updateRecord] = useMutation(UPDATE_RECORD_TYPE, {
    update: (cache, { data: { updateOneRecordType } }) => {
      const { room } = cache.readQuery<any>({
        query: GET_ROOM,
        variables: { id: currentRoom.id }
      });
      cache.writeQuery({
        query: GET_ROOM,
        data: {
          room: {
            ...room,
            recordType: [
              ...room.recordType.filter(
                (item: any) => item.id !== updateOneRecordType.id
              ),
              updateOneRecordType
            ].sort((a, b) => (a.id < b.id ? -1 : 1))
          }
        }
      });
    }
  });
  const [status, setStatus] = useState<[boolean, boolean]>([false, false]);

  useEffect(() => {
    if (props) {
      setStatus([props.active, true]);
    }
  }, [props]);

  const onChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setStatus([checked, false]);
    updateRecord({
      variables: {
        newData: { active: checked },
        id: props.id
      }
    });
  };

  return (
    <Grid
      style={{
        height: '3rem',
        color: props.color
          ? `rgb(${props.color[0]}, ${props.color[1]}, ${props.color[2]})`
          : undefined
      }}
      container
      item
      xs={12}
    >
      <Grid container item xs={2} alignItems={'center'}>
        <Icon>{props.icon}</Icon>
      </Grid>
      <Grid
        container
        item
        xs={10}
        justify={'space-between'}
        alignItems={'center'}
      >
        <Typography variant={'body1'}>{props.label}</Typography>
        <Checkbox
          style={{
            color: props.color
              ? status[1]
                ? `rgb(${props.color[0]}, ${props.color[1]}, ${props.color[2]})`
                : theme.palette.grey[500]
              : undefined
          }}
          checked={status[0]}
          disabled={!status[1]}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
};

export default TypeLabel;
