import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../utils/baseUrl';

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/courses`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token"); 

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            } else {
                console.log("No token found in Local Storage");
            }
            headers.set("Content-Type", "application/json");
            return headers;
        }
    }),
    tagTypes: ['Course'], // Helps with cache invalidation
    endpoints: (builder) => ({
        // Create a new course
        createCourse: builder.mutation({
            query: (courseData) => ({
                url: '/add-course',
                method: 'POST',
                body: courseData,
            }),
            invalidatesTags: ['Course'],
        }),

        // Get all courses
        getCourses: builder.query({
            query: () => {
                return '/';
            },
            providesTags: ['Course'], 
        }),
    
        // Get a specific course by ID
        getCourseById: builder.query({
            query: (courseId) => `/${courseId}`,
            providesTags: (result, error, id) => [{ type: 'Users', id }], 
        }),

        // Enroll a student in a course
        enrollStudent: builder.mutation({
            query: ({ courseId, studentId }) => ({
                url: `/${courseId}/enroll`,
                method: 'POST',
                body: { studentId, courseId },
            }),
            invalidatesTags: ['Course'],
        }),

        removeStudent: builder.mutation({
            query: ({ courseId, studentId }) => ({
                url: `/remove/${courseId}/${studentId}`, // ✅ Fixed route
                method: "DELETE",
            }),
            invalidatesTags: ["Course"], // Ensure UI updates
        }),
        
        

        // Update course progress or assignments
        updateCourseProgress: builder.mutation({
            query: ({ id, updateData }) => ({
                url: `/update-course-progress/${id}`,
                method: 'PATCH',
                body: updateData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Course', id }],
        }),

        // update Course
        updateCourse: builder.mutation({
            query: ({ courseId, updateData }) => ({
                url: `/update/${courseId}`,  // Ensure backend route matches
                method: "PUT",
                body: updateData,
            }),
            invalidatesTags: (result, error, { courseId }) => [
                { type: "Course", id: courseId }, // Invalidates specific course
                { type: "Course", id: "LIST" }, // Ensures the course list is refreshed
            ],
        }),

        // Delete a course
        deleteCourse: builder.mutation({
            query: (courseId) => ({
                url: `/delete-course/${courseId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Course"]
        }),
        

        getTotalEnrollments: builder.query({
            query: () => {
                return '/total-enrollments';
            },
            providesTags: ['Course'], 
        }),

        markAssignmentCompleted: builder.mutation({
            query: ({ courseId, assignmentId, studentId }) => ({
                url: `/${courseId}/assignments/${assignmentId}/complete`,
                method: "POST",
                body: { studentId },
            }),
            invalidatesTags: ["Course"], // Refresh course data after submission
        })
    
    }),
});

export const {
    useCreateCourseMutation,
    useGetCoursesQuery,
    useGetCourseByIdQuery,
    useEnrollStudentMutation,
    useUpdateCourseProgressMutation,
    useDeleteCourseMutation,
    useRemoveStudentMutation,
    useUpdateCourseMutation,
    useGetTotalEnrollmentsQuery ,
    useMarkAssignmentCompletedMutation,
} = courseApi;

export default courseApi;
// Compare this snippet from Frontend/src/pages/Admin/AdminCourseList.jsx:
