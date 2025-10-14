import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  toggleButtonState,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { setButtonText } from "../utils/helpers.js";
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4d19c944-b278-4711-8007-360473543820",
    "Content-Type": "application/json",
  },
});

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEL = document.querySelector(".profile__description");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__lists");
api;

// EditProfile Modal
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

// New Post Modal
const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostBtnFormEl = newPostModal.querySelector(".modal__form");
const newPostImageInput = newPostModal.querySelector("#card-image-input");
const newPostDescriptionInput = newPostModal.querySelector(
  "#profile-caption-input"
);

// PreviewModal
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image-preview");
const previewCaptionEL = previewModal.querySelector(".modal__caption");

// AvatarModal
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#edit-avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarImage = document.querySelector(".profile__avatar");

// DeleteModal
const deleteModal = document.querySelector("#delete-modal");
const deleteConfirmButton = deleteModal.querySelector(
  ".modal__button_type_delete"
);
const deleteCancelButton = deleteModal.querySelector(
  ".modal__button_type_cancel"
);
const deleteCloseButton = deleteModal.querySelector(".modal__close-btn");

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

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
let selectedCardId;
let selectedCardEl;
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtnEl = cardElement.querySelector(".card__like-button");
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  const cardPreviewCloseBtn = previewModal.querySelector(".modal__close-btn");

  cardDeleteBtnEl.addEventListener("click", () => {
    selectedCardId = data._id;
    selectedCardEl = cardElement;

    openModal(deleteModal);
    cardDeleteBtnEl.addEventListener("click", () =>
      handleDeleteCard(cardElement, data)
    );
  });

  cardPreviewCloseBtn.addEventListener("click", () => {
    closeModal(previewModal);
  });

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
  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-button_active");
  }
  cardLikeBtnEl.addEventListener("click", () => {
    api
      .changeLikeStatus(data._id, data.isLiked)
      .then((updateCard) => {
        data.isLiked = updateCard.isLiked;
        if (updateCard.isLiked) {
          cardLikeBtnEl.classList.toggle("card__like-button_active");
        } else {
          cardLikeBtnEl.classList.remove("card__like-button_active");
        }
      })
      .catch(console.error);
  });
  return cardElement;
}

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEL.textContent;
  resetValidation(
    editProfileFormEL,
    [editProfileNameInput, editProfileDescriptionInput],
    settings
  );
  openModal(editProfileModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Save", "Saving");
  api
    .editUserInfo(editProfileNameInput.value, editProfileDescriptionInput.value)
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEL.textContent = data.about;
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });

  closeModal(editProfileModal);
  evt.target.reset();
}

editProfileFormEL.addEventListener("submit", handleProfileFormSubmit);

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

deleteConfirmButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  api
    .deleteCard(selectedCardId)
    .then(() => {
      closeModal(deleteModal);
      selectedCardEl.remove();
    })
    .catch((err) => {
      console.error("Failed to delete card:", err);
    });
});

api
  .getAppInfo()
  .then(([cards, userData]) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
    const avatarEl = document.querySelector(".profile__avatar");
    if (avatarEl) avatarEl.src = userData.avatar;
    profileNameEl.textContent = userData.name;
    profileDescriptionEL.textContent = userData.about;
  })
  .catch(console.error);
function renderCard(data) {
  const cardElement = getCardElement(data);
  cardsList.prepend(cardElement);
}
function handleNewPost(evt) {
  evt.preventDefault();
  let submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Save", "Saving");
  api
    .addNewCard(newPostDescriptionInput.value, newPostImageInput.value)
    .then((card) => {
      renderCard(card);
      console.log(newPostDescriptionInput.value);
      evt.target.reset();
      toggleButtonState(
        [newPostImageInput, newPostDescriptionInput],
        evt.submitter,
        settings
      );
    })
    .catch((err) => {
      console.err("Add new card:", err);
    })
    .finally(() => {
      setButtonText(submitBtn, false);
    });
  closeModal(newPostModal);
}
newPostBtnFormEl.addEventListener("submit", handleNewPost);
newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
  newPostImageInput.value = "";
  newPostDescriptionInput.value = "";
});
// AvatarModal Logic
avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarCloseBtn.addEventListener("click", function () {
  closeModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  let submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Save", "Saving");

  api
    .editAvatarInfo(avatarInput.value)
    .then(({ avatar }) => {
      avatarImage.src = avatar;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitBtn, false);
      closeModal(avatarModal);
    });
}

function resetDeleteSelection() {
  selectedCardId = null;
  selectedCardEl = null;
}
deleteCloseButton.addEventListener("click", function () {
  closeModal(deleteModal);
  resetDeleteSelection();
});
deleteCancelButton.addEventListener("click", function () {
  closeModal(deleteModal);
  resetDeleteSelection();
});

enableValidation(settings);
