import { Space, Row, Col, Divider, Input, Button, Card } from 'antd';
import { WithDefaultLayout } from '../components/DefautLayout';
import { Page } from '../types/Page';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CreateCustomerSchemaType } from '@/schemas/CreateCustomerSchema';
import { useAtom } from 'jotai';
import { lineAtom } from '@/store/line';
import { useState } from 'react';

const IndexPage: Page = () => {
    const [line, setLine] = useAtom(lineAtom);
    const { control, handleSubmit } = useForm<CreateCustomerSchemaType>();
    const [uniqueError, setUniqueError] = useState<string | null>();

    const onSubmit: SubmitHandler<CreateCustomerSchemaType> = (data) => {
        const randLine: number = Math.floor(Math.random() * 3);
        const updatedLine: string[][] = [...(line || [])];
        if (!updatedLine[randLine]) {
            updatedLine[randLine] = [];
        }
        // Name uniqueness validation
        const findName = updatedLine.some(line => line.includes(data.name));

        if (findName) {
            setUniqueError('No duplicate names are allowed');
            return;
        }

        updatedLine[randLine] = [...(updatedLine[randLine] || []), data.name];
        setLine(updatedLine);
        console.log(updatedLine);
        setUniqueError(null);


    }


    const handleCashier = (cashier: number) => {
        const updatedItem = line.slice();
        if (updatedItem[cashier]?.[0]) {
            updatedItem[cashier]?.pop();
            setLine(updatedItem)
        }
    }

    return (
        <>
            <Divider orientation='left'>Line Queue Viewer</Divider>
            <Row className='p-4 bg-slate-200 rounded-xl shadow-xl' gutter={[0, 32]}>
                <Col span={24}>
                    <Row gutter={32} >
                        <Col span={8} >
                            <h1 className='text-center font-bold text-xl'>Cashier 1</h1>
                            <Space direction='vertical' style={{ width: '100%' }}>
                                {line[0] && line[0].slice(0, 3).map((item, index) => (
                                    <Card className='shadow-md' key={index}><p className='text-center'>{item}</p></Card>
                                ))}
                                {line[0] && line[0].length > 3 && <Card className='shadow-md'><p className='text-center '>{line[0].length - 3} more</p></Card>}
                            </Space>
                        </Col>
                        <Col span={8}>
                            <div className=''>
                                <h1 className='text-center font-bold text-xl'>Cashier 2</h1>
                                <Space className='' direction='vertical' style={{ width: '100%' }}>
                                    {line[1] && line[1].slice(0, 3).map((item, index) => (
                                        <Card className='shadow-md' key={index}><p className='text-center'>{item}</p></Card>
                                    ))}
                                    {line[1] && line[1].length > 3 && <Card className='shadow-md'><p className='text-center'>{line[1].length - 3} more</p></Card>}
                                </Space>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className=''>
                                <h1 className='text-center font-bold text-xl'>Cashier 3</h1>
                                <Space direction='vertical' style={{ width: '100%' }}>
                                    {line[2] && line[2].slice(0, 3).map((item, index) => (
                                        <Card className='shadow-md' key={index}><p className='text-center'>{item}</p></Card>
                                    ))}
                                    {line[2] && line[2].length > 3 && <Card className='shadow-md'><p className='text-center'>{line[2].length - 3} more</p></Card>}
                                </Space>
                            </div>
                        </Col>
                    </Row >
                </Col >
                <Col span={24}>
                    <Row className='rounded-xl' gutter={8} justify={'center'}>
                        <Col span={12}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Controller
                                    name='name'
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} type='text' />
                                    )}
                                />
                                {uniqueError && <p className='text-red-400 font-bold'>{uniqueError}</p>}
                                <Button htmlType='submit' className='w-1/2 bg-green-400' type='default'>Enter Line</Button>
                            </form>
                        </Col>
                        <Col span={12}>
                            <Space className='flex' direction='vertical'>
                                <Button onClick={() => handleCashier(0)} className='w-full bg-red-200'>Handle Cashier #1</Button>
                                <Button onClick={() => handleCashier(1)} className='w-full bg-red-200'>Handle Cashier #2</Button>
                                <Button onClick={() => handleCashier(2)} className='w-full bg-red-200'>Handle Cashier #3</Button>
                            </Space>
                        </Col>
                    </Row>
                </Col>
            </Row >
        </>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;