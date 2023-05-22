import { useTranslation } from 'react-i18next'
import { PermissionCheck } from '~/components'
import { PERMISSION } from '~/constant/permission'
import LANGUAGE from '~/i18n/language/key'
import AllowSendMail from './AllowSendMail'
import TwoFactorAuth from './TwoFactorAuth'

const Rights = () => {
    const { t } = useTranslation()

    return (
        <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 px-3 lg:px-6'>
            <div className='flex flex-col gap-6 text-gray-900 dark:text-slate-200'>
                <PermissionCheck permissions={[PERMISSION.PROFILE_RECEIVE_EMAIL]} fallback={<></>}>
                    <div className='w-full'>
                        <h4 className='pb-2 text-lg font-normal sm:text-xl'>{t(LANGUAGE.EMAIL)}</h4>
                        <AllowSendMail />
                    </div>
                </PermissionCheck>
                <div className='w-full'>
                    <h4 className='pb-2 text-lg font-normal sm:text-xl'>{t(LANGUAGE.SECURITY)}</h4>
                    <TwoFactorAuth />
                </div>
            </div>
        </div>
    )
}

export default Rights
