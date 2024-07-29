import './Detail.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function Detail(){
  const location = useLocation();
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // id 값 구하기
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const fetchMovies = async ()=>{ // 비동기 호출 => async
    try{
      console.log('fetchMovis');
      // 비동기 호출 => await 사용
      const response = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
      console.log(response); // 위의 호출보다 현재 콘솔로그가 실행이 빠름
      setInfo(response.data.data.movie);
      setIsLoading(false);
    }
    catch (err){
      setError(err);
    }
  }

  useEffect(
    ()=>{
      console.log('useEffect');
      fetchMovies();
    },[info]
  );

  if(error){
    return (
      <div>Error: {error.message}</div>
    );
  }

  return (
    <div className="detail">
      {isLoading? (
        <div className="loader">
          <span className="loader_text">Loading...</span>
        </div>
      ) : (
        <>
        <img src={info.medium_cover_image} />
        <h2>{info.title}({info.year})</h2>
        <p>{info.description_full}</p>
        <ul>
          {
            info.genres.map(
              (item, index)=>{
                return(
                  <li key={index}>{item}</li>
                )
              }
            )
          }
        </ul>
        </>
      )}
    </div>
  );
}