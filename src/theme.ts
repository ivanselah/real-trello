import { DefaultTheme } from 'styled-components';

export const initialTheme = (bgColor: string): DefaultTheme => {
  return {
    bgColor,
    boardColor: '#E0E0E0',
    cardColor: '#ffffff',
    alertBgColor: '#00cec9',
  };
};
