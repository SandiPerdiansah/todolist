import {Box, Image} from '../index.jsx'

export const EmptyContent = ({src, alt, ariaLabel, dataCY, onClick}) => {
    return(
        <Box data-cy={dataCY}>
            <Box as='figure' className='w-[28rem] mx-auto'>
                <Image
                    role='button'
                    src={src}
                    alt={alt}
                    aria-hidden='true'
                    aria-label={ariaLabel}
                    className='w-full object-cover'
                    onClick={onClick}
                />
            </Box>
        </Box>
    )
}