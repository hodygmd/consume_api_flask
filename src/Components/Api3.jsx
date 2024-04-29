import {React, useEffect, useState} from "react";
import axios from "axios";

const baseUrl = 'http://localhost:8000/api3'
const Api3 = () => {
    const [length, setLenght] = useState({})
    const [ncaracteristics, setNcaracteristics] = useState({})
    const [f1Score, setF1Score] = useState({})
    const [bestParams, setBestParams] = useState({})
    const [params, setParams] = useState([])
    const [bestParamsRscv, setBestParamsRscv] = useState({})
    const [paramsRscv, setParamsRscv] = useState([])
    const [bestEstimator, setBestEstimator] = useState({})
    const [testF1Score, setTestF1Score] = useState([])
    const [validationF1Score, setValidationF1Score] = useState([])
    useEffect(() => {
        axios.get(`${baseUrl}/length/`).then((response) => {
            setLenght(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/ncaracteristics/`).then((response) => {
            setNcaracteristics(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/f1_score/`).then((response) => {
            setF1Score(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/best_params/`).then((response) => {
            setBestParams(response.data['best_params'])
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/params/`).then((response) => {
            setParams(response.data[0])
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/best_params_rscv/`).then((response) => {
            setBestParamsRscv(response.data['best_params'])
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/params_rscv/`).then((response) => {
            setParamsRscv(response.data[0])
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/best_estimator/`).then((response) => {
            setBestEstimator(response.data)
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
        axios.get(`${baseUrl}/validation_f1_score/`).then((response) => {
            setValidationF1Score(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    return (
        <>
            <h1>Longitud del conjunto de datos</h1>
            <div className={'p-3 d-flex flex-wrap justify-content-center'}>
                <div className={'bg-primary p-2'}>
                    <strong>Length:</strong> {length['length']}
                </div>
            </div>
            <h1>Número de características del conjunto de datos</h1>
            <div className={'p-3 d-flex flex-wrap justify-content-center'}>
                <div className={'bg-primary p-2'}>
                    <strong>ncaracteristics:</strong> {ncaracteristics['n_caracteristics']}
                </div>
            </div>
            <h1>Prediccion con el conjunto de validacion</h1>
            <div className={'p-3 d-flex flex-wrap justify-content-center'}>
                <div className={'bg-primary p-2'}>
                    <strong>F1_score:</strong> {f1Score['F1_score']}
                </div>
            </div>
            <h1>Mejores parametros (GridSearchCV)</h1>
            <div className={'p-3 d-flex flex-wrap justify-content-center'}>
                <div className={'bg-primary p-2'}>
                    <li>
                        <strong>bootstrap:</strong> {bestParams['bootstrap'] === false ? 'false' : 'true'}
                    </li>
                    <li>
                        <strong>max_features:</strong> {bestParams['max_features']}
                    </li>
                    <li>
                        <strong>n_estimators:</strong> {bestParams['n_estimators']}
                    </li>
                </div>
            </div>
            <h1>Parametros (GridSearchCV)</h1>
            <div className={'p-3 text-center d-flex justify-content-center'}>
                <div className={'bg-primary p-2'}>
                    {params.map((item, index) => (
                        <div key={index}>
                            {typeof item === 'object' ? (
                                <ul>
                                    {Object.entries(item).map(([key, value]) => (
                                        <li key={key}>
                                            <strong>{key}:</strong> {value}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                item
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <h1>Mejores parametros (RandomizedSearchCV)</h1>
            <div className={'p-3 d-flex flex-wrap justify-content-center'}>
                <div className={'bg-primary p-2'}>
                    {Object.entries(bestParamsRscv).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}
                </div>
            </div>
            <h1>Parametros (RandomizedSearchCV)</h1>
            <div className={'p-3 text-center d-flex justify-content-center'}>
                <div className={'bg-primary p-2'}>
                    {paramsRscv.map((item, index) => (
                        <div key={index}>
                            {typeof item === 'object' ? (
                                <ul>
                                    {Object.entries(item).map(([key, value]) => (
                                        <li key={key}>
                                            <strong>{key}:</strong> {value}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                item
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <h1>Modelo</h1>
            <div className={'p-3 d-flex flex-wrap justify-content-center'}>
                <div className={'bg-primary p-2'}>
                    {Object.entries(bestEstimator).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}
                </div>
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
                    <strong>{validationF1Score[0]}</strong> {validationF1Score[1]}
                </div>
            </div>
        </>
    )
}
export default Api3