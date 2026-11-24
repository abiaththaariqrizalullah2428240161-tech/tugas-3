const mongoose = require("mongoose");
const motorcycleModel = require("../models/motorcycleModel");
const Brand = require("../models/Brand");

function getInfo(req, res) {
  res.json({
    nama: "Abi Ath Thaariq Rizalullah",
    npm: process.env.NPM || "2428240161",
    topik: "Data Sepeda Motor",
    resource: "motorcycles",
    fitur: ["MongoDB", "Embedding", "Referencing", "Filtering", "Pagination", "Sorting", "Projection"],
    endpoints: [
      "GET /motorcycles",
      "GET /motorcycles/:id",
      "POST /motorcycles",
      "PUT /motorcycles/:id",
      "DELETE /motorcycles/:id",
      "GET /brands",
      "POST /brands"
    ]
  });
}

async function getAll(req, res, next) {
  try {
    const result = await motorcycleModel.getAll(req.query);
    res.json({ status: 200, ...result });
  } catch (error) { next(error); }
}

async function getById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ status: 400, message: "ID tidak valid" });
    }
    const data = await motorcycleModel.getById(req.params.id);
    if (!data) return res.status(404).json({ status: 404, message: "Sepeda motor tidak ditemukan" });
    res.json({ status: 200, data });
  } catch (error) { next(error); }
}

function validateMotorcycle(body) {
  return body && body.brand && mongoose.isValidObjectId(body.brand) &&
    body.model && body.harga !== undefined &&
    body.spesifikasi && body.spesifikasi.kapasitasCc &&
    body.spesifikasi.transmisi && body.spesifikasi.bahanBakar;
}

async function create(req, res, next) {
  try {
    if (!validateMotorcycle(req.body)) {
      return res.status(400).json({
        status: 400,
        message: "Isi brand (ObjectId valid), model, harga, dan spesifikasi (kapasitasCc, transmisi, bahanBakar)"
      });
    }
    const brandExists = await Brand.findById(req.body.brand);
    if (!brandExists) return res.status(404).json({ status: 404, message: "Brand tidak ditemukan" });

    const data = await motorcycleModel.create(req.body);
    res.status(201).json({ status: 201, message: "Data sepeda motor berhasil ditambahkan", data });
  } catch (error) { next(error); }
}

async function update(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ status: 400, message: "ID tidak valid" });
    }
    if (!validateMotorcycle(req.body)) {
      return res.status(400).json({ status: 400, message: "Data sepeda motor belum lengkap atau brand tidak valid" });
    }
    const brandExists = await Brand.findById(req.body.brand);
    if (!brandExists) return res.status(404).json({ status: 404, message: "Brand tidak ditemukan" });

    const data = await motorcycleModel.update(req.params.id, req.body);
    if (!data) return res.status(404).json({ status: 404, message: "Sepeda motor tidak ditemukan" });
    res.json({ status: 200, message: "Data sepeda motor berhasil diperbarui", data });
  } catch (error) { next(error); }
}

async function remove(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ status: 400, message: "ID tidak valid" });
    }
    const data = await motorcycleModel.remove(req.params.id);
    if (!data) return res.status(404).json({ status: 404, message: "Sepeda motor tidak ditemukan" });
    res.json({ status: 200, message: "Data sepeda motor berhasil dihapus" });
  } catch (error) { next(error); }
}

async function getBrands(req, res, next) {
  try {
    const data = await Brand.find().sort({ nama: 1 });
    res.json({ status: 200, total: data.length, data });
  } catch (error) { next(error); }
}

async function createBrand(req, res, next) {
  try {
    const { nama, negara } = req.body || {};
    if (!nama || !negara) return res.status(400).json({ status: 400, message: "nama dan negara wajib diisi" });
    const data = await Brand.create({ nama, negara });
    res.status(201).json({ status: 201, message: "Brand berhasil ditambahkan", data });
  } catch (error) { next(error); }
}

module.exports = { getInfo, getAll, getById, create, update, remove, getBrands, createBrand };