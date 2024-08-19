import {Box} from "../index.jsx";
import {useEffect, useRef} from "react";

export const Modal = ({state, children, titleId, description}) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (state.modal) {
            modalRef.current.focus();
        }
    }, [state.modal]);


    return (
        <Box
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            ref={modalRef}
            aria-labelledby={titleId}
            aria-describedby={description}
            aria-label={`${description}`}
            className={`w-full h-screen fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center transition-all duration-300 ${!state.modal ? '-z-50 opacity-0' : 'z-[999] opacity-100'}`}
        >
            {children}
        </Box>
    );
};
