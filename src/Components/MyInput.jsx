
export const MyInput = ({config}) => {
    const {id,tipo, holder,valorState,functionState}= config;
    let textarea=null;

    if(tipo==="textArea")
        textarea = true;

  return (

    <>

        <div className="pt-5">
            <label 
                htmlFor={id}
                className="font-bold text-gray-700 uppercase"
                >{holder}</label>
            {!textarea && (
                <input
                    id={id}
                    type={tipo}
                    placeholder={holder}
                    value={valorState}
                    onChange={(e)=>{functionState(e.target.value)}}
                    className="w-full placeholder-gray-400 border-2 rounded-md"
                        
            />)}

            { textarea && (
                <textarea
                    id={id}
                    type={tipo}
                    placeholder={holder}
                    value={valorState}
                    onChange={(e)=>{functionState(e.target.value)}}
                    className="w-full placeholder-gray-400 border-2 rounded-md"
                />)
            }
        </div>
        

    </>
  )
}
