import { environments } from "@/config/environments";
import qs from "qs";

export const destroyCloudinaryImage = async (public_id: string) => {
  const localUrl = new URL(`${window.location.origin}/api/cloudinary`);
  localUrl.searchParams.set("public_id", public_id);
  const response = await fetch(localUrl);
  const { signature, timestamp } = await response.json();
  const url = `https://api.cloudinary.com/v1_1/${environments.CLOUDINARY_CLOUD_NAME}/image/destroy`;
  // const formData = new FormData();
  // formData.append("public_id", public_id.split("/")[1]);
  // formData.append("api_key", environments.CLOUDINARY_API_KEY);
  // formData.append("timestamp", timestamp);
  // formData.append("signature", signature);
  const body = {
    timestamp,
    signature,
    api_key: environments.CLOUDINARY_API_KEY,
    public_id: public_id,
  };
  const responseCloudinary = await fetch(url, {
    method: "POST",
    body: qs.stringify(body),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  console.log({ cloudinaryResponse: responseCloudinary });
  return responseCloudinary;
};
