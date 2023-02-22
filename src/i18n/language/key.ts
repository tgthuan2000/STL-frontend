enum LANGUAGE {
    /* COMMON */
    LOGOUT = 'logout',
    BACK = 'back',
    LOGIN = 'login',
    HOME = 'home',
    TRANSACTION = 'transaction',
    TRANSACTION_DETAIL = 'transaction-detail',
    TRANSACTION_KIND = 'transaction-kind',
    METHOD = 'method',
    METHOD_NAME = 'method-name',
    CATEGORY = 'category',
    CATEGORY_NAME = 'category-name',
    DATE = 'date',
    DAY = 'day',
    L_DAYS = 'l-days',
    L_MAXIMUM = 'l-maximum',
    YEAR = 'year',
    NOTE = 'note',
    SAVE = 'save',
    NEXT = 'next',
    CREATE = 'create',
    CANCEL = 'cancel',
    CREATING = 'creating',
    CREATION_TIME = 'creation-time',
    RECEIVE = 'receive',
    COST = 'cost',
    TRANSFER = 'transfer',
    SURPLUS = 'surplus',
    MONTH = 'month',
    LIMIT_AMOUNT = 'limit-amount',
    STATUS = 'status',
    AMOUNT = 'amount',
    UPDATE = 'update',
    FILTER = 'filter',
    ADVANCE = 'advance',
    DATE_RANGE = 'date-range',
    BY_DAY = 'by-day',
    BY_MONTH = 'by-month',
    BY_YEAR = 'by-year',
    THIS_WEEK = 'this-week',
    LAST_WEEK = 'last-week',
    BUDGET = 'budget',
    EMPTY_DATA = 'empty-data',
    REMAINING = 'remaining',
    TODAY = 'today',
    OUT_OF_DATE = 'out-of-date',
    UNLIMITED_TIME = 'unlimited-time',
    FULL_NAME = 'full-name',
    LOADING = 'loading',
    LOADING_IMAGE = 'loading-image',
    UPLOAD_IMAGE = 'upload-image',
    SEE_MORE = 'see-more',
    CREATE_DATE = 'create-date',
    NOT_ROLE = 'not-role',
    BACK_TO_HOME = 'back-to-home',
    EMPTY_NOTIFY = 'empty-notify',
    CONTENT = 'content',
    VIEWERS = 'viewers',
    READ = 'read',
    TITLE = 'title',
    SHORT_DESCRIPTION = 'short-description',
    NEW_NOTIFY = 'new-notify',
    ERROR = 'error',
    COMING_SOON = 'coming-soon',
    SURPLUS_AT_TIME = 'surplus-at-time',
    TABLE = 'table',
    LIST = 'list',
    REFRESH = 'refresh',
    L_DAYS_AGO = 'days-ago',
    L_HOURS_AGO = 'hours-ago',
    L_MINUTES_AGO = 'minutes-ago',
    RECENT = 'recent',
    EDIT = 'edit',
    EDITED = 'edited',
    DELETE = 'delete',
    REPLY = 'reply',
    L_REPLIES = 'l-replies',
    CLICK_TO_READ_DETAIL = 'click-to-read-detail',
    CLICK_TO_CHOOSE_METHOD = 'click-to-choose-method',
    OBJECT = 'object',
    RECENT_UPDATE = 'recent-update',
    PAID_TIME = 'paid-time',
    TYPE_YOUR_MESSAGE = 'type-your-message',
    PASSWORD = 'password',
    OTHERS = 'others',
    HIDDEN = 'hidden',
    SHOW = 'show',
    NAME = 'name',
    SAVING = 'saving',
    SEARCH = 'search',
    SEND_NOTIFY = 'send-notify',
    DROP_IMAGE_HERE = 'drop-image-here',
    SHORT_COST = 'short-cost',
    SHORT_REMAINING = 'short-remaining',

    /* PWA */
    APP_READY_WORK_OFFLINE = 'app-ready-work-offline',
    RELOAD_TEXT = 'reload-text',
    RELOAD = 'reload',
    CLOSE = 'close',

    /* VALIDATE MESSAGE */
    REQUIRED_FIELD = 'required-field',
    REQUIRED_NUMBER = 'required-number',
    REQUIRED_METHOD_SPENDING = 'required-method-spending',
    REQUIRED_TYPE_NUMBER = 'required-type-number',
    REQUIRED_AMOUNT = 'required-amount',
    REQUIRED_RECEIVE = 'required-receive',
    REQUIRED_COST = 'required-cost',
    REQUIRED_TRANSFER_AMOUNT = 'required-transfer-amount',
    REQUIRED_KIND = 'required-kind',
    REQUIRED_CATEGORY = 'required-category',
    REQUIRED_CATEGORY_NAME = 'required-category-name',
    REQUIRED_METHOD = 'required-method',
    REQUIRED_METHOD_NAME = 'required-method-name',
    REQUIRED_DATE = 'required-date',
    REQUIRED_USER_GET_LOAN = 'required-user-get-loan',
    REQUIRED_OLD_PASSWORD = 'required-old-password',
    REQUIRED_NEW_PASSWORD = 'required-new-password',
    REQUIRED_RE_PASSWORD = 'required-re-password',
    REQUIRED_FULL_NAME = 'required-full-name',
    REQUIRED_NOTIFY_CONTENT = 'required-notify-content',
    REQUIRED_NOTIFY_TITLE = 'required-notify-title',
    RECEIVER_MIN_1 = 'receiver-min-1',
    AMOUNT_MIN_ZERO = 'amount-min-zero',
    RECEIVE_MIN_ZERO = 'receive-min-zero',
    TRANSFER_MIN_ZERO = 'transfer-min-zero',
    SURPLUS_MIN_ZERO = 'surplus-min-zero',
    COST_MIN_ZERO = 'cost-min-zero',
    CATEGORY_NAME_MAX_50 = 'category-name-max-50',
    METHOD_NAME_MAX_50 = 'method-name-max-50',
    NEW_PASSWORD_MIN_1 = 'new-password-min-1',
    PASSWORD_NOT_MATCH = 'password-not-match',
    REAL_MONEY_MUST_BE_LESS_THAN_AMOUNT = 'real-money-must-be-less-than-amount',
    INVALID_FORMAT = 'invalid-format',

    /* EMPTY DATA */
    EMPTY_METHOD = 'empty-method',
    EMPTY_DESCRIPTION = 'empty-description',

    /* PLACEHOLDER */
    PLACEHOLDER_CHOOSE_KIND = 'placeholder-choose-kind',
    PLACEHOLDER_CHOOSE_TIME = 'placeholder-choose-time',
    PLACEHOLDER_ENTER_CONTENT = 'placeholder-enter-content',
    PLACEHOLDER_SHORT_DESCRIPTION = 'placeholder-short-description',

    /* NOTIFY/TOAST */
    NOTIFY_UPDATE_SUCCESS = 'notify-update-success',
    NOTIFY_UPDATE_FAILED = 'notify-update-failed',
    NOTIFY_CREATE_RECEIVE_SUCCESS = 'notify-create-receive-success',
    NOTIFY_CREATE_TRANSFER_SUCCESS = 'notify-create-transfer-success',
    NOTIFY_CREATE_COST_SUCCESS = 'notify-create-cost-success',
    NOTIFY_CREATE_METHOD_SUCCESS = 'notify-create-method-success',
    NOTIFY_CREATE_CATEGORY_SUCCESS = 'notify-create-category-success',
    NOTIFY_CREATE_GET_LOAN_SUCCESS = 'notify-create-get-loan-success',
    NOTIFY_UPDATE_PASSWORD_SUCCESS = 'notify-update-password-success',
    NOTIFY_CREATE_MEMBER_SUCCESS = 'notify-create-member-success',
    NOTIFY_CREATE_NOTIFY_SUCCESS = 'notify-create-notify-success',
    NOTIFY_NOT_EXIST_ACCOUNT = 'notify-not-exist-account',
    NOTIFY_ERROR = 'notify-error',
    NOTIFY_ACCOUNT_CANT_LOGIN_BY_EMAIL_PASSWORD = 'notify-account-cant-login-by-email-password',
    NOTIFY_INVALID_PASSWORD = 'notify-invalid-password',
    NOTIFY_INVALID_OLD_PASSWORD = 'notify-invalid-old-password',
    NOTIFY_NO_CHANGE = 'no-change',
    NOTIFY_REQUIRED_EMAIL = 'notify-required-email',
    NOTIFY_REQUIRED_ID = 'notify-required-id',
    NOTIFY_REQUIRED_PASSWORD = 'notify-required-password',
    NOTIFY_FORBIDDEN = 'notify-forbidden',
    NOTIFY_REQUIRED_REFRESH_TOKEN = 'notify-required-refresh-token',
    NOTIFY_EXPIRED_TOKEN = 'notify-expired-token',
    NOTIFY_REQUIRED_CREDENTIAL = 'notify-required-credential',
    NOTIFY_REQUIRED_DATA = 'notify-required-data',
    NOTIFY_REQUIRED_URL = 'notify-required-url',
    NOTIFY_REQUIRED_SUBSCRIPTION_ID = 'notify-required-subscription-id',

    /* CONFIRM */
    CONFIRM_NOTIFY = 'confirm-notify',
    CONFIRM_DELETE_TRANSACTION = 'confirm-delete-transaction',
    CONFIRM_DELETE_MESSAGE = 'confirm-delete-message',

    /* SPENDING */
    SPENDING = 'spending',
    BUDGET_BY_CATEGORY = 'budget-by-category',
    BUDGET_BY_METHOD = 'budget-by-method',
    TRANSACTION_RECENT = 'transaction-recent',
    METHOD_SPENDING = 'method-spending',
    FROM_METHOD_SPENDING = 'from-method-spending',
    TO_METHOD_SPENDING = 'to-method-spending',
    MAKE_INCOME = 'make-income',
    MAKE_COST = 'make-cost',
    MAKE_TRANSFER = 'make-transfer',
    MAKE_BUDGET = 'make-budget',
    CREATE_METHOD = 'create-method',
    CREATE_CATEGORY = 'create-category',
    FROM_TRANSFER_METHOD = 'from-transfer-method',
    TO_TRANSFER_METHOD = 'to-transfer-method',
    CHOOSE_PREVIOUS_MONTH = 'choose-previous-month',

    /* LOAN */
    LOAN = 'loan',
    GET_LOAN = 'get-loan',
    MAKE_GET_LOAN = 'make-get-loan',
    MAKE_LOAN = 'make-loan',
    MAKE_LOAN_GET_LOAN = 'make-loan-get-loan',
    CREATE_MEMBER = 'create-member',
    NEAR_DEADLINE = 'near-deadline',
    METHOD_RECEIVE = 'method-receive',
    USER_GET_LOAN = 'user-get-loan',
    ESTIMATE_PAID_DATE = 'estimate-paid-date',
    ASSET = 'asset',
    ADD_ORIGIN_AMOUNT = 'add-origin-amount',
    TEMP_LOAN = 'temp-loan',
    IMAGE_OPTION = 'image-option',
    PRESS_TO_UPLOAD_IMAGE = 'press-to-upload-image',
    ALREADY_PAID = 'already-paid',
    PAID_ACTION = 'paid-action',
    PAID = 'paid',
    UNPAID = 'unpaid',
    REAL_AMOUNT = 'real-amount',
    AMOUNT_RECEIVE_METHOD = 'amount-receive-method',

    /* PROFILE */
    JOIN_DATE = 'join-date',
    ALLOW_RECEIVE_NOTIFY_BY_MAIL = 'allow-receive-notify-by-mail',
    MOST_USED = 'most-used',
    MOST_USED_RECEIVE = 'most-used-receive',
    MOST_USED_COST = 'most-used-cost',
    MOST_RECEIVE = 'most-receive',
    MOST_COST = 'most-cost',
    MOST_RECEIVE_TOTAL = 'most-receive-total',
    MOST_COST_TOTAL = 'most-cost-total',
    MOST_METHOD_AMOUNT = 'most-method-amount',
    MOST_CATEGORY_AMOUNT = 'most-category-amount',

    /* SETTING */
    OLD_PASSWORD_INCORRECT = 'old-password-incorrect',
    OLD_PASSWORD = 'old-password',
    NEW_PASSWORD = 'new-password',
    RE_PASSWORD = 're-password',

    /* NOTIFICATION */
    LIST_RECEIVE_NOTIFY_MEMBER = 'list-receive-notify-member',
    SEND_ALL_MEMBER = 'send-all-member',
    SEND_MAIL = 'send-mail',
    CREATE_NOTIFY = 'create-notify',
    PROGRESS_CONTENT = 'progress-content',
    PROGRESS_TITLE_DESC = 'progress-title-desc',
    PROGRESS_CHOOSE_MEMBER = 'progress-choose-member',
    PROGRESS_PREVIEW_AND_SEND = 'progress-preview-and-send',
    SEND_TO_ALL_MEMBER = 'send-to-all-member',
    SEND_MAIL_TO_ALL = 'send-mail-to-all',
    NOTIFY_RECEIVER_LIST = 'notify-receiver-list',
    SEND_NOTIFY_BY_EMAIL = 'send-notify-by-email',

    /* AUTH */
    OR = 'or',
    LOGIN_WITH_EMAIL_PASSWORD = 'login-with-email-password',
    UNKNOWN_STEP = 'unknown-step',
    ACCOUNT_OPTION_EMAIL = 'account-option-email',
    ACCOUNT_NOT_HAVE_PASSWORD = 'account-not-have-password',

    /* OTHERS */
    SOME_SIMILAR_NAME = 'some-similar-name',
    NOT_SIMILAR_NAME = 'not-similar-name',
    INVALID_FORMAT_IMAGE = 'invalid-format-image',
    INVALID_FORMAT_IMAGE_SIZE = 'invalid-format-image-size',

    /* LAYOUT */
    SPENDING_MANAGEMENT = 'spending-management',
    LOAN_MANAGEMENT = 'loan-management',
    TIME_KEEPING_MANAGEMENT = 'time-keeping-management',
    ACCOUNT_MANAGEMENT = 'account-management',
    NOTIFY_MANAGEMENT = 'notify-management',
    SETTING_MANAGEMENT = 'setting-management',
    PROFILE_MANAGEMENT = 'profile-management',
    DARK_MODE = 'dark-mode',
    LIGHT_MODE = 'light-mode',
    SET_PASSWORD = 'set-password',
    CHANGE_PASSWORD = 'change-password',
    FEEDBACK = 'feedback',
}

export default LANGUAGE
