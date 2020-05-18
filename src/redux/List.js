import * as ActionTypes from './ActionTypes';

export const List = (state  = { isLoading: true,
                                        errMess: null,
                                        list:[]}, action) => {
    console.log(action.payload)
    switch (action.type) {
        case ActionTypes.GET_PARTICIPANTS:
        return {...state, isLoading: false, errMess: null, list: action.payload};

        case ActionTypes.PARTICIPANTS_LOADING:
            return {...state, isLoading: true, errMess: null, list: []}

        case ActionTypes.PARTICIPANTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};