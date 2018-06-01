import React from 'react'
import { Row, Input, Button } from 'react-materialize'
import { database, auth } from '../../firebase'
import { connect } from 'react-redux'
import { clearArticles } from '../../store/articles'
import { clearVideos } from '../../store/videos'

const Follow = props => {
    const userId = auth.currentUser.uid
    const onSubmit = () => {
        const artistName = document.getElementById('artistName').value.toLowerCase()
        database.ref(`users/${userId}/artists`).update({[artistName]: true})
        props.clearArticles()
        props.clearVideos()
    }
    return (
        <div>
            <Row>
                <Row style={{marginBottom: 0}}> <h2 className="chune-feed-title">Follow an Artist</h2></Row>
                {/*<h4 style={{ paddingLeft: 10 }}> Follow </h4>*/}
            </Row>
            <Row className="chune-follow-element">
                <Input label="Artist Name" id="artistName"/>
                <Button onClick={onSubmit} className="chune-follow-button"> Follow </Button>
            </Row>
        </div>
    )
}

const mapDispatch = dispatch => ({ 
    clearArticles: () => dispatch(clearArticles()),
    clearVideos: () => dispatch(clearVideos())
})

export default connect(null, mapDispatch)(Follow)