// Home 목록 페이지
// npm install axios

// 목록주소
// https://yts.mx/api/v2/list_movies.json
// https://yts-proxy.now.sh/list_movies.json
// 상세보기주소
// https://yts.mx/api/v2/movie_details.json?movie_id=11
// https://yts-proxy.now.sh/movie_detail.json?movie_id=11

// import logo from './logo.svg';
import './Home.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie } from '../components/Movie';

export function Home() {
  // 상태변수를 설정
  const [isLoading, setIsLoading] = useState(true);
  const [loadCounter, setLoadCounter] = useState(0);
  const [movies, setMovies] = useState(null);

  const fetchMovies = async ()=>{ // 비동기 호출 => async
    console.log('fetchMovis');
    // 비동기 호출 => await 사용
    const response = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    console.log(response.data.data.movies); // 위의 호출보다 현재 콘솔로그가 실행이 빠름
    setMovies(response.data.data.movies);
    setIsLoading(false);
  }

  useEffect(
    ()=>{
      console.log('useEffect');
      fetchMovies();
    },[loadCounter]
  );

 function displayMovies(){
    return (
      <div>
        <h1>Movie List</h1>
        <ul className='movies'>
          {
            movies.map(item =>{
              return (
                <Movie
                  key={item.id}
                  id={item.id}
                  year={item.year}
                  title={item.title}
                  summary={item.summary}
                  poster={item.medium_cover_image}
                  genres={item.genres}
                />
              );
            })
          }
        </ul>
      </div>
    );
  }

  return (
    <div>
      {isLoading? `Loading... ${loadCounter}` : displayMovies()}
    </div>
  );
}
