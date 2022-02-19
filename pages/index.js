import { users } from "../scripts/constant.js";

$("document").ready(function () {
  // Controllers Users
  let containerListUsers = $(".peoples__container");
  let cardId = Number;
  let c = 0;
  let newUser = {};

  // DatePicker
  $('input[name="birthdate"]').datepicker();

  // ------------------------------------Functions----------------------------------------

  function createUser({ surname, name, thirdname, phone, email, birthdate }) {
    return `
  <div class="people__card" id='${(c = c + 1)}'>
  <img class="people__photo" src="./images/user.png" alt="photo" />
  <div class="people__info-container">
    <p class="people__surname">${surname}</p>
    <p class="people__name">${name}</p>
    <p class="people__thirdname">${thirdname}</p>
    <p class="people__phone">${phone}</p>
    <p class="people__email">${email}</p>
    <p class="people__birthday">${birthdate}</p>
  </div>
  <div class="buttons">
    <button class="button people__card_button-delete">
      <img
        class="button__image"
        src="./icons/delete.svg"
        alt="delete__pic"
      />
    </button>
    <button class="button people__card_button-edit">
      <img
        class="button__image"
        src="./icons/edit.svg"
        alt="edit__pic"
      />
    </button>
  </div>
</div>
`;
  }

  function addUser(newUser) {
    let card = createUser(newUser);
    containerListUsers.append(card);
    // Вешаю обработчики событий только на созданные карты, после добавления в лист юзеров.
    // До добавления в лист переменная card все еще является строкой, поэтому пришлось вытаскивать после
    let addedCard = containerListUsers.find(`div#${c}`);

    // Popup Edit User - Open
    addedCard.find("button.people__card_button-edit").click(function () {
      $(".popup__edit-user").addClass("popup__opened");
      $(".main").addClass("hide");
      cardId = this.parentNode.parentNode.id;
      for (let i = 0; i < 6; i++) {
        $("#formEditUser :input")[i].value = containerListUsers
          .children(`div#${cardId}`)
          .find("p")[i].textContent;
      }
    });

    // Popup Remove User - Open and Confirm
    addedCard.find(".people__card_button-delete").click(function () {
      $("#dialog").dialog({
        modal: true,
        width: 350,
        height: 200,
        draggable: false,
        show: "slide",
      });
      cardId = this.parentNode.parentNode.id;
      $(".popup__button_confirm-remove").click(function (e) {
        // e.preventDefault();
        containerListUsers.children(`div#${cardId}`).remove();
        $(".ui-dialog").remove();
      });
    });
  }

  // Render Users
  users.forEach((user) => addUser(user));

  // Popup Add User - Open
  $(".button_add_user").click(function () {
    $(".popup__add-user").addClass("popup__opened");
    $(".main").addClass("hide");
  });

  // Popup Add User - Cancel
  $(".popup__button_profile-cancel").click(function () {
    $(".popup__add-user").removeClass("popup__opened");
    $(".main").removeClass("hide");
    $("#formAddUser")[0].reset();
  });

  // Popup Edit User - Close
  $(".popup__button_edit-cancel").click(function () {
    $(".popup__edit-user").removeClass("popup__opened");
    $(".main").removeClass("hide");
  });

  function getFormForValidate(form) {
    form.validate({
      rules: {
        surname: "required",
        name: "required",
        thirdname: "required",
        email: {
          required: true,
          email: true,
        },
        phone: {
          required: true,
          minlength: 11,
          maxlength: 11,
        },
      },
      messages: {
        surname: "Фамилия обязательна для заполнения",
        name: "Имя обязательно для заполнения",
        thirdname: "Отчество обязательно для заполнения",
        email: "Введите правильный Емаил. Пример: Petrov@mail.ru",
        phone: {
          required: "Телефон обязательно поле и состоит только из цифр",
          minlength: "Минимум 11 цифр",
          maxlength: "Максимум 11 цифр",
        },
        birthdate: "Дата обязательна для заполнения",
      },
      submitHandler: function () {
        if (form == formAddUser) {
          let inputs = $("#formAddUser :input");
          inputs.each(function () {
            newUser[this.name] = $(this).val();
          });
          addUser(newUser);
          $(".popup__add-user").removeClass("popup__opened");
          $(".main").removeClass("hide");
          $("#formAddUser")[0].reset();
        } else {
          for (let i = 0; i < 6; i++) {
            containerListUsers.children(`div#${cardId}`).find("p")[
              i
            ].textContent = $("#formEditUser :input")[i].value;
          }
          $(".popup__edit-user").removeClass("popup__opened");
          $(".main").removeClass("hide");
        }
      },
    });
  }

  let formAddUser = $('form[id="formAddUser"]');
  let formEditUser = $('form[id="formEditUser"]');

  getFormForValidate(formAddUser);
  getFormForValidate(formEditUser);
});
