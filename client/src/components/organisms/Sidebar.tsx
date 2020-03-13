import React, { ReactChildren } from 'react';
import ControlPanel, { ControlPanelProps } from '../molecules/ControlPanel';

export type SidebarProps = { typePanel: ControlPanelProps };

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  return (
    <ControlPanel
      title={props.typePanel.title}
      typeArray={props.typePanel.typeArray}
    ></ControlPanel>
  );
};

export default Sidebar;
