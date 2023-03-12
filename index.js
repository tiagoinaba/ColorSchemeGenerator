// https://www.thecolorapi.com/scheme?hex=0047AB&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=html&mode=analogic&count=6
const color1Div = document.getElementById('color-1')
const color2Div = document.getElementById('color-2')
const color3Div = document.getElementById('color-3')
const color4Div = document.getElementById('color-4')
const color5Div = document.getElementById('color-5')
const getBtn = document.getElementById('get-scheme-btn')
const form = document.getElementById('color-form')
const colorInput = document.getElementById('color-input')
const typeSelector = document.getElementById('type')
const hexCodesDiv = document.getElementById('hex-codes-div')

form.addEventListener('submit', e => {
    e.preventDefault()
    const color = colorInput.value
    const type = typeSelector.value

    getColorScheme(color, type)
})

getColorScheme("#F55A5A", "monochrome")

hexCodesDiv.addEventListener('click', function(e) {
    const hexCodes = Array.from(document.querySelectorAll('.hex-code'))
    hexCodes.map(hex => {
        let objId = hex.id
        if(e.target.id === objId) {
            navigator.clipboard.writeText(e.target.textContent)
        }
        return hex
    })

    const popup = document.querySelector('.popup')
    popup.classList.add('show')
    setTimeout(() => {
        popup.classList.remove('show')
    }, 2000);

})

function getColorScheme(color, type) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${removeHashtag(color)}&mode=${type}`)
        .then(res => res.json())
        .then(data => {
            let hexHtml = `
                <p class="hex-code" id="hex-1">${data.seed.hex.value}</p>
                <p class="hex-code" id="hex-2">${data.colors[1].hex.value}</p>
                <p class="hex-code" id="hex-3">${data.colors[2].hex.value}</p>
                <p class="hex-code" id="hex-4">${data.colors[3].hex.value}</p>
                <p class="hex-code" id="hex-5">${data.colors[4].hex.value}</p>
            `
            
            color1Div.style.backgroundColor = data.seed.hex.value;
            color2Div.style.backgroundColor = data.colors[1].hex.value;
            color3Div.style.backgroundColor = data.colors[2].hex.value;
            color4Div.style.backgroundColor = data.colors[3].hex.value;
            color5Div.style.backgroundColor = data.colors[4].hex.value;
            hexCodesDiv.innerHTML = hexHtml
        })
}



function removeHashtag(hex) {
    const numOnlyArray = hex.split('')
    if(numOnlyArray[0] === '#') {
        numOnlyArray.shift()
        const numOnlyString = numOnlyArray.join('')
        return numOnlyString
    } else {
        const numOnlyString = numOnlyArray.join('')
        return numOnlyString
    }
}
