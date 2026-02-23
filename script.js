let interviewList = [];
let rejectList = [];
let currentStats = 'all-filter-btn';

// counters
let total = document.getElementById('total');
let interview = document.getElementById('interviewCount');
let reject = document.getElementById('rejectedCount');

// buttons
const allFilterBtn = document.getElementById('all-filter-btn');
const interViewFilterBtn = document.getElementById('interView-filter-btn');
const rejectFilterBtn = document.getElementById('rejected-filter-btn');

// sections
const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filter-section');


// total count
function calculateCount() {
    total.innerText = allCardSection.children.length;
    interview.innerText = interviewList.length;
    reject.innerText = rejectList.length;
}

calculateCount();


// filter 
function toggleStyle(id) {

    currentStats = id;

    // reset all buttons
    [allFilterBtn, interViewFilterBtn, rejectFilterBtn].forEach(btn => {
        btn.classList.remove('bg-[#3b82f6]', 'text-white');
        btn.classList.add('bg-white', 'text-black');
    });

    // active button
    const selected = document.getElementById(id);
    selected.classList.remove('bg-white', 'text-black');
    selected.classList.add('bg-[#3b82f6]', 'text-white');

    // show sections
    if (id === 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }

    if (id === 'interView-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    }

    if (id === 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
    }
}


// main click 
mainContainer.addEventListener('click', function (event) {

    const parentNode = event.target.closest('.card');
    if (!parentNode) return;

    const title = parentNode.querySelector('.title').innerText;
    const skil = parentNode.querySelector('.skil').innerText;
    const salery = parentNode.querySelector('.salery').innerText;
    const condtion = parentNode.querySelector('.condtion').innerText;

    const cardInfo = {
        title,
        skil,
        salery,
        condtion
    };

// interview btn
    
    if (event.target.classList.contains('interview')) {

        parentNode.querySelector('.btn').innerText = 'Applied';

        const exist = interviewList.find(item => item.title === title);

        if (!exist) {
            interviewList.push({ ...cardInfo, btn: 'Applied' });
        }

        // remove from reject list
        rejectList = rejectList.filter(item => item.title !== title);

        calculateCount();

        if (currentStats === 'interView-filter-btn') {
            renderInterview();
        }

        if (currentStats === 'rejected-filter-btn') {
            renderRejected();
        }
    }

    //  reject btn
    if (event.target.classList.contains('rejected')) {

        parentNode.querySelector('.btn').innerText = 'Rejected';

        const exist = rejectList.find(item => item.title === title);

        if (!exist) {
            rejectList.push({ ...cardInfo, btn: 'Rejected' });
        }

        // remove from interview list
        interviewList = interviewList.filter(item => item.title !== title);

        calculateCount();

        if (currentStats === 'interView-filter-btn') {
            renderInterview();
        }

        if (currentStats === 'rejected-filter-btn') {
            renderRejected();
        }
    }
});

// Interview render
function renderInterview() {

    filterSection.innerHTML = '';

    interviewList.forEach(item => {

        let div = document.createElement('div');
        div.className = 'card flex justify-between border border-gray-300 shadow-sm rounded-2xl p-6';

        div.innerHTML = `
            <div class="space-y-4">
                <div>
                    <h3 class="title text-xl font-bold">${item.title}</h3>
                    <p class="skil">${item.skil}</p>
                    <p class="salery">${item.salery}</p>
                </div>
                <p class="btn">${item.btn}</p>
                <p class="condtion">${item.condtion}</p>
                <div>
                    <button class="interview px-5 py-2 border border-green-500 text-green-500">INTERVIEW</button>
                    <button class="rejected px-5 py-2 border border-red-500 text-red-500">REJECTED</button>
                </div>
            </div>
            <!-- part2 -->
                <div>
                    <i class="fa-regular fa-trash-can"></i>
            </div>
        `;

        filterSection.appendChild(div);
    });
}


// rejected render 
function renderRejected() {

    filterSection.innerHTML = '';

    rejectList.forEach(item => {

        let div = document.createElement('div');
        div.className = 'card flex justify-between border border-gray-300 shadow-sm rounded-2xl p-6';

        div.innerHTML = `
            <div class="space-y-4">
                <div>
                    <h3 class="title text-xl font-bold">${item.title}</h3>
                    <p class="skil">${item.skil}</p>
                    <p class="salery">${item.salery}</p>
                </div>
                <p class="btn">${item.btn}</p>
                <p class="condtion">${item.condtion}</p>
                <div>
                    <button class="interview px-5 py-2 border border-green-500 text-green-500">INTERVIEW</button>
                    <button class="rejected px-5 py-2 border border-red-500 text-red-500">REJECTED</button>
                </div>
            </div>
            <!-- part2 -->
                <div>
                    <i class="fa-regular fa-trash-can"></i>
           </div>
        `;

        filterSection.appendChild(div);
    });
}