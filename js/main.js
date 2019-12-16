const tarjeta = document.querySelector('#tarjeta'),
      btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
      formulario = document.querySelector('#formulario-tarjeta'),
      numeroTarjeta = document.querySelector('#tarjeta .numero'),
      nombreTarjeta = document.querySelector('#tarjeta .nombre'),
      logoMarca = document.querySelector('#logo-marca'),
      firma = document.querySelector('#tarjeta .firma p'),
      mesExpiracion = document.querySelector('#tarjeta #expiracion .mes'),
      yearExpiracion = document.querySelector('#tarjeta #expiracion .year'),
      ccv = document.querySelector('#tarjeta .ccv');


const mostrarFrente = () => {
    if(tarjeta.classList.contains('active')){
        tarjeta.classList.remove('active');
    }
};

const mostrarAtras = () => {
    if(!tarjeta.classList.contains('active')){
        tarjeta.classList.add('active');
    }
};

// Evento tarjeta
tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('active');
});

// Evento boton abrir formulario
btnAbrirFormulario.addEventListener('click', () => {
    btnAbrirFormulario.classList.toggle('active');
    formulario.classList.toggle('active');
});

// Select mes

for(let i = 1; i <= 12; i++){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectMes.appendChild(opcion);
}

// Select año

const actualYear = new Date().getFullYear();
for(let i = actualYear; i <= actualYear + 8; i++){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion);
}

// Input numero de tarjeta

formulario.inputNumero.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNumero.value = valorInput = valorInput
    //Remplaza caracteres que no sean digitos /\D/ <= Non digit
    .replace(/\D/g, '')
    //Agrupa 4 digitos y los remplaza por si mismos y un espacio
    .replace(/([0-9]{4})/g, '$1 ')
    //Elimina el ultimo espacio de un string
    .trim();

    if(valorInput == ''){
        numeroTarjeta.textContent = '#### #### #### ####';
        logoMarca.innerHTML = '';
    }
    else{
        numeroTarjeta.textContent = valorInput;
    }

    if(valorInput[0] == 4){
        logoMarca.innerHTML = '';
        let imagen = document.createElement('img');
        imagen.src = 'img/logos/visa.png';
        logoMarca.appendChild(imagen);
    }
    else if(valorInput[0] == 5){
        logoMarca.innerHTML = '';
        let imagen = document.createElement('img');
        imagen.src = 'img/logos/mastercard.png';
        logoMarca.appendChild(imagen);
    }
    else{
        logoMarca.innerHTML = '';
    }

    //Volteamos la tarjeta
    mostrarFrente();
});

//Input nombre de la tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNombre.value = valorInput = valorInput
    .replace(/[^A-Z|a-z|ñ|Ñ|Á|É|Í|Ó|Ú|á|é|í|ó|ú|\s]|\|/g, '');


    if(valorInput == ''){
        nombreTarjeta.textContent = 'Jhon Doe';
    }else{
        nombreTarjeta.textContent = valorInput;
    }
    firma.textContent = valorInput;

    mostrarFrente();
});

// Select mes
formulario.selectMes.addEventListener('change', (e) => {
    mesExpiracion.textContent = e.target.value;
    mostrarFrente();
});

// Select Año
formulario.selectYear.addEventListener('change', (e) => {
    yearExpiracion.textContent = e.target.value.slice(2);
    mostrarFrente();
});

//Input CCV
formulario.inputCCV.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputCCV.value = valorInput = valorInput
    //Remplaza caracteres que no sean digitos /\D/ <= Non digit
    .replace(/\D/g, '');

    ccv.textContent = valorInput;

    mostrarAtras();
});