from datetime import datetime, timedelta
from pydantic import BaseModel, EmailStr
import random
import smtplib
from email.mime.text import MIMEText

class EmailVerificationService:
    def __init__(self):
        self.codes = {}  # 存储验证码
        self.last_sent = {}  # 存储上一次发送时间

    def generate_code(self):
        """生成六位数的验证码"""
        return ''.join(random.choices('0123456789', k=6))

    def send_email(self, email: str, code: str):
        sender = '2094901072@qq.com'  # 您的 QQ 邮箱地址
        password = 'juvixhdqpgqsdjid'  # 您的 QQ 邮箱授权码
        receiver = email  # 收件人邮箱地址

        message = MIMEText(f'您的验证码是: {code}', 'plain', 'utf-8')
        message['From'] = sender
        message['To'] = receiver
        message['Subject'] = '验证码'

        try:
            smtp_server = smtplib.SMTP_SSL('smtp.qq.com', 465)
            smtp_server.login(sender, password)
            smtp_server.sendmail(sender, [receiver], message.as_string())
            smtp_server.quit()
            print('邮件发送成功')
        except Exception as e:
            print(e)
            print('邮件发送失败')

    def can_send_code(self, email: str):
        """检查是否可以发送验证码"""
        if email in self.last_sent:
            return datetime.now() - self.last_sent[email] > timedelta(seconds=60)
        return True

    def store_code(self, email: str, code: str):
        """存储验证码和更新发送时间"""
        self.codes[email] = code
        self.last_sent[email] = datetime.now()

    def verify_code(self, email: str, code: str):
        """验证接收到的验证码"""
        return self.codes.get(email) == code
    