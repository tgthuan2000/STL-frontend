import { useScrollIntoView } from '~/hook'

const MemberDetail = () => {
    const wrapRef = useScrollIntoView<HTMLDivElement>()

    return <div ref={wrapRef}>MemberDetail</div>
}

export default MemberDetail
