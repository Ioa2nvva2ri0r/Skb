import { el, setChildren } from 'redom';
import { DataClients } from '../data';
import { elemVisible, elemHidden } from '../function/element-hidden';

export const modalRemove = el('div', { className: 'modal-remove' });
const modalRemoveContainer = el('div', {
  className: 'modal-remove__container',
});
const modalRemoveTitle = el(
  'h2',
  { className: 'modal-remove__title' },
  'Удалить клиента'
);
const modalRemoveDesc = el(
  'p',
  { className: 'modal-remove__desc' },
  'Вы действительно хотите удалить данного клиента?'
);
const modalRemoveBtnClose = el('button', { className: 'modal__btn-close' });
const modalRemoveBtnDelete = el(
  'button',
  { className: 'modal-remove__btn-delete' },
  'Удалить'
);
const modalRemoveBtnRemove = el(
  'button',
  { className: 'modal__btn-remove' },
  'Отмена'
);
let init = true;

modalRemoveBtnClose.innerHTML =
  '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z" fill="#B0B0B0"/></svg>';
modalRemoveBtnDelete.insertAdjacentHTML(
  'afterbegin',
  '<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.00008 6.03996C1.00008 8.82344 3.2566 11.08 6.04008 11.08C8.82356 11.08 11.0801 8.82344 11.0801 6.03996C11.0801 3.25648 8.82356 0.999956 6.04008 0.999956C5.38922 0.999956 4.7672 1.1233 4.196 1.348" stroke="#B89EFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/></svg>'
);

modalRemoveBtnClose.addEventListener('click', () =>
  elemHidden(modalRemove, 'modal-remove-open', 'modal-remove-close', 400)
);
modalRemoveBtnRemove.addEventListener('click', () =>
  elemHidden(modalRemove, 'modal-remove-open', 'modal-remove-close', 400)
);

setChildren(modalRemove, modalRemoveContainer);
setChildren(modalRemoveContainer, [
  modalRemoveTitle,
  modalRemoveDesc,
  modalRemoveBtnClose,
  modalRemoveBtnDelete,
  modalRemoveBtnRemove,
]);

export function removeClient(id) {
  elemVisible(modalRemove, 'modal-remove-open', 'flex');

  modalRemoveBtnDelete.addEventListener('click', () => {
    if (init === true) {
      init = false;
      new DataClients({
        url: `http://localhost:3000/api/clients/${id}`,
        method: 'DELETE',
        modal: '.modal-remove',
        deleteBtn: modalRemoveBtnDelete,
        classDeleteBtnActive: 'modal-remove__btn-delete-active',
      }).deleteData();
    }
  });
}
