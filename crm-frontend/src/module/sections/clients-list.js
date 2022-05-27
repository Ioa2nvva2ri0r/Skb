import { el, setChildren } from 'redom';
import { DataClients } from '../data';
import { sortArray } from '../function/sort';
import { createItemClient } from './client-item';

export const clients = el('section', { className: 'clients' });
export const clientsContainer = el('div', { className: 'clients__container' });
export const clientsTitle = el(
  'h1',
  { className: 'clients__title' },
  'Клиенты'
);
export const clientsContainerSubtitle = el('div', {
  className: 'clients__subtitle-container',
});
const clientsSubtitleContacts = el(
  'h3',
  { className: 'clients__subtitle' },
  'Контакты'
);
const clientsSubtitleActions = el(
  'h3',
  { className: 'clients__subtitle' },
  'Действия'
);
export const clientsBoxList = el('div', {
  className: 'clients__list-container',
});
export const clientsMessage = el('p', {
  className: 'clients__message',
});
export const clientsList = el('ul', { className: 'clients__list' });
export const clientsBtnDone = el(
  'button',
  { className: 'clients__btn' },
  'Добавить клиента'
);
const objClassSubtitle = {
  main: 'clients__subtitle',
  filter: 'clients__subtitle-filter',
  active: 'clients__subtitle-active',
  activeUp: 'clients__subtitle-active-up',
  activeDown: 'clients__subtitle-active-down',
};

clientsBtnDone.insertAdjacentHTML(
  'afterbegin',
  '<svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 8C16.71 8 18.5 6.21 18.5 4C18.5 1.79 16.71 0 14.5 0C12.29 0 10.5 1.79 10.5 4C10.5 6.21 12.29 8 14.5 8ZM5.5 6V3H3.5V6H0.5V8H3.5V11H5.5V8H8.5V6H5.5ZM14.5 10C11.83 10 6.5 11.34 6.5 14V16H22.5V14C22.5 11.34 17.17 10 14.5 10Z" fill="#9873FF"/></svg>'
);

function createTitleFilter(objClass, content, key) {
  const clientsSubtitleFilter = el(
    'h2',
    {
      className: `${objClass.main} ${objClass.filter} ${
        content === 'ID' ? `${objClass.active} ${objClass.activeUp}` : ''
      }`,
    },
    content
  );

  clientsSubtitleFilter.insertAdjacentHTML(
    'beforeend',
    `<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z" fill="#9873FF"/></svg>${
      content === 'Фамилия Имя Отчество'
        ? '<span class="clients__subtitle-content">А-Я</span>'
        : ''
    }`
  );

  const getData = new DataClients({
    url: 'http://localhost:3000/api/clients',
    method: 'GET',
  })._data;

  clientsSubtitleFilter.addEventListener('click', (e) => {
    getData.then((response) => {
      clientsList.innerHTML = '';

      if (e.currentTarget.classList.contains(objClass.activeUp)) {
        e.currentTarget.classList.remove(objClass.activeUp);
        e.currentTarget.classList.add(objClass.activeDown);
        sortArray(response, key, '<').forEach((client) => {
          clientsList.append(createItemClient(client));
        });
      } else {
        document
          .querySelectorAll(`.${objClass.main}`)
          .forEach((subTitle) =>
            subTitle.classList.remove(
              objClass.active,
              objClass.activeUp,
              objClass.activeDown
            )
          );
        e.currentTarget.classList.add(objClass.active, objClass.activeUp);
        sortArray(response, key, '>').forEach((client) => {
          clientsList.append(createItemClient(client));
        });
      }
    });
  });

  return clientsSubtitleFilter;
}

setChildren(clientsBoxList, [clientsMessage, clientsList, clientsBtnDone]);
setChildren(clientsContainerSubtitle, [
  createTitleFilter(objClassSubtitle, 'ID', 'id'),
  createTitleFilter(objClassSubtitle, 'Фамилия Имя Отчество', 'surname'),
  createTitleFilter(objClassSubtitle, 'Дата и время создания', 'createdAt'),
  createTitleFilter(objClassSubtitle, 'Последние изменения', 'updatedAt'),
  clientsSubtitleContacts,
  clientsSubtitleActions,
]);
setChildren(clientsContainer, clientsBoxList);
setChildren(clients, clientsContainer);
