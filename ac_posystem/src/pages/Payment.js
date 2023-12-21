import React from "react";
import axios from "axios";

var total = 0;
var totalsum = 0;
var itemss = [];
class Payment extends React.Component {
  //call backend when payment button is clicked and pass the sessionStorage data to backend

  sendData() {
    // POST request using fetch inside useEffect React hook
    itemss.forEach((item) => {
      item.sc_image = "";
    });
    axios
      .post("http://localhost:8803/updateInventory", itemss)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => console.log("Error: ", error));
  }

  calculate() {
    //Calculations of the cart
    itemss = JSON.parse(sessionStorage.getItem("items"));
    itemss.forEach((item) => {
      total = total + item.count * Number(item.sc_price); // Sub Total of cart items
    });
    totalsum = total - 10 + 5; // Total Sum of cart with discount (10) and shipping (5)
    window.sessionStorage.setItem("totalsum", totalsum); // SessionStorage to send TotalSum of the cart to other pages
  }

  render() {
    total = 0;
    this.calculate();
    return (
      // HTML Front End Code
      <div>
        <div>
          <div className="wrapper">
            <div className=" a">
              {" "}
              {/* Total Summary Calculations Details Section */}
              <div className="page">
                <section className="shopping-cart dark" style={{ margin: 100 }}>
                  <div className="summary">
                    <h3>Summary</h3>
                    <div className="summary-item">
                      <span className="text">Subtotal</span>{" "}
                      {/* Subtotal Sum of the cart items*/}
                      <span className="price">${total}</span>
                    </div>
                    <div className="summary-item">
                      <span className="text">Discount</span>{" "}
                      {/* Discount - Constant $10 */}
                      <span className="price">$10</span>
                    </div>
                    <div className="summary-item">
                      <span className="text">Shipping</span>{" "}
                      {/* Shipping - Constant $5 */}
                      <span className="price">$5</span>
                    </div>
                    <div className="summary-item">
                      <span className="text">Total</span>
                      <span className="price">${totalsum}</span>{" "}
                      {/* Total Sum of cart items with Discount and Shipping*/}
                    </div>
                    {/* Button to redirect back to the main page */}
                    <button
                      type="button"
                      className="btn btn-primary btn-lg btn-block"
                    >
                      Continue Shopping
                    </button>
                  </div>

                  {/* </div> */}
                </section>
              </div>
            </div>
            <div className=" b">
              {" "}
              {/* Billing Details Section */}
              <div className="container">
                <form action="/ConfiromationPage">
                  <div className="row">
                    <div className="col">
                      <h3 className="title">BILLING ADDRESS</h3>

                      <div className="inputBox">
                        {" "}
                        {/* Fullname */}
                        <span>full name :</span>
                        <input type="text" placeholder="Sam" />
                      </div>
                      <div className="inputBox">
                        <span>email :</span> {/* Email */}
                        <input type="email" placeholder="Sam@example.com" />
                      </div>
                      <div className="inputBox">
                        <span>Phone Number :</span> {/* Phone Number */}
                        <input type="text" placeholder="+1-1234567890" />
                      </div>

                      <div>
                        <div>
                          <img
                            src="/asserts/images/wallet.jpeg"
                            alt="Cash Icon"
                            width="320"
                            height="120"
                          />
                        </div>
                        <div>
                          <input
                            type="submit"
                            value="Cash"
                            className="submit"
                          />{" "}

                        </div>
                      </div>
                    </div>
                    <div className="col">
                      {" "}
                      {/* Card Details Section */}
                      <h3 className="title">payment</h3>
                      <div className="inputBox">
                        <span>cards accepted :</span>
                        <img src="/asserts/images/card_img.png" alt="" />
                      </div>
                      <div className="inputBox">
                        {" "}
                        {/* Name */}
                        <span>name on card :</span>
                        <input type="text" placeholder="Mr. Sam" />
                      </div>
                      <div className="inputBox">
                        <span>credit card number :</span> {/* Card Number */}
                        <input
                          type="number"
                          placeholder="1111-2222-3333-4444"
                        />
                      </div>
                      <div className="inputBox">
                        <span>exp month :</span> {/* Exp Month */}
                        <input type="text" placeholder="january" />
                      </div>
                      <div className="flex">
                        <div className="inputBox">
                          <span>exp year :</span> {/* Exp Year */}
                          <input type="number" placeholder="2022" />
                        </div>
                        <div className="inputBox">
                          <span>CVV :</span>
                          <input type="text" placeholder="123" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Submit Button */}
                  <button
                    type="submit"
                    value="proceed to checkout"
                    className="submit-btn"
                    onClick={this.sendData}
                  >
                    Payment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Payment;
