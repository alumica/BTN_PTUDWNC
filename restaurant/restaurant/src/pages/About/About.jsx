import React from "react";
import Navbar from "../../components/Navbar/index";

import Sushi1 from "../../assets/img/sushi1.jpg";
import Sushi2 from "../../assets/img/sushi2.jpg";

import aboutHistory from "../../assets/img/aboutHistory.jpg";
import daubepsushi2 from "../../assets/img/daubepsushi2.jpg";

import Backgroudsushi from "../../assets/img/backgroudsushi.png";

import "./About.css";

const About = () => (
  <div className="app__about app__bg section__padding" id="about">
    {/* <Navbar/> */}
    <div className="app__about-overlay"></div>

    <div className="app__about-content">
      <div className="app__about-content_header">
        <div className="app__about-content_header-background ">
          <img src={Backgroudsushi} alt="about_backgroundsushi" />
        </div>
        <div className="app__about-content_header-heading">
          <h1>Giới Thiệu</h1>
        </div>
      </div>
      <div className="app__about-content_wrap">
        <div className="app__about-content_sushi flex_center">
          <img src={Sushi1} alt="about_sushi1" />
        </div>
        <div className="app__about-content_about">
          <h1 className="headtext__cormorant">Tổng Quan</h1>
          <p className="p__opensans">
            Hệ thống nhà hàng của chúng tôi được hình thành dựa trên sự hợp tác
            chặt chẽ giữa Công ty Okamura Foods Japan Công ty nổi tiếng tại Nhật
            trong lĩnh vực nuôi trồng, chế biến và phân phối các sản phẩm thủy
            hải sản tại Nhật Bản và Châu Âu và công ty Cổ Phần Thực phẩm Trung
            Sơn, có bề dày trên 15 năm kinh nghiệm trong lĩnh vực nuôi trồng,
            chế biến và xuất khẩu hải sản cao cấp cho thị trường Nhật.
          </p>
        </div>
        <div className="app__about-content_sushi flex_center">
          <img src={Sushi2} alt="about_sushi2" />
        </div>
      </div>
      <div className="app__about-content_wrap2">
        <div className="app__about-content_history-img_wrap">
          <div className="app__about-content_history-img1 flex_center">
            <img src={aboutHistory} alt="about_history-img1" />
          </div>
          <div className="app__about-content_history-img2 flex_center">
            <img src={daubepsushi2} alt="about_history-img2" />
          </div>
        </div>

        <div className="app__about-content_history">
          <h1 className="headtext__cormorant2">Lịch Sử Hình Thành</h1>
          <p className="p__opensans">
            Năm 2007 nhà hàng đầu tiên của chúng tôi được mở tại Phú Mỹ Hưng đã
            dành trọn cảm tình và sự ủng hộ của khách hàng. Năm 2022 đã có hơn
            15 chi nhánh. Với sự yêu mến của khách hàng, chúng tôi tin tưởng
            trong tương lai sẽ phát triển hơn và mở rộng các chi nhánh trên toàn
            quốc.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default About;
