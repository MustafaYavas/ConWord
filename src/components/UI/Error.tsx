import React, { useEffect, useState } from 'react';

type ErrorProps = {
    errorType: string
}

const Error = (props: ErrorProps) => {
    const [content, setContent] = useState<React.ReactElement>();

    useEffect(() => {
        let errorContent = null;
        if(props.errorType === 'FILE-EXTENSION-ERROR') {
            errorContent = <div className='drop-file-input__error'>
                        <p>Only files with</p>
                        <p>
                            <span style={{color: '#F80202'}}>.pdf</span>, 
                            <span style={{color: '#0267F8'}}> .docx</span> and 
                            <span style={{color: '#029FF8'}}> .doc</span>
                        </p>
                        <p>extensions can be uploaded!</p>
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

export default Error