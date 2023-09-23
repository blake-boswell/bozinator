import RegisterForm from "./form";

export default async function RegisterPage() {
  return (
    <div
      style={{
        display: "flex",
        height: "70vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <RegisterForm />
      </div>
    </div>
  );
}
