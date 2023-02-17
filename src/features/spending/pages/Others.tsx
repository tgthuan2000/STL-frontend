import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { OthersQueryData } from '~/@types/spending'
import { Box, ButtonMenuDesktop, Divider, Transaction } from '~/components'
import { TAGS } from '~/constant'
import { menuMobileOthers } from '~/constant/components'
import { useCheck } from '~/context'
import { useQuery, useWindowSize } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { GET_CATEGORY, GET_METHOD_SPENDING } from '~/schema/query/spending'
import { useProfile } from '~/store/auth'
import { ListOption } from '../components'

const Others = () => {
    const { t } = useTranslation()
    const { width } = useWindowSize()
    const { userProfile } = useProfile()

    const [{ category, method }, fetchData, deleteCache, reload] = useQuery<OthersQueryData>(
        {
            method: GET_METHOD_SPENDING,
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
                <div className='xl:hidden block'>
                    <ButtonMenuDesktop small data={menuMobileOthers} />
                </div>
            )}

            <Divider className='xl:hidden py-6' dashed />

            <Box>
                <Box.Content
                    className='xl:row-start-1 xl:col-start-1 xl:col-span-1 col-span-1'
                    title={t(LANGUAGE.CATEGORY)}
                    loading={category.loading}
                    seeMore={false}
                    fullWidth
                >
                    <ListOption
                        data={category?.data}
                        loading={category.loading}
                        cleanCache={() => deleteCache('category')}
                    />
                </Box.Content>
                <Box.Content
                    className='xl:row-start-1 xl:col-start-2 xl:col-span-1 col-span-1'
                    title={t(LANGUAGE.METHOD)}
                    loading={method.loading}
                    seeMore={false}
                    fullWidth
                >
                    <ListOption data={method?.data} loading={method.loading} cleanCache={() => deleteCache('method')} />
                </Box.Content>
            </Box>
        </Transaction>
    )
}
export default Others
