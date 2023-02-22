import React from 'react'
import { UploadImageCoreProps } from '~/@types/components'
import UploadBox from './UploadBox'
import Uploaded from './Uploaded'

const Core: React.FC<UploadImageCoreProps> = ({ image, clearImage, loading, id, getRootProps, isDragActive }) => {
    return (
        <>
            {image ? (
                <Uploaded id={id} image={image} loading={loading} onClearImage={clearImage} />
            ) : (
                <UploadBox id={id} loading={loading} getRootProps={getRootProps} isDragActive={isDragActive} />
            )}
        </>
    )
}

export default Core
