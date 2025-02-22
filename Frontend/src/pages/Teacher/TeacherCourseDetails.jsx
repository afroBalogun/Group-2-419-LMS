import { useParams } from "react-router";
import useFetch from "../../utils/useFetch";
import { useState, useEffect } from "react";

const TeacherCourseDetails = () => {
  const { id } = useParams();
  const { data: course, isPending, error } = useFetch(
    "http://localhost:5000/courses/" + id
  );

  const [assignments, setAssignments] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (course) {
      const initialAssignments = course.assignments.map((assignment) => ({
        ...assignment,
        completed:
          typeof assignment.completed === "boolean" ? assignment.completed : false,
      }));
      setAssignments(initialAssignments);

      const completedCount = initialAssignments.filter(
        (a) => a.completed
      ).length;
      const newProgress =
        initialAssignments.length > 0
          ? (completedCount / initialAssignments.length) * 100
          : 0;
      setProgress(newProgress);
    }
  }, [course]);

  const handleToggleAssignment = async (assignmentId) => {
    const updatedAssignments = assignments.map((assignment) => {
      if (assignment.id === assignmentId) {
        return { ...assignment, completed: !assignment.completed };
      }
      return assignment;
    });
    setAssignments(updatedAssignments);


    const completedCount = updatedAssignments.filter(
      (a) => a.completed
    ).length;
    const newProgress =
      updatedAssignments.length > 0
        ? (completedCount / updatedAssignments.length) * 100
        : 0;
    setProgress(newProgress);


    try {
      const response = await fetch("http://localhost:5000/courses/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          progress: newProgress,
          assignments: updatedAssignments,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update course assignments");
      }
    } catch (err) {
      console.error("Error updating assignments:", err);
    }
  };

  return (
    <div className="course-details">
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {course && (
        <div className="course-deets">
          <h2>{course.title}</h2>
          <h3>{course.description}</h3>
          <h4>Written by {course.teacher}</h4>
          <h4>Overall Progress: {progress.toFixed(0)}%</h4>
          <div className="assignments">
            <h3>Assignments</h3>
            {assignments.map((assignment) => (
              <div key={assignment.id} className="assignment">
                <input
                  type="checkbox"
                  checked={assignment.completed}
                  onChange={() => handleToggleAssignment(assignment.id)}
                />
                <span>
                  {assignment.title} (Due: {assignment.dueDate})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherCourseDetails;
