export function createSprint(session, sprint) {
  return fetch(`${global.apiUrl}/sprints`, {
    method: 'POST',
    headers: {
      'Accept' : 'application/json',
      'Content-Type': 'application/json',
      'SessionKey': session.session_key
    },
    body: JSON.stringify(sprint)
  })
  .then((response) => response.json())
  .catch((error) => {
    console.error(error);
  })
}

export function loadSprint(session, sprintId) {
  return fetch(`${global.apiUrl}/sprints/${sprintId}`, {
      headers : {
        'SessionKey' : session.session_key
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}