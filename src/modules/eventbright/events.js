export const FETCH_EVENTS = 'eventbright/events/FETCH_EVENTS';

const ViewState = {
    loading: 0,
    success: 1,
    failed: 2
};

const initialState = {
    status: ViewState.loading,
    data: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EVENTS:
            return {
                ...state,
                data: action.data,
                status: action.status
            };
        default:
            return state;
    }
};

export const fetchEvents = () => {
        return dispatch => {
            dispatch({type: FETCH_EVENTS, status: ViewState.loading});

            fetch('/api/eventbright/events')
                .then(res => res.json())
                .then(data => {
                    dispatch({type: FETCH_EVENTS, data: data.events, status: ViewState.success});
                })
                .catch(err => {
                    dispatch({type: FETCH_EVENTS, status: ViewState.failed});
                });
        };
};
