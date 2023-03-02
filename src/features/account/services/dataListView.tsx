import { TableColumn } from '~/@types/components'
import i18n from '~/i18n'
import LANGUAGE from '~/i18n/language/key'

const { t } = i18n
export const columns: (width: number) => Array<TableColumn> = (width) => [
    {
        key: 'date',
        title: t(LANGUAGE.DATE),
        label: 'string',
        renderRow: ({}) => <td className='whitespace-nowrap pt-3 pl-2 pr-3 text-xs sm:pl-3 sm:text-sm'></td>,
    },
]
