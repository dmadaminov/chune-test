import React from 'react'
import { auth } from '../firebase'
import { Row, Input, Badge } from 'react-materialize'
import { connect } from 'react-redux'
import { addUser } from '../store/user'
import GuestNavbar from './shared/GuestNavbar'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import firebase from 'firebase';

const styles = theme => ({
  pageContainer: {
    backgroundImage: "url(images/background.png)",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
  },  
  contentContainer: {
    marginTop: 59,
    width: 342,
    height: 543,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 8,
    boxShadow: "0 6px 12px 0 rgba(0, 0, 0, 0.3), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
    border: "solid 1px transparent",
    backgroundImage: "linear-gradient(#ffffff, #ffffff), linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1) 5%, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0))",
  },
  headingContainer: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    margintop: 36,
  },
  iconListContainer: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 34,
    height: 18,
  },
  paragraphContainer: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 34,
    height: 15,
  },
  formContainer: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    width: 342,
    marginTop: 34,
  },
  footerContainer: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: 600,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 1.13,
    letterSpacing: 1.3,
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.38)",
    marginTop: 40,
  },
  formHeading: {
    width: 82,
    height: 28,
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#000000",
  },
  iconList: {
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "center",
    height: 28,
    width: 190,
  },
  iconListItem: {
    cursor: "pointer",
  },
  para: {
    width: 125,
    height: 16,
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: 300,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#000000",
  },
  footerLine: {
    margin: 0,
    height: 16,
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: 0.5,
    textAlign: "center",
    color: "#9b9b9b",
  }
})

const GithubIcon = (props) => { 
  return (
    <SvgIcon {...props}>
      <path fill="#181616" fillRule="evenodd" d="M9.194 0A9.156 9.156 0 0 0 0 9.194c0 4.086 2.656 7.458 6.334 8.684.51.102.613-.205.613-.41v-1.531c-2.554.51-3.065-1.226-3.065-1.226-.409-1.022-1.022-1.328-1.022-1.328-.817-.613.103-.511.103-.511.817 0 1.225.92 1.225.92.818 1.43 2.146 1.02 2.657.714.102-.613.306-1.021.612-1.226-2.043-.204-4.188-1.021-4.188-4.494 0-1.022.409-1.84.92-2.452 0-.307-.307-1.226.204-2.452 0 0 .817-.204 2.554.92.613-.205 1.43-.307 2.247-.307s1.533.102 2.35.306c1.736-1.225 2.554-.919 2.554-.919.51 1.226.204 2.247.102 2.452.613.613.92 1.43.92 2.452 0 3.575-2.146 4.29-4.19 4.494.307.307.614.818.614 1.737v2.554c0 .204.204.51.613.409a9.146 9.146 0 0 0 6.231-8.684C18.388 4.188 14.302 0 9.194 0z"/>
    </SvgIcon>
  );
}

const FacebookIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path fill="#4266B2" fillRule="nonzero" d="M17.006 0H.993A.993.993 0 0 0 0 .993v16.013c0 .55.445.994.993.994h8.621v-6.97H7.27V8.311h2.345V6.31c0-2.325 1.42-3.591 3.494-3.591.994 0 1.847.074 2.095.107v2.43h-1.438c-1.128 0-1.346.536-1.346 1.322v1.734h2.691l-.352 2.717H12.42V18h4.587a.994.994 0 0 0 .994-.993V.993A.994.994 0 0 0 17.006 0z"/>
    </SvgIcon>
  );
}

const GoogleIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g fill="none" fillRule="nonzero">
          <path fill="#FBBB00" d="M3.99 10.878l-.627 2.339-2.29.048A8.96 8.96 0 0 1 0 9c0-1.492.363-2.9 1.006-4.139l2.04.374.893 2.026A5.35 5.35 0 0 0 3.649 9c.001.66.12 1.294.34 1.878z"/>
          <path fill="#518EF8" d="M17.843 7.319a9.01 9.01 0 0 1-.04 3.56 8.998 8.998 0 0 1-3.169 5.14v-.001l-2.568-.131-.363-2.269a5.364 5.364 0 0 0 2.307-2.739H9.198V7.32h8.645z"/>
          <path fill="#28B446" d="M14.634 16.018A8.962 8.962 0 0 1 9 18a8.999 8.999 0 0 1-7.927-4.735l2.916-2.387a5.351 5.351 0 0 0 7.713 2.74l2.932 2.4z"/>
          <path fill="#F14336" d="M14.745 2.072l-2.916 2.387A5.353 5.353 0 0 0 3.94 7.26l-2.932-2.4A8.998 8.998 0 0 1 9 0c2.184 0 4.186.778 5.745 2.072z"/>
      </g>
    </SvgIcon>
  );
}

const TwitterIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path fill="#1DA1F2" fillRule="nonzero" d="M20.92 2c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C16.83.5 15.72 0 14.46 0c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C6.74 5.09 3.57 3.38 1.46.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C1.9 16.29 4.16 17 6.58 17c7.88 0 12.21-6.54 12.21-12.21 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
    </SvgIcon>
  );
}

