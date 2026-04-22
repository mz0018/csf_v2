from sqlalchemy import inspect, text
from core.database import engine
from models.feedback_model import Feedback
from models.user_model import Users
from core.database import Base
def create_tables():

    Base.metadata.create_all(bind=engine)
    print("Tables created successfully!")
def sync_columns():

    models = [Feedback, Users]
    
    with engine.connect() as conn:
        for model in models:
            table_name = model.__tablename__
            
            result = conn.execute(text(f"""
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_name = '{table_name}'
                )
            """))
            table_exists = result.scalar()
            
            if not table_exists:
                print(f"Table '{table_name}' does not exist. Skipping column sync...")
                continue
            
            mapper = inspect(model)
            model_columns = {col.name: col for col in mapper.columns}
            
            result = conn.execute(text(f"SELECT column_name FROM information_schema.columns WHERE table_name = '{table_name}'"))
            db_columns = {row[0] for row in result}
            
            for col_name, column in model_columns.items():
                if col_name not in db_columns:
                    col_type = str(column.type)
                    
                    if 'VARCHAR' in col_type.upper():
                        length_match = col_type.upper().replace('VARCHAR', '').strip('()')
                        sql_type = f"VARCHAR({length_match})" if length_match else "VARCHAR(255)"
                    elif 'INTEGER' in col_type.upper():
                        sql_type = "INTEGER"
                    elif 'JSON' in col_type.upper():
                        sql_type = "JSONB"
                    elif 'TIMESTAMP' in col_type.upper() or 'DATETIME' in col_type.upper():
                        sql_type = "TIMESTAMP"
                    else:
                        sql_type = "TEXT"
                    
                    default_sql = ""
                    if column.default is not None:
                        default_val = column.default.arg if hasattr(column.default, 'arg') else str(column.default)
                        if default_val == "now()":
                            default_sql = " DEFAULT NOW()"
                    
                    alter_sql = f'ALTER TABLE {table_name} ADD COLUMN {col_name} {sql_type}{default_sql}'
                    try:
                        conn.execute(text(alter_sql))
                        conn.commit()
                        print(f"Added column '{col_name}' to table '{table_name}'")
                    except Exception as e:
                        print(f"Column '{col_name}' may already exist: {e}")

if __name__ == "__main__":
    create_tables()
    sync_columns()