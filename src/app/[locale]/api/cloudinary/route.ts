import { environments } from "@/config/environments";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: environments.CLOUDINARY_CLOUD_NAME,
  api_key: environments.CLOUDINARY_API_KEY,
  api_secret: environments.CLOUDINARY_API_SECRET,
});

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const public_id = searchParams.get("public_id");
  const timestamp = Math.round(new Date().getTime() / 1000);
  const options = {
    timestamp,
    ...(!public_id && { folder: "gestora" }),
    ...(public_id && { public_id }),
  };
  console.log({ options });
  const signature = cloudinary.utils.api_sign_request(
    options,
    environments.CLOUDINARY_API_SECRET,
  );
  return Response.json({ timestamp, signature });
};
