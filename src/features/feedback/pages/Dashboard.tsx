import { useTranslation } from 'react-i18next'
import { AnimateWrap, Transaction } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import LANGUAGE from '~/i18n/language/key'
import { InputForm, Messages } from '../components'
import useFeedback from '../hook/useFeedback'
import useActionFeedback from '../hook/useActionFeedback'

const Dashboard = () => {
    const { t } = useTranslation()
    const {
        feedback,
        actions: { seeMoreClick },
    } = useFeedback()
    const { deleteMessage, editMessage, replyMessage, submitNewMessage } = useActionFeedback()

    return (
        <Transaction hasBack={false} title={t(LANGUAGE.FEEDBACK)}>
            <div className='-mx-4 mt-5 flex h-[80vh] flex-col bg-gray-200 dark:bg-slate-800 sm:-mx-0 sm:rounded-lg'>
                <AnimateWrap className='flex-1 overflow-auto px-3 pb-10 sm:px-5'>
                    {feedback.loading && <LoadingText className='mt-5 text-center' />}
                    <Messages
                        data={feedback.data?.data}
                        onSeeMoreClick={seeMoreClick}
                        onReply={replyMessage}
                        onEdit={editMessage}
                        onDelete={deleteMessage}
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
