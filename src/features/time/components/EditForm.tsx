import { ArrowSmallLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import moment from 'moment'
import React, { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ICalendarDetail, Loop } from '~/@types/time'
import { Button, FormWrap, SubmitWrap } from '~/components'
import { DatePicker, Input, Radio, RichText, UploadImage } from '~/components/_base'
import { useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import ChooseColor from './ChooseColor'
import { GetLoop, useScheduleSchema } from './MakeSchedule'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface Props {
    data: ICalendarDetail
    onDelete: () => Promise<void>
    onSubmit: (data: EditUseForm) => Promise<void>
}

export interface EditUseForm extends Omit<ICalendarDetail, 'startDate' | 'endDate'> {
    startDate: Date
    endDate: Date
    __loopValid: boolean
}

const EditForm: React.FC<Props> = ({ data, onDelete, onSubmit }) => {
    const { _id, bgColor, endDate, loop, startDate, textColor, title, description, image } = data
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { loading } = useLoading()
    const schema = useScheduleSchema()
    const form = useForm<EditUseForm>({
        defaultValues: {
            _id,
            bgColor,
            description,
            endDate: moment(endDate).toDate(),
            image,
            loop,
            startDate: moment(startDate).toDate(),
            textColor,
            title,
            __loopValid: true, // using for validate loop
        },
        resolver: yupResolver(schema),
    })

    const _loop = form.watch('loop')
    const _startDate = form.watch('startDate')
    const _endDate = form.watch('endDate')

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

    return (
        <div>
            <div className='mb-4 flex items-center justify-between'>
                <div className='flex select-none items-center space-x-2 text-gray-900 dark:text-slate-200'>
                    <ArrowSmallLeftIcon
                        className='h-7 w-7 cursor-pointer hover:opacity-50'
                        onClick={() => {
                            navigate(-1)
                        }}
                    />
                    <h4 className='text-xl font-semibold xl:text-2xl'>{t(LANGUAGE.SCHEDULE_DETAIL)}</h4>
                </div>

                <span
                    className='h-8 w-8 cursor-pointer rounded-lg bg-slate-200 p-1.5 text-gray-600 transition-opacity hover:opacity-50 dark:bg-slate-700 dark:text-slate-300 lg:h-9 lg:w-9'
                    onClick={onDelete}
                >
                    <TrashIcon />
                </span>
            </div>
            <div className='rounded-xl bg-white py-2 shadow-lg dark:bg-slate-800 sm:py-6 lg:py-8'>
                <div className='mx-auto w-full max-w-lg'>
                    <FormWrap
                        onSubmit={form.handleSubmit(onSubmit)}
                        renderButton={
                            <SubmitWrap>
                                <Button color='blue' type='submit' disabled={loading.submit}>
                                    {t(LANGUAGE.UPDATE)}
                                </Button>
                                <Button
                                    color='outline'
                                    type='button'
                                    onClick={() => {
                                        navigate(-1)
                                    }}
                                >
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
                            disabledClear={!_startDate}
                            startDate={_startDate}
                            endDate={_endDate}
                            selectsStart
                        />
                        <DatePicker
                            form={form}
                            name='endDate'
                            label={t(LANGUAGE.END_DATE)}
                            placeholderText={t(LANGUAGE.PLACEHOLDER_CHOOSE_TIME)}
                            format='DATE_TIME'
                            disabledClear={!_endDate}
                            startDate={_startDate}
                            endDate={_endDate}
                            selectsEnd
                            minDate={_startDate}
                        />
                        <GetLoop>{renderLoop}</GetLoop>
                        <ChooseColor form={form} bgColorName='bgColor' textColorName='textColor' />
                        <UploadImage name='image' form={form} label={t(LANGUAGE.IMAGE_OPTION)} />
                    </FormWrap>
                </div>
            </div>
        </div>
    )
}

export default EditForm
