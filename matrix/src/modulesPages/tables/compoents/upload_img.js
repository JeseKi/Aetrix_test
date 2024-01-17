import React, {useState , useRef} from "react";
import {Form} from "react-bootstrap";

function UplaodImg ({setImg , size_limit}) {
    // 处理上传的图片文件
    const [file, setFile] = useState(null);
    const fileInputRef = useRef();
    // 处理文件的限制
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
        setImg(file)
    };
    return <Form.Control ref={fileInputRef} type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
};

export default UplaodImg;