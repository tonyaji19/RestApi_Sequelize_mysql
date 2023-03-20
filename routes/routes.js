import express from "express";
import {
  getMahasiswa,
  addMahasiswa,
  getMahasiswaById,
  updateMahasiswa,
  deleteMahasiswa,
  deleteMahasiswabiasa,
} from "../controllers/mahasiswaController.js";

const router = express.Router();

router.get("/mahasiswa", getMahasiswa);
router.post("/mahasiswa", upload.single("image"), addMahasiswa);
router.get("/mahasiswa/:id", getMahasiswaById);
router.patch("/mahasiswa/:id", updateMahasiswa);
router.delete("/mahasiswa/:id", deleteMahasiswa);
// router.delete("/mahasiswa/:id", deleteMahasiswabiasa);

export default router;
