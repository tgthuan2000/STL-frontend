import { useScrollIntoView } from '~/hook'

const TransactionEdit = () => {
    const wrapRef = useScrollIntoView<HTMLDivElement>()

    return <div ref={wrapRef}>TransactionEdit</div>
}

export default TransactionEdit
