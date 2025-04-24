export const createNotePayload = (title: string, content: string) => {
  const timestamp = new Date().toISOString();

  return {
    title,
    content,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}