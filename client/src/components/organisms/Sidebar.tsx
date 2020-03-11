import React, { ReactChildren } from 'react';
import TypeControllerPanel, {
  TypeControllerPanelProps
} from '../molecules/TypeControllerPanel';

export type SidebarProps = { typePanel: TypeControllerPanelProps };

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  return (
    <TypeControllerPanel typeArray={props.typePanel}></TypeControllerPanel>
  );
};

export default Sidebar;
