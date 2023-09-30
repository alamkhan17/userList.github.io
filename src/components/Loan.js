import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';

const Loan = () => {
    const [modal, setModal] = useState(false);
    const [payout, setPayOut] = useState('all')

    const toggle = () => setModal(!modal);

    const loanType = [
        { id: 1, type: 'Home Loan' },
        { id: 2, type: 'Loan Against Property' },
        { id: 3, type: 'Personal Loan' },
        { id: 4, type: 'Business Loan' },
        { id: 5, type: 'Life Insurance' },
        { id: 6, type: 'Health Insurance' }
    ]
    return (
        <>
            <div>
                <Button className='btn add-user-btn' color="danger" onClick={toggle}>
                    Second Task
                </Button>
                <Modal isOpen={modal} toggle={toggle} scrollable={true}>
                    <ModalHeader className='border-0' toggle={toggle}>Add Proposed Product & Payout</ModalHeader>
                    <ModalBody>
                        <Input className="mb-3" type="select" >
                            <option>
                                OneAndro Management
                            </option>
                        </Input>
                        <div className='text-center border-bottom loan-title'>
                            <span className='m-0 '>Loan</span>
                        </div>
                        <FormGroup check>
                            <div>
                                <Input type="radio" name='all' id='all-product' checked={payout === 'all'} onChange={() => setPayOut('all')} />
                                <Label for='all-product'>Set flat payout % for all sub-products</Label>
                            </div>
                            <div>
                                <Input type="radio" name='per' id='per-product' checked={payout === 'per'} onChange={() => setPayOut('per')} />
                                <Label for='per-product'>Set payout % per sub-products</Label>
                            </div>
                        </FormGroup>
                        <div>
                            {payout === 'all' ? <div className='d-flex justify-content-between align-items-center'>
                                <span className='fw-500'>Enter Flat payout</span>
                                <div className='d-flex justify-content-end align-items-center'>
                                    <Input className='w-25 mx-3' type='text' />
                                    %
                                </div>
                            </div> : <></>}
                            <div className='d-flex justify-content-between align-items-center mt-3'>
                                <span className='fw-500 color-dary-gray'>Enter Flat payout</span>
                                <span className='fw-500 color-dary-gray'>Payout %</span>
                            </div>

                            <div className='product-list mt-3'>
                                <div>
                                    <Input id='select-all' type='checkbox' /> <Label for='select-all'>Select All</Label>
                                </div>
                            </div>
                            {loanType && loanType.map((curElm) => {
                                return (
                                    <>
                                        <div className='product-list mt-2 d-flex justify-content-between align-items-center'>
                                            <div>
                                                <Input id={curElm.id} type='checkbox' /> <Label for={curElm.id}>{curElm.type}</Label>
                                            </div>
                                            <div className='d-flex justify-content-end align-items-center'>
                                                <Input className='w-25 mx-3' type='text' disabled={payout === 'all'} />
                                                %
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>
                            Submit
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    )
}

export default Loan