import * as yup from 'yup';
import { setLocale } from 'yup';

const validateForm = (i18n, content) => {
  setLocale({
    mixed: {
      default: 'field_invalid',
      required: i18n.t('validation.errors.errorRequared'),
    },
    string: {
      url: i18n.t('validation.errors.errorURL'),
    },
  });
  const shema = yup.object().shape({
    rssUrl: yup.string()
      .required()
      .url()
      .trim(),
  });
  return shema.validate({ rssUrl: content });
};

export default validateForm;
