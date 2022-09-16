import './LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
        <div className='lds-ellipsis'>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default LoadingSpinner;