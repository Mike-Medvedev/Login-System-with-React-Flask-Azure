import pyodbc
import json





def connect():
    connectionString = "Driver={ODBC Driver 18 for SQL Server};Server=tcp:guitars.database.windows.net,1433;Database=store;Uid=CloudSA61792ed2;Pwd=vQLcu4zWvKTPgu2;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
    conn = pyodbc.connect(connectionString)
    return conn
    
def signup(request_data, bcrypt):
    username = request_data['username']
    password = request_data['password']
    pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    try:
        conn = connect()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO Customers (username, password) VALUES (?, ?)", (username, pw_hash))
        conn.commit()
        return json.dumps({"Message": "User registered successfully", "username": username})
        
    # except sqlite3.IntegrityError as e:
    #     # Handle specific database errors like unique constraint violations
    #     print(f"Database Error: {e}")
    #     return json.dumps({"Error": "Username already exists"})
    except Exception as e:
        print(f"Error: {e}")
        return json.dumps({"Error": "An error occurred during signup"})
    finally:
        cursor.close()
        conn.close()

def login(request_data, bcrypt):
    username=request_data['username']
    password=request_data['password']
    # pw_hash = bcrypt.generate_password_hash(password).encode('utf-8')
    print('entered username and password', username, password)
    conn = connect()
    cursor = conn.cursor()
    try:
        # Retrieve the stored password hash for the given username
        cursor.execute("SELECT password FROM Customers WHERE username=?", (username,))
        result = cursor.fetchone()
        if not result:
            raise ValueError('Username not found')
        
        t_result = tuple(result)
        print('stored password is',t_result[0])
        stored_pw_hash = t_result[0]
        
        
        print(password)
        print('---------------')
        print(stored_pw_hash)


        # Check the provided password against the stored hash
        if not bcrypt.check_password_hash(stored_pw_hash, password):
            raise ValueError('Incorrect password')

        return json.dumps({"Message": "Username and password found", "username": username})
            
    except Exception as e:
        print(f"error as {e}")
        cursor.rollback()
        raise

    finally:
        cursor.close()
        conn.close()