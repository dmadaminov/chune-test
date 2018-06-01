import React from 'react'
import { Navbar, NavItem } from 'react-materialize'
import { AppBar, Drawer, MenuItem } from 'material-ui'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Nav extends React.Component {
    constructor(props) {
        super(props)
        this.state = { showMenu: false }
    }

    render() {
        const toggleMenu = () => this.setState({ showMenu: !this.state.showMenu })
        return (
            <div>
                {/* menu doesn't show up if user is not logged in */}
                {/* {!this.props.userID && <AppBar showMenuIconButton={false} />} */}
                {/* {this.props.userID && */}
                    <div>
                        <AppBar
                            iconClassNameRight="muidocs-icon-navigation-expand-more"
                            onLeftIconButtonClick={toggleMenu}
                        />
                        <Drawer
                            docked={false}
                            width={200}
                            open={this.state.showMenu}
                            onRequestChange={toggleMenu}
                        >
                            <MenuItem containerElement={<Link to='/' />}> Home  </MenuItem>
                            <MenuItem containerElement={<Link to='/artists' />}> Artists  </MenuItem>
                            <MenuItem containerElement={<Link to='/news' />}> News </MenuItem>
                            <MenuItem containerElement={<Link to='/videos' />}> Videos </MenuItem>
                            <MenuItem containerElement={<Link to='/music' />}> Music </MenuItem>
                            <MenuItem containerElement={<Link to='/account' />}> Account </MenuItem>
                        </Drawer>
                    </div>
                {/* } */}
            </div>
        )
    }
}


const mapState = store => ({ userID: store.user })

export default connect(mapState, null)(Nav)
