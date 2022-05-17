import moment from 'moment';
import { el, setChildren } from 'redom';
import { createModalMain } from './modal-main';
import { removeClient } from './modal-remove';
import {
  telefone,
  mail,
  vk,
  facebook,
  linkedin,
  twitter,
  other,
} from '../function/icon-contact';

export function createItemClient(data) {
  const clientItem = el('li', { className: 'client__item' });
  const clientId = el(
    'h3',
    { className: 'client__title client__title-id' },
    data.id.substr(-6)
  );
  const clientFullName = el(
    'h3',
    { className: 'client__title client__title-fullName' },
    `${data.surname} ${data.name} ${data.lastName}`
  );
  const clientDateCreate = el('h3', {
    className: 'client__title client__title-date',
  });
  const clientDateChanges = el('h3', {
    className: 'client__title client__title-date',
  });
  const clientBoxContacts = el('div', { className: 'client__contact-box' });
  const clientListContact = el('ul', { className: 'client__contact-list' });
  const clientBtnOpenContact = el('button', {
    className: 'client__contact-btn',
  });
  const clientBoxBtnDeleteAndChanges = el('div', {
    className: 'client__btn-box',
  });
  const clientBtnChanges = el(
    'button',
    {
      className: 'client__btn client__btn-change',
    },
    'Изменить'
  );
  const clientBtnDelete = el(
    'button',
    {
      className: 'client__btn client__btn-delete',
    },
    'Удалить'
  );

  clientDateCreate.innerHTML = `<span>${moment(data.createdAt).format(
    'D.MM.YYYY'
  )}</span><span>${moment(data.createdAt).format('HH:mm')}</span>`;
  clientDateChanges.innerHTML = `<span>${moment(data.updatedAt).format(
    'D.MM.YYYY'
  )}</span><span>${moment(data.updatedAt).format('HH:mm')}</span>`;
  clientBtnChanges.insertAdjacentHTML(
    'afterbegin',
    '<svg class="client__btn-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#9873FF"/></g></svg>'
  );
  clientBtnDelete.insertAdjacentHTML(
    'afterbegin',
    '<svg class="client__btn-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/></g></svg>'
  );

  clientBtnChanges.addEventListener('click', () => createModalMain(data));
  clientBtnDelete.addEventListener('click', () => removeClient(data.id));

  function createLinkContact(type, value) {
    const clientItemContact = el('li', { className: 'client__contact-item' });
    const clientContact = el('a', {
      className: 'client__contact',
      href: `${
        type === 'Телефон' || type === 'Доп. телефон'
          ? `tel:+${value}`
          : type === 'Email'
          ? `mailto:${value}`
          : value
      }`,
    });

    clientContact.innerHTML =
      type === 'Телефон' || type === 'Доп. телефон'
        ? telefone
        : type === 'Email'
        ? mail
        : type === 'Vk'
        ? vk
        : type === 'Facebook'
        ? facebook
        : type === 'Linkedin'
        ? linkedin
        : type === 'Twitter'
        ? twitter
        : other;
    clientContact.insertAdjacentHTML(
      'beforeend',
      `<span class="client__contact-tooltipe">${type}: ${
        type === 'Телефон' || type === 'Доп. телефон' ? '+' : ''
      }${value}</span>`
    );

    setChildren(clientItemContact, clientContact);

    return clientItemContact;
  }

  function hiddenItems(list) {
    const fullLength = list.children.length;
    const rangeLength = fullLength - 4;
    const arr = Array.from(list.children);
    return arr.slice(fullLength - rangeLength, fullLength);
  }

  let arrayItemContact = [];
  data.contacts.forEach((contact) =>
    arrayItemContact.push(createLinkContact(contact.type, contact.value))
  );

  setChildren(clientBoxBtnDeleteAndChanges, [
    clientBtnChanges,
    clientBtnDelete,
  ]);
  setChildren(clientListContact, arrayItemContact);
  setChildren(clientBoxContacts, [clientListContact, clientBtnOpenContact]);
  setChildren(clientItem, [
    clientId,
    clientFullName,
    clientDateCreate,
    clientDateChanges,
    clientBoxContacts,
    clientBoxBtnDeleteAndChanges,
  ]);

  if (clientListContact.childNodes.length > 5) {
    clientBtnOpenContact.style.display = 'flex';
    clientBtnOpenContact.textContent = `+${
      hiddenItems(clientListContact).length
    }`;
    hiddenItems(clientListContact).forEach((el) => {
      el.classList.add('client__contact-item-hidden');
    });
  }

  clientBtnOpenContact.addEventListener('click', (e) => {
    hiddenItems(clientListContact).forEach((el) => {
      el.classList.remove('client__contact-item-hidden');
    });
    e.currentTarget.style.display = 'none';
  });

  return clientItem;
}
