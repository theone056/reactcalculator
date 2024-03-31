import './App.css';
import Button from './components/Button';
import { useEffect, useState } from 'react';

function App() {
  const otherOperators = ["AC", "+/-", "%", ];
  const numbers = ["<--",".","0","1","2","3","4","5","6","7","8","9"];
  const arithmetic = ["÷","x","-","+","="];
  const [firstNumDisplay, setFirstNumDisplay] = useState(0);
  const [secondNumDisplay, setSecondNumDisplay] = useState(0);
  
  const [operObj, setOperObj] = useState({
    operator: '',
    firstNumber: 0,
    secondNumber: 0
  });

  
  const HandleNumberClick = (value) => {
    if(value === '<--')
    {
      let latestVal = operObj.firstNumber.toString().slice(0,-1);
      let val = latestVal.length === 0 ? 0 : latestVal;
      setOperObj({
        ...operObj,
        firstNumber: val
      });

      setFirstNumDisplay(val);
    }
    else if(value === '.')
    {
      if(!String(operObj.firstNumber).includes('.'))
      {
        setOperObj({...operObj, firstNumber: operObj.firstNumber + value})
        setFirstNumDisplay(operObj.firstNumber + value)
      }
    }
    else{
      operObj.firstNumber += value;
      operObj.firstNumber = Number(operObj.firstNumber);
      setOperObj({...operObj, firstNumber: Number(operObj.firstNumber) })
      setFirstNumDisplay(operObj.firstNumber);
    }
  }
  
  const HandleArithmeticClick = (value) => {
    switch(value){
      case '+':
        if(operObj.firstNumber !== 0)
        {
          if(operObj.secondNumber === 0)
          {
            operObj.secondNumber = operObj.firstNumber;
          }
          else{
            operObj.secondNumber = Calculate(Number(operObj.secondNumber),Number(operObj.firstNumber));
          }
        }
        setOperObj({...operObj,operator: value, secondNumber: Number(operObj.secondNumber), firstNumber: 0 });
        setSecondNumDisplay(`${Number(operObj.secondNumber)} ${value}`);
        setFirstNumDisplay(operObj.secondNumber);
        break;
      case '-':
        if(operObj.firstNumber !== 0)
        {
          if(operObj.secondNumber === 0)
          {
            operObj.secondNumber = operObj.firstNumber;
          }
          else{
            operObj.secondNumber = Calculate(Number(operObj.secondNumber),Number(operObj.firstNumber));
          }
        }
        setOperObj({...operObj,operator: value, secondNumber: Number(operObj.secondNumber), firstNumber: 0 });
        setSecondNumDisplay(`${Number(operObj.secondNumber)} ${value}`);
        setFirstNumDisplay(Number(operObj.secondNumber));
        break;
      case 'x':
        if(operObj.firstNumber !== 0)
        {
          if(operObj.secondNumber === 0)
          {
            operObj.secondNumber = operObj.firstNumber;
          }
          else{
            operObj.secondNumber = Calculate(Number(operObj.secondNumber),Number(operObj.firstNumber));
          }
        }
        setOperObj({...operObj,operator: value, secondNumber: Number(operObj.secondNumber), firstNumber: 0 });
        setSecondNumDisplay(`${Number(operObj.secondNumber)} ${value}`);
        setFirstNumDisplay(Number(operObj.secondNumber));
        break;
      case '÷':
        if(operObj.firstNumber !== 0)
        {
          if(operObj.secondNumber === 0)
          {
            operObj.secondNumber = operObj.firstNumber;
          }
          else{
            operObj.secondNumber = Calculate(Number(operObj.secondNumber),Number(operObj.firstNumber));
          }
        }
        setOperObj({...operObj,operator: value, secondNumber: Number(operObj.secondNumber), firstNumber: 0 });
        setSecondNumDisplay(`${Number(operObj.secondNumber)} ${value}`);
        setFirstNumDisplay(Number(operObj.secondNumber));
        break;
      case '=':
        setOperObj({...operObj, secondNumber: Calculate(Number(operObj.secondNumber), Number(firstNumDisplay)), firstNumber: 0 });
        setSecondNumDisplay(`${Number(operObj.secondNumber)} ${operObj.operator} ${Number(firstNumDisplay)} = `);
        setFirstNumDisplay(Calculate(Number(operObj.secondNumber), Number(firstNumDisplay)));
        break;
      default:
    }
  }

  const Calculate = (firstVal,secondVal) => {
    if(operObj.operator === '+')
    {
      return (Number(firstVal) + Number(secondVal));
    }
    else if(operObj.operator  === '-')
    {
      return (Number(firstVal) - Number(secondVal));
    }
    else if(operObj.operator  === '÷')
    {
      return (Number(firstVal) / Number(secondVal));
    }
    else if(operObj.operator  === 'x')
    {
      return (Number(firstVal) * Number(secondVal));
    }
    else{
      return (Number(secondVal));
    }
  }
  
  const clear = () => {
    setFirstNumDisplay(0);
    setSecondNumDisplay(0);
    setOperObj({operator:'', firstNumber:0, secondNumber:0});
  }

  const HandleOtherOperators = (value) => {
    switch(value){
      case 'AC':
        clear();
        break;
      case '+/-':{
        setOperObj({...operObj, firstNumber: operObj.firstNumber *-1})
        setFirstNumDisplay(operObj.firstNumber*-1)
        break;
      }
      case '%':{
        setOperObj({
          ...operObj,
          firstNumber: Number((operObj.firstNumber/100)*operObj.secondNumber)
        });
        setFirstNumDisplay(Number((operObj.firstNumber/100)*operObj.secondNumber));
        setSecondNumDisplay(`${operObj.secondNumber} ${operObj.operator} ${Number((operObj.firstNumber/100)*operObj.secondNumber)}`)
        break;
      }
      default:
    }
  }

  return (
    <div className="App">
      <div className='prevValues'>
          <span>{secondNumDisplay}</span>
      </div>
      <div className='latestValues'>
          <span>{firstNumDisplay}</span>
      </div>
      <div className='buttonContainer'>
        <div className='numbers-container'>
          <div className='other-operators'>
            {
              otherOperators.map((x,i)=>{
                return <Button key={i} Text={x} HandleClick={()=>HandleOtherOperators(x)}/>
              })
            }
          </div>
          {numbers.reverse().map((x,i)=>{
            return <Button key={i} Text={x} HandleClick={()=>HandleNumberClick(x)}/>
          })}
        </div>
        <div className='arithmetic-container'>
          {
            arithmetic.map((x,i)=>{
              return <Button key={i} Text={x} HandleClick={()=> HandleArithmeticClick(x)}/>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
