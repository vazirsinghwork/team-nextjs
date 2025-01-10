"use client";

import { postApi } from '@/app/api/apiClient';
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import PlayerStats from '@/components/playerStats';

export default function Series() {
  const params = useParams<{ matchId: string, team1: string, team2: string }>()

  console.log('params:', params);

  const [team1data, setTeam1data] = useState([]);
  const [team2data, setTeam2data] = useState([]);
  const [success, setSuccess] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const { team1, team2 } = params
    const loadSeries = async () => {
      try {
        const result = await postApi("/team/get_players_by_match_id",
          { series_match_id: params?.matchId , type:1});
        console.log('result?.data?.team1', result?.data[team1])
        console.log('result?.data?.team1', result?.data[team1])
        console.log('result?.data?.team2', result?.data[team2])
        setTeam1data(result?.data[team1]);
        setTeam2data(result?.data[team2]);
      } catch (err) {
        setError(err?.message || "Failed to fetch series.");
      }
    };

    loadSeries();
  }, []);


  interface Props {
    id: string
    is_playing: string
  }



  if(team1data.length == 0){ return false }

  return (
    <div>
   <div>
    <PlayerStats
    playerData={team1data}
     team_name={params?.team1}
     matchId={params?.matchId} />
   </div>
   <div className='mt-4'>
    <PlayerStats
    playerData={team2data}
     team_name={params?.team2}
     matchId={params?.matchId} />
   </div>
  </div>
  );
}