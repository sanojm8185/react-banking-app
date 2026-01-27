import React, { Suspense, useState } from 'react'
import './App.css'
import { Button, Col } from 'antd';


const SavingsApp = React.lazy(() => import("savings/App"));
const CurrentApp = React.lazy(() => import("current/App"));

function App() {
  const [activeTab, setActiveTab] = useState<'savings' | 'current'>('savings');


  return (
    <div style={{ padding: 16 }}>
      <Col span={7} className='button-container'>
        <Button type='primary' onClick={() => setActiveTab('savings')}>Savings Account</Button>
        <Button type='primary' onClick={() => setActiveTab('current')}>Current Account</Button>
      </Col>
      <Suspense fallback={<div>Loading...</div>}>
        {activeTab === 'savings' ?
          <SavingsApp /> :
          <CurrentApp />
        }
      </Suspense>
    </div>
  )
}

export default App
