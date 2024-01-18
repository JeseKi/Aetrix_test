import os
from fastapi import UploadFile
from uuid import uuid4
from datetime import datetime
import time

class Utils():
    def save_img_file(self, img: UploadFile, user_id: int, path: str, static_path: str) -> list:
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
    
    def event_time_log(self, event:str, isdatatime: bool = True):
        """
        记录事件和其发生的时间
        :param event: 事件
        :param isdatatime: 是否为系统时间
        :return:
        """
        if isdatatime:
            now_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        else : now_time = time.time()
        with open('log.txt', 'a', encoding='utf-8') as f:
            f.write(f"[INFO]:{event}发生在{now_time}\n")

    def on_test(self, function: str):
        """
        某功能未完成时，可以用此装饰器来标记，以便后续跟踪。
        """
        print(f"[WARNING][WARNING][WARNING]:【{function}】功能未完成，请注意！[WARNING][WARNING][WARNING]")