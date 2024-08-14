import {Component} from "react";

export const Heading = ({as: Component = 'h1', children, ...props}) => (
    <Component {...props}>
        {children}
    </Component>
)