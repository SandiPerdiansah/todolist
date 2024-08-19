import {HeaderActivityTodoTitle} from "./HeaderActivityTodoTitle.jsx";
import {Box, Button, List, ListItem, Text} from "../index.jsx";
import {LuArrowDownAZ, LuArrowDownZA, LuArrowUpDown} from "react-icons/lu";
import {HeaderButton} from "./HeaderButton.jsx";
import {useContext, useRef} from "react";
import {ActivityTodoContext} from "../../context/ActivityTodoContext.jsx";
import {HiOutlineBarsArrowDown, HiOutlineBarsArrowUp} from "react-icons/hi2";
import {useClickOutside} from "../../hooks/useClickOutside.jsx";

const sorties = [
    {
        icon: <HiOutlineBarsArrowDown color='#16ABF8' size={20}/>,
        text: 'Terbaru'
    },
    {
        icon: <HiOutlineBarsArrowUp color='#16ABF8' size={20}/>,
        text: 'Terlama'
    },
    {
        icon: <LuArrowDownAZ color='#16ABF8' size={20}/>,
        text: 'A-Z'
    },
    {
        icon: <LuArrowDownZA color='#16ABF8' size={20}/>,
        text: 'Z-A'
    },
    {
        icon: <LuArrowUpDown color='#16ABF8' size={20}/>,
        text: 'Belum Selesai'
    },
]

export const HeaderActivityTodo = () => {
    const {stateTodo, setStateTodo} = useContext(ActivityTodoContext);
    const {setStateForm} = useContext(ActivityTodoContext);

    const modalSortRef = useRef(null);
    const buttonSortRef = useRef(null);

    const handleShowModalSort = () => {
        setStateTodo((prevState) => ({
            ...prevState,
            sort: !prevState.sort
        }));
    };

    useClickOutside({
        targetElement: buttonSortRef,
        targetingElement: modalSortRef,
        action: () => {
            if (stateTodo.sort) {
                setStateTodo((prevState) => ({
                    ...prevState,
                    sort: false
                }));
            }
        }
    })

    return (
        <>
            <HeaderActivityTodoTitle/>
            <Box className='flex items-center justify-center gap-4 lg:static absolute top-8 right-0'>
                <Box>
                    <Button
                        ref={buttonSortRef}
                        type='button'
                        aria-label='sort activity todo'
                        className='border border-[#E5E5E5] rounded-full p-3'
                        onClick={handleShowModalSort}
                    >
                        <LuArrowUpDown color='#888888' size={20}/>
                    </Button>
                    <Box
                        ref={modalSortRef}
                        className={`bg-white rounded-md shadow-md absolute top-14 -right-10 w-[230px] transition-all duration-300 origin-bottom ${!stateTodo.sort ? 'opacity-0 -z-40 ' : 'opacity-100 z-50'}`}
                    >
                        <List className='w-full'>
                            {
                                sorties.map((data, index) => (
                                    <ListItem key={index}
                                              className={`flex items-center justify-start gap-3 py-3 px-4 hover:bg-slate-100 cursor-pointer ${index === 0 && 'rounded-t-md'} ${index === 4 && 'rounded-b-md'}`}>
                                        {data.icon}
                                        <Text className='text-secondary '>{data.text}</Text>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Box>
                </Box>


                <HeaderButton onCLick={() =>setStateForm((prevState) => ({
                    ...prevState,
                    modal:true
                }))}/>
            </Box>
        </>
    )
}