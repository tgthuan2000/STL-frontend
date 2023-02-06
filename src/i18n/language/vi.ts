import LANGUAGE from './key'

const translation: {
    [key in LANGUAGE]: string
} = {
    /* COMMON */
    [LANGUAGE.LOGOUT]: 'Đăng xuất',
    [LANGUAGE.LOGIN]: 'Đăng nhập',
    [LANGUAGE.HOME]: 'Trang chủ',
    [LANGUAGE.TRANSACTION]: 'Giao dịch',
    [LANGUAGE.METHOD]: 'Phương thức',
    [LANGUAGE.CATEGORY]: 'Thể loại',
    [LANGUAGE.CATEGORY_NAME]: 'Tên thể loại',
    [LANGUAGE.DATE]: 'Ngày',
    [LANGUAGE.NOTE]: 'Ghi chú',
    [LANGUAGE.SAVE]: 'Lưu',
    [LANGUAGE.CREATE]: 'Tạo',
    [LANGUAGE.CANCEL]: 'Hủy bỏ',
    [LANGUAGE.CREATING]: 'Đang tạo...',
    [LANGUAGE.RECEIVE]: 'Thu nhập',
    [LANGUAGE.COST]: 'Chi phí',
    [LANGUAGE.TRANSFER]: 'Chuyển khoản',
    [LANGUAGE.SURPLUS]: 'Số dư',
    [LANGUAGE.MONTH]: 'Tháng',
    [LANGUAGE.LIMIT_AMOUNT]: 'Hạn mức',
    [LANGUAGE.STATUS]: 'Trạng thái',
    [LANGUAGE.AMOUNT]: 'Số tiền',

    /* VALIDATE MESSAGE */
    [LANGUAGE.REQUIRED_FIELD]: 'Yêu cầu nhập!',
    [LANGUAGE.REQUIRED_TYPE_NUMBER]: 'Yêu cầu nhập số!',
    [LANGUAGE.REQUIRED_AMOUNT]: 'Yêu cầu nhập số tiền!',
    [LANGUAGE.REQUIRED_RECEIVE]: 'Yêu cầu nhập thu nhập!',
    [LANGUAGE.REQUIRED_COST]: 'Yêu cầu nhập chi phí!',
    [LANGUAGE.REQUIRED_TRANSFER_AMOUNT]: 'Yêu cầu nhập số tiền chuyển khoản!',
    [LANGUAGE.REQUIRED_KIND]: 'Yêu cầu chọn loại!',
    [LANGUAGE.REQUIRED_CATEGORY]: 'Yêu cầu chọn thể loại!',
    [LANGUAGE.REQUIRED_CATEGORY_NAME]: 'Yêu cầu nhập tên thể loại!',
    [LANGUAGE.REQUIRED_METHOD]: 'Yêu cầu chọn phương thức!',
    [LANGUAGE.REQUIRED_USER_GET_LOAN]: 'Yêu cầu chọn đối tượng vay!',
    [LANGUAGE.REQUIRED_DATE]: 'Yêu cầu chọn ngày!',
    [LANGUAGE.AMOUNT_MIN_ZERO]: 'Số tiền phải lớn hơn 0!',
    [LANGUAGE.RECEIVE_MIN_ZERO]: 'Thu nhập phải lớn hơn 0!',
    [LANGUAGE.TRANSFER_MIN_ZERO]: 'Số tiền chuyển khoản phải lớn hơn 0!',
    [LANGUAGE.SURPLUS_MIN_ZERO]: 'Hạn mức phải lớn hơn 0!',
    [LANGUAGE.COST_MIN_ZERO]: 'Chi phí phải lớn hơn 0!',
    [LANGUAGE.CATEGORY_NAME_MAX_50]: 'Tên thể loại không được quá 50 ký tự!',

    /* PLACEHOLDER */
    [LANGUAGE.PLACEHOLDER_CHOOSE_KIND]: '--- Chọn loại ---',

    /* NOTIFY/TOAST */
    [LANGUAGE.NOTIFY_CREATE_RECEIVE_SUCCESS]: 'Thêm thu nhập thành công!',
    [LANGUAGE.NOTIFY_CREATE_TRANSFER_SUCCESS]: 'Chuyển khoản thành công!',
    [LANGUAGE.NOTIFY_CREATE_COST_SUCCESS]: 'Thêm chi phí thành công!',
    [LANGUAGE.NOTIFY_CREATE_CATEGORY_SUCCESS]: 'Thêm thể loại thành công!',
    [LANGUAGE.NOTIFY_CREATE_GET_LOAN_SUCCESS]: 'Thêm khoản vay thành công!',

    /* SPENDING */
    [LANGUAGE.SPENDING]: 'Quản lý chi tiêu',
    [LANGUAGE.BUDGET_BY_CATEGORY]: 'Ngân sách theo loại',
    [LANGUAGE.BUDGET_BY_METHOD]: 'Ngân sách theo phương thức',
    [LANGUAGE.TRANSACTION_RECENT]: 'Giao dịch gần đây',
    [LANGUAGE.METHOD_SPENDING]: 'Phương thức thanh toán',
    [LANGUAGE.MAKE_INCOME]: 'Thêm thu nhập',
    [LANGUAGE.MAKE_COST]: 'Thêm chi phí',
    [LANGUAGE.MAKE_TRANSFER]: 'Chuyển khoản',
    [LANGUAGE.MAKE_BUDGET]: 'Ngân sách',
    [LANGUAGE.CREATE_METHOD]: 'Tạo mới phương thức',
    [LANGUAGE.CREATE_CATEGORY]: 'Tạo mới thể loại',
    [LANGUAGE.FROM_TRANSFER_METHOD]: 'Từ phương thức thanh toán',
    [LANGUAGE.TO_TRANSFER_METHOD]: 'Đến phương thức thanh toán',
    [LANGUAGE.CHOOSE_PREVIOUS_MONTH]: 'Chọn theo tháng trước',

    /* LOAN */
    [LANGUAGE.MAKE_LOAN]: 'Vay',
    [LANGUAGE.MAKE_GET_LOAN]: 'Cho vay',
    [LANGUAGE.MAKE_LOAN_GET_LOAN]: 'Vay/Cho vay',
    [LANGUAGE.CREATE_MEMBER]: 'Tạo mới thành viên',
    [LANGUAGE.NEAR_DEADLINE]: 'Gần hạn',
    [LANGUAGE.METHOD_RECEIVE]: 'Phương thức nhận',
    [LANGUAGE.USER_GET_LOAN]: 'Đối tượng vay',
    [LANGUAGE.ESTIMATE_PAID_DATE]: 'Ngày dự kiến trả',
    [LANGUAGE.ASSET]: 'Tài sản',

    /* OTHERS */
    [LANGUAGE.SOME_CATEGORY_SIMILAR_NAME]: 'Một số thể loại gần giống tên',
    [LANGUAGE.NOT_CATEGORY_SIMILAR_NAME]: 'Không có thể loại gần giống tên',

    /* LAYOUT */
    [LANGUAGE.SPENDING_MANAGEMENT]: 'Quản lý chi tiêu',
    [LANGUAGE.LOAN_MANAGEMENT]: 'Quản lý vay/cho vay',
    [LANGUAGE.TIME_KEEPING_MANAGEMENT]: 'Quản lý chấm công',
    [LANGUAGE.ACCOUNT_MANAGEMENT]: 'Quản lý tài khoản',
    [LANGUAGE.NOTIFY_MANAGEMENT]: 'Thông báo',
    [LANGUAGE.SETTING_MANAGEMENT]: 'Cài đặt',
    [LANGUAGE.PROFILE_MANAGEMENT]: 'Thông tin cá nhân',
    [LANGUAGE.DARK_MODE]: 'Chế độ tối',
    [LANGUAGE.LIGHT_MODE]: 'Chế độ sáng',
    [LANGUAGE.SET_PASSWORD]: 'Đặt mật khẩu',
    [LANGUAGE.CHANGE_PASSWORD]: 'Đổi mật khẩu',
    [LANGUAGE.FEEDBACK]: 'Gửi phản hồi',
}

export default { translation }
