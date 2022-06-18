import { useRef, useState } from "react";

const DairyItem = (props: any) => {

    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit(!isEdit);

    const [localContent, setLocalContent] = useState(props.content);
    const localContentInput: any = useRef();

    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(props.content);
    }

    const handleEdit = () => {
        if(localContent.length < 5) {
            localContentInput.current.focus();           
            return;
        }
        if (window.confirm(`${props.id}번째 일기를 수정하시겠습니까?`)) {
            props.onEdit(props.id, localContent);
            toggleIsEdit();
        }
    }

    const handleRemove = () => {
        if (window.confirm(`${props.id}번째 일기를 정말 삭제하시겠습니까?`)){
            props.onRemove(props.id);
        }
    }
    return (
        <div className="DiaryItem">
            <div className="info">
                <span>작성자 : {props.author} | 감정점수 : {props.emotion} </span> 
                {isEdit ? 
                    <>
                        <button className="remove" onClick={handleQuitEdit}>수정취소</button>
                        <button className="update" onClick={handleEdit}>수정완료</button>
                    </> 
                    : 
                    <>
                        <button className="remove" onClick={handleRemove}>삭제하기</button>
                        <button className="update" onClick={toggleIsEdit}>수정하기</button>
                    </>
                }
                <br />
                <span className="date">{new Date(props.created_date).toLocaleDateString()}</span>
            </div>
            <div className="content">
                {isEdit ? 
                    <> 
                        <textarea ref={localContentInput} value={localContent} onChange={(e) => setLocalContent(e.target.value)}/>
                    </>
                    : 
                    <>{props.content}</>
                }
            </div>
        </div>
    )
}
export default DairyItem