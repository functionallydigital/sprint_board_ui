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