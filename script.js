let interviewList = [];
let rejectList = [];
let currentStats = 'all-filter-btn';

// Counters
let total = document.getElementById('total');
let interview = document.getElementById('interviewCount');
let reject = document.getElementById('rejectedCount');
let totalJobs = document.getElementById('total-jobs');

// Buttons
const allFilterBtn = document.getElementById('all-filter-btn');
const interViewFilterBtn = document.getElementById('interView-filter-btn');
const rejectFilterBtn = document.getElementById('rejected-filter-btn');

// Sections
const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filter-section');
const emptyMessage = document.getElementById('empty-message');

// Update counters
function calculateCount() {
    total.innerText = allCardSection.children.length;
    interview.innerText = interviewList.length;
    reject.innerText = rejectList.length;
    totalJobs.innerText = allCardSection.children.length;
}

// Show empty message if tab has no cards
function checkEmpty() {
    if (currentStats === 'all-filter-btn') {
        emptyMessage.classList.add('hidden'); // All tab always shows cards
    } else {
        if (filterSection.children.length === 0) {
            emptyMessage.classList.remove('hidden');
        } else {
            emptyMessage.classList.add('hidden');
        }
    }
}

calculateCount();
checkEmpty();

// Toggle tabs
function toggleStyle(id) {
    currentStats = id;
    [allFilterBtn, interViewFilterBtn, rejectFilterBtn].forEach(btn => {
        btn.classList.remove('bg-[#3b82f6]', 'text-white');
        btn.classList.add('bg-white', 'text-black');
    });
    const selected = document.getElementById(id);
    selected.classList.remove('bg-white', 'text-black');
    selected.classList.add('bg-[#3b82f6]', 'text-white');

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
    checkEmpty();
}

// Main click listener
mainContainer.addEventListener('click', function(event) {
    const parentNode = event.target.closest('.card');
    if (!parentNode) return;

    const title = parentNode.querySelector('.title').innerText;
    const skil = parentNode.querySelector('.skil').innerText;
    const salery = parentNode.querySelector('.salery').innerText;
    const condtion = parentNode.querySelector('.condtion').innerText;

    const cardInfo = { title, skil, salery, condtion };

    // Interview button
    if (event.target.classList.contains('interview')) {
        const statusElement = parentNode.querySelector('.btn');
        statusElement.innerText = 'Interview';
        statusElement.classList.remove('text-red-500', 'text-gray-400');
        statusElement.classList.add('text-green-500');

        if (!interviewList.find(item => item.title === title)) {
            interviewList.push({ ...cardInfo, btn: 'Interview' });
        }
        rejectList = rejectList.filter(item => item.title !== title);

        calculateCount();
        checkEmpty();
        if (currentStats === 'interView-filter-btn') renderInterview();
        if (currentStats === 'rejected-filter-btn') renderRejected();
    }

    // Rejected button
    if (event.target.classList.contains('rejected')) {
        const statusElement = parentNode.querySelector('.btn');
        statusElement.innerText = 'Rejected';
        statusElement.classList.remove('text-green-500', 'text-gray-400');
        statusElement.classList.add('text-red-500');

        if (!rejectList.find(item => item.title === title)) {
            rejectList.push({ ...cardInfo, btn: 'Rejected' });
        }
        interviewList = interviewList.filter(item => item.title !== title);

        calculateCount();
        checkEmpty();
        if (currentStats === 'interView-filter-btn') renderInterview();
        if (currentStats === 'rejected-filter-btn') renderRejected();
    }

    // Delete button
    if (event.target.classList.contains('trash-btn')) {
        parentNode.remove();
        interviewList = interviewList.filter(item => item.title !== title);
        rejectList = rejectList.filter(item => item.title !== title);

        calculateCount();
        checkEmpty();
        if (currentStats === 'interView-filter-btn') renderInterview();
        if (currentStats === 'rejected-filter-btn') renderRejected();
    }
});

// Render 
function renderInterview() {
    filterSection.innerHTML = '';
    interviewList.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card flex justify-between border border-gray-300 shadow-sm rounded-2xl p-6';
        div.innerHTML = `
            <div class="space-y-4">
                <div>
                    <h3 class="title text-xl font-bold">${item.title}</h3>
                    <p class="skil">${item.skil}</p>
                    <p class="salery">${item.salery}</p>
                </div>
                <p class="btn text-green-500">${item.btn}</p>
                <p class="condtion">${item.condtion}</p>
                <div class="flex gap-2 mt-2">
                    <button class="interview px-5 py-2 border border-green-500 text-green-500 rounded">INTERVIEW</button>
                    <button class="rejected px-5 py-2 border border-red-500 text-red-500 rounded">REJECTED</button>
                </div>
            </div>
            <div>
                <i class="fa-regular fa-trash-can trash-btn cursor-pointer text-gray-500"></i>
            </div>
        `;
        filterSection.appendChild(div);
    });
    checkEmpty();
}

// Render 
function renderRejected() {
    filterSection.innerHTML = '';
    rejectList.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card flex justify-between border border-gray-300 shadow-sm rounded-2xl p-6';
        div.innerHTML = `
            <div class="space-y-4">
                <div>
                    <h3 class="title text-xl font-bold">${item.title}</h3>
                    <p class="skil">${item.skil}</p>
                    <p class="salery">${item.salery}</p>
                </div>
                <p class="btn text-red-500">${item.btn}</p>
                <p class="condtion">${item.condtion}</p>
                <div class="flex gap-2 mt-2">
                    <button class="interview px-5 py-2 border border-green-500 text-green-500 rounded">INTERVIEW</button>
                    <button class="rejected px-5 py-2 border border-red-500 text-red-500 rounded">REJECTED</button>
                </div>
            </div>
            <div>
                <i class="fa-regular fa-trash-can trash-btn cursor-pointer text-gray-500"></i>
            </div>
        `;
        filterSection.appendChild(div);
    });
    checkEmpty();
}