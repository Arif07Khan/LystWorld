import React, { useState,useEffect } from 'react'
import app_config from '../../config';


const ManageContactUs = () => {
    const url=app_config.url;
    const [contactusData, setContactusData] = useState([])

    const getContactFromBackend=()=>{
        fetch(url+'/contactus/showall').then(res=>res.json()).then(data=>{
            console.log(data);
            setContactusData(data)
        });
    };

    useEffect(() => {
        getContactFromBackend();
    }, [])

    const deleteContact = (id) => {
        fetch(url + '/contactus/delete/' + id, {
            method: 'DELETE'
        }).then(res => res.json()).then(data => {
            console.log(data);
            getContactFromBackend();
        })
    }


    const DisplayContactUs = () => {
        return (
            <div className='grid grid-cols-5 gap-5'>
                {contactusData.map((item, index) => {
                    return (
                        <div className='bg-gray-200 p-5 rounded-md' key={index}>
                            <h1 className='text-xl font-bold'>{item.name}</h1>
                            <p className='text-sm'>{item.email}</p>
                            <p className='text-sm'>{item.message}</p>
                            <button className='bg-red-500 text-white px-2 py-1 rounded-md' onClick={() => deleteContact(item._id)}>Delete</button>
                        </div>
                    )
                })}   
            </div>
        )
    }
      
    

  return (
        <section>
            {DisplayContactUs()}
        </section>
  )
}

export default ManageContactUs