export const Label = ({htmlFor, label, ...props}) => (
    <label htmlFor={htmlFor} {...props}>l{label}</label>
)