import { useState } from 'react';
import SmartfitButton from './SmartfitButton';

function App() {
  const [ean, setEan] = useState(4052968298162);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}
    >
      <h1>Please enter an EAN</h1>
      <input
        type='text'
        value={ean}
        onChange={(event) => setEan(event.target.value)}
        style={{ maxWidth: '150px', marginBottom: '10px' }}
      />
      {!!ean ? <SmartfitButton ean={ean} /> : <p>Please enter a valid EAN</p>}
    </div>
  );
}

export default App;
