import {Component} from "react";

export const List = ({as:Component = 'ul', children, ...props}) => (
    <Component {...props}>
        {children}
    </Component>
)