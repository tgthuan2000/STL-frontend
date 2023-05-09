import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Paper } from '~/components'
import { useWindowSize } from '~/hook'
import { MessageZoneProps } from '.'
import useFeedbackDetail from '../../hook/useFeedbackDetail'
import { FEEDBACK_PARAM } from '../../pages/Dashboard'
import Dialog from './Dialog'

const messageZoneHOC = (Component: React.FC<MessageZoneProps>) => () => {
    const { width } = useWindowSize()
    const [searchParams] = useSearchParams()
    const feedbackId = searchParams.get(FEEDBACK_PARAM)

    const {
        feedback,
        treeData,
        actions: { seeMoreClick, getParent },
    } = useFeedbackDetail({
        feedbackId,
    })

    const renderComponent = useMemo(() => {
        return (
            <Component data={treeData} loading={feedback.loading} seeMoreClick={seeMoreClick} onGetParent={getParent} />
        )
    }, [treeData, feedback.loading, seeMoreClick])

    if (width <= 1024) return <Dialog>{renderComponent}</Dialog>

    return (
        <Paper className='flex-[3]' disabledPadding>
            {renderComponent}
        </Paper>
    )
}

export default messageZoneHOC
