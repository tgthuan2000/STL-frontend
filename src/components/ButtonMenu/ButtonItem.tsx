import clsx from 'clsx'
import { Link, useNavigate } from 'react-router-dom'
import { ButtonProps } from '~/@types/components'
import { useSlideOver } from '~/context'
import { SlideOver, Divider } from '~/components'

const ButtonItem = ({ data }: ButtonProps) => {
    const { title, color, icon: Icon, children, to, query, divider } = data
    const { setIsOpen, setTitle } = useSlideOver()
    const navigate = useNavigate()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (query) {
            e.preventDefault()
            navigate(to)
            setIsOpen(true)
            setTitle(title)
        }
    }

    return (
        <>
            {divider && <Divider className='w-full py-1' />}
            <Link
                to={to}
                onClick={handleClick}
                className={clsx(
                    'group min-w-[50px] inline-flex items-center justify-center flex-col py-2 px-2 space-y-2 border border-transparent font-medium rounded-md focus:outline-none xl:hover:w-[150px] xl:hover:my-2 xl:hover:scale-125 xl:origin-bottom-right xl:hover:-translate-x-1/4 xl:hover:right-full xl:relative xl:transition-all xl:hover:shadow-lg',
                    color
                )}
                title={title}
            >
                <Icon className='w-10 h-10 xl:w-8 xl:h-8' />
                <span className='text-center truncate w-full block xl:hidden xl:group-hover:block'>{title}</span>
            </Link>
            <SlideOver>{children}</SlideOver>
        </>
    )
}

export default ButtonItem
