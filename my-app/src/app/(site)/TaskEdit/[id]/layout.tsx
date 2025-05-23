
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar tarea",
  description: "Generated by create next app",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>{children}</div>
  );
}
