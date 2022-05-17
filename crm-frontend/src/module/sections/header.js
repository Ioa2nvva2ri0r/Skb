import { el, setChildren } from 'redom';
import logoPath from '../../assets/img/logo.svg';

// create elements header
export const header = el('header', { className: 'header' });
const headerContainer = el('div', { className: 'header__container' });
const headerLogo = el('img', {
  className: 'header__logo',
  src: logoPath,
  alt: 'logo',
});
export const headerSearch = el('input', {
  className: 'header__search',
  placeholder: 'Введите запрос',
});

// add elements header in DOM
setChildren(headerContainer, [headerLogo, headerSearch]);
setChildren(header, headerContainer);
