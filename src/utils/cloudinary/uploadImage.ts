import { environments } from "@/config/environments";

export const uploadImage = async (image: File) => {
  const response = await fetch("/api/cloudinary");
  const { timestamp, signature } = await response.json();

  const formData = new FormData();
  formData.append("file", image);
  formData.append("api_key", environments.CLOUDINARY_API_KEY);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append(
    "responsive_breakpoint",
    JSON.stringify([
      {
        create_derived: true,
        bytes_step: 20000,
        min_width: 200,
        max_width: 1000,
      },
    ]),
  );
  formData.append("folder", "gestora");

  const responseCloudinary = await fetch(
    `https://api.cloudinary.com/v1_1/${environments.CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );
  const { secure_url } = await responseCloudinary.json();
  return secure_url;
};
