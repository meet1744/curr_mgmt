import React from "react";
import Select from 'react-select';
import { useState } from "react";
import "./ContainerStyle.css";

const Years = [
    { label: 'Shark', value: 'Shark' },
    { label: 'Dolphin', value: 'Dolphin' },
    { label: 'Whale', value: 'Whale' },
    { label: 'Octopus', value: 'Octopus' },
    { label: 'Crab', value: 'Crab' },
    { label: 'Lobster', value: 'Lobster' },
];
const Branch = [
    { label: 'Information Technology', value: 'IT' },
    { label: 'Computer Engineering', value: 'CE' },
    { label: 'Electronic & Communication Engineering', value: 'EC' },
    { label: 'Civil Engineering', value: 'CI' },
    { label: 'Mechanical Engineering', value: 'MH' },
    { label: 'Chemical Engineering', value: 'CH' },
    { label: 'Instrumentation & Control Engineering', value: 'IC' }
];

const customStyles = {
    container: (base) => ({
        ...base,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        margin: 'auto',
    }),
    control: (base) => ({
        ...base,
        maxHeight: "40px",
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


function Container() {

    const [selected, setSelected] = useState({});

    const handleForm = (e) => {
        console.log(selected);
        e.preventDefault();
    }
    return (
        <>
            <div className="container">
                <form onSubmit={handleForm}>
                    <h3>Admission Year:</h3>
                    <Select options={Years} placeholder='Select Year' styles={customStyles}
                        onChange={(e) => { setSelected({ ...selected, year: e.value }) }}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: 'grey',
                            },
                        })}
                    />
                    <h3>Branch:</h3>
                    <Select options={Branch} placeholder='Select Branch' styles={customStyles}
                        onChange={(e) => { setSelected({ ...selected, branch: e.value }) }}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: 'grey',
                            },
                        })} />
                    <input type="submit" className="SubmitButton coolBeans" value="Download" />
                </form>
            </div>
        </>
    );
}

export default Container;