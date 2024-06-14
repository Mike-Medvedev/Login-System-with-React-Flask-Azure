import pyodbc
import json


def connect():
    connectionString = "Driver={ODBC Driver 18 for SQL Server};Server=tcp:guitars.database.windows.net,1433;Database=store;Uid=CloudSA61792ed2;Pwd=vQLcu4zWvKTPgu2;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"
    conn = pyodbc.connect(connectionString)
    return conn
    
def insert_form():
    try:
        conn = connect()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO guitars VALUES ('PRS', 'custom 24', 'aqua fade', '2024')")
        cursor.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

def login(request_data):
    username=request_data['username']
    password=request_data['password']
    print(username, password)
    conn = connect()
    cursor = conn.cursor()
    try:       
        cursor.execute("SELECT username, password FROM test where username=? and password=?", (username, password))
        new_list=[tuple(row) for row in cursor]

        if not new_list:
            raise ValueError('username or password not found')

        cursor.commit()
        return json.dumps({"Message": "Username and password found", "user": new_list[0]})
            
    except Exception as e:
        print(f"error as {e}")
        cursor.rollback()
        raise

    finally:
        cursor.close()
        conn.close()
