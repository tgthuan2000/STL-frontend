import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Box, ButtonMenuDesktop, Divider, Transaction } from '~/components'
import { KIND_SPENDING } from '~/constant/spending'
import { useCache } from '~/context'
import { useServiceQuery, useWindowSize } from '~/hook'
import { useMenuMobileOthers } from '~/hook/components'
import LANGUAGE from '~/i18n/language/key'
import { ListOption } from '../components'
import useOthers from '../hook/useOthers'

const Others = () => {
    const { t } = useTranslation()
    const { width } = useWindowSize()
    const { METHOD_SPENDING_DESC_SURPLUS, COST_CATEGORY_SPENDING, RECEIVE_CATEGORY_SPENDING, METHOD_SPENDING } =
        useServiceQuery()
    const { deleteCache } = useCache()
    const [{ category, method }, deleteCaches] = useOthers()
    const menuMobileOthers = useMenuMobileOthers()

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
                    className='col-span-1 xl:col-span-1 xl:col-start-2 xl:row-start-1'
                    title={t(LANGUAGE.METHOD)}
                    loading={method.loading}
                    seeMore={false}
                    fullWidth
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
            </Box>
        </Transaction>
    )
}
export default Others
