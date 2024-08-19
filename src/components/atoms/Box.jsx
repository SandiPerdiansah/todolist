import {Component, forwardRef} from "react";

export const Box = forwardRef(({as: Component = 'div', children, ...props}, ref) => (
    <Component{...props} ref={ref}>
        {children}
    </Component>
))