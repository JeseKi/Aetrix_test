from datetime import datetime, timedelta
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

        message = MIMEText(f'尊敬的用户，\n\n您好！\n\n感谢您使用ÆTRIX服务。您的验证码是: {code}。\n\n请在30分钟内使用此验证码完成验证。请注意，验证码在30分钟后将失效。\n\n如您未尝试进行操作，请忽略此邮件，并确保您的账户安全。\n\n如果您有任何疑问或需要帮助，请随时联系我们的客服团队。\n\n祝您使用愉快！\n\nÆTRIX团队', 'plain', 'utf-8')
        message['From'] = sender
        message['To'] = receiver
        message['Subject'] = '【ÆTRIX】您的验证码'

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
        self.codes[email] = {'code': code, 'timestamp': datetime.now()}
        self.last_sent[email] = datetime.now()

    def verify_code(self, email: str, code: str):
        """验证接收到的验证码，同时检查是否过期"""
        code_info = self.codes.get(email)
        if code_info and code_info['code'] == code:
            # 检查验证码是否在30分钟内
            return datetime.now() - code_info['timestamp'] <= timedelta(minutes=30)
        return False