import { Transaction } from '~/components'
import { useWindowSize } from '~/hook'
import { InputForm, Messages } from '../components'

const Dashboard = () => {
    const { width } = useWindowSize()
    const isMobileScreen = width < 768
    return (
        <Transaction hasBack={false} title='Phản hồi'>
            <div className='mt-5 bg-gray-200 dark:bg-slate-800 sm:rounded-lg -mx-4 sm:-mx-0 h-[80vh] flex flex-col'>
                <div className='flex-1 sm:px-5 pb-10 px-3 overflow-auto'>
                    <Messages />
                </div>
                <div className='flex-shrink-0 border-t dark:border-slate-700 sm:p-5 p-3'>
                    <InputForm />
                </div>
            </div>
        </Transaction>
    )
}

export default Dashboard
