import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { decrement, incrementAsync, incrementByAmount } from "../state/counter/counterSlice";

function Counter() {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => dispatch(incrementAsync(10))}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <input type="number" onChange={(e) => dispatch(incrementByAmount(+e.target.value))} />
        </div> 
    );
}

export default Counter;