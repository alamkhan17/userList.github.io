import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';
import loanType from './data.json'

const Loan = () => {
    const [modal, setModal] = useState(false);
    const [payout, setPayOut] = useState('all')
    const [allPercentage, setAllPercentage] = useState(0)
    const [selectedProduct, setSelectedProduct] = useState([])
    const [selectedAll, setSelectedAll] = useState(false)

    var loanTypeValue = loanType
    const toggle = () => setModal(!modal);

    const handleAllPercenteage = (e) => {
        if (selectedProduct.length > 0) {
            setAllPercentage(e.target.value)
        } else {
            //show error - please select product
            setAllPercentage('')
        }
    }
    const handleSelect = (value) => {
        let percentage
        if (value === true) {

            console.log(selectedProduct)
            if (payout === 'all') {
                percentage = allPercentage
                setSelectedProduct([]);
            } else {
                percentage = 0
            }

            // if (!arr.some(el => el.id === elm.id))
            //      arr.push({ id, username: name });
            loanType.forEach((elm, index, array) => {
                console.log(elm)

                setSelectedProduct((oldArray) => [...oldArray, {
                    category_name: elm.category_name,
                    id: elm.id,
                    percentage: percentage
                }]);
                if (index === array.length - 1) {
                    console.log('selectedProduct')
                } else {
                    console.log("index", index)
                }
            })
        }
        setSelectedAll(value)
        console.log(value)

    }
    console.log(selectedProduct)
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
                                    <Input className='w-25 mx-3' type='number' value={allPercentage} onChange={(e) => handleAllPercenteage(e)} />
                                    %
                                </div>
                            </div> : <></>}
                            <div className='d-flex justify-content-between align-items-center mt-3'>
                                <span className='fw-500 color-dary-gray'>Sub Product</span>
                                <span className='fw-500 color-dary-gray'>Payout %</span>
                            </div>

                            <div className='product-list mt-3'>
                                <div>
                                    <Input id='select-all' type='checkbox' checked={selectedAll} onChange={(e) => handleSelect(e.target.checked)} /> <Label for='select-all'>Select All</Label>
                                </div>
                            </div>
                            {loanType && loanType.map((curElm) => {
                                return (
                                    <div className='product-list mt-2 d-flex justify-content-between align-items-center' key={curElm.id}>
                                        <div>
                                            <Input id={curElm.id} type='checkbox' /> <Label for={curElm.id}>{curElm.category_name}</Label>
                                        </div>
                                        <div className='d-flex justify-content-end align-items-center'>
                                            <Input className='w-25 mx-3' type='text' disabled={payout === 'all'} />
                                            %
                                        </div>
                                    </div>
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