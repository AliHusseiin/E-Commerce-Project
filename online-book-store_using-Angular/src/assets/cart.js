"use_strict";
const saveProductsToLocalStorage = () => {
  localStorage.setItem("products", JSON.stringify(products));
};
const getShipping = () => {
  return products.length * 10;
};

const getSubTotal = () => {
  return products
    .map((p) => p.price * p.quantity)
    .reduce((a, e) => (a += e), 0);
};

const getTotal = () => getShipping() + getSubTotal();

const decQuantity = (i) => {
  if (products[i].quantity > 1) products[i].quantity--;

  renderHTML();
};
const incQuantity = (i) => {
  products[i].quantity++;
  renderHTML();
};
const remove = (i) => {
  products.splice(i, 1);
  renderHTML();
};

const renderHTML = () => {
  document.getElementById("products").innerHTML = "";
  products.forEach((p, i) => {
    document.getElementById("products").innerHTML += getProductHTMLRow(p, i);
  });
  document.getElementById("shipping").innerHTML = `$${getShipping()}`;
  document.getElementById("sub-total").innerHTML = `$${getSubTotal()}`;
  document.getElementById("total").innerHTML = `$${getTotal()}`;
  saveProductsToLocalStorage();
};

const getProductHTMLRow = (p, i) => {
  return `
  <tr>
    <td class="align-middle"><img src="img/${
      p.name
    }.jpg" alt="" style="width: 50px;"> ${p.name}</td>
    <td class="align-middle">$${p.price}</td>
    <td class="align-middle">
        <div class="input-group quantity mx-auto" style="width: 100px;">
            <div class="input-group-btn">
                <button type="button" class="decBtn btn btn-sm btn-primary btn-minus" onclick="decQuantity(${i})">
                <i class="fa fa-minus"></i>
                </button>
            </div>
            <input type="text" class="quantityVal form-control form-control-sm bg-secondary border-0 text-center" value="${
              p.quantity
            }">
            <div class="input-group-btn">
                <button type="button" class="incBtn btn btn-sm btn-primary btn-plus" onclick="incQuantity(${i})">
                    <i class="fa fa-plus"></i>
                </button>
            </div>
        </div>
    </td>
    <td class="align-middle">$${p.price * p.quantity}</td>
    <td class="align-middle"><button class="btn btn-sm btn-danger" type="button" onclick="remove(${i})"><i class="fa fa-times"></i></button></td>
</tr>`;
};

const products = JSON.parse(localStorage.getItem("products") || "[]");
renderHTML();
const postData = async () => {
  await fetch(`http://localhost:5000/api/users/login`, {
    method: "POST",
    headers: {
      "x-access-token": "Bearer <token>",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "ramymibrahim@yahoo.com",
      password: "123456",
    }),
  })
    .then((res) => res.json())
    //.then((res) => console.log(res))
    .then((data) => {
      localStorage.setItem("x-access-token", data.token);
      localStorage.setItem("userId", data._id);
      console.log(data.token);
    });
};

postData();
