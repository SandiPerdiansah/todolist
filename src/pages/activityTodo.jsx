import {Box, EmptyContent} from '../components/index.jsx'
import {Await, useLoaderData} from "react-router-dom";
import {ACTIVITY_TODO_SERVICES} from "../services/ACTIVITY_TODO_SERVICES.js";
import activityTodoEmptyImage from '../assets/img/todo-empty-state.png';
import {Suspense, useEffect} from "react";
import {Loading} from "../components/organisms/Loading.jsx";


export const ActivityTodo = () => {
    const {data} = useLoaderData();

    useEffect(() => {
        (async () => {
            const response = await data;
            console.log(response)
        })()
    }, []);

    return (
        <Suspense fallback={<Loading/>}>
            <Await resolve={data}>
                {
                    () => (
                        <Box>
                            <EmptyContent
                                src={activityTodoEmptyImage}
                                alt='Activity Empty Animation'
                                ariaLabel='Activity Empty Animation'
                                dataCY='activity todo empty'
                                onClick={() => {
                                }}
                            />
                        </Box>
                    )
                }
            </Await>
        </Suspense>
    )
}

export const activityTodoLoader = async ({params}) => {
    return await ACTIVITY_TODO_SERVICES.getTodoItem(params.id)
}