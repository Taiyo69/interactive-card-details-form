const formContainer = document.querySelector(".form__container");
const form = document.querySelector(".form");

const modalButton = document.querySelector(".modal__button");
const modal = document.querySelector(".modal__container");

const inputs = document.querySelectorAll(".form__input");
const errors = document.querySelectorAll(".form__input--error");
const cardTexts = document.querySelectorAll(".card__text");

const pattern = {
	name: /^[a-zA-ZÀ-ÿ\s]{5,20}$/,
	number: /^\d{16,16}$/,
	exp: /^\d{2,2}$/,
	cvc: /^\d{3,3}$/,
	whiteSpacing: /\s/g,
	numberSpacing: /([0-9]{4})/g
}

const validations = {
	name: false,
	number: false,
	yy: false,
	mm: false,
	cvc: false,
	'': false
}

const values = {
	name: "Jane Appleseed",
	number: "0000 0000 0000 0000",
	yy: "00",
	mm: "00",
	cvc: "000"
}

const comprobarFormulario = (e) => {
	switch(e.target.name) {
		case "name":
			validarCampo(pattern.name, e.target, 'name');
			validations["name"] = true;
		break;
		case "number":
			if (e.target.value.replace(pattern.whiteSpacing, '').length == 16) {
				form.inputNumber.value = e.target.value.replace(pattern.whiteSpacing, '').replace(pattern.numberSpacing, '$1 ').trim();
			}
			validarCampo(pattern.number, e.target, 'number');
			validations["number"] = true;
		break;
		case "month":
			validarCampo(pattern.exp, e.target, 'mm');
			if (Number(e.target.value) < 13 && e.target.value.length == 2) {
				validations["mm"] = true;
			}
		break;
		case "year":
			validarCampo(pattern.exp, e.target, 'yy');
			validations["yy"] = true;
		break;
		case "CVC":
			validarCampo(pattern.cvc, e.target, 'cvc');			
			validations["cvc"] = true;
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	let inputValue = input.value.replace(pattern.whiteSpacing, '');
	if (expresion.test(inputValue)) {
		document.getElementById(campo).classList.remove("form__input--error-active");
		input.classList.remove("form__input--invalid");
		values[campo] = input.value;
	} else {
		document.getElementById(campo).classList.add("form__input--error-active");
		input.classList.add("form__input--invalid");
	}
}

const cardDetailsRefresh = () => {
	cardTexts[0].textContent = values.cvc;
	cardTexts[1].textContent = values.number;
	cardTexts[2].textContent = values.name;
	cardTexts[3].textContent = `${values.mm}/${values.yy}`; 
}

inputs.forEach((input) => {
	input.addEventListener('keyup', comprobarFormulario);
	input.addEventListener('blur', comprobarFormulario);
});

form.addEventListener('submit', (e) => {
	e.preventDefault();

	if (validations.name && validations.number && validations.mm && validations.yy && validations.cvc) {
		cardDetailsRefresh();
		form.classList.toggle("form--hide");
		modal.classList.toggle("modal--active");
	} else {
	    for (let i = 0; i < 5; i++) {
			switch(validations[errors[i].id]) {
				case false:
					errors[i].classList.add("form__input--error-active");
					inputs[i].classList.add("form__input--invalid");
				break;
				case undefined:
					errors[i].classList.add("form__input--error-active");
					inputs[i].classList.add("form__input--invalid");
				break;
			}
		}
	}
});

modalButton.addEventListener('click', () => {
	form.classList.toggle("form--hide");
	modal.classList.toggle("modal--active");
});