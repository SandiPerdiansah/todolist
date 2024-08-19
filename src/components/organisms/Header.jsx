import {Box, HeaderActivity} from "../index.jsx";
import {useParams} from "react-router-dom";
import {useContext} from "react";
import {ActivityContext} from "../../context/ActivityContext.jsx";
import {HeaderActivityTodo} from "../molecules/HeaderActivityTodo.jsx";

export const Header = () => {
    const {handleAddActivity} = useContext(ActivityContext)

    const {id} = useParams();

    return (
        <Box className='w-full flex relative items-center justify-between' data-cy={!id ? 'header activity' : 'header' +
            ' activity todo'}>
            {
                !id ? (
                    <HeaderActivity onCLick={handleAddActivity}/>
                ) : (
                    <HeaderActivityTodo/>
                )
            }
        </Box>
    )
}