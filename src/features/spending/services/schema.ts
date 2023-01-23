import * as yup from 'yup'

export const budgetSchema = yup.object().shape({
    date: yup.date().typeError('Yêu cầu chọn ngày!').required('Yêu cầu chọn ngày!'),
    MethodSpending: yup.array().of(
        yup.object().shape({
            _id: yup.string().nullable(),
            amount: yup
                .number()
                .nullable()
                .required('Bất buộc nhập!')
                .typeError('Hãy nhập số')
                .moreThan(0, 'Hạn mức cần lớn hơn 0'),
            methodSpending: yup
                .object()
                .shape({
                    _id: yup.string().required(),
                    name: yup.string().required(),
                })
                .nullable()
                .required('Yêu cầu chọn phương thức!'),
        })
    ),
    CategorySpending: yup.array().of(
        yup.object().shape({
            _id: yup.string().nullable(),
            amount: yup
                .number()
                .nullable()
                .required('Bất buộc nhập!')
                .typeError('Hãy nhập số')
                .moreThan(0, 'Hạn mức cần lớn hơn 0'),
            categorySpending: yup
                .object()
                .shape({
                    _id: yup.string().required(),
                    name: yup.string().required(),
                })
                .nullable()
                .required('Yêu cầu chọn thể loại!'),
        })
    ),
})
