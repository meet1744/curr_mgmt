import React from 'react'
import Select from 'react-select';
import { useEffect, useState } from "react";
import axios from "axios";
import "./deletefacultyStyles.css";
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

const Deletefaculty = () => {
    const [faculty, setFaculty] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const facultiesOption = faculties.map((f) => ({
        label: f,
        value: f
    }));
    useEffect(() => {
        // axios.get(`${baseurl}/years`)
        //     .then((res) => {
        //         setFaculties(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }, []);
    const deletefacultyhandle = (option) => {
        setFaculty(option);
    }
    const deletefacultyform = (e) => {
        e.preventDefault();
        // axios.delete(`${baseurl}/faculties/${faculty.id}`)
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }
    return (
        <>
            <div className="container">
                <form onSubmit={deletefacultyform} >
                    <h3 className="label margint">Faculty:</h3>
                    <Select options={facultiesOption} placeholder='Select faculty to delete' styles={customStyles}
                        value={faculty}
                        onChange={(e) => { deletefacultyhandle(e.target.value); }}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: 'grey',
                            },
                        })}
                    />
                    <button type="submit" className="SubmitButton coolBeans margint">Delete</button>
                </form>
            </div>
        </>
    )
}

export default Deletefaculty;
