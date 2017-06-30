function apiRequest(){

/*****	
| Query param | Effect |
| ----------- | ------ |
| q           | Limits the results to companies with names that match `q` |
| start       | Returns result starting at the `start`th result |
| limit       | Restricts the result set to include no more than `limit` results |
| laborTypes  | A comma delimited list of labor types to filter by (all must match) |
 "laborType": [
    "Union",
    "Non-Union",
    "Prevailing Wages"
  ]
*****/

	this.url = 'http://localhost:3000/api/companies';
    this.startTime = null;
	this.params = {
		q: null,
		start: null,
		limit: 500,
		laborTypes: ["Union","Non-Union","Prevailing Wages"]
	};

};

apiRequest.prototype.fetchData = function(val){
    
    this.params.q =  val;
    fetch(this.url, {
            method: 'GET',
            mode: 'cors',
            query: JSON.stringify(this.params)
    })
    .then( (response) => {
            return response.json();
    })
    .then(function(data) {
        console.log(data);
        document.getElementById('moreinfo').innerHTML = "";

        for(let x=0;x<data.results.length;x++){
         
            let labor=[];

            for(let y = 0; y< data.results[x].laborType.length; y++){
                labor.push(data.results[x].laborType[y]);
            };
            /**

            "<select key=' " + x +"'>" + 
            "<option selected='true' disabled='disabled'>" + 
                data.results[x].name + 
            "</option>" + 

            "<option disabled='disabled' > phone: " +

               data.results[x].phone+
                
            "</option>" +

            "<option disabled='disabled'  > website:" +
                data.results[x].website+
            "</option>" +
 
            "<option  disabled='disabled' > Labor Type: " +
                labor +
            "</option>"+

            "</select>


            **/

            let maincontent = "<div> <img src='" +data.results[x].avatarUrl+"'/> <div>" + 

            "<select key=' " + x +"'>" + 
            "<option selected='true' disabled='disabled'>" + 
                data.results[x].name + 
            "</option>" + 

            "<option disabled='disabled' > phone: " +
               data.results[x].phone+
            "</option>" +

            "<option disabled='disabled'  > website:" +
                data.results[x].website+
            "</option>" +
 
            "<option  disabled='disabled' > Labor Type: " +
                labor +
            "</option>"+

            "</select></div></div>";

            let newDiv = document.createElement("div"); 
            newDiv.innerHTML = maincontent;
            document.getElementById('moreinfo').appendChild(newDiv);
        };

    })
    .catch((err) => {console.log(err)});  
};


let api = new apiRequest();

function Search(val) {
    this.startTime = new Date();

	setTimeout( function(){
        let endTime = new Date();

        let seconds = ( endTime.getTime()-this.startTime.getTime() );
        console.log(seconds);
        if( seconds < 1000 ) {
           return;

        } else if(seconds >= 1000){
            api.fetchData(val);
        }
    }, 1000);

};