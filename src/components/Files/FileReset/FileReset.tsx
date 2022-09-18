import styles from './FileReset.module.css';

type FileDownloadProps = {
    onClickHandler: () => void
}

const FileDownload = (props: FileDownloadProps) => {
    return (
        <div className={styles['wrapper']}>
            <p>Please wait ... </p>
            <p>When the file is ready, </p>
            <p>it will be downloadable in the new window.</p>
            <button onClick={props.onClickHandler}>Reset</button>
        </div>
    )
}

export default FileDownload