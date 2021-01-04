import { createMuiTheme } from '@material-ui/core';
import blueGrey from "@material-ui/core/colors/blueGrey";

export const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#7da0b0'
        },
        secondary: blueGrey,
    },
    theme: {
        spacing: 8,
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    height: '100%',
                },
                body: {
                    height: '100%'
                },
            },
        },
        MuiButton: {
            label: {
                fontWeight: "bold"
            }
        },
        MuiLinearProgress: {
            root: {
                minHeight: '50px'
            }
        },
        MuiDivider: {
            root: {
                marginTop: '20px',
                marginBottom: '20px'
            }
        }
    }
});
