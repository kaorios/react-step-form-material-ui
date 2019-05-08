import {createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontSize: 14,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      '"Yu Gothic"',
      'YuGothic',
      'Meiryo',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f44336',
    },
  },
  overrides: {
    MuiStepper: {
      root: {
        padding: '8px 0',
      },
    },
    MuiStepConnector: {
      vertical: {
        padding: 0,
      },
      lineVertical: {
        minHeight: '12px',
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: '12px 14px',
      },
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 14px) scale(1)',
      },
    },
  },
});

export const commonStyle = {
  root: {
    flexGrow: 1,
  },
  appBarColorDefault: {
    boxShadow: 'none',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  formBg: {
    backgroundColor: '#f9f9f9',
  },
  sectionBottom: {
    borderTop: '1px solid #ddd',
    marginTop: theme.spacing.unit * 5,
    paddingTop: theme.spacing.unit * 2,
  },
  control: {
    padding: theme.spacing.unit * 2,
    position: 'sticky' as 'sticky',
    top: 0,
  },
  controlButton: {
    fontSize: '.8em',
  },
  main: {
    padding: theme.spacing.unit * 4,
  },
};

export const AppContainerStyle = {
  maxWidth: 840,
  width: '96%',
  marginTop: theme.spacing.unit * 4,
  marginBottom: theme.spacing.unit * 4,
  marginLeft: 'auto',
  marginRight: 'auto',
};
