import { useGetUsersQuery } from "../../redux/users/users"

export default function Home(){

    // fetches users

    // Check data.json in data config file to get an idea of the schema

    // Customize a homepage that allows for teacher and student logins.
    const { data: users = [], error, isLoading } = useGetUsersQuery();
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users</div>;

    console.log(users);    
    return(
        <div className="">
            <p>Home</p>
        </div>
    )
}