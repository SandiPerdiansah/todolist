import {Box} from "../index.jsx";

export const Modal = ({state, children}) => (
    <Box
        className={`w-full h-screen fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center transition-all duration-300 ${!state.modal ? '-z-50 opacity-0' : 'z-[999] opacity-100'}`}
    >
        {children}
    </Box>
)