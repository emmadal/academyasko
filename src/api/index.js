const API_URL = "https://tenant.devlabcenter.com/api/v1";
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
    fetch(`${API_URL}/register`, params)
      .then((response) => response.json())
      .then((e) => resolve(e))
      .catch((err) => reject(err));
  });

/*
Login user
*/
export const loginUser = () => {};
