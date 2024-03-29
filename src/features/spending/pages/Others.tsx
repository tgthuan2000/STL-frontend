import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Box, Divider, Transaction } from '~/components'
import { KIND_SPENDING } from '~/constant/spending'
import { useCache } from '~/context'
import { useServiceQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import ListOption from '../components/ListOption'
import OtherMobileMenu from '../components/OtherMobileMenu'
import useOthers from '../hook/useOthers'

const Others = () => {
    const { t } = useTranslation()
    const { METHOD_SPENDING_DESC_SURPLUS, COST_CATEGORY_SPENDING, RECEIVE_CATEGORY_SPENDING, METHOD_SPENDING } =
        useServiceQuery()
    const { deleteCache } = useCache()
    const [{ category, method }, deleteCaches, refetch] = useOthers()

    return (
        <Transaction hasBack={false} title={t(LANGUAGE.OTHERS)}>
            <OtherMobileMenu />

            <Divider className='py-6 xl:hidden' dashed />

            <Box.Container>
                <Box.Content
                    className='flex-1'
                    title={t(LANGUAGE.CATEGORY)}
                    loading={category.loading}
                    onReload={() => refetch('category')}
                >
                    <ListOption
                        data={category?.data}
                        loading={category.loading}
                        cleanCache={() => {
                            deleteCaches('category')
                            deleteCache([COST_CATEGORY_SPENDING, RECEIVE_CATEGORY_SPENDING])
                        }}
                        renderItem={(item) => {
                            const kind = item?.kindSpending
                            return (
                                <div className='flex items-center gap-1'>
                                    <span
                                        title={kind?.name}
                                        className={clsx('inline-block h-2 w-2 flex-shrink-0 rounded-full', {
                                            'bg-red-500': kind?.key === KIND_SPENDING.COST,
                                            'bg-green-500': kind?.key === KIND_SPENDING.RECEIVE,
                                        })}
                                    />
                                    <h4 className='truncate font-medium'>{item?.name}</h4>
                                </div>
                            )
                        }}
                    />
                </Box.Content>
                <Box.Content
                    className='flex-1'
                    title={t(LANGUAGE.METHOD)}
                    loading={method.loading}
                    onReload={() => refetch('method')}
                >
                    <ListOption
                        data={method?.data}
                        loading={method.loading}
                        cleanCache={() => {
                            deleteCaches('method')
                            deleteCache([METHOD_SPENDING_DESC_SURPLUS, METHOD_SPENDING])
                        }}
                        renderItem={(item) => <h4 className='font-medium'>{item?.name}</h4>}
                    />
                </Box.Content>
            </Box.Container>
        </Transaction>
    )
}
export default Others
