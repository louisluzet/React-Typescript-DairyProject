import DairyItem from "./DiaryItem";
import { listType } from "./Type";

const DiaryList = (props: any) => {
    //console.log(diaryList)
    return(
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{props.diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {props.diaryList.map((it: any, index: number) => (
                    <DairyItem key={it.id} {...it} onRemove={props.onRemove} onEdit={props.onEdit}/>
                ))}
            </div>
        </div>
    )
}
DiaryList.defaultProps = {
    diaryList: []
}
export default DiaryList;