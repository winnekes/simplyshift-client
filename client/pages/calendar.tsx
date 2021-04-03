import { Layout } from "../components/layout";
import { useAuthContext } from "../contexts/auth-context";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Calendar() {
  const auth = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!auth.user) {
      router.replace("/");
    }
  });
  return <Layout title="Calendar">LOGGED I</Layout>;
}
