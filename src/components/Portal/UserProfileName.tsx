const UserProfileName = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  const initials = `${firstName} ${lastName}`
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

  return (
    <div className="flex items-center justify-center gap-3">
      <p className="flex items-center justify-center w-24 h-24 text-5xl leading-7 tracking-tight rounded-full bg-hover-gray text-sidebar-text">
        {initials}
      </p>
      <p className="text-xl leading-normal">{firstName + ' ' + lastName}</p>
    </div>
  );
};

export default UserProfileName;
