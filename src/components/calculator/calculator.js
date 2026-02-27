import './calculator.css'
import { useEffect, useState } from 'react';

function Calculator({ SetShowSidePanel, showSidePanel, setHistoryData }) {

  const [equation, SetEquation] = useState('');
  const [result, SetResult] = useState('');
  const [memory, setMemory] = useState([]);
  const operators = ["-", "+", "/", "*"];

  const onButtonClick = (val) => {

    SetEquation((prev) => {
      if (!prev) return val;
      const lastChar = prev[prev.length - 1];
      if (operators.includes(lastChar) && operators.includes(val)) {
        return prev.slice(0, -1) + val;
      }
      return prev + val;
    });

  };

  useEffect(() => {
    setHistoryData(memory)
    console.log(memory);
  }, [memory])



  const onPressedEqual = () => {
    console.log(`onPressedEqual equation - ${equation}`);
    let equationTokens = parseEquation(equation);
    console.log('equation', equationTokens);
    let convertedEquationTokens = convertNumberStrings(equationTokens);
    console.log('converted-equation', convertedEquationTokens);
    SetResult(calculateArray(convertedEquationTokens));
    let result = calculateArray(convertedEquationTokens);
    console.log(result);

    var obj = {
      'equation': equation,
      'result': result,
      'time': Date()
    }
    setMemory(preItem => [...preItem, obj]);
  }


  const onDelete = () => {
    SetEquation(equation.slice(0, -1));
  }


  const clearAll = () => {
    SetEquation('');
    SetResult('');
  }


  const onMemory = () => {
  
    SetShowSidePanel(!showSidePanel)
  }

  const parseEquation = (x) => {
    const tokens = x.match(/\d+(\.\d+)?|[+\-*/]/g);
    return tokens;
  }

  const convertNumberStrings = (tokens) => {
    return tokens.map(token => {
      return !isNaN(token) ? Number(token) : token
    });
  }

  const calculateArray = (arr) => {

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '*' || arr[i] === '/') {
        const op = arr[i];
        const result = op === "*" ? arr[i - 1] * arr[i + 1] : arr[i - 1] / arr[i + 1];
        arr.splice(i - 1, 3, result);
        i--;
      }
    }

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '+' || arr[i] === '-') {
        const op = arr[i];
        const result = op === '+' ? arr[i - 1] + arr[i + 1] : arr[i - 1] - arr[i + 1];
        arr.splice(i - 1, 3, result);
        i--;
      }
    }
    return arr[0];
  }

  return (
    <div className='outerbox'>
      <div className='calculator'>
        <div className='display'>
          <h3 className='equa'>{equation}</h3>
          <h1 className='result'>{result}</h1>
        </div>
        <button onClick={onMemory}>MR</button>
        <button onClick={onDelete}>Del</button>
        <button onClick={clearAll}>AC</button>
        <button onClick={() => onButtonClick('/')}>÷</button>
        <button onClick={() => onButtonClick('7')}>7</button>
        <button onClick={() => onButtonClick('8')}>8</button>
        <button onClick={() => onButtonClick('9')}>9</button>
        <button onClick={() => onButtonClick('*')}>*</button>
        <button onClick={() => onButtonClick('4')}>4</button>
        <button onClick={() => onButtonClick('5')}>5</button>
        <button onClick={() => onButtonClick('6')}>6</button>
        <button onClick={() => onButtonClick('-')}>-</button>
        <button onClick={() => onButtonClick('1')}>1</button>
        <button onClick={() => onButtonClick('2')}>2</button>
        <button onClick={() => onButtonClick('3')}>3</button>
        <button onClick={() => onButtonClick('+')}>+</button>
        <button onClick={() => onButtonClick('0')}>0</button>
        <button onClick={() => onButtonClick('.')}>.</button>
        <button className='span-two' onClick={onPressedEqual}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
