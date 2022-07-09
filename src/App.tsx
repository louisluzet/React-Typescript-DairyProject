import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import './App.css';
import DiaryEditor from './components/DiaryEditor';
import DiaryList from './components/DiaryList';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date
      }
      return [newItem, ...state]
    }
    case 'REMOVE': {
      return state.filter((it) => it.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map((it) => it.id === action.targetId ? {...it, content: action.newContent} : it);
    }
    default:
      return state;
  }
}

export const DairyStateContext = React.createContext(defaultValue);

function App() {

  const [data, dispatch] = useReducer(reducer, []);

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
    dispatch({type: 'INIT', data: initData})
  }

  useEffect(() => {
    getData();
  }, [])

  const onCreate = useCallback(
    (author: string, content: string, emotion: number) => {
      dispatch({
        type: 'CREATE',
        data:{ author, content, emotion, id: dataId.current }
      });
      dataId.current += 1; 
  }, []);

  const onRemove = useCallback((targetId: number) => {
    dispatch({type: 'REMOVE', targetId})
  }, []);

  const onEdit = useCallback((targetId: number, newContent: string) => {
    dispatch({type:'EDIT', targetId, newContent})
  },[])

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount, badCount, goodRatio}
  }, [data.length]);

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <DairyStateContext.Provider>
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <div>전체 일기: {data.length} </div>
      <div>기분 좋은 일기: {goodCount}</div>
      <div>기분이 안 좋은 일기: {badCount}</div>
      <div>기분이 좋은 일기의 비율: {goodRatio}</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit}/>
    </div>
    </DairyStateContext.Provider>
  );
}
export default App;
function defaultValue<T>(defaultValue: any) {
  throw new Error('Function not implemented.');
}

