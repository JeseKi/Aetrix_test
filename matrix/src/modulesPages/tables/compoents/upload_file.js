import React, { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';

/**
 * UploadFile 组件用于上传文件。
 * 
 * Props:
 *   setUploadFile: 用于设置父组件中文件状态的函数。
 *   size_limit: 文件大小限制（以MB为单位）。
 *   fileTypes: 允许的文件类型数组。
 * 
 * 常见的文件类型及其 MIME 类型:
 *   - 图片: image/jpeg, image/png
 *   - 文档: application/pdf, application/msword (对于.doc), application/vnd.openxmlformats-officedocument.wordprocessingml.document (对于.docx)
 *   - 演示文稿: application/vnd.ms-powerpoint (对于.ppt), application/vnd.openxmlformats-officedocument.presentationml.presentation (对于.pptx)
 *   - 表格: application/vnd.ms-excel (对于.xls), application/vnd.openxmlformats-officedocument.spreadsheetml.sheet (对于.xlsx)
 *   - 压缩文件: application/zip, application/x-rar-compressed
 */
function UploadFile({ setUploadFile, size_limit, fileTypes }) {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) {
            return;
        }

        // 检查文件类型
        const fileTypeIsValid = fileTypes.some(type => selectedFile.type.match(type));
        if (!fileTypeIsValid) {
            alert(`请上传以下类型的文件：${fileTypes.join(', ')}`);
            e.target.value = ''; // 清除选中的文件
            return;
        }

        // 检查文件大小
        if (selectedFile.size > (size_limit * 1024 * 1024)) {
            alert(`文件大小不能超过${size_limit}MB。`);
            e.target.value = ''; // 清除选中的文件
            return;
        }

        setFile(selectedFile);
        setUploadFile(selectedFile);
    };

    return <Form.Control ref={fileInputRef} type="file" accept={fileTypes.join(', ')} onChange={handleFileChange} />
}

export default UploadFile;
