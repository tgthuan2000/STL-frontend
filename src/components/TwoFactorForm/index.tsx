import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { TwoFactorFormProps, TwoFactorFormRef } from '~/@types/components'
import Input from './Input'

const TwoFactorForm = forwardRef<TwoFactorFormRef, TwoFactorFormProps>(
    ({ onSubmit, number = 6, disabled, password, placeholder }, ref) => {
        const inputsRef = useRef<Array<HTMLInputElement>>([])

        useEffect(() => {
            inputsRef.current[0]?.focus()
        }, [])

        useImperativeHandle(ref, () => ({ clear }), [])

        const clear = () => {
            inputsRef.current.forEach((v) => (v.value = ''))
            inputsRef.current[0]?.focus()
        }

        const handleOnKeyDown = (e: any) => {
            const { key, target } = e
            if (key === 'Backspace') {
                if (target.value.length === 0) {
                    const prev = target.previousElementSibling
                    if (prev !== null) {
                        const t = prev as HTMLInputElement
                        t.focus()
                    }
                }
            }
        }

        const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const {
                target: { value, nextElementSibling },
            } = e
            if (value.length === 1) {
                if (nextElementSibling !== null) {
                    const t = nextElementSibling as HTMLInputElement
                    t.focus()
                } else {
                    const data = inputsRef.current.map((v) => v.value).join('')
                    onSubmit(data)
                }
            }
        }

        return (
            <div className='flex gap-3'>
                {Array.from(Array(number)).map((v, i) => {
                    return (
                        <Input
                            key={i}
                            disabled={disabled}
                            password={password}
                            placeholder={placeholder}
                            inputRef={(el: HTMLInputElement) => {
                                inputsRef.current[i] = el
                            }}
                            onChange={handleOnChange}
                            onKeyDown={handleOnKeyDown}
                        />
                    )
                })}
            </div>
        )
    }
)

export default TwoFactorForm
