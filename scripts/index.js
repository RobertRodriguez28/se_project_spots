const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },

  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },

  {
    name: "Tunnel With Morning Light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },

  {
    name: "Mountain House",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileFormEL = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const newPostBtnFormEl = newPostModal.querySelector(".modal__form");
const newPostNameInput = newPostModal.querySelector("#card-image-input");
const newPostDescriptionInput = newPostModal.querySelector(
  "#profile-caption-input"
);

function handleNewPost(evt) {
  evt.preventDefault();
  console.log(newPostNameInput.value);
  console.log(newPostDescriptionInput.value);
  newPostModal.classList.remove("modal_is-opened");
}

newPostBtnFormEl.addEventListener("submit", handleNewPost);

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEL = document.querySelector(".profile__description");

editProfileBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEL.textContent;
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEL.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}

editProfileFormEL.addEventListener("submit", handleProfileFormSubmit);
initialCards.forEach(function (card) {
  console.log(card.name);
  console.log(card.link);
});

//TODO:implemnt smooth transions in modal.css
