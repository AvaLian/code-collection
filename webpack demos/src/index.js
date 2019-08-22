import test from './test.png'
import './index.css'

var img = new Image()
img.src = test
img.classList.add('avatar')
var root = document.querySelector('#root')
root.append(img)
