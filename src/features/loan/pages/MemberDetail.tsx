import { useScrollIntoView } from '~/hook'

const MemberDetail = () => {
    const wrapRef = useScrollIntoView<HTMLDivElement>()

    return <div ref={wrapRef}>MemberDetail hello</div>
}

export default MemberDetail
