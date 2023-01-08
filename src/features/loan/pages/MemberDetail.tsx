import { TEMPLATE } from '~/constant/template'
import { useScrollIntoView } from '~/hook'

const MemberDetail = () => {
    const wrapRef = useScrollIntoView<HTMLDivElement>()

    return <div ref={wrapRef}>{TEMPLATE.COMING_SOON}</div>
}

export default MemberDetail
