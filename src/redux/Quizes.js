import * as ActionTypes from './ActionTypes';

export const Quizes = (state  = { isLoading: true,
                                        errMess: null,
                                        quizes:[]}, action) => {
    console.log(action.payload)
    switch (action.type) {
        case ActionTypes.GET_QUIZES:
        return {...state, isLoading: false, errMess: null, quizes: action.payload};

        case ActionTypes.QUIZES_LOADING:
            return {...state, isLoading: true, errMess: null, quizes: []}

        case ActionTypes.QUIZES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};