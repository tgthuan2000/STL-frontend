enum LANGUAGE {
    /* COMMON */
    LOGOUT = 'LOGOUT',
    BACK = 'BACK',
    LOGIN = 'LOGIN',
    HOME = 'HOME',
    TRANSACTION = 'TRANSACTION',
    TRANSACTION_DETAIL = 'TRANSACTION_DETAIL',
    TRANSACTION_KIND = 'TRANSACTION_KIND',
    METHOD = 'METHOD',
    METHOD_NAME = 'METHOD_NAME',
    CATEGORY = 'CATEGORY',
    CATEGORY_NAME = 'CATEGORY_NAME',
    DATE = 'DATE',
    START_DATE = 'START_DATE',
    END_DATE = 'END_DATE',
    DAY = 'DAY',
    L_DAYS = 'L_DAYS',
    L_MAXIMUM = 'L_MAXIMUM',
    YEAR = 'YEAR',
    NOTE = 'NOTE',
    SAVE = 'SAVE',
    NEXT = 'NEXT',
    CREATE = 'CREATE',
    CREATE_NEW = 'CREATE_NEW',
    CANCEL = 'CANCEL',
    CREATING = 'CREATING',
    CREATION_TIME = 'CREATION_TIME',
    RECEIVE = 'RECEIVE',
    COST = 'COST',
    TRANSFER = 'TRANSFER',
    SURPLUS = 'SURPLUS',
    MONTH = 'MONTH',
    LIMIT_AMOUNT = 'LIMIT_AMOUNT',
    STATUS = 'STATUS',
    AMOUNT = 'AMOUNT',
    UPDATE = 'UPDATE',
    FILTER = 'FILTER',
    ADVANCE = 'ADVANCE',
    DATE_RANGE = 'DATE_RANGE',
    BY_DAY = 'BY_DAY',
    BY_MONTH = 'BY_MONTH',
    BY_YEAR = 'BY_YEAR',
    THIS_WEEK = 'THIS_WEEK',
    LAST_WEEK = 'LAST_WEEK',
    BUDGET = 'BUDGET',
    EMPTY_DATA = 'EMPTY_DATA',
    REMAINING = 'REMAINING',
    TODAY = 'TODAY',
    OUT_OF_DATE = 'OUT_OF_DATE',
    UNLIMITED_TIME = 'UNLIMITED_TIME',
    FULL_NAME = 'FULL_NAME',
    LOADING = 'LOADING',
    LOADING_IMAGE = 'LOADING_IMAGE',
    UPLOAD_IMAGE = 'UPLOAD_IMAGE',
    SEE_MORE = 'SEE_MORE',
    CREATE_DATE = 'CREATE_DATE',
    NOT_ROLE = 'NOT_ROLE',
    BACK_TO_HOME = 'BACK_TO_HOME',
    EMPTY_NOTIFY = 'EMPTY_NOTIFY',
    CONTENT = 'CONTENT',
    VIEWERS = 'VIEWERS',
    READ = 'READ',
    TITLE = 'TITLE',
    SHORT_DESCRIPTION = 'SHORT_DESCRIPTION',
    NEW_NOTIFY = 'NEW_NOTIFY',
    ERROR = 'ERROR',
    COMING_SOON = 'COMING_SOON',
    SURPLUS_AT_TIME = 'SURPLUS_AT_TIME',
    TABLE = 'TABLE',
    LIST = 'LIST',
    REFRESH = 'REFRESH',
    L_DAYS_AGO = 'L_DAYS_AGO',
    L_HOURS_AGO = 'L_HOURS_AGO',
    L_MINUTES_AGO = 'L_MINUTES_AGO',
    RECENT = 'RECENT',
    EDIT = 'EDIT',
    EDITED = 'EDITED',
    DELETE = 'DELETE',
    DELETED = 'DELETED',
    REPLY = 'REPLY',
    L_REPLIES = 'L_REPLIES',
    CLICK_TO_READ_DETAIL = 'CLICK_TO_READ_DETAIL',
    CLICK_TO_CHOOSE_METHOD = 'CLICK_TO_CHOOSE_METHOD',
    OBJECT = 'OBJECT',
    RECENT_UPDATE = 'RECENT_UPDATE',
    PAID_TIME = 'PAID_TIME',
    TYPE_YOUR_MESSAGE = 'TYPE_YOUR_MESSAGE',
    PASSWORD = 'PASSWORD',
    OTHERS = 'OTHERS',
    HIDDEN = 'HIDDEN',
    SHOW = 'SHOW',
    NAME = 'NAME',
    SAVING = 'SAVING',
    SEARCH = 'SEARCH',
    SEND_NOTIFY = 'SEND_NOTIFY',
    DROP_IMAGE_HERE = 'DROP_IMAGE_HERE',
    SHORT_COST = 'SHORT_COST',
    SHORT_REMAINING = 'SHORT_REMAINING',
    ENABLE = 'ENABLE',
    DISABLED = 'DISABLED',
    DISABLED_2FA = 'DISABLED_2FA',
    SET_UP = 'SET_UP',
    SECURITY = 'SECURITY',
    EMAIL = 'EMAIL',
    COPIED = 'COPIED',
    IMAGE = 'IMAGE',
    NO_IMAGE = 'NO_IMAGE',
    USER = 'USER',
    USERNAME = 'USERNAME',
    SERVICE = 'SERVICE',
    ACTIONS = 'ACTIONS',
    LOADING_PROFILE = 'LOADING_PROFILE',
    LOADING_PROFILE_DONE = 'LOADING_PROFILE_DONE',
    RELOADING_PROFILE = 'RELOADING_PROFILE',
    LOADING_CONFIG = 'LOADING_CONFIG',
    PREVIEW = 'PREVIEW',
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    RESPONDED = 'RESPONDED',
    LAYOUT = 'LAYOUT',
    STATISTIC = 'STATISTIC',

    /* PWA */
    APP_READY_WORK_OFFLINE = 'APP_READY_WORK_OFFLINE',
    RELOAD_TEXT = 'RELOAD_TEXT',
    RELOAD = 'RELOAD',
    CLOSE = 'CLOSE',

    /* VALIDATE MESSAGE */
    REQUIRED_FIELD = 'REQUIRED_FIELD',
    REQUIRED_NUMBER = 'REQUIRED_NUMBER',
    REQUIRED_METHOD_SPENDING = 'REQUIRED_METHOD_SPENDING',
    REQUIRED_TYPE_NUMBER = 'REQUIRED_TYPE_NUMBER',
    REQUIRED_AMOUNT = 'REQUIRED_AMOUNT',
    REQUIRED_RECEIVE = 'REQUIRED_RECEIVE',
    REQUIRED_COST = 'REQUIRED_COST',
    REQUIRED_TRANSFER_AMOUNT = 'REQUIRED_TRANSFER_AMOUNT',
    REQUIRED_KIND = 'REQUIRED_KIND',
    REQUIRED_CATEGORY = 'REQUIRED_CATEGORY',
    REQUIRED_CATEGORY_NAME = 'REQUIRED_CATEGORY_NAME',
    REQUIRED_METHOD = 'REQUIRED_METHOD',
    REQUIRED_METHOD_NAME = 'REQUIRED_METHOD_NAME',
    REQUIRED_DATE = 'REQUIRED_DATE',
    REQUIRED_USER_CREDIT = 'REQUIRED_USER_CREDIT',
    REQUIRED_OLD_PASSWORD = 'REQUIRED_OLD_PASSWORD',
    REQUIRED_NEW_PASSWORD = 'REQUIRED_NEW_PASSWORD',
    REQUIRED_RE_PASSWORD = 'REQUIRED_RE_PASSWORD',
    REQUIRED_FULL_NAME = 'REQUIRED_FULL_NAME',
    REQUIRED_NOTIFY_CONTENT = 'REQUIRED_NOTIFY_CONTENT',
    REQUIRED_NOTIFY_TITLE = 'REQUIRED_NOTIFY_TITLE',
    RECEIVER_MIN_1 = 'RECEIVER_MIN_1',
    AMOUNT_MIN_ZERO = 'AMOUNT_MIN_ZERO',
    RECEIVE_MIN_ZERO = 'RECEIVE_MIN_ZERO',
    TRANSFER_MIN_ZERO = 'TRANSFER_MIN_ZERO',
    SURPLUS_MIN_ZERO = 'SURPLUS_MIN_ZERO',
    COST_MIN_ZERO = 'COST_MIN_ZERO',
    CATEGORY_NAME_MAX_50 = 'CATEGORY_NAME_MAX_50',
    METHOD_NAME_MAX_50 = 'METHOD_NAME_MAX_50',
    NEW_PASSWORD_MIN_1 = 'NEW_PASSWORD_MIN_1',
    PASSWORD_NOT_MATCH = 'PASSWORD_NOT_MATCH',
    REAL_MONEY_MUST_BE_LESS_THAN_AMOUNT = 'REAL_MONEY_MUST_BE_LESS_THAN_AMOUNT',
    INVALID_FORMAT = 'INVALID_FORMAT',
    MIN_LENGTH_4 = 'MIN_LENGTH_4',

    /* EMPTY DATA */
    EMPTY_METHOD = 'EMPTY_METHOD',
    EMPTY_DESCRIPTION = 'EMPTY_DESCRIPTION',

    /* PLACEHOLDER */
    PLACEHOLDER_TEXT = 'PLACEHOLDER_TEXT',
    PLACEHOLDER_CHOOSE_KIND = 'PLACEHOLDER_CHOOSE_KIND',
    PLACEHOLDER_CHOOSE_TIME = 'PLACEHOLDER_CHOOSE_TIME',
    PLACEHOLDER_ENTER_CONTENT = 'PLACEHOLDER_ENTER_CONTENT',
    PLACEHOLDER_SHORT_DESCRIPTION = 'PLACEHOLDER_SHORT_DESCRIPTION',
    PLACEHOLDER_ENTER_USER_INFO = 'PLACEHOLDER_ENTER_USER_INFO',

    /* NOTIFY/TOAST */
    NOTIFY_CREATE_SUCCESS = 'NOTIFY_CREATE_SUCCESS',
    NOTIFY_UPDATE_SUCCESS = 'NOTIFY_UPDATE_SUCCESS',
    NOTIFY_UPDATE_FAILED = 'NOTIFY_UPDATE_FAILED',
    NOTIFY_CREATE_SCHEDULE_SUCCESS = 'NOTIFY_CREATE_SCHEDULE_SUCCESS',
    NOTIFY_CREATE_RECEIVE_SUCCESS = 'NOTIFY_CREATE_RECEIVE_SUCCESS',
    NOTIFY_CREATE_TRANSFER_SUCCESS = 'NOTIFY_CREATE_TRANSFER_SUCCESS',
    NOTIFY_CREATE_COST_SUCCESS = 'NOTIFY_CREATE_COST_SUCCESS',
    NOTIFY_CREATE_METHOD_SUCCESS = 'NOTIFY_CREATE_METHOD_SUCCESS',
    NOTIFY_CREATE_CATEGORY_SUCCESS = 'NOTIFY_CREATE_CATEGORY_SUCCESS',
    NOTIFY_CREATE_CREDIT_SUCCESS = 'NOTIFY_CREATE_CREDIT_SUCCESS',
    NOTIFY_CREATE_LOAN_SUCCESS = 'NOTIFY_CREATE_LOAN_SUCCESS',
    NOTIFY_UPDATE_PASSWORD_SUCCESS = 'NOTIFY_UPDATE_PASSWORD_SUCCESS',
    NOTIFY_CREATE_MEMBER_SUCCESS = 'NOTIFY_CREATE_MEMBER_SUCCESS',
    NOTIFY_CREATE_NOTIFY_SUCCESS = 'NOTIFY_CREATE_NOTIFY_SUCCESS',
    NOTIFY_UPDATE_NOTIFY_SUCCESS = 'NOTIFY_UPDATE_NOTIFY_SUCCESS',
    NOTIFY_NOT_EXIST_ACCOUNT = 'NOTIFY_NOT_EXIST_ACCOUNT',
    NOTIFY_ERROR = 'NOTIFY_ERROR',
    NOTIFY_ACCOUNT_CANT_LOGIN_BY_EMAIL_PASSWORD = 'NOTIFY_ACCOUNT_CANT_LOGIN_BY_EMAIL_PASSWORD',
    NOTIFY_INVALID_PASSWORD = 'NOTIFY_INVALID_PASSWORD',
    NOTIFY_INVALID_OLD_PASSWORD = 'NOTIFY_INVALID_OLD_PASSWORD',
    NOTIFY_INVALID_DATA = 'NOTIFY_INVALID_DATA',
    NOTIFY_NO_CHANGE = 'NOTIFY_NO_CHANGE',
    NOTIFY_REQUIRED_EMAIL = 'NOTIFY_REQUIRED_EMAIL',
    NOTIFY_REQUIRED_ID = 'NOTIFY_REQUIRED_ID',
    NOTIFY_REQUIRED_PASSWORD = 'NOTIFY_REQUIRED_PASSWORD',
    NOTIFY_FORBIDDEN = 'NOTIFY_FORBIDDEN',
    NOTIFY_REQUIRED_REFRESH_TOKEN = 'NOTIFY_REQUIRED_REFRESH_TOKEN',
    NOTIFY_EXPIRED_TOKEN = 'NOTIFY_EXPIRED_TOKEN',
    NOTIFY_REQUIRED_CREDENTIAL = 'NOTIFY_REQUIRED_CREDENTIAL',
    NOTIFY_REQUIRED_DATA = 'NOTIFY_REQUIRED_DATA',
    NOTIFY_REQUIRED_URL = 'NOTIFY_REQUIRED_URL',
    NOTIFY_REQUIRED_SUBSCRIPTION_ID = 'NOTIFY_REQUIRED_SUBSCRIPTION_ID',
    NOTIFY_TWO_FA_CODE_INVALID = 'NOTIFY_TWO_FA_CODE_INVALID',
    NOTIFY_TWO_FA_CODE_SUCCESS = 'NOTIFY_TWO_FA_CODE_SUCCESS',
    NOTIFY_DISABLED_TWO_FA_SUCCESS = 'NOTIFY_DISABLED_TWO_FA_SUCCESS',
    NOTIFY_REFRESH_TOKEN_EXPIRED = 'NOTIFY_REFRESH_TOKEN_EXPIRED',
    NOTIFY_TOKEN_REVOKED = 'NOTIFY_TOKEN_REVOKED',
    NOTIFY_INACTIVE_ACCOUNT = 'NOTIFY_INACTIVE_ACCOUNT',
    NOTIFY_DELETE_SCHEDULE_SUCCESSFULLY = 'NOTIFY_DELETE_SCHEDULE_SUCCESSFULLY',
    NOTIFY_UPDATE_SCHEDULE_SUCCESSFULLY = 'NOTIFY_UPDATE_SCHEDULE_SUCCESSFULLY',
    NOTIFY_EMAIL_EXIST = 'NOTIFY_EMAIL_EXIST',

    /* CONFIRM */
    CONFIRM_NOTIFY = 'CONFIRM_NOTIFY',
    CONFIRM_DELETE_TRANSACTION = 'CONFIRM_DELETE_TRANSACTION',
    CONFIRM_DELETE_MESSAGE = 'CONFIRM_DELETE_MESSAGE',
    CONFIRM_DELETE_SCHEDULE = 'CONFIRM_DELETE_SCHEDULE',
    NEED_SAVE_TO_UPDATED = 'NEED_SAVE_TO_UPDATED',

    /* SPENDING */
    SPENDING = 'SPENDING',
    BUDGET_BY_CATEGORY = 'BUDGET_BY_CATEGORY',
    BUDGET_BY_METHOD = 'BUDGET_BY_METHOD',
    TRANSACTION_RECENT = 'TRANSACTION_RECENT',
    METHOD_SPENDING = 'METHOD_SPENDING',
    FROM_METHOD_SPENDING = 'FROM_METHOD_SPENDING',
    TO_METHOD_SPENDING = 'TO_METHOD_SPENDING',
    MAKE_INCOME = 'MAKE_INCOME',
    MAKE_COST = 'MAKE_COST',
    MAKE_TRANSFER = 'MAKE_TRANSFER',
    MAKE_BUDGET = 'MAKE_BUDGET',
    CREATE_METHOD = 'CREATE_METHOD',
    CREATE_CATEGORY = 'CREATE_CATEGORY',
    FROM_TRANSFER_METHOD = 'FROM_TRANSFER_METHOD',
    TO_TRANSFER_METHOD = 'TO_TRANSFER_METHOD',
    CHOOSE_PREVIOUS_MONTH = 'CHOOSE_PREVIOUS_MONTH',

    /* LOAN */
    LOAN = 'LOAN',
    CREDIT = 'CREDIT',
    MAKE_CREDIT = 'MAKE_CREDIT',
    MAKE_LOAN = 'MAKE_LOAN',
    MAKE_LOAN_CREDIT = 'MAKE_LOAN_CREDIT',
    CREATE_MEMBER = 'CREATE_MEMBER',
    NEAR_DEADLINE = 'NEAR_DEADLINE',
    METHOD_RECEIVE = 'METHOD_RECEIVE',
    USER_CREDIT = 'USER_CREDIT',
    USER_LOAN = 'USER_LOAN',
    ESTIMATE_PAID_DATE = 'ESTIMATE_PAID_DATE',
    ASSET = 'ASSET',
    ADD_ORIGIN_AMOUNT = 'ADD_ORIGIN_AMOUNT',
    TEMP_LOAN = 'TEMP_LOAN',
    IMAGE_OPTION = 'IMAGE_OPTION',
    PRESS_TO_UPLOAD_IMAGE = 'PRESS_TO_UPLOAD_IMAGE',
    ALREADY_PAID = 'ALREADY_PAID',
    PAID_ACTION = 'PAID_ACTION',
    PAID = 'PAID',
    UNPAID = 'UNPAID',
    REAL_AMOUNT = 'REAL_AMOUNT',
    AMOUNT_RECEIVE_METHOD = 'AMOUNT_RECEIVE_METHOD',

    /* TIME */
    SCHEDULE_DETAIL = 'SCHEDULE_DETAIL',
    MAKE_SCHEDULE = 'MAKE_SCHEDULE',
    MAKE_TIMEKEEPING = 'MAKE_TIMEKEEPING',
    FROM_DATE = 'FROM_DATE',
    TO_DATE = 'TO_DATE',
    LOOP = 'LOOP',
    COLOR = 'COLOR',
    TEXT_COLOR = 'TEXT_COLOR',
    BG_COLOR = 'BG_COLOR',

    /* CALENDAR */
    CALENDAR_PREVIOUS = 'CALENDAR_PREVIOUS',
    CALENDAR_NEXT = 'CALENDAR_NEXT',
    CALENDAR_TODAY = 'CALENDAR_TODAY',
    CALENDAR_TOMORROW = 'CALENDAR_TOMORROW',
    CALENDAR_YESTERDAY = 'CALENDAR_YESTERDAY',
    CALENDAR_MONTH = 'CALENDAR_MONTH',
    CALENDAR_WEEK = 'CALENDAR_WEEK',
    CALENDAR_DAY = 'CALENDAR_DAY',
    CALENDAR_AGENDA = 'CALENDAR_AGENDA',
    CALENDAR_DATE = 'CALENDAR_DATE',
    CALENDAR_TIME = 'CALENDAR_TIME',
    CALENDAR_EVENT = 'CALENDAR_EVENT',
    CALENDAR_EVENT_DETAIL = 'CALENDAR_EVENT_DETAIL',
    CALENDAR_NO_EVENTS_IN_RANGE = 'CALENDAR_NO_EVENTS_IN_RANGE',
    CALENDAR_SHOW_MORE = 'CALENDAR_SHOW_MORE',
    CALENDAR_L_EVENTS = 'CALENDAR_L_EVENTS',
    CALENDAR_WORK_WEEK = 'CALENDAR_WORK_WEEK',
    CALENDAR_ALL_DAY = 'CALENDAR_ALL_DAY',
    CALENDAR_SHORT_SUNDAY = 'CALENDAR_SHORT_SUNDAY',
    CALENDAR_SHORT_MONDAY = 'CALENDAR_SHORT_MONDAY',
    CALENDAR_SHORT_TUESDAY = 'CALENDAR_SHORT_TUESDAY',
    CALENDAR_SHORT_WEDNESDAY = 'CALENDAR_SHORT_WEDNESDAY',
    CALENDAR_SHORT_THURSDAY = 'CALENDAR_SHORT_THURSDAY',
    CALENDAR_SHORT_FRIDAY = 'CALENDAR_SHORT_FRIDAY',
    CALENDAR_SHORT_SATURDAY = 'CALENDAR_SHORT_SATURDAY',
    CALENDAR_JANUARY = 'CALENDAR_JANUARY',
    CALENDAR_FEBRUARY = 'CALENDAR_FEBRUARY',
    CALENDAR_MARCH = 'CALENDAR_MARCH',
    CALENDAR_APRIL = 'CALENDAR_APRIL',
    CALENDAR_MAY = 'CALENDAR_MAY',
    CALENDAR_JUNE = 'CALENDAR_JUNE',
    CALENDAR_JULY = 'CALENDAR_JULY',
    CALENDAR_AUGUST = 'CALENDAR_AUGUST',
    CALENDAR_SEPTEMBER = 'CALENDAR_SEPTEMBER',
    CALENDAR_OCTOBER = 'CALENDAR_OCTOBER',
    CALENDAR_NOVEMBER = 'CALENDAR_NOVEMBER',
    CALENDAR_DECEMBER = 'CALENDAR_DECEMBER',

    /* PROFILE */
    JOIN_DATE = 'JOIN_DATE',
    RECEIVE_NOTIFY_BY_MAIL = 'RECEIVE_NOTIFY_BY_MAIL',
    TWO_FACTOR_AUTHENTICATION = 'TWO_FACTOR_AUTHENTICATION',
    MOST_USED = 'MOST_USED',
    MOST_USED_RECEIVE = 'MOST_USED_RECEIVE',
    MOST_USED_COST = 'MOST_USED_COST',
    MOST_RECEIVE = 'MOST_RECEIVE',
    MOST_COST = 'MOST_COST',
    MOST_RECEIVE_TOTAL = 'MOST_RECEIVE_TOTAL',
    MOST_COST_TOTAL = 'MOST_COST_TOTAL',
    MOST_METHOD_AMOUNT = 'MOST_METHOD_AMOUNT',
    MOST_CATEGORY_AMOUNT = 'MOST_CATEGORY_AMOUNT',
    TWO_FACTOR_AUTHENTICATION_ERROR = 'TWO_FACTOR_AUTHENTICATION_ERROR',
    ENTER_CODE_APPLICATION = 'ENTER_CODE_APPLICATION',
    SCAN_QR_CODE = 'SCAN_QR_CODE',
    SCAN_QR_CODE_DESCRIPTION = 'SCAN_QR_CODE_DESCRIPTION',
    SCAN_QR_CODE_DESCRIPTION_2 = 'SCAN_QR_CODE_DESCRIPTION_2',
    SCAN_QR_CODE_DESCRIPTION_3 = 'SCAN_QR_CODE_DESCRIPTION_3',
    TWO_FA_SETUP = 'TWO_FA_SETUP',
    DISABLED_TWO_FA_SETUP = 'DISABLED_TWO_FA_SETUP',
    TWO_FA_DESCRIPTION = 'TWO_FA_DESCRIPTION',

    /* SETTING */
    OLD_PASSWORD_INCORRECT = 'OLD_PASSWORD_INCORRECT',
    OLD_PASSWORD = 'OLD_PASSWORD',
    NEW_PASSWORD = 'NEW_PASSWORD',
    RE_PASSWORD = 'RE_PASSWORD',

    /* NOTIFICATION */
    NOTIFICATION = 'NOTIFICATION',
    LIST_RECEIVE_NOTIFY_MEMBER = 'LIST_RECEIVE_NOTIFY_MEMBER',
    SEND_ALL_MEMBER = 'SEND_ALL_MEMBER',
    SEND_MAIL = 'SEND_MAIL',
    CREATE_NOTIFY = 'CREATE_NOTIFY',
    PROGRESS_CONTENT = 'PROGRESS_CONTENT',
    PROGRESS_TITLE_DESC = 'PROGRESS_TITLE_DESC',
    PROGRESS_CHOOSE_MEMBER = 'PROGRESS_CHOOSE_MEMBER',
    PROGRESS_PREVIEW_AND_SEND = 'PROGRESS_PREVIEW_AND_SEND',
    SEND_TO_ALL_MEMBER = 'SEND_TO_ALL_MEMBER',
    SEND_MAIL_TO_ALL = 'SEND_MAIL_TO_ALL',
    NOTIFY_RECEIVER_LIST = 'NOTIFY_RECEIVER_LIST',
    SEND_NOTIFY_BY_EMAIL = 'SEND_NOTIFY_BY_EMAIL',
    EDIT_NOTIFY = 'EDIT_NOTIFY',

    /* AUTH */
    OR = 'OR',
    LOGIN_WITH_EMAIL_PASSWORD = 'LOGIN_WITH_EMAIL_PASSWORD',
    UNKNOWN_STEP = 'UNKNOWN_STEP',
    ACCOUNT_OPTION_EMAIL = 'ACCOUNT_OPTION_EMAIL',
    ACCOUNT_NOT_HAVE_PASSWORD = 'ACCOUNT_NOT_HAVE_PASSWORD',

    /* ACCOUNT */
    ACCOUNT_ACTIVE = 'ACCOUNT_ACTIVE',
    ACCOUNT_INACTIVE = 'ACCOUNT_INACTIVE',
    CREATE_ACCOUNT = 'CREATE_ACCOUNT',

    /* ROLE CONTROL */
    ROLE = 'ROLE',
    PERMISSION = 'PERMISSION',
    CREATE_PERMISSION_GROUP = 'CREATE_PERMISSION_GROUP',
    CREATE_ROLE = 'CREATE_ROLE',
    PARENT_ROLE = 'PARENT_ROLE',

    /* OTHERS */
    SOME_SIMILAR_NAME = 'SOME_SIMILAR_NAME',
    NOT_SIMILAR_NAME = 'NOT_SIMILAR_NAME',
    INVALID_FORMAT_IMAGE = 'INVALID_FORMAT_IMAGE',
    INVALID_FORMAT_IMAGE_SIZE = 'INVALID_FORMAT_IMAGE_SIZE',
    END_DATE_MUST_BE_GREATER_THAN_START_DATE = 'END_DATE_MUST_BE_GREATER_THAN_START_DATE',
    CHOOSE_FEEDBACK_USER = 'CHOOSE_FEEDBACK_USER',
    L_FEEDBACKS_PREVIOUS = 'L_FEEDBACKS_PREVIOUS',

    /* CREATE NEW */
    EMPTY_BUDGET_CATEGORY = 'EMPTY_BUDGET_CATEGORY',
    EMPTY_BUDGET_METHOD = 'EMPTY_BUDGET_METHOD',

    /* LAYOUT */
    SPENDING_MANAGEMENT = 'SPENDING_MANAGEMENT',
    LOAN_MANAGEMENT = 'LOAN_MANAGEMENT',
    TIME_MANAGEMENT = 'TIME_MANAGEMENT',
    ACCOUNT_MANAGEMENT = 'ACCOUNT_MANAGEMENT',
    NOTIFY_MANAGEMENT = 'NOTIFY_MANAGEMENT',
    SETTING_MANAGEMENT = 'SETTING_MANAGEMENT',
    PROFILE_MANAGEMENT = 'PROFILE_MANAGEMENT',
    DARK_MODE = 'DARK_MODE',
    LIGHT_MODE = 'LIGHT_MODE',
    SET_PASSWORD = 'SET_PASSWORD',
    CHANGE_PASSWORD = 'CHANGE_PASSWORD',
    FEEDBACK = 'FEEDBACK',
    FEEDBACK_MANAGEMENT = 'FEEDBACK_MANAGEMENT',
    ROLE_CONTROL = 'ROLE_CONTROL',
    DEVICE_CONTROL = 'DEVICE_CONTROL',
}

export default LANGUAGE
