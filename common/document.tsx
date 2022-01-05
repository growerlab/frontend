import i18n from '../i18n/i18n';

export function setTitle(title: string):string {
  title = title + ' | ' + i18n.t('website.title');
  return title
}

