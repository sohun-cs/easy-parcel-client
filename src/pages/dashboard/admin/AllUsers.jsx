import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AllUsers = () => {

    const axiosPublic = useAxiosPublic();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data
        }
    })

    console.log(users)

    return (
        <div>
            <h1>All UserS {users.length}</h1>
            {
                users.map(user => <div key={user._id}>

                    <img className="w-48" src={user.photoURL} alt="" />
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>

                </div>)
            }
        </div>
    );
};

export default AllUsers;