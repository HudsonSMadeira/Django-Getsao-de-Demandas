// regular expression for validation
const strRegex =  /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

// -------------------------------------------------- //

const countryList = document.getElementById('country-list');
const fullscreenDiv = document.getElementById('fullscreen-div');
const modal = document.getElementById('modal');
const addBtn = document.getElementById('add-btn');
const closeBtn = document.getElementById('close-btn');
const modalBtns = document.getElementById('modal-btns');
const form = document.getElementById('modal');
const addrBookList = document.querySelector('#addr-book-list tbody');

// -------------------------------------------------- //
let diciplina = professores = semestre = horas = "";

// Address class
class Address{
  constructor(id, diciplina, professores, semestre, horas){
    this.id = id;
    this.diciplina = diciplina;
    this.professores = professores;
    this.semestre = semestre;
    this.horas = horas;        
  }

  static getAddresses(){
    // from local storage
    let addresses4;
    if(localStorage.getItem('addresses4') == null){
        addresses4 = [];
    } else {
        addresses4 = JSON.parse(localStorage.getItem('addresses4'));
    }
    return addresses4;
  }

  static addAddress(address){
    const addresses4 = Address.getAddresses();
    addresses4.push(address);
    localStorage.setItem('addresses4', JSON.stringify(addresses4));
  }

  static deleteAddress(id){
    const addresses4 = Address.getAddresses();
    addresses4.forEach((address, index) => {
      if(address.id == id){
        addresses4.splice(index, 1);
      }
    });
    localStorage.setItem('addresses4', JSON.stringify(addresses4));
    form.reset();
    UI.closeModal();
    addrBookList.innerHTML = "";
    UI.showAddressList();
  }

  static updateAddress(item){
    const addresses4 = Address.getAddresses();
    addresses4.forEach(address => {
      if(address.id == item.id){
        address.diciplina = item.diciplina;
        address.professores = item.professores;
        address.semestre = item.semestre;
        address.horas = item.horas;
      }
    });
    localStorage.setItem('addresses4', JSON.stringify(addresses4));
    addrBookList.innerHTML = "";
    UI.showAddressList();
  }
}

// UI class
class UI{
  static showAddressList(){
    const addresses4 = Address.getAddresses();
    addresses4.forEach(address => UI.addToAddressList(address));
  }

  static addToAddressList(address){
  const tableRow = document.createElement('tr');
  tableRow.setAttribute('data-id', address.id);
  tableRow.innerHTML = `
    <td>${address.diciplina}</td>
    <td>${address.professores}</td>
    <td>${address.semestre}</td>
    <td>${address.horas}</td>
  `;
  addrBookList.appendChild(tableRow);

  /* <td>${address.ativPesquisaExtencao}</td>
      <td>${address.capacitação}</td> */
  }

  static showModalData(id){
    const addresses4 = Address.getAddresses();
    addresses4.forEach(address => {
      if(address.id == id){
        form.diciplina_a.value = address.diciplina;
        form.professores_s.value = address.professores;
        form.semestre_e.value = address.semestre;
        form.horas_s.value = address.horas;
        
        document.getElementById('modal-title').innerHTML = "Adicionar Diciplinas";

        document.getElementById('modal-btns').innerHTML = `
          <button type = "submit" id = "update-btn" data-id = "${id}">Editar </button>
          <button type = "button" id = "delete-btn" data-id = "${id}">Excluir </button>
        `;
      }
    });
  }

  static showModal(){
    modal.style.display = "block";
    fullscreenDiv.style.display = "block";
  }

  static closeModal(){
    modal.style.display = "none";
    fullscreenDiv.style.display = "none";
  }
}

// DOM Content Loaded
window.addEventListener('DOMContentLoaded', () => {
    loadJSON(); // loading country list from json file
    eventListeners();
    UI.showAddressList();
});

