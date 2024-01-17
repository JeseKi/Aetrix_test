import os
from fastapi import UploadFile
from uuid import uuid4

def save_img_file(img: UploadFile, user_id: int, path: str, static_path: str) -> list:
    """
    保存用户头像文件到服务器指定路径，并返回头像的静态文件路径和文件路径。

    Args:
        img (UploadFile): 上传的图片文件对象。
        user_id (int): 用户的唯一标识ID。
        path (str): 保存头像文件的服务器文件路径。
        static_path (str): 头像的静态文件路径前缀。

    Returns:
        list: 头像的静态文件路径和文件路径。
    """
    # 获取文件扩展名
    file_extension = os.path.splitext(img.filename)[1]

    # 生成唯一的文件名，包括用户ID和随机UUID，并加上文件扩展名
    file_name = f"{user_id}_{uuid4()}{file_extension}"

    # 拼接完整的文件路径
    file_path = f"{path}/{file_name}"

    # 将上传的头像文件写入服务器文件系统
    with open(file_path, "wb") as file:
        file.write(img.file.read())

    # 返回头像两个路径
    return [static_path + file_name , file_path]
