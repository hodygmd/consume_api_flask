import {React, useEffect, useState} from "react";
import axios from "axios";
const baseUrl = 'http://localhost:8000/api1'
const Api1 = () => {
    const [head, setHead] = useState([])
    const [headKeys, setHeadKeys] = useState([])
    const [describe, setDescribe] = useState([])
    const [describeKeys, setDescribeKeys] = useState([])
    const [info, setInfo] = useState([])
    const [testF1Score, setTestF1Score] = useState([])
    const [clf, setClf] = useState([])
    const [feature, setFeature] = useState({})
    const [featureSorted, setFeatureSorted] = useState([])
    const [xTrainReduced, setXTrainReduced] = useState([])
    const [xTrainReducedKeys, setXTrainReducedKeys] = useState([])
    const [f1Score, setF1Score] = useState([])
    useEffect(() => {
        axios.get(`${baseUrl}/head/`).then((response) => {
            setHeadKeys(Object.keys(response.data[0]))
            setHead(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/describe/`).then((response) => {
            setDescribeKeys(Object.keys(response.data[0]))
            setDescribe(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/info/`).then((response) => {
            setInfo(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/test_f1_score/`).then((response) => {
            setTestF1Score(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/clf/`).then((response) => {
            setClf(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/feature/`).then((response) => {
            setFeature(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/feature_sorted/`).then((response) => {
            setFeatureSorted(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/x_train_reduced/`).then((response) => {
            setXTrainReducedKeys(Object.keys(response.data[0]))
            setXTrainReduced(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/validation_f1_score/`).then((response) => {
            setF1Score(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    return (
        <>
            <h1>Dataset</h1>
            <div className={'p-3 overflow-x-scroll'}>
                <table className='table table-info'>
                    <thead>
                    <tr>
                        <th scope='col'>No.</th>
                        {headKeys.map((item) => (
                            <th scope='col'>{item}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        head.map((item, index) => (
                            <tr className={"align-middle"}>
                                <td>{index + 1}</td>
                                {headKeys.map((key) => (
                                    <td>{item[key]}</td>
                                ))}
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <h1>Describe</h1>
            <div className={'p-3 overflow-x-scroll'}>
                <table className='table table-info'>
                    <thead>
                    <tr>
                        <th scope='col'>No.</th>
                        {describeKeys.map((item) => (
                            <th scope='col'>{item}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        describe.map((item, index) => (
                            <tr className={"align-middle"}>
                                <td>{index + 1}</td>
                                {describeKeys.map((key) => (
                                    <td>{item[key]}</td>
                                ))}
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <h1>Info</h1>
            <div className={'p-3 overflow-y-scroll d-flex justify-content-center'} style={{height: '400px'}}>
                <table className='table table-info w-auto'>
                    <tbody>
                    {info.map((item) => (
                        <tr className={"align-middle"}>
                            <td className={'text-center'}>{item}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <h1>Importancia de las caracteristicas</h1>
            <div className={'p-3 d-flex justify-content-center flex-wrap'}>
                {clf.map((item) => (
                    <div className={'text-center bg-primary me-2'} style={{width: '200px'}}>{item}</div>
                ))}
            </div>
            <h1>Caracteristicas mas importantes</h1>
            <div className={'p-3'}>
                {Object.keys(feature).map((clave, index) => (
                    <div key={index} className={'d-flex justify-content-center text-center'}>
                        <div className={'bg-primary w-25 col-5 me-2'}>
                            <strong>{clave}</strong>
                        </div>
                        <div className={'bg-primary w-25 col-5'}>
                            {feature[clave]}
                        </div>
                    </div>
                ))}
            </div>
            <h1>10 Caracteristicas con mas relevancia</h1>
            <div className={'p-3 d-flex flex-wrap justify-content-around'}>
                {featureSorted.map((item, index) => (
                    <div className={'bg-primary w-25 text-center me-1'}>
                        <strong>{item}</strong>
                    </div>
                ))}
            </div>
            <h1>X Train</h1>
            <div className={'p-3 overflow-x-scroll'}>
                <table className='table table-info'>
                    <thead>
                    <tr>
                        <th scope='col'>No.</th>
                        {xTrainReducedKeys.map((item) => (
                            <th scope='col'>{item}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        xTrainReduced.map((item, index) => (
                            <tr className={"align-middle"}>
                                <td>{index + 1}</td>
                                {xTrainReducedKeys.map((key) => (
                                    <td>{item[key]}</td>
                                ))}
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <h1>Prediccion con el conjunto de entrenamiento</h1>
            <div className={'p-3 d-flex flex-wrap justify-content-center'}>
                <div className={'bg-primary p-2'}>
                    <strong>{testF1Score[0]}</strong> {testF1Score[1]}
                </div>
            </div>
            <h1>Prediccion con el conjunto de validacion</h1>
            <div className={'p-3 d-flex flex-wrap justify-content-center'}>
                <div className={'bg-primary p-2'}>
                    <strong>{f1Score[0]}</strong> {f1Score[1]}
                </div>
            </div>
        </>
    )
}
export default Api1