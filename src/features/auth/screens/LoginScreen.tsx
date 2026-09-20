import LoginForm from "../components/Login/LoginForm";
import LoginHero from "../components/Login/LoginHero";

export default function LoginScreen() {
  return (
    <div className="container grid lg:grid-cols-2 gap-16 py-16 items-center">
      <div className="hidden lg:block">
        <LoginHero />
      </div>
      <LoginForm />
    </div>
  );
}
