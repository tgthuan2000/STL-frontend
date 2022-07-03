const Title = ({ title }: { title?: string }) => {
    if (!title) return null
    return (
        <div className='border-b border-gray-200 bg-gray-50 px-4 py-2 text-base font-medium text-gray-500'>{title}</div>
    )
}

export default Title
