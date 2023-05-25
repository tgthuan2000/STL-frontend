import { useTranslation } from 'react-i18next'
import { Button, Chip, SlideFormWrap, SubmitWrap, Tabs } from '~/components'
import { DatePicker } from '~/components/_base'
import { useLoading, useSlideOver } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import useBudget from '../../hook/useBudget'

const MakeBudget = () => {
    const { t } = useTranslation()
    const { loading } = useLoading()
    const { close } = useSlideOver()
    const { form, onsubmit, handleChangeDate, handlePreviousMonth, tabOptions } = useBudget()

    return (
        <SlideFormWrap
            onSubmit={form.handleSubmit(onsubmit)}
            buttonZone={
                <SubmitWrap>
                    <Button color='yellow' type='submit' disabled={loading.submit}>
                        {t(LANGUAGE.SAVE)}
                    </Button>
                    <Button color='outline' type='button' onClick={close}>
                        {t(LANGUAGE.CANCEL)}
                    </Button>
                </SubmitWrap>
            }
        >
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
        </SlideFormWrap>
    )
}

export default MakeBudget
