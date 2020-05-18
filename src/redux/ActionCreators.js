import * as ActionTypes from './ActionTypes';
import * as baseURL from './baseURL'

export const getToken = (response) => {
  localStorage.setItem("token","null")
  localStorage.setItem("token",response.payload.data.access_token.token)
  localStorage.setItem("bearer",response.payload.data.access_token.type)
  return(response)
}

/*--------------------------LOGIN--------------------------*/

export const postLOGIN = (username, password) => (dispatch) => {
  dispatch(authLoading())
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({"username":username,"password":password});

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.login, requestOptions)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
    .then(response => response.json())
    .then((response) => dispatch(getAuth(response)))
    .then((response) => getToken(response))
    .catch(error => dispatch(authFailed(error.message)));
};

export const getAuth = (response) => ({
  type: ActionTypes.GET_AUTH,
  payload: response
});
export const authLoading = ()=> ({
  type: ActionTypes.AUTH_LOADING,
})
export const authFailed = (errmess) =>({
  type: ActionTypes.AUTH_FAILED,
  payload: errmess
})
/*----------------------------------FETCH LOGOUT-------------------------------*/
export const fetchLOGOUT = () => (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(baseURL.logout, requestOptions)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
    .then(response => response.json())
    .then(localStorage.setItem("token",null))
    .catch(error => console.error(error.message));
};
/* --------------------------------Fetch Profile----------------------------  */
export const fetchProfile = () => (dispatch) => {
  console.log("fetching profile")
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(baseURL.profile, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
/*--------------------------------Fetch Participants-------------------------- */
export const fetchParticipants = () => (dispatch) => {
  console.log("fetching participants")
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(baseURL.allParticipants, requestOptions)
    .then(response => response.json())
    .then(response => dispatch(getParticipants(response)))
    .then(response => console.log(response.payload))
    .catch(error => dispatch(participantsFailed(error.message)));
}
export const getParticipants = (response) =>({
  type: ActionTypes.GET_PARTICIPANTS,
  payload:response
})
export const participantsFailed = (errmess) =>({
  type: ActionTypes.PARTICIPANTS_FAILED,
  payload:errmess
})
/* --------------------------------- ADD Participant ----------------------------- */
export const postParticipant = (first_name, last_name, email) => (dispatch) => {
  console.log("POSTING A NEW MEMEBER")
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);

  var raw = JSON.stringify({"first_name":first_name,"last_name":last_name,"email":email});

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.createParticipant, requestOptions)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
    .then(response => response.json())
    .catch(error => console.log(error.message));
};
/*----------------------------------Edit Participant ------------------------------*/
export const postUpdatePart = (first_name, last_name, email, id) => (dispatch) => {
  console.log("UPDATING A NEW MEMEBER")
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);

  var raw = JSON.stringify({"first_name":first_name,"last_name":last_name,"email":email, "id":id});

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.updateParticipant, requestOptions)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error.message));
};
/*-----------------------------------DELETE PERSON------------------------------*/
export const postDeletePart = (id) => (dispatch) => {
  console.log("DELETING THIS MEMEBER")
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);

  var raw = JSON.stringify({"id":id});

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.deleteParticipant, requestOptions)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error.message));
};
/*--------------------------------Fetch Groups--------------------------------*/
export const fetchGroups = () => (dispatch) => {
  console.log("fetching groups")
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(baseURL.allGroups, requestOptions)
    .then(response => response.json())
    .then(response => dispatch(getGroups(response)))
    .then(response => console.log(response.payload))
    .catch(error => dispatch(groupsFailed(error.message)));
}
export const getGroups = (response) =>({
  type: ActionTypes.GET_GROUPS,
  payload:response
})
export const groupsFailed = (errmess) =>({
  type: ActionTypes.GROUPS_FAILED,
  payload:errmess
})
/*--------------------------------POST a GROUP -----------------------------------*/
export const postGroup = (name, participants) => (dispatch) => {
  console.log("POSTING A NEW GROUP")
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);

  var raw = JSON.stringify(
    {
      "name":name,
      "participants":participants
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.createGroup, requestOptions)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
    .then(response => response.json())
    .catch(error => console.log(error.message));
};
/*--------------------------------POST a GROUP -----------------------------------*/
export const postUpdateGroup = (name, id, participants) => (dispatch) => {
  console.log("UPDATING A NEW GROUP")
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);

  var raw = JSON.stringify(
    {
      "name":name,
      "id":id,
      "participants":participants
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.updateGroup, requestOptions)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
    .then(response => response.json())
    .catch(error => console.log(error.message));
};