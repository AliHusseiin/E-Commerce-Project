"use_strict";
document.getElementById("add").addEventListener("click", () => {
  const product = document.getElementById("product-name");
  const price = document.getElementById("price");
  const quantity = document.getElementById("quantity");
  const total = Number(price.value) * Number(quantity.value);

  document.getElementById(
    "products"
  ).innerHTML += `<tr><td>${product.value}</td><td>${price.value}</td><td>${quantity.value}</td><td>${total}</td><td>Remove</td></tr>`;
});
