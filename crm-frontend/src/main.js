import { el, setChildren } from 'redom';

import './module/resource';
import { header, headerSearch } from './module/sections/header';
import { DataClients } from './module/data';
import {
  clients,
  clientsContainer,
  clientsTitle,
  clientsContainerSubtitle,
  clientsBoxList,
  clientsMessage,
  clientsList,
  clientsBtnDone,
} from './module/sections/clients-list';
import { createItemClient } from './module/sections/client-item';
import { modal, createModalMain } from './module/sections/modal-main';
import { modalRemove } from './module/sections/modal-remove';

const main = el('main');
const preloader = el('div', { className: 'preloader__container' });
const preloaderBoxContent = el('div', { className: 'preloader__content-box' });
const preloaderIcon = el('div', { className: 'preloader__content-icon' });
const preloaderContent = el('h1', { className: 'preloader__content' });

setChildren(preloaderBoxContent, [preloaderContent, preloaderIcon]);
setChildren(preloader, preloaderBoxContent);
setChildren(main, [clients, modal, modalRemove]);
setChildren(document.body, [header, main, preloader]);

(() => {
  function messageListClients(message) {
    clientsMessage.textContent = '';
    return clientsList.childElementCount === 0
      ? (clientsMessage.textContent = message)
      : setChildren(clientsContainer, [
          clientsTitle,
          clientsContainerSubtitle,
          clientsBoxList,
        ]);
  }

  const getData = new DataClients({
    url: 'http://localhost:3000/api/clients',
    method: 'GET',
    preloader: preloader,
    preloaderContent: preloaderContent,
    classPreloaderActive: 'preloader__container-active',
  })._data;

  getData.then((response) => {
    clientsList.innerHTML = '';

    response.forEach((client) => {
      clientsList.append(createItemClient(client));
    });

    messageListClients(
      'Список клиентов пуст, вы можете добавить клиента нажав на кнопку "Добавить клиента"'
    );
  });

  clientsBtnDone.addEventListener('click', () => createModalMain());

  headerSearch.addEventListener('keyup', async () => {
    setTimeout(async () => {
      let newClients = [];
      const data = await getData;

      if (headerSearch.value !== '') {
        const valueSearch = headerSearch.value.toLowerCase();
        clientsList.innerHTML = '';

        data.forEach((client) => {
          const valueClient =
            String(client.id) +
            (client.surname + client.name + client.lastName).toLowerCase();

          if (valueClient.indexOf(valueSearch) > -1) {
            newClients = [];
            newClients.push(data[data.indexOf(client)]);
            newClients.forEach((client) =>
              clientsList.append(createItemClient(client))
            );
          }
        });
      } else {
        clientsList.innerHTML = '';
        data.forEach((client) => {
          clientsList.append(createItemClient(client));
        });
      }

      messageListClients('Поиск не дал результатов...');
    }, 300);
  });
})();
