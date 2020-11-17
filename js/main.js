// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA93750RNavcd-4DD9Y1_dMunuX9PpGSbU",
  authDomain: "pickadu-web-nd.firebaseapp.com",
  databaseURL: "https://pickadu-web-nd.firebaseio.com",
  projectId: "pickadu-web-nd",
  storageBucket: "pickadu-web-nd.appspot.com",
  messagingSenderId: "393611592008",
  appId: "1:393611592008:web:cc70eceaaa7c5f823c337d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



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

const DEFAULT_FOTO = userAvatarElem.src;

/* const listUsers = [
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
]; */

const setUsers = {
  user: null,
  initUser(handler) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
      if (handler) handler();
    })
  },
  logIn(email, password, handler) {
    if (regExpValidEmail.test(email)) {
      alert('email not valid')
      return;
    }

    firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => {
      const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      console.log(errorMessage);
      alert('Неверный парль');
    } else if (errorCode === 'auth/user-not-found') {
      console.log(errorMessage);
      alert('Такой пользователь не найден');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    });
    
    /* const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден')
    } */
  },
  logOut() {
    // this.user = null; для работы без API
    // if (handler) {
    //   handler();
    // }
    firebase.auth().signOut();
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
    //authorization
    firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      this.editUser(email.substring(0, email.indexOf('@')), null, handler);
    })
    .catch(error => {
  // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/weak-password') {
      console.log(errorMessage);
      alert('Слабый парль');
    } else if (errorCode === 'auth/email-already-in-use') {
      console.log(errorMessage);
      alert('Такой пользователь уже существует');
    } else {
      alert(errorMessage);
    }
  // ...  
});

    /* if (!this.getUser(email)) {
      const user = {email, password, displayName: email.substring(0, email.indexOf('@'))};
      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с таким email уже зарегистрирован');
    } */
  },
  editUser(displayName, photoURL, handler ) {

    const user = firebase.auth().currentUser;

    if (displayName) {
      if (photoURL) {
        user.updateProfile({
          displayName,
          photoURL,
        }).then(handler)
      } else {
        user.updateProfile({
          displayName,
        }).then(handler)
      }
    }
  }, 

  sendForget(email) {
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert('Письмо отправлено');
    })
    .catch(error => {
      console.log(error);
    })
  }
};

const loginForget = document.querySelector('.login-forget');

loginForget.addEventListener('click', event => {
  event.preventDefault();

  setUsers.sendForget(emailInput.value);
  emailInput.value = '';
})

const setPosts = {
  allPosts: [],
  addPost(title, text, tags, handler) {

    const user = firebase.auth().currentUser;

    this.allPosts.unshift({
      id: `postID${(+new Date()).toString(16)}-${user.uid}`,
      title,
      text,
      tags: tags.split(',').map(item => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photoURL ,
      },
      date: new Date().toLocaleString(),
      like: 0,
      comments: 0,
    })

    firebase.database().ref('post').set(this.allPosts)
    .then(() => this.getPosts(handler));
    
  },
  getPosts(handler) {
    firebase.database().ref('post').on('value', snapshot => {
      this.allPosts = snapshot.val() || [];
      handler();
    })
  }
};


const toggleAuthDom = () => {
  const user = setUsers.user;
  console.log('user: ' ,user);

  if(user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photoURL || DEFAULT_FOTO;
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
            ${tags.map(tag => `<a href="#${tag}" class="tag">#${tag}</a>`)}                       
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
  setUsers.logOut();
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

  setUsers.initUser(toggleAuthDom);
  setPosts.getPosts(showAllPosts);
};

document.addEventListener('DOMContentLoaded', () => {
  init();
})








