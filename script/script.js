const loadAll = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(response => response.json())
        .then(data => show(data.data))
};

const show = (lessons) => {
    const container = document.getElementById('container-1');
    container.innerHTML = '';
    for (let lesson of lessons) {
        const div = document.createElement('div');
        div.innerHTML = `<button class="btn btn-outline btn-primary"><i class="fa-brands fa-leanpub"></i> Lesson-${lesson.level_no}</button>
        `;

        container.appendChild(div);
    }

}

loadAll();