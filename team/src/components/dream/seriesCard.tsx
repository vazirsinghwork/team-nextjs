import Link from "next/link";
import React, { FC, JSX, useEffect, useState } from "react";

export interface seriesCardProps {
  name: string
  seriesData: any
}
const SeriesCard: FC<seriesCardProps> = ({ name, seriesData, onClick }): JSX.Element => {

  const [team1data, setTeam1data] = useState(seriesData);
  useEffect(() => {
    setTeam1data(seriesData)
  }, [])

  const dateTime = (date:string) => {
    return new Date(date).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div>
      <div className="container">
        <>
        <span className='ml-2'>{name}</span>
          {team1data?.length > 0 ? (
            <div className="col-md-* d-flex">
              {team1data?.map((item, index) => (
                <Link href={{pathname:`/dream/${item?.id}/${item?.team1_name}/${item?.team2_name}`}}>
                <div className="card bg-secondary-subtle m-2">
                  <div className="card-body p-2" key={index}>
                  <span className='ml-2'>{`Match ${index+1}`}</span>
                    <div className='col-6'>
                      <span className='ml-2'>{item?.team1_name || ""}</span>
                      <span className='ml-2'>{'VS'}</span>
                      <span className='ml-2'>{item?.team2_name || ""}</span>
                    </div>
                    <div className='col-6'>
                      <span className='ml-2'>{dateTime(item?.time_from)}</span>
                     <span className='ml-2'>{' To '}</span>
                     <span className='ml-2'>{dateTime(item?.time_to)}</span>
                    </div>
                  </div>
                </div>
                </Link>
              ))
              }
            </div>
          ) : null}
        </>
      </div>
    </div>
  );
};

export default SeriesCard;