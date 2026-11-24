const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: [true, "Nama merek wajib diisi"],
      unique: true,
      trim: true
    },
    negara: {
      type: String,
      required: [true, "Negara asal wajib diisi"],
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);