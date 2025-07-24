import apiInstance from "../instance";

export const deleteMultipleProducts = async (ids: string[]) => {
  const path = `/products/deleteMultipleProducts`;
  const r = await apiInstance.post(path, ids);
  return r.data.data;
};
