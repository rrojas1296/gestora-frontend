import { environments } from "@/config/environments";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: environments.CLOUDINARY_CLOUD_NAME,
  api_key: environments.CLOUDINARY_API_KEY,
  api_secret: environments.CLOUDINARY_API_SECRET,
});

export const GET = async () => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "gestora" },
    environments.CLOUDINARY_API_SECRET,
  );
  return Response.json({ timestamp, signature });
};
