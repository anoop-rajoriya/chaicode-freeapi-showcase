import React from "react";

const VideoCard = ({
  title,
  thumbnailUrl,
  duration,
  tags,
  date,
  views,
  likes,
  comments,
}) => {
  return (
    <div className="flex flex-col sm:flex-row w-full bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden hover:bg-neutral-700/70 transition-colors cursor-pointer">
      <div className="relative w-full sm:w-[280px] h-48 sm:h-auto shrink-0 bg-neutral-900 flex items-center justify-center p-2">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover aspect-video"
          />
        ) : (
          <span className="text-white text-lg font-bold px-2">{title}</span>
        )}

        <div className="absolute bottom-2 right-2 bg-black text-white text-xs font-bold px-1.5 py-0.5 rounded">
          {duration}
        </div>
      </div>

      <div className="flex flex-col flex-grow p-4 sm:p-5">
        <h3 className="text-white text-lg sm:text-xl font-bold leading-tight mb-3 line-clamp-2">
          {title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-neutral-900 text-neutral-300 text-xs font-medium px-2.5 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex-grow"></div>

        <div className="flex items-center text-neutral-400 text-sm gap-4 sm:gap-5 flex-wrap">
          <span>{date}</span>

          <div className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>{views}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.514"
              />
            </svg>
            <span>{likes}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
