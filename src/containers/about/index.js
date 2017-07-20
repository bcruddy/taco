import React from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {increment, incrementAsync, decrement, decrementAsync} from '../../modules/counter';
import Leadspace from '../../ui/leadspace';

const About = (props) => (
    <section className="taco--counter">
        <Leadspace title={`About`} tagline={`Count: ${props.count}`} />
        <main className="container">
            <div className="row">
                <div className="col-md-12">
                    <aside className="btn-group">
                        <button className="btn btn-default"
                            onClick={props.increment}
                            disabled={props.isIncrementing}>
                            Increment
                        </button>
                        <button className="btn btn-default"
                            onClick={props.incrementAsync}
                            disabled={props.isIncrementing}>
                            Increment Async
                        </button>
                    </aside>
                    <br />
                    <aside className="btn-group">
                        <button className="btn btn-default"
                            onClick={props.decrement}
                            disabled={props.isDecrementing}>
                            Decrementing
                        </button>
                        <button className="btn btn-default"
                            onClick={props.decrementAsync}
                            disabled={props.isDecrementing}>
                            Decrement Async
                        </button>
                    </aside>
                </div>
            </div>
        </main>
    </section>
);

const mapStateToProps = state => ({
    count: state.counter.count,
    isIncrementing: state.counter.isIncrementing,
    isDecrementing: state.counter.isDecrementing
});

const mapDispatchToProps = dispatch => bindActionCreators({
    increment,
    incrementAsync,
    decrement,
    decrementAsync,
    changePage: () => push('/about-us')
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(About);
