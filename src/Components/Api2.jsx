import {React, useEffect, useState} from "react";
import axios from "axios";

const baseUrl = 'http://localhost:8000/api2'
const Api2 = () => {
    const [valueCounts, setValueCounts] = useState([])
    const [dfReduced, setDfReduced] = useState([])
    const [dfReducedKeys, setDfReducedKeys] = useState([])
    const [imagenUrl, setImagenUrl] = useState('')
    const [vratio, setVratio] = useState([])
    const [limitUrl, setLimitUrl] = useState('')
    const [ncomponents, setNComponents] = useState('')
    const [vratio2, setVratio2] = useState([])
    const [dataframe, setDataframe] = useState([])
    const [dataframeKeys, setDataframeKeys] = useState([])
    const [testF1Score, setTestF1Score] = useState([])
    const [validationF1Score, setValidationF1Score] = useState([])
    useEffect(() => {
        axios.get(`${baseUrl}/value_counts/`).then((response) => {
            setValueCounts(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/df_reduced/`).then((response) => {
            setDfReduced(response.data)
            setDfReducedKeys(Object.keys(response.data[0]))
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`${baseUrl}/dataset/`, {responseType: 'blob'});
                const imageBlob = response.data;
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImagenUrl(imageObjectURL);
            } catch (error) {
                console.error('Error al obtener la imagen:', error);
            }
        };

        fetchImage();
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/variance_ratio/`).then((response) => {
            setVratio(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`${baseUrl}/decision_limit/`, {responseType: 'blob'});
                const imageBlob = response.data;
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setLimitUrl(imageObjectURL);
            } catch (error) {
                console.error('Error al obtener la imagen:', error);
            }
        };

        fetchImage();
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/ncomponents/`).then((response) => {
            setNComponents(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/variance_ratio2/`).then((response) => {
            setVratio2(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/dataframe/`).then((response) => {
            setDataframe(response.data)
            setDataframeKeys(Object.keys(response.data[0]))
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
            <h1>Ocurrencia de valores</h1>
            <div className={'p-3'}>
                {Object.keys(valueCounts).map((clave, index) => (
                    <div key={index} className={'d-flex justify-content-center text-center'}>
                        <div className={'bg-primary w-25 col-5 me-2'}>
                            <strong>{clave}</strong>
                        </div>
                        <div className={'bg-primary w-25 col-5'}>
                            {valueCounts[clave]}
                        </div>
                    </div>
                ))}
            </div>
            <h1>Conjunto de datos reducido a dos dimensiones</h1>
            <div className={'p-3 text-center d-flex justify-content-center'}>
                <table className='table table-info w-auto'>
                    <thead>
                    <tr>
                        <th scope='col'>No.</th>
                        {dfReducedKeys.map((item) => (
                            <th scope='col'>{item}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {dfReduced.map((item, index) => (
                        <tr className={"align-middle"}>
                            <td>{index + 1}</td>
                            {dfReducedKeys.map((key) => (
                                <td>{item[key]}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <h1>Nuevo dataset</h1>
            <div className={'p-3 text-center'}>
                <img src={imagenUrl} alt="Imagen cargada desde el servidor"/>
            </div>
            <h1>Proporcion de varianza</h1>
            <div className={'p-3 d-flex flex-wrap justify-content-around'}>
                {vratio.map((item, index) => (
                    <div className={'bg-primary w-25 text-center me-1'}>
                        {item}
                    </div>
                ))}
            </div>
            <h1>Limite de decision</h1>
            <div className={'p-3 text-center'}>
                <img src={limitUrl} alt="Imagen cargada desde el servidor"/>
            </div>
            <h1>Numero de componentes</h1>
            <div className={'p-3 d-flex flex-wrap justify-content-center'}>
                <div className={'bg-primary p-2'}>
                    <strong>{ncomponents[0]}</strong> {ncomponents[1]}
                </div>
            </div>
            <h1>Proporcion de varianza</h1>
            <div className={'p-3 d-flex flex-wrap justify-content-around'}>
                {vratio2.map((item, index) => (
                    <div className={'bg-primary w-25 text-center me-1'}>
                        {item}
                    </div>
                ))}
            </div>
            <h1>DataFrame</h1>
            <div className={'p-3 text-center d-flex justify-content-center'}>
                <table className='table table-info w-auto'>
                    <thead>
                    <tr>
                        <th scope='col'>No.</th>
                        {dataframeKeys.map((item) => (
                            <th scope='col'>{item}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {dataframe.map((item, index) => (
                        <tr className={"align-middle"}>
                            <td>{index + 1}</td>
                            {dataframeKeys.map((key) => (
                                <td>{item[key]}</td>
                            ))}
                        </tr>
                    ))}
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
                    <strong>{validationF1Score[0]}</strong> {validationF1Score[1]}
                </div>
            </div>
        </>
    )
}
export default Api2