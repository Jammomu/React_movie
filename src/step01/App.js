// 1. 로딩페이지

// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  // 상태변수를 설정
  const [isLoading, setIsLoading] = useState(true);
  const [loadCounter, setLoadCounter] = useState(0);

  useEffect(
    ()=>{
      // counter 1씩 증가
      function IncreaseCounter(){
        let _counter = loadCounter;
        _counter = _counter + 1;
        
        // _counter 값이 10 이상이면 loading 종료, _counter 종료
        if(_counter > 10){
          setIsLoading(false);
          clearInterval(loadTimer);
        }
    
        setLoadCounter(
          _counter
        );
      }

      // 1초에 한 번 증가
      const loadTimer = setInterval(
        IncreaseCounter,1000
      );

      return ()=>{
        clearInterval(loadTimer);
      }
    },[loadCounter]
  );

  return (
    <div>
      {isLoading? `Loading... ${loadCounter}` : 'Loaded'}
    </div>
  );
}

export default App;
