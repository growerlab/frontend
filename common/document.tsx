import i18n from '../i18n/i18n';

export function setTitle(title: string) {
  title = title + ' | ' + i18n.t('website.title');
  document.title = title;
}
