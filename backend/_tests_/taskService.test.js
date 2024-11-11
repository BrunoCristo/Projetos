const taskService = require("../services/taskService");
const db = require("../firebaseConfig");
const os = require("os");

// Mock do Firestore
jest.mock("../firebaseConfig", () => ({
  collection: jest.fn().mockReturnThis(),
  doc: jest.fn().mockReturnThis(),
  set: jest.fn(),
  update: jest.fn(),
  get: jest.fn(),
  batch: jest.fn().mockReturnValue({
    set: jest.fn(),
    commit: jest.fn().mockResolvedValue(true),
  }),
}));

// Mock do módulo os
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

    // Mock da função db.batch()
    const createdTasks = await taskService.addTasks(tasks);

    expect(db.batch().set).toHaveBeenCalledTimes(2); // Verifica se o método set foi chamado duas vezes
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
});
