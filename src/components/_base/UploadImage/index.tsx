import clsx from 'clsx'
import { ChangeEvent, forwardRef, useCallback, useEffect, useId, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { UploadImageProps } from '~/@types/components'
import ErrorMessage from '~/components/ErrorMessage'
import Label from '~/components/Label'
import { acceptImageType } from '~/constant/component'
import LANGUAGE from '~/i18n/language/key'
import { urlFor } from '~/sanityConfig'
import Core from './Core'

const UploadImage = forwardRef<HTMLInputElement, UploadImageProps>(
    ({ className, label, name, form, rules, disabled, ...props }, ref) => {
        const { t } = useTranslation()
        const id = useId()
        const [loading, setLoading] = useState(false)

        const [image, setImage] = useState<string | null | undefined>(() => {
            const image = form.getValues(name)
            if (!image) return null
            return urlFor(image)
        })

        useEffect(() => {
            if (!form.getValues(name) && image) {
                setImage(null)
            }
        }, [JSON.stringify(form.getValues(name))])

        const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0]
            if (file) {
                try {
                    setLoading(true)
                    if (!acceptImageType.includes(file.type)) {
                        form.setError(name, { message: `${t(LANGUAGE.INVALID_FORMAT_IMAGE)} (JPG, JPEG, PNG)` })
                        return
                    } else {
                        form.clearErrors(name)
                    }

                    if (file.size > 20 * 1024 ** 2) {
                        form.setError(name, { message: `${t(LANGUAGE.INVALID_FORMAT_IMAGE_SIZE)} (20MB)` })
                        return
                    } else {
                        form.clearErrors(name)
                    }

                    setImage(URL.createObjectURL(file))
                    form.setValue(name, file)
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoading(false)
                }
            }
        }

        return (
            <Controller
                name={name}
                control={form.control}
                rules={rules}
                render={({ fieldState: { error } }) => (
                    <div className={clsx(className)}>
                        <Label id={id} label={label} />
                        <div className='mt-1'>
                            <Core image={image} clearImage={() => setImage(null)} id={id} loading={loading} />
                        </div>
                        <ErrorMessage error={error} />
                        <input
                            id={id}
                            type='file'
                            accept='image/png, image/jpeg'
                            disabled={disabled || loading}
                            hidden
                            onChange={handleUploadFile}
                            {...props}
                        />
                    </div>
                )}
            />
        )
    }
)

export default UploadImage
