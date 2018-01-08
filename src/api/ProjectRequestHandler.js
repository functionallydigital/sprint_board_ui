export function loadProjects(session) {
  return fetch(`${global.apiUrl}/projects`, {
      headers : {
        'SessionKey' : session.session_key
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function createProject(session, project) {
  return fetch(`${global.apiUrl}/projects`, {
      method: 'POST',
      headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'SessionKey' : session.session_key
      },
      body: JSON.stringify(project)
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function loadProject(session, projectId) {
  return fetch(`${global.apiUrl}/projects/${projectId}`, {
      headers : {
        'SessionKey' : session.session_key
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function loadEditProject(session, projectId) {
  return fetch(`${global.apiUrl}/projects/${projectId}/edit`, {
      headers : {
        'SessionKey' : session.session_key
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function updateProject(session, project) {
  return fetch(`${global.apiUrl}/projects/${project.id}`, {
    method: 'PUT',
      headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'SessionKey' : session.session_key
      },
      body: JSON.stringify(project)
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function deleteProject(session, projectId) {
  return fetch(`${global.apiUrl}/projects/${projectId}`, {
    method: 'DELETE',
      headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'SessionKey' : session.session_key
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function loadProjectBacklog(session, projectId) {
  return fetch(`${global.apiUrl}/projects/${projectId}/backlog`, {
      headers : {
        'SessionKey' : session.session_key
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function loadProjectUsers(session, projectId) {
  return fetch(`${global.apiUrl}/projects/${projectId}/users`, {
      headers: {
        'SessionKey': session.session_key
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function addUserToProject(session, projectId, user) {
  return fetch(`${global.apiUrl}/projects/${projectId}/add_user`, {
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

export function addProgressStep(session, projectId, step) {
  return fetch(`${global.apiUrl}/projects/${projectId}/add_step`, {
      method: 'POST',
      headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'SessionKey' : session.session_key
      },
      body: JSON.stringify(step)
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function loadProjectRoadmap(session, projectId) {
  return fetch(`${global.apiUrl}/projects/${projectId}/roadmap`, {
      headers: {
        'SessionKey': session.session_key
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

