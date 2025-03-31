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
    const [createUser] = useCreateUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    const { register, handleSubmit, setValue, reset } = useForm();
    const [editingUser, setEditingUser] = useState(null);
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
            refetch(); // **Force refetch to update UI**
        } catch (err) {
            console.error("Error managing user:", err);
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
            await deleteUser(userId);
            alert("User deleted successfully!");
            refetch(); // **Ensure UI updates after deletion**
        }
    };

    if (isLoading) return <Loading />;
    if (error) return <p>Error loading users.</p>;

    return (
        <main className="w-full flex justify-center items-center p-4">
            <section className="w-1/2 shadow-md flex flex-col gap-4 p-10">
                <h2 className="text-xl font-bold">Manage Users</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input type="text" placeholder="Name" {...register("name", { required: true })} className="p-2 border rounded-md" />
                    <input type="email" placeholder="Email" {...register("email", { required: true })} className="p-2 border rounded-md" />
                    
                    {!editingUser && (
                        <input type="password" placeholder="Password" {...register("password", { required: true })} className="p-2 border rounded-md" />
                    )}
                    
                    <select {...register("role", { required: true })} className="p-2 border rounded-md">
                        <option value="">Select Role</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Student">Student</option>
                        <option value="Admin">Admin</option>
                    </select>
                    
                    <button type="submit" className="bg-[#008a63] text-white px-4 py-2 rounded-md hover:scale-105 hover:cursor-pointer transition-all duration-200">
                        {editingUser ? "Update User" : "Add User"}
                    </button>
                </form>

                <h3 className="text-lg font-semibold mt-4">Users List</h3>
                <ul>
                    {users?.map((user) => (
                        <li key={user._id} className="flex justify-between p-2 border-b">
                            <span>{user.name} ({user.role})</span>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(user)} className="bg-[#008a63] flex justify-center items-center gap-1 text-white px-2 py-1 rounded-md hover:cursor-pointer transition-all duration-100 hover:scale-105 hover:shadow-xl">
                                    <FaEdit />Edit
                                </button>
                                <button onClick={() => handleDelete(user._id)} className="bg-red-500 flex justify-center items-center gap-1 text-white px-2 py-1 rounded-md hover:cursor-pointer transition-all duration-100 hover:scale-105 hover:shadow-xl">
                                    <RiDeleteBin5Line />Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
