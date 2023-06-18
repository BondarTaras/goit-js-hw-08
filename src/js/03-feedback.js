import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

let formData = {};

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onFormSubmit);

function onInput(evn) {
  try {
    formData[evn.target.name] = evn.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

populateForm();

function onFormSubmit(evn) {
  evn.preventDefault();
  const {
    elements: { email, message },
  } = evn.currentTarget;

  if (email.value.trim() === '' || message.value.trim() === '') {
    return alert('Please fill in all the fields!');
  }

  const object = { email: email.value, message: message.value };

  console.log(object);
  evn.currentTarget.reset();

  formData = {};
  localStorage.removeItem(STORAGE_KEY);
}

// отримуємо значення із сховища, розпарсимо
// якщо там щось було, оновлюємо DOM
// застосовуємо try...catch

function populateForm() {
  try {
    const savedSettings = localStorage.getItem(STORAGE_KEY);
    const parsedSettings = JSON.parse(savedSettings);

    if (parsedSettings) {
      formData = parsedSettings;
      for (const field of form) {
        if (formData[field.name]) {
          field.value = formData[field.name];
        }
      }
    }
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}
