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

      // if(firstNum != null)
      // {
      //   setFirstNum((prev)=>{
      //     if(prev != null)
      //     {
      //       let num = String(prev).slice(0,-1);
      //       if(num === '')
      //       {
      //         return null;
      //       }
      //       else{
      //         return Number(String(prev).slice(0,-1));
      //       }
      //     }
      //   })

      //   setFirstNumDisplay((prev)=>{
      //     console.log(prev);
      //     if(prev != null)
      //     {
      //       return String(prev).slice(0,-1) === '' ? null : String(prev).slice(0,-1);
      //     }
      //   });
      // }
      
    }
    else if(value === '.')
    {

      // setFirstNum((prev)=>{
      //   if(firstNum === null)
      //   {
      //     return 0 + '.';
      //   }
      //   else if(!prev.includes('.'))
      //   {
      //     return prev + '.';
      //   }
      //   else{
      //     return prev;
      //   }
      // });

      // setFirstNumDisplay((prev)=>{
      //   if(firstNum === null)
      //   {
      //     return 0 + '.';
      //   }
      //   else if(!prev.includes('.'))
      //   {
      //     return prev + '.';
      //   }
      //   else{
      //     return prev;
      //   }
      // });
      // setOperator('');

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
            operObj.secondNumber = Calculate(operObj.secondNumber,operObj.firstNumber);
          }
        }
        setOperObj({...operObj,operator: value, secondNumber: operObj.secondNumber, firstNumber: 0 });
        setSecondNumDisplay(`${operObj.secondNumber} ${value}`);
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
            operObj.secondNumber = Calculate(operObj.secondNumber,operObj.firstNumber);
          }
        }
        setOperObj({...operObj,operator: value, secondNumber: operObj.secondNumber, firstNumber: 0 });
        setSecondNumDisplay(`${operObj.secondNumber} ${value}`);
        setFirstNumDisplay(operObj.secondNumber);
        break;
      case 'x':
        if(operObj.firstNumber !== 0)
        {
          if(operObj.secondNumber === 0)
          {
            operObj.secondNumber = operObj.firstNumber;
          }
          else{
            operObj.secondNumber = Calculate(operObj.secondNumber,operObj.firstNumber);
          }
        }
        setOperObj({...operObj,operator: value, secondNumber: operObj.secondNumber, firstNumber: 0 });
        setSecondNumDisplay(`${operObj.secondNumber} ${value}`);
        setFirstNumDisplay(operObj.secondNumber);
        break;
      case '÷':
        if(operObj.firstNumber !== 0)
        {
          if(operObj.secondNumber === 0)
          {
            operObj.secondNumber = operObj.firstNumber;
          }
          else{
            operObj.secondNumber = Calculate(operObj.secondNumber,operObj.firstNumber);
          }
        }
        setOperObj({...operObj,operator: value, secondNumber: operObj.secondNumber, firstNumber: 0 });
        setSecondNumDisplay(`${operObj.secondNumber} ${value}`);
        setFirstNumDisplay(operObj.secondNumber);
        break;
      case '=':
        setOperObj({...operObj, secondNumber: Calculate(operObj.secondNumber, Number(firstNumDisplay)), firstNumber: 0 });
        setSecondNumDisplay(`${operObj.secondNumber} ${operObj.operator} ${Number(firstNumDisplay)} = `);
        setFirstNumDisplay(Calculate(operObj.secondNumber, Number(firstNumDisplay)));
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

  }

  const HandleOtherOperators = (value) => {
    switch(value){
      case 'AC':
        clear();
        break;
      case '+/-':{
        // setFirstNum((prev)=>{
        //   return prev * -1;
        // });
        // setFirstNumDisplay((prev)=>{
        //   return prev * -1;
        // });

        // setSecondNumDisplay((prev)=> {
        //   if(prev !== null)
        //   {
        //     return prev + 'negate('+Number(firstNumDisplay) + ')'
        //   }
        //   else{
        //     return 'negate('+Number(firstNumDisplay) + ')'
        //   }
        // });
        break;
      }
      case '%':{
        // if(secondNum !== null)
        // {
        //   setFirstNum(Number((firstNumDisplay/100)*secondNum));
        //   setFirstNumDisplay(Number((firstNumDisplay/100)*secondNum));
        //   setSecondNumDisplay((prev)=>{
        //     if(prev !== null)
        //     {
        //       return secondNum + ' ' + displayOperator+' '+ Number((firstNumDisplay/100)*secondNum)
        //     }
        //     else{
        //       return Number((firstNumDisplay/100)*secondNum)
        //     }
        //   });
        // }
        // else{
        //   clear();
        // }
        break;
      }
      default:
    }
  }

  return (
    <div className="App">
      <div className='prevValues'>
          <span>{secondNumDisplay}</span>
          {/* <span>{secondNumDisplay !== null ? secondNumDisplay  : ''}</span> */}
      </div>
      <div className='latestValues'>
          <span>{firstNumDisplay}</span>
          {/* <span>{firstNumDisplay == null? 0 : firstNumDisplay }</span> */}
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
