let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

const allBtn = document.getElementById('all-btn');
const interviewBtn = document.getElementById('interview-btn');
const rejectedBtn = document.getElementById('rejected-btn');

const total = document.getElementById('total');
const interviewCounter = document.getElementById('interview-counter');
const rejectedCounter = document.getElementById('rejected-counter');

const allCardcontainer = document.getElementById('main-card-container');
const filterSection = document.getElementById('filtered-section');

// Update counters
function updateCounts() {
    total.innerText = allCardcontainer.children.length;
    interviewCounter.innerText = interviewList.length;
    rejectedCounter.innerText = rejectedList.length;
}

// Toggle buttons
function togglebtn(id) {
    [allBtn, interviewBtn, rejectedBtn].forEach(btn => {
        btn.classList.remove('bg-[#422ad5]', 'text-white');
        btn.classList.add('bg-white', 'text-black');
    });

    const selected = document.getElementById(id);
    selected.classList.add('bg-[#422ad5]', 'text-white');
    selected.classList.remove('bg-white', 'text-black');

    currentStatus = id === 'all-btn' ? 'all' : id === 'interview-btn' ? 'interview' : 'rejected';

    if (currentStatus === 'all') {
        allCardcontainer.classList.remove('hidden');
        filterSection.classList.add('hidden');
    } else {
        allCardcontainer.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderCards(currentStatus === 'interview' ? interviewList : rejectedList);
    }
}

// Generic rendering function
function renderCards(list) {
    filterSection.innerHTML = '';
    list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'bg-white card shadow rounded-lg p-5 flex justify-between mt-5';

        const color = item.situation === 'interview' ? '#10B981' : '#EF4444';
        const text = item.situation.charAt(0).toUpperCase() + item.situation.slice(1);

        div.innerHTML = `
            <div class="card-info">
                <h3 class="company-name font-bold text-lg mb-1" style="color:#002C5C">${item.companyName}</h3>
                <p class="position">${item.position}</p>
                <p class="my-5 salary">${item.salary}</p>
                <button class="bg-[#EEF4FF] rounded-sm situation px-4 py-2 cursor-pointer mb-2" style="color:${color}">${text}</button>
                <p class="purpose">${item.purpose}</p>
                <div class="buttons mt-5">
                    <button class="interview text-[#10B981] border border-[#10B981] px-3 py-2 cursor-pointer rounded-sm mr-4">INTERVIEW</button>
                    <button class="rejected text-[#EF4444] border border-[#EF4444] px-3 py-2 cursor-pointer rounded-sm">REJECTED</button>
                </div>
            </div>
            <div class="card-del-icon text-[#64748B] cursor-pointer">
                <i class="fa-solid fa-delete-left"></i>
            </div>
        `;
        filterSection.appendChild(div);
    });
}

// Handle clicks on cards
function handleCardClick(event) {
    const card = event.target.closest('.bg-white.card');
    if (!card) return;

    const companyName = card.querySelector('.company-name').innerText;
    const position = card.querySelector('.position').innerText;
    const salary = card.querySelector('.salary').innerText;
    const purpose = card.querySelector('.purpose').innerText;
    const situationBtn = card.querySelector('.situation');

    if (event.target.classList.contains('interview')) {
        situationBtn.innerText = 'Interview';
        situationBtn.style.color = '#10B981';
        if (!interviewList.find(i => i.companyName === companyName)) {
            interviewList.push({ companyName, position, salary, situation: 'interview', purpose });
        }
        rejectedList = rejectedList.filter(i => i.companyName !== companyName);
        if (currentStatus === 'interview') renderCards(interviewList);
    } else if (event.target.classList.contains('rejected')) {
        situationBtn.innerText = 'Rejected';
        situationBtn.style.color = '#EF4444';
        if (!rejectedList.find(i => i.companyName === companyName)) {
            rejectedList.push({ companyName, position, salary, situation: 'rejected', purpose });
        }
        interviewList = interviewList.filter(i => i.companyName !== companyName);
        if (currentStatus === 'rejected') renderCards(rejectedList);
    } else if (event.target.closest('.card-del-icon')) {
        card.remove();
        interviewList = interviewList.filter(i => i.companyName !== companyName);
        rejectedList = rejectedList.filter(i => i.companyName !== companyName);
    }

    updateCounts();
}

// Event listeners
allCardcontainer.addEventListener('click', handleCardClick);
filterSection.addEventListener('click', handleCardClick);

// Initialize counts
updateCounts();