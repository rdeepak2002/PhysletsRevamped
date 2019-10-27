
function createIcon(name) {
    return `
        <svg class="icon" viewBox="0 0 8 8">
            <use xlink:href="/images/open-iconic.svg#${name}" class="icon-${name}"></use>
        </svg>
    `
}