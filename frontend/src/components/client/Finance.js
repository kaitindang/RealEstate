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
    const [price, setPrice] = useState('')

    const { id } = useParams();

    const FinanceCalculate = (e) => {
        e.preventDefault();

        const realestates = {
            id_bank, loan_amount, loan_term, repayment_method, prices_property
        }

        FinanceService.calculateBank(realestates).then((response) => {
            console.log(response.data)
            setFinance(response.data)
            debugger

        }).catch(error => {
            console.log(error)
        })

    }

    const FinanceCalculates = () => {
        const a = "00000000";
        if (a == 0) {
            divStyle.width = 30
        }     

    }

    const divStyle = {
        width: '15%'
        
      };


    useEffect(() => {
        RealEstateService.getRealEstateById(id).then((response) => {
            console.log(response.data)

            setPrice(response.data.price)

        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <form >
            <div class="row">
                <div class="col-md-6">

                    <div class="form-row" style={{ display: 'flex' }}>
                        <div class="form-group col-md-8 mb-3">
                            <label for="inputprices_property">Giá BDS</label>
                            <input type="text"
                                class="form-control"
                                name="price"
                                
                                onChange={(e) => setPrices_property(e.target.value)}
                                id="price">
                            </input>
                        </div>
                        <div class="form-group col-md-4 mb-3">
                            <label for="inputState">Đơn vị</label>
                            <select id="inputState" class="form-control">
                                <option selected>VND</option>
                            </select>
                        </div>

                    </div>

                    <div class="form-row" style={{ display: 'flex' }}>
                        <div class="form-group col-md-8 mb-3">
                            <label for="loan_amount">Số tiền muốn vay</label>
                            <input type="text"
                                class="form-control"
                                name="loan_amount"
                                onChange={(e) => setLoan_amount(e.target.value)}
                                id="inputLoan_amount">
                            </input>
                        </div>
                        <div class="form-group col-md-4 mb-3">
                            <label for="inputState">Đơn vị</label>
                            <select id="inputState" class="form-control">
                                <option selected>VND</option>
                            </select>
                        </div>

                    </div>
                    <div class="form-row" style={{ display: 'flex' }}>
                        <div class="form-group col-md-8 mb-3">
                            <label for="loan_term">Thời hạn vay</label>
                            <input type="text"
                                class="form-control"
                                name="loan_term"
                                onChange={(e) => setLoan_term(e.target.value)}
                                id="inputLoan_term">
                            </input>
                        </div>
                        <div class="form-group col-md-4 mb-3">
                            <label for="inputState">Đơn vị</label>
                            <select id="inputState" class="form-control">
                                <option selected>Tháng</option>
                            </select>
                        </div>

                    </div>

                    <div class="form-row" style={{ display: 'flex' }}>
                        <div class="form-group col-md-9 mb-3">
                            <label for="inputTitle">Ngân hàng</label>
                            <select class="form-control" id="exampleFormControlSelect1"
                                name="id_bank"
                                onChange={(e) => setId_bank(e.target.value)}
                            >
                                <option value="0"></option>
                                <option value="1">BIDV</option>
                                <option value="2">Agribank</option>
                                <option value="3">Vietinbank</option>
                                <option value="4">Vietcombank</option>
                                <option value="5">MSB</option>
                            </select>
                        </div>
                        <div class="form-group col-md-3 mb-3">
                            <label for="inputFloor">Lãi suất</label>
                            <input type="text"                             
                            >
                            </input>
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
                            <img src="/img/product1.jpeg" alt="detail" width="50px" />
                            <span></span>
                            <div>
                                <b>Giá trị BĐS:</b>
                                <h5>{price.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")} VND</h5>
                            </div>
                            
                        </div>
                        <br></br>
                        <div class="progress">
                                <div class="progress-bar" role="progressbar" style={FinanceCalculates()} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                                <div class="progress-bar bg-success" role="progressbar" style={{width: '15%'}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                <div class="progress-bar bg-info" role="progressbar" style={{width: '15%'}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        <br></br>
                        <div class="d-flex justify-content-between">
                            <span>Cần trả trước:</span>
                            {
                                Finance.filter(finance => finance.term === 1)
                                    .map(
                                        Finance =>
                                            <span>{Finance.prepay_amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")}</span>
                                    )}
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Gốc cần trả:</span>
                            {
                                Finance.filter(finance => finance.term === 1)
                                    .map(
                                        Finance =>
                                            <span>{Finance.principal_amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")}</span>
                                    )}
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Lãi cần trả:</span>
                            {
                                Finance.filter(finance => finance.term === Finance.length)
                                    .map(
                                        Finance =>
                                            <span>{Finance.interest_amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")}</span>
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
                                Finance.filter(finance => finance.term  === Finance.length)
                                    .map(
                                        Finance =>
                                            <span>{Finance.total_amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")}</span>
                                    )}
                        </div>

                    </div>

                </div>
            </div>

            <button className="btn btn-success" onClick={(e) => FinanceCalculate(e)} >Submit </button>

            <h4>Chi tiết khoản vay phải trả hàng tháng</h4>
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