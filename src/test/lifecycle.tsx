import React, {useState, useEffect} from "react";

const UnmountTest = () => {
    // 자식 컴포넌트
    return <div>Unmount Testing Component</div>
}

const Lifecycle = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggle = () => {
        setIsVisible(!isVisible);
    }

    // const [count, setCount] = useState(0);
    // const [text, setText] = useState('');
    // useEffect(() => {
    //     console.log(`count is update: ${count}!`)
    //     if(count < 0) {
    //         setCount(0)
    //     }
    // }, [count])
    // useEffect(() => {
    //     console.log(`text is update: ${text}!`)
    // }, [text])


    return (
        <div style={{ padding: 20 }}>
            {/* <span>
                <button onClick={()=> setCount(count+1)}>+</button>
                {count}
                <button onClick={()=> setCount(count-1)}>-</button>
            </span>
            <div>
                <input value={text} onChange={(e) =>setText(e.target.value)} /> 
            </div> */}
            <button onClick={toggle}>ON/OFF</button>
            {isVisible && <UnmountTest />}
        </div>
    )
}

export default Lifecycle;