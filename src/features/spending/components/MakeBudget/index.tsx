import { useTranslation } from 'react-i18next'
import { Button, Chip, SubmitWrap, Tabs } from '~/components'
import { DatePicker } from '~/components/_base'
import { useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import useBudget from '../../hook/useBudget'

const MakeBudget = () => {
    const { t } = useTranslation()
    const { loading } = useLoading()
    const { form, onsubmit, handleChangeDate, handlePreviousMonth, tabOptions } = useBudget()

    return (
        <form onSubmit={form.handleSubmit(onsubmit)} className='flex h-full flex-col'>
            <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                <div className='flex flex-1 flex-col justify-between'>
                    <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                        <div className='space-y-6 pt-3 pb-5'>
                            <div className='space-y-2'>
                                <div className='w-1/3'>
                                    <DatePicker
                                        name='date'
                                        form={form}
                                        showMonthYearPicker
                                        showTimeInput={false}
                                        format='MONTH'
                                        label={t(LANGUAGE.MONTH)}
                                        disabledClear
                                        onChange={handleChangeDate}
                                    />
                                </div>
                                <Chip onClick={handlePreviousMonth} disabled={loading.submit}>
                                    {t(LANGUAGE.CHOOSE_PREVIOUS_MONTH)}
                                </Chip>
                            </div>
                            <Tabs options={tabOptions} />
                        </div>
                    </div>
                </div>
            </div>
            <SubmitWrap>
                <Button color='yellow' type='submit' disabled={loading.submit}>
                    {t(LANGUAGE.SAVE)}
                </Button>
                <Button color='outline' type='button' onClick={close}>
                    {t(LANGUAGE.CANCEL)}
                </Button>
            </SubmitWrap>
        </form>
    )
}

export default MakeBudget
