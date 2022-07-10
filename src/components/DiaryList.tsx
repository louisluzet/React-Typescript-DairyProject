import { useContext } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import DairyItem from "./DiaryItem";

// 더 이상 props로 받을 필요 없이 context에서 공급으로 받으면 됌
const DiaryList = () => {
    const diaryList = useContext(DiaryStateContext);
    const {onEdit, onRemove} = useContext(DiaryDispatchContext);
    return(
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((it: any, index: number) => (
                    <DairyItem key={it.id} {...it} onRemove={onRemove} onEdit={onEdit}/>
                ))}
            </div>
        </div>
    )
}
DiaryList.defaultProps = {
    diaryList: []
}
export default DiaryList;