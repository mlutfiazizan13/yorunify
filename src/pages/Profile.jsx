import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import OverviewTab from "../containers/OverviewTab";

const Profile = () => {

    const {user, setUser} = useContext(UserContext);

    const [tab, setTab] = useState('overview');

    const changeTab = (currentTab) => {
        setTab(currentTab);
        console.log(currentTab);

        console.log(tab === 'overfiew');
    }

    useEffect(() => {

      console.log(user);
    }, [user])
    

    return ( 
        <div className="py-32 lg:py-12">

            <div className="px-32">
                <div className="flex gap-5 items-center">
                    {
                        user != null && 
                        <>
                            <img src={user.images[1].url} className="w-24 h-24 rounded-full" alt={`${user.display_name}_img`} />
                            <p className="text-4xl font-medium text-white">{user.display_name}</p> 
                        </>     
                    }
                
                </div>

            

                <div className="border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                        <li role="presentation">
                            <button onClick={() => changeTab('overview')} className="inline-block p-4 border-b-2 rounded-t-lg" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Overview</button>
                        </li>
                        <li role="presentation">
                            <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Tracks</button>
                        </li>
                        <li role="presentation">
                            <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Artists</button>
                        </li>
                    </ul>
                </div>

            </div>

        <div className="bg-gray-800 px-32">
            <div id="default-tab-content">
                <div className={`${tab === 'overview' ? '':'hidden'} p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}>
                    <OverviewTab></OverviewTab>
                </div>
                <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                    <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                </div>
                <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="settings" role="tabpanel" aria-labelledby="settings-tab">
                    <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                </div>
                <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="contacts" role="tabpanel" aria-labelledby="contacts-tab">
                    <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                </div>
            </div>
        </div>


</div> 
     );
}
 
export default Profile;