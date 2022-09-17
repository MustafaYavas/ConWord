import styles from './FileReset.module.css';

import { useEffect, useState } from 'react'

type FileDownloadProps = {
    onClickHandler: () => void
}

const FileDownload = (props: FileDownloadProps) => {
    const [showParag, setShowParag] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowParag(false)
        }, 1500)
    }, [])

    return (
        <div className={styles['wrapper']}>
            {
                showParag && <p>Please wait ...</p>
            }
            <button onClick={props.onClickHandler}>Reset</button>
        </div>
    )
}

export default FileDownload