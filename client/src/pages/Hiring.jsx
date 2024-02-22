import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

const Hiring = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  var { currentUser } = useContext(AuthContext);
  //console.log(currentUser.username);

  if (currentUser == null) {
    currentUser = {'username': '!!@@$Unknown$@@!!'}
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/-5`);
        setPost(res.data);

        //console.log('Single Res')
        //console.log(res.data)

        //const res2 = await axios.get(`/posts/?cat=art`);
        const res2 = await axios.get(`/dichvus/test`);
        console.log(res2.data);

        //console.log('Single Res2 (cat)')
        //console.log(res2.data.filter( x => x.id != postId ) )

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    
  }, [postId]);

  //console.log(post)

  const cat = post.cat;

  const [posts, setPosts] = useState([]);



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(`/posts/?cat=${cat}`);
  //       //setPosts(res.data);
  //       // const testres = res.data.splice(-3);
  //       // console.log(testres);
  //       // console.log(res.data);
  //       //setPosts2(res.data.splice(-3));
  //       // console.log( postId);
  //       // //console.log( res.data.forEach( x => console.log(x.id != postId )) );
  //       // console.log( res.data.filter( x => x.id != postId ) );
  //       setPosts( res.data.filter( x => x.id != postId ) );
  //       console.log()


  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  //   //console.log(posts.filter(post => post.id !== postId));
    
  // }, [cat]);

  const handleDelete = async ()=>{
    if(window.confirm('Delete?')) {
      try {
        await axios.delete(`/posts/${postId}`);
        navigate("/")
      } catch (err) {
        console.log(err);
      }
    }
    
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div style={{'background-color': '#FCFCFC'}}>
      <div className="single">
          <div className="content">
            
            {/* <img src={`../upload/${post?.img}`} alt="" /> */}
            <h1>{post.title}</h1>
            {post?.img ? (
              <img src={`../upload/${post?.img}`} alt="" />
            ) : (<span></span>)
            }
            <div className="user">
              {post.userImg && <img
                src={post.userImg}
                alt=""
              />}
              <div className="info">
                <span>{post.username?post.username : 'User'}</span>
                <p>Posted {moment(post.date).fromNow()}</p>
              </div>
              {currentUser.username === post.username && (
                <div className="edit">
                  <Link to={`/write?edit=2`} state={post}>
                    <img src={Edit} alt="" />
                  </Link>
                  <img onClick={handleDelete} src={Delete} alt="" />
                </div>
              )}


            </div>
            
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.desc),
              }}
            ></p>      
            </div>
      </div>
    </div>
  );
};

export default Hiring;
