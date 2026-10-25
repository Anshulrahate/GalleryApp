
import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

function PhotoCard({ photo }) {
  const [likes, setLikes] = useState(0);

  return (
  
<article className="photo-card w-[250px] rounded-2xl border border-white/40 bg-white/20 p-3 shadow-xl backdrop-blur-xl">
  <img
    className="photo-image h-[200px] w-full rounded-xl object-cover"
    src={photo.download_url}
    alt={`Photography by ${photo.author}`}
    loading="lazy"
    decoding="async"
  />

  <div className="photo-info flex items-center justify-between gap-2 pt-3">
    <h2 className="font-semibold text-white">{photo.author}</h2>

    <button
      className="like-button flex items-center gap-2 rounded-lg border border-white/40 bg-white/20 px-3 py-2 text-white backdrop-blur-md hover:bg-white/40"
      type="button"
      onClick={() => setLikes((count) => count + 1)}
      aria-label={`Like photo by ${photo.author}. ${likes} likes`}
    >
      <FaThumbsUp />
      <span>{likes}</span>
    </button>
  </div>
</article>

  );
}

export default PhotoCard;
