import * as yup from 'yup'

export const changePasswordSchema = yup.object().shape({
    'old-password': yup
        .string()
        .nullable()
        .when('__isHasPassword', {
            is: true,
            then: yup.string().required('Mật khẩu cũ không được để trống!'),
        }),
    'new-password': yup
        .string()
        .required('Mật khẩu mới không được để trống!')
        .min(1, 'Mật khẩu mới phải có ít nhất 1 ký tự!'),
    're-password': yup
        .string()
        .required('Nhập lại mật khẩu không được để trống!')
        .oneOf([yup.ref('new-password')], 'Mật khẩu không khớp!'),
})
