
import { useCallback, useEffect, useRef, useState } from "react";
import Loader from "../Components/Loader";
import PhotoCard from "../Components/PhotoCard";

const API_URL = "https://picsum.photos/v2/list";
const PAGE_LIMIT = 100;

const Main = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  const sentinelRef = useRef(null);
  const loadingRef = useRef(false);
  const pageRef = useRef(1);
  const hasMoreRef = useRef(true);

  // Load photos from the API page by page
  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;

    loadingRef.current = true;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}?page=${pageRef.current}&limit=${PAGE_LIMIT}`
      );

      if (!response.ok) {
        throw new Error("Failed to load photos");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid API response");
      }

     
      if (data.length === 0) {
        hasMoreRef.current = false;
        setHasMore(false);
        return;
      }

      setPhotos((prevPhotos) => {
        const existingIds = new Set(prevPhotos.map((photo) => photo.id));
        const newPhotos = data.filter(
          (photo) => !existingIds.has(photo.id)
        );

        return [...prevPhotos, ...newPhotos];
      });

      pageRef.current++;
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("Error loading photos:", err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    loadMore();
  }, [loadMore]);


  useEffect(() => {
    const target = sentinelRef.current;

    if (!target || loading || !hasMore || error) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [photos.length, loading, hasMore, error, loadMore]);

  return (
    <main className="gallery p-8">
      <section
        className="photo-list flex flex-wrap justify-around items-center gap-[50px]"
        aria-label="Photo gallery"
      >
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </section>

      <div ref={sentinelRef} className="scroll-sentinel" />

      {loading && <Loader />}

      {error && (
        <div className="status-message" role="alert">
          <p>{error}</p>
          <button onClick={loadMore} disabled={loading}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && !hasMore && (
        <p className="status-message">
          You have reached the end of the gallery.
        </p>
      )}
    </main>
  );
};

export default Main;
