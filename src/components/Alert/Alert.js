import React, { Component } from 'react';
import { default as MuiAlert } from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

export default class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            _message: null,
            _severity: null
        };
    }

    toggle(severity, message) {
        this.setState({ _severity: severity, _message: message }, () => this.setState({open: true}));
    }

    hide() {
        this.setState({ open: false });
    }

    render() {
        return (
            <Collapse in={this.state.open}>
                <MuiAlert
                    severity={this.state._severity || 'success'}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                this.setState({ open: false });
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {this.state._message}
                </MuiAlert>
            </Collapse>

        );
    }
}
