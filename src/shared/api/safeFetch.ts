export const safeFetch = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }

  const contentType = response.headers.get("Content-Type");
  
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  } else if (contentType && contentType.includes("text/plain")) {
    return response.text();
  } else {
    throw new Error(`Unsupported content type: ${contentType}`);
  }
}