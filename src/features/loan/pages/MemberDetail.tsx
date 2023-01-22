import { TEMPLATE } from '~/constant/template'
import { useScrollIntoView } from '~/hook'

const MemberDetail = () => {
    const wrapRef = useScrollIntoView<HTMLDivElement>()

    return (
        <div ref={wrapRef} className='text-gray-900 dark:text-slate-200'>
            {TEMPLATE.COMING_SOON}
        </div>
    )
}

export default MemberDetail
