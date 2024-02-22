import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Banner = () => {
  var state = useLocation().state;
  // const [value, setValue] = useState(state?.title || "");
  // const [title, setTitle] = useState(state?.desc || "");
  // const [file, setFile] = useState(null);
  // const [cat, setCat] = useState(state?.cat || "");

  const [file, setFile] = useState(state?.file || null);

  // console.log('file: ')
  // console.log(file)

  const [post, setPost] = useState({});

  const location = useLocation();

  if (state == null) {
    state = {id: -3}
  }

  // console.log(state)

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/posts/-3`);
          setPost(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, []);

  //console.log(post)


  const navigate = useNavigate()
  

  const [files, setFiles] = useState([]);


  const upload = async () => {
      try {
        // const formData = new FormData();
        // formData.append("file", file);
        // const res = await axios.post("/upload", formData);
        //console.log(file)
        //console.log(res.data)
        // return res.data;

        const formData = new FormData();
        for (let i=0; i<files.length; i++)
          formData.append("files", files[i]);

        formData.append("oldImage", post.img.split(','));

        const res = await axios.post("/upload", formData);
        return res.data;

      } catch (err) {
        console.log(err);
      }

    };

  const handleClick = async (e) => {
    //fetchData();
    e.preventDefault();
    const imgUrl = await upload();

    console.log(imgUrl[0]);

    let finalImg = imgUrl[0];

    if (imgUrl.length > 1) {
      console.log(imgUrl.length);
      for (let i=1; i<imgUrl.length; i++) {
        finalImg += ','+imgUrl[i];
      }
    }

    console.log(finalImg)

    // if (imgUrl.length > 2) {
      
    // }

    // if (file != null) {
    //   imgUrl = await upload();
    //   console.log('File added')
    // } else {
    //   console.log('No File')
    //   console.log(post.img)
    // }
    
    //console.log(imgUrl)

    // if (file == null) {
    //   imgUrl = post.img;
    // }
    
    console.log(state)

    try {
        if (state) {
          await axios.put(`/posts/-3`, {
            title: 'a',
            desc: 'a',
            cat: 'a',
            // img: file ? imgUrl : '',
            img: files ? finalImg : '',
          })
          console.log('Uploaded')
          window.location.href = '/';
          alert('Success')
        } else {
          console.log('Error')
          alert('Error')
        }
        // console.log('File: ')
        // console.log(file)




    } catch (err) {
      console.log(err);
    }
    
  };

  //Else do 3x1 upload, hidden 2

  return (
    <>

    <div className="add">
      
      <div className="menu">
        <div className="item">
          <h1>Banner</h1>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            // value={file}
            // onChange={(e) => setFile(e.target.files[0])}
            onChange={(e) => setFiles(e.target.files)}
            multiple
          />
          <label className="file" htmlFor="file">
            Upload Image(s)
          </label>
          

          <div className="buttons">
            <button onClick={handleClick}>Upload banner</button>
          </div>




        </div>
        
      </div>
    </div>

    </>
  );
};

export default Banner;
