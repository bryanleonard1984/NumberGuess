import * as DT from "./DMMan.js";

let number = 0;
let gNum;
let numMin = parseInt(DT.getEl.gEID("min").textContent);
let numMax = parseInt(DT.getEl.gEID("max").textContent);

//Main Functions
function NumVal(val)
{
  let v = DT.getEl.gEID(val);
  if(v.value == "")
    {
      Warn(1,0);
    }
  else if(isNaN(v.value))
    {
      Warn(2,0);
      v.value = "";
    }
  else
    {
      v = parseInt(v.value);
      if(v < numMin || v > numMax)
        {
          Warn(3,0);
          DT.getEl.gEID(val).value = "";
        }
      else if(v >= numMin && v <= numMax)
        {
          gNum = Math.floor(v);
          DT.getEl.gEID("btnGuess").style.visibility = "visible";
        }
    }
}

function WarnClr()
{
  Warn(0,0);
}

function Guess()
{ 
  number = number === 0
    ? number = Math.floor((Math.random() * 1000) + 1) : number;
  console.log(number);
  if(gNum == number)
    {
      Win();
    }
  else
    {
      Warn(4,0);
      RangeAdjust();
    }
  BtnGuess();
}

const Load = () =>
{
  let el = DT.getEl.gEID('txtNum');
  el.addEventListener('blur', function(){NumVal('txtNum');});
  el.addEventListener('focus', function(){WarnClr()});
  el.addEventListener('keydown', function(){KeyDown(event);});
  el = DT.getEl.gEID('btnGuess');
  el.addEventListener('click', function(){Guess();})
}

const Win = () =>
{  
  Warn(5,1);
  DT.getEl.gEID("txtNum").style.visibility = "hidden";
}

const KeyDown = (event) =>
{
  const key = event.which || event.keycode;
  if(key === 13)
  {
    const el = DT.getEl.gEID('txtNum');
    el.blur();
  }
}

const BtnGuess = () =>
{
  DT.getEl.gEID("btnGuess").style.visibility = "hidden";
  let score = parseInt(DT.getEl.gEID("sNum").textContent);
  score = score + 1;
  DT.getEl.gEID("sNum").textContent = score;
}

const Warn = (t,c) =>
{
  const text = ["","Please enter a value.","Please enter a number.",
                "Please enter a number within parameters.","Sorry, try again.",
                `Congratulations, you guessed the number: ${gNum}!`];
  const color = ["hsl(0, 75%, 50%)","hsl(135,75%,20%)"];
  const warn = DT.getEl.gEID('warning');
  warn.style.color = color[c];
  warn.textContent = text[t];
}

const RangeAdjust = () =>
{
  if(gNum < number)
    {
      numMin = gNum;
      DT.getEl.gEID("min").textContent = numMin + 1;
      numMin = parseInt(DT.getEl.gEID('min').textContent);
    }
  else
    {
      numMax = gNum;
      DT.getEl.gEID("max").textContent = numMax - 1;
      numMax = parseInt(DT.getEl.gEID('max').textContent);
    }
}

window.onload = Load();