import React from 'react'
import { Navbar, NavItem } from 'react-materialize'
import { AppBar, Drawer, MenuItem } from 'material-ui'

class Nav extends React.Component {
    constructor(props) {
        super(props)
        this.state = { showMenu: false }
    }

    render() {
        const toggleMenu = () => this.setState({ showMenu: !this.state.showMenu})
        return (
            <div>
                <AppBar
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonClick={ toggleMenu }
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.showMenu}
                    onRequestChange={toggleMenu}
                >
                <MenuItem> Artists </MenuItem>
                <MenuItem> News </MenuItem>
                <MenuItem> Videos </MenuItem>
                <MenuItem> Music </MenuItem>
                <MenuItem> Account </MenuItem>
                </Drawer>
            </div>
        )
    }
}

export default Nav