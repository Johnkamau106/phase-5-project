// // src/utils/userUtils.js
// export const getUserFromLocalStorage = () => {
//   const storedRolesRaw = localStorage.getItem('roles');
//   const singleRole = localStorage.getItem('role');
//   const username = localStorage.getItem('username');

//   let userRoles = [];
//   try {
//     userRoles = storedRolesRaw
//       ? JSON.parse(storedRolesRaw)
//       : (singleRole ? [singleRole] : []);
//   } catch (error) {
//     console.error('Invalid roles format:', error);
//     userRoles = singleRole ? [singleRole] : [];
//   }

//   return userRoles.length > 0 ? { roles: userRoles, username } : null;
// };

// export const setUserInLocalStorage = (rolesArray, username) => {
//   localStorage.clear();
//   localStorage.setItem('roles', JSON.stringify(rolesArray));
//   localStorage.setItem('username', username);
// };
export const getUserFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Invalid user format in localStorage', error);
    return null;
  }
};
