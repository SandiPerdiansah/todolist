import {createContext, useState} from "react";

export const ActivityTodoContext = createContext(null);

export const ActivityTodoProvider = ({children}) => {
    const [stateTodo, setStateTodo] = useState({
        sort: false,
        modal:false,
        data: []
    });

    return (
        <ActivityTodoContext.Provider value={{stateTodo, setStateTodo}}>
            {children}
        </ActivityTodoContext.Provider>
    )
}