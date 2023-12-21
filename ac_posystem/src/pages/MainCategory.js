import React from "react";
import "../assets/css/fontawesome.min.css";
import "../assets/css/default.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

var cat = "";
var datalist = [];
var addTOCart = [];
var catt = "";
const MainCategory = () => {
  const location = useLocation();
  //Getting an item From home page
  cat = location.state.id;
  catt = JSON.parse(sessionStorage.getItem("cat"));

  if (cat != catt) {
    cat = catt;
  }

  //Function on add click
  let incrementCount = (e) => {
    //jquery for showing popup
    const modal = document.querySelector(".modal");
    const closeBtn = document.querySelector(".close");
    modal.style.display = "block";
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    const mapping = { b1: 0, b2: 1, b3: 2, b4: 3, b5: 4, b6: 5 };
    const a = e.target.id;
    const index = mapping[a];
    if (datalist != null) {
      //modifying the code
      var item = addTOCart.find((x) => x.sc_id == datalist[index].sc_id);
      if (item) {
        item.count = item.count + 1;
      } else {
        var item = JSON.parse(JSON.stringify(datalist[index]));
        item.count = 1;
        addTOCart.push(item);
      }
      updateCount(index, item.count);
    }
  };
  let decrementCount = (e) => {
    const mapping = { b11: 0, b12: 1, b13: 2, b14: 3, b15: 4, b16: 5 };
    const a = e.target.id;
    const index = mapping[a];
    console.log("INDEX == ", index);
    if (datalist != null) {
      var item = addTOCart.find((x) => x.sc_id == datalist[index].sc_id);
      if (item) {
        if (item.count == 0) {
          item.count = 0;
        } else {
          item.count = item.count - 1;
        }
      } else {
        var item = JSON.parse(JSON.stringify(datalist[index])); //just to make sure its not passing reference
        item.count = 1;
        addTOCart.pop(item);
      }
      updateCount(index, item.count);
    }
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        //get the list of subcategories on the basis of categories(cat) id
        const res = await axios.get(
          "http://localhost:8803/sub_categories/" + cat
        );
        datalist = res.data;
        //Parse the data
        document.getElementById("h1").innerHTML = res.data[0].sc_name;
        document.getElementById("h2").innerHTML = res.data[1].sc_name;
        document.getElementById("h3").innerHTML = res.data[2].sc_name;
        document.getElementById("h4").innerHTML = res.data[3].sc_name;
        document.getElementById("h5").innerHTML = res.data[4].sc_name;
        document.getElementById("h6").innerHTML = res.data[5].sc_name;

        document.getElementById("p1").innerHTML = res.data[0].sc_price;
        document.getElementById("p2").innerHTML = res.data[1].sc_price;
        document.getElementById("p3").innerHTML = res.data[2].sc_price;
        document.getElementById("p4").innerHTML = res.data[3].sc_price;
        document.getElementById("p5").innerHTML = res.data[4].sc_price;
        document.getElementById("p6").innerHTML = res.data[5].sc_price;

        document.getElementById("d1").innerHTML = "$" + res.data[0].discounted;
        document.getElementById("d2").innerHTML = "$" + res.data[1].discounted;
        document.getElementById("d3").innerHTML = "$" + res.data[2].discounted;
        document.getElementById("d4").innerHTML = "$" + res.data[3].discounted;
        document.getElementById("d5").innerHTML = "$" + res.data[4].discounted;
        document.getElementById("d6").innerHTML = "$" + res.data[5].discounted;

        document.getElementById("img1").src = res.data[0].sc_image;
        document.getElementById("img2").src = res.data[1].sc_image;
        document.getElementById("img3").src = res.data[2].sc_image;
        document.getElementById("img4").src = res.data[3].sc_image;
        document.getElementById("img5").src = res.data[4].sc_image;
        document.getElementById("img6").src = res.data[5].sc_image;

        //Set the main title of page according to Category
        setTitle(cat);
      } catch (err) {
        console.log("99999 Error: ", err);
      }
    };
    fetchSubCategories();
  }, []);

  return (
    <div>
      <section className="header">
        <select onChange={refreshPage}>
          <option value="Select">Select Category</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Meat">Meat</option>
          <option value="Dairy">Dairy</option>
          <option value="Sweat">Sweat</option>
          <option value="FrozenFood">FrozenFood</option>
        </select>
        <a className="logo">
          <i className="fas fa-shopping-bag icon"></i>
          <h1 className="logoTitle">Achievers Grocery</h1>
        </a>
        <div class="modal">
          <div class="modal_content">
            <span class="close">&times;</span>
            <p>Item Added!!!</p>
          </div>
        </div>
        <form action={filterData} className="searchForm">
          <input
            type="search"
            name="search"
            id="search"
            className="searchBox"
            placeholder="Search by Name..."
          />
          <label htmlFor="search" className="searchPointer">
            <i className="fas fa-search icon"></i>
          </label>
        </form>
        <div className="mobileMenuHandler">
          <i className="fas fa-bars icon"></i>
        </div>
      </section>
      <section className="navbar" id="navbar">
        <div className="iconContainer">
          <Link to="/Cart" onClick={sendData}>
            <a className="iconLink" title="Shopping Cart">
              <i className="fa fas fa-shopping-cart icon"></i>
            </a>
          </Link>
        </div>
      </section>
      <section id="product" className="product">
        <h2 id="maintitle" className="sectionTitle"></h2>
        <div className="container">
          <div className="box">
            <figure className="figure">
              <img id="img1" alt="banner" className="img" />
            </figure>
            <h2 id="h1" className="title"></h2>

            <div className="price">
              <span id="p1" className="present"></span>
              <span id="d1" className="previous">
                $1
              </span>
            </div>
            <div class="modal">
              <div class="modal_content">
                <span class="close">&times;</span>
                <p>Item Added!!!</p>
              </div>
            </div>

            <div style={{ display: "flex", fontSize: "40px" }}>
              <button id="b11" onClick={decrementCount} className="btn">
                -
              </button>
              <div className="price">
                <span id="c1" className="present">
                  0
                </span>
              </div>
              <button id="b1" onClick={incrementCount} className="btn">
                +
              </button>
            </div>
          </div>

          <div className="box">
            <figure className="figure">
              <img id="img2" alt="banner" className="img" />
            </figure>
            <h2 id="h2" className="title"></h2>
            <div className="price">
              <span id="p2" className="present"></span>
              <span id="d2" className="previous">
                $1
              </span>
            </div>
            <div style={{ display: "flex", fontSize: "40px" }}>
              <button id="b12" onClick={decrementCount} className="btn">
                -
              </button>
              <div className="price">
                <span id="c2" className="present">
                  0
                </span>
              </div>
              <button id="b2" onClick={incrementCount} className="btn">
                +
              </button>
            </div>
          </div>

          <div className="box">
            <figure className="figure">
              <img id="img3" alt="banner" className="img" />
            </figure>
            <h2 id="h3" className="title"></h2>
            <div className="price">
              <span id="p3" className="present"></span>
              <span id="d3" className="previous">
                $1
              </span>
            </div>
            <div style={{ display: "flex", fontSize: "40px" }}>
              <button id="b13" onClick={decrementCount} className="btn">
                -
              </button>
              <div className="price">
                <span id="c3" className="present">
                  0
                </span>
              </div>
              <button id="b3" onClick={incrementCount} className="btn">
                +
              </button>
            </div>
          </div>

          <div className="box">
            <figure className="figure">
              <img id="img4" alt="banner" className="img" />
            </figure>
            <h2 id="h4" className="title"></h2>
            <div className="price">
              <span id="p4" className="present"></span>
              <span id="d4" className="previous">
                $1
              </span>
            </div>
            <div style={{ display: "flex", fontSize: "40px" }}>
              <button id="b14" onClick={decrementCount} className="btn">
                -
              </button>
              <div className="price">
                <span id="c4" className="present">
                  0
                </span>
              </div>
              <button id="b4" onClick={incrementCount} className="btn">
                +
              </button>
            </div>
          </div>

          <div className="box">
            <figure className="figure">
              <img id="img5" alt="banner" className="img" />
            </figure>
            <h2 id="h5" className="title"></h2>
            <div className="price">
              <span id="p5" className="present"></span>
              <span id="d5" className="previous">
                $1
              </span>
            </div>
            <div style={{ display: "flex", fontSize: "40px" }}>
              <button id="b15" onClick={decrementCount} className="btn">
                -
              </button>
              <div className="price">
                <span id="c5" className="present">
                  0
                </span>
              </div>
              <button id="b5" onClick={incrementCount} className="btn">
                +
              </button>
            </div>
          </div>

          <div className="box">
            <figure className="figure">
              <img id="img6" alt="banner" className="img" />
            </figure>
            <h2 id="h6" className="title"></h2>
            <div className="price">
              <span id="p6" className="present"></span>
              <span id="d6" className="previous">
                $1
              </span>
            </div>
            <div style={{ display: "flex", fontSize: "40px" }}>
              <button
                id="b16"
                onClick={decrementCount}
                className="btn"
                style={{ fontSize: "15px" }}
              >
                -
              </button>
              <div className="price">
                <span id="c6" className="present">
                  0
                </span>
              </div>
              <button id="b6" onClick={incrementCount} className="btn">
                +
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

let refreshPage = (e) => {
  var val = e.target.value;
  if (val == "Vegetables") {
    sessionStorage.setItem("cat", JSON.stringify("1"));
    window.location.reload(false);
    console.log("999, cat: ", cat);
  }
  if (val == "Fruits") {
    sessionStorage.setItem("cat", JSON.stringify("2"));
    window.location.reload(false);
    console.log("999, cat: ", cat);
  }
  if (val == "Meat") {
    sessionStorage.setItem("cat", JSON.stringify("3"));
    window.location.reload(false);
    console.log("999, cat: ", cat);
  }
  if (val == "Dairy") {
    sessionStorage.setItem("cat", JSON.stringify("4"));
    window.location.reload(false);
    console.log("999, cat: ", cat);
  }
  if (val == "Sweat") {
    sessionStorage.setItem("cat", JSON.stringify("5"));
    window.location.reload(false);
    console.log("999, cat: ", cat);
  }
  if (val == "FrozenFood") {
    sessionStorage.setItem("cat", JSON.stringify("6"));
    window.location.reload(false);
    console.log("999, cat: ", cat);
  }
};

//Fetch data added in cart and send it to backend
let sendData = () => {
  sessionStorage.setItem("items", JSON.stringify(addTOCart));
};

//Set Main title of Main Category page on the basis of c_id coming from
//category page, this needs to be dynamic in future
let setTitle = (id) => {
  if (id == 1) {
    document.getElementById("maintitle").innerHTML = "VEGETABLES";
  }
  if (id == 2) {
    document.getElementById("maintitle").innerHTML = "FRUITS";
  }
  if (id == 3) {
    document.getElementById("maintitle").innerHTML = "MEAT";
  }
  if (id == 4) {
    document.getElementById("maintitle").innerHTML = "DAIRY";
  }
  if (id == 5) {
    document.getElementById("maintitle").innerHTML = "SWEETS";
  }
  if (id == 6) {
    document.getElementById("maintitle").innerHTML = "FROZEFOOD";
  }
};
//update the counter for adding or removing item
//this can be modified once we have dynamic frontend
let updateCount = (a, val) => {
  if (a == "0") {
    document.getElementById("c1").innerHTML = val;
  }
  if (a == "1") {
    document.getElementById("c2").innerHTML = val;
  }
  if (a == "2") {
    document.getElementById("c3").innerHTML = val;
  }
  if (a == "3") {
    document.getElementById("c4").innerHTML = val;
  }
  if (a == "4") {
    document.getElementById("c5").innerHTML = val;
  }
  if (a == "5") {
    document.getElementById("c6").innerHTML = val;
  }
};
//Filter data for future for search
let filterData = () => {
  const filteredSuggestions = datalist.filter((datalist) =>
    datalist.sc_name.toString().toLowerCase()
  );
  return filteredSuggestions;
};
export default MainCategory;
