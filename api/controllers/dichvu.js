import { db } from "../db.js";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

export const getDichvus = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM dichvu WHERE cat=?"
    : "SELECT * FROM dichvu";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getDichvu = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN dichvu p WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
    
  });
};

export const addDichvu = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO dichvu(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Dichvu has been created.");
    });
  });
};

export const deleteDichvu = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const dichvuId = req.params.id;
    const q = "DELETE FROM dichvu WHERE `id` = ? AND `uid` = ?";

    db.query(q, [dichvuId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your dichvu!");

      return res.json("dichvu has been deleted!");
    });
  });
};

export const updateDichvu = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    //console.log(req);

    const dichvuId = req.params.id;
    const q =
      "UPDATE dichvu SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, dichvuId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("dichvu has been updated.");
      //return res.json(req);

    });
  });
};
