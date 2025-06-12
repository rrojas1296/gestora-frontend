import { clientSupabase } from "..";

export const signOut = async () => await clientSupabase.auth.signOut();
