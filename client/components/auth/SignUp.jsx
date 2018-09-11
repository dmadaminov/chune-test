import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { objectOf, any, func } from 'prop-types';

import { GoogleIcon, FacebookIcon, TwitterIcon } from '../shared/SocialIcons';
import { createNewUserBasic } from '../../store/auth/basic/actions';

const styles = () => ({
  pageContainer: {
    backgroundImage: 'url(images/background.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 1023px)': {
      width: '100vw',
    }
  },
  contentContainer: {
    width: 342,
    height: 543,
    margin: '0 auto',
    flexDirection: 'column',
    borderRadius: 8,
    boxShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.3), 0 0 2px 0 rgba(0, 0, 0, 0.12)',
    border: 'solid 1px transparent',
    backgroundImage: 'linear-gradient(#ffffff, #ffffff), linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1) 5%, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0))',
    display: 'flex',
    '@media (max-width: 1023px)': {
      marginTop: 24,
    }
  },
  headingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
  },
  iconListContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 34,
    height: 18,
  },
  paragraphContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 34,
    height: 15,
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 342,
    marginTop: 34,
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 34,
    marginBottom: 38,
  },
  signupForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 290,
  },
  submitButton: {
    padding: 0,
    width: 96,
    height: 36,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 600,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.13,
    letterSpacing: 1.3,
    textAlign: 'center',
    marginTop: 60,
    color: 'white',
    backgroundColor: '#6200EE',
    '&:hover': {
      backgroundColor: 'rgba(98, 0, 238, 0.58)',
    },
    '&:focus': {
      backgroundColor: '#6200EE',
    },
    '&:disabled': {
      pointerEvents: 'none',
      cursor: 'default',
      backgroundColor: 'rgba(0, 0, 0, 0.87)',
      color: 'white',
      opacity: 0.12,
    },
  },
  formHeading: {
    width: 82,
    height: 28,
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#000000',
  },
  iconList: {
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 28,
    width: 190,
  },
  iconListItem: {
    cursor: 'pointer',
  },
  para: {
    width: 125,
    height: 16,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 300,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#000000',
  },
  footerLine: {
    margin: 0,
    height: 16,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0.5,
    textAlign: 'center',
    color: '#9b9b9b',
  },
  errorMessage: {
    margin: '0 auto',
    color: 'red',
    fontSize: 12,
    marginTop: 18,
    width: 290,
  },
  inputLabel: {
    top: 5,
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.5,
    letterSpacing: 'normal',
    color: 'rgba(0, 0, 0, 0.38)',

  },
  focused: {
    '&$focused': {
      color: 'rgba(0, 0, 0, 0.38)',
    },
  }
});

const inputStylesOverrides = {
  height: '40px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      errored: false,
      errorMessage: '',
    };
  }

  onEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  onPassChange = ({ target }) => {
    this.setState({ password: target.value });
  }

  onPassRepeatChange = ({ target }) => {
    this.setState({ passwordConfirmation: target.value });
  }

  onSubmit = () => {
    this.setState({ errored: false, errorMessage: '' });
    const { email, password } = this.state;
    const { newUserBasic } = this.props;
    newUserBasic(email, password);
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (this.enableButton()) this.onSubmit();
    }
  }

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateNotBlank = value => value !== '';

  validatePasswordMatch = (pass, repeatPass) => pass === repeatPass;

  enableButton = () => {
    const {
      email, password, passwordConfirmation,
      pass, repeatPass
    } = this.state;
    return this.validateNotBlank(email)
           && this.validateNotBlank(password)
           && this.validateNotBlank(passwordConfirmation)
           && this.validateEmail(email)
           && this.validatePasswordMatch(pass, repeatPass);
  }

  render() {
    const { classes } = this.props;
    const {
      errored, errorMessage, email,
      password, passwordConfirmation
    } = this.state;
    return (
      <div className={classes.pageContainer}>
        <Paper className={classes.contentContainer}>
          <div className={classes.headingContainer}>
            <h3 className={classes.formHeading}>
              Sign Up
            </h3>
          </div>
          <div className={classes.iconListContainer}>
            <ul className={classes.iconList}>
              <li className={classes.iconListItem}>
                <TwitterIcon />
              </li>
              <li className={classes.iconListItem}>
                <a href="https://www.facebook.com/v3.1/dialog/oauth?client_id=539242329859538&redirect_uri=http://localhost:8080/facebook&scope=['email']">
                  <FacebookIcon />
                </a>
              </li>
              <li className={classes.iconListItem}>
                <GoogleIcon />
              </li>
            </ul>
          </div>
          <div className={classes.paragraphContainer}>
            <p className={classes.para}>
              Or use email instead
            </p>
          </div>
          {
            errored ? (
              <div className={classes.errorMessage}>
                {errorMessage}
              </div>
            ) : null
          }
          <div className={classes.formContainer}>
            <form className={classes.signupForm} noValidate autoComplete="off" onKeyPress={this.handleKeyPress}>
              <TextField
                label="Email"
                type="email"
                onChange={this.onEmailChange}
                value={email}
                InputProps={{
                  disableUnderline: true,
                  style: inputStylesOverrides
                }}
                InputLabelProps={{
                  classes: { root: classes.inputLabel, },
                  FormLabelClasses: { root: classes.focused },
                }}
                margin="normal"
                style={{ height: '30px' }}
                fullWidth
              />
              <TextField
                label="Password"
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  classes: { root: classes.inputLabel, },
                  FormLabelClasses: { root: classes.focused },
                  style: inputStylesOverrides
                }}
                type="password"
                onChange={this.onPassChange}
                value={password}
                fullWidth
                style={{ height: '40px', marginTop: '30px' }}
              />
              <TextField
                label="Repeat Password"
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  classes: { root: classes.inputLabel, },
                  FormLabelClasses: { root: classes.focused },
                  style: inputStylesOverrides
                }}
                type="password"
                onChange={this.onPassRepeatChange}
                value={passwordConfirmation}
                fullWidth
                margin="dense"
                style={{ height: '30px', marginTop: '30px' }}
              />
              <Button className={classes.submitButton} onClick={this.onSubmit} disabled={!this.enableButton()}>
                SIGN UP
              </Button>
            </form>
          </div>
          <div className={classes.footerContainer}>
            <p className={classes.footerLine}>
              Already have an account?
              {' '}
              <Link to="/login" style={{ color: '#6200ee', fontWeight: 500 }}>
                Log in
              </Link>
            </p>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapActionsToProps = dispatch => bindActionCreators({
  newUserBasic: createNewUserBasic
}, dispatch);

export const SignUpConnect = withStyles(styles)(connect(null, mapActionsToProps)(SignUp));

SignUp.propTypes = {
  classes: objectOf(any).isRequired,
  newUserBasic: func.isRequired
};
