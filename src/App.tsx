import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './components/DiaryEditor';
import DiaryList from './components/DiaryList';
import { listType } from './Type';

// https://jsonplaceholder.typicode.com/comments

function App() {

  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json())
    const initData = res.slice(0, 10).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++ 
      }
    })
    setData(initData);
  }

  useEffect(() => {
    getData();
  }, [])

  const onCreate = useCallback((author: string, content: string, emotion: number) => {
    const created_date: number = new Date().getTime();
    const newItem: listType = {
      author,
      content, 
      emotion,
      created_date,
      id: dataId.current
    }
    dataId.current += 1; 
    setData((data) => [newItem, ...data]);
  }, []);
  // setData에 함수를 전달하는 것이 함수형 업데이트

  const onRemove = useCallback((targetId: number) => {
    setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId: number, newContent: string) => {
    setData(
      data.map((it) => it.id === targetId ? {...it, content: newContent} : it)
    );
  },[])

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount, badCount, goodRatio}
  }, [data.length]);

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <div>전체 일기: {data.length} </div>
      <div>기분 좋은 일기: {goodCount}</div>
      <div>기분이 안 좋은 일기: {badCount}</div>
      <div>기분이 좋은 일기의 비율: {goodRatio}</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit}/>
    </div>
  );
}
export default App;
