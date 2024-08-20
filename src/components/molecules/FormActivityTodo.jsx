import {Box, Button, Input, Label, ListItem, Text} from '../index.jsx';
import {useContext, useEffect, useRef, useState} from "react";
import {ActivityTodoContext} from "../../context/ActivityTodoContext.jsx";
import {priorities} from "../../utils/helper.js";
import {IoIosArrowUp, IoMdCheckmark} from "react-icons/io";
import {useParams} from "react-router-dom";

export const FormActivityTodo = () => {
    const {stateForm, stateTodo, setStateForm, handleAddTodo, handleEditTodo} = useContext(ActivityTodoContext);

    const [valueInput, setValueInput] = useState('');
    const [textButton, setTextButton] = useState('Simpan');

    const dropdownRef = useRef(null);

    const {id} = useParams();

    const handleAddActivityTodo = async (e) => {
        e.preventDefault();

        if (stateForm.priority || !id) return;

        setTextButton('Loading...');

        try {
            const newTodo = {
                id: +id,
                title: e.target.title.value,
                priority: stateForm.value.toLowerCase().replace(' ', '-')
            };
            await handleAddTodo(newTodo);
        } catch (e) {
            console.log(`Error ${e.message}`);
        } finally {
            e.target.title.value = '';
            setTextButton('Kirim');
            setStateForm((prevState) => ({
                ...prevState,
                modal: false,
                value: priorities[0].value,
                color: priorities[0].color,
            }))
        }
    }

    const handleEditActivityTodo = async (e) => {
        e.preventDefault();

        if (stateForm.priority || !id) return;

        setTextButton('Loading...');

        try {

            const newTodo = {
                id: stateForm.data.id,
                title: e.target.title.value,
                priority: stateForm.value.toLowerCase().replace(' ', '-')
            };

            await handleEditTodo(newTodo);

        } catch (e) {
            console.log(`Error ${e.message}`);
        } finally {
            e.target.title.value = '';
            setTextButton('Kirim');
            setStateForm((prevState) => ({
                ...prevState,
                modal: false,
                value: priorities[0].value,
                color: priorities[0].color,
            }))
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setStateForm((prevState) => ({
                ...prevState,
                priority: false,
            }));
        }
    };

    useEffect(() => {
        if (stateForm.priority) {
            dropdownRef.current.focus();
        }
    }, [stateForm.priority]);


    return (
        <Box className='w-full pt-10 pb-4'>
            <form onSubmit={(e) => stateForm.type === 'add' ? handleAddActivityTodo(e) : handleEditActivityTodo(e)}>
                <Box className='px-8 border-b pb-8'>
                    <Box>
                        <Label
                            htmlFor='title'
                            label='NAMA LIST ITEM'
                            className='block mb-1 text-secondary font-medium'
                        />
                        <Input
                            type='text'
                            id='title'
                            name='title'
                            aria-label='Input title todo'
                            placeholder='Tambahkan nama list item'
                            required
                            data-cy='modal-add-name-input'
                            className='w-full border border-[#E5E5E5] rounded-md py-2 px-4 focus:outline-primary placeholder:font-light'
                            onInput={(e) => setValueInput(e.target.value)}
                        />
                    </Box>
                    <Box className='mt-4 relative'>
                        <Label
                            htmlFor='priority'
                            label='PRIORITY'
                            className='block mb-1 text-secondary font-medium'
                        />
                        <Input
                            type='text'
                            id='priority'
                            name='priority'
                            aria-label='Choose priority'
                            value={stateForm.value}
                            disabled
                            hidden
                            className='w-48 border border-[#E5E5E5] rounded-md py-2 px-4'
                        />

                        <Box
                            tabIndex={0}
                            role='button'
                            aria-haspopup='listbox'
                            aria-expanded={stateForm.priority}
                            aria-labelledby="priority-label"
                            className={`w-48 ${!stateForm.priority ? 'rounded-md border' : 'rounded-t-md'} border border-[#E5E5E5] py-2 px-4 text-secondary cursor-pointer flex items-center justify-start gap-3`}
                            onClick={() => setStateForm((prevState) => ({
                                ...prevState,
                                priority: !prevState.priority
                            }))}
                        >
                            <Box
                                className='flex-shrink-0 w-3 h-3 rounded-full'
                                style={{backgroundColor: stateForm.color, display: stateForm.priority && 'none'}}
                            ></Box>
                            <Text as='span'>{!stateForm.priority ? stateForm.value : 'Pilih priority'}</Text>
                            <IoIosArrowUp
                                className={`ms-auto ${!stateForm.priority ? 'rotate-180' : 'rotate-0'}`}
                                size={14}
                                color='#4A4A4A'
                            />
                        </Box>

                        <Box
                            data-cy='modal-add-priority-dropdown'
                            ref={dropdownRef}
                            tabIndex={-1}
                            role='listbox'
                            className={`no-scrollbar w-48 h-48 overflow-y-auto rounded-b-md absolute bg-white border border-[#E5E5E5] transition-all duration-300 ${!stateForm.priority ? 'opacity-0 -z-40' : 'opacity-100 z-50'} origin-bottom`}
                            onKeyDown={handleKeyDown}
                        >
                            {priorities.map((data, index) => {
                                const id = `priority-option-${index}`;
                                return (
                                    <ListItem
                                        key={id}
                                        id={id}
                                        role='option'
                                        aria-selected={stateForm.color === data.color}
                                        className='p-3 border-b flex items-center justify-start gap-3 hover:bg-slate-100 cursor-pointer'
                                        onClick={() => setStateForm((prevState) => ({
                                            ...prevState,
                                            priority: false,
                                            value: data.value,
                                            color: data.color,
                                        }))}
                                    >
                                        <Box
                                            className='flex-shrink-0 w-3 h-3 rounded-full'
                                            style={{backgroundColor: data.color}}
                                        ></Box>
                                        <Text className='text-[#4A4A4A]'>{data.value}</Text>
                                        <IoMdCheckmark
                                            className={`ms-auto ${stateForm.color === data.color ? 'block' : 'hidden'}`}
                                            size={14}
                                            color='#4A4A4A'
                                        />
                                    </ListItem>
                                );
                            })}
                        </Box>
                    </Box>
                </Box>
                <Box className='flex items-center justify-end mt-6 me-8'>
                    <Button
                        data-cy='modal-add-save-button'
                        type='submit'
                        aria-label='Tambah todo item'
                        className={`py-2 px-5 bg-primary text-white font-medium rounded-3xl ${valueInput.length > 0 ? 'opacity-100' : 'opacity-50'}`}
                    >
                        {textButton}
                    </Button>
                </Box>
            </form>
        </Box>
    );
};
