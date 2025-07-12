import { getAuthUser } from "@/utils/api/users/getUserById";
import { useQuery } from "@tanstack/react-query";

const useAuthUser = () => {
  const { isLoading: loading, data: userDB } = useQuery({
    queryKey: ["userAuth"],
    queryFn: async () => {
      return await getAuthUser();
    },
  });
  return {
    loading,
    userDB,
  };
};

export default useAuthUser;
