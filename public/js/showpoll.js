
//app code
injectPoll();
function injectPoll(){
    var canvas = $('#pollcanvas')
    var pollId = canvas.attr('data-pollid');
    
    loadPoll(pollId,function(data){
        showPoll(data,canvas[0]);
    });
    
}

/**
 * load poll from API or show poll data on a chartjs plot
 * 
 */
 
function loadPoll(pollId,callback){
    $.getJSON('/poll/'+pollId+'/results.json',function(data){
        callback(data);
    });
}


function showPoll(data,canvas){
    if (!data || !canvas) return console.log('bad input to showPoll');
    
    var chartData = {
        labels:data.options,
        datasets: [
            {
                label: data.name,
                data: data.results
            }
        ]
    };
    
    var chartOptions = {

        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    
    }
    
    var ctx = canvas.getContext('2d');
    
    new Chart(ctx).Bar(chartData,chartOptions);
}