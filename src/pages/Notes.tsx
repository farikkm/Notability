import { useEffect } from 'react'

const Notes = () => {

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem("token");
    
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/protected`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // вот так передаётся токен
          },
        });
    
        if (!response.ok) {
          throw new Error("Unauthorized");
        }
    
        const data = await response.json();
        console.log("Данные:", data);
      } catch (err) {
        console.error("Ошибка:", err);
      }
    };

    fetchProtectedData();
  }, [])

  return (
    <div>Notes</div>
  )
}

export default Notes