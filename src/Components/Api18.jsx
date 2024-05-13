import {React, useEffect, useState} from "react";
import axios from "axios";

const Api18=()=>{
    const baseUrl='http://localhost:8000/api5'
    const [imagenDbscan, setImagenDbscan] = useState('');
    const [purity, setPurity] = useState([])
    const [shiloutte, setShiloutte] = useState([])
    const [calinski, setCalinski] = useState([])
    const [imagenMoons, setImagenMoons] = useState('');
    const [imagenDbscan2, setImagenDbscan2] = useState('');
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`${baseUrl}/dbscan/`, {responseType: 'blob'});
                const imageBlob = response.data;
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImagenDbscan(imageObjectURL);
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
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`${baseUrl}/moons/`, {responseType: 'blob'});
                const imageBlob = response.data;
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImagenMoons(imageObjectURL);
            } catch (error) {
                console.error('Error al obtener la imagen:', error);
            }
        };

        fetchImage();
    }, []);
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`${baseUrl}/dbscan2/`, {responseType: 'blob'});
                const imageBlob = response.data;
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImagenDbscan2(imageObjectURL);
            } catch (error) {
                console.error('Error al obtener la imagen:', error);
            }
        };

        fetchImage();
    }, []);
    return(
        <>
            <div className={'p-3 text-center'}>
                <img src={imagenDbscan} alt="Imagen cargada desde el servidor"/>
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
            <div className={'p-3 text-center'}>
                <img src={imagenMoons} alt="Imagen cargada desde el servidor"/>
            </div>
            <div className={'p-3 text-center'}>
                <img src={imagenDbscan2} alt="Imagen cargada desde el servidor"/>
            </div>
        </>
    )
}
export default Api18;