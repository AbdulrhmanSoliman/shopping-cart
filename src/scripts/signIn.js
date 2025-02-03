// Global declarations
const email = document.getElementById("email");
const pass = document.getElementById("pass");
const logInBtn = document.getElementById("login");
const usersInLocalStorage = JSON.parse(localStorage.getItem("users"));
const container = document.querySelector(".container");

// this is an array of object that holds all successful login users and and details and orders for each one
let allLoginUsers = [];

if (localStorage.getItem("loginUsers")) {
  // get the previous logged in users from localstorage and assign its value to `allLoginUsers`
  let paresedUsersData = JSON.parse(localStorage.getItem("loginUsers"));
  allLoginUsers = paresedUsersData;
  // check if the user already loggedin
  const currectLoginUser =
    paresedUsersData.find((user) => user.login == true) ?? false;
  if (currectLoginUser.login) {
    window.location.href = "/src/pages/home.html";
  }
}

function checkUser(e) {
  e.preventDefault();

  const userFound = usersInLocalStorage.find((user) => {
    // Authorized user and this is the first check to move this user to the login users list
    if (email.value == user.email && pass.value == user.pass) {
      // `findUser` is to get this user if already logged in
      const findUser = allLoginUsers.find(
        (userinLS) => userinLS.userName == user.userName ?? false
      );
      // if the user is found and has logged in previously just edit the login value to be true and update the localStorage to save data
      if (findUser) {
        findUser.login = true;
      } else {
        // if the user make a sign up and didnt make a sign in we push it as a new login user and update localStorage again
        user.login = true;
        allLoginUsers.push(user); // add this user to the list of logged in users
      }
      updateLocalStorage();
      showSuccessAlert();
      window.location.href = "/src/pages/home.html";
      return true; // returning true to check if user not found because find() returns undefined
    }
  });

  if (!userFound) {
    const errorAlert = document.createElement("p");
    errorAlert.textContent = "Incorrect email or password";
    errorAlert.classList.add("text-red-400");
    container.appendChild(errorAlert);
    setTimeout(() => {
      errorAlert.remove();
    }, 2000);
  }
}
logInBtn.addEventListener("click", (e) => checkUser(e));

function showSuccessAlert() {
  const successAlertContent = `
<div class="p-4 mb-4 text-sm rounded-lg bg-gray-800 text-green-400" role="alert">
  <span class="font-medium">Success Login</span> you entered successfully
</div>
`;
  const SuccessAlert = document.createElement("div");
  SuccessAlert.classList.add("alert");
  SuccessAlert.innerHTML = successAlertContent;
  container.appendChild(SuccessAlert);
  setTimeout(() => {
    SuccessAlert.remove();
  }, 2000);
}
function updateLocalStorage() {
  localStorage.setItem("loginUsers", JSON.stringify(allLoginUsers));
}
