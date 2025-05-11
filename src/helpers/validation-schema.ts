import i18n from '@i18n/i18n-config';
import {SetupProfileFormData} from '@type/forms';
import {z, ZodType} from 'zod';

const SECRET_KEY_MIN_LENGTH = 6;
const SECRET_KEY_MAX_LENGTH = 20;

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;

export const ZodValidationConst = {
  // Secret Key Validation
  SECRET_KEY_REQUIRED: i18n.t('secrey_key_screen.validation.required'),
  SECRET_KEY_MIN_LENGTH: i18n.t('secrey_key_screen.validation.min_length', {
    secretKeyMinLength: SECRET_KEY_MIN_LENGTH,
  }),
  SECRET_KEY_MAX_LENGTH: i18n.t('secrey_key_screen.validation.max_length', {
    secretKeyMaxLength: SECRET_KEY_MAX_LENGTH,
  }),

  // Setup Profile Validation
  SET_UP_PROFILE_IMAGE_REQUIRED: i18n.t(
    'set_up_profile_screen.validation.profile_required',
  ),
  SET_UP_PROFILE_IMAGE_INVALID: i18n.t(
    'set_up_profile_screen.validation.profile_invalid',
  ),
  SET_UP_PROFILE_EMAIL_REQUIRED: i18n.t(
    'set_up_profile_screen.validation.email_required',
  ),
  SET_UP_PROFILE_EMAIL_INVALID: i18n.t(
    'set_up_profile_screen.validation.email_invalid',
  ),
  SET_UP_PROFILE_EMAIL_ALREADY_EXISTS: i18n.t(
    'set_up_profile_screen.validation.email_already_exists',
  ),
  SET_UP_PROFILE_USERNAME_INVALID: i18n.t(
    'set_up_profile_screen.validation.username_invalid',
  ),
  SET_UP_PROFILE_USERNAME_ALREADY_EXISTS: i18n.t(
    'set_up_profile_screen.validation.username_already_exists',
  ),
  SET_UP_PROFILE_USERNAME_MIN_LENGTH: i18n.t(
    'set_up_profile_screen.validation.username_min_length',
    {usernameMinLength: USERNAME_MIN_LENGTH},
  ),
  SET_UP_PROFILE_USERNAME_MAX_LENGTH: i18n.t(
    'set_up_profile_screen.validation.username_max_length',
    {usernameMaxLength: USERNAME_MAX_LENGTH},
  ),
  SET_UP_PROFILE_USERNAME_REQUIRED: i18n.t(
    'set_up_profile_screen.validation.username_required',
  ),
};

export const SetupProfileSchema: ZodType<SetupProfileFormData> = z.object({
  profilePic: z
    .string({required_error: ZodValidationConst.SET_UP_PROFILE_IMAGE_REQUIRED})
    .trim()
    .nonempty(ZodValidationConst.SET_UP_PROFILE_IMAGE_REQUIRED)
    .refine(val => /\.(png|jpe?g)$/i.test(val), {
      message: ZodValidationConst.SET_UP_PROFILE_IMAGE_INVALID,
    }),

  email: z
    .string({required_error: ZodValidationConst.SET_UP_PROFILE_EMAIL_REQUIRED})
    .trim()
    .nonempty(ZodValidationConst.SET_UP_PROFILE_EMAIL_REQUIRED)
    .email(ZodValidationConst.SET_UP_PROFILE_EMAIL_INVALID),

  username: z
    .string({
      required_error: ZodValidationConst.SET_UP_PROFILE_USERNAME_REQUIRED,
    })
    .trim()
    .nonempty(ZodValidationConst.SET_UP_PROFILE_USERNAME_REQUIRED)
    .min(
      USERNAME_MIN_LENGTH,
      ZodValidationConst.SET_UP_PROFILE_USERNAME_MIN_LENGTH,
    )
    .max(
      USERNAME_MAX_LENGTH,
      ZodValidationConst.SET_UP_PROFILE_USERNAME_MAX_LENGTH,
    )
    .regex(/^\w+$/, ZodValidationConst.SET_UP_PROFILE_USERNAME_INVALID),
});
