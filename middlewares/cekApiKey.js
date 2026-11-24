module.exports = function cekApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ status: 401, message: "API key tidak valid atau tidak ditemukan" });
  }
  next();
};