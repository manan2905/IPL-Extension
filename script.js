// JS is used to integrate API's so we are using this file
async function getMatchData(){
    return await fetch("https://api.cricapi.com/v1/currentMatches?apikey=d3da801e-fc28-4ecb-989b-c0803e8e3f86&offset=0")
        .then(data => data.json())
        .then(data=> {
            if(data.status != "success") return;

            const matchesList = data.data;
            if(!matchesList) return [];

            const relevantData = matchesList.filter(match => match.series_id == "c75f8952-74d4-416f-b7b4-7da4b4e3ae6e").map(match => `${match.teamInfo[0]["shortname"]} vs ${match.teamInfo[1]["shortname"]}, ${match.date}, ${match.status}`);

            console.log({relevantData});

            document.getElementById("matches").innerHTML = relevantData.map(match => `<li>${match}</li>`).join(" ");
            return relevantData;
        })
        .catch(e => console.log(e));
}

getMatchData();