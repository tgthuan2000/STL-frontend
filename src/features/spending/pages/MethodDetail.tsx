import { useScrollIntoView } from '~/hook'

const MethodDetail = () => {
    const wrapRef = useScrollIntoView<HTMLDivElement>()

    return <div ref={wrapRef}>MethodDetail</div>
}

export default MethodDetail
