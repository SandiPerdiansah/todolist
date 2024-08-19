import {createContext, useEffect, useState} from "react";
import {priorities} from "../utils/helper.js";

export const ActivityTodoContext = createContext(null);

export const ActivityTodoProvider = ({children}) => {
    const [stateTodo, setStateTodo] = useState({
        sort: false,
        data: []
    });

    const [stateForm, setStateForm] = useState({
        type: 'add',
        modal: false,
        priority:false,
        value: priorities[0].value,
        color: priorities[0].color,
    });


    return (
        <ActivityTodoContext.Provider value={{stateTodo, setStateTodo, stateForm, setStateForm}}>
            {children}
        </ActivityTodoContext.Provider>
    )
}