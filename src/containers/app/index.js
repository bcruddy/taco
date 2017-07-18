import React from 'react';
import {Route, Link} from 'react-router-dom';
import Home from '../home';
import About from '../about';
import Editor from '../eventbright/bulk-events';

const App = () => (
    <section className="taco--app">
        <header>
            <Link to="/">Home</Link>
            <Link to="/about-us">About</Link>
            <Link to="/events">Events</Link>
        </header>
        <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/about-us" component={About} />
            <Route exact path="/events" component={Editor} />
        </main>
    </section>
);

export default App;
