import { el, setChildren } from 'redom';
import { DataClients } from '../data';
import { elemVisible, elemHidden } from '../function/element-hidden';
import { removeClient } from './modal-remove';

export const modal = el('div', { className: 'modal' });
const modalContainer = el('div', { className: 'modal__container' });
const modalBoxTitleAndId = el('div', { className: 'modal__title-box' });
const modalTitle = el('h2', { className: 'modal__title' });
const modalClientId = el('h3', { className: 'modal__title-id' });
const modalBtnClose = el('button', { className: 'modal__btn-close' });
const modalForm = el('form', { className: 'modal__form' });
const modalInputsContainer = el('div', {
  className: 'modal__form-container',
});
const modalBoxContact = el('div', { className: 'modal__contacts-box' });
const modalBtnContainer = el('div', { className: 'modal__btn-box' });
const modalListContacts = el('ul', { className: 'modal__contacts-list' });
const modalBtnDoneContact = el(
  'button',
  { className: 'modal__btn-done', type: 'button' },
  'Добавить контакт'
);
const modalBtnSave = el(
  'button',
  { className: 'modal__btn-save' },
  'Сохранить'
);
const modalBtnRemove = el('button', {
  className: 'modal__btn-remove',
  type: 'button',
});

modalBtnClose.innerHTML =
  '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z" fill="#B0B0B0"/></svg>';
modalBtnDoneContact.insertAdjacentHTML(
  'afterbegin',
  '<svg height="14" width="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><circle cx="7" cy="7" r="6" stroke="#9873FF" stroke-width="1.25" fill="#F4F3F6"/><line x1="4.4" y1="7" x2="9.8" y2="7" stroke-linecap="round" stroke-width="1.35" stroke="#9873FF"/><line x1="7" y1="4.4" x2="7" y2="9.8" stroke-linecap="round" stroke-width="1.35" stroke="#9873FF"/></svg>'
);
modalBtnSave.insertAdjacentHTML(
  'afterbegin',
  '<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.00008 6.03996C1.00008 8.82344 3.2566 11.08 6.04008 11.08C8.82356 11.08 11.0801 8.82344 11.0801 6.03996C11.0801 3.25648 8.82356 0.999956 6.04008 0.999956C5.38922 0.999956 4.7672 1.1233 4.196 1.348" stroke="#B89EFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/></svg>'
);

modalBtnClose.addEventListener('click', () =>
  elemHidden(modal, 'modal-open', 'modal-close', 395)
);
modalBtnDoneContact.addEventListener('click', (e) => {
  modalListContacts.childNodes.length === 10
    ? (e.currentTarget.disabled = true)
    : modalListContacts.append(createContact());
  styleBoxListContacts();
});

setChildren(modalBtnContainer, [modalBtnSave, modalBtnRemove]);
setChildren(modalBoxTitleAndId, [modalTitle, modalClientId]);
setChildren(modalContainer, [modalBoxTitleAndId, modalBtnClose, modalForm]);
setChildren(modal, modalContainer);

function styleBoxListContacts() {
  modalListContacts.childNodes.length !== 0
    ? (modalListContacts.style.paddingBottom = '25px')
    : (modalListContacts.style.paddingBottom = '0');
  modalListContacts.childNodes.length !== 0
    ? (modalBoxContact.style.padding = '25px 30px')
    : (modalBoxContact.style.padding = '8px 30px');
}

