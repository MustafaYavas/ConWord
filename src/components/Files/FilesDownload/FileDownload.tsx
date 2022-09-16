import styles from './FilesDownload.module.css';

type FileDownloadProps = {
    onClickHandler: () => void
}

const FileDownload = (props: FileDownloadProps) => {

    return (
        <div className={styles['button-wrapper']}>
            <button onClick={props.onClickHandler}>Download</button>
        </div>
    )
}

export default FileDownload