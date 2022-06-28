import { useState, useEffect } from "react";
import axios from "axios";
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers";
import { base_url_api } from '../../../../information.json'
import Dropdown from "../Input/Dropdown";
import TextField from "../Input/TextField";
import SubmitButton from "../Buttons/SubmitButton";
// import MapPicker from "react-google-map-picker";
// import LocationPicker from "../Input/LocationPicker";
const DefaultLocation = { lat: 10, lng: 106 };
const DefaultZoom = 10;

// type can be either 'edit' or 'add'
// previousAddress will be empty if type is 'add', in 'edit' previousAddress is the previous address to be modified
export default function AddressCard({ type, previousAddress }) {
    const [deliveryAreaOptions, setDeliveryAreaOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')

    const [address, setAddress] = useState({
        name: "",
        address: "",
        phoneNumber: '',
        email: "",
        cityId: "",
        areaId: '',
        mapLat: "",
        mapLong: "",
        googleAddress: "",
    })

    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
    function handleChangeLocation(lat, lng) {
        setLocation({ lat: lat, lng: lng });
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    function handleResetLocation() {
        setDefaultLocation({ ...DefaultLocation });
        setZoom(DefaultZoom);
    }

    useEffect(() => {
        getCityAreasOptionsApi()
    }, [])

    useEffect(() => {
        if (address.cityId == '') {
            getDeliveryAreasOptionsApi(1)
        }
        else {
            getDeliveryAreasOptionsApi(address.cityId)
        }
    }, [address.cityId])

    const handleAddressChange = (e) => {
        let { name, value } = e.target
        setAddress({ ...address, [name]: value })
    }

    const getDeliveryAreasOptionsApi = async (id) => {
        let { headers } = getGeneralApiParams()
        let url = base_url_api + '/home/address/areas?cityid=' + id + '&lang=en&client_type=apricart'

        const response = await axios.get(
            url,
            {
                headers: headers
            }
        )
        setDeliveryAreaOptions(response.data.data)
    }

    const getCityAreasOptionsApi = async () => {
        let { headers } = getGeneralApiParams()
        let url = base_url_api + '/home/address/cities?lang=en&client_type=apricart'

        const response = await axios.get(
            url,
            {
                headers: headers
            }
        )
        setCityOptions(response.data.data)
    }

    const addAddressApi = async (e) => {
        e.preventDefault();
        try {
            let { headers } = getGeneralApiParams()
            let url = base_url_api + '/home/address/delivery/save?client_type=apricart'
            let body = address

            const response = await axios.post(
                url, body,
                {
                    headers: headers
                }
            );
            alert(response.data.message)
            setErrorMessage('')
        } catch (err) {
            setErrorMessage(err.response.data.message)
        }
    }

    const editAddressApi = async (id) => {
        try {
            let { headers } = getGeneralApiParams()
            let url = base_url_api + '/home/address/delivery/update?client_type=apricart'
            let body = {
                id: id,
                ...address
            }

            const response = await axios.post(
                url, body,
                {
                    headers: headers
                }
            );
            alert(response.data.message)
            setErrorMessage('')
        } catch (err) {
            setErrorMessage(err.response.data.message)
        }
    }

    return (
        <div>
            <TextField
                label={'Name'}
                type={'text'}
                placeHolder={'Your Name'}
                name={'name'}
                onChange={handleAddressChange}
                value={address.name}
            />
            <TextField
                label={'Address'}
                placeHolder={'Flat no., street'}
                name={'address'}
                onChange={handleAddressChange}
                value={address.address}
            />
            <TextField
                label={'Phone Number'}
                placeHolder={'03001234567'}
                name={'phoneNumber'}
                onChange={handleAddressChange}
                value={address.phoneNumber}
            />
            <TextField
                label={'Email Address'}
                placeHolder={'youremail@email.com'}
                name={'email'}
                onChange={handleAddressChange}
                value={address.email}
            />
            <Dropdown
                label={"City"}
                options={cityOptions}
                name={'cityId'}
                optionText={'city'}
                onChange={handleAddressChange}
                value={address.cityId}
                placeholder={'Select City'}
            />
            <Dropdown
                disabled={address.cityId == ''}
                label={"Area"}
                options={deliveryAreaOptions}
                name={'areaId'}
                optionText={'town'}
                onChange={handleAddressChange}
                value={address.areaId}
                placeholder={'Select Area'}
            />
            {type == 'add' && (
                <SubmitButton
                    text={'Add Address'}
                    onClick={() => {
                        console.log(address)
                    }}
                />
            )}
            <button onClick={handleResetLocation}>Reset Location</button>
            <label>Latitute:</label><input type='text' value={location.lat} disabled />
            <label>Longitute:</label><input type='text' value={location.lng} disabled />
            <label>Zoom:</label><input type='text' value={zoom} disabled />

            {/* <div className="h-[700px] w-[700px]">
                <MapPicker defaultLocation={defaultLocation}
                    zoom={zoom}
                    mapTypeId="roadmap"
                    style={{ height: '700px' }}
                    onChangeLocation={handleChangeLocation}
                    onChangeZoom={handleChangeZoom}
                    apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8' 
                />
            </div> */}

            {/* <LocationPicker/> */}

        </div>
    )
}