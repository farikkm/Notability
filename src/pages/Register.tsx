import { useUserStore } from "entities/User";
import { useAuth } from "features/Login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const email = useUserStore((state) => state.email);
  const password = useUserStore((state) => state.password);
  const [confirmPassword, setConfirmPassword] = useState("");
  const setEmail = useUserStore((state) => state.setEmail);
  const setPassword = useUserStore((state) => state.setPassword);
  const reset = useUserStore((state) => state.reset);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form with data:", { email, password, confirmPassword });
    if (!email || !password || !confirmPassword) {
      console.error("Email, password, and confirm password are required");
      return;
    }
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    const isRegistered = await register(email, password);
    if (!isRegistered) {
      console.error("Registration failed");
      return;
    } else {
      navigate("/login");
      reset();
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} action="#" method="POST">
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
