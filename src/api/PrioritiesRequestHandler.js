export function loadPrioritiesList() {
  return fetch(`${global.apiUrl}/priorities`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

