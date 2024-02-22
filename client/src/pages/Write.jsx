import React, { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";


import Editor from "./Editor";


const Write = () => {
  var state = useLocation().state;
  // const [value, setValue] = useState(state?.title || "");
  // const [title, setTitle] = useState(state?.desc || "");
  // const [file, setFile] = useState(null);
  // const [cat, setCat] = useState(state?.cat || "");

  const [title, setTitle] = useState(state?.title || "");
  const [desc, setDesc] = useState(state?.desc || "");
  const [file, setFile] = useState(state?.file || null);
  const [cat, setCat] = useState(state?.cat || "");

  // console.log('file: ')
  // console.log(file)

  const [post, setPost] = useState({});

  const location = useLocation();

  const [editorLoaded, setEditorLoaded] = useState(false);


  if (state == null) {
    state = {id: '$null$'}
  }

  // console.log(state)

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/posts/${state.id}`);
          setPost(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
      //handlePaste();
      setEditorLoaded(true);
    }, []);

  //console.log(post)


  const navigate = useNavigate()

  const upload = async () => {

      if(file) {

        try {
            const formData = new FormData();
            // console.log(file)
            // formData.append("file", file);

            for (let i=0; i<file.length; i++)
              formData.append("files", file[i]);

            // console.log(formData)
            

            formData.append('oldImage', post.img);
            // formData.append('oldImage', 1432423);

            const res = await axios.post("/upload", formData);
            //console.log(file)
            console.log(res.data)
            return res.data;
          } catch (err) {
            console.log(err);
          }
      }
  };

  const handleClick = async (e) => {
    //fetchData();

    if(title && desc  && cat ) {

        console.log(title + ', ' +  desc + ',' + cat)

        e.preventDefault();
        const imgUrl = await upload();

        console.log(imgUrl)
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
        
        

        try {
            if (state && state.id != '$null$') {
              await axios.put(`/posts/${state.id}`, {
                title: title,
                desc: desc,
                cat,
                img: file ? imgUrl : post.img,
              })
              alert('Post updated')
              window.location.href = '/post/'+state.id;
            }else {
              await axios.post(`/posts/`, {
                title: title,
                desc: desc,
                cat,
                img: file ? imgUrl : post.img,
                date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
              });
              alert('Post created')
              window.location.href = '/?cat='+cat;
            }
            // console.log('File: ')
            // console.log(file)
            //window.location.href = '/';
        } catch (err) {
          console.log(err);
          alert('Error')
        }

    } else {
      alert('Fill in info')
    }
  };
  
  

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          // onChange={(e) => setTitle(e.target.title)}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          {/* <ReactQuill
            className="editor"
            theme="snow"
            value={desc}
            // modules={modules}
            onChange={setDesc}
            
          /> */}

        <Editor
        name="description"
        value={desc}
        onChange={(desc) => {
          setDesc(desc);
          console.log(desc)
        }}
        editorLoaded={editorLoaded}
      />




        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Đăng bài</h1>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            // value={file}
            // onChange={(e) => setFile(e.target.files[0])}
            onChange={(e) => setFile(e.target.files)}
          />
          <label className="file" htmlFor="file">
            Upload ảnh
          </label>
          <div className="buttons">
            <button onClick={handleClick}>Đăng bài</button>
          </div>
        </div>
        <div className="item">
          <h1>Danh mục</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "gthieu"}
              name="gthieu"
              value="gthieu"
              id="gthieu"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="gthieu">Giới thiệu</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "nghcuu"}
              name="cat"
              value="nghcuu"
              id="nghcuu"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="nghcuu">Nghiên cứu</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "spham"}
              name="cat"
              value="spham"
              id="spham"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="spham">Sản phẩm</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "dvu"}
              name="cat"
              value="dvu"
              id="dvu"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="dvu">Dịch vụ</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "dtao"}
              name="cat"
              value="dtao"
              id="dtao"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="dtao">Đào tạo</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "ttuc"}
              name="cat"
              value="ttuc"
              id="ttuc"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="ttuc">Tin tức</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
