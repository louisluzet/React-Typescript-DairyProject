import React, { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { listType } from './Type';

function App() {

  const [data, setData] = useState([]);

  const dataId = useRef(0);

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
