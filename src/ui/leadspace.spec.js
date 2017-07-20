import React from 'react';
import Leadspace from './leadspace';
import {mount} from 'enzyme';

describe('<Leadspace />', () => {
    it('displays with a title', () => {
        let leadspace = mount(<Leadspace title="test1" />);

        expect(leadspace.find('h1').text()).toEqual('test1');
    });

    it('displays the tagline when given', () => {
        let leadspace = mount(<Leadspace title="test1" tagline="hello world" />);

        expect(leadspace.find('.tagline').text()).toEqual('hello world');
    });
});
