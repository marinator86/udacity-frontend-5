import { handleEvent } from './js/formHandler'
import { loadInit } from './js/initHandler'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/form.scss'
import './styles/results.scss'
import './styles/weatherBox.scss'

document.addEventListener("DOMContentLoaded", event => {
    loadInit();
});

export { handleEvent }