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
                
            </div>
        </Form>
    )
}

export default Banner;