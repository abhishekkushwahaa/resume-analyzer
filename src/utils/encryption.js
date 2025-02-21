import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const algorithm = "aes-256-cbc";
const key = crypto.scryptSync(process.env.ENCRYPTION_KEY, "salt", 32);
const iv = Buffer.alloc(16, 0);

export const encryptData = (data) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decryptData = (encryptedData) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
