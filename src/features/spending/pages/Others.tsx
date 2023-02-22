import clsx from 'clsx'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { OthersQueryData } from '~/@types/spending'
import { Box, ButtonMenuDesktop, Divider, Transaction } from '~/components'
import { TAGS } from '~/constant'
import { menuMobileOthers } from '~/constant/components'
import { KIND_SPENDING } from '~/constant/spending'
import { useCheck } from '~/context'
import { useQuery, useWindowSize } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { GET_CATEGORY, GET_METHOD } from '~/schema/query/spending'
import { useProfile } from '~/store/auth'
import { ListOption } from '../components'

const Others = () => {
    const { t } = useTranslation()
    const { width } = useWindowSize()
    const { userProfile } = useProfile()

    const [{ category, method }, fetchData, deleteCache, reload] = useQuery<OthersQueryData>(
        {
            method: GET_METHOD,
            category: GET_CATEGORY,
        },
        {
            userId: userProfile?._id as string,
        },
        {
            category: TAGS.ENUM,
            method: TAGS.ENUM,
        }
    )

    useEffect(() => {
        fetchData()
    }, [])

    useCheck(reload)

    return (
        <Transaction hasBack={false} title={t(LANGUAGE.OTHERS)}>
            {width < 1280 && (
                <div className='block xl:hidden'>
                    <ButtonMenuDesktop small data={menuMobileOthers} />
                </div>
            )}

            <Divider className='py-6 xl:hidden' dashed />

            <Box>
                <Box.Content
                    className='col-span-1 xl:col-span-1 xl:col-start-1 xl:row-start-1'
                    title={t(LANGUAGE.CATEGORY)}
                    loading={category.loading}
                    seeMore={false}
                    fullWidth
                >
                    <ListOption
                        data={category?.data}
                        loading={category.loading}
                        cleanCache={() => deleteCache('category')}
                        renderItem={(item) => {
                            const kind = item?.kindSpending
                            return (
                                <div className='flex items-center gap-1'>
                                    <span
                                        title={kind?.name}
                                        className={clsx('inline-block h-2 w-2 rounded-full', {
                                            'bg-red-500': kind?.key === KIND_SPENDING.COST,
                                            'bg-green-500': kind?.key === KIND_SPENDING.RECEIVE,
                                        })}
                                    />
                                    <h4 className='font-medium'>{item?.name}</h4>
                                </div>
                            )
                        }}
                    />
                </Box.Content>
                <Box.Content
                    className='col-span-1 xl:col-span-1 xl:col-start-2 xl:row-start-1'
                    title={t(LANGUAGE.METHOD)}
                    loading={method.loading}
                    seeMore={false}
                    fullWidth
                >
                    <ListOption
                        data={method?.data}
                        loading={method.loading}
                        cleanCache={() => deleteCache('method')}
                        renderItem={(item) => <h4 className='font-medium'>{item?.name}</h4>}
                    />
                </Box.Content>
            </Box>
        </Transaction>
    )
}
export default Others
