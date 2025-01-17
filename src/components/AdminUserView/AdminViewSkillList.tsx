const AdminViewSkillList = ({ name }: { name: string | undefined }) => {
  return (
    <li className="flex gap-4 rounded-lg px-3 py-3 bg-input-normal-state">
      <p>{name}</p>
    </li>
  );
};

export default AdminViewSkillList;
