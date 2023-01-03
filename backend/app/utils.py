import hashlib
import threading
from Crypto.Cipher import AES

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
    print(f"salt: {salt}")
    return hashlib.sha256(salt.encode('ascii')).hexdigest()

def aes_encrypt(data):
    with open(AES_PATH, 'rb') as db_aes_file:
        db_aes_key = db_aes_file.read()

        cipher = AES.new(db_aes_key, AES.MODE_EAX)
        nonce = cipher.nonce
        ciphertext, tag = cipher.encrypt_and_digest(data)

        return nonce, ciphertext, tag

def aes_decrypt(nonce, ciphertext, tag):
    with open(AES_PATH, 'rb') as db_aes_file:
        db_aes_key = db_aes_file.read()

        cipher = AES.new(db_aes_key, AES.MODE_EAX, nonce=nonce)
        plaintext = cipher.decrypt(ciphertext)
        try:
            cipher.verify(tag)
            return ciphertext

        except ValueError:
            print("Key incorrect or message corrupted")

        
