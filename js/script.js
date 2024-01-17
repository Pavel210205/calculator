const output = document.querySelector('.cal__output');
const simbols = document.querySelector('.cal__main');
let numberOne = '';//первое число
let numberTwo = '';//второе число
let sinbol = '';//контейнес с символом котовый будет выполнять операцию
let meaning = true;//условие заполнения второй переменной когда первая набрана и нажат символ
let numberSum = '';//конечный результат который выдает калькулятор

function deleteLock() {
    document.querySelector('.point').classList.remove('lock');
}

simbols.addEventListener('click', (event) => {
    const number = event.target.closest('.number');//числа
    const reset = event.target.closest('.reset');//с
    const point = event.target.closest('.point');//.
    const addition = event.target.closest('.addition');//плюс
    const subtraction = event.target.closest('.subtraction');//минус
    const multiplication = event.target.closest('.multiplication');//умножение
    const division = event.target.closest('.division');//деление
    const equally = event.target.closest('.equally');// равно

    if (reset) {//удаляет числа
        nullreset()
        deleteLock()
    }
    if (point && meaning) {
        if (output.textContent.includes('.')) {
            point.classList.add('lock')
        }
        else if (numberOne == '') {
            numberOne += '0.'
            point.classList.add('lock')
        }
        else {
            numberOne += point.textContent;
            point.classList.add('lock')
        }
    }
    if (point && !meaning) {
        if (output.textContent.includes('.')) {
            point.classList.add('lock')
        }
        else if (numberTwo == '') {
            numberTwo += '0.'
            point.classList.add('lock')
        }
        else {
            numberTwo += point.textContent;
            point.classList.add('lock')
        }
    }

    if (number && meaning) { //ввод первого числа
        if (number.textContent == '0' && output.textContent == '0') {
            numberOne += ''
        }
        else {
            numberOne += number.textContent
        }

    }
    else if (number && !meaning) {//ввод второго числа когда определена первая
        if (number.textContent == '0' && output.textContent == '0') {
            numberTwo += ''
        }
        else {
            numberTwo += number.textContent
        }
    };

    if (addition && numberOne !== '') {//numberOne !== '' - предотвращает ошибку последовательности действий(сначала число,потом символ,потом второе число,потом равно)
        meaning = false
        sinbol = '+';
        deleteLock()
    }
    else if (subtraction && numberOne !== '') {
        meaning = false
        sinbol = '-';
        deleteLock()
    }
    else if (multiplication && numberOne !== '') {
        meaning = false
        sinbol = '*';
        deleteLock()
    }
    else if (division && numberOne !== '') {
        meaning = false
        sinbol = '/';
        deleteLock()
    };

    if (equally) {
        if (numberTwo == '' && sinbol !== '') { //предотвращает ошибку действия при не заполнении второго числа
            // numberTwo = numberOne
            preventDefault()
        }

        if (numberTwo == '' && sinbol == '') {//предотвращает сброс при клике на =
            numberSum = numberOne;
        }
        else if (sinbol === '+') {//сложение
            numberSum = Number(numberOne) + Number(numberTwo)
        }
        else if (sinbol === '-') {//вычитание
            numberSum = Number(numberOne) - Number(numberTwo)
        }
        else if (sinbol === '/') {//деление
            numberSum = Number(numberOne) / Number(numberTwo)
        }
        else if (sinbol === '*') {//умножение
            numberSum = Number(numberOne) * Number(numberTwo)
        };
        numberOne = numberSum //перенос результата в первую переменную для последующих расчетов
        numberTwo = '';
        sinbol = '';
        deleteLock()
    };


    if (numberOne == '') {//вывод на экран 0 при reset
        output.textContent = '0'
    }
    else if (numberTwo == '' && sinbol == '') {// вывод первого числа при вводе первого числа
        output.textContent = numberOne
    }
    else if (numberTwo == '' && sinbol !== '') {//вывод символа при вводе символа
        output.textContent = sinbol
    }
    else {
        output.textContent = numberTwo// вывод второго числа при вводе второго числа
    }


    function nullreset() {//обнуление
        numberOne = '';
        numberTwo = '';
        sinbol = '';
        meaning = true;
        numberSum = '';

    }
})
