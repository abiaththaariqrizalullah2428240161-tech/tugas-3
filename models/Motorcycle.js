const mongoose = require("mongoose");

// Embedded schema: spesifikasi disimpan di dalam dokumen Motorcycle.
const spesifikasiSchema = new mongoose.Schema(
  {
    kapasitasCc: { type: Number, required: true, min: 1 },
    transmisi: { type: String, required: true, trim: true },
    bahanBakar: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const motorcycleSchema = new mongoose.Schema(
  {
    // Referencing: ObjectId menunjuk ke dokumen pada collection brands.
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "Referensi brand wajib diisi"]
    },
    model: { type: String, required: true, trim: true },
    harga: { type: Number, required: true, min: 0 },
    warna: { type: [String], default: [] },
    spesifikasi: { type: spesifikasiSchema, required: true }
  },
  { timestamps: true }
);

motorcycleSchema.index({ model: 1 });
motorcycleSchema.index({ harga: 1 });

module.exports = mongoose.model("Motorcycle", motorcycleSchema);