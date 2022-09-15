import './App.css';
import DropFileInput from './components/Files/FileInput';

function App() {
    return (
        <div className='box'>
            <h2 className='header'>
                Convert Your Files
            </h2>
            <DropFileInput />
        </div>
    );
}

export default App;