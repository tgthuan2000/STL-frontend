import Content from './Content'
import WrapContent from './WrapContent'

interface Props {
    children?: React.ReactNode
}
const Box = (props: Props) => {
    const { children } = props

    return <div className='flex flex-col gap-4 lg:flex-row lg:gap-6'>{children}</div>
}

Box.WrapContent = WrapContent
Box.Content = Content

export default Box
