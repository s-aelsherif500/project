import * as ActionTypes from './ActionTypes';

export const Groups = (state  = { isLoading: true,
                                        errMess: null,
                                        groups:[]}, action) => {
    console.log(action.payload)
    switch (action.type) {
        case ActionTypes.GET_GROUPS:
        return {...state, isLoading: false, errMess: null, groups: action.payload};

        case ActionTypes.GROUPS_LOADING:
            return {...state, isLoading: true, errMess: null, groups: []}

        case ActionTypes.GROUPS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};