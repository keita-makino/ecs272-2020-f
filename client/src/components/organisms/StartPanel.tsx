import React, { useState } from 'react';
import {
  Grid,
  Card,
  Typography,
  Divider,
  TextField,
  Button,
  makeStyles,
  Theme,
  Switch
} from '@material-ui/core';
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
  CREATE_NEW_USER,
  GET_USER,
  GET_CURRENT_USER_ID
} from '../../uses/useUser';
import { mockUser, mockRecordType } from '../../data/mock';
import {
  CREATE_NEW_ROOM,
  GET_CURRENT_ROOM_ID,
  GET_ROOM
} from '../../uses/useRoom';
import { motion } from 'framer-motion';

export type StartPanelProps = {};

const useStyles = makeStyles((theme: Theme) => ({
  card: { backgroundColor: theme.palette.background.default },
  row: {
    padding: '1rem 0'
  }
}));

export const GET_USER_AND_ROOM = gql`
  query {
    session @client {
      userId
      roomId
    }
  }
`;

const StartPanel: React.FC<StartPanelProps> = () => {
  const classes = useStyles();
  const [userId, setUserId] = useState('Demo User');
  const [roomId, setRoomId] = useState('Demo Room');
  const [editable, setEditable] = useState(true);
  const client = useApolloClient();

  const onChange = (event: any, checked: boolean) => {
    if (checked) {
      setUserId('Demo User');
      setRoomId('Demo Room');
    }
    setEditable(!checked);
  };

  const [mutationUser] = useMutation(CREATE_NEW_USER, {
    update: (cache, { data: { createOneUser } }) => {
      cache.writeQuery({
        query: GET_CURRENT_USER_ID,
        data: { session: { userId: createOneUser.id, __typename: 'session' } }
      });
    },
    onError: () => {
      client.cache.writeQuery({
        query: GET_CURRENT_USER_ID,
        data: { session: { userId: userId, __typename: 'session' } }
      });
    }
  });

  const [mutationRoom] = useMutation(CREATE_NEW_ROOM, {
    update: (cache, { data: { createOneRoom } }) => {
      cache.writeQuery({
        query: GET_CURRENT_ROOM_ID,
        data: { session: { roomId: createOneRoom.id, __typename: 'session' } }
      });
    },
    onError: () => {
      client.cache.writeQuery({
        query: GET_CURRENT_ROOM_ID,
        data: { session: { roomId: roomId, __typename: 'session' } }
      });
    }
  });

  const onClickHandler = (userId: string, roomId: string) => () => {
    mutationUser({
      variables: { newData: { id: userId, ...mockUser } }
    });
    mutationRoom({
      variables: {
        newData: { id: roomId, recordType: { create: mockRecordType } }
      }
    });
  };

  const onClick = onClickHandler(userId, roomId);

  const onChangeUser = (event: any) => {
    setUserId(event.target.value);
  };

  const onChangeRoom = (event: any) => {
    setRoomId(event.target.value);
  };

  return (
    <Grid container xs={12} justify={'center'}>
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, easing: 'easeOut' }}
      >
        <Card className={classes.card}>
          <Grid
            container
            item
            xs={12}
            alignContent={'center'}
            style={{ width: '35rem', height: '35rem' }}
          >
            <Grid container item xs={12} justify={'center'}>
              <Grid container item xs={8} style={{ paddingBottom: '0.5rem' }}>
                <Grid container item xs={12} justify={'flex-end'}>
                  <Typography variant={'h4'}>A Bubble City of Davis</Typography>
                </Grid>
                <Grid container item xs={12} justify={'flex-end'}>
                  <Typography variant={'h5'}>Explorer</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={8} justify={'space-between'}>
                <Typography variant={'body2'}>
                  The final project of{' '}
                  <a
                    href={'https://github.com/ucdavis/ECS272-Winter2020'}
                    target={'blank'}
                  >
                    ECS272-Winter2020
                  </a>
                </Typography>
                <Typography variant={'body2'}>
                  <a
                    href={'https://github.com/keita-makino/ecs272-2020-f'}
                    target={'blank'}
                  >
                    GitHub
                  </a>
                </Typography>
              </Grid>
              <Grid
                container
                item
                xs={10}
                style={{ padding: '2.5rem 0 1.5rem 0' }}
              >
                <Divider style={{ width: '100%' }} />
              </Grid>
              <Grid container item xs={8}>
                <Typography variant={'subtitle1'}>
                  <u>You can save/load your work with IDs:</u>
                </Typography>
              </Grid>
              <Grid
                container
                alignItems={'baseline'}
                justify={'space-between'}
                item
                xs={8}
                className={classes.row}
              >
                <Typography variant={'body1'}>User ID</Typography>
                <TextField
                  disabled={!editable}
                  value={userId}
                  onChange={onChangeUser}
                  inputProps={{
                    style: { textAlign: 'right' }
                  }}
                ></TextField>
              </Grid>
              <Grid
                container
                alignItems={'baseline'}
                justify={'space-between'}
                item
                xs={8}
                className={classes.row}
              >
                <Typography variant={'body1'}>Room ID</Typography>
                <TextField
                  disabled={!editable}
                  value={roomId}
                  onChange={onChangeRoom}
                  inputProps={{
                    style: { textAlign: 'right' }
                  }}
                ></TextField>
              </Grid>
              <Grid container item xs={10} style={{ padding: '1.5rem 0' }}>
                <Divider style={{ width: '100%' }} />
              </Grid>
              <Grid
                container
                alignItems={'baseline'}
                justify={'space-between'}
                item
                xs={8}
                className={classes.row}
              >
                <Typography variant={'subtitle1'}>
                  <u>Or jump into the demo:</u>
                </Typography>
                <Switch onChange={onChange} />
                <Button
                  variant={'contained'}
                  color={'primary'}
                  onClick={onClick}
                >
                  Start
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </motion.div>
    </Grid>
  );
};

export default StartPanel;
