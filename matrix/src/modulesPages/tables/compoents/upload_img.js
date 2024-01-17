import React, {useState , useRef} from "react";
import {Form} from "react-bootstrap";

/**
 * UplaodImg 组件用于上传图片。
 * 
 * Props:
 * - setImg: 一个函数，用于设置父组件中的图片状态。
 * - size_limit: 一个数字，表示图片的最大大小（单位：MB）。
 */
function UplaodImg ({setImg , size_limit}) {
    // 使用 useState 和 useRef 创建 file 和 fileInputRef 状态
    const [file, setFile] = useState(null);
    const fileInputRef = useRef();

    /**
     * handleFileChange 函数用于处理文件更改事件。
     * 
     * 当用户选择一个文件时，这个函数会被调用。它会检查文件的类型和大小，
     * 如果文件的类型不是 PNG 或 JPEG，或者文件的大小超过了 size_limit，
     * 那么它会显示一个警告，并清除选中的文件。否则，它会更新 file 状态，
     * 并调用 setImg 函数更新父组件中的图片状态。
     */
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
    
        if (!selectedFile) {
            return;
        }
    
        // 检查文件类型
        if (!selectedFile.type.match('image/png') && !selectedFile.type.match('image/jpeg')) {
            alert('请上传PNG或JPEG格式的图片。');
            e.target.value = ''; // 清除选中的文件
            return;
        }
    
        // 检查文件大小 (size_limit MB)
        if (selectedFile.size > (size_limit * 1024 * 1024)) {
            alert(`图片大小不能超过${size_limit}MB。`);
            e.target.value = ''; // 清除选中的文件
            return;
        }
    
        setFile(selectedFile);
        setImg(selectedFile)
    };

    // 返回一个 Form.Control 组件，用于选择文件
    return <Form.Control ref={fileInputRef} type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
};

export default UplaodImg;
