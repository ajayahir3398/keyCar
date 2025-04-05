const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const user = new mongoose.Schema(
  {
    id: { type: Number }, // Auto-incremented field
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: {
      street1: { type: String, required: true },
      street2: { type: String },
      address: { type: String },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    gstNumber: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Add auto-increment plugin for the `id` field
user.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("User", user);
