const quizData = [
    {
        topic: "C Programming",
        questions: [
            {
                question: "What does 'C' stand for in C language?",
                options: ["Compiled", "Computer", "Control"],
                answer: "Compiled"
            },
            {
                question: "Which function is used to print text in C?",
                options: ["print()", "printf()", "output()"],
                answer: "printf()"
            }
        ]
    },
    {
        topic: "C++ Programming",
        questions: [
            {
                question: "Who developed C++?",
                options: ["Bjarne Stroustrup", "Dennis Ritchie", "James Gosling"],
                answer: "Bjarne Stroustrup"
            },
            {
                question: "Which operator is used to allocate memory dynamically in C++?",
                options: ["new", "malloc", "calloc"],
                answer: "new"
            }
        ]
    },
    {
        topic: "Java Programming",
        questions: [
            {
                question: "Which company developed Java?",
                options: ["Sun Microsystems", "Microsoft", "Google"],
                answer: "Sun Microsystems"
            },
            {
                question: "Which keyword is used to inherit a class in Java?",
                options: ["extends", "inherits", "implements"],
                answer: "extends"
            }
        ]
    },
    {
        topic: "HTML",
        questions: [
            {
                question: "What does HTML stand for?",
                options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
                answer: "Hyper Text Markup Language"
            },
            {
                question: "Which tag is used to create a hyperlink in HTML?",
                options: ["<a>", "<link>", "<href>"],
                answer: "<a>"
            }
        ]
    },
    {
        topic: "CSS",
        questions: [
            {
                question: "What does CSS stand for?",
                options: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"],
                answer: "Cascading Style Sheets"
            },
            {
                question: "Which property is used to change the background color in CSS?",
                options: ["color", "background-color", "bgcolor"],
                answer: "background-color"
            }
        ]
    },
    {
        topic: "Python Programming",
        questions: [
            {
                question: "Which keyword is used to define a function in Python?",
                options: ["function", "def", "lambda"],
                answer: "def"
            },
            {
                question: "Which of the following is a correct extension for a Python file?",
                options: [".py", ".pyt", ".pt"],
                answer: ".py"
            }
        ]
    }
];

function loadQuiz() {
    const quizContainer = document.getElementById('quizQuestions');
    let questionIndex = 0;

    quizData.forEach((topic) => {
        topic.questions.forEach((q) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-block';

            const questionText = document.createElement('p');
            questionText.textContent = (questionIndex + 1) + ". " + q.question;
            questionDiv.appendChild(questionText);

            q.options.forEach((option, i) => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'question' + questionIndex;
                input.value = option;
                label.appendChild(input);
                label.appendChild(document.createTextNode(option));
                questionDiv.appendChild(label);
                questionDiv.appendChild(document.createElement('br'));
            });

            quizContainer.appendChild(questionDiv);
            questionIndex++;
        });
    });

}

// Generate certificate
function loadCertificate() {
    const passedCourse = JSON.parse(localStorage.getItem('passedCourse'));
    if (passedCourse) {
        document.getElementById('certificateText').innerHTML = `This certifies that <strong>${passedCourse.username}</strong> has successfully completed the course <strong>${passedCourse.courseName}</strong>.`;
    } else {
        alert('No certificate available.');
        window.location.href = 'dashboard.html';
    }
}

// Call appropriate functions based on the current page
if (window.location.pathname.endsWith('certificate.html')) {
    checkLogin();
    loadCertificate();
}


function submitQuiz() {
    let score = 0;
    let questionIndex = 0;

    quizData.forEach((topic) => {
        topic.questions.forEach((q) => {
            const selectedOption = document.querySelector(`input[name="question${questionIndex}"]:checked`);
            if (selectedOption && selectedOption.value === q.answer) {
                score++;
            }
            questionIndex++;
        });
    });

    alert("You scored " + score + " out of " + questionIndex);
    if (score >= 8) {
        window.location.href = 'certificate.html';
    } else {
        alert("You need to score at least 8 out of 10 to pass the quiz.");
    }
}

// Load the quiz when the page loads
document.addEventListener('DOMContentLoaded', loadQuiz);
