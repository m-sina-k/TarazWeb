export const ERROR_MESSAGES: Record<string, string> = {
  ACCESS_UNAUTHORIZED: "شما مجوز انجام این اقدام را ندارید",
  AUTH_USER_NOT_FOUND: "کاربر یافت نشد",
  AUTH_EMAIL_ALREADY_EXISTS: "ایمیل قبلاً ثبت شده است",
  AUTH_INVALID_TOKEN: "توکن معتبر نیست",
  AUTH_NOT_FOUND: "اطلاعات احراز هویت یافت نشد",
  AUTH_TOO_MANY_ATTEMPTS:
    "تعداد تلاش‌های ناموفق زیاد است. لطفاً بعداً تلاش کنید",
  AUTH_UNAUTHORIZED_ACCESS: "شما مجوز انجام این اقدام را ندارید",
  AUTH_TOKEN_NOT_FOUND: "توکن یافت نشد",
  VALIDATION_ERROR: "خطا در اعتبارسنجی اطلاعات",
  RESOURCE_NOT_FOUND: "ایمیل یا گذرواژه اشتباه است",
  FILE_UPLOAD_ERROR: "خطا در آپلود فایل",
  INTERNAL_SERVER_ERROR: "خطای سرور. لطفاً بعداً تلاش کنید",
};

export const getErrorMessage = (
  errorCode?: string,
  defaultMessage?: string
): string => {
  if (errorCode && ERROR_MESSAGES[errorCode]) {
    return ERROR_MESSAGES[errorCode];
  }
  return defaultMessage || "خطا در انجام عملیات";
};
