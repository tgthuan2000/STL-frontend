import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

const useChartTool = () => {
    const { t } = useTranslation()

    const chartTypes: { id: 'bar' | 'line'; label: string }[] = useMemo(() => {
        return [
            { id: 'bar', label: t(LANGUAGE.DAILY) },
            { id: 'line', label: t(LANGUAGE.TOTAL) },
        ]
    }, [t])

    const [chartType, setChartType] = useState<'bar' | 'line'>(chartTypes[0].id)

    return { chartTypes, chartType, setChartType }
}

export default useChartTool
