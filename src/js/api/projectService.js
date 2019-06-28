const apiUrl = 'http://localhost:3000';

export async function getProjects() {
  const resp = await fetch(`${apiUrl}/Project/List`);//centralizes functions, communicates with backend
  return await resp.json();
}

export async function ResetToInitialState() {
  const resp = await fetch(`${apiUrl}/Project/ResetToInitialState`);
  if(resp.status === 200) {
    return await 'Data deleted.';
  }

  return await 'Something went wrong, please try again.';
}

export async function createGroup(projectId, groupName) {
  const resp = await fetch(`${apiUrl}/Project/CreateGroup`, { 
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({projectId, groupName})
      });
  return await resp.json();
}

export async function addStudentToGroup(groupId, studentId) { //send to backend then to rest api
  const resp = await fetch(`${apiUrl}/Project/AddStudentToGroup`, { 
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({groupId, studentId})
      });
  return await resp.json();
} 

/*
export async function deleteGame(gameId) {
  const resp = await fetch(`${apiUrl}/game/${gameId}`, { method: 'DELETE' });
  console.log(resp)
  return await resp.json();
}

export async function addGame(name) {
  const resp = await fetch(`${apiUrl}/game`, { 
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:  JSON.stringify({ name })
      });
  return await resp.json();
}

export async function editGame(gameId, name){ 
  const resp = await fetch(`${apiUrl}/game/${gameId}`, { 
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body:  JSON.stringify({ name })
  });

  return await resp.json();
}
*/