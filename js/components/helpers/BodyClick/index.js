export function bodyClick(selector, callback) {
    let listener = function(e) {
        if (!e.target.closest(selector)) {
            callback()
            document.body.removeEventListener("mousedown", listener)
        }
    }

    document.body.addEventListener("mousedown", listener)
}
