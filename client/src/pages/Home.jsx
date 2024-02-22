import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import Slider from '../components/Slider.jsx';


const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search

  const [banner, setBanner] = useState([]);

  const [video, setVideo] = useState([]);

  const [dichvu, setDichvu] = useState([]);

  const [width, setWidth] = React.useState(window.innerWidth);


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);

        const res2 = await axios.get(`/dichvus/-3`);

        var video_embed = res2.data.title.replace('watch?v=', 'embed/')

        setVideo(video_embed);

        const res3 = await axios.get(`/dichvus/`);
        setDichvu(res3.data);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);

    // Cleanup

  }, [cat]);



  //console.log(cat)

  posts.sort((a, b) => b.id - a.id);

  // posts.reverse();
  //console.log(posts.sort((a, b) => b.id - a.id).slice(0,posts.length-1))

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

  const getText = (html) => {
    if(html.includes('</td>')) {
      html = html.replaceAll("</td>", " </td>");
    }
    // if(html.includes('</strong>')) {
    //   html = html.split('</strong>').join(' </strong>');
    //   html = html.split('<td>').join('<td> ');
    // }
    
    const doc = new DOMParser().parseFromString(html, "text/html")
    //console.log(doc.body.textContent.slice(0,130))
    // return doc.body.textContent
    if (doc.body.textContent.length > 130) {
      return doc.body.textContent.slice(0, 130) + ' […]'
    } else {
      return doc.body.textContent
    }
  }


  return (
    //className={completed ? 'text-strike' : null}

    <>

      {/* img banner */}
      {/* If img, id = -3 */}
      <div className="home-items">
        {posts.filter(x => x.id == -3).map((post) =>

          // {post.img && (
          //   <div className="img">
          //     <Link className="link" to={`/post/${post.id}`}>
          //       <img src={`../upload/${post.img}`} alt="" />
          //     </Link>
          //   </div>
          // )}

          //   <div className="img">
          //       <img src={`../upload/${post.img}`} alt="" />
          // </div>
          // {
          //   console.log(post.img.split(','))
          // }

          <Slider images={post.img.split(',').map(image => ({ src: '../upload/' + image }))} />

          // <h5>{post.title}</h5>
        )}

        {/* {!cat && (
        // <Slider images={[{src: require('../img_test/dvu/1.png'), alt: 'Image 1'}, {src: require('../img_test/dvu/2.png'), alt: 'Image 2'}, {src: require('../img_test/dvu/3.png'), alt: 'Image 3'}]} />
        <Slider images={[{src: require('../img_test/dvu/1.png'), alt: 'Image 1'}, {src: require('../img_test/dvu/2.png'), alt: 'Image 2'}, {src: require('../img_test/dvu/3.png'), alt: 'Image 3'}]} />

        
        )} */}



        {/* product banner */}
        {!cat && (
          <>
            <div class=" video-bar"
              // style={{
              //   'width':  '33%'
              // }}
              style={{ 'margin-top': '40px' }}
            >CÁC DỊCH VỤ TIÊU BIỂU</div>
            {/* <div class="prod-show" style={{'flex-direction': window.innerWidth  >= 900 ? 'row' : 'column'}}> */}
            <div class={width >= 800 ? 'prod-show' :'prod-show2'} >

              {dichvu.filter(x => x.id > 0 && x.id < 6).map((dvu) =>



                <div  class={width >= 800 ? 'services' :'services2'}>
                  <a href={dvu.desc}>
                  <img class="img-part" src={dvu.img? `../upload/${dvu.img}`: `../upload/no-img.png`} />
                  </a>
                </div>


              )}
            </div>

            {/* <div class="prod-show">
              <div  ><img class="img-part" src={require('../img_test/dvu/1.png')} /></div>
              <div  ><img class="img-part" src={require('../img_test/dvu/2.png')} /></div>
              <div  ><img class="img-part" src={require('../img_test/dvu/3.png')} /></div>
              <div  ><img class="img-part" src={require('../img_test/dvu/4.png')} /></div>
              <div  ><img class="img-part" src={require('../img_test/dvu/5.png')} /></div>
            </div> */}

            <div class=" video-bar"
            // style={{
            //   'width':  '33%'
            // }}
            >CÁC SẢN PHẨM TIÊU BIỂU</div>

            {/* <div class="prod-show">
               <div class="img-part"><img src="https://www.splcenter.org/sites/default/files/kanye_on_infowars-700px.jpg" /></div>
                <div class="img-part"><img src="https://www.splcenter.org/sites/default/files/kanye_on_infowars-700px.jpg" /></div>
                <div class="img-part"><img src="https://www.splcenter.org/sites/default/files/kanye_on_infowars-700px.jpg" /></div>
                <div class="img-part"><img src="https://www.splcenter.org/sites/default/files/kanye_on_infowars-700px.jpg" /></div>
                <div class="img-part">
                <img src="https://www.splcenter.org/sites/default/files/kanye_on_infowars-700px.jpg" /></div>
            </div> */}
            <div class={width >= 800 ? 'prod-show' :'prod-show2'} >

              {dichvu.filter(x => x.id > 5 && x.id < 11).map((dvu) =>



                <div  class={width >= 800 ? 'services' :'services2'}>
                    <a href={dvu.desc}>
                    <img class="img-part" src={dvu.img? `../upload/${dvu.img}`: `../upload/no-img.png`} />
                    </a>
                  </div>


              )}
            </div>


            {/* <div class="prod-show">
              <div ><img class="img-part" src={require('../img_test/sph/1.png')} /></div>
              <div ><img class="img-part" src={require('../img_test/sph/2.png')} /></div>
              <div ><img class="img-part" src={require('../img_test/sph/3.png')} /></div>
              <div ><img class="img-part" src={require('../img_test/sph/4.png')} /></div>
              <div ><img class="img-part" src={require('../img_test/sph/5.png')} /></div>
            </div> */}


          </>
        )

        }






        {/* Tin tuc part */}
        <div className="home"
          style={{
            'margin-left': cat ? '30px' : null
          }}
        >
          <div class=" video-div"
          style={{'float': width >= 800 ? 'right' : 'none',
                    'width': width >= 800 ? '34%' : '100%',
            }}
          
          >
            {!cat && (
              <>
                <div class=" video-bar"
                // style={{
                //   'width':  '33%'
                // }}
                >VIDEO</div>


                  <iframe src={video ? video : null} 
                  title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen
                  style= {{'min-width': width >= 800 ? '' : '75vw' }}
                  
                  ></iframe>
   

                {/* min-width="430vw" min-height="215vh"  */}

                <div class=" video-bar"
                // style={{
                //   'width':  '33%'
                // }}
                >ĐỐI TÁC</div>

                <div style={{
                  'margin': '2vh 9vw'
                }}>
                  <img src={require('../img_test/mslogo.jpg')}
                    style={{
                      // 'max-height': width >= 800 ?'10vh':'20vh',
                      'max-width':  width >= 800 ? '10vw': '',
                      'width': width >= 800 ? '': '100%'
                    }}

                  />
                </div>

                <div class=" video-bar"
                // style={{
                //   'width':  '33%'
                // }}
                >FANPAGE</div>

                <div style={{
                  'margin': '2vh 3vw'
                }}>
                  <img src={require('../img_test/fanpage.png')}
                    style={{
                      // 'max-height': '20vh',
                      'max-width': width >= 800 ? '20vw': '',
                      'width': width >= 800 ? '': '100%',
                    }}

                  />
                </div>

              </>




            )


            }
          </div>



          <div className={!cat ? 'home-news' : ''} 
          style={{'float': width >= 800 ? 'left' : 'none',
               'width': width >= 800 ? '66%' : '100%',
        }}>
            {/* style="
    float: left;
    width: 66%;
" */}

            {!cat && (
              <div class="tin-tuc-bar">TIN TỨC</div>
            )


            }

            <div className="posts"
              style={{
                'flex-wrap': cat ? null : 'wrap',
                'flex-direction': cat ? 'column' : null,
                'width': cat ? '100%' : null
              }}>
              {posts.filter(x => x.id > 0).map((post) => (
                // <div className="post" key={post.id}
                //   style={{
                //     'flex-direction': cat ? 'row' : null,
                //     'width': cat ? null : '31.33%'
                //   }}>

                <div className={cat ? 'post-cat' : 'post'} key={post.id}


                >
                  {post.img && (
                    <div className="img">
                      <Link className="link" to={`/post/${post.id}`}>
                        <img src={`../upload/${post.img}`} alt="" />
                      </Link>
                    </div>
                  )}
                  {/* <div className="img">
                  <Link className="link" to={`/post/${post.id}`}>
                    <img src={`../upload/${post.img}`} alt="" />
                  </Link>
                </div> */}
                  <div className="content">


                    <Link className="link" to={`/post/${post.id}`}>
                      <h5 className={cat ? 'cat-title' : ''}>{post.title}</h5>
                    </Link>
                    <p style={{ 'font-size': '15px' }}>{getText(post.desc)}</p>
                    {/* <button>Read More</button> */}

                    {cat && (
                      <div className="read-more">
                        <Link to={`/post/${post.id}`}>
                          <button>Read More</button>

                        </Link>
                      </div>
                    )


                    }
                    {/* <div className="read-more">
                      <Link  to={`/post/${post.id}`}>
                        <button>Read More</button>

                      </Link>
                    </div> */}


                  </div>
                  {!cat && (
                    <div className="read-more">
                      <Link to={`/post/${post.id}`}>
                        <button>Read More</button>

                      </Link>
                    </div>
                  )


                  }

                </div>


              ))}
            </div>


          </div>
        </div>


      </div>
    </>
  );
};

export default Home;
