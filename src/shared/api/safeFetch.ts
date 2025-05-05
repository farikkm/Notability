export const safeFetch = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);

  const contentType = response.headers.get("Content-Type");

  if (!response.ok) {
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Unknown error");
    } else {
      const errorText = await response.text();
      throw new Error(errorText);
    }
  }

  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else if (contentType && contentType.includes("text/plain")) {
    return await response.text();
  } else {
    throw new Error(`Unsupported content type: ${contentType}`);
  }
};
