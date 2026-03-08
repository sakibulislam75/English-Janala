//load all the lesson class
const loadAll = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((response) => response.json())
        .then((data) => show(data.data));
};

//active class remover
const removeActiveClass = () => {
    const rmv = document.querySelectorAll(".lesson-btn");
    rmv.forEach((i) => i.classList.remove("active"));
};

//lesson button function
const press = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((dt) => {
            removeActiveClass();
            const btn = document.getElementById(`lesson-btn-${id}`);
            btn.classList.add("active");
            show1(dt.data);
            manageSpinner(false);
        });
};


//modal api fetch
const modalOpen = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const link = await fetch(url);
    const details = await link.json();
    displayWordDetails(details.data);
};

//modal details show
const displayWordDetails = (details) => {
        const container = document.getElementById("details-container");
        container.innerHTML = `<div class='pl-3' >

    <!-- Word Title -->
    <h2 class="text-3xl font-bold">
        ${details.word} <span class="text-3xl">(<i class="fa-solid fa-microphone-lines"></i> : ${details.word})</span>
    </h2>

    <!-- Meaning -->
    <div class="mt-4 space-y-1">
        <p class=" text-sm font-semibold">Meaning</p>
        <p class="font-medium">${details.meaning}</p>
    </div>

    <!-- Example -->
    <div class="mt-4 space-y-1">
        <p class=" text-sm font-semibold">Example</p>
        <p class="italic text-sm">
            ${details.sentence}
        </p>
    </div>

    <!-- Synonyms -->
    <div class="mt-4 ">
        <p class="font-semibold text-sm mb-2">Synonyms</p>


<div class="flex flex-wrap gap-2">
${details.synonyms
  .map((e) => `<span class="badge badge-outline badge-info">${e}</span>`)
  .join("")}
</div>
</div>
    </div>

    <!-- Button -->
    <button class="btn btn-primary mt-10 rounded-[12px] ">
        Complete Learning
    </button>

</div>
    `;
  document.getElementById("word_modal").showModal();
};


//when press lesson button show this
const show1 = (elements) => {
  const container2 = document.getElementById("container-2");
  container2.innerHTML = "";
  if (elements.length == 0) {
    const div = document.createElement("div");
    div.className = "col-span-3";
    div.innerHTML = `
          <div class="text-center space-y-2  font-bangla bg-gray-100 rounded-2xl p-5">
             <img src="./assets/alert-error.png" alt="" class='mx-auto'>
       <p class="text-[#79716B] text-[25px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>

      <h2 class='font-bold text-5xl'>নেক্সট LESSON এ যান</h2>
        </div>`;
    container2.appendChild(div);
  }

  for (let element of elements) {
    const div = document.createElement("div");
    div.innerHTML = ` <div class="bg-white rounded-xl py-10 pl-15 pr-15 text-center shadow-xl">
                    <h2 class='text-3xl font-bold'>${element.word ? element.word : "শব্দ পাউয়া জায়নি"}</h2>
                    <p >Meaning/Pronounciation</p><br>
                    <h3>${element.meaning ? element.meaning : "শব্দ পাউয়া জায়নি"}/${element.pronounciation ? element.pronounciation : "শব্দ পাউয়া জায়নি"}</h3>
                    <div class='flex justify-between items-center' >
                    <button onclick='modalOpen(${element.id})' class='btn   rounded-md   bg-sky-50'><i class="fa-solid  fa-circle-info"></i></button>
                    <button class='btn  rounded-md  bg-sky-50' ><i class="fa-solid fa-volume-high  "></i></button>
                    </div>
                </div>`;

    container2.appendChild(div);
  }
    
};

//all lesson btn
const show = (lessons) => {
  const container = document.getElementById("container-1");
  container.innerHTML = "";
  for (let lesson of lessons) {
    const div = document.createElement("div");
    div.innerHTML = `<button onclick='press(${lesson.level_no})' class="btn btn-outline btn-primary lesson-btn "id='lesson-btn-${lesson.level_no}' ><i class="fa-brands fa-leanpub"></i> Lesson-${lesson.level_no}</button>
        `;

    container.appendChild(div);
  }
};

//loading spinner
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("container-2").classList.add("hidden");
  } else {
    document.getElementById("container-2").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

//search-btn
document.getElementById('btn-search').addEventListener('click',function(){
  removeActiveClass();//when click search btn remove all btn active class
  const input=document.getElementById('input-search');
  const searchValue = input.value.trim().toLowerCase();
 fetch('https://openapi.programming-hero.com/api/words/all')
 .then(res=>res.json())
 .then(dt=>{
  const allWords=dt.data;
  const filterWord=allWords.filter(word=>word.word.toLowerCase().includes(searchValue));
  show1(filterWord);
 })
})

loadAll();