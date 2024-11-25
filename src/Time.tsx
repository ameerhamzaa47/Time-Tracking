import { FC, useEffect, useState } from 'react'

const Time:FC = () => {

    const [hour,setHour]=useState(0)
    const [minute,setMinute]=useState(0)
    const [second,setSecond]=useState(0)
    const [run,setRun]=useState(false)
    const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
    const [nowTime,setnowTime]=useState('')
    const [day, setDay] = useState('Today');
  
    function startTimer() {
      if (run) {
        clearInterval(intervalId);
        setRun(false);
        setHour(0)
        setMinute(0)
        setSecond(0)
      } else {
        const id = setInterval(() => {
          setSecond((prev) =>  prev + 1);
        }, 1000);
  
        setIntervalId(id);
        setRun(true);
      }
    }
  
    useEffect(() => {
      if (second === 60) {
        setMinute((prev) => prev + 1)
        setSecond(0)
        if (minute === 60) {
          setHour((prev) => prev + 1)
          setMinute(0)
        }
      }
    }, [second, minute])
    
    function formatTime(unit:number) {
      return unit < 10 ? '0' + unit : unit;
    }
  
    let date=new Date()
    let HoursNow=date.getHours()
    let MinutesNow;
    MinutesNow=date.getMinutes()
    let timeNow=`${HoursNow<10?"0"+HoursNow:HoursNow}:${MinutesNow<10?"0"+MinutesNow:MinutesNow}`
  
    useEffect(() => {
      setnowTime(timeNow);
    },[])
  
    function handleEvent(e: any) {
      if (e.key === 'Enter') {
        const userHour = Number(nowTime.slice(0, 2));
        const userMinute = Number(nowTime.slice(3, 5));
    
        const date = new Date();
        const currentHour = date.getHours();
        const currentMinute = date.getMinutes();
        const currentSecond = second;
    
        const currentTotalMinutes = currentHour * 60 + currentMinute;
        const userTotalMinutes = userHour * 60 + userMinute;
    
        if (userTotalMinutes < currentTotalMinutes) {
          const elapsedMinutes = currentTotalMinutes - userTotalMinutes;
          setHour(Math.floor(elapsedMinutes / 60));
          setMinute(elapsedMinutes % 60);
          setDay('Today');
        } else {
          const futureMinutes = 24 * 60 - (userTotalMinutes - currentTotalMinutes);
          setHour(Math.floor(futureMinutes / 60));
          setMinute(futureMinutes % 60);
  
          // set yesterday date
          const date = new Date();
          const yesterday = new Date(date.getTime() - 24 * 60 * 60 * 1000);
          setDay(yesterday.toLocaleDateString())
        }
    
        setSecond(currentSecond);
        setRun(true);
      }
    }

  return (
    <>
       <div className="flex justify-center items-center gap-10 bg-white border border-slate-300 h-12 px-6 mx-20 mt-24 shadow-md">

{/* Input */}
<input value={day} disabled className="w-56 py-1 px-4 rounded border border-slate-300" type="text" />
<input value={nowTime} disabled={!run} onKeyPress={handleEvent} onChange={(e) => setnowTime(e.target.value)} className="w-56 py-1 px-4 rounded border border-slate-300" type="text" />

    <div className="flex items-center">
    <h1 className="text-2xl text-gray-700 font-mono">
      {formatTime(hour)}:{formatTime(minute)}:{formatTime(second)}
    </h1>
    <button onClick={startTimer}
      className={`ml-4 py-1 px-4 rounded text-white font-medium ${run ? 'bg-red-500' : 'bg-blue-500'} hover:opacity-90`}>
      {run ? 'Stop' : 'Start'}
    </button>
  </div>
</div> 
    </>
  )
}

export default Time