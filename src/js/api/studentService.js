const apiUrl = 'http://localhost:3000';

export async function getStudents() {
  const resp = await fetch(`${apiUrl}/Student/List`); 
  return await resp.json();
}

export async function getStudentProjects(studentId) {
  const resp = await fetch(`${apiUrl}/Student/GetProjects`, { 
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({studentId})
  });
  return await resp.json();
} 