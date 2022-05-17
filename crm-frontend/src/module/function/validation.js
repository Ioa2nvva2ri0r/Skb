import validator from 'validator';

export function checkingForSpaces(value, input, classErr) {
  if (value.includes(' ')) {
    input.classList.add(classErr);
    throw new Error(
      `Поле для ввода "${input.name}" содержит пробельные символы!`
    );
  } else {
    input.classList.remove(classErr);
    return false;
  }
}

export function checkForEmptyInputField(value, input, classErr) {
  if (value === '') {
    input.classList.add(classErr);
    throw new Error(`Поле для ввода "${input.name}" не указано!`);
  } else {
    input.classList.remove(classErr);
    return false;
  }
}

export function checkingIfOnlyNumbersMatter(value, input, classErr) {
  if (/[^0-9]/.test(value)) {
    input.classList.add(classErr);
    throw new Error(
      `Поле для ввода "${input.name}" содержит символы не являющиеся цифрами!`
    );
  } else {
    input.classList.remove(classErr);
    return false;
  }
}

export function checkingIfOnlyLettersMatter(value, input, classErr) {
  if (/[^a-zа-яё]/gi.test(value)) {
    input.classList.add(classErr);
    throw new Error(
      `Поле для ввода "${input.name}" содержит символы не являющиеся буквами!`
    );
  } else {
    input.classList.remove(classErr);
    return false;
  }
}

export function mailValidityCheck(value, input, classErr) {
  if (validator.isEmail(value)) {
    input.classList.remove(classErr);
    return false;
  } else {
    input.classList.add(classErr);
    throw new Error(
      `Поле для ввода "${input.name}" не является электронной почтой!`
    );
  }
}

export function checkingValueForValidLength(value, input, classErr, min, max) {
  if (validator.isLength(value, { min: min, max: max })) {
    input.classList.remove(classErr);
    return false;
  } else {
    input.classList.add(classErr);
    throw new Error(
      `Поле для ввода "${input.name}" имеет длину ${
        input.value.length < min
          ? `менее ${min}`
          : max == undefined
          ? ''
          : input.value.length > max
          ? `более ${max}`
          : ''
      } символов!`
    );
  }
}

export function validationForm(input, value, classError) {
  input.addEventListener('focus', (e) =>
    e.currentTarget.classList.remove(classError)
  );

  checkingForSpaces(value, input, classError);

  if (input.id !== 'lastName') {
    checkForEmptyInputField(value, input, classError);
    if (input.id === 'name' || input.id === 'surname') {
      checkingIfOnlyLettersMatter(value, input, classError);
      checkingValueForValidLength(value, input, classError, 2);
    } else if (input.name === 'Телефон' || input.name === 'Доп. телефон') {
      checkingIfOnlyNumbersMatter(value, input, classError);
      checkingValueForValidLength(value, input, classError, 11, 12);
    } else if (input.name === 'Email')
      mailValidityCheck(value, input, classError);
  } else {
    if (input.id === 'lastName' && value !== '') {
      checkingIfOnlyLettersMatter(value, input, classError);
      checkingValueForValidLength(value, input, classError, 2);
    }
  }
}
