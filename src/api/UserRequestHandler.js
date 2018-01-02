export function logUserIn(loginCredentials) {
  return fetch(`${global.apiUrl}/login`, {
      method: 'POST',
      headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginCredentials)
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function loadUserSelectorList(session) {
  return fetch(`${global.apiUrl}/users/selector_list`, {
      headers : {
        'SessionKey' : session.session_key
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function registerUser(user) {
  return fetch(`${global.apiUrl}/users`, {
      method: 'POST',
      headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function updateUser(session, user, userId) {
  return fetch(`${global.apiUrl}/users/${userId}`, {
    method: 'PUT',
      headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'SessionKey' : session.session_key
      },
      body: JSON.stringify(user)
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}
