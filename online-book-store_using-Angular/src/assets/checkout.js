const proceedBtn = document.getElementById("proceed-btn");

proceedBtn.addEventListener("click", function () {
  const getElement = () => {
    const first_name = document.getElementById("first_name");
    const last_name = document.getElementById("last_name");
    const email = document.getElementById("email");
    const mobile_number = document.getElementById("mobile_number");
    const address1 = document.getElementById("address1");
    const address2 = document.getElementById("address2");
    const country = document.getElementById("country");
    const city = document.getElementById("city");
    const state = document.getElementById("state");
    const zip_code = document.getElementById("zip_code").value;
    const sub_total_price = document
      .getElementById("subtotal")
      .innerHTML.replace("$", "");
    const shipping = document
      .getElementById("shipping")
      .innerHTML.replace("$", "");
    const total_price = document
      .getElementById("total")
      .innerHTML.replace("$", "");
    const user_id = localStorage.getItem("userID");

    let order = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      mobile_number: mobile_number,
      address1: address1,
      address2: address2,
      country: country,
      city: city,
      state: state,
      zip_code: zip_code,
      sub_total_price: sub_total_price,
      shipping: shipping,
      total_price: total_price,
      user_id: user_id,
    };

    return order;
  };

  const getOrder = () => {
    const orderDetailArray = [];
    products.forEach((p) => {
      orderDetailArray.push({
        product_id: p.id,
        price: p.price,
        qty: p.quantity,
      });
    });
    return orderDetailArray;
  };

  const addOrder = async () => {
    let order = getElement();

    console.log(`${order.last_name}`);
    const response = await fetch("http://localhost:5000/api/orders/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("x-access-token"),
      },
      body: JSON.stringify({
        shipping_info: {
          first_name: order.first_name,
          last_name: order.last_name,
          email: order.email,
          mobile_number: order.mobile_number,
          address1: order.address1,
          address2: order.address2,
          country: order.country,
          city: order.city,
          state: order.state,
          zip_code: order.zip_code,
        },
        _id: localStorage.getItem("userID"),

        sub_total_price: order.total_price,
        shipping: order.shipping,
        total_price: order.total_price,
        user_id: order.user_id,
        order_date:
          new Date().getFullYear() +
          "-" +
          new Date().getMonth() +
          "-" +
          new Date().getDate(),
        order_details: getOrder(),
      }),
    }).then((response) => response.json());
  };
});
