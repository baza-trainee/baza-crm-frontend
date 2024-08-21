const UserProfileName = () => {
  const userName = 'Лідія Глінська';
  const initials = userName
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join('');

  return (
    <div className="flex items-center justify-center gap-3">
      <p className="flex items-center justify-center w-24 h-24 bg-hover-gray rounded-full text-5xl leading-7 tracking-tight text-sidebar-text">
        {initials}
      </p>
      <p className="text-xl leading-normal">{userName}</p>
    </div>
  );
};

export default UserProfileName;
