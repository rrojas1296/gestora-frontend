import { environments } from "@/config/environments";

export const destroyCloudinaryImage = async (public_id: string) => {
  const localUrl = new URL(`${window.location.origin}/api/cloudinary`);
  localUrl.searchParams.set("public_id", public_id);
  const response = await fetch(localUrl);

  const { signature, timestamp } = await response.json();
  const url = `${environments.CLOUDINARY_URL}/${environments.CLOUDINARY_CLOUD_NAME}/image/destroy`;

  const formData = new FormData();
  formData.append("public_id", public_id);
  formData.append("api_key", environments.CLOUDINARY_API_KEY);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  const responseCloudinary = await fetch(url, {
    method: "POST",
    body: formData,
  });
  return responseCloudinary;
};
