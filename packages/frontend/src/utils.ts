// frontend/src/utils.ts
export const formatDueDate = (due_date?: string | null) => {
  if (!due_date) return 'No Due Date';

  return `${new Date(due_date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`;
};
