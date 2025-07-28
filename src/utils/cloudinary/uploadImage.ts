import { environments } from "@/config/environments";

export const uploadImage = async (image: File) => {
  const response = await fetch("/api/cloudinary");
  const { timestamp, signature } = await response.json();

  const body = new FormData();
  body.append("file", image);
  body.append("api_key", environments.CLOUDINARY_API_KEY);
  body.append("timestamp", timestamp);
  body.append("signature", signature);
  body.append("folder", "gestora");

  const responseCloudinary = await fetch(
    `${environments.CLOUDINARY_URL}/${environments.CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body,
    },
  );
  const { secure_url, public_id } = await responseCloudinary.json();
  return { secure_url, public_id };
};
