const mongoose = require("mongoose");

const mofaSchema = new mongoose.Schema(
  {
    isTest: { type: Boolean, required: true },
    fillDate: { type: Date, required: true },
    CrewM: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: false },
    MadName: { type: String, required: true },
    Emda: { type: String, required: true },
    No: { type: String, required: true },
    X11: { type: String, required: true },
    X12: { type: String, required: true },
    X13: { type: String, required: true },
    X21: { type: Boolean, required: true },
    X22: { type: Boolean, required: true },
    X23: { type: Boolean, required: true },

    C1: { type: Number, required: true },
    C2: { type: Number, required: true },
    C3: { type: Number, required: true },
    C4: { type: Number, required: true },
    C5: { type: Number, required: true },
    C6: { type: Number, required: true },
    C7: { type: Number, required: true },
    C8: { type: Number, required: true },
    C9: { type: Number, required: true },

    M1: { type: Number, required: true },

    M11: { type: String, required: false },
    M21: { type: String, required: false },
    Mf: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Mofa = mongoose.model("mofa", mofaSchema);

module.exports = Mofa;
