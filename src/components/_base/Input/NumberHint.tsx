import { useAutoAnimate } from '@formkit/auto-animate/react'
import numeral from 'numeral'
import { InputNumberHintProps } from '~/@types/components'

const NumberHint: React.FC<InputNumberHintProps> = ({ field }) => {
    const [parent] = useAutoAnimate<HTMLDivElement>()

    return (
        <div ref={parent} className='pl-2 pt-1 text-gray-900 dark:text-slate-200'>
            {field.value && numeral(field.value).format()}
        </div>
    )
}

export default NumberHint
