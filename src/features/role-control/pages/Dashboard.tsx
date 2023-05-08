import { isEqual } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { List } from '~/@types'
import { IRoleControl } from '~/@types/role-control'
import { AnimateWrap, Divider, PaperWrap, Transaction } from '~/components'
import { useCheck } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import MobileMenu from '../components/MobileMenu'
import Render from '../components/Render'
import useRoleControl from '../hook/useRoleControl'

const Dashboard = () => {
    const { permissions, roles, refetch } = useRoleControl()
    const { t } = useTranslation()
    const [roleSelected, setRoleSelected] = useState<List<IRoleControl> | undefined>(undefined)

    const handleChangeRole = useCallback(
        (role: List<IRoleControl>) => {
            if (isEqual(roleSelected, role)) {
                setRoleSelected(undefined)
                return
            }
            setRoleSelected(role)
        },
        [roleSelected]
    )

    useEffect(() => {
        setRoleSelected((prev) => {
            if (!prev) return prev

            const role = roles.data?.find((r) => r._id === prev._id)
            if (role) {
                return role
            }
            return prev
        })
    }, [roles.data])

    useCheck(refetch)

    return (
        <Transaction title={t(LANGUAGE.ROLE_CONTROL)} hasBack={false}>
            <MobileMenu />

            <Divider className='py-6 xl:hidden' dashed />

            <PaperWrap
                className='mt-0 flex flex-col divide-y text-gray-900 dark:divide-slate-700 dark:text-slate-200 md:h-[calc(100vh-280px)] md:flex-row md:divide-y-0 md:divide-x xl:mt-5 xl:h-[calc(100vh-230px)]'
                disabledPadding
            >
                <AnimateWrap className='sm:flex-1 md:flex-[1.5] lg:flex-1'>
                    <Render.Role
                        data={roles.data}
                        loading={roles.loading}
                        selectedRole={roleSelected}
                        onChangeRole={handleChangeRole}
                        refetch={refetch}
                    />
                </AnimateWrap>
                <AnimateWrap className='sm:flex-1 md:flex-[2] lg:flex-[2]'>
                    <Render.Permission
                        data={permissions.data}
                        loading={permissions.loading}
                        selectedRole={roleSelected}
                        refetch={refetch}
                    />
                </AnimateWrap>
            </PaperWrap>
        </Transaction>
    )
}

export default Dashboard
