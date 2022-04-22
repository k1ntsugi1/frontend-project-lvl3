import * as yup from 'yup';
import { setLocale } from 'yup';

const validateForm = (i18n, content) => {
  setLocale({
    mixed: {
      default: 'field_invalid',
    },
    string: {
      url: i18n.t('validation.errors.errorURL'),
      min: i18n.t('validation.errors.errorRequared'),
    },
  });
  const shema = yup.object().shape({
    rssUrl: yup.string()
      .url()
      .min(1),
  });
  return shema.validate({ rssUrl: content });
};

export default validateForm;
