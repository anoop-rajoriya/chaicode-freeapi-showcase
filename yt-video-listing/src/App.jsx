import React, { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Card from "./components/VideoCard.jsx";
import Container from "./components/Container.jsx";
import Loader from "./components/Loader.jsx";
import { getVideos } from "./services/video.service.js";
import { formateVideoData } from "./utils/videoDataFormater.js";

const limit = 10;

export default function App() {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getVideos(currentPage, limit)
      .then((res) => {
        const { totalPages, totalItems, currentPageItems, data } = res.data;
        setTotalPages(totalPages);
        setTotalItems(totalItems);
        setVideos(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [currentPage]);

  return (
    <div className="w-screen min-h-screen bg-neutral-900 text-neutral-100 font-sans flex">
      <Container className="flex-1 flex flex-col">
        <Header videoCount={totalItems} />
        <main className="flex-1 flex flex-col gap-2">
          {loading ? (
            <Loader />
          ) : (
            videos.map((video, index) => (
              <Card key={index} {...formateVideoData(video)} />
            ))
          )}
        </main>
        <Footer
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsShown={videos.length}
          onNextPage={() => setCurrentPage((pre) => pre + 1)}
          onPrevPage={() => setCurrentPage((pre) => pre - 1)}
        />
      </Container>
    </div>
  );
}
