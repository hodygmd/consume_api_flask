import {React, useEffect, useState} from "react";
import axios from "axios";
const baseUrl='http://localhost:5000'

const SecondComponent = () => {
    const url='https://3vhbztgd.usw3.devtunnels.ms'
    const [ntree,setNTree]=useState(0)
    const [imagenUrl, setImagenUrl] = useState('');
    const [tree,setTree]=useState('')
    const [flag,setFlag]=useState(false)
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`${baseUrl}/decision_boundary`, { responseType: 'blob' });
                const imageBlob = response.data;
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setImagenUrl(imageObjectURL);
            } catch (error) {
                console.error('Error al obtener la imagen:', error);
            }
        };

        fetchImage();
    }, []);
    useEffect(()=>{
        axios.get(`${baseUrl}/ntree`).then((response)=>{
            setNTree(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])
    const getTree=(i)=>{
        const fetchImage = async () => {
            try {
                const response = await axios.get(`${baseUrl}/tree/${i}`, {responseType: 'blob'});
                const imageBlob = response.data;
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setTree(imageObjectURL);
            } catch (error) {
                console.error('Error al obtener la imagen:', error);
            }
        };
        setFlag(true)
        fetchImage()
    }
    const makeButtons = () => {
        const buttons = []
        for (let i = 0; i < ntree; i++) {
            buttons.push(
                <button key={i} className={'btn btn-info me-3 px-4'} onClick={()=>getTree(i)}>
                    <h2>
                        {i+1}
                    </h2>
                </button>
            )
        }
        return buttons
    }
    return (
        <>
            <div className={'mt-3'}>
                <div className={'text-center'}>
                    <h1>Limite de Decision</h1>
                    <img src={imagenUrl} alt="Imagen cargada desde el servidor"/>
                </div>
                <div className={'text-center mt-3'}>
                    <h1>Seleccionar Arbol</h1>
                    {makeButtons()}
                </div>
                {flag &&
                    <div className={'text-center mt-3'}>
                        <img src={tree} alt="Imagen cargada desde el servidor"/>
                    </div>
                }
            </div>
        </>
    )
}
export default SecondComponent;