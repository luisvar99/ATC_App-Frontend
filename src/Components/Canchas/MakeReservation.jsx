import React, { useState, useEffect } from 'react'
import './MakeReservation.css'
import Select from 'react-select';
import axios from 'axios'



export default function MakeReservation() {

    const [Users, setUsers] = useState([])
    const [SelectedOption, setSelectedOption] = useState({})

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          borderBottom: '1px solid #F8F8F8',
          color: state.isSelected ? 'black' : 'black',
          backgroundColor: state.isSelected ? 'white' : 'white',
          width: "100px"
        }),
        control: (provided) => ({
          ...provided,
          marginTop: "5%",
        })
      }

    /* const options = [
        { value: 'blues', label: 'Blues' },
        { value: 'rock', label: 'Rock' },
        { value: 'jazz', label: 'Jazz' },
        { value: 'orchestra', label: 'Orchestra' } 
      ]; */

      const GetUsers = async () => {
        try { 
            const arr = [];
          //const result = await axios.get(`https://atcbackend.herokuapp.com/api/GetSingleSubTorneoById/${params.idSubTorneo}`)
          const result = await axios.get(`http://localhost:4000/api/getAllUsers`)
          //console.log("result.data " + JSON.stringify(result.data));
          let response = result.data;
          response.map((user) => {
          return arr.push({label: user.username});
        });
          setUsers(arr)
        } catch (error) {
          
        }
      }

      /* const handleChange = (selectedOption) => {
        setSelectedOption({ selectedOption });
        console.log(`Option selected:`, SelectedOption);
      } */

      useEffect(() => {
        GetUsers();
        console.log("Users" + JSON.stringify(Users) );
        console.log("Users" + JSON.stringify(SelectedOption) );
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

  return (
    <div className="make_reservation_main_container">
        <div className="make_reservation_second_main_container">
            <div className="make_reservation_form_container">
                <div className="make_reservation_form">
                    <div className="select_container">

                    <Select 
                        value={Users}
                        onChange={(item) => {
                            console.log("Item: "+ JSON.stringify(item.label));
                            setSelectedOption(item.label);
                        }}
                        options = {Users}
                        styles = {customStyles}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
