let submitBtn = document.querySelector('.form__submit');
let loginInput = document.querySelector('#login');
let passwordInput = document.querySelector('#password');



submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (!loginInput.value) {
        showEr(loginInput, 'Введите Логин');
    } else if (loginInput.value != 'user') {
        showEr(loginInput, 'Логин введен неверно');
    }


    if (!passwordInput.value) {
        showEr(passwordInput, 'Введите Пароль');
    } else if (passwordInput.value != 'qwerty1234') {
        showEr(passwordInput, 'Пароль введен неверно');
    } else if (loginInput.value == 'user' && passwordInput.value == 'qwerty1234') {
        let auth = document.querySelector('.auth');
        let body = document.querySelector('.body-page');
        let title = document.querySelector('.page__title');
        body.className += ' open';
        auth.style.display = 'none';
        title.style.display = 'block';
    }


});

loginInput.addEventListener('input', function () {
    resetError(loginInput);
});


passwordInput.addEventListener('input', function () {
    resetError(passwordInput);
});


function showEr(el, msg) {
    el.className = 'form__input form__input--error';
    var msgEl = document.createElement('span');
    msgEl.className = 'error-msg';
    msgEl.innerHTML = msg;
    if (el.parentNode.parentNode.lastChild.className == 'error-msg') {
        return;
    } else {
        el.parentNode.parentNode.appendChild(msgEl);
    }

}

function resetError(el) {
    el.className = 'form__input';
    if (el.parentNode.parentNode.lastChild.className == 'error-msg') {
        el.parentNode.parentNode.removeChild(el.parentNode.parentNode.lastChild);
    }


}



// function showError(container, errorMessage) {
//       container.className = 'error';
//       var msgElem = document.createElement('span');
//       msgElem.className = "error-message";
//       msgElem.innerHTML = errorMessage;
//       container.appendChild(msgElem);
//     }

//     function resetError(container) {
//       container.className = '';
//       if (container.lastChild.className == "error-message") {
//         container.removeChild(container.lastChild);
//       }
//     }

//     function validate(form) {
//       var elems = form.elements;

//       resetError(elems.from.parentNode);
//       if (!elems.from.value) {
//         showError(elems.from.parentNode, ' Укажите от кого.');
//       }

//       resetError(elems.password.parentNode);
//       if (!elems.password.value) {
//         showError(elems.password.parentNode, ' Укажите пароль.');
//       } else if (elems.password.value != elems.password2.value) {
//         showError(elems.password.parentNode, ' Пароли не совпадают.');
//       }

//       resetError(elems.to.parentNode);
//       if (!elems.to.value) {
//         showError(elems.to.parentNode, ' Укажите, куда.');
//       }

//       resetError(elems.message.parentNode);
//       if (!elems.message.value) {
//         showError(elems.message.parentNode, ' Отсутствует текст.');
//       }

//     }