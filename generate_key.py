from secrets import token_bytes
from Crypto.Random import get_random_bytes

with open("secret/database.key", "wb") as f:
    key = get_random_bytes(16)
    print(key)
    f.write(key)
    f.close()