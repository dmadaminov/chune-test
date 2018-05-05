import React from 'react'
import _ from 'lodash'
import { database, auth } from '../../firebase'
import { Collection, CollectionItem, Row, Button, Col } from 'react-materialize'
import { connect } from 'react-redux'
import { addArtists, deleteArtist } from '../../store/artists';

const Following = props => {
    const userId = auth.currentUser.uid
    const userRef = database.ref(`users/${userId}/artists`)
    userRef.on('value', snapshot => {
        // console.log(Object.keys(snapshot.val()))
        if (props.artists.toString() !== Object.keys(snapshot.val()).toString()) props.addArtists(Object.keys(snapshot.val()))
    })
    const unfollow = e => {
        const artist = e.target.value
        // console.log(artist)
        const ref = database.ref(`users/${userId}/artists`)
        ref.child(artist).remove()
    }
    return (
        <div>
            <Row> <h4 style={{ paddingLeft: 10 }}> Following </h4> </Row>
            <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Collection>
                    {props.artists.map(artist => <CollectionItem key={artist}>
                        <Row>
                            <Col s={10}>{_.startCase(artist)}</Col>
                            <Col s={2}> <Button value={artist} onClick={unfollow}> Unfollow </Button></Col>
                        </Row>
                        </CollectionItem>)}
                </Collection>
            </Row>
        </div>
    )
}

const mapState = store => ({ artists: store.artists })
const mapDispatch = dispatch => ({ 
    addArtists: artists => dispatch(addArtists(artists)),
    deleteArtist: artist => dispatch(deleteArtist(artist))
})
export default connect(mapState, mapDispatch)(Following)