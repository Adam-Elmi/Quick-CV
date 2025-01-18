import { useEffect, useState } from 'react';

export default function Contributors() {
    const [contributors, setContributors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchContributors = () => {
        setIsLoading(true);
        setError(null);
        fetch('https://api.github.com/repos/Adam-Elmi/Quick-CV/contributors')
            .then(response => response.json())
            .then(data => {
                const formattedContributors = data.map(contributor => ({
                    name: contributor.login,
                    image: contributor.avatar_url,
                    github: contributor.html_url,
                    contributions: contributor.contributions,
                    commitsUrl: `https://github.com/Adam-Elmi/Quick-CV/commits?author=${contributor.login}`,
                }));
                setContributors(formattedContributors);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching contributors:', error);
                setError('Failed to load contributors. Please try again later.');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchContributors();
    }, []);

    return (
        <section className="py-12 bg-gray-100">
            <h2 className="text-4xl font-bold text-center text-indigo-500 mb-12">Our Contributors</h2>
            {isLoading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="loader"></div>
                </div>
            ) : error ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold text-red-500 mb-4">Error</h3>
                        <p className="text-gray-600">{error}</p>
                        <button 
                            onClick={fetchContributors} 
                            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition duration-300"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center">
                    {contributors.map((contributor, index) => (
                        <a key={index} href={contributor.github} target="_blank" rel="noopener noreferrer" className="w-full max-w-xs m-4 p-6 bg-white rounded-lg shadow-lg text-center transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:text-indigo-500 border-2 border-violet-100">
                            <img src={contributor.image} alt={contributor.name} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500 transition duration-500 hover:border-indigo-400" />
                            <h3 className="text-2xl font-semibold text-gray-800 transition duration-500 hover:text-blue-500">{contributor.name}</h3>
                            <span className="text-gray-600 transition duration-500 hover:text-blue-500">{contributor.contributions} contributions</span>
                            <div className="mt-4">
                                <i className="fab fa-github text-2xl"></i>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </section>
    );
};