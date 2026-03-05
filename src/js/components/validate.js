import JustValidate from 'just-validate';
import Inputmask from "inputmask";
let xhr;

const page = document.querySelector('.page__body');

const form = document.querySelector('.graph-modal__form');
if (form) {
  const telSelector = form?.querySelector('input[type="tel"]');
  const mail = form?.querySelector('input[type="email"]');
  const send = document.querySelector('.send');
  const ok = document.querySelector('.send__btn');
  const sendText1 = document.querySelector('.send__text--1');
  const sendText2 = document.querySelector('.send__text--2');
  const inputMask = new Inputmask('+7 (999) 999-99-99');

  inputMask.mask(telSelector);

  const validation = new JustValidate('.graph-modal__form');

  validation
    .addField('input[name="name"]', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Имя слишком короткое!'
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Имя слишком длинное!'
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Введите имя!'
      }
    ])

    .addField('input[name="email"]', [
      {
        rule: 'email',
        value: true,
        errorMessage: 'Введите корректный Email'
      }
    ])

    .addField('textarea[name="message"]', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Сообщение слишком короткое'
      },
      {
        rule: 'maxLength',
        value: 300,
        errorMessage: 'Сообщение слишком длинное'
      },
    ])

    .addField('input[name="agree"]', [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Подтвердите согласие',
      }
    ])

    .addField('input[name="phone"]', [
      {
        rule: 'function',
        validator: function () {
          const phone = telSelector.inputmask.unmaskedvalue();
          return phone.length === 0 || phone.length === 10;
        },
        errorMessage: 'Введите корректный телефон',
      },
    ]).onSuccess((event) => {

      if (phone.value || mail.value) {
        const modal = document.querySelector('.graph-modal');

        let formData = new FormData(event.target);
        xhr = new XMLHttpRequest();


        xhr.open('POST', './mail/mail.php', true);
        xhr.send(formData);

        event.target.reset();
        page.style.opacity = 0.3;
        modal.classList.remove('is-open');
        if (xhr) {
          console.log('xhr', xhr);

          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                console.log('Отправлено');
                sendText1.textContent = "Заявка отправлена";
                sendText2.textContent = "";
                send.classList.add('send--active');

              } else {
                sendText1.textContent = "Ошибка отправки!";
                sendText2.textContent = "Попробуйте позже";
                send.classList.add('send--active');
              }

            }
            page.style.opacity = 1;
            ok.focus();
            ok.onclick = (event) => {
              send.classList.remove('send--active');
              document.body.classList.remove('disable-scroll');
              page.style.paddingRight = 0;
            }
          }
        }


      } else {
        document.querySelector('.graph-modal__error').classList.add('graph-modal__error--active');
      }
    });
}


mail.onfocus = () => {
  document.querySelector('.graph-modal__error').classList.remove('graph-modal__error--active');
}
document.querySelector('#phone').onfocus = () => {
  document.querySelector('.graph-modal__error').classList.remove('graph-modal__error--active');
}

