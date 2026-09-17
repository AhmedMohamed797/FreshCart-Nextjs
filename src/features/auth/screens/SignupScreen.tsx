import SignupForm from "../components/Signup/SignupForm";
import SignupHero from "../components/Signup/SignupHero";

export default function SignupScreen() {
  return (
    <div className="container grid lg:grid-cols-2 gap-16 py-16 items-center">
      <div className="hidden lg:block">
        <SignupHero />
      </div>
      <SignupForm />
    </div>
  );
}
