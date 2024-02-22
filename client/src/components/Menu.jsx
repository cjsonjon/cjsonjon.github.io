import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";



const Menu = ({cat}) => {
  const [posts, setPosts] = useState([]);
  //const [posts2, setPosts2] = useState([]);

  const location = useLocation();

  //const navigate = useNavigate();


  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        //setPosts(res.data);
        // const testres = res.data.splice(-3);
        // console.log(testres);
        // console.log(res.data);
        //setPosts2(res.data.splice(-3));
        console.log('Related Post');
        console.log( postId);
        //console.log( res.data.forEach( x => console.log(x.id != postId )) );
        console.log( res.data.filter( x => x.id != postId ) );
        setPosts( res.data.filter( x => x.id != postId ) );


      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    //console.log(posts.filter(post => post.id !== postId));
    
  }, [cat]);

  function handleStuff(input) {
    //console.log(input)
    window.location.href = '/post/' + input;

  }


  //handle links
  // const handleMenu = async ()=>{
  //   console.log(test)

  //   try {
  //     await axios.get(`/posts/${postId}`);
  //     navigate('/post/'+9)
  //   } catch (err) {
  //     console.log(err);
  //   }
    
  // }

  // const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  // ];
  return (
    <div className="menu" style={{'flex-direction':'column'}} >
      <h4 style={{'font-size':'21px'}}>Related posts</h4>
      <div className="menu" style={{'flex-direction':'row'}}>
      {posts.slice(-3).map((post) => (
        <div className="post" key={post.id} style={{'width':'30%'}}>


          { post.img ? (
              <div>
                {/* <Link className="link" to={`/post/${post.id}`}>
                    <img src={`../upload/${post?.img}`} alt="" />
                </Link> */}
                <img onClick={ () => {handleStuff(post.id)} } src={`../upload/${post?.img}`} alt="" />

              </div>

              // <Link className="link" to={`/post/${post.id}`}>
              //   <img src={`../upload/${post?.img}`} alt="" />
              // </Link>
            ):
            (
          // <Link className="link" to={`/post/${post.id}`}>
          //       <img src={`../upload/no-img.png`} alt="" />
          //     </Link>

              <img onClick={ () => {handleStuff(post.id)} } src={`../upload/no-img.png`} alt="" />
            )
            
          }


          {/* <Link className="link" to={`/post/${post.id}`}>
              <h2 onClick={ () => {handleStuff(post.id)} }>{post.title}</h2>
          </Link> */}
          <h2 onClick={ () => {handleStuff(post.id)} }>{post.title}</h2>

          {/* <Link className="link" to={`/post/${post.id}`}>
              <button>Read More</button>
            </Link> */}

            <button onClick={ () => {handleStuff(post.id)} }>Read More</button>
        </div>
      ))
      
      
      }
      </div>
    </div>
  );
};

export default Menu;
