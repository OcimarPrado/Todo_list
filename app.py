from flask import Flask, render_template, request, redirect, url_for
from models import db, ToDoList, ToDoItem
from datetime import datetime
import pytz  # Import necessário para trabalhar com o fuso horário

app = Flask(__name__)

# Configurações do banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'  # Usando SQLite (mais simples)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Define o fuso horário de Brasília
BRASILIA_TZ = pytz.timezone("America/Sao_Paulo")

# Cria as tabelas no banco assim que a aplicação é iniciada
with app.app_context():
    db.create_all()

# ======================================
# ROTA PRINCIPAL - LISTA DE TAREFAS
# ======================================
@app.route("/", methods=["GET", "POST"])
def index():
    """
    Página principal do aplicativo.
    - Se o usuário enviar o formulário (POST), cria uma nova lista.
    - Caso contrário (GET), apenas exibe todas as listas existentes.
    """

    if request.method == "POST":
        new_title = request.form.get("title")  # Captura o título digitado no formulário
        if new_title:
            # Cria a lista com a hora atual de Brasília
            db.session.add(ToDoList(title=new_title, created_at=datetime.now(BRASILIA_TZ)))
            db.session.commit()
        return redirect(url_for("index"))  # Redireciona para a página inicial após criar a lista

    # Busca todas as listas do banco de dados
    lists = ToDoList.query.all()

    # Calcula o total de cada lista somando os valores dos itens
    for lista in lists:
        lista.total = sum([float(item.price) for item in lista.items if item.price])

    # Renderiza o template com as listas
    return render_template("index.html", lists=lists)

# ======================================
# ROTA PARA APAGAR LISTA
# ======================================
@app.route("/delete_list/<int:list_id>")
def delete_list(list_id):
    """
    Apaga uma lista inteira pelo ID.
    """
    todo_list = ToDoList.query.get_or_404(list_id)
    db.session.delete(todo_list)
    db.session.commit()
    return redirect(url_for("index"))

# ======================================
# ROTA PARA ADICIONAR ITEM
# ======================================
@app.route("/add_item/<int:list_id>", methods=["POST"])
def add_item(list_id):
    """
    Adiciona um item em uma lista específica.
    """
    name = request.form.get("item_name")
    price = request.form.get("item_price")
    category = request.form.get("item_category")
    price = float(price) if price else None  # Converte para número, se não for vazio

    if name:
        item = ToDoItem(name=name, price=price, category=category, list_id=list_id)
        db.session.add(item)
        db.session.commit()

    return redirect(url_for("index"))

# ======================================
# ROTA PARA CONCLUIR/DESMARCAR ITEM
# ======================================
@app.route("/toggle_complete/<int:item_id>")
def toggle_complete(item_id):
    """
    Marca um item como concluído ou desmarca (caso já esteja concluído).
    """
    item = ToDoItem.query.get_or_404(item_id)
    item.completed = not item.completed  # Alterna entre True/False
    db.session.commit()
    return redirect(url_for("index"))

# ======================================
# ROTA PARA DELETAR ITEM
# ======================================
@app.route("/delete_item/<int:item_id>")
def delete_item(item_id):
    """
    Apaga um único item da lista.
    """
    item = ToDoItem.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return redirect(url_for("index"))

# ======================================
# INÍCIO DO SERVIDOR FLASK
# ======================================
if __name__ == "__main__":
    app.run(debug=True)
