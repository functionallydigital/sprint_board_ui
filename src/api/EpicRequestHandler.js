export function createEpic(session, epic) {
  return fetch(`${global.apiUrl}/epics`, {
      method: 'POST',
      headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'SessionKey' : session.session_key
      },
      body: JSON.stringify(epic)
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function loadEpic(session, epicId) {
  return fetch(`${global.apiUrl}/epics/${epicId}`, {
      headers : {
        'SessionKey' : session.session_key
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function updateEpic(session, epic) {
  return fetch(`${global.apiUrl}/epics/${epic.id}`, {
      method: 'PUT',
      headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'SessionKey' : session.session_key
      },
      body: JSON.stringify(epic)
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function updateEpicSprint(session, epicId, sprint) {
  return fetch(`${global.apiUrl}/epics/${epicId}/update_sprint_number`, {
      method: 'PUT',
      headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'SessionKey' : session.session_key
      },
      body: JSON.stringify(sprint)
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}
