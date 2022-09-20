import { useState, useEffect } from "react";
import axios from "axios";
import { getGeneralApiParams } from "../../../../helpers/ApiHelpers";
import { base_url_api } from '../../../../information.json'
import Dropdown from "../Input/Dropdown";
import TextField from "../Input/TextField";
import SubmitButton from "../Buttons/SubmitButton";
import LocationPicker from "../Input/LocationPicker";
import ErrorText from "../Typography/ErrorText";

/*  type can be either 'edit' or 'add'
    previousAddress will be empty if type is 'add', in 'edit' previousAddress is the previous address to be modified
    updateSavedAddresses is there so that it can recall the getSavedAddresses API in parent component
*/
export default function AddressCard({ type, previousAddress, updateSavedAddresses, setShow }) {
    const [deliveryAreaOptions, setDeliveryAreaOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')
    const [address, setAddress] = useState({
        name: previousAddress ? previousAddress.name : '',
        address: previousAddress ? previousAddress.address : '',
        phoneNumber: previousAddress ? previousAddress.phoneNumber : '',
        email: previousAddress ? previousAddress.email : '',
        cityId: previousAddress ? previousAddress.cityId : '',
        areaId: previousAddress ? previousAddress.areaId : '',
    })
    const [mapLat, setMapLat] = useState(previousAddress ? previousAddress.mapLat : '')
    const [mapLong, setMapLong] = useState(previousAddress ? previousAddress.mapLong : '')
    const [googleAddress, setGoogleAddress] = useState(previousAddress ? previousAddress.googleAddress : '')
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

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

    useEffect(() => {
        if (address.name !== '' && address.address !== '' && address.phoneNumber !== '' && address.email !== '' && address.cityId !== '' && address.areaId !== '' && mapLat !== '' && mapLong !== '') {
            setIsButtonDisabled(false)
        }
        else {
            setIsButtonDisabled(true)
        }
    }, [address.address, address.areaId, address.cityId, address.email, address.name, address.phoneNumber, mapLat, mapLong])

    const handleAddressChange = (e) => {
        let { name, value } = e.target
        setAddress({ ...address, [name]: value })
    }

    const getDeliveryAreasOptionsApi = async (id) => {
        let { headers, userId } = getGeneralApiParams()
        let url = base_url_api + '/home/address/areas?cityid=' + id + '&lang=en&client_type=apricart&userid=' + userId

        const response = await axios.get(
            url,
            {
                headers: headers
            }
        )
        setDeliveryAreaOptions(response.data.data)
    }

    const getCityAreasOptionsApi = async () => {
        let { headers, userId } = getGeneralApiParams()
        let url = base_url_api + '/home/address/cities?lang=en&client_type=apricart&userid=' + userId

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
            let { headers, userId } = getGeneralApiParams()
            let url = base_url_api + '/home/address/delivery/save?client_type=apricart&userid=' + userId
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

            updateSavedAddresses()
            setErrorMessage('')
            alert(response.data.message)
        } catch (err) {
            setErrorMessage(err.response.data.message)
        }
    }

    const editAddressApi = async () => {
        try {
            let { headers, userId } = getGeneralApiParams()
            let url = base_url_api + '/home/address/delivery/update?client_type=apricart&userid=' + userId
            let body = {
                id: previousAddress.id,
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

            setShow(false)
            updateSavedAddresses()
            alert(response.data.message)
            setErrorMessage('')
        } catch (err) {
            setErrorMessage(err.response.data.message)
        }
    }

    return (
        <div className="animate-dropdown bg-slate-100 p-2 rounded-xl min-w-full flex flex-col space-y-2">
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
                type={'number'}
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
            <p className="font-lato text-main-blue font-semibold">
                Choose Location
            </p>
            <div className="w-full h-[300px]">
                <LocationPicker
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
                    text={'Add New Address'}
                    onClick={() => {
                        addAddressApi()
                        setShow(false)
                        window.scroll({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                        })
                    }}
                    disabled={isButtonDisabled}
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