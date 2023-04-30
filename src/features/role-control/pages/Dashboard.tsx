import { useTranslation } from 'react-i18next'
import { AnimateWrap, PaperWrap, Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import { Render } from '../components'
import useRoleControl from '../hook/useRoleControl'

const Dashboard = () => {
    const { permissions, roles } = useRoleControl()
    const { t } = useTranslation()

    return (
        <Transaction title={t(LANGUAGE.ROLE_CONTROL)} hasBack={false}>
            <PaperWrap
                className='mt-5 flex flex-col divide-y text-gray-900 dark:divide-slate-700 dark:text-slate-200 md:flex-row md:divide-x'
                disabledPadding
            >
                <AnimateWrap className='sm:h-[calc(100vh-230px)] sm:flex-1 md:flex-[1.5] lg:flex-1'>
                    <Render.Role data={roles.data} loading={roles.loading} />
                </AnimateWrap>
                <AnimateWrap className='sm:h-[calc(100vh-230px)] sm:flex-1 md:flex-[2] lg:flex-[3]'>
                    <Render.Permission data={permissions.data} loading={permissions.loading} />
                </AnimateWrap>
            </PaperWrap>
        </Transaction>
    )
}

export default Dashboard
