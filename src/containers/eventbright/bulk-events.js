import React from 'react';
// import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchEvents} from '../../modules/eventbright/events';
import Leadspace from '../../ui/leadspace';

const renderRows = (events) => {
    return events && events.length ? events.map((event, index) => (
        <p key={`event-${index}`}>{event.name.text}</p>
    )): '';
};

const Editor = props => {
    return (
        <section className="bulk-edit--event-bright">
            <Leadspace title="Event Bulk Editor" tagline="for editing eventbright events" />
            <p>{props.status} - <a onClick={props.fetchEvents}>fetch events</a></p>
            {renderRows(props.events)}
        </section>
    );
};

const mapStateToProps = state => ({
    ...state,
    status: state.events.status,
    events: state.events.data
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchEvents
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor);
