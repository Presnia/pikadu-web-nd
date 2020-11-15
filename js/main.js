// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');

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
const buttonNewPost = document.querySelector('.button-new-post');
const addPostElem = document.querySelector('.add-post');

const postsWrapper = document.querySelector('.posts');

const listUsers = [
  {
    id: '01',
    email: 'debysh@rambler.ru',
    password: '214365',
    displayName: 'Presnia',
    photo: 'https://www.liga.net/images/general/2019/02/14/20190214174619-9721.png',
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
      const user = {email, password, displayName: email.substring(0, email.indexOf('@'))};
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

const setPosts = {
  allPosts: [
    {
      title: 'Заголовлок поста 1',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком чтo рот маленький риторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первуюподпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: ['свежее', 'новое', 'горячее', 'моё','случайность'],
      author: {displayName: 'Presnia', photo: 'https://www.liga.net/images/general/2019/02/14/20190214174619-9721.png'},
      date: '11.11.2020, 21:30:00',
      like: 34,
      comments: 77,
    },
    {
      title: 'Заголовлок поста 2',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком чтo рот маленький риторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первуюподпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: ['свежее', 'новое', 'горячее', 'случайность'],
      author: {displayName: 'Hrundel', photo: 'https://u.kanobu.ru/editor/images/95/ba49d9d7-92c4-4d82-83f6-4b53fa80de7b.jpg'},
      date: '13.11.2020, 21:33:00',
      like: 34,
      comments: 77,
    },
    {
      title: 'Заголовлок поста 3',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком чтo рот маленький риторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первуюподпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: ['свежее', 'новое', 'горячее', 'случайность'],
      author: {displayName: 'Presnia', photo: 'https://www.liga.net/images/general/2019/02/14/20190214174619-9721.png'},
      date: '13.11.2020, 21:33:00',
      like: 34,
      comments: 77,
    },
  ],
  addPost(title, text, tags, handler) {

    this.allPosts.unshift({
      title,
      text,
      tags: tags.split(',').map(item => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photo,
      },
      date: new Date().toLocaleString(),
      like: 0,
      comments: 0,
    })
  
    if (handler) {
      handler();
    }
  }
};


const toggleAuthDom = () => {
  const user = setUsers.user;

  if(user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo ? user.photo : userAvatarElem.src;
    buttonNewPost.classList.add('visible');
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');
  }
};

const showAddPosts = () => {
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
};

const showAllPosts = () => {

  let postsHTML = '';
  
  setPosts.allPosts.forEach(({ title, text, tags, author, date, like, comments }) => {
    postsHTML += `
      <section class="post">
        <div class="post-body">
          <h2 class="post-title">${title}</h2>
          <p class="post-text">${text}</p>
          
          <div class="tags">
            ${tags.map(tag => `<a href="#" class="tag">#${tag}</a>`)}                       
          </div>         
        </div>
        <!-- /.post-body -->
        <div class="post-footer">
          <div class="post-buttons">
            <button class="post-button likes">
              <svg width="19" height="20" class="icon icon-like">
                <use xlink:href="img/icons.svg#like"></use>
              </svg>
              <span class="likes-counter">${like}</span>
            </button>
            <button class="post-button comments">
              <svg width="21" height="21" class="icon icon-comment">
                <use xlink:href="img/icons.svg#comment"></use>
              </svg>
              <span class="comments-counter">${comments}</span>
            </button>
            <button class="post-button save">
              <svg width="19" height="19" class="icon icon-save">
                <use xlink:href="img/icons.svg#save"></use>
              </svg>
            </button>
            <button class="post-button share">
              <svg width="17" height="19" class="icon icon-share">
                <use xlink:href="img/icons.svg#share"></use>
              </svg>
            </button>
          </div>
          <!-- /.post-buttons -->
          <div class="post-author">
            <div class="author-about">
              <a href="#" class="author-username">${author.displayName}</a>
              <span class="post-time">${date}</span>
            </div>
            <a href="#" class="author-link"><img src=${author.photo || "img/avatar.jpeg"} alt="avatar" class="author-avatar"></a>
          </div>
          <!-- /.post-author -->
        </div>
        <!-- /.post-footer -->
      </section>
    `;
  })

  postsWrapper.innerHTML = postsHTML;

  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');
};

const init = () => {

  // отслеживаем клик по кнопке меню и запускаем функцию 
  menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
  });

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
  editContainer.classList.toggle('visible');
  listUsername.value = setUsers.user.displayName;
  });

  editContainer.addEventListener('submit', event => {
  event.preventDefault();

  setUsers.editUser(listUsername.value, editPhotoURL.value, toggleAuthDom);
  editContainer.classList.remove('visible');
  });

  buttonNewPost.addEventListener('click', event => {
  event.preventDefault();
  showAddPosts();
});

addPostElem.addEventListener('submit', event => {
  event.preventDefault();

  const { title, text, tags } = addPostElem.elements;

  if (title.value.length < 5) {
    alert('Слишком короткий заголовок ');
    return;
  }

  if (text.value.length < 20) {
    alert('Слишком короткий заголовок ');
    return;
  }

  setPosts.addPost(title.value, text.value, tags.value, showAllPosts);

  addPostElem.classList.remove('visible');
  addPostElem.reset();
})

  showAllPosts();
  toggleAuthDom();
};

document.addEventListener('DOMContentLoaded', () => {
  init();
})








