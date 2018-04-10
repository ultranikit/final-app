/* eslint-disable camelcase,no-undef,no-use-before-define */
import Component from './component';

class UserAdd extends Component {
  init() {
    this.on('click', this.addUser.bind(this));
  }

  addUser() {
    let group_id = 0;
    const first_name = document.querySelector('#first_name').value;
    const last_name = document.querySelector('#last_name').value;
    const street = document.querySelector('#street').value;
    const zip_code = document.querySelector('#zip_code').value;
    const city = document.querySelector('#city').value;
    const phone = document.querySelector('#phone').value;
    const group = document.querySelector('#modalAdd').querySelector('.selected');
    // const groupText = group.innerText;
    // console.log(groupText);
    const credit = document.querySelector('#range_credit');
    const creditValue = credit.value;

    if (group.innerText === 'Administrators') {
      group_id = 1;
    } else if (group.innerText === 'Merchants') {
      group_id = 2;
    } else if (group.innerText === 'Operators') {
      group_id = 3;
    } else if (group.innerText === 'Clients') {
      group_id = 4;
    } else if (group.innerText === 'Resellers') {
      group_id = 5;
    }

    const data = {
      group_id,
      name: `${first_name} ${last_name}`,
      street,
      zip_code,
      city,
      phone,
      credits: creditValue,
    };

    this.emit('addUser', data, document);
  }
}

const addButton = document.querySelector('#btn-add-user');
addButton.addEventListener('click', openAddModal);
function openAddModal() {
  const modalAdd = document.querySelector('#modalAdd');
  modalAdd.innerHTML +=
    '  <div class="modal-content">\n' +
    '    <h4>Add new member</h4>\n' +
    '    <div class="row">\n' +
    '      <form class="col s12">\n' +
    '        <div class="row">\n' +
    '          <div class="input-field col s6">\n' +
    '            <input id="first_name" type="text" class="validate" pattern="(?=.*[A-Z]).{2,14}">\n' +
    '            <label for="first_name" data-error="wrong" data-success="right">First Name</label>\n' +
    '          </div>\n' +
    '          <div class="input-field col s6">\n' +
    '            <input id="last_name" type="text" class="validate" pattern="(?=.*[A-Z]).{2,14}">\n' +
    '            <label for="last_name" data-error="wrong" data-success="right">Last Name</label>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '        <div class="row">\n' +
    '          <div class="input-field col s12">\n' +
    '            <input id="street" type="text" class="validate">\n' +
    '            <label for="street" data-error="wrong" data-success="right">Street</label>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '        <div class="row">\n' +
    '          <div class="input-field col s6">\n' +
    '            <input id="zip_code" type="number" max="99999" class="validate">\n' +
    '            <label for="zip_code">Zip code</label>\n' +
    '          </div>\n' +
    '          <div class="input-field col s6">\n' +
    '            <input id="city" type="text" class="validate">\n' +
    '            <label for="city">City</label>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '        <div class="row">\n' +
    '          <div class="input-field col s12">\n' +
    '            <input id="phone" type="text" class="validate">\n' +
    '            <label for="phone">Phone number</label>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '        <div class="row">\n' +
    '          <div class="input-field col s12">\n' +
    '            <select id="group_select">\n' +
    '              <option value="" disabled selected>Choose group</option>\n' +
    '              <option value="1">Administrators</option>\n' +
    '              <option value="2">Merchants</option>\n' +
    '              <option value="3">Operators</option>\n' +
    '              <option value="4">Clients</option>\n' +
    '              <option value="5">Resellers</option>\n' +
    '            </select>\n' +
    '            <label>Group</label>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '        <div class="row">\n' +
    '          <div class="input-field col s12">\n' +
    '            <label for="range_credit">Credit</label>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '        <div class="row">\n' +
    '          <div class="input-field col s12">\n' +
    '            <input id="range_credit" type="range" min="0" max="1000" />\n' +
    '          </div>\n' +
    '        </div>\n' +
    '      </form>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '  <div class="modal-footer">\n' +
    '    <a class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>\n' +
    '    <a id="createUser" class="modal-action modal-close waves-effect waves-green btn-flat">Create</a>\n' +
    '  </div>\n';

  const modal = document.querySelector('#modalAdd');
  const select_group = document.querySelector('#group_select');
  const range = document.querySelector('#range_credit');
  const instance = M.Modal.init(modal, {});
  M.FormSelect.init(select_group, {});
  M.Range.init(range, {});
  instance.open();

  const createButton = document.querySelector('#createUser');
  const modalClick = document.querySelector('.modal-content');
  modalClick.addEventListener('click', checkValid);
  function checkValid() {
    const getInvalid = modalClick.getElementsByClassName('invalid');
    if (getInvalid.length >= 1) {
    // eslint-disable-next-line no-plusplus
      for (let i = 0; i < getInvalid.length; i++) {
        if (getInvalid[i].classList.contains('invalid')) {
          createButton.setAttribute('disabled', 'true');
        }
      }
    } else {
      createButton.removeAttribute('disabled');
    }
  }

  const clearOnOverlay = document.querySelector('.modal-overlay');
  const clearOnButton = document.querySelector('#modalAdd').querySelector('.modal-close');
  function clearModal() {
    modalAdd.innerHTML = null;
  }
  clearOnOverlay.addEventListener('click', clearModal);
  clearOnButton.addEventListener('click', clearModal);
  UserAdd.bindTo('#createUser');
}