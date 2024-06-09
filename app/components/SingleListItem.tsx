import React from 'react';
import { RiMapPin4Line } from "react-icons/ri";

interface IProps {
    itemData: SingleItem;
}

interface SingleItem {
    id: number;
    name: string;
    area: string;
    imgSrc: string
}

function SingleListItem(props: IProps) {

    const { itemData } = props;

    return (
        <>
            <div draggable={true} className="flex w-full  px-6 py-3">
                <div className='w-20 h-20'>
                    <img className='object-cover rounded-lg w-full h-full' src={itemData.imgSrc} alt="" />
                </div>

                <div className='flex flex-col justify-center pl-5'>
                    <h2 className='font-bold font-poppins'>{itemData.name}</h2>
                    <div className='flex items-center'>
                        <RiMapPin4Line className='text-xs' />
                        <p className='font-normal font-poppins text-xs'>{itemData.area}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleListItem