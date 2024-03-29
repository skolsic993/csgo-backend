import bcrypt from "bcrypt";
import mongoose from "mongoose";
import config from "./../config/default";

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  nick: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nick: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next: any) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config?.saltWorkFactor);
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt
    .compare(candidatePassword, user.password)
    .catch((error) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
