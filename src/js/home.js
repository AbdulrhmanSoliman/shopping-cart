// ==== First checking user is login or logout ====
const logoutBtn = document.getElementById("logout");
const userNameInHomePage = document.getElementById("user"); // selecting user element

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

// ============ starting main or home scripts ============
// ==== Restore user data progress when page reloaded ====
// global declarations
const productsContainer = document.getElementById("product-wrapper");
const cartCount = document.getElementById("cart-count");
let cart = [];
let previousCount = 0;
let previousOrders = [];
let productData = [
  {
    title: "Apple watch",
    price: "100",
    image:
      "https://png.pngtree.com/png-vector/20240411/ourmid/pngtree-apple-watch-on-transparent-background-png-image_12261358.png",
    count: 1,
  },
  {
    title: "Smart watch",
    price: "200",
    image:
      "https://png.pngtree.com/png-vector/20241025/ourmid/pngtree-smart-watch-png-image_14171831.png",
    count: 1,
  },
  {
    title: "Smart watch electronic",
    price: "600",
    image:
      "https://png.pngtree.com/png-vector/20241107/ourmid/pngtree-smart-watch-electronic-device-png-image_14222319.png",
    count: 1,
  },
  {
    title: "Apple watch band spot",
    price: "500",
    image:
      "https://png.pngtree.com/png-vector/20250130/ourmid/pngtree-apple-watch-band-spot-more-colors-available-stainless-steel-png-image_15363106.png",
    count: 1,
  },
  {
    title: "Silicone watch band",
    price: "300",
    image:
      "https://png.pngtree.com/png-vector/20240806/ourmid/pngtree-silicone-watch-band-png-image_13394060.png",
    count: 1,
  },
];

// checking localStorage items
if (localStorage.getItem("loginUsers")) {
  const loginUsers = JSON.parse(localStorage.getItem("loginUsers"));
  const currectLoginUser =
    loginUsers.find((user) => user.login == true) ?? false; // using find() to get the currect login user

  if (currectLoginUser?.totalCount) {
    previousCount = currectLoginUser.totalCount;
    cartCount.textContent = previousCount; // update UI
    cartCount.classList.replace("hidden", "flex"); // replacing hidden to flex
    // so if there is count, Absloutly there is an orders so i nested it into the count condition
    previousOrders = currectLoginUser.orders; // assign global array `previousOrders`  to the user order in the localstorage
  }
}

// ========================
// looping over every product to get the clicked one by the user

productData.forEach((product) => {
  const productDiv = document.createElement("div");
  productDiv.className =
    "w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 product";

  productDiv.innerHTML = `
    <a href="#">
      <img
        class="p-8 rounded-t-lg max-h-[15rem] mx-auto"
        src="${product.image}"
        alt="product image"
      />
    </a>
    <div class="px-5 pb-5">
      <a href="#">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900 product-title dark:text-white">
          ${product.title}
        </h5>
      </a>
      
      <div class="flex items-center justify-between mt-5">
        <span class="text-3xl font-bold text-gray-900 price dark:text-white" data-value="300">
          $${product.price}
        </span>
        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cart-btn"
        >
          Add to cart
        </button>
      </div>
    </div>
  `;

  // Add click event listener to the button
  let button = productDiv.querySelector("button");
  button.addEventListener("click", () => checkProduct(product, button));

  productsContainer.appendChild(productDiv);
});

// ==== Main function to add or edit TotalCount and users order ====
function checkProduct(clickedProduct, button) {
  // change add button content when clicked
  button.textContent = "Added!";
  setTimeout(() => {
    button.textContent = "Add to cart";
  }, 1000);
  // Check if the product already exists in the cart
  const existingProduct = cart.find(
    (product) => product.title === clickedProduct.title
  );

  if (existingProduct) {
    // If the product exists, increase the count
    existingProduct.count += 1;
  } else {
    // If the product does not exist, add it to the cart as new added product
    cart.push(clickedProduct);
  }
  // getting all cart count number
  cartCount.textContent = totalCount();
  cartCount.classList.replace("hidden", "flex"); // replacing hidden to flex and Update UI

  // ==== setting all cart to localStorage ====
  const loginUsers = JSON.parse(localStorage.getItem("loginUsers"));
  const currectLoginUser =
    loginUsers.find((user) => user.login == true) ?? false; // get the current logged in user

  if (currectLoginUser?.orders) {
    // a condition to check if the user has any product
    let existingLSProduct = currectLoginUser.orders.find(
      // if true get this product which its title equal to the clicked product
      (order) => order.title === clickedProduct.title
    );
    if (existingLSProduct) {
      // if we found that product increase its count by 1
      existingLSProduct.count += 1;
    } else {
      // if not found get the previous orders from localstorage and compine it to cart value
      currectLoginUser.orders = previousOrders.concat(cart);
    }
  } else {
    currectLoginUser.orders = cart; // if the product is not found in the cart add it normally
  }
  currectLoginUser.totalCount = totalCount();
  // finally set all the changes to local storage
  localStorage.setItem("loginUsers", JSON.stringify(loginUsers));
}
// function to calculate total count
function totalCount() {
  let totalNumber = 0;
  const allCount = cart.map((product) => product.count); // get all products count
  let sumAllCount = allCount.reduce((acc, curr) => acc + curr); // sum all products count
  if (previousCount != 0) {
    totalNumber = sumAllCount + previousCount;
  } else {
    totalNumber = sumAllCount;
  }
  return totalNumber;
}
