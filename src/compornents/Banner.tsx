import { useState, useEffect } from "react";
import { requests } from "../request";
import axios from '../axios'
import "./Banner.scss";

type movieProps = {
  title?: string;
  name?: string;
  orignal_name?: string;
  backdrop_path?: string;
  overview?: string;
};

export const Banner = () => {
  //初期値は空のオブジェクト
  const [movie, setMovie] = useState<movieProps>({});
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.feachNetflixOriginals);

      /**
       * APIで取得した映画データをランダム取得
       * useEffectの第二引数を空配列にすると初回レンダリング時のみ実行
       */
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
    }
    fetchData();
  }, []);

  // descriptionの切り捨て用関数
  function truncate(str: any, n: number) {
    // undefinedを弾く
    if (str !== undefined) {
      //150文字以降を切り取って...にする
      return str.length > n ? str?.substr(0, n - 1) + "..." : str;
    }
  }

  return (
    <header
      className="Banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="Banner-contents">
        <h1 className="banner-title">
          {/* ?.の形はNullableな条件演算子と呼ばれるものでundefinedが返却される */}
          {/* or条件で該当するものがあれば表示 */}
          {movie?.title || movie?.name || movie?.orignal_name}
        </h1>
        <div className="Banner-buttons">
          <button className="Banner-button">Play</button>
          <button className="Banner-button">My List</button>
        </div>

        <h1 className="Banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="Banner-fadeBottom" />
    </header>
  );
};