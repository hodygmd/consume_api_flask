import {React, useEffect, useState} from "react";
import axios from "axios";
const baseUrl='http://localhost:5000'


const PrincipalComponent=()=>{
    const url='https://3vhbztgd.usw3.devtunnels.ms'
    const [dataset,setDataset]=useState([])
    const [datasetKeys,setDatasetKeys]=useState([])
    const [trainScaled,setTrainScaled]=useState([])
    const [trainScaledKeys,setTrainScaledKeys]=useState([])
    const [decisionBoundary,setDecisionBoundary]=useState('')
    const [archivo, setArchivo] = useState(null);

    useEffect(() => {
        axios.get(`${baseUrl}/dataset`).then((response)=>{
            setDataset(response.data)
            setDatasetKeys(Object.keys(response.data[0]))
        }).catch((error)=>{
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/train_scaled`).then((response)=>{
            setTrainScaled(response.data)
            setTrainScaledKeys(Object.keys(response.data[0]))
        }).catch((error)=>{
            console.log(error)
        })
    }, []);
    useEffect(() => {

        const fetchImage = async () => {
            try {
                const response = await axios.get(`${baseUrl}/decision_boundary`, { responseType: 'blob' });
                const imageBlob = response.data;
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setDecisionBoundary(imageObjectURL);
            } catch (error) {
                console.error('Error al obtener la imagen:', error);
            }
        };

        fetchImage();
    }, []);
    const Download=()=>{
        axios.get(`${baseUrl}/tree`).then((response)=>{
            console.log(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }
    const obtenerArchivo = async () => {
        try {
            const response = await fetch('/tree');
            const data = await response.blob();
            setArchivo(data);
        } catch (error) {
            console.error('Error al obtener el archivo:', error);
        }
    };
    return (
        <>
            <div className={'p-3'}>
                <h1>Dataset</h1>
                <table className='table table-info'>
                    <thead>
                    <tr>
                        <th scope='col'>No.</th>
                        {datasetKeys.map((item) => (
                            <th scope='col'>{item}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        dataset.map((item, index) => (
                            <tr className={"align-middle"}>
                                <td>{index + 1}</td>
                                {datasetKeys.map((key) => (
                                    <td>{item[key]}</td>
                                ))}
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <h1>Cojunto Escalado</h1>
            <div className={'p-3'}>
                <table className='table table-info'>
                    <thead>
                    <tr>
                        <th scope='col'>No.</th>
                        {trainScaledKeys.map((item) => (
                            <th scope='col'>{item}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        trainScaled.map((item, index) => (
                            <tr className={"align-middle"}>
                                <td>{index + 1}</td>
                                {trainScaledKeys.map((key) => (
                                    <td>{item[key]}</td>
                                ))}
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <h1>Limite de decision</h1>
            <div className={'text-center'}>
                <img src={decisionBoundary} alt="Imagen cargada desde el servidor"/>
            </div>
            <div className={'text-center mt-4'}>
                <button className={'btn btn-info'} onClick={obtenerArchivo}>
                    Create Tree
                </button>
                {archivo && (
                    <a href={URL.createObjectURL(archivo)} download="android_malware.dot">
                        Descargar Árbol
                    </a>
                )}
            </div>
        </>
    )
}
export default PrincipalComponent