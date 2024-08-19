import {Box, EmptyContent, Modal} from '../components/index.jsx'
import {Await, useLoaderData} from "react-router-dom";
import {ACTIVITY_TODO_SERVICES} from "../services/ACTIVITY_TODO_SERVICES.js";
import activityTodoEmptyImage from '../assets/img/todo-empty-state.png';
import {Suspense, useContext} from "react";
import {Loading} from "../components/organisms/Loading.jsx";
import {ActivityTodoContext} from "../context/ActivityTodoContext.jsx";
import {ModalAddActivityTodo} from "../components/molecules/ModalAddActivityTodo.jsx";


export const ActivityTodo = () => {
    const {data} = useLoaderData();

    const {stateForm, setStateForm} = useContext(ActivityTodoContext);

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
                                onClick={() => setStateForm((prevState) => ({
                                    ...prevState,
                                    modal: true
                                }))}
                            />
                            <Modal state={stateForm} titleId='add todo' description='add activity todo'>
                                <ModalAddActivityTodo id='add activity todo'/>
                            </Modal>
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