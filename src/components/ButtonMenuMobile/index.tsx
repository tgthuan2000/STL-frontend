import clsx from 'clsx'
import { IMenuBtn } from '~/@types/spending'
import { SlideOverProvider } from '~/context'
import ButtonItem from './ButtonItem'

const ButtonMenuMobile = ({ className, data }: { className?: string; data: IMenuBtn[] }) => {
    return (
        <div className={clsx('flex flex-nowrap items-center justify-evenly h-full', className)}>
            {data.map((item) => (
                <SlideOverProvider key={item.title} query={item.query} title={item.title}>
                    <ButtonItem data={item} />
                </SlideOverProvider>
            ))}
        </div>
    )
}

export default ButtonMenuMobile
