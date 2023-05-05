import numeral from 'numeral'
import { InputNumberHintProps } from '~/@types/components'
import AnimateWrap from '~/components/AnimateWrap'

const NumberHint: React.FC<InputNumberHintProps> = ({ field }) => {
    return (
        <AnimateWrap className='pl-2 pt-1 text-gray-900 dark:text-slate-200'>
            {field.value && numeral(field.value).format()}
        </AnimateWrap>
    )
}

export default NumberHint
