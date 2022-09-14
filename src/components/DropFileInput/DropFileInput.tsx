import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

import './DropFileInput.css';
import { ImageConfig } from '../../config/ImageConfig';
import uploadImg from '../../assets/cloud-upload-regular-240.png';

type DropFileInputProps = {
    onFileChange: (files: File[]) => void
}

const DropFileInput = (props: DropFileInputProps) => {
    const wrapperRef = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<File[]>([]);

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
        if (!e.target.files) return;

        const newFile = e.target.files[0];
        
        const updatedList = [...fileList, newFile];
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }

    const fileRemove = (file: File) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
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
                <input type='file' value='' onChange={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className='drop-file-preview'>
                        <p className='drop-file-preview__title'>
                            Ready to upload
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className='drop-file-preview__item'>
                                    <img src={ImageConfig.pdf || ImageConfig['default']} alt='' />
                                    <div className='drop-file-preview__item__info'>
                                        <p>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <span className='drop-file-preview__item__del' onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
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