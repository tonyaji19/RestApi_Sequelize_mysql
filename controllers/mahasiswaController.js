import Mahasiswa from "../models/mahasiswaModel.js";
import path from "path";
import crypto from "crypto";
import fs from "fs";

export const getMahasiswa = async (req, res) => {
  try {
    const result = await Mahasiswa.findAll();
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};
export const getMahasiswaById = async (req, res) => {
  try {
    const result = await Mahasiswa.findOne({
      where: { id: req.params.id },
    });
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

export const addMahasiswa = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "foto belum di upload" });

  const nama = req.body.nama;
  const foto = req.files.foto;
  const jurusan = req.body.jurusan;
  const alamat = req.body.alamat;
  const npm = req.body.npm;
  const ukuranFoto = foto.data.length;
  const ext = path.extname(foto.name);
  const uniqKarakter = crypto.randomBytes(3).toString("hex");
  const namaFoto = uniqKarakter + foto.md5 + ext;
  const imgUrl = `${req.protocol}://${req.get("host")}/images/${namaFoto}`;
  const tipeFoto = [".png", ".jpg", ".jpeg"];

  if (!tipeFoto.includes(ext.toLocaleLowerCase()))
    return res.status(404).json({ msg: "tipe foto tidak sesuai" });
  if (ukuranFoto > 5000000)
    return res.status(404).json({ msg: "ukuran foto terlalu besar" });

  foto.mv(`./public/images/${namaFoto}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    console.log(req.body, 16);
    try {
      await Mahasiswa.create({
        nama: nama,
        foto: namaFoto,
        imgUrl: imgUrl,
        jurusan: jurusan,
        alamat: alamat,
        npm: npm,
      });
      res.status(200).json({ msg: "data berhasil ditambahkan!" });
    } catch (err) {
      console.log(err.message);
    }
  });
};

export const updateMahasiswa = async (req, res) => {
  const mahasiswa = await Mahasiswa.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!mahasiswa)
    return res.status(404).json({ msg: "data mahasiswa tidak ditemukan" });

  let foto = "";
  if (req.files === null) {
    foto = mahasiswa.foto;
  } else {
    const fotoBaru = req.files.foto;
    const ukuranFoto = fotoBaru.data.length;
    const ext = path.extname(fotoBaru.name);

    const uniqKarakter = crypto.randomBytes(3).toString("hex");
    foto = uniqKarakter + fotoBaru.md5 + ext;
    const tipeFoto = [".png", ".jpg", ".jpeg"];

    if (!tipeFoto.includes(ext.toLocaleLowerCase()))
      return res.status(404).json({ msg: "tipe foto tidak sesuai" });
    if (ukuranFoto > 5000000)
      return res.status(404).json({ msg: "ukuran foto terlalu besar" });

    const pathFoto = `./public/images/${mahasiswa.foto}`;
    fs.unlinkSync(pathFoto);

    fotoBaru.mv(`./public/images/${foto}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const nama = req.body.nama;
  const jurusan = req.body.jurusan;
  const alamat = req.body.alamat;
  const npm = req.body.npm;
  const pathUrl = `${req.protocol}://${req.get("host")}/images/${foto}`;

  try {
    await Mahasiswa.update(
      {
        nama: nama,
        foto: foto,
        imgUrl: pathUrl,
        jurusan: jurusan,
        alamat: alamat,
        npm: npm,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "data berhasil diubah!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMahasiswa = async (req, res) => {
  const mahasiswa = await Mahasiswa.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!mahasiswa)
    return res.status(404).json({ msg: "mahasiswa tidak ditemukan" });

  try {
    const pathFoto = `./public/images/${mahasiswa.foto}`;
    fs.unlinkSync(pathFoto);
    await Mahasiswa.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "data mahasiswa berhasil di hapus!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMahasiswabiasa = async (req, res) => {
  try {
    await Mahasiswa.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "data berhasil dihapus" });
  } catch (error) {
    console.log(error);
  }
};
