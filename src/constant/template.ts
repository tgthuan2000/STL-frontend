import { DATE_FORMAT } from '.'

export const TEMPLATE = {
    EMPTY_DATE: 'Vô thời hạn',
    EMPTY_METHOD_SPENDING_SHORT: 'Chưa có PTTT',
    EMPTY_METHOD_SPENDING: 'Chưa có phương thức thanh toán',
    EMPTY_DATA: 'Không có dữ liệu',
    LOADING: 'Đang tải dữ liệu',
    ERROR: 'Đã có lỗi xảy ra!',
    ALREADY_PAID: 'Giao dịch đã thực hiện hoàn tất, không được chỉnh sửa thêm!',
    COMING_SOON: 'Chức năng đang được phát triển!',
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
    dateName: string | undefined
    formatDate: keyof typeof DATE_FORMAT
}

export const TABS_FILTER_DATE: IFILTER_DATE[] = [
    {
        id: E_FILTER_DATE.DATE_RANGE,
        name: 'dateRange',
        labelName: 'Nâng cao',
        dateName: 'Khoảng ngày',
        formatDate: 'DATE',
    },
    { id: E_FILTER_DATE.DATE, name: 'date', labelName: 'Theo ngày', dateName: 'Ngày', formatDate: 'DATE' },
    { id: E_FILTER_DATE.MONTH, name: 'month', labelName: 'Theo tháng', dateName: 'Tháng', formatDate: 'MONTH' },
    { id: E_FILTER_DATE.YEAR, name: 'year', labelName: 'Theo năm', dateName: 'Năm', formatDate: 'YEAR' },
]
