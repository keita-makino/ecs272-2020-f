import { useState, useEffect } from 'react';
import { hslToRgb } from '@material-ui/core';

const useColor = (index: number) => {
  const [color, setColor] = useState('0, 80%, 80%');
  setColor(hslToRgb(`${(index * 157) % 255}, 80%, 80%`));
  return color;
};

export default useColor;
