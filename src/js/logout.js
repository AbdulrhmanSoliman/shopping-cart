const logoutBtn = document.getElementById("logout");
const stayBtn = document.getElementById("stay");
let loginUsers = JSON.parse(localStorage.getItem("loginUsers"));

console.log(loginUsers.login);
function logoutUser() {
  const currectUser = loginUsers.find((user) => user.login == true);
  currectUser.login = false;
  localStorage.setItem("loginUsers", JSON.stringify(loginUsers));
  window.location.href = "/";
}
// edit login key in localstorage to false
logoutBtn.addEventListener("click", logoutUser);
// return to home page
stayBtn.addEventListener("click", () => (location.href = "/home.html"));
