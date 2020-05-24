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
  dispatch(profileLoading())
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
    .then(response => dispatch(getProfile(response)))
    .then(response => console.log(response.payload))
    .catch(error => dispatch(profileFailed(error.message)));
}
export const getProfile = (response) =>({
  type: ActionTypes.GET_PROFILE,
  payload:response
})
export const profileFailed = (errmess) =>({
  type: ActionTypes.PROFILE_FAILED,
  payload:errmess
})
export const profileLoading = () =>({
  type: ActionTypes.PROFILE_LOADING
})
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
  console.log(id)
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
/*--------------------------------POST Update GROUP -----------------------------------*/
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
/*--------------------------------Post Delete Group---------------------------*/
export const postDeleteGroup = (id) => (dispatch) => {
  console.log("DELETING GROUP")
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);

  var raw = JSON.stringify(
    {
      "id":id,
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.deleteGroup, requestOptions)
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
/*--------------------------------Fetch Quizes--------------------------------*/
export const fetchQuizes = () => (dispatch) => {
  console.log("fetching quizes")
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(baseURL.allQuiz, requestOptions)
    .then(response => response.json())
    .then(response => dispatch(getQuizes(response)))
    .then(response => console.log(response.payload))
    .catch(error => dispatch(quizesFailed(error.message)));
}
export const getQuizes = (response) =>({
  type: ActionTypes.GET_QUIZES,
  payload:response
})
export const quizesFailed = (errmess) =>({
  type: ActionTypes.QUIZES_FAILED,
  payload:errmess
})
/*--------------------------------POST a Quiz -----------------------------------*/
export const postQuiz = (Qname, items) => (dispatch) => {
  console.log("POSTING A QUIZ")
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);
  var raw = JSON.stringify(
    {
      "name":Qname,
      "items":items
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.createQuiz, requestOptions)
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

/*--------------------------------POST Update QUIZ -----------------------------------*/
export const postUpdateQuiz= (id, Qname, items) => (dispatch) => {
  console.log("UPDATING A NEW QUIZ")
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);
  console.log("----------------------------",items)
  var raw = JSON.stringify(
    {
      "id":id,
      "name":Qname,
      "items":items
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.updateQuiz, requestOptions)
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
/*------------------------------------Delete Quiz -------------------------------------*/
export const postDelete= (id) => (dispatch) => {
  console.log("DELETE QUIZ")
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);
  var raw = JSON.stringify(
    {
      "id":id
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.deleteQuiz, requestOptions)
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

/*------------------------------------FETCH ALL USERS----------------------------------*/
export const fetchUsers = () => (dispatch) => {
  dispatch(usersLoading())
  console.log("fetching users")
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(baseURL.allUsers, requestOptions)
    .then(response => response.json())
    .then(response => dispatch(getUsers(response)))
    .then(response => console.log(response.payload))
    .catch(error => dispatch(usersFailed(error.message)));
}
export const getUsers = (response) =>({
  type: ActionTypes.GET_USERS,
  payload:response
})
export const usersFailed = (errmess) =>({
  type: ActionTypes.USERS_FAILED,
  payload:errmess
})
export const usersLoading = () =>({
  type: ActionTypes
})

/*--------------------------------POST USER -----------------------------------*/
export const postUser= (username, password) => (dispatch) => {
  console.log("POSTING A NEW USER")
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);
  var raw = JSON.stringify(
    {
      "username":username,
      "password":password,
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.createUser, requestOptions)
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
/*--------------------------------POST UPDATE USER -----------------------------------*/
export const postUpdateUser= (username, id) => (dispatch) => {
  console.log("UPDATING USER")
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);
  var raw = JSON.stringify(
    {
      "username":username,
      "id":id,
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.updateUser, requestOptions)
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
/*--------------------------------POST UPDATE PASSWORD -----------------------------------*/
export const postUpdatePassword= (password, id) => (dispatch) => {
  console.log("UPDATING PASSWORD")
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);
  var raw = JSON.stringify(
    {
      "password":password,
      "id":id,
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.changePassword, requestOptions)
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
/*--------------------------------POST DELETE USER-----------------------------------*/
export const postDeleteUser= (id) => (dispatch) => {
  console.log("UPDATING PASSWORD")
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);
  var raw = JSON.stringify(
    {
      "id":id,
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.deleteUser, requestOptions)
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
/*---------------------------------Post Send Survey to Part-------------------------------------*/
export const postSendToPart= (id,quiz_id) => (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);
  var raw = JSON.stringify(
    {
      "id":id,
      "quiz_id":quiz_id
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.sendPart, requestOptions)
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

/*---------------------------------Post Send Survey to Group-------------------------------------*/
export const postSendToGroup= (id,quiz_id) => (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);
  var raw = JSON.stringify(
    {
      "id":id,
      "quiz_id":quiz_id
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.sendGroup, requestOptions)
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

/*---------------------------------Post Q and A-------------------------------------*/
export const postQandA= (access_code) => (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(
    {
      "access_code":access_code
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.QandA, requestOptions)
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

/*---------------------------------Post Start-------------------------------------*/
export const postStart= (access_code) => (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(
    {
      "access_code":access_code
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.start, requestOptions)
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

/*---------------------------------Post Finish-------------------------------------*/
export const postFinish= (access_code) => (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(
    {
      "access_code":access_code
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.finish, requestOptions)
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
/*---------------------------------Post Answer Gender -------------------------------------*/
export const postGender= (access_code,gender) => (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(
    {
      "access_code":access_code,
      "gender":gender
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.gender, requestOptions)
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
/*---------------------------------Post Answer Age -------------------------------------*/
export const postAge= (access_code,age) => (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(
    {
      "access_code":access_code,
      "age":age
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.age, requestOptions)
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
/*---------------------------------Post Answer Education level -------------------------------------*/
export const postEduLevel= (access_code,educational_level) => (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(
    {
      "access_code":access_code,
      "educational_level":educational_level
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.eduLevel, requestOptions)
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

/*---------------------------------Post Current School -------------------------------------*/
export const postCurSchool= (access_code,current_school) => (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(
    {
      "access_code":access_code,
      "current_school":current_school
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.curSchool, requestOptions)
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
/*---------------------------------Post High Education -------------------------------------*/
export const postHighEdu= (access_code,highest_education) => (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  console.log(localStorage.getItem("highEdu"), String(localStorage.getItem("highEdu")),access_code)
  
  var raw = JSON.stringify(
    {
      "access_code":String(access_code),
      "highest_education":"Master"
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch("http://127.0.0.1:3333/api/v1/survey/highest_education", requestOptions)
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
/*---------------------------------Post Text Question -------------------------------------*/
export const postTextQ= (access_code,survey_item_id,answer) => (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(
    {
      "access_code":access_code,
      "survey_item_id":survey_item_id,
      "answer":answer
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.textQ, requestOptions)
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
/*---------------------------------Post Option Question -------------------------------------*/
export const postOptionQ= (access_code,survey_item_id,survey_item_option_id) => (dispatch) => {
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(
    {
      "access_code":access_code,
      "survey_item_id":survey_item_id,
      "survey_item_option_id":survey_item_option_id
    });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(baseURL.optionQ, requestOptions)
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
/* --------------------------------Fetch Results----------------------------  */
export const fetchResults = () => (dispatch) => {
  dispatch(resultsLoading())
  console.log("fetching results")
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `${localStorage.getItem("bearer")} ${localStorage.getItem("token")}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(baseURL.surveys, requestOptions)
    .then(response => response.json())
    .then(response => dispatch(getResults(response)))
    .then(response => console.log(response.payload))
    .catch(error => dispatch(resultsFailed(error.message)));
}
export const getResults = (response) =>({
  type: ActionTypes.GET_RESULTS,
  payload:response
})
export const resultsFailed = (errmess) =>({
  type: ActionTypes.RESULTS_FAILED,
  payload:errmess
})
export const resultsLoading = () =>({
  type: ActionTypes.RESULTS_LOADING
})