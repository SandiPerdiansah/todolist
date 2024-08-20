import {Box, EmptyContent, Modal, List, ListItem, Label, Input, ModalDeleteActivity} from '../components/index.jsx'
import {Await, useLoaderData} from "react-router-dom";
import {ACTIVITY_TODO_SERVICES} from "../services/ACTIVITY_TODO_SERVICES.js";
import activityTodoEmptyImage from '../assets/img/todo-empty-state.png';
import {Suspense, useContext, useEffect} from "react";
import {Loading} from "../components/organisms/Loading.jsx";
import {ActivityTodoContext} from "../context/ActivityTodoContext.jsx";
import {ModalAddActivityTodo} from "../components/molecules/ModalAddActivityTodo.jsx";
import {ActivityTodoItem} from "../components/molecules/ActivityTodoItem.jsx";
import {Alert} from "../components/organisms/ALert.jsx";
import {ActivityContext} from "../context/ActivityContext.jsx";


export const ActivityTodo = () => {
    const {data} = useLoaderData();
    const {stateDelete} = useContext(ActivityContext)

    const {stateForm, setStateForm} = useContext(ActivityTodoContext);
    const {stateTodo, setStateTodo} = useContext(ActivityTodoContext);

    useEffect(() => {
        (async () => {
            try {
                const response = await data;

                if(response && response.data){
                    setStateTodo((prevState) => ({
                        ...prevState,
                        data: response ? response.data : []
                    }));
                }
            } catch (e) {
                console.log(`Error ${e.message}`);
            }
        })()
    }, []);

    return (
        <Suspense fallback={<Loading/>}>
            <Await resolve={data}>
                {
                    () => (
                        <Box>
                            {
                                stateTodo.data.length > 0 ? (
                                   <List className='w-full flex flex-col gap-3'>
                                       {
                                           stateTodo.data.map((data, index) => (
                                               <ActivityTodoItem
                                                   key={index}
                                                   data={data}
                                               />
                                           ))
                                       }
                                   </List>
                                ):(
                                    <EmptyContent
                                        src={activityTodoEmptyImage}
                                        alt='Activity Empty Animation'
                                        ariaLabel='Activity Empty Animation'
                                        dataCY='activity todo empty'
                                        onClick={() => setStateForm((prevState) => ({
                                            ...prevState,
                                            type:'add',
                                            modal: true
                                        }))}
                                    />
                                )
                            }
                            <Modal state={stateForm} titleId='add todo' description='add activity todo'>
                                <ModalAddActivityTodo id='add activity todo'/>
                            </Modal>
                            <Modal state={stateDelete} titleId='delete modal' description='delete activity'>
                                <Alert stateDelete={stateDelete}/>
                                <ModalDeleteActivity stateDelete={stateDelete} id='delete activity' />
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