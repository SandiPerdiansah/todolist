import {Box} from "../atoms/Box.jsx";
import {Text} from "../atoms/Text.jsx";
import {Button} from "../atoms/Button.jsx";
import {RxCross2} from "react-icons/rx";
import {FormActivityTodo} from "./FormActivityTodo.jsx";
import {useContext} from "react";
import {ActivityTodoContext} from "../../context/ActivityTodoContext.jsx";

export const ModalAddActivityTodo = ({id}) => {
    const {stateForm, setStateForm} = useContext(ActivityTodoContext);

    return (
        <Box
            id={id}
            className={`w-[800px] h-[380px] bg-white rounded-lg shadow-md ${!stateForm.modal ? 'translate-y-full' : 'translate-y-0'} transition-all duration-300`}>
            <Box className='flex items-center justify-between pt-6 pb-4 px-8 border-b borde-[#A4A4A4]'>
                <Text className='text-secondary font-medium'>Tambah List Item</Text>
                <Button
                    type='button'
                    aria-label='close modal add activity todo'
                    onClick={() => setStateForm((prevState) => ({
                        ...prevState,
                        modal: false
                    }))}
                >
                    <RxCross2 color='#A4A4A4' size={20}/>
                </Button>
            </Box>

            <FormActivityTodo/>
        </Box>
    )
}