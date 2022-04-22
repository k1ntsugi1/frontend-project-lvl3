import * as yup from 'yup';
import { setLocale } from 'yup';

const validateForm = (state, content) => {
  console.log(state);
  setLocale({
    mixed: {
      default: 'field_invalid',
    },
    string: {
      url: state.i18n.t('validation.errors.errorURL'),
      min: state.i18n.t('validation.errors.errorRequared'),
    },
  });

  const shema = yup.string().url().min(1);

  return shema.validate(content);
};

export default validateForm;
