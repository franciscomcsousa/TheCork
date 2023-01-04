import hashlib
import threading
from base64 import b64encode, b64decode
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Random import get_random_bytes

AES_PATH = "../../secret/database.key"
LOCKS = {}

def get_lock(name):
    lock = LOCKS.get(name, None)
    if not lock:
        lock = threading.Lock()
        LOCKS[name] = lock
    return lock

def salt_password(user_id: str, password: str):
    salt:str = str(user_id) + str(password)
    return hashlib.sha256(salt.encode('ascii')).hexdigest()

def aes_encrypt(data):
    with open(AES_PATH, 'rb') as db_aes_file:
        key = db_aes_file.read()
        print(f"encrypt key {key}")

        cipher = AES.new(key, AES.MODE_CBC)
        ct_bytes = cipher.encrypt(pad(data.encode(), AES.block_size))
        iv = b64encode(cipher.iv).decode('utf-8')
        cipher_text = b64encode(ct_bytes).decode('utf-8')

        return cipher_text, iv

def aes_decrypt(cipher_text, iv):
    with open(AES_PATH, 'rb') as db_aes_file:
        key = db_aes_file.read()
        print(f"decrypt key {key}")

        try:
            iv = b64decode(iv)
            cipher_text = b64decode(cipher_text)
            cipher = AES.new(key, AES.MODE_CBC, iv)
            pt = unpad(cipher.decrypt(cipher_text), AES.block_size)
            return pt

        except (ValueError, KeyError):
            print("Incorrect decryption")


        
