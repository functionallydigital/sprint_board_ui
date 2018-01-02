export function createTask(session, task) {
  return fetch(`${global.apiUrl}/tasks`, {
    method: 'POST',
      headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'SessionKey' : session.session_key
      },
      body: JSON.stringify(task)
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function deleteTask(session, taskId) {
  return fetch(`${global.apiUrl}/tasks/${taskId}`, {
    method: 'DELETE',
      headers : {
        'SessionKey' : session.session_key
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function updateTask(session, task) {
  return fetch(`${global.apiUrl}/tasks/${task.id}`, {
    method: 'PUT',
      headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'SessionKey' : session.session_key
      },
      body: JSON.stringify(task)
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}
