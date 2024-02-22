import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const ProdServ = () => {
  var state = useLocation().state;
  // const [value, setValue] = useState(state?.title || "");
  // const [title, setTitle] = useState(state?.desc || "");
  // const [file, setFile] = useState(null);
  // const [cat, setCat] = useState(state?.cat || "");

  const [file, setFile] = useState(state?.file || null);
  const [desc, setDesc] = useState(state?.desc || "");

  

  // console.log('file: ')
  // console.log(file)
  const [selectedOption,setSelectedOption] = useState('');


  const [post, setPost] = useState({});

  const location = useLocation();

  if (state == null) {
    state = {id: -3}
  }

  // console.log(state)

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`/dichvus/`);
          setPost(res.data);
          
          //setDesc(post[1].desc);
          
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
      getServById();
    },  [selectedOption]);

  //console.log(post)
  

  const navigate = useNavigate()
  

  const [files, setFiles] = useState([]);


  const getServById = async()=> {
    const res = await axios.get(`/dichvus/${selectedOption}`);
    console.log(selectedOption)
    if (!selectedOption) {
      const res2 = await axios.get(`/dichvus/1`);
      console.log(res2.data)
      setSelectedOption(1)
      setPost(res2.data)
      setDesc(res2.data.desc)
      console.log('Empty')
    } else {
    //console.log(selectedOption2)
      console.log(res.data)
      setPost(res.data);
      setDesc(res.data.desc)
    }
  }

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
    e.preventDefault();
    const imgUrl = await upload();

    console.log(imgUrl)


    let url = '/dichvus/' + selectedOption;

    console.log(url)

    console.log(desc)

    if (desc) {
      try {
            await axios.put(url, {
              title: post.title?  post.title: 'null',
              desc: post.desc? desc :'null',
              cat: post.cat? post.cat : 'null',
              // img: file ? imgUrl : '',
              img: file ? imgUrl : post.img,
            })
            console.log('Updated')
            //window.location.href = '/';
            alert('Success')
          
          // console.log('File: ')
          // console.log(file)




      } catch (err) {
        console.log(err);
        alert('Error')
      }
    }else {
      alert('Error')
    }
  };


  return (
    <>

    <div className="add">
      
      <div className="menu">
        <div className="item">
          <h1>Dich vu/San pham</h1>
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
            Upload Image
          </label>

          {/* <input
            type="text"
            placeholder="Dich vu slot"
            // onChange={(e) => setTitle(e.target.title)}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          /> */}
          <select 

          value={selectedOption}
          onChange={async (e) => {
            const val = e.target.value;
            setSelectedOption(val);
            // console.log(selectedOption);
            
            console.log(selectedOption);
          }}
          >
            <option value="1">**Slot 1</option>
            <option value="2">Slot 2</option>
            <option value="3">Slot 3</option>
            <option value="4">Slot 4</option>
            <option value="5">Slot 5</option>
            
            <option value="6">**Slot 6</option>
            <option value="7">Slot 7</option>
            <option value="8">Slot 8</option>
            <option value="9">Slot 9</option>
            <option value="10">Slot 10</option>
          </select>
          <input
            type="text"
            placeholder="Dich vu/San pham link"
            // onChange={(e) => setTitle(e.target.title)}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <div className="buttons">
            <button onClick={handleClick}>Edit slot info</button>
          </div>

        </div>
       


        
      </div>
    </div>

    </>
  );
};

export default ProdServ;
