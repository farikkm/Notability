import { useState } from "react";

type Data = {
  email: string;
  password: string;
};

const emptyData: Data = {
  email: "",
  password: "",
};

const App = () => {
  const [data, setData] = useState<Data>(emptyData);

  const fetchData = async () => {
    try {
      const url = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${url}/api/register`, {
        method: "POST",
        body: JSON.stringify({ email: data.email, password: data.password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    fetchData()
  }

  return (
    <div>
      <form onSubmit={handleSubmit} action="#" method="POST">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            value={data.password}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
