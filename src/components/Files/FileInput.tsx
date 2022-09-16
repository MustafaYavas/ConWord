import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import axios from 'axios';

import './FileInput.css';
import { ImageConfig } from '../../config/ImageConfig';
import FileItems from './FileItems';
import Alert from '../UI/Alert';
import FileDownload from './FilesDownload/FileDownload';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
import uploadImg from '../../assets/upload.png';

const DropFileInput = () => {
    const wrapperRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [errorType, setErrorType] = useState<string>('');
    const [convertedBefore, setConvertedBefore] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onDragEnter = () => {
        wrapperRef.current!.classList.add('dragover');
    }

    const onDragLeave = () => {
        wrapperRef.current!.classList.remove('dragover');
    }

    const onDrop = () => {
        wrapperRef.current!.classList.remove('dragover');
    }

    const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false);
        if (!e.target.files) return;

        const newFile = e.target.files[0];
        const fileType = newFile.name.split('.').pop()!;

        if(checkError(fileType, newFile)) return;
        else {
            setFile(newFile);
        }
        
    }

    const fileRemove = (file: File) => {
        setFile(null);
        setConvertedBefore(false);
    }

    const checkError = (fileType: string, newFile: File): boolean => {
        let hasError = false
        if(fileType === 'docx') setError(false);
        else {
            setErrorType('FILE-EXTENSION-ERROR');
            setError(true);
            hasError = true;
        }
        
        return hasError;
    }

    const convertFilesHandler = async() => {
        const formData: any = new FormData();
        formData.append('file', file);

        setFile(null);
        setConvertedBefore(true);
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000)

        try {
            await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }); 
        } catch (err: any) {
            console.log(err.response)
        }
        
        
    }

    const downloadFileHandler = () => {
        window.open('http://localhost:5000/output');

        setFile(null);
        setConvertedBefore(false);
        setIsLoading(false);
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className='drop-file-input'
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className='drop-file-input__label'>
                    <img src={uploadImg} alt='' />
                    <p>Drag & Drop your files here</p>
                </div>
                <input type='file' name='sampleFile' value='' accept='.docx' onChange={onFileDrop}/>
            </div>
            
            {
                error === true && 
                    <Alert errorType={errorType}/>
            }
            {
                file && (
                    <div className='drop-file-preview'>
                        <div className='drop-file-preview-header'>
                            <p className='drop-file-preview__title'>
                                Ready to convert
                            </p>
                            <button onClick={convertFilesHandler}>Convert</button>
                        </div>
                        
                        <div className='drop-file-preview-list'>
                            <FileItems 
                                key={file!.name}
                                imgUrl={file!.name.split('.').pop() === 'pdf' ? ImageConfig.pdf : ImageConfig.word}
                                name={file!.name}
                                size={(file!.size/(1024*1024)).toFixed(2)}
                                file={file!}
                                fileRemove={fileRemove}
                            />
                        </div>
                        
                    </div>
                )
            }
            {
                (!file && convertedBefore && isLoading) &&  <div style={{textAlign: 'center'}}>
                    <LoadingSpinner/>
                </div>
            }
            {
                (!file && convertedBefore && !isLoading) &&  <FileDownload onClickHandler={downloadFileHandler}/> 
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;