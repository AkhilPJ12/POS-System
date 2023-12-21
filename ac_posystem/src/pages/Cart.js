import React, { useState } from "react";
import "../assets/css/fontawesome.min.css";
import "../assets/css/default.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import { Link } from "react-router-dom";

function Cart() {
  // Declaring variables
  var products;
  const shippingPrice = 5;

  // Retrieving data from session storage, if data is null, then assign empty array else assign to variable (used terinary operator)
  sessionStorage.getItem("items") == null
    ? (products = [])
    : (products = JSON.parse(sessionStorage.getItem("items")));
  const [cartItems, setCartItems] = useState(products);

  const itemsPrice = cartItems.reduce((a, c) => a + c.count * c.sc_price, 0);

  // Calculating total price
  const totalPrice = itemsPrice + shippingPrice;

  // Function declaration when + is clicked
  const onAdd = (product) => {
    // Checking whether we have clicked product in the cartItems array
    const exist = cartItems.find((x) => x.sc_id === product.sc_id);
    if (exist) {
      var check = cartItems.map((x) => x.sc_id === product.sc_id);
      if (check) {
        // Find particular index and updating the count for that particular product id
        var index = products.findIndex((x) => x.sc_id === product.sc_id);
        products[index].count = products[index].count + 1;

        // Updating the array value and add it to session storage
        sessionStorage.setItem("items", JSON.stringify(products));
      }

      // Updating the setCartItems values so that UI changes are displayed
      setCartItems(
        cartItems.map((x) =>
          x.sc_id === product.sc_id ? { ...exist, count: exist.count + 1 } : x
        )
      );
    } else {
      // If it is new product, then the count is 1 and array is updated
      setCartItems([...cartItems, { ...product, count: 1 }]);
    }
  };

  // Function declaration when - button is clicked
  const onRemove = (product) => {
    // Checking whether we have clicked product in the cartItems array
    const exist = cartItems.find((x) => x.sc_id === product.sc_id);

    // If the product count is 1 initially, and then removes the product from cart, then it gets removed from UI
    if (exist.count === 1) {
      var check = cartItems.map((x) => x.sc_id === product.sc_id);
      if (check) {
        // Find particular index and updating the count for that particular product id
        var index = products.findIndex((x) => x.sc_id === product.sc_id);

        // Remove the product from array list
        products.splice(index, 1);

        // Updating the array value and add it to session storage
        sessionStorage.setItem("items", JSON.stringify(products));
      }

      // Updating the setCartItems values so that UI changes are displayed
      setCartItems(cartItems.filter((x) => x.sc_id !== product.sc_id));
    } else {
      var check = cartItems.map((x) => x.sc_id === product.sc_id);
      if (check) {
        // Find particular index and updating the count for that particular product id
        var index = products.findIndex((x) => x.sc_id === product.sc_id);

        // Decrement product count from array for particular product
        products[index].count = products[index].count - 1;

        // Update new array values to session storage
        sessionStorage.setItem("items", JSON.stringify(products));
      }

      // Updating the setCartItems values so that UI changes are displayed
      setCartItems(
        cartItems.map((x) =>
          x.sc_id === product.sc_id ? { ...exist, count: exist.count - 1 } : x
        )
      );
    }
  };

  return (
    <div className="cart-parent">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      ></div>
      <div className="cart-container">
        <div className="center">
          <h2>Cart Items</h2>
          <div>
            {cartItems.length === 0 && (
              <div>
                <img
                  src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png"
                  className="w-100"
                />
              </div>
            )}
            {cartItems.map((item) => (
              <div key={item.sc_id} className="added-item-row">
                <div className="">{item.sc_name}</div>
                <div
                  className=""
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <button onClick={() => onRemove(item)} className="remove">
                    -
                  </button>{" "}
                  <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                    {item.count} x ${item.sc_price}
                  </div>
                  <button onClick={() => onAdd(item)} className="add">
                    +
                  </button>
                </div>
              </div>
            ))}

            {cartItems.length !== 0 && (
              <>
                <hr></hr>

                <div className="d-flex-space-between">
                  <div>Items Price</div>
                  <div>${itemsPrice.toFixed(2)}</div>
                </div>

                <div className="d-flex-space-between">
                  <div>Shipping Price</div>
                  <div>${shippingPrice.toFixed(2)}</div>
                </div>

                <div className="d-flex-space-between">
                  <div>
                    <b>Total Price</b>
                  </div>
                  <div>
                    <b>${totalPrice.toFixed(2)}</b>
                  </div>
                </div>

                <hr />
                <div className="">
                  <Link to="/Payment">
                    <button className="btn-checkout">Checkout</button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
