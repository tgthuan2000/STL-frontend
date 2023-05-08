import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { ICreateMemberForm } from '~/@types/loan'
import { Button, SubmitWrap } from '~/components'
import { Input, UploadImage } from '~/components/_base'
import { useCache, useCheck, useLoading, useSlideOver } from '~/context'
import { useServiceQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { useProfile } from '~/store/auth'

const defaultValues = {
    userName: '',
    image: null,
}

const CreateMember = () => {
    const { t } = useTranslation()
    const { close } = useSlideOver()
    const { userProfile } = useProfile()
    const { loading, setSubmitLoading } = useLoading()
    const { needCheckWhenLeave } = useCheck()
    const { GET_PAY_DUE_LOAN, GET_RECENT_LOAN, GET_STATISTIC_LOAN } = useServiceQuery()
    const { deleteCache } = useCache()

    const form = useForm<ICreateMemberForm>({
        defaultValues,
    })

    const onsubmit: SubmitHandler<ICreateMemberForm> = async (data) => {
        setSubmitLoading(true)
        let { userName, image } = data
        // delete spaces between and last first
        userName = userName.replace(/\s+/g, ' ').trim()
        // add to database
        let _image
        if (image) {
            _image = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: image._id,
                },
            }
        }
        const document = {
            _type: 'userLoan',
            userName,
            image: _image,
            surplus: 0,
            countUsed: 0,
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
        }

        try {
            await client.transaction().create(document).commit()
            // navigate to dashboard
            form.reset(defaultValues, {
                keepDefaultValues: true,
            })
            toast.success<string>(t(LANGUAGE.NOTIFY_CREATE_MEMBER_SUCCESS))
            deleteCache([GET_PAY_DUE_LOAN, GET_RECENT_LOAN, GET_STATISTIC_LOAN])
            needCheckWhenLeave()
            // setIsOpen(false)
            // navigate(-1)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onsubmit)} className='flex h-full flex-col'>
            <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                <div className='flex flex-1 flex-col justify-between'>
                    <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                        <div className='space-y-6 pt-3 pb-5'>
                            <Input
                                name='userName'
                                form={form}
                                rules={{
                                    required: t(LANGUAGE.REQUIRED_FULL_NAME) as string,
                                }}
                                type='text'
                                label={t(LANGUAGE.FULL_NAME)}
                            />
                            <UploadImage name='image' form={form} label={t(LANGUAGE.IMAGE_OPTION)} />
                        </div>
                    </div>
                </div>
            </div>
            <SubmitWrap>
                <Button color='green' type='submit' disabled={loading.submit}>
                    {t(LANGUAGE.CREATE)}
                </Button>
                <Button color='outline' type='button' onClick={close}>
                    {t(LANGUAGE.CANCEL)}
                </Button>
            </SubmitWrap>
        </form>
    )
}

export default CreateMember
