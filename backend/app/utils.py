import hashlib

def salt_password(user_id: str, password: str):
    salt:str = str(user_id) + str(password)
    return hashlib.sha256(salt.encode('ascii')).hexdigest()
