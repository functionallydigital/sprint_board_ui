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

export function updateAssignedUser(session, taskId, user) {
  return fetch(`${global.apiUrl}/tasks/${taskId}/assign_user`, {
    method: 'POST',
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

export function updateTaskStage(session, taskId, stage) {
  return fetch(`${global.apiUrl}/tasks/${taskId}/update_stage`, {
    method: 'POST',
      headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'SessionKey' : session.session_key
      },
      body: JSON.stringify(stage)
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

