import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, FormWrap, SubmitWrap } from '~/components'
import { DatePicker, Input, TextArea } from '~/components/_base'
import { useLoading, useSlideOver } from '~/context'
import LANGUAGE from '~/i18n/language/key'

const MakeTimeKeeping = () => {
    const { t } = useTranslation()
    const { loading } = useLoading()
    const { close } = useSlideOver()
    const form = useForm({
        defaultValues: {},
    })

    const onsubmit = async (data: any) => {}
    return (
        <FormWrap
            onSubmit={form.handleSubmit(onsubmit)}
            renderButton={
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
            <Input name='amount' form={form} label={t(LANGUAGE.TITLE)} />
            <DatePicker name='date' form={form} label={t(LANGUAGE.DATE)} />
            <TextArea name='description' form={form} label={t(LANGUAGE.NOTE)} />
        </FormWrap>
    )
}

export default MakeTimeKeeping
