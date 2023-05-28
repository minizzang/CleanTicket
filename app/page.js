"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Main() {
  const { push } = useRouter();
  useEffect(() => {
    push("/home");
  }, []);
  return <p></p>;
}
