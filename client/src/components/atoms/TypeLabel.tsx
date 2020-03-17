import React, { ChangeEvent, useState, useEffect } from 'react';
import { Grid, Checkbox, Icon, Typography, useTheme } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { GET_ROOM, useCurrentRoom } from '../../uses/useRoom';
import { rgb, hsl } from 'color-convert';
import useBusy from '../../uses/useBusy';
import { useCurrentUser } from '../../uses/useUser';

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
  const user = useCurrentUser();
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

  const color = props.color
    ? '#' +
      hsl.hex(
        rgb
          .hsl(props.color)
          .map((item: number, index: number) =>
            index === 2 ? item - 10 * (user?.setting.darkMode ? -1 : 1) : item
          )
      )
    : '#aaaaaa';

  return (
    <Grid
      style={{
        height: '3rem',
        color: color
      }}
      container
      item
      xs={12}
    >
      <Grid container item xs={2} alignItems={'center'}>
        <Icon>{props.icon || 'place'}</Icon>
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
            color: color
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
