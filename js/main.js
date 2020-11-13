// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})

const regExpValidEmail = /^\w+@\w+\.\w{2, 12}$/;

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignUp = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');

const listUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-username-photo');
const userAvatarElem = document.querySelector('.user-avatar');

const listUsers = [
  {
    id: '01',
    email: 'debysh@rambler.ru',
    password: '2143656',
    displayName: 'Presnia',
  },
  {
    id: '02',
    email: 'hrundel@firefox.com',
    password: '234567',
    displayName: 'Hrundel',
  },
];


const setUsers = {
  user: null,
  logIn(email, password, handler) {
    if (regExpValidEmail.test(email)) {
      alert('email not valid')
      return;
    }
    
    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден')
    }
  },
  logOut(handler) {
    this.user = null;
    handler();
  },
  signUp(email, password, handler) {
    if (regExpValidEmail.test(email)) {
      alert('email not valid')
      return;
    }

    if (!email.trim() || !password.trim()) {
      alert('Введите данные')
      return;
    }

    if (!this.getUser(email)) {
      const user = {email, password, displayName: email};
      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с таким email уже зарегистрирован');
    }
  },
  editUser(userName, userPhoto, handler ) {
    if (userName) {
      this.user.displayName = userName;
    }

    if (userPhoto) {
      this.user.photo = userPhoto;
    }

    handler();
  }, 
  getUser(email) {
    return listUsers.find((item) => item.email === email)
  },
  authorizedUser(user) {
    this.user = user;
  }
};

const toggleAuthDom = () => {
  const user = setUsers.user;

  if(user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo ? user.photo : userAvatarElem.src;;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};

loginForm.addEventListener('submit', event => {
  event.preventDefault();

  setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
  event.target.reset();
});

loginSignUp.addEventListener('click', event => {
  event.preventDefault();

  setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
  loginForm.reset();
});

exitElem.addEventListener('click', event => {
  event.preventDefault();
  setUsers.logOut(toggleAuthDom);
});

editElem.addEventListener('click', event => {
  event.preventDefault();
  editContainer.classList.toggle('visible')
});

editContainer.addEventListener('click', event => {
  event.preventDefault();

  setUsers.editUser(listUsername.value, editPhotoURL.value, toggleAuthDom);
})

toggleAuthDom();




