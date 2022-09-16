import React, { useEffect, useState } from 'react';

type AlertProps = {
    errorType: string
}

const Alert = (props: AlertProps) => {
    const [content, setContent] = useState<React.ReactElement>();

    useEffect(() => {
        let errorContent = null;
        if(props.errorType === 'FILE-EXTENSION-ERROR') {
            errorContent = <div className='drop-file-input__error'>
                        <p>Only file with</p>
                        <p>
                            <span style={{color: '#0267F8'}}>.docx</span> 
                        </p>
                        <p>extension can be uploaded!</p>
                    </div>
        }
        else {
            errorContent = <div className='drop-file-input__error'>
                <p style={{color: '#F80202'}}>Cannot upload another file with the same name!</p>
            </div>
        }
        setContent(errorContent)
    }, [props.errorType])

    return (
        <>
            {content}
        </>
    )
}

export default Alert;