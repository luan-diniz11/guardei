from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

load_dotenv()  # Carrega credenciais do banco para .env


db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_host = os.getenv('DB_HOST')
db_port = os.getenv('DB_PORT')
db_name = os.getenv('DB_NAME')




engine = create_engine(  # Conecta ao MySQL usando SQLAlchemy
    f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
)

# Testa a conexão
try:
    with engine.connect() as connection:
        print("Conexão com o banco de dados bem-sucedida!")
except Exception as e:
    print(f"Erro ao conectar ao banco de dados: {e}")