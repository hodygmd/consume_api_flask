import {React, useEffect, useState} from "react";
import axios from "axios";

const Api17=()=>{
    const baseUrl='http://localhost:8000/api4'
    const [head, setHead] = useState([])
    const [headKeys, setHeadKeys] = useState([])
    const [cc, setCc] = useState([])
    const [nulldata, setNulldata] = useState([])
    const [describe, setDescribe] = useState([])
    const [describeKeys, setDescribeKeys] = useState([])
    const [imagenCar, setImagenCar] = useState('');
    const [imagenTCar, setImagenTCar] = useState('');
    const [imagenDataset, setImagenDataset] = useState('');
    const [purity, setPurity] = useState([])
    const [shiloutte, setShiloutte] = useState([])
    const [calinski, setCalinski] = useState([])
    useEffect(() => {
        axios.get(`${baseUrl}/head/`).then((response) => {
            setHead(response.data)
            setHeadKeys(Object.keys(response.data[0]))
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/cc/`).then((response) => {
            setCc(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/null/`).then((response) => {
            setNulldata(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/describe/`).then((response) => {
            setDescribe(response.data)
            setDescribeKeys(Object.keys(response.data[0]))
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`${baseUrl}/car/`, {responseType: 'blob'});
                const imageBlob = response.data;
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImagenCar(imageObjectURL);
            } catch (error) {
                console.error('Error al obtener la imagen:', error);
            }
        };

        fetchImage();
    }, []);
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`${baseUrl}/tcar/`, {responseType: 'blob'});
                const imageBlob = response.data;
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImagenTCar(imageObjectURL);
            } catch (error) {
                console.error('Error al obtener la imagen:', error);
            }
        };

        fetchImage();
    }, []);
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`${baseUrl}/dataset/`, {responseType: 'blob'});
                const imageBlob = response.data;
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImagenDataset(imageObjectURL);
            } catch (error) {
                console.error('Error al obtener la imagen:', error);
            }
        };

        fetchImage();
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/purity/`).then((response) => {
            setPurity(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/shiloutte/`).then((response) => {
            setShiloutte(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    useEffect(() => {
        axios.get(`${baseUrl}/calinski/`).then((response) => {
            setCalinski(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    return(
        <>
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
            <div className={'p-3 d-flex'}>
                <div className={''}>
                    {Object.entries(cc).map(([key, value]) => (
                        <li key={key} className={'bg-primary p-2'}>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}
                </div>
            </div>
            <div className={'p-3 d-flex overflow-y-scroll'} style={{height: '150px', width: '200px'}}>
                <div className={''}>
                    {Object.entries(nulldata).map(([key, value]) => (
                        <li key={key} className={'bg-primary p-2'}>
                            <strong>{key}:</strong> {value?'True' : 'False'}
                        </li>
                    ))}
                </div>
            </div>
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
            <div className={'p-3 text-center'}>
                <img src={imagenCar} alt="Imagen cargada desde el servidor"/>
            </div>
            <div className={'p-3 text-center'}>
                <img src={imagenTCar} alt="Imagen cargada desde el servidor"/>
            </div>
            <div className={'p-3 text-center'}>
                <img src={imagenDataset} alt="Imagen cargada desde el servidor"/>
            </div>
            <div className={'p-3 d-flex flex-wrap'}>
                <div className={'bg-primary p-2'}>
                    {Object.entries(purity).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}
                </div>
            </div>
            <div className={'p-3 d-flex flex-wrap'}>
                <div className={'bg-primary p-2'}>
                    {Object.entries(shiloutte).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}
                </div>
            </div>
            <div className={'p-3 d-flex flex-wrap'}>
                <div className={'bg-primary p-2'}>
                    {Object.entries(calinski).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Api17