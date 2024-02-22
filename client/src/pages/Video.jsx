import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Video = () => {
  var state = useLocation().state;
  // const [value, setValue] = useState(state?.title || "");
  const [link, setLink] = useState(state?.title || "");
  // const [file, setFile] = useState(null);
  // const [cat, setCat] = useState(state?.cat || "");


  const [post, setPost] = useState({});

  const location = useLocation();



  //console.log(state);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/dichvus/-3`);
          setPost(res.data);

          // const res = await axios.get(`/dichvus/test`);
          console.log(res.data);

          if (res.data) {
            setLink(res.data.title)
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, []);

  //console.log(post)



 




  const handleClick = async (e) => {
    //fetchData();
    e.preventDefault();

    
    //console.log(state)

    try {
        if (link) {
          await axios.put(`/dichvus/-3`, {
            title: link? link:'null',
            desc: 'null',
            cat: 'null',
            // img: file ? imgUrl : '',
            img:  'null',
          })
          console.log('Vidoe link change')
          //window.location.href = '/';
          alert('Success')
        } else {
          console.log('Error')
          alert('Error')
        }
        // console.log('File: ')
        // console.log(file)




    } catch (err) {
      console.log(err);
      alert('Error')

    }
    
  };

  //Else do 3x1 upload, hidden 2

  return (
    <>

    <div className="add">
      
      <div className="menu">
        <div className="item">
          <h1>Video link</h1>
          <input
            type="text"
            placeholder="Title"
            // onChange={(e) => setTitle(e.target.title)}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          
          
          

          <div className="buttons">
            <button onClick={handleClick}>Change video link</button>
          </div>




        </div>
        
      </div>
    </div>

    </>
  );
};

export default Video;
