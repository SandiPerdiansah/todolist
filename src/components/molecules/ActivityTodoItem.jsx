import {Box} from "../atoms/Box.jsx";
import {Label} from "../atoms/Label.jsx";
import {Input} from "../atoms/Input.jsx";
import {ListItem} from "../atoms/ListItem.jsx";
import {useContext, useId, useRef} from "react";
import {Text} from "../atoms/Text.jsx";
import {MdOutlineEdit} from "react-icons/md";
import {Button} from "../atoms/Button.jsx";
import {FaRegTrashCan} from "react-icons/fa6";
import {ActivityTodoContext} from "../../context/ActivityTodoContext.jsx";
import {ACTIVITY_TODO_SERVICES} from "../../services/ACTIVITY_TODO_SERVICES.js";
import {ActivityContext} from "../../context/ActivityContext.jsx";

export const ActivityTodoItem = ({data}) => {
    const {setStateTodo, setStateForm} = useContext(ActivityTodoContext);
    const {stateDelete, setStateDelete} = useContext(ActivityContext);

    const inputRef = useRef(null);
    const id = useId();

    const handleCheckInput = async (e, data) => {
        if (!data) return;

        try {
            if (e.target.checked) {
                setStateTodo((prevState) => ({
                    ...prevState,
                    data: prevState.data.map((item) => (
                        +item.id === data.id
                            ? {...item, is_active: 0}
                            : item
                    ))
                }))

                data = {...data, is_active: 0}
            } else {
                setStateTodo((prevState) => ({
                    ...prevState,
                    data: prevState.data.map((item) => (
                        +item.id === data.id
                            ? {...item, is_active: 1}
                            : item
                    ))
                }))
                data = {...data, is_active: 1}
            }

            await ACTIVITY_TODO_SERVICES.updateTodoItem(data);
        } catch (e) {
            console.log(`Error : ${e.message}`);
        }
    }

    const colorConverter = (priority) => {
        switch (priority) {
            case 'very-high' :
                return '#ED4C5C';
            case 'high':
                return '#F8A541';
            case 'medium':
                return '#00A790';
            case 'low':
                return '#428BC1';
            case'very-low':
                return '#8942C1';
        }
    }

    return (
        <ListItem className='w-full flex items-center justify-start gap-3 bg-white shadow-md rounded-md p-6'>
            <Box>
                <Label htmlFor={`check${id}`} label=''/>
                <Input
                    type='checkbox'
                    id={`check${id}`}
                    name={`check${id}`}
                    className='w-5 h-5 cursor-pointer'
                    ref={inputRef}
                    onChange={(e) => handleCheckInput(e, data)}
                    checked={+data.is_active === 0}
                />
            </Box>
            <Box className='flex items-center justify-center gap-3'>
                <Box
                    className='flex-shrink-0 w-3 h-3 rounded-full'
                    style={{backgroundColor: colorConverter(data.priority)}}>
                </Box>
                <Text as='span'
                      className={`${+data.is_active === 0 && 'line-through text-gray-500'} font-medium`}>{data.title}</Text>
                <Button
                    type='button'
                    aria-label='edit activity todo'
                    onClick={() => setStateForm((prevState) => ({
                        ...prevState,
                        type: 'edit',
                        modal: true,
                        data: data,
                    }))}
                >
                    <MdOutlineEdit size={20} color='#A4A4A4'/>
                </Button>
            </Box>
            <Button
                type='button'
                aria-label='delete activity todo'
                className='ms-auto'
                onClick={() => setStateDelete((prevState) => ({
                    ...prevState,
                    type: 'deleteTodo',
                    modal: true,
                    content: true,
                    data,
                }))}
            >
                <FaRegTrashCan color='#888888' size={18}/>
            </Button>
        </ListItem>
    )
}