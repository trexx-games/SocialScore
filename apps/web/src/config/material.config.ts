import { createTheme } from '@mui/material';

import { primaryColor, secondaryColor } from './colors';

/**
 * For customizing, please refer below links
 * https://mui.com/material-ui/customization/theming/
 *
 * or check this article
 * https://muhimasri.com/blogs/how-to-customize-theme-and-colors-in-material-ui/
 */
export const muiTheme = createTheme({
  palette: {
    background: {
      paper: '#F5F6FB',
    },
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
  },
});

export default muiTheme;
