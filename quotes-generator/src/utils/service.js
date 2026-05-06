export const getQuotes = async (page = 1, limit = 10) => {
  const response = await fetch(
    `https://api.freeapi.app/api/v1/public/quotes?page=${page}&limit=${limit}`,
  );

  const data = await response.json();

  if (!response.ok) return [];

  return { data: data.data, message: data.message };
};
