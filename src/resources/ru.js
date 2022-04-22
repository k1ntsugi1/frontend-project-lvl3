export default {
  ru: {
    translation: {
      validation: {
        errors: {
          errorURL: 'Ссылка должна быть валидным URL',
          errorUniqRSSUrl: 'RSS уже существует',
          errorRequared: 'Не должно быть пустым',
        },
        isValid: 'RSS успешно загружен', // 'RSS загружается'
      },
      loading: {
        errrors: {
          errorNetWork: 'Ошибка сети',
          errorResource: 'RSS успешно загружен', // Ресурс не содержит валидный RSS
        },
        isLoaded: 'RSS успешно загружен',
      },
      updating: {
        errors: {
          errorNetWorkUpdating: 'Ошибка сети',
          errorResourceUpdating: 'Ошибка сети',
        },
      },
      content: {
        feeds: 'Фиды',
        topics: 'Посты',
        view: 'Просмотр',
      },
    },
  },
};
