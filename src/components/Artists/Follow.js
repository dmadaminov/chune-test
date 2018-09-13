import React from 'react'
import { Row, Button, Autocomplete } from 'react-materialize'
import { connect } from 'react-redux'
import { clearArticles } from '../../store/articles'
import { clearVideos } from '../../store/videos'
import { fetchArtistAutocompletions, clearCompletions } from "../../store/autocomplete"

const Follow = props => {
    const userId = auth.currentUser.uid
    const onSubmit = () => {
        const artistName = document.getElementById('artistName').value;
        clearAll();
    };
    const onAutocomplete = (value) => {
        clearAll();
    };
    const autocompleteArtists = (e, v) => {
        props.fetchArtistAutocompletions(v);
    };
    const clearAll = () => {
        props.clearArticles();
        props.clearVideos();
        props.clearCompletions()
    };

    return (
        <div>
            <Row>
                <Row style={{marginBottom: 0}}> <h2 className="chune-feed-title">Follow an Artist</h2></Row>
            </Row>
            <Row className="chune-follow-element">
                <Autocomplete title="Artist Name" id="artistName" onChange={autocompleteArtists}
                              data={props.artistAutocompletions} limit={5} onAutocomplete={onAutocomplete}
                />
                <Button onClick={onSubmit} className="chune-follow-button"> Follow </Button>
            </Row>
        </div>
    )
}

const mapState = ({ artistAutocompletions }) => ({ artistAutocompletions })

const mapDispatch = dispatch => ({
    clearArticles: () => dispatch(clearArticles()),
    clearVideos: () => dispatch(clearVideos()),
    fetchArtistAutocompletions: (name) => dispatch(fetchArtistAutocompletions(name)),
    clearCompletions: () => dispatch(clearCompletions())
});

export default connect(mapState, mapDispatch)(Follow)