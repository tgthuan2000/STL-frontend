import { useTranslation } from 'react-i18next'
import { AnimateWrap, Transaction } from '~/components'
import LoadingWait from '~/components/Loading/LoadingWait'
import LANGUAGE from '~/i18n/language/key'
import { FallbackMessage, InputForm, Messages } from '../components'
import useActionFeedback from '../hook/useActionFeedback'
import useFeedback from '../hook/useFeedback'

const Dashboard = () => {
    const { t } = useTranslation()
    const {
        feedback,
        treeData,
        actions: { seeMoreClick },
    } = useFeedback()
    const { deleteMessage, editMessage, replyMessage, submitNewMessage } = useActionFeedback()

    return (
        <Transaction hasBack={false} title={t(LANGUAGE.FEEDBACK)}>
            <div className='relative -mx-4 mt-5 flex h-[80vh] flex-col bg-gray-200 dark:bg-slate-800 sm:-mx-0 sm:rounded-lg'>
                <LoadingWait loading={feedback.loading} className='absolute right-5 top-5' />
                <AnimateWrap className='flex-1 overflow-auto px-3 pb-10 text-gray-900 dark:text-slate-200 sm:px-5'>
                    <Messages
                        data={treeData}
                        onSeeMoreClick={seeMoreClick}
                        onReply={replyMessage}
                        onEdit={editMessage}
                        onDelete={deleteMessage}
                        fallback={<FallbackMessage />}
                    />
                </AnimateWrap>
                <div className='flex-shrink-0 border-t p-3 dark:border-slate-700 sm:p-5'>
                    <InputForm onSubmit={submitNewMessage} />
                </div>
            </div>
        </Transaction>
    )
}

export default Dashboard
