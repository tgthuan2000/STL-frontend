import { yupResolver } from '@hookform/resolvers/yup'
import { get } from 'lodash'
import moment from 'moment'
import { memo, useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { Loop } from '~/@types/time'
import { Button, FormWrap, SubmitWrap } from '~/components'
import { DatePicker, Input, Radio, RichText, UploadImage } from '~/components/_base'
import { useCheck, useLoading, useSlideOver } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { useProfile } from '~/store/auth'
import useCalendarLoop from '../hook/useCalendarLoop'
import ChooseColor from './ChooseColor'
interface ScheduleForm {
    title: string
    description: string
    startDate: Date | undefined
    endDate: Date | undefined
    loop: Loop | null
    textColor: string
    bgColor: string
    image: null

    __loopValid: boolean
}

export const useScheduleSchema = () => {
    const { t } = useTranslation()
    const schema = useMemo(() => {
        return yup.object().shape({
            title: yup.string().required(t(LANGUAGE.REQUIRED_FIELD) as string),
            description: yup.string(),
            startDate: yup.date().required(t(LANGUAGE.REQUIRED_FIELD) as string),
            endDate: yup
                .date()
                .when('startDate', (startDate: Date, schema: yup.DateSchema) => {
                    if (!startDate) {
                        return schema
                    }
                    return schema.min(startDate, t(LANGUAGE.END_DATE_MUST_BE_GREATER_THAN_START_DATE) as string)
                })
                .required(t(LANGUAGE.REQUIRED_FIELD) as string),
            loop: yup
                .object()
                .nullable()
                .required(t(LANGUAGE.REQUIRED_FIELD) as string),
            textColor: yup.string().required(t(LANGUAGE.REQUIRED_FIELD) as string),
            bgColor: yup.string().required(t(LANGUAGE.REQUIRED_FIELD) as string),

            __loopValid: yup
                .boolean()
                .test('__loopValid', t(LANGUAGE.NEED_SAVE_TO_UPDATED) as string, (value) => value === true),
        })
    }, [t])

    return schema
}

const MakeSchedule = () => {
    const { t } = useTranslation()
    const { loading, setSubmitLoading } = useLoading()
    const { userProfile } = useProfile()
    const { needCheckWhenLeave } = useCheck()
    const schema = useScheduleSchema()
    const { close } = useSlideOver()

    const form = useForm<ScheduleForm>({
        defaultValues: {
            title: '',
            textColor: '#ffffff',
            bgColor: '#000000',
            description: '',
            startDate: new Date(),
            endDate: new Date(),
            loop: null,
            image: null,
            __loopValid: true, // using for validate loop
        },
        resolver: yupResolver(schema),
    })

    const startDate = form.watch('startDate')
    const endDate = form.watch('endDate')

    const onsubmit = async (data: ScheduleForm) => {
        try {
            setSubmitLoading(true)
            let { bgColor, startDate, endDate, description, image, loop, textColor, title } = data
            let imageId = null

            title = title.trim()

            if (image) {
                const response = await client.assets.upload('image', image)
                imageId = response._id
            }

            const document = {
                _type: 'schedule',
                title,
                description,
                startDate: moment(startDate).format(),
                endDate: moment(endDate).format(),
                loop: {
                    _type: 'reference',
                    _ref: loop?._id,
                },
                textColor,
                bgColor,
                user: {
                    _type: 'reference',
                    _ref: userProfile?._id,
                },
                ...(imageId && { image: { _type: 'image', asset: { _type: 'reference', _ref: imageId } } }),
            }

            await client.create(document)

            form.reset({ title: '', description: '', image: null }, { keepDefaultValues: true })

            toast.success(t(LANGUAGE.NOTIFY_CREATE_SCHEDULE_SUCCESS))
            needCheckWhenLeave()
        } catch (error) {
            console.log(error)
            toast.error<string>(get(error, 'response.data.message', 'Something went wrong'))
        } finally {
            setSubmitLoading(false)
        }
    }

    const renderLoop = useCallback(
        (data: Loop[] | undefined, loading: boolean) => (
            <Radio
                name='loop'
                form={form}
                loading={loading}
                options={data}
                label={t(LANGUAGE.LOOP)}
                getOptionKey={(option: Loop) => option?._id}
                getOptionLabel={(option: Loop) => option?.name}
            />
        ),
        []
    )

    const setDefaultLoopValue = useCallback((value: Loop) => form.setValue('loop', value), [])

    return (
        <FormWrap
            onSubmit={form.handleSubmit(onsubmit)}
            renderButton={
                <SubmitWrap>
                    <Button color='cyan' type='submit' disabled={loading.submit}>
                        {t(LANGUAGE.SAVE)}
                    </Button>
                    <Button color='outline' type='button' onClick={close}>
                        {t(LANGUAGE.CANCEL)}
                    </Button>
                </SubmitWrap>
            }
        >
            <Input name='title' form={form} label={t(LANGUAGE.TITLE)} />
            <RichText
                label={t(LANGUAGE.SHORT_DESCRIPTION)}
                form={form}
                name='description'
                placeholder={t(LANGUAGE.PLACEHOLDER_SHORT_DESCRIPTION)}
                className='xs'
            />
            <DatePicker
                form={form}
                name='startDate'
                label={t(LANGUAGE.START_DATE)}
                placeholderText={t(LANGUAGE.PLACEHOLDER_CHOOSE_TIME)}
                format='DATE_TIME'
                disabledClear={!startDate}
                startDate={startDate}
                endDate={endDate}
                selectsStart
            />
            <DatePicker
                form={form}
                name='endDate'
                label={t(LANGUAGE.END_DATE)}
                placeholderText={t(LANGUAGE.PLACEHOLDER_CHOOSE_TIME)}
                format='DATE_TIME'
                disabledClear={!endDate}
                startDate={startDate}
                endDate={endDate}
                selectsEnd
                minDate={startDate}
            />
            <GetLoop onDefaultValue={setDefaultLoopValue}>{renderLoop}</GetLoop>
            <ChooseColor form={form} bgColorName='bgColor' textColorName='textColor' />
            <UploadImage name='image' form={form} label={t(LANGUAGE.IMAGE_OPTION)} />
        </FormWrap>
    )
}

interface LoopProps {
    children: (data: Loop[] | undefined, loading: boolean) => React.ReactNode
    onDefaultValue?: (value: Loop) => void
}

export const GetLoop: React.FC<LoopProps> = memo((props) => {
    const { children, onDefaultValue } = props
    const { data, loading } = useCalendarLoop((data) => onDefaultValue?.(data[0]))

    return <>{children(data, loading)}</>
})

export default MakeSchedule
