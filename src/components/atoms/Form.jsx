export const Form = ({children, onSubmit, ...props}) => (
    <form onSubmit={onSubmit} {...props}>
        {children}
    </form>
)