import React from 'react'
import Select from 'react-select';
import { useEffect, useState } from "react";
import axios from "axios";
import "./appointPCStyles.css";
import baseurl from "../Components/baseurl";


const customStyles = {
    valueContainer: (base) => ({
        ...base,
        justifyContent: 'left',
    }),
    container: (base) => ({
        ...base,
        width: '80%',
        margin: 'auto'
    }),
    control: (base) => ({
        ...base,
        maxHeight: "50px",
        cursor: "pointer",
    }),
    option: (base, state) => ({
        ...base,
        color: state.isSelected ? "white" : "black",
        backgroundColor: state.isSelected ? "black" : "white",
        cursor: "pointer",
        borderRadius: 3,
        '&:hover': {
            backgroundColor: "grey",
            color: "white",
            borderRadius: 0,
        }
    })
};

const AppointPC = () => {

    const [programCoordinator, setProgramCoordinator] = useState([]);
    const [programCoodinaorOptions, setProgramCoordinators] = useState([]);

    useEffect(() => {
        
    }, []);

    const appointPChandle = (option) => {
        setProgramCoordinator(option);
    }
    const appointPCform = () => {

    }

    return (
        <>
            <div className='container'>
                <form onSubmit={appointPCform} >
                    <h3 className="label margint">Faculty:</h3>
                    <Select options={programCoodinaorOptions} placeholder='Select program coordinator to appoint' styles={customStyles}
                        value={programCoordinator}
                        onChange={(e) => { appointPChandle(e.target.value); }}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: 'grey',
                            },
                        })}
                    />
                    <button type="submit" className="SubmitButton coolBeans margint">Appoint</button>
                </form>
            </div>
        </>
    )
}

export default AppointPC
