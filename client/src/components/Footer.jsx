import React from "react";
import Logo from "../img/logo.png";
import Logo2 from "../img/botttt.jpg";
import Logo3 from "../img/ptit.png";



// import "./main.css";
// import "./base.css";
// import "./layout.css";

const Footer = () => {
  return (
    // <footer>
    //   <img src={Logo} alt="" />
    //   <span>
    //     Made with ♥️ and <b>React.js</b>.
    //   </span>
    // </footer>

    <footer id="Footer" class="clearfix ">


      <div class="widgets_wrapper "><div class="container"><div class="column one-fourth"><aside id="block-11" class="widget widget_block widget_text">
        <p>SITE MAP</p>
      </aside><aside id="nav_menu-2" class="widget widget_nav_menu"><div class="menu-menu-footer-container"><ul id="menu-menu-footer" class="menu"><li id="menu-item-5154" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-5154"><a href="https://cdit.ptit.edu.vn/">Trang chủ</a></li>
        <li id="menu-item-5159" class="menu-item menu-item-type-taxonomy menu-item-object-category current-menu-item menu-item-5159"><a href="https://cdit.ptit.edu.vn/category/gioi-thieu/" aria-current="page">Giới thiệu</a></li>
        <li id="menu-item-5160" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-5160"><a href="https://cdit.ptit.edu.vn/nghien-cuu/">Nghiên cứu</a></li>
        <li id="menu-item-5161" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-5161"><a href="https://cdit.ptit.edu.vn/category/san-pham/">Sản phẩm</a></li>
        <li id="menu-item-5162" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-5162"><a href="https://cdit.ptit.edu.vn/category/dich-vu/">Dịch vụ</a></li>
        <li id="menu-item-5163" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-5163"><a href="https://cdit.ptit.edu.vn/category/dao-tao/">Đào tạo</a></li>
        <li id="menu-item-5158" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-5158"><a href="https://cdit.ptit.edu.vn/category/tin-tuc-moi/">Tin tức</a></li>
        <li id="menu-item-5164" class="menu-item menu-item-type-post_type menu-item-object-post menu-item-5164"><a href="https://cdit.ptit.edu.vn/cdit-tuyen-dung-nghien-cuu-vien/">Tuyển dụng</a></li>
      </ul></div></aside></div><div class="column one-second"><aside id="block-9" class="widget widget_block widget_text">
        <p>LIÊN KẾT</p>
      </aside><aside id="block-14" class="widget widget_block"><div>
        <ul>
          <li>
            <a href="https://mic.gov.vn/">
              <img decoding="async" loading="lazy" src={Logo2} height="60px" width="60px" />
            </a>
            <span style={{ 'margin-bottom': '10px' }}>Bộ Thông tin và Truyền thông</span>
          </li>
          <li>
            <a href="https://portal.ptit.edu.vn/">
              <img decoding="async" loading="lazy" style={{ 'margin-top': '20px' }} src={Logo3} height="60px" width="60px" />
            </a>
            <span style={{ 'margin-bottom': '10px' }}>Học viện Công Nghệ Bưu Chính Viễn Thông</span>
          </li>
        </ul>
      </div></aside></div><div class="column one-fourth"><aside id="block-10" class="widget widget_block widget_text">
        <p>LIÊN HỆ</p>
      </aside><aside id="block-13" class="widget widget_block"><div style={{ 'margin-top': '-10px' }}>
        <p style={{ 'font-weight': 'bold' }}>Viện công nghệ Thông tin và Truyền thông CDIT</p>
        <p> <span style={{ 'font-weight': 'bold' }}>Địa chỉ</span>: Tầng 3 nhà A1, Học viện Công Nghệ Bưu Chính Viễn Thông, Km 10, Đường Nguyễn Trãi, Hà Đông, Hà Nội</p>
        <p> <span style={{ 'font-weight': 'bold' }}>Email</span>: cdit@ptit.edu.vn</p>
        <p> <span style={{ 'font-weight': 'bold' }}>Điện thoại</span>: (84-24) 3574 2856</p>
        <p> <span style={{ 'font-weight': 'bold' }}>Fax</span>: (84-24) 3574 2857</p>
      </div>
          </aside></div></div></div>

      <div class="footer_copy">
        <div class="container" style={{'justify-content': 'center' }}>
          <div class="column one">

            <a id="back_to_top" class="footer_button" href="https://cdit.ptit.edu.vn/category/gioi-thieu/"><i class="icon-up-open-big"></i></a>
            <div class="copyright">
              @CDIT						</div>

            <ul class="social"></ul>
          </div>
        </div>
      </div>



    </footer>
  );
};

export default Footer;
