import { useState, useEffect } from "react";
import axios from '../axios'
import "./Row.scss";
import YouTube from 'react-youtube';

const base_url = "https://image.tmdb.org/t/p/original";
const API_KEY = process.env.REACT_APP_API_KEY;

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

type Movie = {
  id: string;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
};

//予告編のoption
type Options = {
  height: string;
  width: string;
  playerVars: {
    autoplay: 0 | 1 | undefined,
    cc_load_policy: 1 | undefined,
  };
};

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");

  //App.tsxからpropsで渡されるurlが更新される度にAPIを叩き動画を取得
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  //予告編表示用のオプション設定
  const opts: Options = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      cc_load_policy: 1,
    },
  };

  const handleClick = async (movie: Movie) => {
    //予告編が表示されていればリセット
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      //予告編データをAPIを叩いて取得
      let trailerurl = await axios.get(`/movie/${movie.id}/videos?api_key=${API_KEY}`);
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };

  return (
    <div className="Row">
      <h2>{title}</h2>
      <div className="Row-posters">
        {/* ポスターコンテンツ */}
        {movies.map((movie, i) => (
          <img
            key={movie.id}
            //<Row />でのみisLargeRowが渡されるため条件分岐している
            className={`Row-poster ${isLargeRow && "Row-poster-large"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            // src={`${base_url}`}
            alt={movie.name}
            //クリックイベントはカテゴライズ毎のみに反応
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {/* youtubeコンポーネントを表示 */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
