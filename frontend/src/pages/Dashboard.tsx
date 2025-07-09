import { useAuth } from "../context/AuthContext";


import TodayTasks from '../components/TodayTasks';
import UpcomingTasks from '../components/UpcomingTasks';
import { fetchChores } from '../utils/getChoresForToday';
import { fetchUpcomingChores } from '../utils/generateUpcomingChoreAssignments';
import { fetchTodayChores } from '../utils/getChoresForToday';
import type { choreAssignment } from '../types';
import AdminAnnouncements from '../components/AdminAnnouncements';
import MissedChores from '../components/MissedChores';
import WeekOverview from '../components/WeekOverview';

import dayjs from 'dayjs';
import OnDemandAlerts from '../components/OnDemandAlerts';
import { useEffect, useState } from 'react';
import type { OnDemandChore } from '../types';


// Dashboard.tsx
const mockAssignments: choreAssignment[] = [
  {
    choreTitle: 'Clean Kitchen',
    memberId: 'm1',
    assignedTo: 'Saturday',
    frequency: 'biweekly',
    type: 'weekday',
    scheduleId:'2'
  },
  {
    choreTitle: 'Clean Hall',
    memberId: 'm1',
    assignedTo: 'Saturday',
    frequency: 'biweekly',
    type: 'weekday',
    scheduleId:'2'
  },
  {
    choreTitle: 'Clean Washroom',
    memberId: 'm1',
    assignedTo: '2025-06-15',
    frequency: 'none',
    type: 'date',
    scheduleId:'2'
  },
];


const adminNotes = [
  "Please clean the hallway before Sunday.",
  "Guests visiting Friday — kitchen must be spotless."
];

export default function Dashboard() {
  const [chores, setChores] = useState<choreAssignment[]>([]);
  const [todaysChores, setTodaysChores] = useState<choreAssignment[]>([]);
  const [upcomingChores, setUpcomingChores] = useState<choreAssignment[]>([]);
  const [reRender, setReRender] = useState(false)
  const {username: currentUserId} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {isLoggedIn} = useAuth()
  const currentDate = dayjs().format('YYYY-MM-DD');

const reFresh = ()=>{
    setReRender(true)
  }
const fetchTasks = async (inputChores: choreAssignment[]) => {
  console.log(inputChores);

  const today: choreAssignment[] = await fetchTodayChores(inputChores, currentUserId);
  const upcoming: choreAssignment[] = await fetchUpcomingChores(today);

  setTodaysChores(today);
  setUpcomingChores(upcoming);
};
const loadData = async ()=>{
    setIsLoading(true);
    setError(null);
    try {
    const fetchedChores: choreAssignment[] = await fetchChores();
    setChores(fetchedChores);
    fetchTasks(fetchedChores);}
    catch (err) {
    console.error('❌ Failed to load data:', err);
    setError('Failed to load chores. Please try again.');}
    finally {
    setIsLoading(false);}
  }

useEffect(() => {
  const init = async () => {
    await loadData()
  };
  init();
}, []);

useEffect(() => {
  if (reRender) {
    loadData() // ← your data loader
    setReRender(false);   // reset after refresh
  }
}, [reRender]);



  
  
  const mockOnDemandChores:OnDemandChore[] = [
  {
    id: 'trash',
    name: 'Take out Trash',
    lastAssignedTo: 'm2',
    triggered: true, // show alert if true
    triggeredAt: '2025-06-17T07:00:00',alertCount:0,
      alertRecipients:[],

  },
];
  const [onDemandChores, setOnDemandChores] = useState(mockOnDemandChores);


  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6 text-black">
      <h1 className="text-3xl font-bold text-gray-800">🏠 FlatChores Dashboard</h1>
      {isLoading && <p className="text-gray-500 italic">Loading chores...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {isLoggedIn?(
      <>
      <AdminAnnouncements messages={adminNotes} /> 
      <TodayTasks 
        onReRender ={reFresh} 
        todaysChores={todaysChores} 
        currentUserId={currentUserId}
        />
      <UpcomingTasks assignemnts={upcomingChores} currentUserId={currentUserId} />
      <OnDemandAlerts chores={onDemandChores} currentUserId={currentUserId} />
      <MissedChores chores={mockAssignments} currentDate={currentDate} />
      <WeekOverview chores={mockAssignments} currentUserId={currentUserId} />
      </>
  ):
  (
  <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-6 text-center text-blue-700">
    <p className="text-lg font-semibold">Log in to see your upcoming tasks and alerts 🚀</p>
    <p className="text-sm mt-2">Stay on top of your responsibilities and never miss a chore.</p>
  </div>
)}

    
      
    </div>
  );
}
