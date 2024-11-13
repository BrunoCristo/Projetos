
export function translateStatus(status) {
    const statusTranslations = {
      todo: 'A Fazer',
      doing: 'Em Andamento',
      done: 'Concluído',
    };
  
    return statusTranslations[status];
}
  