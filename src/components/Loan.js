import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';
import loanType from './data.json'

const Loan = () => {
    const [modal, setModal] = useState(false);
    const [payout, setPayOut] = useState('all')
    const [allPercentage, setAllPercentage] = useState()
    const [selectedProduct, setSelectedProduct] = useState([])
    const [selectedAll, setSelectedAll] = useState(false)
    const [loanTypeValue, setLoanTypeValue] = useState(loanType.map(obj => ({ ...obj, percentage: '' })))

    // var loanTypeValue = loanType.map(obj => ({ ...obj, payout: '' }))

    // console.log(loanTypeValue)

    const toggle = () => setModal(!modal);

    const handleAllPercenteage = (value) => {
        var newloanType = loanTypeValue.map(obj => ({ ...obj, percentage: value }))
        var newSelectedProduct = selectedProduct.map(obj => ({ ...obj, percentage: value }))
        setSelectedProduct(newSelectedProduct);
        setLoanTypeValue(newloanType)
        setAllPercentage(value)
    }
    const handleSelectAll = (value) => {

        if (value === true) {

            console.log(selectedProduct)
            var newSelectedProduct = loanTypeValue.map(obj => ({ id: obj.id, percentage: obj.percentage }))
            setSelectedProduct(newSelectedProduct);
        }
        setSelectedAll(value)
        // console.log(value)

    }

    const handleSelect = (value, id) => {
        const existingProductIndex = selectedProduct.findIndex((product) => product.id === id);
        var newSelectedProduct = [...selectedProduct]
        if (value === true) {

            if (existingProductIndex === -1) { // product doesn't exist in the array
                var loanindex = loanTypeValue.findIndex((product) => product.id === id);
                newSelectedProduct = [...newSelectedProduct, { id: loanTypeValue[loanindex].id, percentage: loanTypeValue[loanindex].percentage }]
            }

        } else {

            if (existingProductIndex !== -1) { // product doesn't exist in the array
                newSelectedProduct.splice(existingProductIndex, 1)
            }
            setSelectedAll(false)
        }
        setSelectedProduct(newSelectedProduct);

    }

    const handleIndividualPer = (e, id, index) => {
        const existingProductIndex = selectedProduct.findIndex((product) => product.id === id);
        var newSelectedProduct = [...selectedProduct]

        newSelectedProduct[existingProductIndex].percentage = e.target.value
        var newloanTypeValue = [...loanTypeValue]
        newloanTypeValue[index].percentage = e.target.value
        setLoanTypeValue(newloanTypeValue)
        setSelectedProduct(newSelectedProduct);
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
                                    <Input className='w-25 mx-3' type='number' value={allPercentage} onChange={(e) => handleAllPercenteage(e.target.value)} />
                                    %
                                </div>
                            </div> : <></>}
                            <div className='d-flex justify-content-between align-items-center mt-3'>
                                <span className='fw-500 color-dary-gray'>Sub Product</span>
                                <span className='fw-500 color-dary-gray'>Payout %</span>
                            </div>

                            <div className='product-list mt-3'>
                                <div>
                                    <Input id='select-all' type='checkbox' checked={selectedAll} onChange={(e) => handleSelectAll(e.target.checked)} /> <Label for='select-all'>Select All</Label>
                                </div>
                            </div>
                            {loanTypeValue && loanTypeValue.map((curElm, index) => {
                                return (
                                    <div className='product-list mt-2 d-flex justify-content-between align-items-center' key={curElm.id}>
                                        <div>
                                            <Input id={curElm.id} type='checkbox' checked={selectedProduct.some(el => el.id === curElm.id)} onChange={(e) => handleSelect(e.target.checked, curElm.id)} /> <Label for={curElm.id}>{curElm.category_name}</Label>
                                        </div>
                                        <div className='d-flex justify-content-end align-items-center'>
                                            <Input className='w-25 mx-3' type='text' value={curElm.percentage} disabled={payout === 'all' || (selectedProduct.findIndex((product) => product.id === curElm.id) === -1)} onChange={(e) => handleIndividualPer(e, curElm.id, index)} />
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