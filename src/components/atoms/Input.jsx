import {forwardRef} from "react";

export const Input = forwardRef(({type = 'text', ...props}, ref) => (
    <input ref={ref} type={type} {...props} />
));
