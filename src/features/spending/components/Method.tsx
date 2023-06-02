import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline'
import { get } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MethodProps } from '~/@types/spending'
import * as Atom from '~/components/_atomic/Atom'
import { SimpleList } from '~/components/_atomic/Template'
import { getAmountTextColor } from '~/constant/template'
import LANGUAGE from '~/i18n/language/key'

const Method: React.FC<MethodProps> = (props) => {
    const { data, loading } = props
    const { t } = useTranslation()

    return (
        <SimpleList
            data={data}
            loading={loading}
            fallback={<Atom.EmptyList icon={ArchiveBoxXMarkIcon} text={t(LANGUAGE.EMPTY_DATA)} />}
            loadingFallback={<Atom.SimpleListSkeleton elNumber={8} />}
            getItemKey={(item) => get(item, '_id')}
            getItemLink={(item) => `/spending/method/${get(item, '_id')}`}
            renderTitle={(item) => <Atom.Title title={get(item, 'name')} fallback={t(LANGUAGE.EMPTY_METHOD)} />}
            renderValue={(item) => {
                const surplus = get(item, 'surplus')
                return <Atom.Amount amount={surplus} className={() => getAmountTextColor(surplus)} />
            }}
        />
    )
}

export default Method
