export const dynamicTextareaDirective = {
    mounted(el) {
        el.setHeight = () => {
            // console.log('hi');
            const elTextarea = el
            const tempTextarea = document.createElement('textarea')
            tempTextarea.style.width = `${elTextarea.clientWidth}px`
            tempTextarea.rows = 1
            tempTextarea.className = 'temp-textarea'
            tempTextarea.value = elTextarea.value || ' '
            document.body.appendChild(tempTextarea)
            elTextarea.style.height = `${tempTextarea.scrollHeight}px`
            document.body.removeChild(tempTextarea)
        }
        el.setHeight()
        el.addEventListener('input', el.setHeight)
    },
    updated(el, { value }) {
        if (!value) el.setHeight()
    },
    unmounted(el) {
        el.removeEventListener('input', el.setHeight)
    },
}
