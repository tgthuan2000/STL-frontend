import { TEMPLATE } from '~/constant/template'
import { useScrollIntoView } from '~/hook'

const MemberDetail = () => {
    const wrapRef = useScrollIntoView<HTMLDivElement>()

    return <div ref={wrapRef}>{TEMPLATE.LOADING}</div>
}

export default MemberDetail
