
export function translateStatus(status) {
    const statusTranslations = {
      todo: 'A Fazer',
      doing: 'Em Andamento',
      done: 'Concluído',
    };
  
    console.log(status)
    return statusTranslations[status];
  }
  