import clsx from 'clsx'
import { SlideOverProvider } from '~/context'
import { menuBtns } from '~/constant/components'
import ButtonItem from './ButtonItem'

const ButtonMenu = ({ className }: { className?: string }) => {
    return (
        <div className={clsx('min-h-[240px] max-w-lg mx-auto grid grid-cols-2 xl:grid-cols-1 gap-2', className)}>
            {menuBtns.map((menuBtn) => (
                <SlideOverProvider key={menuBtn.title} query={menuBtn.query} title={menuBtn.title}>
                    <ButtonItem data={menuBtn} />
                </SlideOverProvider>
            ))}
        </div>
    )
}

export default ButtonMenu
