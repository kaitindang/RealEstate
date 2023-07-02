import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from 'reactstrap'
import RealEstateService from "./Service/RealEstateService";

const Banner = () => {

    const navigate = useNavigate();

    const [search, setSearch] = useState();
    const [find, setFind] = useState([]);
    const [word, setWord] = useState("");

    useEffect(() => {
        setSearch(["cho thue","cho thue can ho","ban", "ban can ho", "tim", "can ho", "can ho quan 7", "quan 8", "quan 9", "can ho quan 10"])
    }, [])

    const findSearch = (e) => {

        setWord(e.target.value)
        const filteredCountries = search.filter(item => item.indexOf(e.target.value) > -1 ? item : null);
        e.target.value.length === 0 ? setFind([]) : setFind(filteredCountries);

    }

    const findResult = () => {
        if (find.length > 0) {
            return <div className="find-search">
                {
                    find.map(item => {
                        return <Link key={item} to={`/search/${item}`}>{item}</Link>
                    })
                }
            </div>
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()

        if (word.trim()) {
            navigate(`/search/${word}`)           
        } else {
            navigate('/search/all')
        }
    }


    return (
        <Form onSubmit={submitHandler} inline>
            <div class="container">
                <div className="banner d-flex align-items-center" style={{ backgroundImage: `url(/img/banner.jpg)` }}>
                    <div className="bg-custom">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 mx-auto">
                                    <div className="banner-area text-center pt-4 pb-4">
                                        <h2 className="mt-2 mb-4 banner-title"><strong>batdongsan</strong> </h2>
                                        <div className="search-area">                                     
                                            <input value={word} onChange={(e) => findSearch(e)} type="text" class="form-control" placeholder="Tìm kiếm..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                            <button type="submit" className="btn-search m-2">Tìm kiếm</button>
                                        </div>
                                        {findResult()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list-group d-flex flex-row bd-highlight">
                    <a href="/search/home" class="list-group-item list-group-item-action" aria-current="true">
                        <div class="d-flex align-items-center">
                        <img className="img-fluid" src="/img/buy.png" alt="flat" style={{ width: "50px" }} />
                            <h5 class="m-2"><b>Mua bán</b></h5>
                        </div>
                        <p class="mb-1">10000 tin đăng mua bán</p>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                        <div class="d-flex align-items-center">
                            <img className="img-fluid" src="/img/rent.png" alt="flat" style={{ width: "50px" }} />
                            <h5 class="m-2"><b>Cho thuê</b></h5>
                        </div>
                        <small>1000 tin đăng cho thuê</small>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex align-items-center">
                        <img className="img-fluid" src="/img/property.png" alt="flat" style={{ width: "50px" }} />
                            <h5 class="m-2"><b>Dự án</b></h5>
                        </div>
                        <p class="mb-1">10000 dự án</p>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex align-items-center">
                        <img className="img-fluid" src="/img/skyscraper.png" alt="flat" style={{ width: "50px" }} />
                            <h5 class="m-2"><b>Môi giới</b></h5>
                        </div>
                        <p class="mb-1">10000 môi giới</p>
                    </a>
                </div>
            </div>
        </Form>
    )
}

export default Banner;