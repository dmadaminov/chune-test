import React from 'react'
import _ from 'lodash'
import { database, auth } from '../../firebase'
import { Collection, CollectionItem, Row, Button, Col } from 'react-materialize'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
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
            <Row style={{marginBottom: 0}}> <h2 className="chune-feed-title">Currently Followed Artists</h2></Row>
            {/*<Row> <h4 style={{ paddingLeft: 10 }}> Following </h4> </Row>*/}
            <Row className="chune-artists-collection" style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Collection>
                    {props.artists.map(artist => <CollectionItem key={artist}>
                        <Row>
                            <div className="chune-artist-name">{_.startCase(artist)}</div>
                            <div className="chune-artist-actions"> 
                                <Button value={artist} onClick={unfollow}>Unfollow</Button>
                                <a className="btn" href={"/Artist?n="+encodeURI(artist)}>View Feed</a>
                            </div>
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