import { isEmpty } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IPermissionGroup } from '~/@types/role-control'
import { CheckButton, ErrorText } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import LANGUAGE from '~/i18n/language/key'

interface Props {
    data: IPermissionGroup[] | undefined
    loading: boolean
}

const Permission: React.FC<Props> = (props) => {
    const { data, loading } = props
    const { t } = useTranslation()

    if (loading) return <LoadingText className='p-6' />

    if (!data || isEmpty(data) || !Array.isArray(data)) return <ErrorText className='p-6' />

    return (
        <div className='flex h-full flex-col'>
            <div className='p-6 text-xl font-normal sm:text-2xl'>{t(LANGUAGE.PERMISSION)}</div>
            <div className='p-6'>search</div>
            <div className='grid flex-1 gap-6 overflow-auto p-6 dark:border-t-slate-700 md:border-t lg:grid-cols-2'>
                {data.map((group) => {
                    return (
                        <div key={group._id}>
                            <h4 className='text-sm font-normal sm:text-base'>{group.name}</h4>
                            {!isEmpty(group.permissions) && (
                                <div className='mt-2 flex flex-col gap-3'>
                                    {group.permissions.map((permission) => {
                                        return (
                                            <CheckButton
                                                key={permission._id}
                                                checked
                                                label={permission.name}
                                                onChange={() => {}}
                                                value=''
                                                className=''
                                                disabled
                                                subLabel={permission.description}
                                            />
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Permission
