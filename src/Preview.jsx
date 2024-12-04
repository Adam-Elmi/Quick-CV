export function Preview() {
    return (
        <>
            {/* CV */}
            <div id="page" className="w-[595px] h-auto max-w-full border  p-3 max-md:w-full">
            {/* Header */}
            <div id="header-page" className="bg-gray-800 max-w-full w-[650px] min-h-[80px] text-white p-2 flex gap-5 justify-between m-auto">
                {/* Name section */}
                <div className="min-h-full flex justify-center items-center px-2">
                    <p className="text-[1rem] font-bold">Mohammed Ali Ibrahim Al-Sabah Al-Qu</p>
                </div>
                {/* Contact section */}
                <div className="flex flex-col gap-2">
                    {/* Phone Number */}
                    <div className="flex gap-1">
                        <span className="text-slate-400 font-semibold text-[0.8rem]">Phone Number: </span>
                        <span className="text-white text-[0.8rem]">+252-63-4709061</span>
                    </div>
                    {/* Email address */}
                    <div className="flex gap-1">
                        <span className="text-slate-400 font-semibold text-[0.8rem]">Email: </span>
                        <span className="text-white text-[0.8rem]">Adamcade32@gmail.com</span>
                    </div>
                    {/*  Address */}
                    <div className="flex gap-1">
                        <span className="text-slate-400 font-semibold text-[0.8rem]">Address: </span>
                        <span className="text-white text-[0.8rem]">Hargeisa, Somaliland</span>
                    </div>
                </div>
            </div>
            {/* Objective */}
            <h1 className="text-[1rem] underline font-bold mt-2 p-2">Objective</h1>
            <div className="mb-5">
                <p className="pl-2 text-[0.9rem]">
                    I am looking for an opportunity where I can utilize my skills while continuing to grow in my career.
                </p>
            </div>
            {/* Skills */}
            <h1 className="text-[1rem] underline font-bold mt-2 p-2">Skills</h1>
            <div className="flex gap-16 w-full tems-center justify-between p-2">
                <ul className="flex flex-col gap-2 w-full pl-4">
                    <li className="list-disc text-[0.8rem]">Advanced computerized</li>
                    <li className="list-disc text-[0.8rem]">Teamwork and Collaboration</li>
                    <li className="list-disc text-[0.8rem]">Accounting and bookkeeping</li>
                    <li className="list-disc text-[0.8rem]">Finance knowledge</li>
                </ul>
                <ul className="flex flex-col gap-2 w-full">
                    <li className="list-disc text-[0.8rem]">Problem-Solving</li>
                    <li className="list-disc text-[0.8rem]">Front-End Development</li>
                    <li className="list-disc text-[0.8rem]">Back-End and Database Skills</li>
                    <li className="list-disc text-[0.8rem]">Microsoft Excel proficiency</li>
                </ul>
            </div>
            {/* Education */}
            <h1 className="text-[1rem] underline font-bold mt-2 p-2">Education</h1>
            <div>
                <div className="flex justify-between">
                    <ul className="flex-1 pl-4">
                        <li className="font-bold text-[0.8rem] text-slate-700 list-disc">Islamic Banking and Finance </li>
                        <span className="text-[0.8rem]">(2020 - 2024)</span>
                        <p className="text-[0.8rem]">University of Hargeisa</p>
                    </ul>
                    <ul className="flex-1">
                        <li className="font-bold text-[0.8rem] text-slate-700 list-disc">Islamic Banking and Finance </li>
                        <span className="text-[0.8rem]">(2020 - 2024)</span>
                        <p className="text-[0.8rem]">University of Hargeisa</p>
                    </ul>
                </div>
                <div className="flex justify-center items-center my-2">
                    <div className="w-[7px] h-[7px] bg-[rgba(0.3,0.3,0.3,0.2)] rounded-full"></div>
                    <div className="w-full h-[2px] bg-[rgba(0.3,0.3,0.3,0.2)]"></div>
                    <div className="w-[7px] h-[7px] bg-[rgba(0.3,0.3,0.3,0.2)] rounded-full"></div>
                </div>
            </div>
            <div>
                <div className="flex justify-between">
                    <ul className="flex-1 pl-4">
                        <li className="font-bold text-[0.8rem] text-slate-700 list-disc">Islamic Banking and Finance </li>
                        <span className="text-[0.8rem]">(2020 - 2024)</span>
                        <p className="text-[0.8rem]">University of Hargeisa</p>
                    </ul>
                    <ul className="flex-1">
                        <li className="font-bold text-[0.8rem] text-slate-700 list-disc">Islamic Banking and Finance </li>
                        <span className="text-[0.8rem]">(2020 - 2024)</span>
                        <p className="text-[0.8rem]">University of Hargeisa</p>
                    </ul>
                </div>
                <div className="flex justify-center items-center my-2">
                    <div className="w-[7px] h-[7px] bg-[rgba(0.3,0.3,0.3,0.2)] rounded-full"></div>
                    <div className="w-full h-[2px] bg-[rgba(0.3,0.3,0.3,0.2)]"></div>
                    <div className="w-[7px] h-[7px] bg-[rgba(0.3,0.3,0.3,0.2)] rounded-full"></div>
                </div>
            </div>
            {/* Work Experience */}
            <h1 className="text-[1rem] underline font-bold mt-2 p-2">Work Experience</h1>
            <div className="overflow-hidden rounded-lg border border-gray-300">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-2 px-3 text-left text-sm">Job Title</th>
                            <th className="py-2 px-3 text-left text-sm">Role</th>
                            <th className="py-2 px-3 text-left text-sm">Start Year</th>
                            <th className="py-2 px-3 text-left text-sm">End Year</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        <tr className="hover:bg-gray-100 transition-colors duration-200">
                            <td className="py-2 px-3 border-b">Software Engineer</td>
                            <td className="py-2 px-3 border-b">Frontend Development</td>
                            <td className="py-2 px-3 border-b">2019</td>
                            <td className="py-2 px-3 border-b">2021</td>
                        </tr>
                        <tr className="hover:bg-gray-100 transition-colors duration-200">
                            <td className="py-2 px-3 border-b">Data Analyst</td>
                            <td className="py-2 px-3 border-b">Data Insights</td>
                            <td className="py-2 px-3 border-b">2018</td>
                            <td className="py-2 px-3 border-b">2019</td>
                        </tr>
                        <tr className="hover:bg-gray-100 transition-colors duration-200">
                            <td className="py-2 px-3 border-b">Data Analyst</td>
                            <td className="py-2 px-3 border-b">Data Insights</td>
                            <td className="py-2 px-3 border-b">2018</td>
                            <td className="py-2 px-3 border-b">2019</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Marital Status */}
            <h1 className="text-[1rem] underline font-bold mt-2 p-2">Marital Status</h1>
            <ul className="pl-4">
                <li className="list-disc">Single</li>
            </ul>
            {/* Certifications */}
            <h1 className="text-[1rem] underline font-bold mt-2 p-2">Certifications</h1>
            <div className="flex justify-between pl-4 gap-">
                <ul className="flex flex-col gap-2">
                    <li className="list-disc text-[0.8rem]">Bachelor's Degree in Islamic Banking and Finance</li>
                    <li className="list-disc text-[0.8rem]">Bachelor's Degree in Islamic Banking and Finance</li>
                    <li className="list-disc text-[0.8rem]">Bachelor's Degree in Islamic Banking and Finance</li>
                </ul>
            </div>
        </div>
        </>
    )
};