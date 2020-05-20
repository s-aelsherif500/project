import * as ActionTypes from './ActionTypes';

export const Profile = (state  = { isLoading: true,
                                        errMess: null,
                                        profile:[]}, action) => {
    console.log(action.payload)
    switch (action.type) {
        case ActionTypes.GET_PROFILE:
        return {...state, isLoading: false, errMess: null, profile: action.payload};

        case ActionTypes.PROFILE_LOADING:
            return {...state, isLoading: true, errMess: null, profile: []}

        case ActionTypes.PROFILE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};