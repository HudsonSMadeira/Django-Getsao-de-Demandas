// Grafico -------------------------------------- //

const ctx = document.getElementById('myChart');
const earning = document.getElementById('earning');


new Chart(earning, {
    type: 'line',
    data: {
        labels: ['Carga Horária', 'Ensino','Turmas'],
        datasets: [{
            label: 'Média',
            data: [29, 13, 5],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        Responsive: true
    }
});


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
let addrName = cargaHoraria = observacoes = ensino = turmas  = ativDidapedag = orienracoes = ativAdministrativas = ativRepresentacoes = ativPesquisaExtencao = capacitação = "";

// Address class
class Address{
    constructor(id, addrName, observacoes, cargaHoraria, ensino, turmas,  ativDidapedag, orienracoes, ativAdministrativas, ativRepresentacoes, ativPesquisaExtencao, capacitação){
        this.id = id;
        this.addrName = addrName;
        this.observacoes = observacoes;
        this.cargaHoraria = cargaHoraria;
        this.ensino = ensino;
        this.turmas = turmas;
        this.ativDidapedag = ativDidapedag;
        this.orienracoes = orienracoes;
        this.ativAdministrativas = ativAdministrativas;
        this.ativRepresentacoes = ativRepresentacoes;
        this.ativPesquisaExtencao = ativPesquisaExtencao;
        this.capacitação = capacitação;
    }

    static getAddresses(){
        // from local storage
        let addresses2;
        if(localStorage.getItem('addresses2') == null){
            addresses2 = [];
        } else {
            addresses2 = JSON.parse(localStorage.getItem('addresses2'));
        }
        return addresses2;
    }

    static addAddress(address){
        const addresses2 = Address.getAddresses();
        addresses2.push(address);
        localStorage.setItem('addresses2', JSON.stringify(addresses2));
    }

    static deleteAddress(id){
        const addresses2 = Address.getAddresses();
        addresses2.forEach((address, index) => {
            if(address.id == id){
                addresses2.splice(index, 1);
            }
        });
        localStorage.setItem('addresses2', JSON.stringify(addresses2));
        form.reset();
        UI.closeModal();
        addrBookList.innerHTML = "";
        UI.showAddressList();
    }

    static updateAddress(item){
        const addresses2 = Address.getAddresses();
        addresses2.forEach(address => {
            if(address.id == item.id){
                address.addrName = item.addrName;
                address.observacoes = item.observacoes;
                address.cargaHoraria = item.cargaHoraria;
                address.ensino = item.ensino;
                address.turmas = item.turmas;
                address.ativDidapedag = item.ativDidapedag;
                address.orienracoes = item.orienracoes;
                address.ativAdministrativas = item.ativAdministrativas;
                address.ativRepresentacoes = item.ativRepresentacoes;
                address.ativPesquisaExtencao = item.ativPesquisaExtencao;
                address.capacitação = item.capacitação;
            }
        });
        localStorage.setItem('addresses2', JSON.stringify(addresses2));
        addrBookList.innerHTML = "";
        UI.showAddressList();
    }
}

// UI class
class UI{
    static showAddressList(){
        const addresses2 = Address.getAddresses();
        addresses2.forEach(address => UI.addToAddressList(address));
    }

    static addToAddressList(address){
        const tableRow = document.createElement('tr');
        tableRow.setAttribute('data-id', address.id);
        tableRow.innerHTML = `
            <td>${address.addrName}</td>
            <td>${address.observacoes}</td>
            <td>${address.cargaHoraria}</td>
            <td>${address.ensino}</td>
            <td>${address.turmas}</td> 
            <td>${address.ativDidapedag}</td>
            <td>${address.orienracoes}</td>
            <td>${address.ativAdministrativas}</td>
            <td>${address.ativRepresentacoes}</td>
            <td>${address.ativPesquisaExtencao}</td>
            <td>${address.capacitação}</td>
        `;
        addrBookList.appendChild(tableRow);

        /* <td>${address.ativPesquisaExtencao}</td>
            <td>${address.capacitação}</td> */
    }

    static showModalData(id){
        const addresses2 = Address.getAddresses();
        addresses2.forEach(address => {
            if(address.id == id){
                form.addr_ing_name.value = address.addrName;
                form.observacoes_o.value = address.observacoes;
                form.carga_horaria.value = address.cargaHoraria;
                form.ensino_e.value = address.ensino;
                form.turmas_t.value = address.turmas;
                form.Ativ_Didat_Pedag.value = address.ativDidapedag;
                form.orienracoes_o.value = address.orienracoes;
                form.ativ_administrativas.value = address.ativAdministrativas;
                form.ativ_representacoes.value = address.ativRepresentacoes;
                form.ativ_pesquisa_extencao.value = address.ativPesquisaExtencao;
                form.capacitação_c.value = address.capacitação;
                document.getElementById('modal-title').innerHTML = "Adicionar Professores";

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
        document.getElementById('modal-title').innerHTML = "Adicionar Professores";
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

                const addressItem = new Address(lastItemId, addrName, observacoes, cargaHoraria, ensino, turmas,  ativDidapedag, orienracoes, ativAdministrativas, ativRepresentacoes, ativPesquisaExtencao, capacitação);
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
                const addressItem = new Address(id, addrName, observacoes, cargaHoraria, ensino, turmas, ativDidapedag, orienracoes, ativAdministrativas, ativRepresentacoes, ativPesquisaExtencao, capacitação);
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
    // console.log(form.addr_ing_name.value, form.carga_horaria.value, form.ensino_e.value, form.turmas_t.value, form.observacoes_o.value, form.Ativ_Didat_Pedag.value, form.orienracoes_o.value, form.ativ_administrativas.value, form.ativ_representacoes.value, form.ativ_pesquisa_extencao.value, form.capacitação_c.value);
    
    addrName = form.addr_ing_name.value;

    observacoes = form.observacoes_o.value;
    
    cargaHoraria = form.carga_horaria.value;
    
    ensino = form.ensino_e.value;
   
    turmas = form.turmas_t.value;
   
    ativDidapedag = form.Ativ_Didat_Pedag.value;
    
    orienracoes = form.orienracoes_o.value;
    
    ativAdministrativas = form.ativ_administrativas.value;
    
    ativRepresentacoes = form.ativ_representacoes.value;

    ativPesquisaExtencao = form.ativ_pesquisa_extencao.value;

    capacitação = form.capacitação_c.value;

    return inputValidStatus.includes(false) ? false : true;
}


function addErrMsg(inputBox){
    inputBox.classList.add('errorMsg');
}

/* ---------------------------------------------------------- */

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

