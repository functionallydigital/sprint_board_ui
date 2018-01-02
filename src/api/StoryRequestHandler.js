export function createStory(session, story) {
  return fetch(`${global.apiUrl}/stories`, {
    method: 'POST',
      headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'SessionKey' : session.session_key
      },
      body: JSON.stringify(story)
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function loadStory(session, storyId) {
  return fetch(`${global.apiUrl}/stories/${storyId}`, {
      headers : {
        'SessionKey' : session.session_key
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function loadStoryEdit(session, storyId) {
  return fetch(`${global.apiUrl}/stories/${storyId}/edit`, {
      headers : {
        'SessionKey' : session.session_key
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function updateStory(session, story) {
  return fetch(`${global.apiUrl}/stories/${story.id}`, {
    method: 'PUT',
      headers : {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'SessionKey' : session.session_key
      },
      body: JSON.stringify(story)
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export function deleteStory(session, storyId) {
  return fetch(`${global.apiUrl}/stories/${storyId}`, {
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

export function updateAssignedUser(session, storyId, user) {
  return fetch(`${global.apiUrl}/stories/${storyId}/assign_user`, {
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
