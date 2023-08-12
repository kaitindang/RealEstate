import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import RealEstateService from './Service/RealEstateService';
import FinanceService from './Service/FinanceService';

import ImageService from './Service/ImageService';

const Finance = () => {

    const [Finance, setFinance] = useState([])

    const [id_bank, setId_bank] = useState('')
    const [loan_amount, setLoan_amount] = useState('')
    const [loan_term, setLoan_term] = useState('')
    const [repayment_method, setrepayment_method] = useState('')
    const [prices_property, setPrices_property] = useState('')
    const [image_product, setImage_product] = useState('')
    const [banks, setBanks] = useState([])

    const [prices, setPrices] = useState('')

    const { id } = useParams();

    const FinanceCalculate = (e) => {
        e.preventDefault();

        const realestates = {
            id_bank, loan_amount, loan_term, repayment_method, prices_property
        }

        FinanceService.calculateBank(realestates).then((response) => {
            console.log(response.data)
            setFinance(response.data)
            

        }).catch(error => {
            console.log(error)
        })

    }

    const getAllBank = () => {
        FinanceService.getAllBank().then((response) => {
            console.log(response.data)
            setBanks(response.data)

        }).catch(error => {
            console.log(error)
        })

    }

    const ref1 = React.useRef();
    const ref2 = React.useRef();
    const ref3 = React.useRef();
    const ref4 = React.useRef();
    
    const css1 = () => {

        let a = ref1.current?.innerText.replaceAll(".","");
        let d = ref4.current?.innerText.replaceAll(".","");

        let a1 = a/d*100;

        console.log(a1.toFixed(0))

        return a1.toFixed(0) + '%'

    }

    const css2 = () => {


        let a = ref2.current?.innerText.replaceAll(".","");
        let d = ref4.current?.innerText.replaceAll(".","");

        let a1 = a/d*100;

        console.log(a1.toFixed(0))

        return a1.toFixed(0) + '%'

    }

    const css3 = () => {


        let a = ref3.current?.innerText.replaceAll(".","");
        let d = ref4.current?.innerText.replaceAll(".","");

        let a1 = a/d*100;

        console.log(a1.toFixed(0))

        return a1.toFixed(0) + '%'

    }




    useEffect(() => {
        RealEstateService.getRealEstateById(id).then((response) => {
            console.log(response.data)

            setPrices_property(response.data.price)
            setImage_product(response.data.image_product)

        }).catch(error => {
            console.log(error)
        })

        getAllBank()
    }, [])

    return (
        <form >
            <div class="row">
                <div class="col-md-6">

                    <div class="form-row" style={{ display: 'flex' }}>
                        <div class="form-group col-md-9 mb-3">
                            <label for="inputprices_property">Giá BDS</label>
                            <input type="text"
                                class="form-control"
                                name="prices_property"
                                value={prices_property.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")}
                                onChange={(e) => setPrices_property(e.target.value)}
                                id="prices_property"
                                disabled>
                            </input>
                        </div>
                        <div class="form-group col-md-3 mb-3">
                            <label for="inputState">Đơn vị</label>
                            <select id="inputState" class="form-control" disabled>
                                <option selected>VND</option>
                            </select>
                        </div>

                    </div>

                    <div class="form-row" style={{ display: 'flex' }}>
                        <div class="form-group col-md-9 mb-3">
                            <label for="loan_amount">Số tiền muốn vay</label>
                            <input type="text"
                                class="form-control"
                                name="loan_amount"
                                onChange={(e) => setLoan_amount(e.target.value)}
                                id="inputLoan_amount">
                            </input>
                        </div>
                        <div class="form-group col-md-3 mb-3">
                            <label for="inputState">Đơn vị</label>
                            <select id="inputState" class="form-control" disabled>
                                <option selected>VND</option>
                            </select>
                        </div>

                    </div>
                    <div class="form-row" style={{ display: 'flex' }}>
                        <div class="form-group col-md-9 mb-3">
                            <label for="loan_term">Thời hạn vay</label>
                            <input type="text"
                                class="form-control"
                                name="loan_term"
                                onChange={(e) => setLoan_term(e.target.value)}
                                id="inputLoan_term">
                            </input>
                        </div>
                        <div class="form-group col-md-3 mb-3">
                            <label for="inputState">Đơn vị</label>
                            <select id="inputState" class="form-control" disabled>
                                <option selected>Tháng</option>
                            </select>
                        </div>

                    </div>

                    <div class="form-row" style={{ display: 'flex' }}>
                        <div class="form-group col-md-12 mb-3">
                            <label for="inputTitle">Ngân hàng</label>
                            <select class="form-control" id="exampleFormControlSelect1"
                                name="id_bank"
                                onChange={(e) => setId_bank(e.target.value)}
                            >


                                {
                                    banks.map(

                                        bank =>
                                            <option value={bank.id_bank}>{bank.bank_name} ({bank.bank_rate}%)</option>
                                    )}



                            </select>
                        </div>

                    </div>

                    <div class="form-row" style={{ display: 'flex' }}>
                        <div class="form-group col-md-12 mb-3">
                            <label for="inputTitle">Loại hình</label>
                            <select class="form-control" id="exampleFormControlSelect1"
                                name="repayment_method"
                                onChange={(e) => setrepayment_method(e.target.value)}
                            >
                                <option value="1">Trả trên dư nợ ban đầu</option>
                                <option value="2">Trả trên dư nợ giảm dần</option>

                            </select>
                        </div>
                    </div>

                </div>
                <div class="col-md-6 fd-sidebar-item">
                    <div className="recently-item ">
                        <div class="d-flex justify-content-evenly">
                            <img src={image_product} alt="detail" width="50px" />
                            <span></span>
                            <div>
                                <b>Giá trị BĐS:</b>
                                <h5>{prices_property.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")} VND</h5>
                            </div>

                        </div>
                        <br></br>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style={{ width: css1() }} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                            <div class="progress-bar bg-success" role="progressbar" style={{ width: css2() }} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                            <div class="progress-bar bg-warning" role="progressbar" style={{ width: css3() }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <br></br>
                        <div class="d-flex justify-content-between">
                            <span class="text-primary">Cần trả trước ({css1()}):</span>
                            {
                                Finance.filter(finance => finance.term === 1)
                                    .map(
                                        Finance =>
                                            <span ref={ref1}>{Finance.prepay_amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")}</span>
                                            
                                    )}
                        </div>
                        <div class="d-flex justify-content-between">
                            <span class="text-success">Gốc cần trả ({css2()}):</span>
                            {
                                Finance.filter(finance => finance.term === 1)
                                    .map(
                                        Finance =>
                                            <span ref={ref2}>{Finance.principal_amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")}</span>
                                    )}
                        </div>
                        <div class="d-flex justify-content-between">
                            <span class="text-warning">Lãi cần trả ({css3()}):</span>
                            {
                                Finance.filter(finance => finance.term === Finance.length)
                                    .map(
                                        Finance =>
                                            <span ref={ref3}>{Finance.interest_amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")}</span>
                                    )}
                        </div>
                        <hr></hr>
                        <div class="d-flex justify-content-between">
                            <span>Thanh toán hàng tháng:</span>
                            {
                                Finance.filter(finance => finance.term === 1)
                                    .map(
                                        Finance =>
                                            <span>{Finance.interest_month.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")}</span>
                                    )}
                        </div>
                        <hr></hr>
                        <div class="d-flex justify-content-between">
                            <span>Tổng phải trả:</span>
                            {
                                Finance.filter(finance => finance.term === Finance.length)
                                    .map(
                                        Finance =>
                                            <span ref={ref4}><b>{Finance.total_amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")}</b></span>
                                    )}
                        </div>

                    </div>

                </div>
            </div>

            <button className="btn btn-success" onClick={(e) => FinanceCalculate(e)} >Thực hiện </button>
            <p></p>
            <h4 class="text-center">Chi tiết khoản vay phải trả hàng tháng</h4>
            <table class="table table-bordered text-center">

                <thead class="table-secondary">
                    <tr>
                        <th scope="col">Kỳ</th>
                        <th scope="col">Dư nợ đầu kỳ</th>
                        <th scope="col">Trả gốc</th>
                        <th scope="col">Trả lãi</th>
                        <th scope="col">Tổng trả</th>
                        <th scope="col">Dư nợ còn lại</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Finance.map(

                            Finance =>
                                <tr>
                                    <th scope="row">{Finance.term}</th>

                                    <td>{Finance.principal_amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")}</td>
                                    <td>{Finance.original_payment.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")}</td>
                                    <td>{Finance.interest_payment.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")}</td>
                                    <td>{Finance.interest_month.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")}</td>
                                    <td>{Finance.remaining_balance.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")}</td>


                                </tr>
                        )}
                </tbody>
            </table>


        </form>


    )
}

export default Finance