class OAuth extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        email: '',
        password: '',
        passwordConfirmation: '',
        // wrongPass: false,
        // passReset: false,
        validations: {
          emailFormat: false,
          passwordMatch: false,
        }
      }
    }

    validateEmail = (email) => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    validateNotBlank = (value) => {
      return value !== "";
    }

    validatePasswordMatch = (pass, repeatPass) => {
      return pass == repeatPass;
    }

    isValid = () => {
      return this.state.validations.emailFormat && this.state.validations.passwordMatch;
    }

    render() {
      const { classes } = this.props;
        // input handlers with validation
        const onEmailChange = (event) => {
          this.setState({ email: event.target.value })
          // this.setState({ password: '' }) // resets password to account for how react-materialize's validation works, could be changed later
          const valid = this.validateNotBlank(event.target.value) && this.validateEmail(event.target.value);
            this.setState({ 
              validations: {
               ...this.state.validations,
               emailFormat: valid,
              },
            })
        }

        const onPassChange = (event) => {
          this.setState({ password: event.target.value })
          const valid = this.validateNotBlank(event.target.value) && this.validatePasswordMatch(event.target.value, this.state.passwordConfirmation);
          this.setState({
            validations: {
             ...this.state.validations,
             passwordMatch: valid,
            },
          })
        }

        const onPassRepeatChange = (event) => {
          this.setState({ passwordConfirmation: event.target.value })
          const valid = this.validateNotBlank(event.target.value) && this.validatePasswordMatch(this.state.password, event.target.value);
          this.setState({
            validations: {
             ...this.state.validations,
             passwordMatch: valid,
            },
          })
        }
        // submit handler
        const onSubmit = () => {
            const { email, password } = this.state
            auth.fetchProvidersForEmail(email) // checks to see if email is in use
                .then(res => {
                    if (res.length) auth.signInWithEmailAndPassword(email, password) // signs in user if no errors
                        .then(() => {
                            this.props.addUser(auth.currentUser.uid)
                        })
                        .catch(error => this.setState({ wrongPass: true })) // updates state to show wrongPass elements
                    else auth.createUserWithEmailAndPassword(email, password) // signs up user
                        .then(() => this.props.addUser(auth.currentUser.uid))
                        .catch(error => console.log(error))
                })
        }

        // console.log(firebase.auth.GoogleAuthProvider());

        // const googleAuthHandler = () => {
        // // const onForgotPass = () => {
        //   var provider = new firebase.auth.GoogleAuthProvider();

        // } 
        // password reset handler
        // const onForgotPass = () => {
        //     auth.sendPasswordResetEmail(this.state.email)
        //     this.setState({passReset: true, wrongPass: false})
        // }


        // <div className="chune-auth-container">
        //     <Row style={{paddingLeft: 10, paddingRight: 10, marginBottom: 0}}><h4 style={{marginBottom: 0}}> Log In/Sign Up </h4></Row>
        //     <Row style={{paddingLeft: 10}}><p> If you do not have an account, one will be created. </p></Row>
        //     <Row>
        //         <Input s={12} id="signInEmail" label="email" type="email" validate onChange={onEmailChange}
        //                value={this.state.email}/>
        //         <Input s={12} id="signInPassword" label="password" type="password" onChange={onPassChange}
        //                value={this.state.password}/>
        //     </Row>
        //     <Row style={{paddingLeft: 10}}>
        //         <Button onClick={onSubmit} disabled={!this.state.valid}> Submit </Button>
        //         {this.state.passReset && <Badge> Password reset has been sent to your email. </Badge>}
        //         {this.state.wrongPass && <Badge> Incorrect Password. </Badge>}
        //         {this.state.wrongPass && <Button onClick={onForgotPass}> Forgot Password? </Button>}
        //     </Row>
        // </div>
        return (
          <div className={classes.pageContainer}>
            <GuestNavbar />
            <Paper className={classes.contentContainer}>
              <div className={classes.headingContainer}>
                <h3 className={classes.formHeading}>Sign Up</h3>
              </div>
              <div className={classes.iconListContainer}>
                <ul className={classes.iconList}>
                  <li className={classes.iconListItem}>
                    <TwitterIcon />
                  </li>
                  <li className={classes.iconListItem}>
                    <FacebookIcon />
                  </li>
                  <li className={classes.iconListItem}>
                    <GoogleIcon />
                  </li>
                  <li className={classes.iconListItem}>
                    <GithubIcon />
                  </li>
                </ul>
              </div>
              <div className={classes.paragraphContainer}>
                <p className={classes.para}>Or use email instead</p>
              </div>
              <div className={classes.formContainer}>
                <form className={classes.signupForm} noValidate autoComplete="off">
                  <TextField
                    label="Email"
                    type="email"
                    error={!this.state.validations.emailFormat}
                    onChange={onEmailChange}
                    value={this.state.email}
                    InputProps={{
                        disableUnderline: true,
                    }}
                    style={{height: '50px'}}
                    placeholder="Email"
                    fullWidth
                  />
                 <TextField
                    label="Password"
                    InputProps={{
                        disableUnderline: true,
                    }}
                    error={!this.state.validations.passwordMatch}
                    type="password"
                    onChange={onPassChange}
                    value={this.state.password}
                    placeholder="Password"
                    fullWidth
                    style={{height: '50px', marginTop: '31px'}}
                  />
                  <TextField
                    label="Password"
                    InputProps={{
                        disableUnderline: true,
                    }}
                    error={!this.state.validations.passwordMatch}
                    type="password"
                    onChange={onPassRepeatChange}
                    value={this.state.passwordConfirmation}
                    placeholder="Repeat Password"
                    fullWidth
                    margin="dense"
                    style={{height: '50px', marginTop: '31px'}}
                  />
                  <Button className={classes.submitButton} onClick={onSubmit} disabled={!this.isValid()}>
                    SIGN UP
                  </Button>
                </form>
              </div>
              <div className={classes.footerContainer}>
                <p className={classes.footerLine}> Already have an account? <a href="/login" style={{color: "#6200ee", fontWeight: 500 }}>Log in</a></p>              
              </div>
            </Paper>
          </div>
        )
    }
}

const mapDispatch = dispatch => ({ addUser: userID => dispatch(addUser(userID)) })

export default withStyles(styles)(connect(null, mapDispatch)(OAuth));
