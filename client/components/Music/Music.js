// import React from 'react'
// import { connect } from 'react-redux'
// import _ from 'lodash'
// import { Collection, CollectionItem, Button, Row } from 'react-materialize'
// import { Redirect } from 'react-router-dom'
// import { fetchArtist } from '../../store/currentArtist'
// import Player from './Player'
// import '../../assets/global.css'

// const Music = props => {
//     const loadSongs = e => {
//         const artist = e.target.value
//         props.fetchArtist(artist)
//     }
//     if (!props.artists.length) return <Redirect to="/artists"/>
//     return (
//         <div>
//             <div className="chune-feed-container">
//                 <Row style={{marginBottom: 0}}> <h2 className="chune-feed-title">Music</h2> </Row>
//                 <Row >
//                     <div className="chune-music-navigation" style={{paddingBottom: 10}}>Choose an artist</div>
//                     {
//                         props.artists.map(artist => {
//                             const additionalClassName = props.currentArtist && props.currentArtist.name.toLowerCase() == artist.toLowerCase() ? 'disabled' : ''
//                             return (
//                                 <Button key={artist} onClick={loadSongs} value={artist} className={additionalClassName} style={{margin:'0 10px 10px 0'}}> {_.startCase(artist)} </Button>
//                             )
//                         })
//                     }
//                 </Row>
//                 {props.currentArtist && props.currentArtist.artistId && <Row> <Player artistId={props.currentArtist.artistId} /> </Row>}

//             </div>

//         </div>
//     )
// }

// const mapState = store => ({ artists: store.artists, currentArtist: store.currentArtist })
// const mapDispatch = dispatch => ({ fetchArtist: name => dispatch(fetchArtist(name)) })

// export default connect(mapState, mapDispatch)(Music)
