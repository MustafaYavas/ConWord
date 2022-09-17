import './App.css';
import DropFileInput from './components/Files/FilesInput/FileInput';

function App() {
    return (
        <div className='box'>
            <h2 className='header-big'>
                Convert Your Files
            </h2>
            <h5 className='header-small'>
                Convert 
                <span style={{color: '#0267F8'}}> .docx </span>
                file to 
                <span style={{color: '#F80202'}}> .pdf </span>!
            </h5>
            <DropFileInput />
        </div>
    );
}

export default App;