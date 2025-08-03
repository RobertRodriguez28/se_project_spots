const initialCards = [
  {
    name: "Mexico City",
    link: "https://images.unsplash.com/photo-1610220940671-c7ec20589791?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "Madrid Spain",
    link: "https://images.unsplash.com/photo-1570135460230-1407222b82a2?q=80&w=1016&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "Buenos Aries Argentina",
    link: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "Medellin Colombia",
    link: "https://images.unsplash.com/photo-1690535707954-597ff9dbcdc3?q=80&w=1047&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "Sao Paulo Brazil",
    link: "https://images.unsplash.com/photo-1572894234976-d961418c709d?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "San Jose Costa Rica",
    link: "https://images.unsplash.com/photo-1666606654536-6d4c20948779?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
const newPostImageInput = newPostModal.querySelector("#card-image-input");
const newPostDescriptionInput = newPostModal.querySelector(
  "#profile-caption-input"
);
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image-preview");
const previewCaptionEL = previewModal.querySelector(".modal__caption");

function handleNewPost(evt) {
  evt.preventDefault();

  console.log(newPostDescriptionInput.value);
  renderCard({
    link: newPostImageInput.value,
    name: newPostDescriptionInput.value,
  });
  evt.target.reset();
  closeModal(newPostModal);
  toggleButtonState(
    [newPostImageInput, newPostDescriptionInput],
    evt.submitter
  );
}

newPostBtnFormEl.addEventListener("submit", handleNewPost);

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEL = document.querySelector(".profile__description");

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}
const allModals = document.querySelectorAll(".modal");

allModals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}
editProfileBtn.addEventListener("click", function () {
  openModal(editProfileModal);
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEL.textContent.trim();
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});
newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEL.textContent = editProfileDescriptionInput.value;

  closeModal(editProfileModal);
  evt.target.reset();
  toggleButtonState(
    [editProfileNameInput, editProfileDescriptionInput],
    evt.submitter
  );
}

editProfileFormEL.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtnEl = cardElement.querySelector(".card__like-button");
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewCaptionEL.textContent = data.name;
    openModal(previewModal);
  });

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;
  console.log(cardElement);
  console.log(cardLikeBtnEl);
  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-button_active");
  });
  cardDeleteBtnEl.addEventListener("click", () => {
    cardElement.remove();
  });
  return cardElement;
}
const cardPreviewCloseBtn = previewModal.querySelector(".modal__close-btn");
cardPreviewCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__lists");

function renderCard(data) {
  const cardElement = getCardElement(data);
  cardsList.prepend(cardElement);
}
initialCards.forEach(function (card) {
  renderCard(card);
});

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}
