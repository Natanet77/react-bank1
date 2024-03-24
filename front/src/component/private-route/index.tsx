// import React, { useContext } from "react";

// import { AuthContext } from "../../App";
// import { Navigate } from "react-router-dom";

// const PrivateAuthRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const auth = useContext(AuthContext);
//   const user = auth?.state.user;

//   if (user && "isConfirm" in user) {
//     const isConfirm = user.isConfirm;

//     if (!isConfirm) {
//       return <Navigate to="/balance" replace />;
//     }

//     return <>{children}</>;
//   }

//   return <Navigate to="/" replace />;
// };

// export default PrivateAuthRoute;

// import React, { ReactNode, useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../../App";

// interface PrivateRouteProps {
//   children: ReactNode;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//   const auth = useContext(AuthContext);
//   console.log("PrivateRoute:", auth);
//   if (!auth) {
//   return <Navigate to="/signin" replace />;
//   }
//   return <>{children}</>;
// };

// export default PrivateRoute;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../App";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authContext = useContext(AuthContext);
  console.log("PrivateRoute: authContext", authContext);

  // Перевіряємо, чи контекст ініціалізований
  if (!authContext) {
    // Якщо контекст не ініціалізований, виконуємо відповідну логіку
    return <Navigate to="/error" />;
  }

  // Якщо контекст ініціалізований, отримуємо state
  const { state } = authContext;
  console.log("PrivateRoute: state", state);

  // Перевіряємо, чи є токен
  if (!state.token) {
    // Якщо немає токена, переадресовуємо на сторінку входу
    return <Navigate to="/signin" />;
  }

  // Якщо є токен, дозволяємо доступ до захищених сторінок
  return <>{children}</>;
};

export default PrivateRoute;
