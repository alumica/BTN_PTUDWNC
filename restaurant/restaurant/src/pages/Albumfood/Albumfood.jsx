import React from "react";
import "./Albumfood.css";
import BackgroudAlbumFood from "../../assets/img/BackgroudAlbumFood.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

import Nare from "../../assets/img/Nare.jpg";
import Inari from "../../assets/img/Inari.jpg";
import Nigiri from "../../assets/img/Nigiri.jpg";
import Gunkanmaki from "../../assets/img/Gunkanmaki.jpg";
import Temari from "../../assets/img/Temari.jpg";
import Futomaki from "../../assets/img/Futomaki.jpg";
import Hosomaki from "../../assets/img/Hosomaki.jpg";
import Temaki from "../../assets/img/Temaki.jpg";
import Oshi from "../../assets/img/Oshi.jpg";

function Albumfood() {
  return (
    <div className="app__albumfood">
      <div className="app__ablumfood-header">
        <div className="app__ablumfood-header_background">
          <img src={BackgroudAlbumFood} alt="albumfood_backgroud" />
        </div>
        <div className="app__ablumfood-header_heading">
          <h1>Album Food</h1>
        </div>
      </div>
        <div className="app__albumfood-container d-flex flex-column align-items-center">
          <div className="row app__albumfood-container_row">
            <div className="col-4 app__albumfood-container_row-item">
              <div className="album__img">
                <img alt="" src={Nare} />
              </div>
              <div className="album__text">
                <h2>Nare Sushi</h2>
              </div>
            </div>
            <div className="col-4 app__albumfood-container_row-item">
              <div className="album__img">
                <img alt="" src={Inari} />
              </div>
              <div className="album__text">
                <h2>Inari Sushi</h2>
              </div>
            </div>
            <div className="col-4 app__albumfood-container_row-item">
              <div className="album__img">
                <img alt="" src={Nigiri} />
              </div>
              <div className="album__text">
                <h2>Nigiri Sushi</h2>
              </div>
            </div>
          </div>
          <div className="row app__albumfood-container_row">
            <div className="col-4 app__albumfood-container_row-item">
              <div className="album__img">
                <img alt="" src={Gunkanmaki} />
              </div>
              <div className="album__text">
                <h2>Gunkanmaki Sushi</h2>
              </div>
            </div>
            <div className="col-4 app__albumfood-container_row-item">
              <div className="album__img">
                <img alt="" src={Temari} />
              </div>
              <div className="album__text">
                <h2>Temari Sushi</h2>
              </div>
            </div>
            <div className="col-4 app__albumfood-container_row-item">
              <div className="album__img">
                <img alt="" src={Futomaki} />
              </div>
              <div className="album__text">
                <h2>Futomaki Sushi</h2>
              </div>
            </div>
          </div>
          <div className="row app__albumfood-container_row">
            <div className="col-4 app__albumfood-container_row-item">
              <div className="album__img">
                <img alt="" src={Hosomaki} />
              </div>
              <div className="album__text">
                <h2>Hosomaki Sushi</h2>
              </div>
            </div>
            <div className="col-4 app__albumfood-container_row-item">
              <div className="album__img">
                <img alt="" src={Temaki} />
              </div>
              <div className="album__text">
                <h2>Temaki Sushi</h2>
              </div>
            </div>
            <div className="col-4 app__albumfood-container_row-item">
              <div className="album__img">
                <img alt="" src={Oshi} />
              </div>
              <div className="album__text">
                <h2>Oshi Sushi</h2>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Albumfood;
