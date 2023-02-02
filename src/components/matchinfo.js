import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MatchInfo() {

    
    const [data, setData] = useState([]);

    const params = useParams();

    const request = `/soccer/trial/v4/en/sport_events/${params.match}/timeline.json?api_key=jzd9h67wau4peh3zduceumac`;

    const fetchResults = async () => {
	fetch(request).then((response) => {

        if (response) {
            response.json().then((results) => {
                
                const data = results;
                setData(data);
            });
        }
    });}

    useEffect(() => {
            fetchResults();
        }, []);

        let timelineLength = data.timeline ?data.timeline.length:null;
        let matchTimeline = '';

       
        
        
        for(let i=0; i<timelineLength; i++){

            let matchDate = data.timeline[i].time.replace('T', ' ').replace('+00:00', '');
            let matchClock = data.timeline[i].match_clock;
            let matchTime = data.timeline[i].match_time;
            let matchTeam = data.timeline[i].competitor == 'home' ? data.sport_event.competitors[0].name : data.sport_event.competitors[1].name;
            let matchPlayer = data.timeline[i].players ? data.timeline[i].players[0].name : null;
            let matchResult = data.sport_event_status.home_score+':'+data.sport_event_status.away_score;


            if(data.timeline){
                if(data.timeline[i].type === 'match_started'){
                    matchTimeline = matchTimeline + `Match started (${matchDate})`
                }
                if(data.timeline[i].type === 'corner_kick'){
                    matchTimeline = matchTimeline + ' --> ' + ` Corner kick by ${matchPlayer} (${matchClock})`
                }
                if (data.timeline[i].type === 'score_change'){
                    matchTimeline = matchTimeline + ' --> ' + ` Goal for ${matchTeam} (${matchClock}), scorer: ${data.timeline[i].players[0].name}`
                }
                if (data.timeline[i].type === 'yellow_card'){
                    matchTimeline = matchTimeline + ' --> ' + ` Yellow card for ${matchPlayer} (${matchClock})`
                }
                if (data.timeline[i].type === 'red_card'){
                    matchTimeline = matchTimeline + ' --> ' + ` Red card for ${matchPlayer} (${matchClock})`
                }
                if (data.timeline[i].type === 'period_start' && data.timeline[i].period === 2){
                    matchTimeline = matchTimeline + ' --> ' + ` Second period has started (${matchDate})`
                }
                if (data.timeline[i].type === 'substitution'){
                    matchTimeline = matchTimeline + ' --> ' + ` Player substitution from ${data.timeline[i].players ? data.timeline[i].players[0].name : null} to ${data.timeline[i].players ? data.timeline[i].players[1].name : null} (${matchClock ? matchClock : matchTime})`
                }
                if (data.timeline[i].type === 'match_ended'){
                    matchTimeline = matchTimeline + ' --> ' + ` Match ended at ${matchClock} with result of ${data.sport_event.competitors[0].name} ${matchResult} ${data.sport_event.competitors[1].name}.`
                }

                
            }
        }

        
        return (

            
            <div id='info-container'>
            
                <div id='info-header'><h1>Match Info Timeline</h1></div>
                <div id='info-content'>
                    <div id="info-div"> 
                     {matchTimeline}
                    </div>
                    
                </div>
            </div>
        )
    
}

export default MatchInfo;