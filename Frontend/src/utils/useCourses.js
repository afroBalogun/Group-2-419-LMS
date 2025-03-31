import { useEffect, useState } from "react";
import getBaseUrl from "./baseUrl";
import useUserId from "./useUserId";
import { useGetUserByIdQuery } from "../redux/users/users"; // Ensure correct import

export default function useCourses() {
    const userId = useUserId();
    const [courses, setCourses] = useState([]);
    const [refresh, setRefresh] = useState(false); // Add refresh state

    // Fetch user details
    const { data: user, isLoading, error } = useGetUserByIdQuery(userId, {
        skip: !userId,
    });

    // Fetch courses when user data is available or `refresh` changes
    useEffect(() => {
        if (user?.enrolledCourses?.length) {
            Promise.all(
                user.enrolledCourses.map(async (courseId) => {
                    const response = await fetch(`${getBaseUrl()}/courses/${courseId}`);
                    return response.json();
                })
            ).then(setCourses);
        }

        if (user?.coursesTeaching?.length) {
            Promise.all(
                user.coursesTeaching.map(async (courseId) => {
                    const response = await fetch(`${getBaseUrl()}/courses/${courseId}`);
                    return response.json();
                })
            ).then(setCourses);
        }
    }, [user, refresh]); // Include `refresh` in dependency array

    // Function to trigger refresh
    const refreshCourses = () => setRefresh(prev => !prev);

    return { courses, isLoading, error, refreshCourses };
}
