const cartCount = document.getElementById("cart-count");
const logoutBtn = document.getElementById("logout");
const userNameInHomePage = document.getElementById("user"); // selecting user element
const cardContainer = document.getElementById("card-container");
const totalPrice = document.getElementById("total");
let orders = [];
// check if the user already loggedin to redirect him to the home page
if (localStorage.getItem("loginUsers")) {
  let paresedUsersData = JSON.parse(localStorage.getItem("loginUsers"));
  const currectLoginUser =
    paresedUsersData.find((user) => user.login == true) ?? false;
  if (currectLoginUser.login) {
    userNameInHomePage.textContent = currectLoginUser.userName;
  } else {
    window.location.href = "/"; // redirect the user to login page if not loggedin
  }
} else {
  window.location.href = "/"; // redirect if there no any users logged in yet, so there is no access to home page without logging in
}
logoutBtn.addEventListener(
  "click",
  () => (window.location.href = "/logout.html") // handling logout in logout page
);
// ================ Getting data from local storage ================
if (localStorage.getItem("loginUsers")) {
  const loginUsers = JSON.parse(localStorage.getItem("loginUsers"));
  const currectLoginUser =
    loginUsers.find((user) => user.login == true) ?? false; // using find() to get the currect login user
  if (currectLoginUser?.totalCount) {
    cartCount.textContent = currectLoginUser.totalCount; // update UI
    cartCount.classList.replace("hidden", "flex"); // replacing hidden to flex
    // so if there is count, Absloutly there is an orders so i nested it into the count condition
    orders = currectLoginUser.orders; // assign orders value to previous orders in localstorage
  }
  let content;
  if (currectLoginUser?.orders) {
    // if orders found load the content
    orders = currectLoginUser.orders;
    orders.forEach((order) => {
      let card = document.createElement("div");
      card.className = "flex card bg-[#333] p-3 rounded mb-3 relative";
      card.innerHTML = `
        <div class="max-w-30 md:max-w-40">
          <img src="${order.image}" alt="product" />
        </div>
        <div class="flex flex-wrap items-center justify-between w-full">
          <div>
            <p class="mb-5 text-2xl md:text-4xl order-title">${order.title}</p>
            <p>count: <span id="count"> ${order.count}</span></p>
            
          </div>
          <p class="pr-5 text-2xl">
            Price: <span class="font-bold">${order.price}$</span>
          </p>
        </div>
        <a
          href="#"
          id="delete"
          class="block p-1 mt-5 text-sm font-light text-center transition-colors rounded w-fit bg-sky-700 hover:bg-sky-800 absolute right-4 bottom-4">
          Delete from cart
          </a>`;
      cardContainer.appendChild(card);
      let deleteBtn = card.querySelector("#delete");
      deleteBtn.addEventListener("click", () => handleDelete(card));
      calculateTotalPrice();
    });
  } else {
    // if not found place a simple message to start add product
    content = `<p class="text-2xl font-light flex items-center justify-center h-full">Start adding Products</p>`;
    cardContainer.innerHTML = content;
  }
}
function handleDelete(card) {
  const clickedCardTitle = card.querySelector(".order-title").textContent;
  const remainingOrders = orders.filter(
    (order) => order.title != clickedCardTitle
  );
  orders = remainingOrders;
  // get this current user to delete this order from localstorage
  const loginUsers = JSON.parse(localStorage.getItem("loginUsers"));
  const currectLoginUser =
    loginUsers.find((user) => user.login == true) ?? false; // get the current logged in user
  currectLoginUser.orders = remainingOrders;
  updateCartCount(remainingOrders, currectLoginUser);
  card.remove(); // remove from UI
  localStorage.setItem("loginUsers", JSON.stringify(loginUsers)); // remove from LS
}

function updateCartCount(remainingOrders, currentUser) {
  if (remainingOrders.length > 0) {
    const sumAllCount = remainingOrders.reduce(
      (acc, order) => acc + order.count,
      0
    );
    cartCount.textContent = sumAllCount;
    currentUser.totalCount = sumAllCount;
    calculateTotalPrice();
  } else {
    cartCount.classList.replace("flex", "hidden"); // replacing hidden to flex
    currentUser.totalCount = 0;
    totalPrice.innerText = 0;
  }
}
function calculateTotalPrice() {
  // we use reduce to first multiply each order count by price and then sum accumlator with the final value and the starting point or the initial value is 0
  const sumAllCount = orders.reduce(
    (acc, order) => acc + order.count * order.price,
    0
  );
  totalPrice.innerText = sumAllCount;
}
