import React from "react";
import Select from 'react-select';
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "./HomePageStyles.css";
import baseurl from "../Components/baseurl";

const customStyles = {
    valueContainer: (base) => ({
        ...base,
        justifyContent: 'left',
    }),
    container: (base) => ({
        ...base,
        width: '80%',
        margin: 'auto',
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


function HomePage() {
    const [years, setYears] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const handleYearChange = (option) => {
        setSelectedYear(option);
        getBranchesByYear(option.value);
    };
    const handleBranchChange = (option) => {
        setSelectedBranch(option);
        getYearsByBranch(option.value);
    };
    const handleForm = (e) => {
        console.log(selectedYear, selectedBranch);
        e.preventDefault();
    }
    useEffect(() => {
        axios.get(`${baseurl}/years`)
            .then((res) => {
                setYears(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios.get(`${baseurl}/branches`)
            .then((res) => {
                setBranches(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const yearOptions = years.map((year) => ({
        label: year,
        value: year
    }));

    const branchOptions = branches.map((branch) => ({
        label: branch,
        value: branch
    }));
    const getBranchesByYear = async (year) => {
        try {
            const res = await axios.get(`${baseurl}?year=${year}`);
            setBranches(res.data.branches);
        } catch (error) {
            console.log(error);
        }
    }
    const getYearsByBranch = async (branch) => {
        try {
            const res = await axios.get(`${baseurl}?branch=${branch}`);
            setYears(res.data.years);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container">
                <form onSubmit={handleForm} >
                    {/* <ToastContainer /> */}
                    <h3 className="label">Admission Year:</h3>
                    <Select options={yearOptions} placeholder='Select Year' styles={customStyles}
                        value={selectedYear}
                        onChange={(e) => { handleYearChange(e.target.value); }}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: 'grey',
                            },
                        })}
                    />
                    <h3 className="label">Branch:</h3>
                    <Select options={branchOptions} placeholder='Select Branch' styles={customStyles}
                        value={selectedBranch}
                        onChange={(e) => { handleBranchChange(e.target.value); }}
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

export default HomePage;