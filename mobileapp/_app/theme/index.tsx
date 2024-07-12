
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 13,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF5E07',
    accent: '#f1c40d',
    surface: '#FF5E07',
  },
};

export {PaperProvider, theme};