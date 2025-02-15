import mongoose, { Schema, Document, Model } from "mongoose";

// Define TypeScript Interface for Player
interface IPlayer {
  name: string;
  gender: "Male" | "Female" | "Other";
  id: string;
  mobile: string;
  playerIdCardPicPath: string;
  isCaptain?: boolean;
}

// Define TypeScript Interface for Team
interface ITeam extends Document {
  teamID: number;
  event: string;
  college: string;
  email: string;
  players: IPlayer[];
  upiId: string;
  transactionScreenshotPath?: string;
  idCardPicPath?: string;
  password: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

// Player Schema
const PlayerSchema = new Schema<IPlayer>({
  name: { type: String, required: true, trim: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
  mobile: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/, // Indian mobile number validation
  },
  playerIdCardPicPath: { type: String, required: true },
  isCaptain: { type: Boolean, default: false },
});

// Team Schema
const TeamSchema = new Schema<ITeam>(
  {
    teamID: { type: Number, required: true, unique: true },
    event: { type: String, required: true, trim: true },
    college: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
    },
    players: {
      type: [PlayerSchema],
      validate: [(val: IPlayer[]) => val.length > 0, "At least one player required."],
    },
    upiId: { type: String, required: true, trim: true },
    transactionScreenshotPath: { type: String, default: null },
    idCardPicPath: { type: String, default: null },
    password: { type: String, required: true, minlength: 6 },
    amount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Team Model
const TeamModel: Model<ITeam> = mongoose.models?.Team || mongoose.model<ITeam>("Team", TeamSchema);

export default TeamModel;
