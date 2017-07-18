import React from 'react';

const Leadspace = props => {
    const {title, tagline} = props;

    return (
        <header className="jumbotron">
            <div className="container">
                <h1>{title}</h1>
                {tagline ? (
                    <p className="tagline">{tagline}</p>
                ) : ''}
            </div>
        </header>
    );
};

export default Leadspace;
