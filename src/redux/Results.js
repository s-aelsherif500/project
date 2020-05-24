import * as ActionTypes from './ActionTypes';

export const Results = (state  = { isLoading: true,
                                        errMess: null,
                                        results:[]}, action) => {
    console.log(action.payload)
    switch (action.type) {
        case ActionTypes.GET_RESULTS:
        return {...state, isLoading: false, errMess: null, results: action.payload};

        case ActionTypes.RESULTS_LOADING:
            return {...state, isLoading: true, errMess: null, results: []}

        case ActionTypes.RESULTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};