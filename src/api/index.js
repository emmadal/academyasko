const API_URL = "https://tenant.devlabcenter.com/api/v1/elearning";
/*
Register user
*/
export const registerUser = (data) =>
  new Promise((resolve, reject) => {
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      body: JSON.stringify({ ...data }),
    };
    fetch(`${API_URL}/users/register`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });

/*
Login user
*/
export const loginUser = (data) =>
  new Promise((resolve, reject) => {
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      body: JSON.stringify({ ...data }),
    };
    fetch(`${API_URL}/users/login`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });

/*
Update user
*/
export const updateUser = (token, data, userId) =>
  new Promise((resolve, reject) => {
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      redirect: "follow",
      body: JSON.stringify({ ...data }),
    };
    fetch(`${API_URL}/users/${userId}`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });

/*
Get all user
*/
export const getAllUsers = (token) =>
  new Promise((resolve, reject) => {
    const params = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      redirect: "follow",
    };
    fetch(`${API_URL}/users`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });

/*
Get user by ID
*/
export const getUserById = (userId, token) =>
  new Promise((resolve, reject) => {
    const params = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      redirect: "follow",
    };
    fetch(`${API_URL}/users/${userId}`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });

/*
Get Cookie by name
*/
export const getCookie = (cookieName) => {
  const cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i += 1) {
    const cookiePair = cookieArr[i].split("=");
    if (cookieName === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
};

/*
Create level
*/
export const createLevel = (title, token) =>
  new Promise((resolve, reject) => {
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      redirect: "follow",
      body: JSON.stringify({ title }),
    };
    fetch(`${API_URL}/levels`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });

/*
Get All levels
*/
export const getAllLevels = (token) =>
  new Promise((resolve, reject) => {
    const params = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      redirect: "follow",
    };
    fetch(`${API_URL}/levels`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });

/*
Delete level
*/
export const deleteLevel = (id, token) =>
  new Promise((resolve, reject) => {
    const params = {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      redirect: "follow",
      body: JSON.stringify({ id }),
    };
    fetch(`${API_URL}/levels/${id}`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });
/*
Update level
*/
export const updateLevel = (title, id, token) =>
  new Promise((resolve, reject) => {
    const params = {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      redirect: "follow",
      body: JSON.stringify({ id, title }),
    };
    fetch(`${API_URL}/levels/${id}`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });

/*
Deactivate/activate account
*/
export const lockAndUnclockAccount = (userId, token) =>
  new Promise((resolve, reject) => {
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      redirect: "follow",
    };
    fetch(`${API_URL}/users/${userId}/active`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });

/*
Create exercise
*/
export const createExercise = (data, token) =>
  new Promise((resolve, reject) => {
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      redirect: "follow",
      body: JSON.stringify({ ...data }),
    };
    fetch(`${API_URL}/exercices`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });

/*
Get exercise by author
*/
export const getExercicesByAuthor = (authorId, token) =>
  new Promise((resolve, reject) => {
    const params = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      redirect: "follow",
    };
    fetch(`${API_URL}/teacher/${authorId}/exercices`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });

/*
Create an attribution
*/
export const createAttribution = (data, token) =>
  new Promise((resolve, reject) => {
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      redirect: "follow",
      body: JSON.stringify({ ...data }),
    };
    fetch(`${API_URL}/students/attributeTeacher`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });

/*
Get list of attribution
*/
export const getAllAttributions = (token) =>
  new Promise((resolve, reject) => {
    const params = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      redirect: "follow",
    };
    fetch(`${API_URL}/attributions`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });

/*
Delete attribution
*/
export const deleteAttribution = ({ student_id: studentId, teacher_id: teacherId }, token) =>
  new Promise((resolve, reject) => {
    const params = {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      redirect: "follow",
    };
    fetch(`${API_URL}/attributions/student/${studentId}/teacher/${teacherId}/delete`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });

/*
Get list of coachs and teachers
*/
export const getTeachersAndCoachs = (token) =>
  new Promise((resolve, reject) => {
    const params = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      redirect: "follow",
    };
    fetch(`${API_URL}/teachers`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });

/*
Get list of all students
*/
export const getStudentList = (token) =>
  new Promise((resolve, reject) => {
    const params = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      redirect: "follow",
    };
    fetch(`${API_URL}/students`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });

/*
Get my students
*/
export const getMyStudentList = (userId, token) =>
  new Promise((resolve, reject) => {
    const params = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      redirect: "follow",
    };
    fetch(`${API_URL}/teachers/${userId}/students`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });

/*
Get my trainers
*/
export const getMyTrainersList = (userId, token) =>
  new Promise((resolve, reject) => {
    const params = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      redirect: "follow",
    };
    fetch(`${API_URL}/students/${userId}/teachers`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });
