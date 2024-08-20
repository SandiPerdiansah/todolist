// noinspection JSCheckFunctionSignatures

import {createContext, useState} from "react";
import {priorities} from "../utils/helper.js";
import {ACTIVITY_TODO_SERVICES} from "../services/ACTIVITY_TODO_SERVICES.js";

export const ActivityTodoContext = createContext(null);

export const ActivityTodoProvider = ({children}) => {
    const [stateTodo, setStateTodo] = useState({
        sort: false,
        currentData: [],
        data: [],
    });

    const [stateForm, setStateForm] = useState({
        type: 'add',
        modal: false,
        priority: false,
        value: priorities[0].value,
        color: priorities[0].color,
        data: {},
    });

    const handleAddTodo = async ({id, title, priority}) => {
        try {
            const response = await ACTIVITY_TODO_SERVICES.addTodoItem({id, title, priority});

            setStateTodo((prevState) => ({
                ...prevState,
                data: [
                    response,
                    ...prevState.data
                ]
            }));
        } catch (e) {
            return `Error ${e.message}`
        }
    };

    const handleEditTodo = async (data) => {
        try {
            const response = await ACTIVITY_TODO_SERVICES.updateTodoItem(data);

            setStateTodo((prevState) => ({
                ...prevState,
                data: prevState.data.map((item) => (
                    +item.id === +data.id
                        ? {...item, title: response.title, priority: response.priority}
                        : item
                ))
            }));
        } catch (e) {
            return `Error ${e.message}`
        }
    }

    const filterDataTodo = () => {
        return [...stateTodo.data, ...stateTodo.currentData].reduce((acc, curr) => {
            const isDuplicate = acc.find(item => +item.id === +curr.id);
            if (!isDuplicate) {
                acc.push(curr);
            }
            return acc;
        }, []);
    };

    const sortNewTodo = () => {
        setStateTodo((prevState) => ({
            ...prevState,
            data: filterDataTodo().sort((a, b) => b.id - a.id)
        }));
    };

    const sortOldTodo = () => {
        setStateTodo((prevState) => ({
            ...prevState,
            data: filterDataTodo().sort((a, b) => a.id - b.id)
        }));
    };

    const sortAzTodo = () => {
        setStateTodo((prevState) => ({
            ...prevState,
            data: filterDataTodo().sort((a, b) => a.title.localeCompare(b.title))
        }));
    };

    const sortZaTodo = () => {
        setStateTodo((prevState) => ({
            ...prevState,
            data: filterDataTodo().sort((a, b) => b.title.localeCompare(a.title))
        }));
    };

    const sortNotCompleted = () => {
        setStateTodo((prevState) => {
            const notCompletedData = prevState.data.filter((data) => +data.is_active !== 0);

            return {
                ...prevState,
                currentData: prevState.data,
                data: notCompletedData.length > 0 ? notCompletedData : prevState.data
            }

        });
    };


    return (
        <ActivityTodoContext.Provider value={
            {
                stateTodo,
                setStateTodo,
                stateForm,
                setStateForm,
                handleAddTodo,
                sortNewTodo,
                sortOldTodo,
                sortAzTodo,
                sortZaTodo,
                sortNotCompleted,
                handleEditTodo,
            }
        }>
            {children}
        </ActivityTodoContext.Provider>
    );
};
