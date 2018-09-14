import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { objectOf, any, func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { GoogleIcon, FacebookIcon, TwitterIcon } from '../shared/SocialIcons';
import { loginUser } from '../../store/auth/actions';
import BackgroundPNG from '../../../assets/images/background.jpg';

const styles = () => ({
  pageContainer: {
    backgroundImage: `url(${BackgroundPNG})`,
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
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 8,
    boxShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.3), 0 0 2px 0 rgba(0, 0, 0, 0.12)',
    border: 'solid 1px transparent',
    backgroundImage: 'linear-gradient(#ffffff, #ffffff), linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1) 5%, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0))',
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
    marginTop: 90,
    color: '#ffffff',
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
    width: 290,
    height: 47
  },
  errorMessage: {
    margin: '0 auto',
    color: 'red',
    fontSize: 12,
    marginTop: 18,
    width: 290,
  },
  inputStylesOverrides: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  }
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errored: false,
      errorMessage: '',
    };
  }

  onEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  onPassChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  onSubmit = () => {
    this.setState({ errored: false, errorMessage: '' });
    const { email, password } = this.state;
    const { loginBasic } = this.props;
    loginBasic(email, password);
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }

  render() {
    const { classes } = this.props;
    const {
      errored, errorMessage, email, password
    } = this.state;
    return (
      <div className={classes.pageContainer}>
        <Paper className={classes.contentContainer}>
          <div className={classes.headingContainer}>
            <h3 className={classes.formHeading}>
              Log In
            </h3>
          </div>
          <div className={classes.iconListContainer}>
            <ul className={classes.iconList}>
              <li className={classes.iconListItem}>
                <TwitterIcon />
              </li>
              <li className={classes.iconListItem}>
                <a href="/facebook-auth">
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
              <div className={classes.inputStylesOverrides}>
                <TextField
                  label="Email"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  className={classes.inputLabel}
                  onChange={this.onEmailChange}
                  value={email}
                  type="email"
                  margin="normal"
                />
              </div>
              <div className={classes.inputStylesOverrides}>
                <TextField
                  label="Password"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  className={classes.inputLabel}
                  onChange={this.onPassChange}
                  value={password}
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                />
              </div>
              <Button className={classes.submitButton} onClick={this.onSubmit}>
                  LOG IN
              </Button>
            </form>
          </div>
          <div className={classes.footerContainer}>
            <p className={classes.footerLine}>
                New user?
              {' '}
              <Link to="/signup" style={{ color: '#6200ee', fontWeight: 500 }}>
                Sign Up
              </Link>
                . Or
              {' '}
              <Link to="/reset-password" style={{ color: '#6200ee', fontWeight: 500 }}>
                Forgot Password
              </Link>
                ?
            </p>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapActionsToProps = dispatch => bindActionCreators({
  loginBasic: loginUser
}, dispatch);

export const SignInConnect = withStyles(styles)(connect(null, mapActionsToProps)(SignIn));

SignIn.propTypes = {
  classes: objectOf(any).isRequired,
  loginBasic: func.isRequired
};
