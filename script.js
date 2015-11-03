(function(){

  var editIndex = "";

  'use strict';

  $(document).ready(init);

  var contacts = localStorage.contacts ? JSON.parse(localStorage.contacts) : [];
  updateList();

  function init() {
    $('#add').click(addContact);
    $('#list').on('click', '.remove', removeContact);
    $('#list').on('click', '.edit', editContact);
    $('.submit').on('click', saveContact);
  }

  function editContact(e) {
    var $target = $(e.target);
    var $targetRow = $target.closest('tr');
    var $tdName = $targetRow.children('.name');
    var $tdEmail = $targetRow.children('.email');
    var $tdPhone = $targetRow.children('.phone');
    var $tdAddress = $targetRow.children('.address');
    editIndex = $targetRow.index();
    $('.newName').val($tdName.text());
    $('.newEmail').val($tdEmail.text());
    $('.newPhone').val($tdPhone.text());
    $('.newAddress').val($tdAddress.text());
  }

  function saveContact(e) {
    var $name = $('.newName').val();
    console.log($name);
    var $email = $('.newEmail').val();
    var $phone = $('.newPhone').val();
    var $address = $('.newAddress').val();
    contacts[editIndex].name = $name;
    contacts[editIndex].email = $email;
    contacts[editIndex].phone = $phone;
    contacts[editIndex].address = $address;

    updateList();
    saveLocalStorage();
  }

  function removeContact(e) {
    var $target = $(e.target);
    var $targetRow = $target.closest('tr');

    var index = $targetRow.index();
    contacts.splice(index, 1);

    updateList();
    saveLocalStorage();
  }

  function addContact() {
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var address = $('#address').val();

    var contact = {
      name: name,
      email: email,
      phone: phone,
      address, address
    };

    contacts.push(contact);

    updateList();
    saveLocalStorage();
  }

  function updateList() {
    $('#list').empty();

    if(contacts.length){
      $('table.table').show();
    } else {
      $('table.table').hide();
    }

    var contactElements = contacts.map(function(contact){
      var $tr = $('#sample').clone();
      $tr.removeAttr('id');
      $tr.children('.name').text(contact.name);
      console.log($tr);
      $tr.children('.email').text(contact.email);
      $tr.children('.phone').text(contact.phone);
      $tr.children('.address').text(contact.address);
      $tr.show();
      return $tr;
    });
    console.log(contactElements);

    $('#list').append(contactElements);
    $('#sample').hide();
  }

  function saveLocalStorage() {
    localStorage.contacts = JSON.stringify(contacts);
  }

  function sortContacts(){
    
  }

})();