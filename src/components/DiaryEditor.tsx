import React, { useEffect } from "react";
import { useState, useRef } from "react";

const DiaryEditor = ({onCreate}) => {

    const authorInput: any = useRef();
    const contentInput: any = useRef();

    const [ state, setState ] = useState({
        author: "",
        content: "",
        emotion: 1
    });

    const handleSubmit = () =>{
        if (state.author.length < 1) {
            //focus
            authorInput.current.focus();
            return;
        }
        if (state.content.length < 5) {
            //focus
            contentInput.current.focus();
            return;
        }
        onCreate(state.author, state.content, state.emotion);
        console.log(state);
        alert("저장 성공!");
        setState({
            author: "",
            content: "",
            emotion: 1,
        })
    }

    const handleChangeState = (e : any) => {
        setState({
            ...state,
            [e.target.name] : e.target.value,
        });
    }

    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <div>
                <input 
                    ref={authorInput}
                    name="author"
                    value={state.author} 
                    onChange={handleChangeState}
                    placeholder={'작성자'}
                />
            </div>
            <div>
                <textarea
                    ref={contentInput}
                    name="content"
                    value={state.content}
                    onChange={handleChangeState}
                    placeholder={'일기를 작성해보세요'}
                />
            </div>
            <div>
                오늘의 기분  
                <select name="emotion" value={state.emotion} onChange={handleChangeState}>
                    <option value={1}>1 😡</option>
                    <option value={2}>2 😑</option>
                    <option value={3}>3 😶</option>
                    <option value={4}>4 😊</option>
                    <option value={5}>5 😍</option>
                </select>
            </div>
            <div>
                <button onClick={handleSubmit}>일기 저장하기</button>
            </div>
        </div>
    )

}
export default React.memo(DiaryEditor);