import {Component} from "react";

export const Box = ({as: Component = 'div', children, ...props}) => (
    <Component{...props}>
        {children}
    </Component>
)