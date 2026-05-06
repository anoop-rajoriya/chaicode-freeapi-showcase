const formatDuration = (isoString) => {
  if (!isoString) return "0:00";
  const match = isoString.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = match[1] ? match[1].replace("H", "") : "";
  const minutes = match[2] ? match[2].replace("M", "") : "0";
  const seconds = match[3] ? match[3].replace("S", "") : "00";

  const paddedSeconds = seconds.padStart(2, "0");
  if (hours) {
    const paddedMinutes = minutes.padStart(2, "0");
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }
  return `${minutes}:${paddedSeconds}`;
};

const formatNumber = (numStr) => {
  if (!numStr) return "0";
  const num = parseInt(numStr, 10);
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toString();
};

const formatDate = (dateString) => {
  if (!dateString) return "Unknown Date";
  const date = new Date(dateString);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
};

export const formateVideoData = (videoData) => {
  const title = videoData.items?.snippet?.title || "Untitled Video";
  const thumbnailUrl =
    videoData.items?.snippet?.thumbnails?.maxres?.url ||
    videoData.items?.snippet?.thumbnails?.high?.url ||
    "";
  const duration = formatDuration(videoData.items?.contentDetails?.duration);

  // YouTube API tags are an array of strings. We map them to add the '#' prefix if needed, limiting to 3.
  const rawTags = videoData.items?.snippet?.tags || [];
  const tags = rawTags
    .slice(0, 3)
    .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));

  const date = formatDate(videoData.items?.snippet?.publishedAt);
  const views = formatNumber(videoData.items?.statistics?.viewCount);
  const likes = formatNumber(videoData.items?.statistics?.likeCount);
  const comments = formatNumber(videoData.items?.statistics?.commentCount);
  return {
    title,
    thumbnailUrl,
    duration,
    tags,
    date,
    views,
    likes,
    comments,
  };
};
