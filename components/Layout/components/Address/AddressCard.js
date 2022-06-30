import { useState, useEffect } from "react";
import axios from "axios";
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers";
import { base_url_api } from '../../../../information.json'
import Dropdown from "../Input/Dropdown";
import TextField from "../Input/TextField";
import SubmitButton from "../Buttons/SubmitButton";
import LocationPicker from "../Input/LocationPicker";
import ErrorText from "../Typography/ErrorText";

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
    })
    const [mapLat, setMapLat] = useState('')
    const [mapLong, setMapLong] = useState('')
    const [googleAddress, setGoogleAddress] = useState('')

    if(previousAddress){
        setAddress({
            name: previousAddress.name,
            address: previousAddress.address,
            phoneNumber: previousAddress.phoneNumber,
            email: previousAddress.email,
            cityId: previousAddress.cityId,
            areaId: previousAddress.areaId,
        })
        setMapLat(previousAddress.mapLat)
        setMapLong(previousAddress.mapLong)
        setGoogleAddress(previousAddress.googleAddress)
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

    const addAddressApi = async () => {
        try {
            let { headers } = getGeneralApiParams()
            let url = base_url_api + '/home/address/delivery/save?client_type=apricart'
            let body = {
                ...address,
                'mapLat': mapLat,
                'mapLong': mapLong,
                'googleAddress': googleAddress,
            }

            const response = await axios.post(
                url, body,
                {
                    headers: headers
                }
            )
            // console.log(url)
            console.log(body)
            // console.log(response)

            setErrorMessage('')
            alert(response.data.message)
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
                ...address,
                'mapLat': mapLat,
                'mapLong': mapLong,
                'googleAddress': googleAddress,
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
        <div className="min-w-full flex flex-col space-y-2">
            <TextField
                label={'Name'}
                type={'text'}
                placeHolder={'Your Name'}
                name={'name'}
                customOnChange={true}
                onChange={handleAddressChange}
                value={address.name}
            />
            <TextField
                label={'Address'}
                placeHolder={'Flat no., street'}
                name={'address'}
                customOnChange={true}
                onChange={handleAddressChange}
                value={address.address}
            />
            <TextField
                label={'Phone Number'}
                placeHolder={'03001234567'}
                name={'phoneNumber'}
                customOnChange={true}
                onChange={handleAddressChange}
                value={address.phoneNumber}
            />
            <TextField
                label={'Email Address'}
                placeHolder={'youremail@email.com'}
                name={'email'}
                customOnChange={true}
                onChange={handleAddressChange}
                value={address.email}
            />
            <Dropdown
                label={"City"}
                options={cityOptions}
                name={'cityId'}
                optionText={'city'}
                customOnChange={true}
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
                customOnChange={true}
                onChange={handleAddressChange}
                value={address.areaId}
                placeholder={'Select Area'}
            />
            <p>
                Choose Location
            </p>
            <div className="w-full h-[300px]">
                {/* <p>
                    Pick Location
                </p> */}
                <LocationPicker
                    label={"Pick Location"}
                    onChangeLatitude={setMapLat}
                    onChangeLongitude={setMapLong}
                />
            </div>
            {errorMessage != '' && (
                <ErrorText
                    text={errorMessage}
                />
            )}
            {type == 'add' && (
                <SubmitButton
                    text={'Add Address'}
                    onClick={addAddressApi}
                />
            )}
            {type == 'edit' && (
                <SubmitButton
                    text={'Update Address'}
                    onClick={editAddressApi}
                />
            )}
        </div>
    )
}