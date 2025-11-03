import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");

  // This will never be rendered
  return null;
}
