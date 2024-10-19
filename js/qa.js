document.addEventListener("DOMContentLoaded", function () {
    const qaQuestions = document.querySelectorAll('.qa-question');

    qaQuestions.forEach(question => {
        question.addEventListener('click', function () {
            this.classList.toggle('active');

            const answer = this.nextElementSibling;
            if (answer.style.maxHeight && answer.style.maxHeight !== '0px') {
                answer.style.maxHeight = '0';
                answer.style.paddingTop = '0';
                answer.style.paddingBottom = '0';
            } else {
                answer.style.maxHeight = `${answer.scrollHeight}px`;
                answer.style.paddingTop = '15px';
                answer.style.paddingBottom = '15px';
            }

            // Delay scrolling just a bit to give the transition some time
            setTimeout(() => {
                this.parentElement.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        });
    });
});
