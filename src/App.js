import React from 'react';
import './index.scss';

const questions = [
  {
    title: 'React - це ... ?',
    variants: ['бібліотека', 'фреймворк', 'додаток'],
    correct: 0,
  },
  {
    title: 'Компонент - це ... ',
    variants: ['додаток', 'частина дадотку або сторінки', 'то, чого я не знаю'],
    correct: 1,
  },
  {
    title: 'Що таке JSX?',
    variants: [
      'Це простой HTML',
      'Це функция',
      'Це той же HTML, але з можливістю виконати JS-код',
    ],
    correct: 2,
  },
];

function Result({ correct }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Ви відгадали {correct} з {questions.length}</h2>
      <a href='/'>
        <button>Спробувати знову</button>
      </a>
    </div>
  );
}

function Game({ step, question, onClickVariant }) {
  const percentage = Math.round((step / questions.length) * 100);

  console.log(percentage);

  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{ question.title }</h1>
      <ul>
        {
          question.variants.map( (text, index) => (
            <li onClick={() => onClickVariant(index)} key={text}>
              {text}
            </li>
          ))
        }
      </ul>
    </>
  );
}

function App() {

  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const question = questions[step];

  const onClickVariant = (index) => {
    console.log(step, index);
    setStep(step + 1);

    if (index === question.correct) {
      setCorrect(correct + 1);
    }
  }

  return (
    <div className="App">
      {
        step != questions.length ? 
        <Game step={step} question={question} onClickVariant={onClickVariant}/> : 
        <Result correct={correct} />
      }

    </div>
  );
}

export default App;
