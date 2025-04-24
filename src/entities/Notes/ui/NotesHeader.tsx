export const NotesHeader = ({ user }: { user: string }) => {
  return (
    <>
      <h1 className="text-center font-bold text-2xl">
        Welcome, {user || "Loading.."}
      </h1>

      <h1 className="text-center font-bold text-2xl">Notes</h1>
    </>
  );
};
