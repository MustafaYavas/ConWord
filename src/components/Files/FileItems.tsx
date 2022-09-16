type FileItemsProps = {
    imgUrl: string,
    name: string,
    size: string,
    // files: File[],
    file: File,
    fileRemove: (file: File) => void
}

const FileItems = (props: FileItemsProps) => {
    
    return (
        <div className='drop-file-preview__item'>
            <img src={props.imgUrl} alt='' />
                <div className='drop-file-preview__item__info'>
                    <p>{props.name}</p>
                    <p>{props.size} MB</p>
                </div>
            <span className='drop-file-preview__item__del' onClick={() => props.fileRemove(props.file)}>x</span>
        </div>
    )
}

export default FileItems;