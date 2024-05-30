import mongoose, { Schema } from "mongoose";

const userSchema2 = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export type BukuKasType = {
  _id: string;
  name: string;
  desc: string;
  userId: string;
  reportVisibilityCode: boolean;
  statusId: boolean;
};

const kegiatanSchema2 = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    desc: {
      type: String,
    },
    userId: {
      type: String,
      require: true,
    },
    reportVisibilityCode: {
      type: Boolean,
      require: true,
      default: true,
    },
    statusId: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export type CategoryType = {
  _id: string;
  nama: string;
  tipe: string;
  kegiatanId: number;
  statusId: boolean;
};

const kategoriSchema2 = new Schema(
  {
    nama: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
    },
    tipe: {
      type: String,
      require: true,
    },
    statusId: {
      type: Boolean,
      require: true,
    },
    kegiatanId: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const transaksiSchema2 = new Schema(
  {
    date: {
      type: Date,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    tipe: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    kategoriId: {
      type: String,
      require: true,
    },
    kegiatanId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const cobaSchema = new Schema({
  name: {
    type: String,
    unique: false,
  },
  year: { type: String, unique: false },
  gender: { type: String },
});

const authsSchema = new Schema({
  kegiatanId: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
});

export const User2 =
  mongoose.models.User2 || mongoose.model("User2", userSchema2);
export const Kegiatan2 =
  mongoose.models.Kegiatan2 || mongoose.model("Kegiatan2", kegiatanSchema2);
export const Kategori2 =
  mongoose.models.Kategori2 || mongoose.model("Kategori2", kategoriSchema2);
export const Transaksi2 =
  mongoose.models.Transaksi2 || mongoose.model("Transaksi2", transaksiSchema2);
export const Coba = mongoose.models.Coba || mongoose.model("Coba", cobaSchema);
export const Auths =
  mongoose.models.Auths || mongoose.model("Auths", authsSchema);
