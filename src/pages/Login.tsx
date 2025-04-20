import { useUserStore } from "entities/User";
import { useAuth } from "features/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const email = useUserStore((state) => state.email);
  const password = useUserStore((state) => state.password);
  const setEmail = useUserStore((state) => state.setEmail);
  const setPassword = useUserStore((state) => state.setPassword);
  const reset = useUserStore((state) => state.reset);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const { login } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/notes");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form with data:", { email, password });
    if (!email || !password) {
      console.error("Email and password are required");
      return;
    }
    const isLoggedIn = await login(email, password);
    if (!isLoggedIn) {
      console.error("Login failed");
      return;
    } else {
      navigate("/notes");
      reset();
    }
  };

  return (
    <div>
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
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
