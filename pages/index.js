import { users } from "../scripts/utils.js";

$("document").ready(() => {
  // Container Users
  let containerListUsers = $(".peoples__container");
  
  users.forEach((user) => {
    const createUser = ({
      id,
      surname,
      name,
      thirdName,
      phone,
      email,
      birthDate,
    }) =>
    `
    <div class="people__card id='${id}'>
    <img class="people__photo" src="./images/user.png" alt="photo" />
    <div class="people__info-container">
      <p class="people__surname">${surname}</p>
      <p class="people__name">${name}</p>
      <p class="people__thirdname">${thirdName}</p>
      <p class="people__phone">${phone}</p>
      <p class="people__email">${email}</p>
      <p class="people__birthday">${birthDate}</p>
    </div>
    <div class="buttons">
      <button class="button people__card_button-delete">
        <img
          class="button__image"
          src="/icons/delete.svg"
          alt="delete__pic"
        />
      </button>
      <button class="button people__card_button-edit">
        <img
          class="button__image"
          src="/icons/edit.svg"
          alt="edit__pic"
        />
      </button>
    </div>
  </div>
  `
  ;
    let cards = createUser(user);
    containerListUsers.append(cards);
  });

  containerListUsers.append(`
  <div class="people__card people__card_add_user">
    <img class="button__image_add" src="/icons/remove.svg" alt="add_button"/>
  </div>
  `);

  // Buttons
  let openFormAddUserBtn = $(".people__card_add_user");
  let closeFormAddUserBtn = $(".popup__button_profile-cancel");
  let confirmFormAddUserBtn = $(".popup__button_save_profile");

  let openFormEditUserBtn = $(".people__card_button-edit");
  let closeFormEditUserBtn = $(".popup__button_edit-cancel");
  let confirmFormEditUserBtn = $(".popup__button_confirm-edit");

  let openFormRemoveUserBtn = $(".people__card_button-delete");
  let closeFormRemoveUserBtn = $(".popup__button_remove-cancel");

  // Popups
  let popupFormAddUser = $(".popup__add-user");
  let popupFormEditUser = $(".popup__edit-user");
  let popupFormRemoveUser = $(".popup__remove-user");

  // Inputs
  let formAddUser = $("#formAddUser");
  let formEditUser = $("#formEditUser");
  let formRemoveUser = $("formRemoveUser")

  // DatePicker
  $('#datepicker').datepicker()
  

  // TESTING ---------------------------------------------------------------------

  // -----------------------------------------------------------------------------

  // Get Values Form Add User
  confirmFormAddUserBtn.click((e) => {
    e.preventDefault();
    let inputs = $("#formAddUser :input");
    let values = {};
    inputs.each(function () {
      values[this.placeholder] = $(this).val();
    });
    console.log(values);
  });

  // Get Values Form Edit User
  confirmFormEditUserBtn.click((e) => {
    e.preventDefault();
    let inputs = $("#formEditUser :input");
    let values = {};
    inputs.each(function () {
      values[this.placeholder] = $(this).val();
    });
    console.log(values);
  });

  // Switch Class Popups
  const switchClassPopup = (tag) => {
    if (!tag.hasClass("popup__opened")) {
      tag.addClass("popup__opened");
      containerListUsers.addClass("hide");



    } else {
      containerListUsers.removeClass("hide");
      tag.removeClass("popup__opened");
    }
  };
  // -----------------------------------------------------------------------------

  // Functions Add User
  openFormAddUserBtn.click(() => {
    switchClassPopup(popupFormAddUser);
  });

  closeFormAddUserBtn.click(() => {
    switchClassPopup(popupFormAddUser);
  });

  // Functions Edit User
  openFormEditUserBtn.click((e) => {
    switchClassPopup(popupFormEditUser);
    console.log(e)
    
  });

  closeFormEditUserBtn.click(() => {
    switchClassPopup(popupFormEditUser);
  });

  // Functions Remove User
  openFormRemoveUserBtn.click(() => {
    $('#dialog').dialog({modal: true})
  });
});
