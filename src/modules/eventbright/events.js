export const FETCH_EVENTS_LOADING = 'eventbright/events/FETCH_EVENTS_LOADING';
export const FETCH_EVENTS_RESOLVED = 'eventbright/events/FETCH_EVENTS_RESOLVED';
export const FETCH_EVENTS_REJECTED= 'eventbright/events/FETCH_EVENTS_REJECTED';

const initialState = {
    status: 'init',
    data: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EVENTS_LOADING:
            return {
                ...state,
                status: 'loading',
                data: []
            };
        case FETCH_EVENTS_RESOLVED:
            console.log(action.data);
            return {
                ...state,
                status: 'resolved',
                data: action.data
            };
        case FETCH_EVENTS_REJECTED:
            return {
                ...state,
                status: 'rejected',
                data: []
            };
        default:
            return state;
    }
};

export const fetchEvents = () => {
        return dispatch => {
            dispatch({type: FETCH_EVENTS_LOADING});

            fetch('/api/eventbright/events')
                .then(res => res.json())
                .then(data => {
                    dispatch({type: FETCH_EVENTS_RESOLVED, data: data.events});
                })
                .catch(error => {
                    dispatch({type: FETCH_EVENTS_REJECTED, error});
                });
        };
};
