import {forwardRef} from "react";

export const Button = forwardRef(({children, ...props}, ref) => (
    <button {...props} ref={ref}>
        {children}
    </button>
))