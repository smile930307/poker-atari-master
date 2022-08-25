import React, { useState } from 'react';
import Home from './home';
import PlayMode from './playmode';

function Index(){
    const [available, setAvailable] = useState(false);
    return(
    <div className="App">
        <div className='poker-table--wrapper'> 
          { 
            (!available) ? <Home setAvailable = {setAvailable}/> : 
            <PlayMode />
          }
        </div>
    </div>
    )
}

export default Index;