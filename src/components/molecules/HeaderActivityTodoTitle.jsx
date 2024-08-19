// noinspection JSCheckFunctionSignatures

import {Box, Button, Input, Label} from "../index.jsx";
import {IoIosArrowBack} from "react-icons/io";
import {MdOutlineEdit} from "react-icons/md";
import {useContext, useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ACTIVITY_SERVICES} from "../../services/ACTIVITY_SERVICES.js";
import {ActivityContext} from "../../context/ActivityContext.jsx";

export const HeaderActivityTodoTitle = () => {
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const {id} = useParams();

    const {setActivities} = useContext(ActivityContext);

    const [stateInput, setStateInput] = useState({
        input: false,
        title: '',
        width: '13rem',
    });

    const getTextWidth = (text, font) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = font;
        return context.measureText(text).width;
    };

    const setWidthBasedOnText = (text) => {
        if (inputRef.current) {
            const textWidth = getTextWidth(text, getComputedStyle(inputRef.current).font);
            const newWidth = Math.max(textWidth + 20, 208);
            return `${newWidth}px`;
        }
        return '13rem';
    };

    useEffect(() => {
        (async () => {
            const response = await ACTIVITY_SERVICES.getDetailActivity(id);
            const initialWidth = setWidthBasedOnText(response.title);
            setStateInput((prevState) => ({
                ...prevState,
                title: response.title,
                width: initialWidth
            }));
        })();
    }, [id]);

    useEffect(() => {
        const inputElement = inputRef.current;

        const handleInputValue = async () => {
            if (inputElement) {
                const newWidth = setWidthBasedOnText(inputElement.value);
                setStateInput((prevState) => ({
                    ...prevState,
                    title: inputElement.value,
                    width: newWidth,
                }));

                await ACTIVITY_SERVICES.updateActivity(id, inputElement.value.trim());

                setActivities((prevState) => ({
                    ...prevState,
                    data: prevState.data.map((data) => (
                        +data.id === +id
                            ? {...data, title: inputElement.value.trim()}
                            : data
                    ))
                }))
            }
        };

        if (inputElement && stateInput.input) {
            inputElement.addEventListener('input', handleInputValue);
        }

        return () => {
            if (inputElement && stateInput.input) {
                inputElement.removeEventListener('input', handleInputValue);
            }
        };
    }, [stateInput.input, id]);

    const handleFocusInput = () => {
        setStateInput((prevState) => ({
            ...prevState,
            input: !prevState.input
        }));

        if (!stateInput.input) {
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.disabled = false;
                    inputRef.current.focus();
                }
            }, 0);
        } else {
            if (inputRef.current) {
                inputRef.current.disabled = true;
            }
        }
    };

    return (
        <Box className='flex items-center justify-start'>
            <Button
                type='button'
                aria-label='kembali ke halaman sebelumnya'
                onClick={() => navigate('/')}
            >
                <IoIosArrowBack aria-hidden='true' size={25} strokeWidth={2} color='#111111'/>
            </Button>
            <Box className='relative ms-3'>
                <Label htmlFor='title'/>
                <Input
                    type='text'
                    name='title'
                    id='title'
                    value={stateInput.title}
                    aria-label='title activity'
                    className={`text-secondary text-3xl font-bold ${stateInput.input && 'border-b pb-1'} bg-transparent border-secondary outline-none`}
                    disabled={!stateInput.input}
                    ref={inputRef}
                    style={{width: stateInput.width, minWidth: '13rem'}}
                />
            </Box>
            <Button
                type='button'
                aria-label='edit activity'
                onClick={handleFocusInput}
            >
                <MdOutlineEdit size={20} color='#A4A4A4'/>
            </Button>
        </Box>
    );
};