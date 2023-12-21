import "../assets/css/fontawesome.min.css";
import "../assets/css/default.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import React from "react";

const Home = () => {
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        //fetch the data for categories from backend
        const res = await axios.get("http://localhost:8803/categories");

        document.getElementById("h1").innerHTML = res.data[0].c_name;
        document.getElementById("h2").innerHTML = res.data[1].c_name;
        document.getElementById("h3").innerHTML = res.data[2].c_name;
        document.getElementById("h4").innerHTML = res.data[3].c_name;
        document.getElementById("h5").innerHTML = res.data[4].c_name;
        document.getElementById("h6").innerHTML = res.data[5].c_name;

        document.getElementById("img1").src = res.data[0].c_img;
        document.getElementById("img2").src = res.data[1].c_img;
        document.getElementById("img3").src = res.data[2].c_img;
        document.getElementById("img4").src = res.data[3].c_img;
        document.getElementById("img5").src = res.data[4].c_img;
        document.getElementById("img6").src = res.data[5].c_img;
      } catch (err) {
        console.log("99999 Error: ", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="App">
      <section className="header">
        <a className="logo">
          <i className="fas fa-shopping-bag icon"></i>
          <h1 className="logoTitle">Achievers Grocery</h1>
        </a>

        <div className="mobileMenuHandler">
          <i className="fas fa-bars icon"></i>
        </div>
      </section>

      <div className="Categories">
        <div className="Category">
          <section id="category" className="category">
            <h2 className="sectionTitle">
              Shop By <span>Category</span>
            </h2>
            <div className="container">
              <div className="box">
                <div className="content">
                  <h3 id="h1" className="title"></h3>
                  <h4 className="subTitle">Upto 27.5% off</h4>
                </div>
                <figure className="figure">
                  <img id="img1" alt="banner" className="img" />
                </figure>

                <Link
                  to="/MainCategory"
                  state={{
                    id: "1", //pass the id
                  }}
                  className="btn"
                >
                  Show Now
                </Link>
              </div>
              <div className="box">
                <div className="content">
                  <h3 id="h2" className="title"></h3>
                  <h4 className="subTitle">Upto 50% off</h4>
                </div>
                <figure className="figure">
                  <img id="img2" alt="banner" className="img" />
                </figure>
                <Link
                  to="/MainCategory"
                  state={{
                    id: "2", //pass the id
                  }}
                  className="btn"
                >
                  Shop Now
                </Link>
              </div>
              <div className="box">
                <div className="content">
                  <h3 id="h3" className="title"></h3>
                  <h4 className="subTitle">Upto 35% off</h4>
                </div>
                <figure className="figure">
                  <img id="img3" alt="banner" className="img" />
                </figure>
                <Link
                  to="/MainCategory"
                  state={{
                    id: "3", //pass the id
                  }}
                  className="btn"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="container">
              <div className="box">
                <div className="content">
                  <h3 id="h4" className="title"></h3>
                  <h4 className="subTitle">Upto 27.5% off</h4>
                </div>
                <figure className="figure">
                  <img id="img4" alt="banner" className="img" />
                </figure>

                <Link
                  to="/MainCategory"
                  state={{
                    id: "4", // pass the id
                  }}
                  className="btn"
                >
                  Show Now
                </Link>
              </div>
              <div className="box">
                <div className="content">
                  <h3 id="h5" className="title"></h3>
                  <h4 className="subTitle">Upto 50% off</h4>
                </div>
                <figure className="figure">
                  <img id="img5" alt="banner" className="img" />
                </figure>
                <Link
                  to="/MainCategory"
                  state={{
                    id: "5", // pass the id
                  }}
                  className="btn"
                >
                  Shop Now
                </Link>
              </div>
              <div className="box">
                <div className="content">
                  <h3 id="h6" className="title"></h3>
                  <h4 className="subTitle">Upto 35% off</h4>
                </div>
                <figure className="figure">
                  <img id="img6" alt="banner" className="img" />
                </figure>
                <Link
                  to="/MainCategory"
                  state={{
                    id: "6", // pass the id
                  }}
                  className="btn"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Home;
