import i18n from '~/i18n'
import LANGUAGE from '~/i18n/language/key'
import { DATE_FORMAT } from '.'

export const TEMPLATE = {
    EMPTY_DATE: 'Vô thời hạn',
    EMPTY_METHOD_SPENDING_SHORT: 'Chưa có PTTT',
    EMPTY_METHOD_SPENDING: 'Chưa có phương thức thanh toán',
    EMPTY_DATA: 'Không có dữ liệu',
    LOADING: 'Đang tải dữ liệu',
    ERROR: 'Đã có lỗi xảy ra!',
    ALREADY_PAID: 'Giao dịch đã thực hiện hoàn tất, không được chỉnh sửa thêm!',
    EMPTY_NOTIFY: 'Hiện tại chưa có thông báo',
    EMPTY_DESCRIPTION: 'Không có mô tả',
    NEW_NOTIFY: 'Bạn nhận được 1 thông báo mới',
    COMING_SOON: 'Chức năng đang được phát triển!',
    NOT_ROLE: 'Bạn không thể truy cập trang này do tài khoản không có quyền!',
}

export enum E_FILTER_DATE {
    ALL = 0,
    DATE_RANGE = 1,
    DATE = 2,
    MONTH = 4,
    YEAR = 5,
}
export interface IFILTER_DATE {
    id: E_FILTER_DATE
    name: string
    labelName: string
    dateName: string | undefined | null
    formatDate: keyof typeof DATE_FORMAT
}

const { t } = i18n
export const TABS_FILTER_DATE: IFILTER_DATE[] = [
    {
        id: E_FILTER_DATE.DATE_RANGE,
        name: 'dateRange',
        labelName: t(LANGUAGE.ADVANCE),
        dateName: t(LANGUAGE.DATE_RANGE),
        formatDate: 'DATE',
    },
    {
        id: E_FILTER_DATE.DATE,
        name: 'date',
        labelName: t(LANGUAGE.BY_DAY),
        dateName: t(LANGUAGE.DAY),
        formatDate: 'DATE',
    },
    {
        id: E_FILTER_DATE.MONTH,
        name: 'month',
        labelName: t(LANGUAGE.BY_MONTH),
        dateName: t(LANGUAGE.MONTH),
        formatDate: 'MONTH',
    },
    {
        id: E_FILTER_DATE.YEAR,
        name: 'year',
        labelName: t(LANGUAGE.BY_YEAR),
        dateName: t(LANGUAGE.YEAR),
        formatDate: 'YEAR',
    },
]
