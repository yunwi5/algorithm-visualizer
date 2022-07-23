import './Spinner.scss';

const Spinner = () => {
    return (
        <div className="spinner">
            Loading
            <div className="spinner-sector spinner-sector-red"></div>
            <div className="spinner-sector spinner-sector-blue"></div>
            <div className="spinner-sector spinner-sector-green"></div>
        </div>
    );
};

export default Spinner;
