import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { 
    useGetUsersQuery, 
    useCreateUserMutation, 
    useUpdateUserMutation, 
    useDeleteUserMutation 
} from "../redux/users/users";
import Loading from "./Loading";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function ManageUsers() {
    const { data: users, isLoading, error, refetch } = useGetUsersQuery();
    const [createUser, { isLoading: creating }] = useCreateUserMutation();
    const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
    const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();
    
    const { register, handleSubmit, setValue, reset } = useForm();
    const [editingUser, setEditingUser] = useState(null);
    const [loadingUserId, setLoadingUserId] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        try {
            if (editingUser) {
                await updateUser({ id: editingUser._id, updatedData: formData }).unwrap();
                alert("User updated successfully!");
            } else {
                if (!formData.password) {
                    alert("Password is required for new users!");
                    return;
                }
                await createUser(formData).unwrap();
                alert("User added successfully!");
            }
            reset();
            setEditingUser(null);
            refetch();
        } catch (err) {
            console.error("Error managing user:", err);
            alert("An error occurred while processing your request.");
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setValue("name", user.name);
        setValue("email", user.email);
        setValue("role", user.role);
    };

    const handleDelete = async (userId) => {
        if (confirm("Are you sure you want to delete this user?")) {
            setLoadingUserId(userId);
            try {
                await deleteUser(userId).unwrap();
                alert("User deleted successfully!");
                refetch();
            } catch (err) {
                console.error("Error deleting user:", err);
                alert("Failed to delete user.");
            } finally {
                setLoadingUserId(null);
            }
        }
    };

    if (isLoading) return <Loading />;
    if (error) return <p className="text-red-500">Error loading users. Please try again.</p>;

    return (
        <main className="w-full flex justify-center items-center p-4">
            <section className="w-full sm:w-3/4 lg:w-1/2 bg-white shadow-md flex flex-col gap-4 p-6 rounded-lg">
                <h2 className="text-xl font-bold">Manage Users</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        {...register("name", { required: true })} 
                        className="p-2 border rounded-md focus:outline-blue-500"
                        autoFocus
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        {...register("email", { required: true })} 
                        className="p-2 border rounded-md focus:outline-blue-500"
                    />
                    
                    {!editingUser && (
                        <input 
                            type="password" 
                            placeholder="Password" 
                            {...register("password", { required: true })} 
                            className="p-2 border rounded-md focus:outline-blue-500"
                        />
                    )}
                    
                    <select {...register("role", { required: true })} className="p-2 border rounded-md focus:outline-blue-500">
                        <option value="">Select Role</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Student">Student</option>
                        <option value="Admin">Admin</option>
                    </select>
                    
                    <button 
                        type="submit" 
                        className={`bg-[#008a63] text-white px-4 py-2 rounded-md transition-all duration-200 
                                    ${creating || updating ? "opacity-50 cursor-not-allowed" : "hover:scale-105 cursor-pointer"}`}
                        disabled={creating || updating}
                    >
                        {editingUser ? (updating ? "Updating..." : "Update User") : (creating ? "Adding..." : "Add User")}
                    </button>
                </form>

                <h3 className="text-lg font-semibold mt-4">Users List</h3>
                <ul className="border border-gray-200 rounded-md overflow-hidden">
                    {users
                        ?.slice() // Create a copy to avoid mutating original state
                        .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by name
                        .map((user) => (
                            <li key={user._id} className="flex justify-between items-center max-[500px]:p-2 p-3 border-b">
                                <span className="max-[500px]:text-sm">{user.name} ({user.role})</span>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleEdit(user)} 
                                        className="bg-[#008a63] flex justify-center items-center gap-1 text-white px-3 py-1 rounded-md 
                                                   hover:scale-105 transition-all duration-200"
                                        aria-label={`Edit ${user.name}`}
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(user._id)} 
                                        className={`bg-red-500 flex justify-center items-center gap-1 text-white px-3 py-1 rounded-md 
                                                   hover:scale-105 transition-all duration-200
                                                   ${loadingUserId === user._id ? "opacity-50 cursor-not-allowed" : ""}`}
                                        disabled={loadingUserId === user._id}
                                        aria-label={`Delete ${user.name}`}
                                    >
                                        {loadingUserId === user._id ? "Deleting..." : <><RiDeleteBin5Line /> Delete</>}
                                    </button>
                                </div>
                            </li>
                        ))}
                </ul>

            </section>
        </main>
    );
}
