function notFound(req, res) {
  res.status(404).json({ status: 404, message: "Endpoint tidak ditemukan" });
}

function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.code === 11000) {
    return res.status(409).json({ status: 409, message: "Nama brand sudah terdaftar" });
  }
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({ status: 400, message: err.message });
  }
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ status: 400, message: "Format JSON tidak valid" });
  }

  res.status(500).json({ status: 500, message: "Terjadi kesalahan pada server" });
}

module.exports = { errorHandler, notFound };