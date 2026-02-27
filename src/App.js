import { useState } from 'react';
import './App.css';
import Calculator from './components/calculator/calculator'

function App() {
  const [showSidePanel, SetShowSidePanel] = useState(false);
  const [historyData, setHistoryData] = useState([]);

  return (
    <div>
      <div className={showSidePanel ? 'side-panel open' : 'side-panel close'}>
        <div className='history'>History</div>
        <div className='history-content'>{historyData.map((e) => <div>
          <div>{e.equation}</div>
          <div>{e.result}</div>
          <div>{e.time}</div>
        </div>)}</div>
      </div>
      <Calculator SetShowSidePanel={SetShowSidePanel} showSidePanel={showSidePanel} setHistoryData={setHistoryData} />
    </div>

  );
}

export default App;
