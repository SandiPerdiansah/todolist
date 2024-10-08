import {Box, Button, Heading, ListItem, Text} from "../index.jsx";
import {FaRegTrashCan} from "react-icons/fa6";
import {formatedDate} from "../../utils/formated.js";
import {useContext} from "react";
import {ActivityContext} from "../../context/ActivityContext.jsx";
import {useNavigate} from "react-router-dom";

export const ActivityListItem = ({data}) => {
    const {setStateDelete} = useContext(ActivityContext);

    const navigate = useNavigate();

    const handleNavigateActivityTodo = async (e) => {
        if (!e.target.closest('button')) {
            navigate(`${data.id}`);

        }
    }

    return (
        <ListItem
            onClick={(e) => handleNavigateActivityTodo(e)}
            aria-label='list item activity'
            className='w-[150px] h-[150px] lg:w-[235px] lg:h-[234px] cursor-pointer bg-white shadow-md rounded-lg flex flex-col justify-between p-5'
            data-cy='activity-item'
        >
            <Heading as='h3' className='font-bold text-secondary text-base lg:text-xl' data-cy='activity-item-title'>{data.title}</Heading>
            <Box className='flex items-center justify-between'>
                <Text className='text-[0.7rem] lg:text-xs text-[#888888]' data-cy='activity-item-date'>{formatedDate(data.created_at)}</Text>
                <Button
                    type='button'
                    aria-label='delete activity'
                    data-cy='activity-item-delete-button'
                    onClick={() => setStateDelete((prevState) => ({
                        ...prevState,
                        modal: true,
                        content: true,
                        data: data,
                    }))}
                >
                    <FaRegTrashCan color='#888888' size={14}/>
                </Button>
            </Box>
        </ListItem>
    );
}