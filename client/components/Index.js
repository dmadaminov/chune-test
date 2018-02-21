import React from 'react'
import Landing from './Landing'
import Nav from './Nav'
import { Row } from 'react-materialize'

const Index = (props) => {
    return (
        <div>
            <Row>
                <Nav />
            </Row>
            <Row>
                <Landing />
            </Row>
        </div>
    )
}

export default Index