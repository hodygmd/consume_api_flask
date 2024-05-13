import Api1 from "./Api1";
import Api3 from "./Api3";
import Api2 from "./Api2";
import {useEffect, useState} from "react";
import Api17 from "./Api17";
import Api18 from "./Api18";

const Navigate=()=>{
    const [route, setRoute] = useState(window.location.pathname);

    // Efecto para escuchar cambios en la URL
    useEffect(() => {
        const handleLocationChange = () => {
            setRoute(window.location.pathname);
        };

        // Escuchar el evento 'popstate' para cambios de URL
        window.addEventListener('popstate', handleLocationChange);

        // Limpiar el evento al desmontar el componente
        return () => {
            window.removeEventListener('popstate', handleLocationChange);
        };
    }, []);

    // Función para cambiar la ruta
    const navigate = (path) => {
        window.history.pushState({}, '', path);
        setRoute(path);
    };

    // Renderizar componente basado en la ruta
    const renderRoute = () => {
        switch (route) {
            case '/':
                return <Api1 />;
            case '/api2':
                return <Api2 />;
            case '/api3':
                return <Api3 />;
            case '/api17':
                return <Api17 />;
            case '/api18':
                return <Api18 />;
            default:
                return <div>Página no encontrada</div>;
        }
    };
    return(
        <>
        {/*<div className={'position-absolute bg-info  w-100 z-1'} style={{height:'100vh'}}></div>*/}
            <div className={''}>
                <nav className={'d-flex justify-content-around bg-success p-4'}>
                    <div>
                        <button className={'btn btn-info'} onClick={() => navigate('/')}>Archivo 14</button>
                    </div>
                    <div>
                        <button className={'btn btn-info'} onClick={() => navigate('/api2')}>Archivo 15</button>
                    </div>
                    <div>
                        <button className={'btn btn-info'} onClick={() => navigate('/api3')}>Archivo 16</button>
                    </div>
                    <div>
                        <button className={'btn btn-info'} onClick={() => navigate('/api17')}>Archivo 17</button>
                    </div>
                    <div>
                        <button className={'btn btn-info'} onClick={() => navigate('/api18')}>Archivo 18</button>
                    </div>
                </nav>
                <div className={'p-5'}>
                    {renderRoute()}
                </div>
            </div>
        </>
    )
}
export default Navigate;