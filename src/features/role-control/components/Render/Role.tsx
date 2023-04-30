import { isEmpty } from 'lodash'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { List } from '~/@types'
import { IRoleControl } from '~/@types/role-control'
import { CheckButton, ErrorText } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import LANGUAGE from '~/i18n/language/key'
import { service } from '~/services'

interface Props {
    data: IRoleControl[] | undefined
    loading: boolean
}

const Role: React.FC<Props> = (props) => {
    const { data, loading } = props
    const { t } = useTranslation()

    const refactoredData = useMemo(() => {
        if (!data || isEmpty(data) || !Array.isArray(data)) return null

        const _d = service.listToTree<IRoleControl>(data)

        const callBack = (data: Array<List<IRoleControl>>, parentReplyNum: number) => {
            return data.map((d, index, origin) => {
                return (
                    <div key={d._id} className='flex flex-col items-start gap-3'>
                        <CheckButton
                            label={d.name}
                            checked
                            onChange={() => {}}
                            value=''
                            className=''
                            disabled
                            subLabel=''
                        />
                        {d.children && !isEmpty(d.children) && (
                            <div className='pl-5'>
                                <>{callBack(d.children, 0)}</>
                            </div>
                        )}
                    </div>
                )
            })
        }
        return callBack(_d, 0)
    }, [data])

    if (loading) return <LoadingText className='p-6' />

    if (!data || isEmpty(data) || !Array.isArray(data)) return <ErrorText className='p-6' />

    return (
        <div className='flex h-full flex-col'>
            <div className='p-6 text-xl font-normal sm:text-2xl'>{t(LANGUAGE.ROLE)}</div>
            <div className='p-6'>search</div>
            <div className='overflow-auto py-6 pl-6 dark:border-t-slate-700 md:border-t'>{refactoredData}</div>
        </div>
    )
}

export default Role
