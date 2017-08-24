import React from 'react';
import Leadspace from '../../ui/leadspace';

const tagline = `probably not the worst crypto resource you've found so far. probably.`;
const Home = props => (
    <section className="taco--counter">
        <Leadspace title="Home" tagline={tagline} />
        <main className="container">
            <div className="row">
                <div className="col-md-12">
                    <p>good luck.</p>
                </div>
            </div>
        </main>
    </section>
);

export default Home;
