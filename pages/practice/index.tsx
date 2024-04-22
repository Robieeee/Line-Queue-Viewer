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

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
];

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

  const remainingQueue = (queue: QueueItem[]) => {
    const maxQueue = 3;
    const remaining = queue.length - maxQueue;
    if (queue.length <= 3){
      return null;
    }
    else if (remaining) {
      return `${remaining} more queue`  ;
    }
    return;
  };
  const submitToQueue = () => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;

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

  return (
    <Space style={{display : "flex" }} direction='vertical' size={"middle"} >
      <h1>Line Queue Viewer</h1>
      <hr />
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Table
            dataSource={cashier1.slice(0,3)}
            columns={columns}
            pagination={false}
            bordered
            title={() => 'Cashier 1 Queue'}
            footer={() => (
              <Space>
              <Button onClick={() => clearQueue(setCashier1)}>Handle Queue</Button>
              {remainingQueue(cashier1) && <p className='text-red-600'>{remainingQueue(cashier1)}</p>}
              </Space>
            )}
          />
        </Col>

        <Col span={8}>
          <Table
            dataSource={cashier2.slice(0,3)}
            columns={columns}
            pagination={false}
            bordered
            title={() => 'Cashier 2 Queue'}
            footer={() => (
              <Space>
            <Button onClick={() => clearQueue(setCashier2)}>Handle Queue</Button>
            {remainingQueue(cashier2) && <p className='text-red-600'>{remainingQueue(cashier2)}</p>}

            </Space>
            )}
            
          />
        </Col>
        <Col span={8}>
          <Table
            dataSource={cashier3.slice(0,3)}
            columns={columns}
            pagination={false}
            bordered
            title={() => 'Cashier 3 Queue'}
            footer={() => (
              <Space>
              <Button onClick={() => clearQueue(setCashier3)}>Handle Queue</Button>
              {remainingQueue(cashier3) && <p className='text-red-600'>{remainingQueue(cashier3)}</p>}
              </Space>
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
          <Button type="primary" onClick={submitToQueue} className = "bg-green-500">
            Submit
          </Button>
        </Col>
      </Row>

      <Row>
        <Space direction= "vertical" size={"small"} style={{display: "flex"}}>
        <Col span={8} className='flex gap-3'>
          <Button className = "bg-green-500" type="primary" onClick={() => addToQueue(cashier1, setCashier1)}>
            Cashier 1
          </Button>
          <Button className = "bg-green-500"type="primary" onClick={() => addToQueue(cashier2, setCashier2)}>
            Cashier 2
          </Button>
          <Button className = "bg-green-500" type="primary" onClick={() => addToQueue(cashier3, setCashier3)}>
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


