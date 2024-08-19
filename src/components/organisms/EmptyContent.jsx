import {Box, Image} from '../index.jsx'

export const EmptyContent = ({src, alt, ariaLabel, dataCY, onClick}) => {
    return(
        <Box data-cy={dataCY} className='w-full h-[60vh] flex items-center justify-center lg:h-auto'>
            <Box as='figure' className='w-[18rem] lg:w-[28rem] mx-auto'>
                <Image
                    role='button'
                    src={src}
                    alt={alt}
                    aria-hidden='true'
                    aria-label={ariaLabel}
                    className='w-full object-cover -ms-5 lg:ms-0'
                    onClick={onClick}
                />
            </Box>
        </Box>
    )
}