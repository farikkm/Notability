import { useUserStore } from "entities/User";
import { useAuth } from "features/Auth";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  // States
  const email = useUserStore((state) => state.email);
  const password = useUserStore((state) => state.password);
  const errorMessage = useUserStore((state) => state.errorMessage);
  const emailErrorMessage = useUserStore((state) => state.emailErrorMessage);
  const passwordErrorMessage = useUserStore(
    (state) => state.passwordErrorMessage
  );
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  // Actions
  const setEmail = useUserStore((state) => state.setEmail);
  const setPassword = useUserStore((state) => state.setPassword);
  const reset = useUserStore((state) => state.reset);
  const validateEmail = useUserStore((state) => state.validateEmail);
  const validatePassword = useUserStore((state) => state.validatePassword);
  const clearErrorMessage = useUserStore(
    (state) => state.clearErrorMessage
  );

  // Hooks
  const { login } = useAuth();
  const navigate = useNavigate();

  // Effects
  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is already authenticated, redirecting to notes page.");
      navigate("/notes");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrorMessage();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) return;

    console.log("Submitting form with data:", { email, password });

    const isLoggedIn = await login(email, password);
    if (isLoggedIn) {
      navigate("/notes");
      reset();
      clearErrorMessage();
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} action="#" method="POST">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          {emailErrorMessage && (
            <p style={{ color: "red" }}>{emailErrorMessage}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          {passwordErrorMessage && (
            <p style={{ color: "red" }}>{passwordErrorMessage}</p>
          )}
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">Login</button>
        <Link to={"/register"}>Register</Link>
      </form>
    </div>
  );
};

export default Login;
