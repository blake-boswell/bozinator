export default async function StableMasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {

return (
    <main className="container">{children}</main>
  );
}
