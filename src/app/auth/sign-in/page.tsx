import SignInForm from "./form";

export default async function SignInPage() {
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
        <SignInForm />
      </div>
    </div>
  );
}
