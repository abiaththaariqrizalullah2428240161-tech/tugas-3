const Motorcycle = require("./Motorcycle");

function buildFilter(query) {
  const filter = {};

  if (query.brand) filter.brand = query.brand;
  if (query.minHarga !== undefined || query.maxHarga !== undefined) {
    filter.harga = {};
    if (query.minHarga !== undefined) filter.harga.$gte = Number(query.minHarga);
    if (query.maxHarga !== undefined) filter.harga.$lte = Number(query.maxHarga);
  }

  if (query.model) filter.model = { $regex: query.model, $options: "i" };
  return filter;
}

async function getAll(query) {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || 10, 1), 100);
  const sortField = ["harga", "model", "createdAt"].includes(query.sort)
    ? query.sort : "createdAt";
  const sortOrder = query.order === "asc" ? 1 : -1;
  const projection = query.fields
    ? query.fields.split(",").map((field) => field.trim()).filter(Boolean).join(" ")
    : "";

  const filter = buildFilter(query);
  let dataQuery = Motorcycle.find(filter).populate("brand", "nama negara");

  if (projection) dataQuery = dataQuery.select(projection);

  const [data, total] = await Promise.all([
    dataQuery.sort({ [sortField]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Motorcycle.countDocuments(filter)
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}

async function getById(id) {
  return Motorcycle.findById(id).populate("brand", "nama negara");
}

async function create(data) {
  const motorcycle = await Motorcycle.create(data);
  return motorcycle.populate("brand", "nama negara");
}

async function update(id, data) {
  return Motorcycle.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  }).populate("brand", "nama negara");
}

async function remove(id) {
  return Motorcycle.findByIdAndDelete(id);
}

module.exports = { getAll, getById, create, update, remove };