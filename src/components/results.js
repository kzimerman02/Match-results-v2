import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

 function Results() {

    
    

    const [data, setData] = useState([]);

    const params = useParams();
    //console.log(params.id)

    const request = `/soccer/trial/v4/en/seasons/${params.season}/schedules.json?api_key=arreu66uqekjhuppj8jv3339`;

    const fetchResults = async () => {
	fetch(request).then((response) => {
        
        //console.log(response);

        if (response) {
            response.json().then((results) => {
                const data = results.schedules;
                setData(data);
            });
        }
    });}

    useEffect(() => {
            fetchResults();
        }, []);

    
    
    

    return (
        
        <Table className='text-center' variant='dark' bordered hover>
            <thead className="">
                <tr>
                    <th className=''>Start date</th>
                    <th>Home team</th>
                    <th>Away team</th>
                    <th>Venue</th>
                    <th>Match result</th>
                    <th>Half time score</th>
                    
                </tr>
            </thead>

            <tbody id='tbodyData'>
                
                    {data.map((item) => {
                        
                        const matchDate = item.sport_event ? item.sport_event.start_time.replace('T', ' ').replace('+00:00', '') : ' - ';
    
                        const venue = item.sport_event ? item.sport_event.venue.name: ' - ';

                        const homeScore = item.sport_event_status.home_score;
                        const awayScore = item.sport_event_status.away_score;
                        const matchResult = item.sport_event_status.status === "closed" ? `${homeScore} : ${awayScore}`  : "Match postponed";
                        
                        const matchHalfTimeScore = item.sport_event_status.status === "closed" ? `${item.sport_event_status.period_scores[0].home_score} : ${item.sport_event_status.period_scores[0].away_score}`  : " - ";


                        let teamHome;
                        let teamAway;
                        if (homeScore > awayScore){ //HOME WIN
                                teamHome = 
                                    <td className='bg-success'>
                                        {item.sport_event ? item.sport_event.competitors[0].name: ' - '}
                                    </td>;

                                teamAway = 
                                    <td className='bg-danger'>
                                        {item.sport_event ? item.sport_event.competitors[1].name: ' - '}
                                    </td>;
                        }

                        else if(homeScore < awayScore){ //AWAY WIN
                                teamHome = 
                                <td className='bg-danger'>
                                    {item.sport_event ? item.sport_event.competitors[0].name: ' - '}
                                </td>;

                                teamAway = 
                                <td className='bg-success'>
                                    {item.sport_event ? item.sport_event.competitors[1].name: ' - '}
                                </td>;
                        }

                        else if(item.sport_event_status.status === 'postponed'){ //match postponed
                            teamHome = 
                                    <td className=''>
                                        {item.sport_event ? item.sport_event.competitors[0].name: ' - '}
                                    </td>;

                                teamAway = 
                                    <td className=''>
                                        {item.sport_event ? item.sport_event.competitors[1].name: ' - '}
                                    </td>;
                        }

                        else if (homeScore === awayScore){ //DRAW
                                teamHome = 
                                    <td className='bg-warning'>
                                        {item.sport_event ? item.sport_event.competitors[0].name: ' - '}
                                    </td>;
                                    
                                teamAway = 
                                    <td className='bg-warning'>
                                        {item.sport_event ? item.sport_event.competitors[1].name: ' - '}
                                    </td>;
                    }
                        
                    return (
                            
                        
                        
                        <tr className=''>
                            <td className=''>
                            {matchDate}
                            </td>
                                
                            {teamHome}
                            
                            {teamAway}
                            

                            <td className=''>
                                {venue}
                            </td>

                            <td className=''>
                            {matchResult}
                            </td>

                            <td className=''>
                            {matchHalfTimeScore}
                            </td>

                            </tr>
                                )
                        
                        })
                    }
                
                
            </tbody>
        </Table>
    
    )
};

export default Results;