import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom";
import RealEstateService from './Service/RealEstateService';
import { Form, Button } from 'reactstrap';
import Slider from '@material-ui/core/Slider';

const FilterSearchBar = () => {

    const navigate = useNavigate();

    const [address, setAddress] = useState('');
    const [listing_categories, setListing_categories] = useState('');
    const [listing_type, setListing_type] = useState('');

    const [rangePrice, setRangePrice] = useState([0, 10000]);
    const [price_start, setPrice_start] = useState('');
    const [price_end, setPrice_end] = useState('');

    function handleChangesPrice(event, newValue) {
        setRangePrice(newValue);
        setPrice_start(newValue[0]);
        setPrice_end(newValue[1])
    }

    const [rangeRoom, setRangeRoom] = useState([0, 10]);
    const [room_start, setRoom_start] = useState('');
    const [room_end, setRoom_end] = useState('');

    function handleChangesRoom(event, newValue) {
        setRangeRoom(newValue);
        setRoom_start(newValue[0]);
        setRoom_end(newValue[1])
    }

    const [rangeArea, setRangeArea] = useState([0, 10000]);
    const [area_start, setArea_start] = useState('');
    const [area_end, setArea_end] = useState('');

    function handleChangesArea(event, newValue) {
        setRangeArea(newValue);
        setArea_start(newValue[0]);
        setArea_end(newValue[1])
    }

    const [rangeFloor, setRangeFloor] = useState([0, 10]);
    const [floor_spaceStart, setFloor_spaceStart] = useState('');
    const [floor_spaceEnd, setFloor_spaceEnd] = useState('');

    function handleChangesFloor(event, newValue) {
        setRangeFloor(newValue);
        setFloor_spaceStart(newValue[0]);
        setFloor_spaceEnd(newValue[1])
    }

    const submitHandler = (e) => {
        e.preventDefault()

        navigate(`/search/searchbyfilter?price_start=${price_start}&price_end=${price_end}&room_start=${room_start}&room_end=${room_end}&area_start=${area_start}&area_end=${area_end}&floor_spaceStart=${floor_spaceStart}&floor_spaceEnd=${floor_spaceEnd}&address=${address}&listing_categories=${listing_categories}&listing_type=${listing_type}`)

        window.location.reload();
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <section class="search-sec">
                <div class="input-group mb-3">

                    <div>
                        <select class="form-control search-slt" id="exampleFormControlSelect1"
                            name="listing_categories"
                            value={listing_type}
                            onChange={(e) => setListing_type(e.target.value)}>
                            <option value="1">Mua bán</option>
                            <option value="2">Cho thuê</option>
                        </select>
                    </div>

                    <input type="text" class="form-control" placeholder="Tìm kiếm..." aria-label="Recipient's username" aria-describedby="basic-addon2" />

                    <div class="input-group-append">
                        <button type="submit" class="btn btn-primary wrn-btn">Tìm kiếm</button>


                    </div>
                </div>
                <div class="container">
                    <form action="#" method="post" novalidate="novalidate">

                        <div class="mt-3">

                            <a data-bs-toggle="collapse" data-bs-target="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" class="advanced">
                                Tìm kiếm nâng cao <i class="fa fa-angle-down"></i>
                            </a>


                            <div class="collapse" id="collapseExample">
                                <div class="card card-body">

                                    <div class="row">

                                        <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                                            <select class="form-control search-slt" id="exampleFormControlSelect1"
                                                name="address"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}>
                                                <option>Tên tỉnh</option>
                                                <option>Hà Nội</option>
                                                <option>Hồ Chí Minh</option>
                                            </select>
                                        </div>

                                        <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                                            <select class="form-control search-slt" id="exampleFormControlSelect1"
                                                name="listing_categories"
                                                value={listing_categories}
                                                onChange={(e) => setListing_categories(e.target.value)}>
                                                <option>Loại bất động sản</option>
                                                <option value="1">Căn hộ chung cư</option>
                                                <option value="2">nhà ở</option>
                                                <option value="3">Đất</option>
                                                <option value="4">Văn phòng</option>
                                                <option value="5">Nhà xưởng</option>
                                            </select>
                                        </div>

                                        <label>Mức giá</label>
                                        <div style={{ width: "32rem", padding: "20px" }}>
                                            <Slider min={1000000}
                                                max={10000000000}
                                                value={rangePrice}
                                                onChange={handleChangesPrice}
                                                valueLabelDisplay="auto" />
                                            {price_start.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")} - {price_end.toLocaleString(navigator.language, { minimumFractionDigits: 0 }).replaceAll(",", ".")}
                                        </div>

                                        <label>Số phòng</label>
                                        <div style={{ width: "32rem", padding: "20px" }}>
                                            <Slider min={0}
                                                max={10}
                                                value={rangeRoom}
                                                onChange={handleChangesRoom}
                                                valueLabelDisplay="auto" />
                                            {room_start} - {room_end}
                                        </div>

                                        <label>Diện tích</label>
                                        <div style={{ width: "32rem", padding: "20px" }}>
                                            <Slider min={0}
                                                max={10000}
                                                value={rangeArea}
                                                onChange={handleChangesArea}
                                                valueLabelDisplay="auto" />
                                            {area_start} - {area_end}
                                        </div>

                                        <label>Số tầng</label>
                                        <div style={{ width: "32rem", padding: "20px" }}>
                                            <Slider min={0}
                                                max={10}
                                                value={rangeFloor}
                                                onChange={handleChangesFloor}
                                                valueLabelDisplay="auto" />
                                            {floor_spaceStart} - {floor_spaceEnd}
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </section>
        </Form>
    )
}

export default FilterSearchBar;