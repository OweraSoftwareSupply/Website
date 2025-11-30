async function loadQuestions() {
    try {
        const response = await fetch('/questions.json');
        const questions = await response.json();
        displayQuestions(questions);
    } catch (error) {
        console.error('Error loading questions:', error);
    }
}

function displayQuestions(questions) {
    const container = document.getElementById('faq-container');
    if (!container) return;
    
    container.innerHTML = ''; // Clear existing content

    questions.forEach(item => {
        const faqItem = createFaqItem(item);
        container.appendChild(faqItem);
    });

    // Initialize accordion functionality after items are added
    initializeAccordion();
}

function createFaqItem(item) {
    const faqDiv = document.createElement('div');
    faqDiv.className = 'faq-item bg-navy border border-light-navy rounded-lg overflow-hidden';

    const button = document.createElement('button');
    button.className = 'w-full px-4 py-4 sm:px-6 sm:py-5 text-left flex items-center justify-between focus:outline-none group';

    const span = document.createElement('span');
    span.className = 'font-semibold text-white text-lg group-hover:text-sky transition-colors';
    span.textContent = item.question;

    const icon = document.createElement('i');
    icon.className = 'fas fa-chevron-down text-sky transition-transform duration-300';

    button.appendChild(span);
    button.appendChild(icon);

    const answerDiv = document.createElement('div');
    answerDiv.className = 'faq-answer hidden px-4 pb-4 sm:px-6 sm:pb-6 text-gray-300 border-t border-light-navy pt-4 text-lg';
    answerDiv.textContent = item.answer;

    faqDiv.appendChild(button);
    faqDiv.appendChild(answerDiv);

    return faqDiv;
}

function initializeAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const button = item.querySelector('button');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('i');

        button.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').classList.add('hidden');
                    otherItem.querySelector('i').classList.remove('rotate-180');
                }
            });

            // Toggle current item
            answer.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        });
    });
}

document.addEventListener('DOMContentLoaded', loadQuestions);
