import React, { useEffect } from 'react';

import Main from '../components/templates/Main';
import initialStateIndex from '../data/initialState';
import useBusy from '../uses/useBusy';
import { MuiThemeProvider } from '@material-ui/core';
import { defaultTheme, darkTheme } from '../data/theme';
import { useCurrentUser } from '../uses/useUser';
import LoadingScreen from '../components/organisms/LoadingScreen';
import {
  useSpring,
  motion,
  useTransform,
  AnimatePresence
} from 'framer-motion';
import Start from '../components/templates/Start';
import { useCurrentRoom } from '../uses/useRoom';

type Props = {};

const Index: React.FC<Props> = () => {
  const data = useCurrentUser();
  const room = useCurrentRoom();
  const isLoading = useBusy('isLoading');

  const opacity = useSpring(1, { stiffness: 30, mass: 0.4 });
  const opacityInverse = useTransform(opacity, [0, 1], [1, 0]);

  useEffect(() => {
    if (room) {
      opacity.set(isLoading === true ? 1 : 0);
    }
  }, [isLoading, room]);

  return (
    <MuiThemeProvider
      theme={data?.user?.setting.darkMode ? darkTheme : defaultTheme}
    >
      <AnimatePresence initial={false}>
        {!data?.user ? (
          <motion.div
            key="cover"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Start />
          </motion.div>
        ) : (
          <>
            <motion.div style={{ opacity }} exit={{ opacity: 0 }}>
              <LoadingScreen />
            </motion.div>
            <motion.div
              style={{ opacity: opacityInverse }}
              exit={{ opacity: 0 }}
            >
              <Main
                sideBarProps={initialStateIndex.sideBar}
                mapProps={initialStateIndex.map}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </MuiThemeProvider>
  );
};

export default Index;