// event listeners
function eventListeners(){
    // show add item modal
    addBtn.addEventListener('click', () => {
      form.reset();
      document.getElementById('modal-title').innerHTML = "Adicionar Diciplinas";
      UI.showModal();
      document.getElementById('modal-btns').innerHTML = `
        <button type = "submit" id = "save-btn"> Salvar </button>
      `;
    });

    // close add item modal
    closeBtn.addEventListener('click', UI.closeModal);

    // add an address item
    modalBtns.addEventListener('click', (event) => {
      event.preventDefault();
      if(event.target.id == "save-btn"){
        let isFormValid = getFormData();
        if(!isFormValid){
          form.querySelectorAll('input').forEach(input => {
            setTimeout(() => {
              input.classList.remove('errorMsg');
            }, 1500);
          });
        } else {
          let allItem = Address.getAddresses();
          let lastItemId = (allItem.length > 0) ? allItem[allItem.length - 1].id : 0;
          lastItemId++;

          const addressItem = new Address(lastItemId, diciplina, professores, semestre, horas);
          Address.addAddress(addressItem);
          UI.closeModal();
          UI.addToAddressList(addressItem);
          form.reset();
        }
      }
    });

    // table row items
    addrBookList.addEventListener('click', (event) => {
        UI.showModal();
        let trElement;
        if(event.target.parentElement.tagName == "TD"){
            trElement = event.target.parentElement.parentElement;
        }

        if(event.target.parentElement.tagName == "TR"){
            trElement = event.target.parentElement;
        }

        let viewID = trElement.dataset.id;
        UI.showModalData(viewID);
    });

    // delete an address item
    modalBtns.addEventListener('click', (event) => {
        if(event.target.id == 'delete-btn'){
          Address.deleteAddress(event.target.dataset.id);
        }
    });

    // update an address item
    modalBtns.addEventListener('click', (event) => {
        event.preventDefault();
        if(event.target.id == "update-btn"){
            let id = event.target.dataset.id;
            let isFormValid = getFormData();
            if(!isFormValid){
              form.querySelectorAll('input').forEach(input => {
                  setTimeout(() => {
                    input.classList.remove('errorMsg');
                  }, 1500);
              });
            } else {
              const addressItem = new Address(id, diciplina, professores, semestre, horas);
              Address.updateAddress(addressItem);
              UI.closeModal();
              form.reset();
            }
        }
    });
}

// load countries list
function loadJSON(){
    fetch('countries.json')
    .then(response => response.json())
    .then(data => {
        let html = "";
        data.forEach(country => {
            html += `
                <option> ${country.country} </option>
            `;
        });
        countryList.innerHTML = html;
    })
}

// get form data ---------------- Verificar se os campos estão preenchidos --------------------------

function getFormData(){
  let inputValidStatus = [];
  // console.log(form.addr_ing_name.value, form.diciplinas_D.value, form.laboratoarios_L.value, form.carga_horaria.value, form.a_s.value, form.descricao_D.value);
  
  diciplina = form.diciplina_a.value;

  professores = form.professores_s.value;
  
  semestre = form.semestre_e.value;
  
  horas = form.horas_s.value;

  return inputValidStatus.includes(false) ? false : true;
}

function addErrMsg(inputBox){
  inputBox.classList.add('errorMsg');
}

// get form data ---------------- Verificar se os campos estão preenchidos --------------------------

function getFormData(){
    let inputValidStatus = [];
    // console.log(form.addr_ing_name.value, form.diciplinas_D.value, form.laboratoarios_L.value, form.carga_horaria.value, form.a_s.value, form.descricao_D.value);
    
    addrName = form.addr_ing_name.value;

    diciplinas = form.diciplinas_D.value;
    
    laboratoarios = form.laboratoarios_L.value;
    
    cargaHoraria = form.carga_horaria.value;
   
    ass = form.a_s.value;
    
    descricao = form.descricao_D.value;
   

    return inputValidStatus.includes(false) ? false : true;
}


function addErrMsg(inputBox){
    inputBox.classList.add('errorMsg');
}


// search-box open close js code
let navbar = document.querySelector(".navbar");
let searchBox = document.querySelector(".search-box .bx-search");
// let searchBoxCancel = document.querySelector(".search-box .bx-x");

searchBox.addEventListener("click", ()=>{
  navbar.classList.toggle("showInput");
  if(navbar.classList.contains("showInput")){
    searchBox.classList.replace("bx-search" ,"bx-x");
  }else {
    searchBox.classList.replace("bx-x" ,"bx-search");
  }
});

// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
menuOpenBtn.onclick = function() {
navLinks.style.left = "0";
}
menuCloseBtn.onclick = function() {
navLinks.style.left = "-100%";
}


// sidebar submenu open close js code
let htmlcssArrow = document.querySelector(".htmlcss-arrow");
htmlcssArrow.onclick = function() {
 navLinks.classList.toggle("show1");
}
let moreArrow = document.querySelector(".more-arrow");
moreArrow.onclick = function() {
 navLinks.classList.toggle("show2");
}
let jsArrow = document.querySelector(".js-arrow");
jsArrow.onclick = function() {
 navLinks.classList.toggle("show3");
}

