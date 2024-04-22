import { Space, Row, Col, Divider, Input, Button, Card, Modal } from 'antd';
import { WithDefaultLayout } from '../components/DefautLayout';
import { Page } from '../types/Page';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CreateCustomerSchemaType } from '@/schemas/CreateCustomerSchema';
import { useAtom } from 'jotai';
import { lineAtom } from '@/store/line';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import Toast from '@/components/Toast';

const IndexPage: Page = () => {
    const [line, setLine] = useAtom(lineAtom);
    const { control, handleSubmit } = useForm<CreateCustomerSchemaType>();
    const [uniqueError, setUniqueError] = useState<string | null>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const onSubmit: SubmitHandler<CreateCustomerSchemaType> = (data) => {
        const randLine: number = Math.floor(Math.random() * 3);
        const updatedLine: string[][] = [...(line || [])];
        if (!updatedLine[randLine]) {
            updatedLine[randLine] = [];
        }

        if (!data.name) {
            setUniqueError("Name can't be empty");
            return;
        }
        // Name uniqueness validation
        const findName = updatedLine.some(line => line.includes(data.name));

        if (findName) {
            setUniqueError('No duplicate names are allowed');
            return;
        }
        console.log(data.name)


        updatedLine[randLine] = [...(updatedLine[randLine] || []), data.name];
        setLine(updatedLine);
        setUniqueError(null);
        setIsModalOpen(true);

        setTimeout(() => {
            setIsModalOpen(false);
        }, 3000);
    }


    const handleCashier = (cashier: number) => {
        const updatedItem = line.slice();
        if (updatedItem[cashier]?.[0]) {
            updatedItem[cashier]?.shift();
            setLine(updatedItem)
        }
    }

    return (
        <>
            <Divider orientation='left'>Line Queue Viewer</Divider>
            <Row className='p-10 bg-slate-900 rounded-xl shadow-xl h-5/6' justify={'center'} align={'bottom'} gutter={[0, 32]}>
                <Col className='self-start' span={24}>
                    <Row gutter={24} >
                        <Col span={8} >
                            <h1 className='text-center font-bold text-xl text-white'>Cashier 1</h1>
                            <Space direction='vertical' style={{ width: '100%', gap: '1.5rem' }}>
                                {line[0] && line[0].slice(0, 3).map((item, index) => {
                                    return (
                                        <AnimatePresence key={index}>
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.5 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                            >
                                                <Card className='shadow-md' ><p className='text-center'>{item}</p></Card>
                                            </motion.div>

                                        </AnimatePresence>

                                    )
                                })}
                                {line[0] && line[0].length > 3 && <Card className='shadow-md'><p className='text-center '>{line[0].length - 3} more</p></Card>}
                            </Space>
                        </Col>
                        <Col span={8}>
                            <div className=''>
                                <h1 className='text-center font-bold text-xl text-white'>Cashier 2</h1>
                                <Space className='' direction='vertical' style={{ width: '100%', gap: '1.5rem' }}>
                                    {line[1] && line[1].slice(0, 3).map((item, index) => {
                                        return (
                                            <AnimatePresence key={index}>
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                    exit={{ scale: 0, opacity: 0 }}
                                                >
                                                    <Card className='shadow-md' ><p className='text-center'>{item}</p></Card>
                                                </motion.div>
                                            </AnimatePresence>
                                        )
                                    })}
                                    {line[1] && line[1].length > 3 && <Card className='shadow-md'><p className='text-center'>{line[1].length - 3} more</p></Card>}
                                </Space>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className=''>
                                <h1 className='text-center font-bold text-xl text-white'>Cashier 3</h1>
                                <Space direction='vertical' style={{ width: '100%', gap: '1.5rem' }}>
                                    {line[2] && line[2].slice(0, 3).map((item, index) => {
                                        return (
                                            <AnimatePresence key={index}>
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                    exit={{ scale: 0, opacity: 0 }}
                                                >
                                                    <Card className='shadow-md' ><p className='text-center'>{item}</p></Card>
                                                </motion.div>
                                            </AnimatePresence>

                                        )
                                    })}
                                    {line[2] && line[2].length > 3 && <Card className='shadow-md'><p className='text-center'>{line[2].length - 3} more</p></Card>}
                                </Space>
                            </div>
                        </Col>
                    </Row >
                </Col >
                <Col span={24}>
                    <Row className='rounded-xl'>
                        <Col span={12}>
                            <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
                                <Controller
                                    name='name'
                                    control={control}
                                    render={({ field }) => (
                                        <Input {...field} className='shadow-md' size='large' type='text' />
                                    )}
                                />
                                {uniqueError && <p className='text-red-400 font-bold'>{uniqueError}</p>}
                                <Button htmlType='submit' className='w-4/6 bg-green-400 shadow-md text-white font-bold' size='large' type='default'>Enter Line</Button>
                            </form>
                        </Col>
                        <Col span={12} >
                            <div className='w-full flex flex-col justify-center items-center gap-2'>
                                <Button type='default' onClick={() => handleCashier(0)} size='large' className='rounded-lg w-5/6 bg-red-400 font-bold text-white shadow-md'>Handle Cashier #1</Button>
                                <Button type='default' onClick={() => handleCashier(1)} size='large' className='rounded-lg w-5/6 bg-red-400 font-bold text-white shadow-md'>Handle Cashier #2</Button>
                                <Button type='default' onClick={() => handleCashier(2)} size='large' className='rounded-lg w-5/6 bg-red-400 font-bold text-white shadow-md'>Handle Cashier #3</Button>

                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row >
            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                title={(uniqueError ? <h1 className='text-red-400'>Failed</h1> : <h1 className='text-green-400'>Success</h1>)}
                footer={[
                    <Button className='hover:bg-blue-400 hover:text-white' key="ok" onClick={() => setIsModalOpen(false)}>Ok</Button>
                ]}
            >
                {uniqueError && <p>{uniqueError}</p>}
                {!uniqueError && <p>Successfully created a data</p>}
            </Modal >
            {/* <AnimatePresence>
                {isModalOpen && <Toast />}
            </AnimatePresence> */}
        </>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;