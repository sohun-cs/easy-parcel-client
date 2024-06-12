import { Link } from "react-router-dom";

const Error = () => {
    return (
        <main>
            <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
                <div className="max-w-lg mx-auto space-y-3 text-center">
                    <h3 className="text-gray-800 text-4xl font-semibold sm:text-5xl">
                        Page not found
                    </h3>
                    <p className="text-gray-600 mb-16">
                        Sorry, the page you are looking for could not be found or has been removed.
                    </p>
                    <div>
                        <Link to='/'
                            className="mt-8 bg-slate-200 px-4 py-2 rounded-sm hover:bg-slate-400 duration-500">Go Home</Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Error;