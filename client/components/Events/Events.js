import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Collection, CollectionItem, Button, Row } from 'react-materialize'
import { Redirect } from 'react-router-dom'
import { fetchArtist } from '../../store/currentArtist'
import { fetchEvents } from "../../store/events"
import Nav from '../Nav'
import '../../assets/global.css'

const Events = props => {
    const loadEvents = e => {
        const artist = e.target.value
        props.fetchEvents(artist)
    }
    if (!props.artists.length) return <Redirect to="/artists"/>
    return (
        <div>
            <Nav />
            <div className="chune-feed-container">
                <Row style={{marginBottom: 0}}> <h2 className="chune-feed-title">Events</h2> </Row>
                <Row >
                    <div className="chune-music-navigation" style={{paddingBottom: 10}}>Choose an artist</div>
                    {
                        props.artists.map(artist => {
                            const additionalClassName = props.currentArtist && props.currentArtist.name.toLowerCase() == artist.toLowerCase() ? 'disabled' : ''
                            return (
                                <Button key={artist} onClick={loadEvents} value={artist} className={additionalClassName} style={{margin:'0 10px 10px 0'}}> {_.startCase(artist)} </Button>
                            )
                        })

                    }
                </Row>
                { props.artistEvents && <Row> Click an artist and then check the ADD_EVENTS action in the console for event information. </Row> }
            </div>
        </div>
    )
}

const mapState = store => ({ artists: store.artists, currentArtist: store.currentArtist, artistEvents: store.events })
const mapDispatch = dispatch => ({ fetchEvents: name => dispatch(fetchEvents(name)) })

export default connect(mapState, mapDispatch)(Events)
