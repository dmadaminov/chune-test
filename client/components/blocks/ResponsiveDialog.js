import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

class ResponsiveDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen) {
      this.setState({ isOpen: nextProps.isOpen });
    }
  }

  render() {
    const { isOpen } = this.state;
    const { children, fullScreen } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={isOpen}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            {children}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  handleClose = () => {
    this.setState({ isOpen: false });
    if (this.props.onClose) {
      this.props.onClose();
    }
  };
}

ResponsiveDialog.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
  fullScreen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

export default withMobileDialog()(ResponsiveDialog);