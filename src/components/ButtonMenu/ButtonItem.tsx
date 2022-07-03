import clsx from 'clsx'
import { Link, useNavigate } from 'react-router-dom'
import { ButtonProps } from '~/@types/components'
import { useSlideOver } from '~/context'
import { SlideOver } from '~/components'

const ButtonItem = ({ data }: ButtonProps) => {
    const { title, color, icon: Icon, children, to } = data
    const { setIsOpen, setTitle } = useSlideOver()
    const navigate = useNavigate()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        navigate(to)
        setIsOpen(true)
        setTitle(title)
    }

    return (
        <>
            <Link
                to={to}
                onClick={handleClick}
                className={clsx(
                    'inline-flex items-center justify-center flex-col py-2 space-y-2 border border-transparent font-medium rounded-md focus:outline-none',
                    color
                )}
            >
                <Icon className='w-10 h-10' />
                <span>{title}</span>
            </Link>
            <SlideOver>{children}</SlideOver>
        </>
    )
}

export default ButtonItem
