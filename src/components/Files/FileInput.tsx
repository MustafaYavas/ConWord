import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

import './FileInput.css';
import { ImageConfig } from '../../config/ImageConfig';
import FileItems from './FileItems';
import Error from '../UI/Error';
import uploadImg from '../../assets/upload.png';

const DropFileInput = () => {
    const wrapperRef = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<File[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [errorType, setErrorType] = useState<string>('');

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
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
        }
        
    }

    const fileRemove = (file: File) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
    }

    const checkError = (fileType: string, newFile: File): boolean => {
        let hasError = false
        if(fileType === 'pdf' || fileType === 'docx' || fileType === 'doc') setError(false);
        else {
            setErrorType('FILE-EXTENSION-ERROR');
            setError(true);
            hasError = true;
        }

        fileList.forEach(file => {
            if(file.name === newFile.name) {
                setErrorType('FILE-DUPLICATION-ERROR');
                setError(true);
                hasError = true;
            }
        })
        
        return hasError;
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
                <input type='file' value='' accept='.pdf, .doc, .docx' onChange={onFileDrop}/>
            </div>
            {
                error === true && 
                    <Error errorType={errorType}/>
            }
            {
                fileList.length > 0 ? (
                    <div className='drop-file-preview'>

                        <div className='drop-file-preview-header'>
                            <p className='drop-file-preview__title'>
                                Ready to convert - 
                                <span> {fileList.length} {fileList.length === 1 ? 'file' : 'files'}</span>
                            </p>
                            <button>Convert</button>
                        </div>
                        
                        <div className='drop-file-preview-list'>
                            {
                                fileList.map((item, i) => (
                                    <FileItems 
                                        key={i}
                                        imgUrl={item.name.split('.').pop() === 'pdf' ? ImageConfig.pdf : ImageConfig.word}
                                        name={item.name}
                                        size={(item.size/(1024*1024)).toFixed(2)}
                                        files={fileList}
                                        file={item}
                                        fileRemove={fileRemove}
                                    />
                                ))
                            }
                        </div>
                        
                    </div>
                ) : null
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;