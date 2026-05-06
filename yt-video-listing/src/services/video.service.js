export async function getVideos(page = 1, limit = 10) {
  const res = await fetch(
    `https://api.freeapi.app/api/v1/public/youtube/videos?page=${page}&limit=${limit}`,
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return { data: data.data, message: data.message };
}
