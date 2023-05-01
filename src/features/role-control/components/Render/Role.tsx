import { isEmpty } from 'lodash'
import React, { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { List } from '~/@types'
import { IRoleControl } from '~/@types/role-control'
import { Button, CheckButton } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import LoadingWait from '~/components/Loading/LoadingWait'
import LANGUAGE from '~/i18n/language/key'
import { service } from '~/services'

interface Props {
    data: IRoleControl[] | undefined
    loading: boolean
    selectedRole: List<IRoleControl> | undefined
    onChangeRole: (role: List<IRoleControl>) => void
    refetch: () => void
}

const Role: React.FC<Props> = (props) => {
    const { data, loading, selectedRole, refetch, onChangeRole } = props
    const { t } = useTranslation()

    const refactoredData = useMemo(() => {
        if (!data || isEmpty(data) || !Array.isArray(data)) return <LoadingText />

        const _d = service.listToTree<IRoleControl>(data)

        const callBack = (data: Array<List<IRoleControl>>) => {
            return data.map((d, index, origin) => {
                return (
                    <div key={d._id} className='flex flex-col items-start gap-3'>
                        <CheckButton
                            type='checkbox'
                            label={d.name}
                            checked={selectedRole?._id === d._id}
                            onChange={() => {
                                onChangeRole(d)
                            }}
                            value={d._id}
                            className=''
                            // disabled
                            subLabel=''
                        />
                        {d.children && !isEmpty(d.children) && (
                            <div className='pl-5'>
                                <>{callBack(d.children)}</>
                            </div>
                        )}
                    </div>
                )
            })
        }
        return callBack(_d)
    }, [data, selectedRole])

    // if (loading) return <LoadingText className='p-6' />

    // if (!data || isEmpty(data) || !Array.isArray(data)) return <ErrorText className='p-6' />

    return (
        <div className='flex h-full flex-col'>
            <div className='flex items-center justify-between p-6'>
                <h1 className='text-xl font-normal sm:text-2xl'>{t(LANGUAGE.ROLE)}</h1>

                <div className='flex items-center gap-3'>
                    <LoadingWait loading={loading} />
                    <Button type='button' color='outline-radicalRed' disabled>
                        {t(LANGUAGE.CREATE)}
                    </Button>
                </div>
            </div>

            {/* <div className='p-6'>search</div> */}
            <div className='space-y-3 overflow-auto py-6 pl-6 dark:border-t-slate-700 md:border-t'>
                {refactoredData}
            </div>
        </div>
    )
}

export default Role
