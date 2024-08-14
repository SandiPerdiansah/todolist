import {Component} from "react";

export const ListItem = ({as:Component = 'li', children, ...props}) => (
    <Component {...props}>
        {children}
    </Component>
)