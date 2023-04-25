import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button, SubmitWrap } from '~/components'
import { DatePicker, Input, RichText, Selection, UploadImage } from '~/components/_base'
import { useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import * as yup from 'yup'
import { DateRange } from '~/@types/components'
import { isValidDateRange } from '~/services'
import { get } from 'lodash'
interface ScheduleForm {
    title: string
    description: string
    dateRange: [Date | null, Date | null]
    loop: any
    color: string
    image: null
}

const useSchema = () => {
    const { t } = useTranslation()
    const schema = useMemo(() => {
        return yup.object().shape({
            title: yup.string().required(t(LANGUAGE.REQUIRED_FIELD) as string),
            description: yup.string(),
            dateRange: yup
                .array()
                .of(yup.date())
                .test('dateRange', t(LANGUAGE.REQUIRED_FIELD) as string, (value) => {
                    return isValidDateRange(value as DateRange)
                })
                .nullable(),
        })
    }, [t])

    return schema
}

const MakeSchedule = () => {
    const { t } = useTranslation()
    const { loading } = useLoading()
    const schema = useSchema()
    const form = useForm<ScheduleForm>({
        defaultValues: {
            title: '',
            color: '',
            description: '',
            dateRange: [null, null],
            loop: '',
            image: null,
        },
        resolver: yupResolver(schema),
    })
    const dateRange = form.watch('dateRange')

    const onsubmit = async (data: ScheduleForm) => {
        console.log(data)
    }

    return (
        <form onSubmit={form.handleSubmit(onsubmit)} className='flex h-full flex-col'>
            <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                <div className='flex flex-1 flex-col justify-between'>
                    <div className='px-4 sm:px-6'>
                        <div className='space-y-6 pt-3 pb-5'>
                            <Input name='title' form={form} label={t(LANGUAGE.TITLE)} />

                            <RichText
                                label={t(LANGUAGE.SHORT_DESCRIPTION)}
                                form={form}
                                name='description'
                                placeholder={t(LANGUAGE.PLACEHOLDER_SHORT_DESCRIPTION)}
                                className='xs'
                            />

                            <DatePicker
                                showTimeInput={false}
                                selectsRange
                                form={form}
                                name='dateRange'
                                label={t(LANGUAGE.DATE_RANGE)}
                                placeholderText={t(LANGUAGE.PLACEHOLDER_CHOOSE_TIME)}
                                format='DATE'
                                startDate={get(dateRange, '[0]')}
                                endDate={get(dateRange, '[1]')}
                                onChange={(dateRange: DateRange) => {
                                    if (isValidDateRange(dateRange)) {
                                        form.setValue('dateRange', dateRange)
                                    }
                                }}
                            />

                            <Selection
                                name='loop'
                                form={form}
                                label={t(LANGUAGE.LOOP)}
                                data={[
                                    {
                                        label: 'Không lặp',
                                        value: 'none',
                                    },
                                    {
                                        label: 'Hàng ngày',
                                        value: 'daily',
                                    },
                                    {
                                        label: 'Hàng tuần',
                                        value: 'weekly',
                                    },
                                    {
                                        label: 'Hàng tháng',
                                        value: 'monthly',
                                    },
                                    {
                                        label: 'Hàng năm',
                                        value: 'yearly',
                                    },
                                ]}
                                valueKey='label'
                                idKey='value'
                            />

                            <Input name='color' type='color' form={form} label={t(LANGUAGE.COLOR)} />

                            <UploadImage name='image' form={form} label={t(LANGUAGE.IMAGE_OPTION)} />
                        </div>
                    </div>
                </div>
            </div>
            <SubmitWrap>
                <Button color='cyan' type='submit' disabled={loading.submit}>
                    {t(LANGUAGE.SAVE)}
                </Button>
                <Button color='outline' type='button' onClick={() => {}}>
                    {t(LANGUAGE.CANCEL)}
                </Button>
            </SubmitWrap>
        </form>
    )
}

export default MakeSchedule
