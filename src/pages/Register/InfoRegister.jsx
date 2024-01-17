import React, { useEffect, useState } from 'react';
import { useTruckContext } from '../../context/TruckContext';
import { useLocation, useNavigate } from 'react-router-dom';
import RegisterMap from '../../features/Register/RegisterMap';
import Progress from '../../features/Register/Progress';
import Input from '../../components/Input';
import { geocoder } from '../../utils/geocoder';
import { getAddr } from '../../utils/adressName';
import DOWInput from '../../components/DOWInput';
import Button from '../../components/Button';

export default function InfoRegister() {
    const location = useLocation();
    const navigate = useNavigate();
    const [storeName, setStoreName] = useState();
    const [storeAddress, setStoreAddress] =useState();
    const [dowData, setDoWData] =useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [account, setAccount] = useState();



    useEffect(() => {
        getAddr(location.state.location.lat,location.state.location.lng)
        .then(setStoreAddress)
        .catch(console.log)
    }, []);



    const handleSubmit = () =>{
        const data={
            storeName:storeName,
            storeAddress:storeAddress,
            dayOfWeek : dowData,
            phoneNumber: phoneNumber,
            account : account
        }
        console.log(data)
        navigate('/register/menu', { state: { location: location.state.location } })
    }

    return (
        <div className='w-screen h-xxl '>
            <div className='w-screen h-1/3'>
            <RegisterMap currentLocation={location.state.location}/>
            </div>
            <div className='w-screen px-7'>
            
                <Progress state={1}/>

                <Input label={'상호명'} setState={setStoreName}/>
                <div className='border-b-1 border-black '>
                    <div className='font-bold'>위치</div>
                    <div className='text-gray-500'>{storeAddress}</div>
                </div>
                <div className='font-bold mt-3 mb-1'>영업 요일</div>
                <DOWInput state={dowData} setState={setDoWData}/>
                <div className='font-bold mt-3 mb-1'>영업 시간</div>
                <div className='flex justify-evenly'>
                <button className='border-1 w-36'>시작 시간</button>
                <button className='border-1 w-36'>종료 시간</button>
                </div>
                <Input label={'연락처'} setState={setPhoneNumber}/>
                <Input label={'계좌 번호'} setState={setAccount}/>
                <div className='w-full h-12' onClick={handleSubmit}>
                    <Button context={'다음으로'}/>
                </div>
            </div>


        </div>
    );
}

