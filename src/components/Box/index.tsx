import Content from './Content'

const Box = ({ children }: { children?: React.ReactNode }) => {
    return <div className='grid xl:grid-cols-2 grid-cols-1 xl:gap-6 gap-4'>{children}</div>
}

Box.Content = Content

export default Box
