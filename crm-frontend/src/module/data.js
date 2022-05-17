import { validationForm } from './function/validation';
import { elemHidden } from './function/element-hidden';

export class DataClients {
  constructor(params) {
    if (params.url === undefined || params.url === '')
      throw new Error('No URL specified for further interaction with data!');
    else this.url = String(params.url);
    if (params.method === undefined || params.method === '')
      throw new Error('No method specified for further interaction with data!');
    else {
      switch (String(params.method).toUpperCase()) {
        case 'GET':
        case 'DELETE':
          this.method = String(params.method).toUpperCase();
          if (this.method === 'GET') {
            this.preloader = params.preloader;
            this.preloaderContent = params.preloaderContent;
            this.classPreloaderActive = params.classPreloaderActive;
          } else if (this.method === 'DELETE') {
            if (
              params.modal === undefined ||
              document.querySelector(`${params.modal}`) === null
            )
              throw new Error('Modal window not specified or does not exist!');
            else {
              this.modal = document.querySelector(`${params.modal}`);
              this.modalClass = params.modal;
              this.deleteBtn = params.deleteBtn;
              this.deleteBtn.insertAdjacentHTML(
                'afterend',
                `<div class="error" id="error" role="alert"></div>`
              );
              this.classDeleteBtnActive = params.classDeleteBtnActive;
            }
          }
          break;
        case 'POST':
        case 'PATCH': {
          this.method = String(params.method).toUpperCase();
          if (
            params.form === undefined ||
            document.querySelector(`${params.form}`) === null
          )
            throw new Error('Form not specified or does not exist!');
          else {
            this.form = document.querySelector(`${params.form}`);
            this.form.insertAdjacentHTML(
              'afterend',
              `<div class="error" id="error" role="alert"></div>`
            );
            this.formBtn = params.formBtn;
            this.classFormBtnActive = params.classFormBtnActive;
          }
          if (
            params.modal === undefined ||
            document.querySelector(`${params.modal}`) === null
          )
            throw new Error('Modal window not specified or does not exist!');
          else {
            this.modal = document.querySelector(`${params.modal}`);
            this.modalClass = params.modal;
          }
          break;
        }
        default:
          throw new Error(`${params.method} method is not supported!`);
      }
    }
    this.data = '';
  }

  set form(el) {
    if (this.method === 'POST' || this.method === 'PATCH') {
      this._form = el;
      this.postOrPatchData(this._form);
    }
  }

  get form() {
    return this._form;
  }

  set data(content) {
    this._data = this.getData();
  }

  get data() {
    return this._data;
  }

  errorMessage(el, content) {
    if (!el.classList.contains('error__active')) {
      el.classList.add('error__active');
      el.textContent = content;
      setTimeout(() => el.classList.remove('error__active'), 4000);
    }
  }

  async getData() {
    this.preloader !== undefined
      ? this.preloader.classList.add(this.classPreloaderActive)
      : undefined;
    this.preloaderContent !== undefined
      ? (this.preloaderContent.textContent = 'Загрузка')
      : '';

    try {
      const response = await fetch(this.url);

      if (response.ok) {
        this.preloader !== undefined
          ? this.preloader.classList.remove(this.classPreloaderActive)
          : undefined;
        const data = await response.json();
        return data;
      } else new Error('Что-то пошло не так, повторите попытку позже');
    } catch (error) {
      this.preloaderContent.textContent = error.message;
      this.preloader.classList.add(this.classPreloaderActive);
    }
  }

  postOrPatchData(form) {
    let value = {};
    let arrayContacts = [];

    form.addEventListener('submit', async (e) => {
      value = {};
      arrayContacts = [];

      this.formBtn !== undefined
        ? this.formBtn.classList.add(this.classFormBtnActive)
        : undefined;

      try {
        e.preventDefault();
        for (let elem of e.currentTarget.elements) {
          if (elem.nodeName === 'INPUT') {
            validationForm(elem, elem.value, 'error__input');

            if (
              elem.id === 'name' ||
              elem.id === 'surname' ||
              elem.id === 'lastName'
            ) {
              value[elem.id] = elem.value;
              value['contacts'] = [];
            } else {
              arrayContacts.push({
                type: elem.name,
                value: elem.value,
              });
              value['contacts'] = arrayContacts;
            }
          }
        }

        const response = await fetch(this.url, {
          method: this.method,
          body: JSON.stringify(value),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          elemHidden(
            this.modal,
            `${this.modalClass.replace(/[\s.,#]/g, '')}-open`,
            `${this.modalClass.replace(/[\s.,#]/g, '')}-close`,
            395
          );
          setTimeout(() => window.location.reload(), 400);
        } else {
          let error = [];
          const data = await response.json();
          data.errors.forEach((err) => error.push(`${err.message}!`));
          throw new Error(
            `Статус ответа: ${response.status}<br>${error.join('<br>')}`
          );
        }
      } catch (error) {
        this.errorMessage(document.getElementById('error'), error.message);
      } finally {
        this.formBtn !== undefined
          ? this.formBtn.classList.remove(this.classFormBtnActive)
          : undefined;
      }
    });
  }

  async deleteData() {
    this.deleteBtn !== undefined
      ? this.deleteBtn.classList.add(this.classDeleteBtnActive)
      : undefined;
    try {
      const response = await fetch(this.url, { method: this.method });
      if (response.ok) {
        elemHidden(
          this.modal,
          `${this.modalClass.replace(/[\s.,#]/g, '')}-open`,
          `${this.modalClass.replace(/[\s.,#]/g, '')}-close`,
          395
        );
        setTimeout(() => window.location.reload(), 400);
      } else {
        throw new Error(
          `Статус ответа: ${response.status}<br>Что-то пошло не так!`
        );
      }
    } catch (error) {
      this.errorMessage(document.getElementById('error'), error.message);
    } finally {
      this.deleteBtn !== undefined
        ? this.deleteBtn.classList.remove(this.classDeleteBtnActive)
        : undefined;
    }
  }
}
