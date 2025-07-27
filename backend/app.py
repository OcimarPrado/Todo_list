from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import sqlite3
from datetime import datetime

app = Flask(__name__)
CORS(app)

DB_NAME = 'database.db'

# 🔗 conexão com o banco
def get_db_connection():
    conn = sqlite3.connect(DB_NAME, timeout=10)
    conn.row_factory = sqlite3.Row
    return conn

# 🔧 cria tabelas caso não existam
with get_db_connection() as conn:
    conn.execute('PRAGMA journal_mode=WAL;')
    conn.execute('''CREATE TABLE IF NOT EXISTS lists (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        title TEXT NOT NULL,
                        created_at TEXT
                    )''')
    conn.execute('''CREATE TABLE IF NOT EXISTS tasks (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        list_id INTEGER,
                        title TEXT NOT NULL,
                        done INTEGER DEFAULT 0,
                        date TEXT,
                        FOREIGN KEY(list_id) REFERENCES lists(id)
                    )''')

# 🎨 rota principal
@app.route('/')
def index():
    return render_template('index.html')

# 📜 pega todas as listas
@app.route('/lists', methods=['GET'])
def get_lists():
    with get_db_connection() as conn:
        lists = conn.execute('SELECT * FROM lists').fetchall()
        result = []
        for l in lists:
            tasks = conn.execute('SELECT * FROM tasks WHERE list_id = ? ORDER BY title COLLATE NOCASE ASC', 
                                 (l['id'],)).fetchall()
            result.append({
                'id': l['id'],
                'title': l['title'],
                'created_at': l['created_at'],
                'tasks': [dict(t) for t in tasks]
            })
        return jsonify(result)

# ➕ cria uma nova lista
@app.route('/lists', methods=['POST'])
def create_list():
    data = request.get_json()
    title = data.get('title')
    created_at = datetime.now().strftime('%Y-%m-%d')
    with get_db_connection() as conn:
        conn.execute('INSERT INTO lists (title, created_at) VALUES (?, ?)', (title, created_at))
        conn.commit()
    return jsonify({'message': 'Lista criada com sucesso'}), 201

# 🗑 deleta uma lista e todos os itens dela
@app.route('/lists/<int:id>', methods=['DELETE'])
def delete_list(id):
    with get_db_connection() as conn:
        conn.execute('DELETE FROM tasks WHERE list_id = ?', (id,))
        conn.execute('DELETE FROM lists WHERE id = ?', (id,))
        conn.commit()
    return jsonify({'message': 'Lista deletada com sucesso'})

# ➕ cria uma tarefa em uma lista específica
@app.route('/lists/<int:list_id>/tasks', methods=['POST'])
def create_task(list_id):
    data = request.get_json()
    title = data.get('title')
    today = datetime.now().strftime('%Y-%m-%d')
    with get_db_connection() as conn:
        conn.execute('INSERT INTO tasks (list_id, title, done, date) VALUES (?, ?, ?, ?)',
                     (list_id, title, 0, today))
        conn.commit()
    return jsonify({'message': 'Tarefa criada com sucesso'}), 201

# ✅ alterna status (done) de uma tarefa
@app.route('/tasks/<int:id>', methods=['PUT'])
def toggle_task(id):
    data = request.get_json()
    done = data.get('done', 0)
    with get_db_connection() as conn:
        conn.execute('UPDATE tasks SET done = ? WHERE id = ?', (done, id))
        conn.commit()
    return jsonify({'message': 'Status da tarefa atualizado'})

# 🗑 deleta uma tarefa
@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    with get_db_connection() as conn:
        conn.execute('DELETE FROM tasks WHERE id = ?', (id,))
        conn.commit()
    return jsonify({'message': 'Tarefa deletada com sucesso'})

if __name__ == '__main__':
    app.run(debug=True)
