import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [Length, setLength] = useState(8);
  const [Num, setNum] = useState(false);
  const [Char, setChar] = useState(false);
  const [Password, setPassword] = useState('genpass');

  const passGen = useCallback(() => {
    let genpass = "";
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghijklmnopqrstuvwxyz';

    if (Char) string += '@#$:()';
    if (Num) string += '0123456789';

    for (let i = 1; i < Length; i++) {
      const all = Math.floor(Math.random() * string.length + 1)
      genpass += string.charAt(all) // kon si string pr aap ko charactor chahiye
    }
    setPassword(genpass);
  }, [Length, Num, Char, setPassword])

  const ref = useRef(null);

  const CopyToClipBoard = useCallback(() => {
    window.navigator.clipboard.writeText(Password);
    ref.current?.select();
  }, [Password])
  useEffect(() => {
    passGen()
  }, [Length, Num, Char, passGen])

  return (
    <>
      <div className="box">
        <div className="element">
          <input type="text"
            value={Password}
            placeholder='Password'
            ref={ref}
            readOnly
          />
          <button onClick={CopyToClipBoard}>copy</button>
        </div>
        <div className='element2'>
          <input type="range"
            min={8}
            max={30}
            value={Length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length : {Length}</label>
        </div>
        <div className='element3'>
          <input type="checkbox"
            id='addnum'
            defaultChecked={Num}
            onChange={(e) => {
              setNum((pr) => !pr)
            }}
          />
          <label htmlFor="addnum">add numbers</label>
        </div>
        <div className='element4'>
          <input type="checkbox"
            id='addchar'
            defaultChecked={Char}
            onChange={(e) => {
              setChar((pr) => !pr)
            }}
          />
          <label htmlFor="addchar">add sepical char</label>
        </div>
      </div>
    </>
  )
}

export default App
