import './App.css';
import DropFileInput from './components/DropFileInput/DropFileInput';

function App() {
    const onFileChange = (files: File[]) => {
        console.log(files);
    }

    return (
        <div className='box'>
            <h2 className='header'>
                React drop files input
            </h2>
            <DropFileInput onFileChange={(files: File[]) => onFileChange(files)}/>
        </div>
    );
}

export default App;