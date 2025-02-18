import { configureStore } from '@reduxjs/toolkit'
import usersApi from './users/users'
import teacherApi from './teachers/teacher'
import adminApi from './admins/admin'
import studentApi from './students/student'



export default configureStore({
  reducer: {
    [usersApi.reducerPath] : usersApi.reducer,
    [teacherApi.reducerPath] : teacherApi.reducer,
    [adminApi.reducerPath] : adminApi.reducer,
    [studentApi.reducerPath] : studentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(teacherApi.middleware)
      .concat(adminApi.middleware)
      .concat(studentApi.middleware),

})