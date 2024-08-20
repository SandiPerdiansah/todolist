import {Box, Button, Text} from "../index.jsx";
import {GoAlert} from "react-icons/go";
import {useContext} from "react";
import {ActivityContext} from "../../context/ActivityContext.jsx";
import {ACTIVITY_TODO_SERVICES} from "../../services/ACTIVITY_TODO_SERVICES.js";
import {ActivityTodoContext} from "../../context/ActivityTodoContext.jsx";

export const ModalDeleteActivity = ({stateDelete, id}) => {
    const {setStateDelete, handleDeleteActivity} = useContext(ActivityContext);
    const {setStateTodo} = useContext(ActivityTodoContext);

    const handleDeleteActivityList = () => {
        setStateDelete((prevState) => ({
            ...prevState,
            content: false,
            alert: true,
        }));

        handleDeleteActivity(stateDelete.data.id);

        setTimeout(() => {
            setStateDelete((prevState) => ({
                ...prevState,
                modal: false,
                alert: false,
                data: {}
            }));
        }, 2000)
    }

    const handleDeleteActivityTodo = async () => {
        try {
            await ACTIVITY_TODO_SERVICES.deleteTodoItem(stateDelete.data.id);
            setStateTodo((prevState) => ({
                ...prevState,
                data: prevState.data.filter((item) => +item.id !== +stateDelete.data.id)
            }));
        } catch (e) {
            console.log(`Error : ${e.message}`);
        } finally {
            setStateDelete((prevState) => ({
                ...prevState,
                type: 'deleteActivity',
                modal: false,
                content: false,
                data: {}
            }))
        }
    }

    return (
        <Box
            id={id}
            className={`w-[320px] h-[300px] lg:w-[490px] lg:h-[320px] bg-white shadow-lg flex items-center gap-6 justify-center flex-col text-center px-5 py-8 rounded-xl transition-all duration-300 ${!stateDelete.content ? 'translate-y-full opacity-0 -z-50' : 'translate-y-0 opacity-100 z-50'}`}>
            <GoAlert
                size={60}
                color='#ED4C5C'
                aria-hidden='true'
            />
            <Text className='text-secondary lg:text-base text-[0.8rem]'>Apakah anda yakin menghapus activity <br/>
                <strong>“{stateDelete.data.title}”?</strong>
            </Text>
            <Box className='flex items-center justify-center gap-4 mt-6'>
                <Button
                    type='button'
                    aria-label='batal hapus activity'
                    className='w-[120px] py-2 text-[#4A4A4A] flex items-center justify-center bg-[#F4F4F4] rounded-3xl'
                    onClick={() => setStateDelete((prevState) => ({
                        ...prevState,
                        modal: false,
                        content: false,
                        data: {}
                    }))}
                >
                    Batal
                </Button>
                <Button
                    type='button'
                    aria-label='batal hapus activity'
                    className='w-[120px] py-2 text-white flex items-center justify-center bg-[#ED4C5C] rounded-3xl'
                    onClick={stateDelete.type === 'deleteActivity' ? handleDeleteActivityList : handleDeleteActivityTodo}
                >
                    Hapus
                </Button>
            </Box>
        </Box>
    )
}