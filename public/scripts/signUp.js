const signUpName = document.getElementById("name");
const signUpEmail = document.getElementById("email");
const signUpPass = document.getElementById("pass");
const confirmPass = document.getElementById("co-pass");
const signUpBtn = document.getElementById("sign-up");
let users = [];
// get the data of the localStorage
if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
}
// simple alert which let the user know that the login done
const successAlertContent = `
<div class="p-4 mb-4 text-sm rounded-lg bg-gray-800 text-green-400" role="alert">
  <span class="font-medium">Account created</span> you create account successfully
</div>
`;
const container = document.querySelector(".container");

signUpBtn.addEventListener("click", (e) => addUser(e));

function addUser(e) {
  e.preventDefault(); // remove default behavior
  if (email.value != "" || pass.value != "" || confirmPass.value != "") {
    if (pass.value !== confirmPass.value) {
      alert("password doesnt match");
      return;
    }
    users.push({
      userName: signUpName.value,
      email: signUpEmail.value,
      pass: signUpPass.value,
      login: false,
    });
    localStorage.setItem("users", JSON.stringify(users));
    const SuccessAlert = document.createElement("div");
    container.appendChild(SuccessAlert);
    SuccessAlert.classList.add("alert");
    SuccessAlert.innerHTML = successAlertContent;
    setTimeout(() => {
      SuccessAlert.remove();
      window.location.href = "/"; // return to the login page
    }, 2000);
  } else {
    alert("enter your data"); // simple alert
  }
}
