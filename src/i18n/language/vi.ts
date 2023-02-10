import LANGUAGE from './key'

const translation: {
    [key in LANGUAGE]: string
} = {
    /* COMMON */
    [LANGUAGE.LOGOUT]: 'Đăng xuất',
    [LANGUAGE.BACK]: 'Quay lại',
    [LANGUAGE.LOGIN]: 'Đăng nhập',
    [LANGUAGE.HOME]: 'Trang chủ',
    [LANGUAGE.TRANSACTION]: 'Giao dịch',
    [LANGUAGE.TRANSACTION_DETAIL]: 'Chi tiết giao dịch',
    [LANGUAGE.TRANSACTION_KIND]: 'Loại giao dịch',
    [LANGUAGE.METHOD]: 'Phương thức',
    [LANGUAGE.METHOD_NAME]: 'Tên phương thức',
    [LANGUAGE.CATEGORY]: 'Thể loại',
    [LANGUAGE.CATEGORY_NAME]: 'Tên thể loại',
    [LANGUAGE.DATE]: 'Ngày',
    [LANGUAGE.DAY]: 'Ngày',
    [LANGUAGE.L_DAYS]: 'ngày',
    [LANGUAGE.L_MAXIMUM]: 'tối đa',
    [LANGUAGE.YEAR]: 'Năm',
    [LANGUAGE.NOTE]: 'Ghi chú',
    [LANGUAGE.SAVE]: 'Lưu',
    [LANGUAGE.NEXT]: 'Tiếp theo',
    [LANGUAGE.CREATE]: 'Tạo',
    [LANGUAGE.CANCEL]: 'Hủy bỏ',
    [LANGUAGE.CREATING]: 'Đang tạo...',
    [LANGUAGE.CREATION_TIME]: 'Thời gian tạo',
    [LANGUAGE.RECEIVE]: 'Thu nhập',
    [LANGUAGE.COST]: 'Chi phí',
    [LANGUAGE.TRANSFER]: 'Chuyển khoản',
    [LANGUAGE.SURPLUS]: 'Số dư',
    [LANGUAGE.MONTH]: 'Tháng',
    [LANGUAGE.LIMIT_AMOUNT]: 'Hạn mức',
    [LANGUAGE.STATUS]: 'Trạng thái',
    [LANGUAGE.AMOUNT]: 'Số tiền',
    [LANGUAGE.UPDATE]: 'Cập nhật',
    [LANGUAGE.FILTER]: 'Bộ lọc',
    [LANGUAGE.ADVANCE]: 'Nâng cao',
    [LANGUAGE.DATE_RANGE]: 'Khoảng ngày',
    [LANGUAGE.BY_DAY]: 'Theo ngày',
    [LANGUAGE.BY_MONTH]: 'Theo tháng',
    [LANGUAGE.BY_YEAR]: 'Theo năm',
    [LANGUAGE.THIS_WEEK]: 'Tuần này',
    [LANGUAGE.LAST_WEEK]: 'Tuần trước',
    [LANGUAGE.BUDGET]: 'Ngân sách',
    [LANGUAGE.EMPTY_DATA]: 'Không có dữ liệu',
    [LANGUAGE.REMAINING]: 'Còn lại',
    [LANGUAGE.TODAY]: 'Hôm nay',
    [LANGUAGE.OUT_OF_DATE]: 'Quá hạn',
    [LANGUAGE.UNLIMITED_TIME]: 'Vô thời hạn',
    [LANGUAGE.FULL_NAME]: 'Họ và tên',
    [LANGUAGE.LOADING]: 'Đang tải...',
    [LANGUAGE.LOADING_IMAGE]: 'Đang tải ảnh...',
    [LANGUAGE.UPLOAD_IMAGE]: 'Tải ảnh lên',
    [LANGUAGE.SEE_MORE]: 'Xem thêm',
    [LANGUAGE.CREATE_DATE]: 'Ngày tạo',
    [LANGUAGE.EMPTY_METHOD]: 'Chưa có phương thức',
    [LANGUAGE.NOT_ROLE]: 'Không có quyền truy cập',
    [LANGUAGE.BACK_TO_HOME]: 'Quay lại trang chủ',
    [LANGUAGE.CONTENT]: 'Nội dung',
    [LANGUAGE.VIEWERS]: 'Lượt xem',
    [LANGUAGE.READ]: 'Đã xem',
    [LANGUAGE.TITLE]: 'Tiêu đề',
    [LANGUAGE.SHORT_DESCRIPTION]: 'Mô tả ngắn',
    [LANGUAGE.NEW_NOTIFY]: 'Thông báo mới',
    [LANGUAGE.ERROR]: 'Đã có lỗi xảy ra!',
    [LANGUAGE.COMING_SOON]: 'Sắp ra mắt',
    [LANGUAGE.SURPLUS_AT_TIME]: 'Số dư tại thời điểm',
    [LANGUAGE.TABLE]: 'Bảng',
    [LANGUAGE.LIST]: 'Danh sách',
    [LANGUAGE.REFRESH]: 'Làm mới',
    [LANGUAGE.L_DAYS_AGO]: 'ngày trước',
    [LANGUAGE.L_HOURS_AGO]: 'giờ trước',
    [LANGUAGE.L_MINUTES_AGO]: 'phút trước',
    [LANGUAGE.RECENT]: 'Vừa xong',
    [LANGUAGE.EDIT]: 'Chỉnh sửa',
    [LANGUAGE.EDITED]: 'Đã chỉnh sửa',
    [LANGUAGE.DELETE]: 'Xóa',
    [LANGUAGE.REPLY]: 'Phản hồi',
    [LANGUAGE.CLICK_TO_READ_DETAIL]: 'Click để xem chi tiết',
    [LANGUAGE.CLICK_TO_CHOOSE_METHOD]: 'Click để chọn phương thức',
    [LANGUAGE.OBJECT]: 'Đối tượng',
    [LANGUAGE.RECENT_UPDATE]: 'Cập nhật gần nhất',
    [LANGUAGE.PAID_TIME]: 'Thời gian thanh toán',
    [LANGUAGE.TYPE_YOUR_MESSAGE]: 'Nhập tin nhắn...',
    [LANGUAGE.PASSWORD]: 'Mật khẩu',

    /* EMPTY DATA */
    [LANGUAGE.EMPTY_NOTIFY]: 'Không có thông báo',
    [LANGUAGE.EMPTY_DESCRIPTION]: 'Không có mô tả',

    /* VALIDATE MESSAGE */
    [LANGUAGE.REQUIRED_FIELD]: 'Yêu cầu nhập!',
    [LANGUAGE.REQUIRED_METHOD_SPENDING]: 'Yêu cầu chọn phương thức thanh toán!',
    [LANGUAGE.REQUIRED_TYPE_NUMBER]: 'Yêu cầu nhập số!',
    [LANGUAGE.REQUIRED_AMOUNT]: 'Yêu cầu nhập số tiền!',
    [LANGUAGE.REQUIRED_RECEIVE]: 'Yêu cầu nhập thu nhập!',
    [LANGUAGE.REQUIRED_COST]: 'Yêu cầu nhập chi phí!',
    [LANGUAGE.REQUIRED_TRANSFER_AMOUNT]: 'Yêu cầu nhập số tiền chuyển khoản!',
    [LANGUAGE.REQUIRED_KIND]: 'Yêu cầu chọn loại!',
    [LANGUAGE.REQUIRED_CATEGORY]: 'Yêu cầu chọn thể loại!',
    [LANGUAGE.REQUIRED_CATEGORY_NAME]: 'Yêu cầu nhập tên thể loại!',
    [LANGUAGE.REQUIRED_METHOD]: 'Yêu cầu chọn phương thức!',
    [LANGUAGE.REQUIRED_METHOD_NAME]: 'Yêu cầu nhập tên phương thức!',
    [LANGUAGE.REQUIRED_USER_GET_LOAN]: 'Yêu cầu chọn đối tượng vay!',
    [LANGUAGE.REQUIRED_DATE]: 'Yêu cầu chọn ngày!',
    [LANGUAGE.REQUIRED_OLD_PASSWORD]: 'Yêu cầu nhập mật khẩu cũ!',
    [LANGUAGE.REQUIRED_NEW_PASSWORD]: 'Yêu cầu nhập mật khẩu mới!',
    [LANGUAGE.REQUIRED_RE_PASSWORD]: 'Yêu cầu nhập lại mật khẩu mới!',
    [LANGUAGE.REQUIRED_FULL_NAME]: 'Yêu cầu nhập họ và tên!',
    [LANGUAGE.AMOUNT_MIN_ZERO]: 'Số tiền phải lớn hơn 0!',
    [LANGUAGE.RECEIVE_MIN_ZERO]: 'Thu nhập phải lớn hơn 0!',
    [LANGUAGE.TRANSFER_MIN_ZERO]: 'Số tiền chuyển khoản phải lớn hơn 0!',
    [LANGUAGE.SURPLUS_MIN_ZERO]: 'Hạn mức phải lớn hơn 0!',
    [LANGUAGE.COST_MIN_ZERO]: 'Chi phí phải lớn hơn 0!',
    [LANGUAGE.CATEGORY_NAME_MAX_50]: 'Tên thể loại không được quá 50 ký tự!',
    [LANGUAGE.METHOD_NAME_MAX_50]: 'Tên phương thức không được quá 50 ký tự!',
    [LANGUAGE.NEW_PASSWORD_MIN_1]: 'Mật khẩu mới phải lớn hơn 1 ký tự!',
    [LANGUAGE.PASSWORD_NOT_MATCH]: 'Mật khẩu không khớp!',
    [LANGUAGE.REAL_MONEY_MUST_BE_LESS_THAN_AMOUNT]: 'Số tiền thực phải nhỏ hơn số tiền giao dịch!',
    [LANGUAGE.INVALID_FORMAT]: 'Định dạng không hợp lệ!',

    /* PLACEHOLDER */
    [LANGUAGE.PLACEHOLDER_CHOOSE_KIND]: '--- Chọn loại ---',
    [LANGUAGE.PLACEHOLDER_CHOOSE_TIME]: 'Chọn thời gian',

    /* NOTIFY/TOAST */
    [LANGUAGE.NOTIFY_UPDATE_SUCCESS]: 'Cập nhật thành công!',
    [LANGUAGE.NOTIFY_UPDATE_FAILED]: 'Cập nhật thất bại!',
    [LANGUAGE.NOTIFY_CREATE_RECEIVE_SUCCESS]: 'Thêm thu nhập thành công!',
    [LANGUAGE.NOTIFY_CREATE_TRANSFER_SUCCESS]: 'Chuyển khoản thành công!',
    [LANGUAGE.NOTIFY_CREATE_COST_SUCCESS]: 'Thêm chi phí thành công!',
    [LANGUAGE.NOTIFY_CREATE_METHOD_SUCCESS]: 'Thêm phương thức thành công!',
    [LANGUAGE.NOTIFY_CREATE_CATEGORY_SUCCESS]: 'Thêm thể loại thành công!',
    [LANGUAGE.NOTIFY_CREATE_GET_LOAN_SUCCESS]: 'Thêm khoản vay thành công!',
    [LANGUAGE.NOTIFY_UPDATE_PASSWORD_SUCCESS]: 'Đổi mật khẩu thành công!',
    [LANGUAGE.NOTIFY_CREATE_MEMBER_SUCCESS]: 'Thêm thành viên thành công!',
    [LANGUAGE.NOTIFY_NOT_EXIST_ACCOUNT]: 'Tài khoản không tồn tại!',
    [LANGUAGE.NOTIFY_ERROR]: 'Đã có lỗi xảy ra!',

    /* CONFIRM */
    [LANGUAGE.CONFIRM_NOTIFY]: 'Bạn có chắc chắn muốn gửi thông báo này?',
    [LANGUAGE.CONFIRM_DELETE_TRANSACTION]: 'Bạn có chắc muốn xóa giao dịch này ?',
    [LANGUAGE.CONFIRM_DELETE_MESSAGE]: 'Bạn có chắc muốn xóa tin nhắn này ?',

    /* SPENDING */
    [LANGUAGE.SPENDING]: 'Quản lý chi tiêu',
    [LANGUAGE.BUDGET_BY_CATEGORY]: 'Ngân sách theo loại',
    [LANGUAGE.BUDGET_BY_METHOD]: 'Ngân sách theo phương thức',
    [LANGUAGE.TRANSACTION_RECENT]: 'Giao dịch gần đây',
    [LANGUAGE.METHOD_SPENDING]: 'Phương thức thanh toán',
    [LANGUAGE.FROM_METHOD_SPENDING]: 'Từ phương thức thanh toán',
    [LANGUAGE.TO_METHOD_SPENDING]: 'Đến phương thức thanh toán',
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
    [LANGUAGE.LOAN]: 'Vay',
    [LANGUAGE.MAKE_LOAN]: 'Vay',
    [LANGUAGE.MAKE_GET_LOAN]: 'Cho vay',
    [LANGUAGE.MAKE_LOAN_GET_LOAN]: 'Vay/Cho vay',
    [LANGUAGE.CREATE_MEMBER]: 'Tạo mới thành viên',
    [LANGUAGE.NEAR_DEADLINE]: 'Gần hạn',
    [LANGUAGE.METHOD_RECEIVE]: 'Phương thức nhận',
    [LANGUAGE.USER_GET_LOAN]: 'Đối tượng vay',
    [LANGUAGE.ESTIMATE_PAID_DATE]: 'Hạn trả',
    [LANGUAGE.ASSET]: 'Tài sản',
    [LANGUAGE.ADD_ORIGIN_AMOUNT]: 'Cộng gốc',
    [LANGUAGE.TEMP_LOAN]: 'Tạm ứng',
    [LANGUAGE.IMAGE_OPTION]: 'Hình ảnh (tùy chọn)',
    [LANGUAGE.PRESS_TO_UPLOAD_IMAGE]: 'Nhấn để tải hình ảnh',
    [LANGUAGE.ALREADY_PAID]: 'Giao dịch đã thực hiện hoàn tất, không được chỉnh sửa thêm!',
    [LANGUAGE.PAID_ACTION]: 'Trả',
    [LANGUAGE.PAID]: 'Đã trả',
    [LANGUAGE.UNPAID]: 'Chưa trả',
    [LANGUAGE.REAL_AMOUNT]: 'Số tiền thực trả',
    [LANGUAGE.AMOUNT_RECEIVE_METHOD]: 'Phương thức nhận tiền',

    /* PROFILE */
    [LANGUAGE.JOIN_DATE]: 'Ngày tham gia',
    [LANGUAGE.ALLOW_RECEIVE_NOTIFY_BY_MAIL]: 'Cho phép nhận thông báo qua mail',
    [LANGUAGE.MOST_USED]: 'Sử dụng nhiều nhất',
    [LANGUAGE.MOST_USED_RECEIVE]: 'Thu nhập nhiều nhất',
    [LANGUAGE.MOST_USED_COST]: 'Chi phí nhiều nhất',
    [LANGUAGE.MOST_RECEIVE]: 'Thu nhập nhiều nhất',
    [LANGUAGE.MOST_COST]: 'Chi phí nhiều nhất',
    [LANGUAGE.MOST_RECEIVE_TOTAL]: 'Tổng thu nhập nhiều nhất',
    [LANGUAGE.MOST_COST_TOTAL]: 'Tổng chi phí nhiều nhất',
    [LANGUAGE.MOST_METHOD_AMOUNT]: 'Số tiền nhiều nhất theo phương thức',
    [LANGUAGE.MOST_CATEGORY_AMOUNT]: 'Số tiền nhiều nhất thể loại',

    /* AUTH */
    [LANGUAGE.OR]: 'Hoặc',
    [LANGUAGE.LOGIN_WITH_EMAIL_PASSWORD]: 'Đăng nhập bằng email và mật khẩu',
    [LANGUAGE.UNKNOWN_STEP]: 'Lỗi truy cập',
    [LANGUAGE.ACCOUNT_OPTION_EMAIL]: 'Tài khoản (email)',
    [LANGUAGE.ACCOUNT_NOT_HAVE_PASSWORD]: 'Tài khoản này chưa có mật khẩu',

    /* OTHERS */
    [LANGUAGE.SOME_CATEGORY_SIMILAR_NAME]: 'Một số thể loại gần giống tên',
    [LANGUAGE.NOT_CATEGORY_SIMILAR_NAME]: 'Không có thể loại gần giống tên',
    [LANGUAGE.SOME_METHOD_SIMILAR_NAME]: 'Một số phương thức gần giống tên',
    [LANGUAGE.NOT_METHOD_SIMILAR_NAME]: 'Không có phương thức gần giống tên',
    [LANGUAGE.INVALID_FORMAT_IMAGE]: 'Sai định dạng hình ảnh cho phép',
    [LANGUAGE.INVALID_FORMAT_IMAGE_SIZE]: 'Kích thước hình ảnh quá lớn',

    /* SETTING */
    [LANGUAGE.OLD_PASSWORD_INCORRECT]: 'Mật khẩu cũ không đúng',
    [LANGUAGE.OLD_PASSWORD]: 'Mật khẩu cũ',
    [LANGUAGE.NEW_PASSWORD]: 'Mật khẩu mới',
    [LANGUAGE.RE_PASSWORD]: 'Xác nhận mật khẩu',

    /* NOTIFICATION */
    [LANGUAGE.LIST_RECEIVE_NOTIFY_MEMBER]: 'Danh sách thành viên nhận thông báo',
    [LANGUAGE.SEND_ALL_MEMBER]: 'Gửi tất cả thành viên',
    [LANGUAGE.SEND_MAIL]: 'Gửi mail',
    [LANGUAGE.CREATE_NOTIFY]: 'Tạo thông báo',

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