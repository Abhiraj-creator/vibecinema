import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const isPerson = movie.media_type === 'person' || (!movie.title && !movie.name && movie.profile_path);
  const imageUrl = (movie.poster_path || movie.profile_path)
    ? `https://image.tmdb.org/t/p/w780${movie.poster_path || movie.profile_path}`
    : 'https://via.placeholder.com/500x750?text=No+Data';

  const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');

  return (
    <Link 
        to={`/details/${mediaType}/${movie.id}`} 
        className="group relative block flex-shrink-0 w-48 md:w-56 transition-all duration-500 hover:scale-105 hover:z-20 cursor-pointer"
    >
      {/* 1px border like the Stitch design */}
      <div className="absolute -inset-[1px] bg-gradient-to-b from-white/20 to-transparent blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/10 bg-[#0D0D0D]">
        <img 
          src={imageUrl} 
          alt={movie.title || movie.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay with metadata */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-bold text-sm md:text-base mb-1 line-clamp-2" style={{ fontFamily: 'Syne, sans-serif' }}>
            {movie.title || movie.name}
          </h3>
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
            <span className="border border-zinc-700 px-1 rounded uppercase">{(movie.media_type || 'movie').toUpperCase()}</span>
            <span>{new Date(movie.release_date || movie.first_air_date).getFullYear()}</span>
            <span className="text-[#E50914] font-bold">★ {movie.vote_average?.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      {/* HUD line accent below poster on hover */}
      <div className="h-[1px] w-0 bg-[#E50914] mt-2 group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(229,9,20,0.8)]"></div>
    </Link>
  );
};

export default MovieCard;
