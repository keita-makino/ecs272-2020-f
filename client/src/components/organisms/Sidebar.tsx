import React, { ReactChildren } from 'react';
import TypeControllerPanel, {
  TypeControllerPanelProps
} from '../molecules/TypeControllerPanel';

export type SidebarProps = { typePanel: TypeControllerPanelProps };

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  return (
    <TypeControllerPanel
      title={'hoge'}
      typeArray={props.typePanel.typeArray}
    ></TypeControllerPanel>
  );
};

export default Sidebar;
