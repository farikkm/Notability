import { useUserStore } from "entities/User";
import { useAuth } from "features/Auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // States
  const email = useUserStore((state) => state.email);
  const password = useUserStore((state) => state.password);
  const errorMessage = useUserStore((state) => state.errorMessage);
  const emailErrorMessage = useUserStore((state) => state.emailErrorMessage);
  const passwordErrorMessage = useUserStore(
    (state) => state.passwordErrorMessage
  );  
  
  // Actions
  const setEmail = useUserStore((state) => state.setEmail);
  const setPassword = useUserStore((state) => state.setPassword);
  const reset = useUserStore((state) => state.reset);
  const validateEmail = useUserStore((state) => state.validateEmail);
  const validatePassword = useUserStore((state) => state.validatePassword);
  const setErrorMessage = useUserStore((state) => state.setErrorMessage);
  const clearErrorMessage = useUserStore((state) => state.clearErrorMessage);
  
  // Hooks
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  // Effects
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrorMessage();
    console.log("Submitting form with data:", { email, password, confirmPassword });
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) return;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const isRegistered = await register(email, password);
    if (isRegistered) {
      navigate("/login");
      reset();
      clearErrorMessage();
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} action="#" method="POST">
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
          {emailErrorMessage && <p style={{ color: "red" }}>{emailErrorMessage}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
          {passwordErrorMessage && <p style={{ color: "red" }}>{passwordErrorMessage}</p>}
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
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
