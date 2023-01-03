import hashlib
import threading

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
