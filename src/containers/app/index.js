import React from 'react';
import {Route, Link} from 'react-router-dom';
import Home from '../home';
import About from '../about';
import Editor from '../eventbright/bulk-events';

const App = () => (
    <section className="taco--app">
        <header>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right position-indicators">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about-us">About</Link>
                            </li>
                            <li>
                                <Link to="/events">Events</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <Route exact path="/" component={Home} />
        <Route exact path="/about-us" component={About} />
        <Route exact path="/events" component={Editor} />
    </section>
);

export default App;
