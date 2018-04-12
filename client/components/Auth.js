import React from 'react'
import { auth } from '../firebase'
import { Row, Input, Button, Badge } from 'react-materialize'
import { connect } from 'react-redux'
import { addUser } from '../store/user';

class OAuth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            valid: false,
            wrongPass: false,
            passReset: false,
        }
    }
    render() {
        // input handlers with validation
        const onEmailChange = (event) => {
            this.setState({ email: event.target.value })
            this.setState({ password: '' }) // resets password to account for how react-materialize's validation works, could be changed later
            const valid = document.getElementById("signInEmail").className
            if (valid === 'validate valid' && this.state.password) this.setState({ valid: true })
        }
        const onPassChange = (event) => {
            this.setState({ password: event.target.value })
            const valid = document.getElementById("signInEmail").className
            if (valid === 'validate valid' && this.state.password) this.setState({ valid: true })
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
        // password reset handler
        const onForgotPass = () => {
            auth.sendPasswordResetEmail(this.state.email)
            this.setState({passReset: true, wrongPass: false})
        }
        return (
            <div>
                <Row style={{paddingLeft: 10}}><h4> Log In/Sign Up </h4></Row>
                <Row style={{paddingLeft: 10}}><p> If you do not have an account, one will be created. </p></Row>
                <Row>
                    <Input s={12} id="signInEmail" label="email" type="email" validate onChange={onEmailChange}
                           value={this.state.email}/>
                    <Input s={12} id="signInPassword" label="password" type="password" onChange={onPassChange}
                           value={this.state.password}/>
                </Row>
                <Row style={{paddingLeft: 10}}>
                    <Button onClick={onSubmit} disabled={!this.state.valid}> Submit </Button>
                    {this.state.passReset && <Badge> Password reset has been sent to your email. </Badge>}
                    {this.state.wrongPass && <Badge> Incorrect Password. </Badge>}
                    {this.state.wrongPass && <Button onClick={onForgotPass}> Forgot Password? </Button>}
                </Row>
            </div>
        )
    }
}

const mapDispatch = dispatch => ({ addUser: userID => dispatch(addUser(userID)) })

export default connect(null, mapDispatch)(OAuth)
