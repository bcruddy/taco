import React from 'react';
// import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import store from '../../store';
import {fetchEvents} from '../../modules/eventbright/events';
import Leadspace from '../../ui/leadspace';

const renderContent = (props) => {
    switch (props.status) {
    case 'resolved':
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>status</th>
                        <th>Name</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {props.events.map(event => (
                        <tr key={`event-${event.id}`}>
                            <td>{event.status}</td>
                            <td>{event.name.text}</td>
                            <td>{event.start.local}</td>
                            <td>{event.end.local}</td>
                            <td>{event.description.text}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
        break;
    case 'rejected':
        return (
            <div className="">
                <p className="text-center">Uh oh! Something unexpected happened.</p>
            </div>
        );
        break;
    default:
        return (
            <div className="">
                <p className="text-center">loading...</p>
            </div>
        );
    }
};

const Editor = props => {
    if (props.status === 'init') {
        store.dispatch(fetchEvents());
    }

    return (
        <section className="bulk-edit--event-bright">
            <Leadspace title="Event Bulk Editor" tagline="for editing eventbright events" />
            <main className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        {renderContent(props)}
                    </div>
                </div>
            </main>
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
