import express from "express";
import {
  addDichvu,
  deleteDichvu,
  getDichvu,
  getDichvus,
  updateDichvu,
} from "../controllers/dichvu.js";

const router = express.Router();

router.get('/test', (req,res)=> {
  res.json('abc dichvu route')
})

router.get("/", getDichvus);
router.get("/:id", getDichvu);


router.post("/", addDichvu);
router.delete("/:id", deleteDichvu);
router.put("/:id", updateDichvu);

export default router;
