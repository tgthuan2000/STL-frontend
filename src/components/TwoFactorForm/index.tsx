import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { TwoFactorFormProps, TwoFactorFormRef } from '~/@types/components'
import Input from './Input'

const TwoFactorForm = forwardRef<TwoFactorFormRef, TwoFactorFormProps>(
    ({ onSubmit, number = 6, disabled, password, placeholder }, ref) => {
        const inputsRef = useRef<Array<HTMLInputElement>>([])

        useEffect(() => {
            inputsRef.current[0]?.focus()
            inputsRef.current[0]?.select()
        }, [])

        useImperativeHandle(ref, () => ({ clear }), [])

        const clear = () => {
            inputsRef.current.forEach((v) => (v.value = ''))
            inputsRef.current[0]?.focus()
            inputsRef.current[0]?.select()
        }

        const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
            const { clipboardData } = e
            const data = clipboardData?.getData('text')
            if (data !== undefined) {
                const arr = data.split('')
                if (arr.length === number) {
                    arr.forEach((v, i) => {
                        inputsRef.current[i].value = v
                    })
                    const last = inputsRef.current[number - 1]
                    last.focus()
                    last.select()
                }
            }
        }

        const handleOnKeyDown = (e: any) => {
            const { key, target } = e
            if (key === 'Backspace') {
                if (target.value.length === 0) {
                    const prev = target.previousElementSibling
                    if (prev !== null) {
                        const t = prev as HTMLInputElement
                        t.focus()
                        t.select()
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
                    t.select()
                } else {
                    const data = inputsRef.current.map((v) => v.value).join('')
                    onSubmit(data)
                }
            } else if (value.length > 1) {
                e.target.value = value.slice(0, 1)
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
                            onPaste={handleOnPaste}
                        />
                    )
                })}
            </div>
        )
    }
)

export default TwoFactorForm
