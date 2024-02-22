import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo" class="column one" style={{
        'display': 'flex',
        'flex-direction': 'row',
        'width':'100%',
        'justify-content': 'center',
        'position': 'relative',
        // 'left': '-115px' ,
        // 'margin-right': '250px',
        'padding-top': '7px'}}>
          <div class="column" style={{'text-align':'center', 'width':'10%', 
          // 'margin-left':'230px',
            'position': 'relative',
            // 'left': '-30px' 
            }}>
            <Link to="/">
            <img src={Logo} style={{'max-height': '60px'}} alt="" />
            </Link>
          </div>

          <div class="column" style={{'text-align':'center', 'width':'45%', 'margin-top':'10px', 
          // 'padding-right':'40px',
            'position': 'relative',
            // 'left': '-120px' 
            'margin-right': '10vw',
            
            }}>
            <span style={{'margin-top':'50px', 'text-align': 'center','font-size': '23px','font-weight': '400','color': 'red'
          }}>VIỆN CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG CDIT</span>
          </div>
        </div>
        <div className="links">
        <Link className="link link-brd" to="/?">
            <h6>Trang chủ</h6>
          </Link>
          <Link className="link link-brd" to="/?cat=gthieu">
            <h6>Giới thiệu</h6>
          </Link>
          <Link className="link link-brd" to="/?cat=nghcuu">
            <h6>Nghiên cứu</h6>
          </Link>
          <Link className="link link-brd" to="/?cat=spham">
            <h6>Sản phẩm</h6>
          </Link>
          <Link className="link link-brd" to="/?cat=dvu">
            <h6>Dịch vụ</h6>
          </Link>
          <Link className="link link-brd" to="/?cat=dtao">
            <h6>Đào tạo</h6>
          </Link>
          <Link className="link link-brd" to="/?cat=ttuc">
            <h6>Tin tức</h6>
          </Link>
          <Link className="link link-brd" to="/Hiring">
            <h6>Tuyển dụng</h6>
          </Link>
          <Link className="link" to="/Contact">
            <h6>Liên hệ</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Đăng xuất</span>
          ) : (
            <Link className="link" to="/login">
              Đăng nhập
            </Link>
          )}
          

          {currentUser &&
          <div 
              className="link" 
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
            >
              Chỉnh sửa
              {isHovered && (
                <ul className="menu-items">
                  
                  <li>
                    <Link to="/banner">
                      Thay Banner
                    </Link>
                  </li>
                  <li>
                    <Link to="/Prodserv">
                    Thay dịch vụ/sản phẩm tiêu biểu
                    </Link>
                  </li>
                  
                  <li>
                    <Link to="/video">
                    Thay Video
                    </Link>
                    </li>
                </ul>
              )}
          </div>
        }

          
          {/* <span className="link">
            <Link className="link" to="/write">
              Đăng bài
            </Link>
          </span> */}

          {currentUser ? (
            <Link className="link" to="/write">
              Đăng bài
            </Link>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </div>


  );
};

export default Navbar;
