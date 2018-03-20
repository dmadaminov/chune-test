import React from 'react'
import { database, auth } from '../../firebase'
import { Collection, CollectionItem, Row } from 'react-materialize'
import { connect } from 'react-redux'
import { addArtists } from '../../store/artists';

const Following = props => {
    const userId = auth.currentUser.uid
    const userRef = database.ref(`users/${userId}/artists`)
    userRef.on('value', snapshot => props.addArtists(Object.keys(snapshot.val())))
    return (
        <div>
            <Row> <h4 style={{ paddingLeft: 10 }}> Following </h4> </Row>
            <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Collection>
                    {props.artists.map(artist => <CollectionItem key={artist}> {artist} </CollectionItem>)}
                </Collection>
            </Row>
        </div>
    )
}

const mapState = store => ({ artists: store.artists })
const mapDispatch = dispatch => ({ addArtists: artists => dispatch(addArtists(artists)) })
export default connect(mapState, mapDispatch)(Following)