function createContact(type, value) {
  const arrayTypeContact = [
    'Телефон',
    'Доп. телефон',
    'Email',
    'Vk',
    'Facebook',
    'Twitter',
    'Linkedin',
  ];

  const modalItemContact = el('li', { className: 'modal__contacts-item' });
  const modalSelectBox = el('div', {
    className: 'modal__contacts-select-box',
  });
  const modalSelect = el(
    'button',
    {
      className: 'modal__contacts-select',
      type: 'button',
    },
    type !== undefined ? type : 'Телефон'
  );
  const modalSelectDropdown = el('div', {
    className: 'modal__contacts-select-dropdown',
  });
  const modalInputContact = el('input', {
    className: 'modal__contacts-input',
    placeholder:
      screen.width <= 500 ? 'Введите данные' : 'Введите данные контакта',
    autocomplete: 'off',
  });
  const modalBtnRemoveContact = el('button', {
    className: 'modal__contacts-btn',
    type: 'button',
  });

  if (value !== undefined) {
    modalInputContact.setAttribute('name', type);
    modalInputContact.setAttribute('value', value);
    modalBtnRemoveContact.style.display = 'flex';
  } else modalInputContact.setAttribute('name', 'Телефон');

  setChildren(modalSelectBox, [modalSelect, modalSelectDropdown]);
  setChildren(modalItemContact, [
    modalSelectBox,
    modalInputContact,
    modalBtnRemoveContact,
  ]);

  modalBtnRemoveContact.innerHTML =
    '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#B0B0B0"/></svg>';
  modalSelectBox.insertAdjacentHTML(
    'beforeend',
    '<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.494999 0.689972C0.249999 0.934972 0.249999 1.32997 0.494999 1.57497L4.65 5.72997C4.845 5.92497 5.16 5.92497 5.355 5.72997L9.51 1.57497C9.755 1.32997 9.755 0.934971 9.51 0.689972C9.265 0.444971 8.87 0.444971 8.625 0.689972L5 4.30997L1.375 0.684973C1.135 0.444972 0.734999 0.444972 0.494999 0.689972Z" fill="#9873FF"/></svg>'
  );
  modalBtnRemoveContact.insertAdjacentHTML(
    'beforeend',
    '<span class="modal__contacts-btn-tooltipe">Удалить контакт</span>'
  );

  function createOptionDropdownSelect() {
    modalSelectDropdown.innerHTML = '';

    arrayTypeContact.forEach((optionContent) => {
      const modalSelectOption = el(
        'div',
        {
          className: 'modal__contacts-select-option',
          name: optionContent,
        },
        optionContent
      );

      modalSelectOption.addEventListener('click', (e) => {
        modalSelect.textContent = e.currentTarget.textContent;
        modalSelect.setAttribute('contenteditable', 'false');
        modalInputContact.setAttribute('name', e.currentTarget.textContent);
        modalSelect.classList.remove('modal__contacts-select-active');

        elemHidden(
          modalSelectDropdown,
          'modal__contacts-select-dropdown-open',
          'modal__contacts-select-dropdown-close',
          395
        );
      });

      modalSelectDropdown.append(modalSelectOption);
    });
  }

  modalSelect.addEventListener('click', () => {
    if (
      modalSelectDropdown.classList.contains(
        'modal__contacts-select-dropdown-open'
      )
    ) {
      modalSelect.classList.remove('modal__contacts-select-active');
      elemHidden(
        modalSelectDropdown,
        'modal__contacts-select-dropdown-open',
        'modal__contacts-select-dropdown-close',
        395
      );
    } else {
      createOptionDropdownSelect();
      modalSelect.classList.add('modal__contacts-select-active');
      elemVisible(
        modalSelectDropdown,
        'modal__contacts-select-dropdown-open',
        'flex'
      );
    }
  });
  document.body.addEventListener('click', (e) => {
    if (
      modalSelectDropdown.classList.contains(
        'modal__contacts-select-dropdown-open'
      )
    ) {
      if (!modalSelectBox.contains(e.target)) {
        modalSelect.classList.remove('modal__contacts-select-active');
        elemHidden(
          modalSelectDropdown,
          'modal__contacts-select-dropdown-open',
          'modal__contacts-select-dropdown-close',
          395
        );
      }
    }
  });
  modalInputContact.addEventListener('input', (e) => {
    if (e.currentTarget.value === '')
      modalBtnRemoveContact.style.display = 'none';
    else modalBtnRemoveContact.style.display = 'flex';
  });
  modalBtnRemoveContact.addEventListener('click', () => {
    modalItemContact.remove();
    styleBoxListContacts();
  });

  return modalItemContact;
}

export function createModalMain(data) {
  modalInputsContainer.innerHTML = '';
  modalListContacts.innerHTML = '';

  elemVisible(modal, 'modal-open', 'flex');

  [
    {
      id: 'name',
      placeholder: 'Имя',
      value: data !== undefined ? data.name : '',
      required: true,
    },
    {
      id: 'surname',
      placeholder: 'Фамилия',
      value: data !== undefined ? data.surname : '',
      required: true,
    },
    {
      id: 'lastName',
      placeholder: 'Отчество',
      value: data !== undefined ? data.lastName : '',
      required: false,
    },
  ].forEach((obj) => {
    const modalInputBox = el('div', { className: 'modal__form-input-box' });
    const modalLabel = el(
      'label',
      {
        className: 'modal__form-label',
        for: obj.id,
      },
      obj.placeholder
    );
    const modalInput = el('input', {
      className: 'modal__form-input',
      type: 'text',
      id: obj.id,
      name: obj.placeholder,
      autocomplete: 'off',
      value: obj.value,
    });

    if (obj.required)
      modalLabel.insertAdjacentHTML(
        'beforeend',
        '<span class="modal__form-label-icon">*</span>'
      );

    function checkForEmptiness() {
      return modalInput.value !== ''
        ? modalLabel.classList.add('modal__form-label-up')
        : modalLabel.classList.remove('modal__form-label-up');
    }
    checkForEmptiness();

    modalInput.addEventListener('input', function () {
      this.value = this.value.replace(/[\s]/g, '');
      if (this.value.length > 30) this.value = this.value.slice(0, 30);
      checkForEmptiness();
    });

    setChildren(modalInputBox, [modalLabel, modalInput]);
    modalInputsContainer.append(modalInputBox);
  });

  if (data !== undefined) {
    modalTitle.textContent = 'Изменить данные';
    modalClientId.textContent = `ID: ${data.id.substr(-6)}`;
    modalBtnRemove.textContent = 'Удалить';

    data.contacts.forEach((objContact) =>
      modalListContacts.append(createContact(objContact.type, objContact.value))
    );

    styleBoxListContacts();

    modalBtnRemove.addEventListener('click', () => removeClient(data.id));
  } else {
    modalTitle.textContent = 'Новый клиент';
    modalClientId.innerHTML = '';
    modalBtnRemove.textContent = 'Отмена';

    styleBoxListContacts();

    modalBtnRemove.addEventListener('click', () =>
      elemHidden(modal, 'modal-open', 'modal-close', 395)
    );
  }

  setChildren(modalBoxContact, [modalListContacts, modalBtnDoneContact]);
  setChildren(modalForm, [
    modalInputsContainer,
    modalBoxContact,
    modalBtnContainer,
  ]);

  new DataClients({
    url: `http://localhost:3000/api/clients/${
      data !== undefined ? data.id : ''
    }`,
    method: data !== undefined ? 'PATCH' : 'POST',
    form: '.modal__form',
    modal: '.modal',
    formBtn: modalBtnSave,
    classFormBtnActive: 'modal__btn-save-active',
  });
}
