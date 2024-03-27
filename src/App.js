import './App.css';
import Button from './components/Button';
import { useEffect, useState } from 'react';

function App() {
  const otherOperators = ["AC", "+/-", "%", ];
  const numbers = ["<--",".","0","1","2","3","4","5","6","7","8","9"];
  const arithmetic = ["÷","x","-","+","="];
  const [firstNum, setFirstNum] = useState(null);
  const [secondNum, setSecondNum] = useState(null);
  const [operator, setOperator] = useState('');
  const [displayOperator, setDisplayOperator] = useState('');
  const [firstNumDisplay, setFirstNumDisplay] = useState(null);
  const [secondNumDisplay, setSecondNumDisplay] = useState(null);

  const HandleNumberClick = (value) => {
    if(value === '<--')
    {
      if(firstNum != null)
      {
        setFirstNum((prev)=>{
          if(prev != null)
          {
            let num = String(prev).slice(0,-1);
            if(num === '')
            {
              return null;
            }
            else{
              return Number(String(prev).slice(0,-1));
            }
          }
        })

        setFirstNumDisplay((prev)=>{
          console.log(prev);
          if(prev != null)
          {
            return String(prev).slice(0,-1) === '' ? null : String(prev).slice(0,-1);
          }
        });
      }
    }
    else if(value === '.')
    {
      setFirstNum((prev)=>{
        if(firstNum === null)
        {
          return 0 + '.';
        }
        else if(!prev.includes('.'))
        {
          return prev + '.';
        }
        else{
          return prev;
        }
      });

      setFirstNumDisplay((prev)=>{
        if(firstNum === null)
        {
          return 0 + '.';
        }
        else if(!prev.includes('.'))
        {
          return prev + '.';
        }
        else{
          return prev;
        }
      });
      setOperator('');
    }
    else{
      setFirstNum((prev)=>{ 
        if(prev != null && operator === '' && (prev !== 0 || value !== 0))
        {
          return prev + value;
        }
        else{
          setOperator('');
          return value;
        }
      });

      setFirstNumDisplay((prev)=>{
        if(prev != null && operator === '' && (prev !== 0 || value !== 0))
        {
          return prev + value;
        }
        else{
          setOperator('');
          return value;
        }
      });
    }
  }

  useEffect(()=>{
    setFirstNumDisplay(secondNum);
    if(secondNum != null)
    {
      setSecondNumDisplay(secondNum + ' ' + displayOperator);
    }
  },[secondNum]);

  useEffect(()=>{
    if(secondNum != null && operator !== '=')
    {
      setSecondNumDisplay((prev)=>{
        return prev.slice(0,-1) + displayOperator;
      })
    }
  },[operator])
  

  const HandleArithmeticClick = (value) => {
    switch(value){
      case '+':
        setSecondNum((prev)=>{
          if(prev == null || operator === '=')
          {
            return Number(firstNum);
          }
          else if(firstNum == null)
          {
            return prev;
          }
          else{
            return Calculate(prev,firstNum);
          }
        });
        
        setOperator('+');
        setDisplayOperator('+');
        setFirstNum(null);
        break;
      case '-':
        setSecondNum((prev)=>{
          if(prev == null || operator === '=')
          {
            return Number(firstNum);
          }
          else if(firstNum == null)
          {
            return prev;
          }
          else{
            return Calculate(prev,Number(firstNum));
          }
        });
        setOperator('-');
        setDisplayOperator('-');
        setFirstNum(null);
        break;
      case 'x':
        setSecondNum((prev)=>{
          if(prev == null || operator === '=')
          {
            return Number(firstNum);
          }
          else if(firstNum == null)
          {
            return prev;
          }
          else{
            return Calculate(prev,Number(firstNum));
          }
        });
        setOperator('x');
        setDisplayOperator('x');
        setFirstNum(null);
        break;
      case '÷':
        setSecondNum((prev)=>{
          if(prev == null || operator === '=')
          {
            return Number(firstNum);
          }
          else if(firstNum == null)
          {
            return prev;
          }
          else{
            return Calculate(prev,Number(firstNum));
          }
        });
        setOperator('÷');
        setDisplayOperator('÷');
        setFirstNum(null);
        break;
      case '=':
        setFirstNum(()=>{
          if(firstNum == null)
          {
            return Calculate(secondNum,firstNumDisplay);
          }
          else{
            return Calculate(secondNum,firstNumDisplay);
          }
          }
        );
        setFirstNumDisplay(()=>{
          if(firstNum == null)
          {
            return Calculate(secondNum,firstNumDisplay);
          }
          else{
            return Calculate(secondNum,firstNumDisplay);
          }
        }
        );
        setOperator('=');
        if(secondNum != null)
        {
          setSecondNumDisplay(Number(secondNum) + ' ' + displayOperator + ' ' + Number(firstNumDisplay) + ' = ');
        }
        else{
          setSecondNumDisplay(Number(firstNumDisplay) + ' = ');
        }
        
        break;
      default:
    }
  }

  const Calculate = (firstVal,secondVal) => {
    if(displayOperator === '+')
    {
      return (Number(firstVal) + Number(secondVal));
    }
    else if(displayOperator === '-')
    {
      return (Number(firstVal) - Number(secondVal));
    }
    else if(displayOperator === '÷')
    {
      return (Number(firstVal) / Number(secondVal));
    }
    else if(displayOperator === 'x')
    {
      return (Number(firstVal) * Number(secondVal));
    }
    else{
      return (Number(secondVal));
    }
  }
  
  const clear = () => {
    setFirstNum(null);
    setFirstNumDisplay(null);
    setSecondNum(null);
    setOperator('');
    setDisplayOperator('');
    setSecondNumDisplay(null);
  }

  const HandleOtherOperators = (value) => {
    switch(value){
      case 'AC':
        clear();
        break;
      case '+/-':{
        setFirstNum((prev)=>{
          return prev * -1;
        });
        setFirstNumDisplay((prev)=>{
          return prev * -1;
        });

        setSecondNumDisplay((prev)=> {
          if(prev !== null)
          {
            return prev + 'negate('+Number(firstNumDisplay) + ')'
          }
          else{
            return 'negate('+Number(firstNumDisplay) + ')'
          }
        });
        break;
      }
      case '%':{
        if(secondNum !== null)
        {
          setFirstNum(Number((firstNumDisplay/100)*secondNum));
          setFirstNumDisplay(Number((firstNumDisplay/100)*secondNum));
          setSecondNumDisplay((prev)=>{
            if(prev !== null)
            {
              return secondNum + ' ' + displayOperator+' '+ Number((firstNumDisplay/100)*secondNum)
            }
            else{
              return Number((firstNumDisplay/100)*secondNum)
            }
          });
        }
        else{
          clear();
        }
        break;
      }
      default:
    }
  }

  return (
    <div className="App">
      <div className='prevValues'>
          <span>{secondNumDisplay !== null ? secondNumDisplay  : ''}</span>
      </div>
      <div className='latestValues'>
          <span>{firstNumDisplay==null? 0 : firstNumDisplay}</span>
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
