import React from 'react'
import { Button } from 'react-materialize'
import { auth } from '../../firebase'
import '../../assets/global.css'

class ChangePass extends React.Component {
    constructor(props) {
        super(props)
        this.state = { email: '' }
    }

    componentWillMount() {
        auth
            .onAuthStateChanged(user => {
                if (user) this.setState({ email: user.email })
            })
    }
    render() {
        const sendEmail = () => {
            auth
                .sendPasswordResetEmail(this.state.email)
                .then(() => alert('Password reset email has been sent to your email!'))
        }
        return <Button onClick={sendEmail}> Reset Password </Button>
    }

}

export default ChangePass