const taskService = require("../services/taskService");
const db = require("../firebaseConfig");
const os = require("os");

// Mock do Firestore
jest.mock("../firebaseConfig", () => ({
  collection: jest.fn().mockReturnThis(), // Mock do método collection
  doc: jest.fn().mockReturnThis(), // Mock do método doc
  set: jest.fn(), // Mock do método set
  update: jest.fn(), // Mock do método update
  get: jest.fn(), // Mock do método get
  batch: jest.fn().mockReturnValue({
    set: jest.fn(), // Mock do método set dentro de batch
    commit: jest.fn().mockResolvedValue(true), // Mock do método commit dentro de batch
  }),
  delete: jest.fn() // Mock do método delete
}));

jest.mock("os", () => ({
  hostname: jest.fn().mockReturnValue("mock-computer-name"),
}));

describe("taskService", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  test("addTasks deve adicionar tarefas e retornar tarefas criadas com IDs", async () => {
    const tasks = [
      { description: "Task 1", status: "todo", responsable: "John" },
      { description: "Task 2", status: "doing", responsable: "Jane" },
    ];

    // Mock da função batch e set
    const createdTasks = await taskService.addTasks(tasks);

    expect(db.batch).toHaveBeenCalled(); // Verifica se o batch foi inicializado
    expect(db.batch().set).toHaveBeenCalledTimes(2); // Verifica se o set foi chamado duas vezes
    expect(db.batch().commit).toHaveBeenCalled(); // Verifica se o commit foi chamado
    expect(createdTasks).toHaveLength(2); // Verifica se duas tarefas foram retornadas
    expect(createdTasks[0]).toHaveProperty("id"); // Verifica se a tarefa tem um ID
    expect(createdTasks[0].computer).toBe("mock-computer-name"); // Verifica se o nome do computador foi incluído
  });

  test("getTasks deve retornar uma lista de tarefas", async () => {
    // Mock de um retorno fictício do Firestore
    const mockSnapshot = {
      docs: [
        {
          id: "task-id-1",
          data: () => ({ description: "Task 1", status: "todo" }),
        },
        {
          id: "task-id-2",
          data: () => ({ description: "Task 2", status: "done" }),
        },
      ],
    };

    db.collection().get.mockResolvedValue(mockSnapshot);

    const tasks = await taskService.getTasks();

    expect(db.collection).toHaveBeenCalledWith("tasks"); // Verifica se a coleção 'tasks' foi acessada
    expect(tasks).toHaveLength(2); // Verifica se foram retornadas 2 tarefas
    expect(tasks[0]).toHaveProperty("id"); // Verifica se cada tarefa tem um ID
    expect(tasks[0].description).toBe("Task 1"); // Verifica se a descrição está correta
  });

  test("updateTaskStatus deve atualizar o status de uma tarefa", async () => {
    const taskId = "task-id-1";
    const newStatus = "done";

    await taskService.updateTaskStatus(taskId, newStatus);

    expect(db.collection).toHaveBeenCalledWith("tasks"); // Verifica se a coleção 'tasks' foi acessada
    expect(db.collection().doc).toHaveBeenCalledWith(taskId); // Verifica se o documento correto foi acessado
    expect(db.collection().doc().update).toHaveBeenCalledWith({
      status: newStatus,
    }); // Verifica se o status foi atualizado
  });

  test("addTasks deve lançar um erro se a tarefa estiver vazia", async () => {
    await expect(taskService.addTasks([])).rejects.toThrow(
      "Nenhuma tarefa fornecida"
    );
  });

  test("getTasks deve lançar um erro se falhar ao conectar ao banco de dados", async () => {
    db.collection().get.mockRejectedValue(
      new Error("Erro de conexão com o banco de dados")
    );

    await expect(taskService.getTasks()).rejects.toThrow(
      "Erro de conexão com o banco de dados"
    );
    expect(db.collection).toHaveBeenCalledWith("tasks"); // Verifica se a coleção foi acessada
  });

  test("updateTaskStatus deve lançar um erro se o ID da tarefa não for encontrado", async () => {
    const invalidTaskId = "task-id-invalido";
    const newStatus = "done";

    db.collection()
      .doc()
      .update.mockRejectedValue(new Error("Tarefa não encontrada"));

    await expect(
      taskService.updateTaskStatus(invalidTaskId, newStatus)
    ).rejects.toThrow("Tarefa não encontrada");
    expect(db.collection().doc).toHaveBeenCalledWith(invalidTaskId); // Verifica se o documento correto foi acessado
  });

  test("deleteTask deve excluir uma tarefa com sucesso", async () => {
    const taskId = "task-id-1";
  
    // Mock da resposta do Firestore para a função de deletação
    db.collection().doc().delete.mockResolvedValue(true);
  
    // Chama a função de deletar
    await taskService.deleteTask(taskId);
  
    // Verifica se o delete foi chamado com o ID correto
    expect(db.collection().doc().delete).toHaveBeenCalledWith(); // Verifica se o delete foi chamado corretamente
    expect(db.collection().doc).toHaveBeenCalledWith(taskId); // Verifica se o documento correto foi acessado
  });

  test("deleteTask deve lançar um erro se a tarefa não for encontrada", async () => {
    const invalidTaskId = "task-id-invalido";

    // Simula um erro no Firestore ao tentar deletar
    db.collection().doc().delete.mockRejectedValue(new Error("Tarefa não encontrada"));

    // Testa se o erro é lançado corretamente
    await expect(taskService.deleteTask(invalidTaskId)).rejects.toThrow(
      "Tarefa não encontrada"
    );
    expect(db.collection().doc).toHaveBeenCalledWith(invalidTaskId); // Verifica se o documento correto foi acessado
  });

  test("deleteTask deve lançar um erro se o ID da tarefa não for fornecido", async () => {
    await expect(taskService.deleteTask()).rejects.toThrow("ID da tarefa é obrigatório para exclusão");
  });
});
