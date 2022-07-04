import React from "react";
import { useEffect, useState } from "react"

// 자식 컴포넌트 1
// const TextView = React.memo(({text}: any) => {
//     useEffect(() => {
//         console.log(`Update :: Text : ${text}`)
//     })
//     return <div>{text}</div>
// });

// 자식 컴포넌트 2
// const CountView = React.memo(({count}: any) => {
//     useEffect(() => {
//         console.log(`Update :: Count : ${count}`)
//     })
//     return <div>{count}</div>
// });

const CounterA = React.memo(({ count }: any) => {
    useEffect(() => {
      console.log(`CountA Update - count : ${count}`);
    });
    return <div>{count}</div>;
  });
  
  const CounterB = ({ obj }) => {
    useEffect(() => {
      console.log(`CountB Update - count : ${obj.count}`);
    });
    return <div>{obj.count}</div>;
  };
  
  const areEqual = (prevProps, nextProps) => {
    if (prevProps.obj.count === nextProps.obj.count) {
      return true;
    }
    return false;
  };

  const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
    // const [count, setCount] = useState(1);
    // const [text, setText] = useState("");

    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count: 1
    })
    return (
        <div style={{padding: 50}}>
            {/* <div>
                <h2>Count</h2>
                <CountView count={count} />
                <button onClick={() =>setCount(count+1)}>+</button>
            </div>
            <div>
                <h2>Text</h2>
                <TextView text={text} />
                <input value={text} onChange={(e) => setText(e.target.value)} />  
            </div> */}

            <div>
                <h2>Counter A</h2>
                <CounterA count={count}/>
                <button onClick={() => setCount(count)}>A button</button>
            </div>
            <div>
                <h2>Counter B</h2>
                <MemoizedCounterB obj={obj} />
                <button onClick={() => setObj({
                    count: obj.count
                })}>B button</button>
            </div>
        </div>
    )
}
export default OptimizeTest