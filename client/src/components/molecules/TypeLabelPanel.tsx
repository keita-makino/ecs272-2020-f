import React, { useState, useEffect } from 'react';
import TypeLabel from '../atoms/TypeLabel';
import { Typography, Grid, Divider } from '@material-ui/core';
import { useCurrentRoom } from '../../uses/useRoom';
import getIcon from '../../utils/getIcon';
import camelcase from 'camelcase';
import AddType from '../atoms/AddType';

export type TypePanelProps = {};

const TypePanel: React.FC<TypePanelProps> = (props: TypePanelProps) => {
  const [recordTypes, setRecordTypes] = useState<
    {
      id: number;
      name: string;
      color: number[];
      active: boolean;
      record: any[];
    }[]
  >([]);

  const room = useCurrentRoom();
  useEffect(() => {
    if (room) {
      const newRecordTypes = room.recordType;
      setRecordTypes(newRecordTypes);
    }
  }, [room]);

  return (
    <>
      <Typography variant="h6">Layers</Typography>
      <Divider />
      <Grid
        container
        item
        xs={12}
        direction="column"
        justify="space-around"
        alignItems="stretch"
      >
        {recordTypes.map((item, index) => {
          const recordType = recordTypes[index];
          return (
            <TypeLabel
              id={recordType.id}
              icon={getIcon[camelcase(recordType.name)]}
              label={recordType.name}
              color={recordType.color}
              active={recordType.active}
              canDelete={recordType.record.length === 0}
            />
          );
        })}
        <AddType />
      </Grid>
    </>
  );
};

export default TypePanel;
