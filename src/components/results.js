import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

 function Results() {

    
    

    const [data, setData] = useState([]);

    const params = useParams();
    
    const request = `/soccer/trial/v4/en/seasons/${params.season}/schedules.json?api_key=jzd9h67wau4peh3zduceumac`;

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
        <Table id='tabledata' className='text-center' variant='dark' hover>
            <thead>
                <tr>
                    <th id='tbody-title' colSpan={6} className='h2'>
                        {data[0] ? data[0].sport_event.sport_event_context.season.name : ''}
                    </th>
                </tr>
                <tr id='thead-columns-tr'>
                    <th>Start date</th>
                    <th id='thead-hometeam'>Home team</th>
                    <th id='thead-awayteam'>Away team</th>
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
                                    <td id='winner-td'>
                                        {item.sport_event ? item.sport_event.competitors[0].name: ' - '}
                                    </td>;

                                teamAway = 
                                    <td id='loser-td'>
                                        {item.sport_event ? item.sport_event.competitors[1].name: ' - '}
                                    </td>;
                        }

                        else if(homeScore < awayScore){ //AWAY WIN
                                teamHome = 
                                <td id='loser-td'>
                                    {item.sport_event ? item.sport_event.competitors[0].name: ' - '}
                                </td>;

                                teamAway = 
                                <td id='winner-td'>
                                    {item.sport_event ? item.sport_event.competitors[1].name: ' - '}
                                </td>;
                        }

                        else if(item.sport_event_status.status === 'postponed'){ //match postponed
                            teamHome = 
                                    <td id='postponed-left-td'>
                                        {item.sport_event ? item.sport_event.competitors[0].name: ' - '}
                                    </td>;

                                teamAway = 
                                    <td id='postponed-right-td'>
                                        {item.sport_event ? item.sport_event.competitors[1].name: ' - '}
                                    </td>;
                        }

                        else if (homeScore === awayScore){ //DRAW
                                teamHome = 
                                    <td id='draw-left-td'>
                                        {item.sport_event ? item.sport_event.competitors[0].name: ' - '}
                                    </td>;
                                    
                                teamAway = 
                                    <td id='draw-right-td'>
                                        {item.sport_event ? item.sport_event.competitors[1].name: ' - '}
                                    </td>;
                    }
                        
                    return (
                            
                        
                        
                        <tr id='table-match-info' onClick={()=>window.location.href = `/match/${item.sport_event.id}`}>
                            

                            <td id='table-matchdate'>
                            {matchDate}
                            </td>
                                
                            {teamHome}
                            
                            {teamAway}
                            

                            <td id='table-venue'>
                                {venue}
                            </td>

                            <td id='table-result'>
                            {matchResult}
                            </td>

                            <td id='table-halftime'>
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