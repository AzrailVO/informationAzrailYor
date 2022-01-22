//DOM Elements
const [...pers] = document.querySelectorAll('.site-personadzi-item')
const head = document.querySelector('.site-head')
const logo = document.querySelector('.site-head-logo')
const scene = document.getElementById('scene');
const bgGG = document.querySelector('.site-personadzi-GG')
const bgOst = document.querySelector('.site-personadzi-ostatok')
const [...buttons] = document.querySelectorAll('.site-personadzi-item-button')
const zadDiv = document.getElementById('zad')
//Code
let colors = [ '#8B4513', '#B8860B', '#8B008B', '#9932CC', '#0000CD', '#191970', '#556B2F', '#043B39', '#954300', '#808000', '#006400', '#008080', '#4B0082', '#000080']
let color
function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
pers.map(function (e) {
	let colorsE = colors
	color = randomInteger(0, colorsE.length - 1)
	console.log(colorsE)
	e.style.background = colorsE[color]
	colorsE.splice(color, 1)
	
})
const logo_mr_with_px = getComputedStyle(logo).marginRight
let logoMr = parseInt(logo_mr_with_px.replace(/\D+/g,""))
console.log(logoMr, logo.clientWidth, head)
bgGG.style.background = '#350035'
bgOst.style.background = 'rgb(128, 0, 0)'
async function funcOsn(){
	try {
		const responsePer = await fetch('http://localhost:8888/perses')
		const responseSrGr = await fetch('http://localhost:8888/srGroup')
		const responseZad = await fetch('http://localhost:8888/zadaniya')
		if (responsePer.status === 200 && responseSrGr.status === 200 && responseZad.status === 200) {
			const perses = await responsePer.json()
			const srGr = await responseSrGr.json()
			const zad = await responseZad.json()
			console.log(perses)
			console.log(srGr)
			console.log(zad)
			perses.map(function (elem) {
				if (elem.status == 'мёртв' || elem.status == 'мертв') {
						ost.insertAdjacentHTML('beforeend', `
							<div class="col-lg-12 site-personadzi-vstavka">
								${elem.name} - ${elem.rang} [${elem.status}]
							</div>
						`)
					}
				srGr.map(function(srEl){
					let srElId = eval(srEl.id.replace(/"/g))
					console.log(srEl)
					console.log(srElId)
					if (elem.group === srEl.group) {
						srElId.insertAdjacentHTML('beforeend', `
							<div class="col-lg-12 site-personadzi-vstavka">
								${elem.name} - ${elem.rang} [${elem.status}]
							</div>
						`)
					}
					if (Array.isArray(elem.group)){
						elem.group.forEach( function(groupEl){
							if (groupEl === srEl.group) {
								srElId.insertAdjacentHTML('beforeend', `
									<div class="col-lg-12 site-personadzi-vstavka">
										${elem.name} - ${elem.rang} [${elem.status}]
									</div>
								`)
							}
						})
					}

				})
			})

			zad.map((el) => {
				zadND = document.createElement('div')
				zadND.classList.add('site-personadzi-item-subtitle-zadND')
				zadDiv.insertAdjacentElement(`beforeend`, zadND)
				if (Array.isArray(el.zadNz)) {
					zadND.insertAdjacentHTML(`beforeend`, `
						<div class="site-personadzi-item-subtitle-zadN">ЗАДАНИЕ ${el.id}:</div>
						
					`)
					el.zadNz.forEach((zEl, sIter) => {
						zadNz = document.createElement('div')
						zadNz.classList.add('site-personadzi-item-subtitle-zadN-z')
						zadNz.insertAdjacentHTML(`beforeend`, `- ${zEl} [<i class='fas fa-${el.status[sIter]}'></i>]`)
						zadND.insertAdjacentElement(`beforeend`, zadNz)
						sIter++
					})

				}
			})
		} else{
			console.log(responsePer.statusText)
			console.log(responseSrGr.statusText)
		}
	} catch(error) {
		console.log(error);
	}
	
}
async function butFuncPr(){
	try {
		const response = await fetch('http://localhost:8888/butPr')
		if (response.status === 200) {
			const butPr = await response.json()
			buttons.map(function (but) {
				but.onclick = () =>{
					let btnVal = but.getAttribute('data-id')
					but.classList.add(btnVal)
					let thisBtn = document.querySelector(`.${btnVal}`)
					butPr.map(function(elPr){
						let elPrId = eval(elPr.id.replace(/"/g))

						if (btnVal === elPr.pr) {
							console.log(elPr.pr, elPrId)
							elPrId.classList.add('active-item')
							thisBtn.classList.remove('disactive')
							thisBtn.classList.add('active')
						}
					})
					
				}
			})
		} else{
			console.log(response.statusText)
		}
	} catch(error) {
		console.log(error);
	}
	
}
funcOsn()
butFuncPr()