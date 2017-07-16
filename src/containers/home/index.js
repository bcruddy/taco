import React from 'react';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {increment, incrementAsync, decrement, decrementAsync} from '../../modules/counter';

const Home = props => (
    <section className="taco--home">
        <header className="jumbotron">
            <div className="container">
                <h1>Home</h1>
                <p>Count: {props.count}</p>
            </div>
        </header>
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
)(Home);
