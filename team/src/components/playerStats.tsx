import { postApi } from "@/app/api/apiClient";
import React, { FC, JSX, useEffect, useState } from "react";

export interface PlayerStatsProps {
  playerData:any
  team_name:string
  matchId:any
}

const PlayerStats: FC<PlayerStatsProps> = ({ playerData, team_name,matchId }): JSX.Element => {


    const [team1data, setTeam1data] = useState(playerData);
    const [success, setSuccess] = useState([]);
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);

  const  updatePlayer = (type, id,key, value) => {
    setTeam1data((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [key]: value  } : item
      )
    );
  }

  useEffect(()=>{
    setTeam1data(playerData)
  },[])

  return (
    <>
     <div>
      {/* <h1>Series Page</h1>
      <p>Welcome to the series page!</p> */}

      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="card bg-secondary-subtle">
        <div className="card-header">
          <h5 className="card-title">{`Team ${team_name}`}</h5>
          <div className="card-toolbar">
          </div>
        </div>
        <div className="card-body ">
          <>
            <div className="row text-center">
              <div className='col-1'>
                <span>Name</span>
              </div>
              <div className='col-1'>
                <span>Point</span>
              </div>
              <div className='col-1'>
                <span>Per%</span>
              </div>
              <div className='col-1'>
                <span>Wicket</span>
              </div>
              <div className='col-1'>
                <span>Run</span>
              </div>
              <div className='col-1'>
                <span>Catches</span>
              </div>
              <div className='col-1'>
                <span>Run Out</span>
              </div>
              <div className='col-1'>
                <span>Played No</span>
              </div>
              <div className='col-2'>
                <span>Action</span>
              </div>
            </div>
            {team1data?.length > 0 ? (
              <div>
                {team1data?.map((item, index) => (
                  <div className="row text-center p-2" key={index}>
                    <div className='col-1'>
                      <span className='ml-2'>{item?.name || ""}</span>
                    </div>
                    <div className='col-1'>
                      <input type="text" className="form-control form-control-sm" placeholder="Enter point" value={item?.player_point} onChange={(e) => {
                        updatePlayer('1',item?.id,'player_point',e?.target?.value)
                      }} />
                    </div>
                    <div className='col-1'>
                      <input type="text" className="form-control form-control-sm" placeholder="Enter percentage" value={item?.percentage} onChange={(e) => {
                        updatePlayer('1',item?.id,'percentage',e?.target?.value)
                      }} />
                    </div>
                    <div className='col-1'>
                      <input type="text" className="form-control form-control-sm" placeholder="Enter wicket" value={item?.wicket} onChange={(e) => {
                        updatePlayer('1',item?.id,'wicket',e?.target?.value)
                      }} />
                    </div>
                    <div className='col-1'>
                      <input type="text" className="form-control form-control-sm" placeholder="Enter run" value={item?.run} onChange={(e) => {
                        updatePlayer('1',item?.id,'run',e?.target?.value)
                      }} />
                    </div>
                    <div className='col-1'>
                      <input type="text" className="form-control form-control-sm" placeholder="Enter catches" value={item?.catches}
                      onChange={(e) => {
                         updatePlayer('1',item?.id,'catches',e?.target?.value)
                      }} />
                    </div>
                    <div className='col-1'>
                      <input type="text" className="form-control form-control-sm" placeholder="Enter run out" value={item?.run_out} onChange={(e) => {
                         updatePlayer('1',item?.id,'run_out',e?.target?.value)
                      }} />
                    </div>
                    <div className='col-1'>
                      <input type="text" className="form-control form-control-sm" placeholder="Enter played no" aria-label=".form-control-sm example" value={item?.played_no} onChange={(e) => {
                        updatePlayer('1',item?.id,'played_no',e?.target?.value)
                      }} />
                    </div>
                    <div className='col-1 '>
                      <button
                        type="submit"
                        className="btn btn-primary btn-sm"
                        onClick={async () => {
                          console.log('item', team1data[index])
                          try {
                            setLoader(true);
                            const data = await postApi('/team/add_stats', {
                              player_stats_id : team1data[index].player_stats_id,
                              team_id         : team1data[index].team_id,
                              series_match_id : matchId,
                              player_id       : team1data[index].id,
                              player_point    : team1data[index].player_point,
                              percentage      : team1data[index].percentage,
                              wicket          : team1data[index].wicket,
                              run             : team1data[index].run,
                              catches         : team1data[index].catches,
                              run_out         : team1data[index].run_out,
                              played_no       : team1data[index].played_no,
                            });
                            setSuccess(team1data[index].id);
                          } catch (err) {
                            console.log('err', err);
                          } finally {
                            setLoader(false);
                          }
                        }}
                      >
                        Submit
                      </button>
                     {success == team1data[index].id && <span className='text-success'>{`success`}</span>}
                    </div>
                  </div>
                ))
                }
              </div>
            ) : null}
          </>
        </div>
      </div>
    </div>
    </>
  );
};

export default PlayerStats;