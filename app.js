$(document).ready(function(){
	console.log('Document is ready');
	$('#result').hide();
	$('#current').click(function(){
		// Clear all old data
		$('tbody>tr').remove();
		var cityName=$('#input1').val();
		// console.log(cityName);
		var urlStr='http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=27d43832d2a4adcb97fcbfa23db130aa';
		console.log('Before calling Ajax');
		$.ajax({
		   url: urlStr,
		   error: function() {
		      console.log("error occured");
		   },
		   success: function(data) {
		   	console.log('got data');
		   	console.log(data);
		   	var date=new Date(data.dt*1000);
		   	var dateStr=date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
		   	var temparature=Math.round((data.main.temp-273.5)*100)/100 + ' &#8451;';
		   	var humidity=data.main.humidity;
		   	var weather=data.weather[0].description;
		   	$('#textInfo').text('Current Weather for city '+cityName+','+data.sys.country);
		   	var innerHtml = '<tr><td>'+dateStr+'</td><td>'+temparature+'</td><td>'+humidity+'</td><td>'+weather+'</td></tr>';
		   	$('tbody').append(innerHtml);
		   	$('#result').show();
		   },
		});
		console.log('After calling Ajax');
	});

	$('#forecast').click(function(){
		// Clear all old data
		console.log('Forecast clicked');
		var cityName=$('#input1').val();
		// console.log(cityName);
		var urlStr='http://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&appid=27d43832d2a4adcb97fcbfa23db130aa';
		$.ajax({
			 url: urlStr,
			 error: function() {
					console.log("error occured");
			 },
			 success: function(data) {
				console.log('got data');
				console.log(data);
				var country = data.city.country;
	      var city = data.city.name;
				var dateArr = [];
				var tempArr = [];
	      for(var i = 0; i < data.list.length; i++){
	        var info = data.list[i];
					// var date=new Date(info.dt*1000);
					var dateStr = moment(info.dt*1000).format('dddd h:mm a');
					// var dateStr=date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getHours()+;
					dateArr.push(dateStr);
					var temparature=Math.round((info.main.temp-273.5)*100)/100;
					tempArr.push(temparature);
	      }
				console.log(tempArr);

				Highcharts.chart('result', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Average Temperature'
        },
        subtitle: {
            text: 'Source: openweathermap.com'
        },
        xAxis: {
            categories: dateArr
        },
        yAxis: {
            title: {
                text: 'Temperature'
            },
            labels: {
                formatter: function () {
                    return this.value + ' C';
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            name: city,
            marker: {
                symbol: 'diamond'
            },
            data: tempArr
        }]
    });
		$('#result').show();
	}
});

});
});
