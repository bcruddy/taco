import React from 'react';
// import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchEvents} from '../../modules/eventbright/events';

const renderRows = (events) => {
    return events.map((event, index) => {
        return (<p key={`event-${index}`}>{event.name.text}</p>);
    });
};

const renderLoadingState = () => {
    return (<p>loading...</p>);
};

const Editor = props => {
    return (
        <section className="bulk-edit--event-bright">
            <h3>Event Bright Bulk Editor</h3>
            <p>{props.status} - <a onClick={props.fetchEvents}>fetch events</a></p>
            {props.events && props.events.length ? renderRows(props.events) : renderLoadingState()}
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
