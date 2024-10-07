// import React from 'react';
// import { RiFilter3Line } from 'react-icons/ri';
// import { Member } from '../../types';
// // import { useQuery } from '@tanstack/react-query';
// // import { useSelector } from 'react-redux';
// // import { RootState } from '../types';
// // import { filterMembers } from '../utils/membersApi';
// // import {
// //   countProjectsByStatus,
// //   projectStatusOptions,
// // } from '../utils/projectStatusOptions';
// // export const AnalyticsTable = () => {
// //   return <div>AnalyticsTable</div>;
// // };

// type MembersTableProps = {
//   tableHeaders?: string[];
//   info: Member[] | undefined;
// };

// const FilterMembersTable: React.FC<MembersTableProps> = ({
//   tableHeaders = [
//     '№ з/п',
//     'Ім`я',
//     'Прізвище',
//     'Спеціалізація',
//     'Країна',
//     'Місто',
//     'Статус',
//     'Дата реєстрації',
//     'Бали  співпраці',
//     'Оцінка  команди',
//   ],
//   info,
// }) => {
//   console.log(info);
//   // const user = useSelector((state: RootState) => state.userState.user);

//   // const token =
//   //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzI4MDcxMDYxLCJleHAiOjE3MjgxNTc0NjF9.DJnPJedZ6rcWXPfDrlsJ4tgw9yzGwroUWubN9soGKaI';
//   // const {
//   //   data: info,
//   //   // isPending,
//   //   // isError,
//   // } = useQuery({
//   //   queryKey: ['members', token],
//   //   queryFn: () => filterMembers(token, ''),
//   //   enabled: !!user?.token,
//   // });
//   // console.log(info?.length);

//   return (
//     <div className="flex-1  overflow-hidden border rounded-xl border-card-border bg-white">
//       <table className="m-[-1px] min-w-full text-base border border-card-border">
//         <thead className="font-lato py-2 bg-[#e4f1ff]">
//           <tr>
//             {tableHeaders.map((tableHeader, i) =>
//               tableHeader !== 'Ім`я' &&
//               tableHeader !== 'Прізвище' &&
//               tableHeader !== '№ з/п' ? (
//                 <th className="py-3 border border-card-border" key={i}>
//                   <div>
//                     <p>{tableHeader}</p>
//                     <RiFilter3Line />
//                   </div>
//                 </th>
//               ) : (
//                 <th className="py-3 border border-card-border" key={i}>
//                   {tableHeader}
//                 </th>
//               ),
//             )}
//           </tr>
//         </thead>
//         <tbody>
//           {info &&
//             info.length > 0 &&
//             info?.map((user, index) => (
//               <tr key={user?.id} className="border border-card-border">
//                 <td className="py-3 px-4 border border-card-border">
//                   {index + 1}
//                 </td>{' '}
//                 <td className="py-3 px-4 border border-card-border">
//                   {user.firstName}
//                 </td>{' '}
//                 <td className="py-3 px-4 border border-card-border">
//                   {user.lastName}
//                 </td>{' '}
//                 <td className="py-3 px-4 border border-card-border">
//                   {user.city}
//                 </td>
//                 <td className="py-3 px-4 border border-card-border">
//                   {user.country}
//                 </td>
//                 <td className="py-3 px-4 border border-card-border">
//                   {user.status}
//                 </td>
//                 <td className="py-3 px-4 border border-card-border">
//                   {new Date(user.registerAt).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FilterMembersTable;
