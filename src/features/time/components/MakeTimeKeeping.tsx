import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, SubmitWrap } from '~/components'
import { DatePicker, Input, TextArea } from '~/components/_base'
import { useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'

const MakeTimeKeeping = () => {
    const { t } = useTranslation()
    const { loading } = useLoading()
    const form = useForm({
        defaultValues: {},
    })

    const onsubmit = async (data: any) => {}
    return (
        <form onSubmit={form.handleSubmit(onsubmit)} className='flex h-full flex-col'>
            <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                <div className='flex flex-1 flex-col justify-between'>
                    <div className='px-4 sm:px-6'>
                        <div className='space-y-6 pt-3 pb-5'>
                            <Input name='amount' form={form} label={t(LANGUAGE.TITLE)} />

                            <DatePicker name='date' form={form} label={t(LANGUAGE.DATE)} />

                            <TextArea name='description' form={form} label={t(LANGUAGE.NOTE)} />
                        </div>
                    </div>
                </div>
            </div>
            <SubmitWrap>
                <Button color='yellow' type='submit' disabled={loading.submit}>
                    {t(LANGUAGE.SAVE)}
                </Button>
                <Button color='outline' type='button' onClick={() => {}}>
                    {t(LANGUAGE.CANCEL)}
                </Button>
            </SubmitWrap>
        </form>
    )
}

export default MakeTimeKeeping
