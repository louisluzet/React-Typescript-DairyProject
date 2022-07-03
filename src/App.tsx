import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { listType } from './Type';

// https://jsonplaceholder.typicode.com/comments

function App() {

  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json())
    const initData = res.slice(0, 20).map((it) => {
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

  const onCreate = (author: string, content: string, emotion: number) => {
    const created_date: number = new Date().getTime();
    const newItem: listType = {
      author,
      content, 
      emotion,
      created_date,
      id: dataId.current
    }
    dataId.current += 1;
    setData([newItem, ...data]);
  }

  const onRemove = (targetId: number) => {
    console.log(`${targetId}번째 일기가 삭제되었습니다.`);
    const newDairyList = data.filter((it) => it.id !== targetId);
    setData(newDairyList);
  };

  const onEdit = (targetId: number, newContent: string) => {
    setData(
      data.map((it) => it.id === targetId ? {...it, content: newContent} : it)
    );
  }

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit}/>
    </div>
  );
}
export default App;
