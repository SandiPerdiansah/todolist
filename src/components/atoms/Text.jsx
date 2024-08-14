import {Component} from "react";

export const Text = ({as: Component = 'p', children, ...props}) => (
    <Component {...props}>
        {children}
    </Component>
)