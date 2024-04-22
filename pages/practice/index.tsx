import React, { useState } from 'react';
import { Row, Col, Table, Button, Input, message, Space } from 'antd';
import { WithDefaultLayout } from '@/components/DefautLayout';
import QueueItem from '@/types/QueueItem';
import { Page } from '@/types/Page';

const PracticePage : Page = () => {
  return <>
  {PracticePageForm({})}
  </>
  
}

const PracticePageForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [cashier1, setCashier1] = useState<QueueItem[]>([]);
  const [cashier2, setCashier2] = useState<QueueItem[]>([]);
  const [cashier3, setCashier3] = useState<QueueItem[]>([]);

  const addToQueue = (queue: QueueItem[], setQueue: React.Dispatch<React.SetStateAction<QueueItem[]>>) => {
    if (!name.trim()) return;

    if (queue.some(item => item.name === name)) {
      message.error('Name already exists in the queue!');
      return;
    }

    const newItem: QueueItem = { name };
    setQueue([...queue, newItem]);
    setName('');
  };

 const clearQueue = (setQueue: React.Dispatch<React.SetStateAction<QueueItem[]>>) => {
    setQueue(prevQueue => {
      if (prevQueue.length > 0) {
        return prevQueue.slice(1);
      }
      return prevQueue;
    });
  }; 
  const getTotalQueue = () => {
    return cashier1.length + cashier2.length + cashier3.length;
  };
  const getRemainingQueueMessage = () => {
    const remaining = 3 - getTotalQueue();
    if (remaining === 0) {
      return null;
    } else if (remaining === 1) {
      return `1 more queue`;
    } else {
      return `${remaining} more queues`;
    }
  };
  const submitToQueue = () => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;\

    switch (randomNumber) {
      case 1:
        addToQueue(cashier1, setCashier1);
        break;
      case 2:
        addToQueue(cashier2, setCashier2);
        break;
      case 3:
        addToQueue(cashier3, setCashier3);
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <Space style={{display : "flex" }} direction='vertical' size={"middle"} >
      <h1>Line Queue Viewer</h1>
      <hr />
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Table
            dataSource={cashier1}
            columns={columns}
            pagination={false}
            bordered
            title={() => 'Cashier 1 Queue'}
            footer={() => (
              <Button onClick={() => clearQueue(setCashier1)}>Handle Queue</Button>
            )}
          />
        </Col>
        <Col span={8}>
          <Table
            dataSource={cashier2}
            columns={columns}
            pagination={false}
            bordered
            title={() => 'Cashier 2 Queue'}
            footer={() => (
              <Space>
            {getRemainingQueueMessage() && <p style={{ color: 'orange' }}>{getRemainingQueueMessage()}</p>}

            <Button onClick={() => clearQueue(setCashier2)}>Handle Queue</Button>
            </Space>
            )}
            
          />
        </Col>
        <Col span={8}>
          <Table
            dataSource={cashier3}
            columns={columns}
            pagination={false}
            bordered
            title={() => 'Cashier 3 Queue'}
            footer={() => (
              <Button onClick={() => clearQueue(setCashier3)}>Handle Queue</Button>
            )}
          />
        </Col>
      </Row>

       <Row gutter={[5, 6]}>
        <Col span={8}>
          <Input
            placeholder="Enter name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Col>
         <Col span={8}>
          <Button type="primary" onClick={submitToQueue} className = "bg-slate-500">
            Submit
          </Button>
        </Col>
      </Row>
      <Row>
        <Space direction= "vertical" size={"small"} style={{display: "flex"}}>
        <Col span={8}>
          <Button className = "bg-slate-500" type="primary" onClick={() => addToQueue(cashier1, setCashier1)}>
            Cashier 1
          </Button>
          <Button className = "bg-slate-500"type="primary" onClick={() => addToQueue(cashier2, setCashier2)}>
            Cashier 2
          </Button>
          <Button className = "bg-slate-500" type="primary" onClick={() => addToQueue(cashier3, setCashier3)}>
            Cashier 3
          </Button>
        </Col>
        </Space>
       </Row>
      

    </Space>
  );
};
PracticePage.layout = WithDefaultLayout;
export default PracticePage;


